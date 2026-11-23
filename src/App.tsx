import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GameHud, SpeechBannerData } from './components/GameHud';
import { GameModals } from './components/GameModals';
import { TitleScreen } from './components/TitleScreen';
import { soundEngine } from './game/audio';
import {
  getCurrentLang,
  Lang,
  nextLang,
  setCurrentLang,
  translateGameText,
  UI_STRINGS,
} from './game/i18n';
import { LEVELS } from './game/levels';
import { musicEngine } from './game/music';
import { CANVAS_H, CANVAS_W, renderGameFrame } from './game/renderer';
import { getRoomImage, preloadAllGameAssets } from './game/sprites';
import { voiceEngine } from './game/voice';
import {
  CatEntity,
  CatId,
  FlyingProp,
  GameScreen,
  Hotspot,
  InventoryItem,
  LevelDefinition,
  MagicBeam,
  Particle,
  RuntimeLevelState,
  SoundName,
  SpeechBubble,
  ThomasSpell,
  TorqSkill,
} from './game/types';

const STORAGE_KEY = 'tower_cats_unlocked_level_v1';

function getTargetScale(sizeState?: Hotspot['sizeState']): number {
  if (sizeState === 'large') return 1.52;
  if (sizeState === 'small') return 0.56;
  return 1;
}

function cloneHotspots(list: Hotspot[]): Hotspot[] {
  return list.map((h) => ({
    ...h,
    renderScale: getTargetScale(h.sizeState),
    animProgress: h.active ? 1 : 0,
    targetX: h.x,
    targetY: h.y,
    shadowDest: h.shadowDest ? { ...h.shadowDest } : undefined,
  }));
}

function createRuntimeState(level: LevelDefinition): RuntimeLevelState {
  return {
    levelId: level.id,
    flags: { ...level.initialFlags },
    hotspots: cloneHotspots(level.initialHotspots),
    inventory: [],
    thomas: {
      id: 'thomas',
      x: level.thomasStart.x,
      y: level.thomasStart.y,
      targetX: level.thomasStart.x,
      targetY: level.thomasStart.y,
      zoneId: level.thomasStart.zoneId,
      facing: 1,
      state: 'idle',
      stateTimer: 0,
      bobPhase: 0,
    },
    torq: {
      id: 'torquemada',
      x: level.torqStart.x,
      y: level.torqStart.y,
      targetX: level.torqStart.x,
      targetY: level.torqStart.y,
      zoneId: level.torqStart.zoneId,
      facing: 1,
      state: 'idle',
      stateTimer: 0,
      bobPhase: 1.7,
    },
    activeCat: 'thomas',
    thomasSpell: 'telekinesis',
    torqSkill: 'paws',
    selectedItemId: null,
    dogAlertTimer: 0,
    dogLunging: false,
    dogPos: { x: 920, y: 635 },
    elapsedSeconds: 0,
    stepCount: 0,
    flyingProps: [],
    exitSequence: null,
    caughtSequence: null,
  };
}

function canReachZone(
  level: LevelDefinition,
  state: RuntimeLevelState,
  fromZone: string,
  toZone: string
): boolean {
  if (fromZone === toZone) return true;
  const visited = new Set<string>([fromZone]);
  const queue = [fromZone];
  while (queue.length > 0) {
    const cur = queue.shift()!;
    for (const link of level.zoneLinks) {
      if (!state.flags[link.flag]) continue;
      if (link.from === cur && !visited.has(link.to)) {
        if (link.to === toZone) return true;
        visited.add(link.to);
        queue.push(link.to);
      }
      if (link.to === cur && !visited.has(link.from)) {
        if (link.from === toZone) return true;
        visited.add(link.from);
        queue.push(link.from);
      }
    }
  }
  return false;
}

export default function App() {
  const [screen, setScreen] = useState<GameScreen>('TITLE');
  const [currentLevelIdx, setCurrentLevelIdx] = useState<number>(0);
  const [unlockedLevel, setUnlockedLevel] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? Math.max(1, Math.min(10, parseInt(saved, 10) || 1)) : 1;
    } catch {
      return 1;
    }
  });

  // React-mirrored HUD state (updated only on discrete user/game events, never per frame)
  const [activeCat, setActiveCat] = useState<CatId>('thomas');
  const [thomasSpell, setThomasSpell] = useState<ThomasSpell>('telekinesis');
  const [torqSkill, setTorqSkill] = useState<TorqSkill>('paws');
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [elapsedDisplay, setElapsedDisplay] = useState<number>(0);
  const [hintTier, setHintTier] = useState<number>(0);
  const [hintText, setHintText] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isMusicMuted, setIsMusicMuted] = useState<boolean>(false);
  const [isVoiceSpeaking, setIsVoiceSpeaking] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<{ title: string; message: string }>({
    title: '',
    message: '',
  });
  const [speechBanner, setSpeechBanner] = useState<SpeechBannerData | null>(null);
  const [lang, setLang] = useState<Lang>(() => getCurrentLang());
  const [viewport, setViewport] = useState<{ w: number; h: number }>(() => ({
    w: typeof window !== 'undefined' ? window.innerWidth : 1280,
    h: typeof window !== 'undefined' ? window.innerHeight : 720,
  }));

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const runtimeRef = useRef<RuntimeLevelState>(createRuntimeState(LEVELS[0]));
  const particlesRef = useRef<Particle[]>([]);
  const beamsRef = useRef<MagicBeam[]>([]);
  const bubblesRef = useRef<SpeechBubble[]>([]);
  const bubbleIdRef = useRef<number>(1);
  const speechTimerRef = useRef<number | null>(null);
  const stepSoundTimerRef = useRef<number>(0);
  const hoveredHotspotRef = useRef<Hotspot | null>(null);
  const pendingHotspotRef = useRef<Hotspot | null>(null);
  const screenRef = useRef<GameScreen>(screen);
  screenRef.current = screen;
  const langRef = useRef<Lang>(lang);
  langRef.current = lang;

  useEffect(() => {
    setCurrentLang(lang);
  }, [lang]);

  useEffect(() => {
    preloadAllGameAssets();
    voiceEngine.onSpeakingChange((speaking) => {
      setIsVoiceSpeaking(speaking);
      musicEngine.setDucked(speaking);
    });
    const onResize = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (speechTimerRef.current) window.clearTimeout(speechTimerRef.current);
      voiceEngine.onSpeakingChange(null);
      voiceEngine.stop();
      musicEngine.stop();
    };
  }, []);

  const currentLevel = LEVELS[currentLevelIdx];

  const handleChangeLang = useCallback(
    (next: Lang) => {
      setCurrentLang(next);
      setLang(next);
      langRef.current = next;
      voiceEngine.stop();
      if (hintTier > 0) {
        setHintText(translateGameText(currentLevel.hints[hintTier - 1], next));
      }
      if (hoveredHotspotRef.current) {
        setHoverLabel(translateGameText(hoveredHotspotRef.current.name, next));
      }
    },
    [currentLevel, hintTier]
  );

  const say = useCallback(
    (who: CatId | 'dog' | 'system', text: string, duration = 5.2, isIntro = false) => {
      const activeLang = langRef.current;
      const localized = translateGameText(text, activeLang);
      const id = bubbleIdRef.current++;
      setSpeechBanner({ id, who, text: localized, isIntro });
      if (speechTimerRef.current) {
        window.clearTimeout(speechTimerRef.current);
      }
      speechTimerRef.current = window.setTimeout(() => {
        setSpeechBanner((prev) => (prev && prev.id === id ? null : prev));
      }, Math.max(duration, 4.5) * 1000);
      void voiceEngine.speak(who, localized, activeLang);
    },
    []
  );

  const spawnParticles = useCallback(
    (
      x: number,
      y: number,
      color: string,
      kind: Particle['kind'],
      count = 14
    ) => {
      for (let i = 0; i < count; i++) {
        const ang = Math.random() * Math.PI * 2;
        const spd = 25 + Math.random() * 95;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd - (kind === 'zzz' || kind === 'note' ? 35 : 20),
          life: 0.55 + Math.random() * 0.45,
          maxLife: 1.0,
          size: 2.5 + Math.random() * 3.5,
          color,
          kind,
        });
      }
    },
    []
  );

  const spawnBeam = useCallback(
    (fromX: number, fromY: number, toX: number, toY: number, color: string) => {
      beamsRef.current.push({
        fromX,
        fromY,
        toX,
        toY,
        color,
        life: 0.45,
        maxLife: 0.45,
      });
    },
    []
  );

  const spawnFlight = useCallback((flight: Omit<FlyingProp, 'progress'>) => {
    soundEngine.play('flight_whoosh');
    runtimeRef.current.flyingProps.push({
      ...flight,
      progress: 0,
    });
  }, []);

  const syncHudFromRuntime = useCallback(() => {
    const st = runtimeRef.current;
    setActiveCat(st.activeCat);
    setThomasSpell(st.thomasSpell);
    setTorqSkill(st.torqSkill);
    setInventory([...st.inventory]);
    setSelectedItemId(st.selectedItemId);
  }, []);

  const loadLevel = useCallback(
    (levelId: number) => {
      musicEngine.start();
      voiceEngine.stop();
      const idx = Math.max(0, Math.min(LEVELS.length - 1, levelId - 1));
      const lvl = LEVELS[idx];
      setCurrentLevelIdx(idx);
      runtimeRef.current = createRuntimeState(lvl);
      particlesRef.current = [];
      beamsRef.current = [];
      bubblesRef.current = [];
      pendingHotspotRef.current = null;
      hoveredHotspotRef.current = null;
      setHoverLabel(null);
      setHintTier(0);
      setHintText(null);
      setSpeechBanner(null);
      setElapsedDisplay(0);
      syncHudFromRuntime();
      setScreen('PLAYING');

      setTimeout(() => {
        if (screenRef.current === 'PLAYING') {
          say('thomas', lvl.introQuote, 5.5, true);
        }
      }, 180);
    },
    [say, syncHudFromRuntime]
  );

  const executeHotspotInteraction = useCallback(
    (hotspot: Hotspot) => {
      const st = runtimeRef.current;
      if (st.exitSequence || st.caughtSequence) return;
      const lvl = LEVELS[st.levelId - 1];
      const active = st.activeCat;

      if (active === 'thomas') {
        st.thomas.facing = hotspot.x + hotspot.w * 0.5 >= st.thomas.x ? 1 : -1;
        st.thomas.state = 'cast';
        st.thomas.stateTimer = 0.45;
      } else {
        st.torq.facing = hotspot.x + hotspot.w * 0.5 >= st.torq.x ? 1 : -1;
      }

      lvl.onInteract({
        cat: active,
        spell: st.thomasSpell,
        skill: st.torqSkill,
        itemId: active === 'torquemada' ? st.selectedItemId : null,
        hotspot,
        state: st,
        addItem: (item) => {
          if (!st.inventory.some((i) => i.id === item.id)) {
            st.inventory.push(item);
            setInventory([...st.inventory]);
          }
        },
        removeItem: (itemId) => {
          st.inventory = st.inventory.filter((i) => i.id !== itemId);
          if (st.selectedItemId === itemId) {
            st.selectedItemId = null;
            setSelectedItemId(null);
          }
          setInventory([...st.inventory]);
        },
        say,
        spawnParticles,
        spawnBeam,
        spawnFlight,
        playSound: (name: SoundName) => soundEngine.play(name),
        triggerCaught: (title, reason) => {
          if (st.caughtSequence || st.exitSequence) return;
          soundEngine.play('dog_bite');
          pendingHotspotRef.current = null;
          st.thomas.state = 'panic';
          st.torq.state = 'panic';
          st.thomas.targetX = Math.max(80, st.thomas.x - 45);
          st.torq.targetX = Math.max(80, st.torq.x - 55);
          st.dogLunging = true;
          const activeLang = langRef.current;
          st.caughtSequence = {
            timer: 0,
            duration: 0.95,
            title: translateGameText(title, activeLang),
            reason: translateGameText(reason, activeLang),
          };
        },
        triggerWin: (epilogue) => {
          if (st.exitSequence || st.caughtSequence) return;
          soundEngine.play('door_open');
          soundEngine.play('win');
          pendingHotspotRef.current = null;
          hoveredHotspotRef.current = null;
          setHoverLabel(null);

          const exitHs =
            st.hotspots.find((h) => h.id === 'door') ||
            st.hotspots.find((h) => h.id === 'elevator') ||
            st.hotspots.find((h) => h.id === 'helm_wheel');

          if (exitHs) {
            exitHs.active = true;
          }

          const doorZone =
            (exitHs && lvl.walkZones.find((z) => z.id === exitHs.zoneId)) ||
            lvl.walkZones[lvl.walkZones.length - 1];
          const rawDoorX = exitHs ? exitHs.x + exitHs.w * 0.5 : 1100;
          const doorFloorX = Math.max(
            doorZone.minX + 15,
            Math.min(doorZone.maxX - 10, rawDoorX)
          );
          const doorFloorY = doorZone.minY ? doorZone.minY + 12 : doorZone.y;

          // If Torquemada was holding an organ key, release him so he can walk out!
          if (st.torq.state === 'hold') {
            st.torq.state = 'idle';
            st.torq.stateTimer = 0;
          }

          // If Thomas was still across a shadow barrier / cage, shadow-hop him to main floor
          if (
            doorZone &&
            !canReachZone(lvl, st, st.thomas.zoneId, doorZone.id)
          ) {
            spawnParticles(st.thomas.x, st.thomas.y - 30, '#A855F7', 'star', 16);
            const fallbackX = Math.max(
              doorZone.minX + 20,
              Math.min(doorZone.maxX - 60, doorFloorX - 140)
            );
            st.thomas.zoneId = doorZone.id;
            st.thomas.x = fallbackX;
            st.thomas.y = doorFloorY + 14;
            st.thomas.targetX = fallbackX;
            st.thomas.targetY = st.thomas.y;
            st.thomas.state = 'shadow_in';
            st.thomas.stateTimer = 0.35;
            spawnParticles(st.thomas.x, st.thomas.y - 30, '#A855F7', 'star', 16);
          }

          st.exitSequence = {
            timer: 0,
            duration: lvl.id === 3 ? 2.65 : 2.35,
            doorId: exitHs?.id || 'door',
            doorX: doorFloorX,
            doorY: doorFloorY,
            epilogue: translateGameText(epilogue, langRef.current),
          };
        },
      });
    },
    [say, spawnBeam, spawnFlight, spawnParticles]
  );

  // ============================================================================
  // ISOLATED 60FPS CANVAS SIMULATION LOOP
  // ============================================================================
  useEffect(() => {
    if (screen === 'TITLE') return;

    let rafId = 0;
    let lastTime = performance.now();
    let elapsedAccum = 0;

    const tick = (now: number) => {
      const rawDt = (now - lastTime) / 1000;
      lastTime = now;
      const dt = Math.min(rawDt, 0.05);

      const st = runtimeRef.current;
      const lvl = LEVELS[st.levelId - 1];

      if (screenRef.current === 'PLAYING') {
        if (!st.exitSequence && !st.caughtSequence) {
          st.elapsedSeconds += dt;
          elapsedAccum += dt;
          if (elapsedAccum >= 0.5) {
            elapsedAccum = 0;
            setElapsedDisplay(Math.floor(st.elapsedSeconds));
          }
        }

        // Smoothly interpolate hotspot visual properties (size, position, open progress)
        for (const hs of st.hotspots) {
          const desiredScale = getTargetScale(hs.sizeState);
          const curScale = hs.renderScale ?? desiredScale;
          hs.renderScale = curScale + (desiredScale - curScale) * Math.min(1, dt * 11);

          const desiredAnim = hs.active ? 1 : 0;
          const curAnim = hs.animProgress ?? desiredAnim;
          if (Math.abs(desiredAnim - curAnim) > 0.002) {
            const dir = desiredAnim > curAnim ? 1 : -1;
            const nextAnim = curAnim + dir * dt * 2.1;
            hs.animProgress =
              dir > 0 ? Math.min(desiredAnim, nextAnim) : Math.max(desiredAnim, nextAnim);
          } else {
            hs.animProgress = desiredAnim;
          }

          if (hs.targetX !== undefined && Math.abs(hs.targetX - hs.x) > 0.5) {
            const dx = hs.targetX - hs.x;
            const speed = hs.id === 'dog' ? 420 : 280;
            const step = Math.sign(dx) * Math.min(Math.abs(dx), speed * dt);
            hs.x += step;
          }
          if (hs.targetY !== undefined && Math.abs(hs.targetY - hs.y) > 0.5) {
            const dy = hs.targetY - hs.y;
            const speed = 320;
            const step = Math.sign(dy) * Math.min(Math.abs(dy), speed * dt);
            hs.y += step;
          }
        }

        // Advance flying props (parabolic trajectories)
        if (st.flyingProps.length > 0) {
          const stillFlying: FlyingProp[] = [];
          for (const fp of st.flyingProps) {
            fp.progress += dt / Math.max(0.1, fp.duration);
            if (fp.progress >= 1) {
              fp.progress = 1;
              fp.onArrive?.();
            } else {
              stillFlying.push(fp);
            }
          }
          st.flyingProps = stillFlying;
        }

        // Update both cats
        const updateCat = (cat: CatEntity) => {
          if (cat.stateTimer > 0) {
            cat.stateTimer -= dt;
            if (cat.stateTimer <= 0 && cat.state !== 'hold' && cat.state !== 'panic') {
              cat.state = 'idle';
            }
          }
          const dx = cat.targetX - cat.x;
          const dy = cat.targetY - cat.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 3) {
            const speed = st.exitSequence
              ? cat.id === 'thomas'
                ? 300
                : 315
              : cat.id === 'thomas'
                ? 265
                : 295;
            const step = Math.min(dist, speed * dt);
            cat.x += (dx / dist) * step;
            cat.y += (dy / dist) * step;
            if (Math.abs(dx) > 1.5) {
              cat.facing = dx >= 0 ? 1 : -1;
            }
            if (cat.state === 'idle') cat.state = 'walk';
          } else {
            cat.x = cat.targetX;
            cat.y = cat.targetY;
            if (cat.state === 'walk') cat.state = 'idle';
          }
        };

        updateCat(st.thomas);
        updateCat(st.torq);

        if (st.thomas.state === 'walk' || st.torq.state === 'walk') {
          stepSoundTimerRef.current -= dt;
          if (stepSoundTimerRef.current <= 0) {
            stepSoundTimerRef.current = 0.24;
            soundEngine.play('step_stone');
          }
        } else {
          stepSoundTimerRef.current = 0;
        }

        // Execute pending interaction when Torquemada arrives on the floor!
        if (
          pendingHotspotRef.current &&
          st.activeCat === 'torquemada' &&
          !st.exitSequence &&
          !st.caughtSequence
        ) {
          const ph = pendingHotspotRef.current;
          const hsCenterX = ph.x + ph.w * 0.5;
          const distToTarget = Math.hypot(st.torq.x - st.torq.targetX, st.torq.y - st.torq.targetY);
          const distToObjX = Math.abs(st.torq.x - hsCenterX);
          if (
            distToTarget < 5 ||
            (distToObjX < ph.w * 0.5 + 48 && Math.abs(st.torq.y - st.torq.targetY) < 22)
          ) {
            pendingHotspotRef.current = null;
            st.torq.targetX = st.torq.x;
            st.torq.targetY = st.torq.y;
            executeHotspotInteraction(ph);
          }
        }

        // Advance door-open + walk-through win cutscene
        if (st.exitSequence) {
          const seq = st.exitSequence;
          seq.timer += dt;
          const walkStart = lvl.id === 3 ? 0.68 : 0.42;
          if (seq.timer >= walkStart) {
            st.thomas.targetX = seq.doorX - 10;
            st.thomas.targetY = seq.doorY;
            st.torq.targetX = seq.doorX + 12;
            st.torq.targetY = seq.doorY + 6;
          }
          if (seq.timer >= seq.duration) {
            const epilogue = seq.epilogue;
            st.exitSequence = null;
            const nextLvl = Math.min(10, lvl.id + 1);
            setUnlockedLevel((prev) => {
              const updated = Math.max(prev, nextLvl);
              try {
                localStorage.setItem(STORAGE_KEY, String(updated));
              } catch {
                // ignore storage quota errors
              }
              return updated;
            });
            const activeLang = langRef.current;
            setModalInfo({
              title: translateGameText(lvl.title, activeLang),
              message: epilogue,
            });
            setScreen(lvl.id === 10 ? 'GAME_VICTORY' : 'LEVEL_WIN');
            void voiceEngine.speak('system', epilogue, activeLang);
          }
        }

        // Advance hazard / dog lunge caught cutscene
        if (st.caughtSequence) {
          const cseq = st.caughtSequence;
          cseq.timer += dt;
          if (cseq.timer >= cseq.duration) {
            const { title, reason } = cseq;
            st.caughtSequence = null;
            setModalInfo({ title, message: reason });
            setScreen('CAUGHT');
            void voiceEngine.speak(
              lvl.id === 1 || lvl.id === 10 ? 'dog' : 'system',
              reason,
              langRef.current
            );
          }
        }
      }

      // Update particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt;
        return p.life > 0;
      });

      // Update beams
      beamsRef.current = beamsRef.current.filter((b) => {
        b.life -= dt;
        return b.life > 0;
      });

      // Update speech bubbles
      bubblesRef.current = bubblesRef.current.filter((b) => {
        b.timer -= dt;
        return b.timer > 0;
      });

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          renderGameFrame(
            ctx,
            lvl,
            st,
            hoveredHotspotRef.current,
            particlesRef.current,
            beamsRef.current,
            bubblesRef.current,
            now / 1000
          );
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [screen, executeHotspotInteraction]);

  // ============================================================================
  // KEYBOARD SHORTCUTS
  // ============================================================================
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (screenRef.current === 'TITLE') return;

      if (e.key === 'Escape') {
        e.preventDefault();
        if (screenRef.current === 'PLAYING') setScreen('PAUSED');
        else if (screenRef.current === 'PAUSED') setScreen('PLAYING');
        return;
      }

      if (screenRef.current !== 'PLAYING') return;

      const st = runtimeRef.current;
      if (st.exitSequence || st.caughtSequence) return;
      const k = e.key.toLowerCase();

      if (k === '1') {
        st.activeCat = 'thomas';
        setActiveCat('thomas');
        soundEngine.play('meow_thomas');
      } else if (k === '2') {
        st.activeCat = 'torquemada';
        setActiveCat('torquemada');
        soundEngine.play('meow_torq');
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const next: CatId = st.activeCat === 'thomas' ? 'torquemada' : 'thomas';
        st.activeCat = next;
        setActiveCat(next);
        soundEngine.play(next === 'thomas' ? 'meow_thomas' : 'meow_torq');
      } else if (k === 'q' || k === 'й') {
        if (st.activeCat === 'thomas') {
          st.thomasSpell = 'telekinesis';
          setThomasSpell('telekinesis');
        } else {
          st.selectedItemId = null;
          st.torqSkill = 'paws';
          setSelectedItemId(null);
          setTorqSkill('paws');
        }
      } else if (k === 'w' || k === 'ц') {
        if (st.activeCat === 'thomas') {
          st.thomasSpell = 'enlarge';
          setThomasSpell('enlarge');
        } else {
          st.selectedItemId = null;
          st.torqSkill = 'hack';
          setSelectedItemId(null);
          setTorqSkill('hack');
        }
      } else if (k === 'e' || k === 'у') {
        if (st.activeCat === 'thomas') {
          st.thomasSpell = 'shrink';
          setThomasSpell('shrink');
        }
      } else if (k === 'r' || k === 'к') {
        if (st.activeCat === 'thomas') {
          st.thomasSpell = 'shadow';
          setThomasSpell('shadow');
        }
      } else if (k === 'h' || k === 'р') {
        handleRequestHint();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  // ============================================================================
  // POINTER HANDLERS ON CANVAS
  // ============================================================================
  const toCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * CANVAS_W;
    const y = ((e.clientY - rect.top) / rect.height) * CANVAS_H;
    return { x, y };
  };

  const findHotspotAt = (x: number, y: number): Hotspot | null => {
    const st = runtimeRef.current;
    for (let i = st.hotspots.length - 1; i >= 0; i--) {
      const hs = st.hotspots[i];
      if (hs.hidden) continue;
      if (x >= hs.x - 6 && x <= hs.x + hs.w + 6 && y >= hs.y - 6 && y <= hs.y + hs.h + 6) {
        return hs;
      }
    }
    return null;
  };

  const handleCanvasMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (screen !== 'PLAYING') return;
    const st = runtimeRef.current;
    if (st.exitSequence || st.caughtSequence) {
      hoveredHotspotRef.current = null;
      setHoverLabel(null);
      return;
    }
    const { x, y } = toCanvasCoords(e);
    const hs = findHotspotAt(x, y);
    hoveredHotspotRef.current = hs;
    setHoverLabel(hs ? translateGameText(hs.name, langRef.current) : null);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (screen !== 'PLAYING') return;
    const st = runtimeRef.current;
    if (st.exitSequence || st.caughtSequence) return;

    const { x, y } = toCanvasCoords(e);
    const lvl = LEVELS[st.levelId - 1];
    const hs = findHotspotAt(x, y);

    if (hs) {
      pendingHotspotRef.current = null;
      if (st.activeCat === 'thomas') {
        executeHotspotInteraction(hs);
        return;
      }

      if (!canReachZone(lvl, st, st.torq.zoneId, hs.zoneId)) {
        const ui = UI_STRINGS[langRef.current];
        if (hs.id === 'door' || hs.id === 'helm_wheel' || hs.id === 'bio_scanner') {
          soundEngine.play('error');
          say('torquemada', ui.blockedPathError);
        } else {
          soundEngine.play('error');
          say('torquemada', ui.unreachableMagicHint);
        }
        return;
      }

      if (st.torq.state === 'hold' && hs.id !== 'organ_key_l') {
        st.torq.state = 'idle';
        st.flags.left_held = false;
        const kl = st.hotspots.find((h) => h.id === 'organ_key_l');
        if (kl) kl.active = false;
      }

      const targetZone = lvl.walkZones.find((z) => z.id === hs.zoneId);
      if (targetZone) {
        const hsCenter = hs.x + hs.w * 0.5;
        const standX =
          st.torq.x < hsCenter
            ? Math.max(targetZone.minX, hs.x - 16)
            : Math.min(targetZone.maxX, hs.x + hs.w + 16);
        const minY = targetZone.minY ?? targetZone.y;
        const maxY = targetZone.maxY ?? targetZone.y;
        const desiredY = Math.max(hs.y + hs.h - 4, targetZone.y);
        st.torq.zoneId = targetZone.id;
        st.torq.targetX = Math.max(targetZone.minX, Math.min(targetZone.maxX, standX));
        st.torq.targetY = Math.max(minY, Math.min(maxY, desiredY));
        pendingHotspotRef.current = hs;
      } else {
        executeHotspotInteraction(hs);
      }
      return;
    }

    // Click inactive cat to switch
    const otherCat = st.activeCat === 'thomas' ? st.torq : st.thomas;
    if (
      Math.abs(x - otherCat.x) < 30 &&
      y >= otherCat.y - 105 &&
      y <= otherCat.y + 14
    ) {
      st.activeCat = otherCat.id;
      setActiveCat(otherCat.id);
      soundEngine.play(otherCat.id === 'thomas' ? 'meow_thomas' : 'meow_torq');
      return;
    }

    // Walk active cat on 2D floor!
    const activeObj = st.activeCat === 'thomas' ? st.thomas : st.torq;
    pendingHotspotRef.current = null;

    if (st.activeCat === 'torquemada' && st.torq.state === 'hold') {
      st.torq.state = 'idle';
      st.flags.left_held = false;
      const kl = st.hotspots.find((h) => h.id === 'organ_key_l');
      if (kl) kl.active = false;
    }

    const reachableZones = lvl.walkZones.filter((z) =>
      canReachZone(lvl, st, activeObj.zoneId, z.id)
    );
    let chosenZone = reachableZones.find((z) => {
      const zMinY = (z.minY ?? z.y) - 45;
      const zMaxY = (z.maxY ?? z.y) + 45;
      return x >= z.minX - 30 && x <= z.maxX + 30 && y >= zMinY && y <= zMaxY;
    });
    if (!chosenZone) {
      chosenZone = reachableZones.find((z) => x >= z.minX - 30 && x <= z.maxX + 30);
    }
    if (!chosenZone) {
      chosenZone = reachableZones.reduce((best, z) => {
        const bestDist = Math.min(Math.abs(x - best.minX), Math.abs(x - best.maxX));
        const curDist = Math.min(Math.abs(x - z.minX), Math.abs(x - z.maxX));
        return curDist < bestDist ? z : best;
      }, reachableZones[0]);
    }

    if (chosenZone) {
      const minY = chosenZone.minY ?? chosenZone.y;
      const maxY = chosenZone.maxY ?? chosenZone.y;
      activeObj.zoneId = chosenZone.id;
      activeObj.targetX = Math.max(chosenZone.minX, Math.min(chosenZone.maxX, x));
      activeObj.targetY = Math.max(minY, Math.min(maxY, y));
    }
  };

  // ============================================================================
  // HUD CALLBACKS
  // ============================================================================
  const handleSelectCat = (cat: CatId) => {
    runtimeRef.current.activeCat = cat;
    setActiveCat(cat);
    soundEngine.play(cat === 'thomas' ? 'meow_thomas' : 'meow_torq');
  };

  const handleSelectSpell = (spell: ThomasSpell) => {
    runtimeRef.current.thomasSpell = spell;
    setThomasSpell(spell);
  };

  const handleSelectSkill = (skill: TorqSkill) => {
    runtimeRef.current.torqSkill = skill;
    setTorqSkill(skill);
  };

  const handleSelectItem = (itemId: string | null) => {
    runtimeRef.current.selectedItemId = itemId;
    setSelectedItemId(itemId);
  };

  const handleRequestHint = () => {
    const nextTier = hintTier >= 2 ? 0 : hintTier + 1;
    setHintTier(nextTier);
    if (nextTier === 0) {
      setHintText(null);
    } else {
      setHintText(translateGameText(currentLevel.hints[nextTier - 1], langRef.current));
    }
  };

  const handleToggleMute = () => {
    const next = !isMuted;
    soundEngine.setMuted(next);
    voiceEngine.setMuted(next);
    musicEngine.setGlobalMuted(next);
    setIsMuted(next);
  };

  const handleToggleMusic = () => {
    const next = !isMusicMuted;
    musicEngine.setMusicMuted(next);
    setIsMusicMuted(next);
  };

  if (screen === 'TITLE') {
    return (
      <TitleScreen
        lang={lang}
        unlockedLevel={unlockedLevel}
        isMuted={isMuted}
        isMusicMuted={isMusicMuted}
        onChangeLang={handleChangeLang}
        onToggleMute={handleToggleMute}
        onToggleMusic={handleToggleMusic}
        onStartLevel={loadLevel}
      />
    );
  }

  const targetAspect = CANVAS_W / CANVAS_H;
  const viewAspect = viewport.w / Math.max(1, viewport.h);
  const useCover = viewAspect >= 1.48 && viewAspect <= 2.15;
  const stageW = useCover
    ? Math.max(viewport.w, viewport.h * targetAspect)
    : Math.min(viewport.w, viewport.h * targetAspect);
  const stageH = useCover
    ? Math.max(viewport.h, viewport.w / targetAspect)
    : Math.min(viewport.h, viewport.w / targetAspect);
  const roomBackdropSrc = getRoomImage(currentLevel.id)?.src;
  const localizedLevelTitle = translateGameText(currentLevel.title, lang);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#040813] flex items-center justify-center">
      {!useCover && roomBackdropSrc && (
        <img
          src={roomBackdropSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-105 pointer-events-none"
        />
      )}

      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        onMouseMove={handleCanvasMove}
        onMouseLeave={() => {
          hoveredHotspotRef.current = null;
          setHoverLabel(null);
        }}
        onClick={handleCanvasClick}
        style={{ width: `${Math.ceil(stageW)}px`, height: `${Math.ceil(stageH)}px` }}
        className="relative z-10 shrink-0 block cursor-crosshair"
      />

      <GameHud
        lang={lang}
        levelId={currentLevel.id}
        levelTitle={localizedLevelTitle}
        activeCat={activeCat}
        thomasSpell={thomasSpell}
        torqSkill={torqSkill}
        inventory={inventory}
        selectedItemId={selectedItemId}
        hoverLabel={hoverLabel}
        speechBanner={speechBanner}
        hintTier={hintTier}
        hintText={hintText}
        isMuted={isMuted}
        isMusicMuted={isMusicMuted}
        isVoiceSpeaking={isVoiceSpeaking}
        onCycleLang={() => handleChangeLang(nextLang(lang))}
        onSelectCat={handleSelectCat}
        onSelectSpell={handleSelectSpell}
        onSelectSkill={handleSelectSkill}
        onSelectItem={handleSelectItem}
        onRequestHint={handleRequestHint}
        onCloseHint={() => {
          voiceEngine.stop();
          setHintTier(0);
          setHintText(null);
        }}
        onDismissSpeech={() => {
          voiceEngine.stop();
          setSpeechBanner(null);
        }}
        onReplaySpeech={() => {
          if (speechBanner) {
            void voiceEngine.speak(speechBanner.who, speechBanner.text, langRef.current);
          }
        }}
        onSpeakHint={() => {
          if (hintText) {
            void voiceEngine.speak('thomas', hintText, langRef.current);
          }
        }}
        onRestartLevel={() => loadLevel(currentLevel.id)}
        onToggleMute={handleToggleMute}
        onToggleMusic={handleToggleMusic}
        onPause={() => {
          voiceEngine.stop();
          setScreen('PAUSED');
        }}
      />

      <GameModals
        lang={lang}
        screen={screen}
        levelId={currentLevel.id}
        levelTitle={localizedLevelTitle}
        modalTitle={modalInfo.title}
        modalMessage={modalInfo.message}
        elapsedSeconds={elapsedDisplay}
        onChangeLang={handleChangeLang}
        onResume={() => setScreen('PLAYING')}
        onRetryLevel={() => loadLevel(currentLevel.id)}
        onNextLevel={() => loadLevel(Math.min(10, currentLevel.id + 1))}
        onGoTitle={() => {
          voiceEngine.stop();
          setScreen('TITLE');
        }}
      />
    </div>
  );
}
