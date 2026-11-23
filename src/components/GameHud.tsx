import React, { useEffect, useRef, useState } from 'react';
import {
  Sparkles,
  Maximize2,
  Minimize2,
  Moon,
  Hand,
  Zap,
  HelpCircle,
  RotateCcw,
  Volume2,
  VolumeX,
  Pause,
  Briefcase,
  Music,
  X,
} from 'lucide-react';
import { CatId, InventoryItem, ThomasSpell, TorqSkill } from '../game/types';
import { getSprite, SpriteKey } from '../game/sprites';

export interface SpeechBannerData {
  id: number;
  who: CatId | 'dog' | 'system';
  text: string;
  isIntro?: boolean;
}

interface GameHudProps {
  levelId: number;
  levelTitle: string;
  activeCat: CatId;
  thomasSpell: ThomasSpell;
  torqSkill: TorqSkill;
  inventory: InventoryItem[];
  selectedItemId: string | null;
  hoverLabel: string | null;
  speechBanner: SpeechBannerData | null;
  hintTier: number;
  hintText: string | null;
  isMuted: boolean;
  isMusicMuted?: boolean;
  isVoiceSpeaking?: boolean;
  onSelectCat: (cat: CatId) => void;
  onSelectSpell: (spell: ThomasSpell) => void;
  onSelectSkill: (skill: TorqSkill) => void;
  onSelectItem: (itemId: string | null) => void;
  onRequestHint: () => void;
  onCloseHint: () => void;
  onDismissSpeech: () => void;
  onReplaySpeech?: () => void;
  onSpeakHint?: () => void;
  onRestartLevel: () => void;
  onToggleMute: () => void;
  onToggleMusic?: () => void;
  onPause: () => void;
}

const RasterThumb: React.FC<{ spriteKey: SpriteKey; cropBust?: boolean; size?: number }> = ({
  spriteKey,
  cropBust = false,
  size = 38,
}) => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let timer: number | undefined;
    const draw = () => {
      const sp = getSprite(spriteKey);
      const c = ref.current;
      if (!c) return;
      if (!sp) {
        timer = window.setTimeout(draw, 120);
        return;
      }
      const ctx = c.getContext('2d')!;
      ctx.clearRect(0, 0, c.width, c.height);
      const sy = 0;
      const sh = cropBust ? sp.height * 0.68 : sp.height;
      const scale = Math.min(c.width / sp.width, c.height / sh);
      const dw = sp.width * scale;
      const dh = sh * scale;
      ctx.drawImage(
        sp,
        0,
        sy,
        sp.width,
        sh,
        (c.width - dw) * 0.5,
        (c.height - dh) * 0.5,
        dw,
        dh
      );
    };
    draw();
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [spriteKey, cropBust, size]);

  return (
    <canvas
      ref={ref}
      width={size}
      height={size}
      className="shrink-0 rounded-md pointer-events-none"
      style={{ width: size, height: size }}
    />
  );
};

function getItemSpriteKey(icon: InventoryItem['icon']): SpriteKey {
  switch (icon) {
    case 'key':
      return 'prop_key';
    case 'fuse':
      return 'prop_fuse';
    case 'gear':
      return 'prop_gear';
    case 'keycard':
      return 'prop_dome';
    default:
      return 'prop_key';
  }
}

export const GameHud: React.FC<GameHudProps> = ({
  levelId,
  levelTitle,
  activeCat,
  thomasSpell,
  torqSkill,
  inventory,
  selectedItemId,
  hoverLabel,
  speechBanner,
  hintTier,
  hintText,
  isMuted,
  isMusicMuted = false,
  isVoiceSpeaking = false,
  onSelectCat,
  onSelectSpell,
  onSelectSkill,
  onSelectItem,
  onRequestHint,
  onCloseHint,
  onDismissSpeech,
  onReplaySpeech,
  onSpeakHint,
  onRestartLevel,
  onToggleMute,
  onToggleMusic,
  onPause,
}) => {
  const [dockHoverLabel, setDockHoverLabel] = useState<string | null>(null);

  const spells: Array<{ id: ThomasSpell; tooltip: string; icon: React.ReactNode }> = [
    {
      id: 'telekinesis',
      tooltip: 'Телекинез — двигает и поворачивает предметы магией (Q)',
      icon: <Sparkles className="w-[18px] h-[18px]" />,
    },
    {
      id: 'enlarge',
      tooltip: 'Увеличить — делает предмет большим и тяжёлым (W)',
      icon: <Maximize2 className="w-[18px] h-[18px]" />,
    },
    {
      id: 'shrink',
      tooltip: 'Уменьшить — сжимает предметы и проходы (E)',
      icon: <Minimize2 className="w-[18px] h-[18px]" />,
    },
    {
      id: 'shadow',
      tooltip: 'Тень-прыжок — телепорт между теневыми пятнами (R)',
      icon: <Moon className="w-[18px] h-[18px]" />,
    },
  ];

  const skills: Array<{ id: TorqSkill; tooltip: string; icon: React.ReactNode }> = [
    {
      id: 'paws',
      tooltip: 'Лапки — берёт и применяет предметы вручную (Q)',
      icon: <Hand className="w-[18px] h-[18px]" />,
    },
    {
      id: 'hack',
      tooltip: 'Хакер-ток — чинит щитки и не боится электричества (W)',
      icon: <Zap className="w-[18px] h-[18px]" />,
    },
  ];

  const activeHoverText = dockHoverLabel || hoverLabel;

  const speakerMeta = speechBanner
    ? speechBanner.who === 'thomas'
      ? {
          name: 'Томас',
          border: 'border-[#C084FC]/70',
          accent: 'text-[#C084FC]',
          sprite: 'thomas_idle' as SpriteKey,
        }
      : speechBanner.who === 'torquemada'
        ? {
            name: 'Торквемада',
            border: 'border-[#00E5FF]/70',
            accent: 'text-[#38BDF8]',
            sprite: 'torq_idle' as SpriteKey,
          }
        : speechBanner.who === 'dog'
          ? {
              name: 'Баскервиль',
              border: 'border-[#FB7185]/75',
              accent: 'text-[#FB7185]',
              sprite: 'dog_angry' as SpriteKey,
            }
          : {
              name: `Глава ${String(levelId).padStart(2, '0')}`,
              border: 'border-[#F5B82E]/70',
              accent: 'text-[#F5B82E]',
              sprite: null,
            }
    : null;

  return (
    <>
      {/* TOP FLOATING INFORMATIONAL WINDOW (appears only when text is active) */}
      <div className="fixed top-3 inset-x-0 z-30 flex flex-col items-center gap-1.5 px-4 pointer-events-none">
        {hintText && (
          <div className="pointer-events-auto w-full max-w-xl bg-[#080F22]/90 backdrop-blur-md border border-[#F5B82E]/75 rounded-2xl px-4 py-3 shadow-[0_12px_36px_rgba(0,0,0,0.72)]">
            <div className="flex items-center justify-between gap-3 mb-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#F5B82E]">
                <span>
                  Глава {String(levelId).padStart(2, '0')} · {levelTitle}
                </span>
                <span className="text-[#475569]">•</span>
                <span className="text-[#FDE047]">
                  {hintTier === 1 ? 'Подсказка' : 'Пошаговый план'}
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {onSpeakHint && (
                  <button
                    onClick={onSpeakHint}
                    className={`p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer ${
                      isVoiceSpeaking ? 'text-[#00E5FF] animate-pulse' : 'text-[#F5B82E] hover:text-white'
                    }`}
                    title="Озвучить подсказку"
                    aria-label="Озвучить подсказку"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={onCloseHint}
                  className="p-1 text-[#94A3B8] hover:text-white rounded-md hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Закрыть подсказку"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-[13px] leading-relaxed text-[#E2E8F0]">{hintText}</p>
          </div>
        )}

        {!hintText && speechBanner && speakerMeta && (
          <div
            className={`pointer-events-auto w-full max-w-xl bg-[#080F22]/88 backdrop-blur-md border ${speakerMeta.border} rounded-2xl px-3.5 py-2.5 shadow-[0_12px_36px_rgba(0,0,0,0.7)] flex items-start gap-3`}
          >
            {speakerMeta.sprite && (
              <div className="w-10 h-10 rounded-lg bg-[#0E1730] border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                <RasterThumb spriteKey={speakerMeta.sprite} cropBust size={36} />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`text-xs font-bold ${speakerMeta.accent}`}>{speakerMeta.name}</span>
                {speechBanner.isIntro && (
                  <span className="text-[11px] font-semibold text-[#F5B82E]/90 truncate">
                    · Глава {String(levelId).padStart(2, '0')}: {levelTitle}
                  </span>
                )}
              </div>
              <p className="text-[13px] leading-snug text-[#F1F5F9]">{speechBanner.text}</p>
            </div>
            <div className="flex items-center gap-0.5 shrink-0">
              {onReplaySpeech && (
                <button
                  onClick={onReplaySpeech}
                  className={`p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer ${
                    isVoiceSpeaking ? 'text-[#00E5FF] animate-pulse' : 'text-[#94A3B8] hover:text-white'
                  }`}
                  title="Повторить озвучку"
                  aria-label="Повторить озвучку"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={onDismissSpeech}
                className="p-1 text-[#94A3B8] hover:text-white rounded-md hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                aria-label="Скрыть сообщение"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {activeHoverText && (
          <div className="bg-[#080F22]/86 backdrop-blur-md border border-[#32447A]/90 rounded-full px-4 py-1 text-xs font-semibold text-[#FDE047] shadow-lg max-w-[90vw] truncate">
            {activeHoverText}
          </div>
        )}
      </div>

      {/* BOTTOM GROUPED ICON-ONLY DOCK (zero text labels) */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-30 max-w-[96vw]">
        <div
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl bg-[#080F22]/84 backdrop-blur-md border border-[#2B3D6E]/85 shadow-[0_12px_40px_rgba(0,0,0,0.75)] overflow-x-auto"
          onMouseLeave={() => setDockHoverLabel(null)}
        >
          {/* 1. Hero Cats */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onSelectCat('thomas')}
              onMouseEnter={() => setDockHoverLabel('Томас — Кот-маг (клавиша 1)')}
              title="Томас — Кот-маг (1)"
              aria-label="Томас"
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all cursor-pointer overflow-hidden ${
                activeCat === 'thomas'
                  ? 'bg-[#2B1952] border-[#C084FC] shadow-[0_0_16px_rgba(192,132,252,0.4)] scale-105'
                  : 'bg-[#111930] border-[#253359] opacity-75 hover:opacity-100'
              }`}
            >
              <RasterThumb spriteKey="thomas_idle" cropBust size={34} />
            </button>

            <button
              onClick={() => onSelectCat('torquemada')}
              onMouseEnter={() => setDockHoverLabel('Торквемада — Кот-хакер (клавиша 2)')}
              title="Торквемада — Кот-хакер (2)"
              aria-label="Торквемада"
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all cursor-pointer overflow-hidden ${
                activeCat === 'torquemada'
                  ? 'bg-[#0F2C47] border-[#00E5FF] shadow-[0_0_16px_rgba(0,229,255,0.4)] scale-105'
                  : 'bg-[#111930] border-[#253359] opacity-75 hover:opacity-100'
              }`}
            >
              <RasterThumb spriteKey="torq_idle" cropBust size={34} />
            </button>
          </div>

          <div className="w-px h-7 bg-[#2B3D6E]/90 mx-0.5 shrink-0" />

          {/* 2. Active Cat Abilities (icons only) */}
          <div className="flex items-center gap-1.5 shrink-0">
            {activeCat === 'thomas'
              ? spells.map((sp) => {
                  const isActive = thomasSpell === sp.id;
                  return (
                    <button
                      key={sp.id}
                      onClick={() => onSelectSpell(sp.id)}
                      onMouseEnter={() => setDockHoverLabel(sp.tooltip)}
                      title={sp.tooltip}
                      aria-label={sp.tooltip}
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#3B1F6E] border-[#C084FC] text-[#FDE047] shadow-[0_0_14px_rgba(192,132,252,0.3)]'
                          : 'bg-[#111930] border-[#26355E] text-[#C084FC] hover:border-[#7C3AED] hover:text-white'
                      }`}
                    >
                      {sp.icon}
                    </button>
                  );
                })
              : skills.map((sk) => {
                  const isActive = torqSkill === sk.id && !selectedItemId;
                  return (
                    <button
                      key={sk.id}
                      onClick={() => {
                        onSelectItem(null);
                        onSelectSkill(sk.id);
                      }}
                      onMouseEnter={() => setDockHoverLabel(sk.tooltip)}
                      title={sk.tooltip}
                      aria-label={sk.tooltip}
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#0F3554] border-[#00E5FF] text-[#00E5FF] shadow-[0_0_14px_rgba(0,229,255,0.3)]'
                          : 'bg-[#111930] border-[#26355E] text-[#38BDF8] hover:border-[#0EA5E9] hover:text-white'
                      }`}
                    >
                      {sk.icon}
                    </button>
                  );
                })}
          </div>

          <div className="w-px h-7 bg-[#2B3D6E]/90 mx-0.5 shrink-0" />

          {/* 3. Inventory Slots (icons only) */}
          <div className="flex items-center gap-1.5 shrink-0">
            {inventory.length === 0 ? (
              <div
                onMouseEnter={() => setDockHoverLabel('Рюкзак пуст')}
                title="Рюкзак пуст"
                className="w-10 h-10 rounded-xl bg-[#0D1428]/80 border border-dashed border-[#2A3B66] flex items-center justify-center text-[#475569]"
              >
                <Briefcase className="w-[17px] h-[17px]" />
              </div>
            ) : (
              inventory.map((item) => {
                const isEquipped = selectedItemId === item.id && activeCat === 'torquemada';
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectCat('torquemada');
                      onSelectItem(isEquipped ? null : item.id);
                    }}
                    onMouseEnter={() => setDockHoverLabel(`${item.name} — ${item.description}`)}
                    title={`${item.name}: ${item.description}`}
                    aria-label={item.name}
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                      isEquipped
                        ? 'bg-[#422D0A] border-[#F5B82E] shadow-[0_0_14px_rgba(245,184,46,0.4)] scale-105'
                        : 'bg-[#111930] border-[#2C3E6B] hover:border-[#F5B82E]'
                    }`}
                  >
                    <RasterThumb spriteKey={getItemSpriteKey(item.icon)} size={28} />
                  </button>
                );
              })
            )}
          </div>

          <div className="w-px h-7 bg-[#2B3D6E]/90 mx-0.5 shrink-0" />

          {/* 4. Utility Controls (icons only) */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={onRequestHint}
              onMouseEnter={() =>
                setDockHoverLabel(
                  hintTier === 0
                    ? 'Подсказка (H)'
                    : hintTier === 1
                      ? 'Показать точный план (H)'
                      : 'Скрыть подсказку (H)'
                )
              }
              title="Подсказка (H)"
              aria-label="Подсказка"
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                hintTier > 0
                  ? 'bg-[#3D2C0B] border-[#F5B82E] text-[#FDE047]'
                  : 'bg-[#111930] border-[#26355E] text-[#FDE047] hover:border-[#F5B82E]'
              }`}
            >
              <HelpCircle className="w-[18px] h-[18px]" />
            </button>

            <button
              onClick={onRestartLevel}
              onMouseEnter={() => setDockHoverLabel('Начать комнату заново')}
              title="Начать комнату заново"
              aria-label="Начать комнату заново"
              className="w-10 h-10 rounded-xl bg-[#111930] border border-[#26355E] text-[#CBD5E1] hover:text-white hover:border-[#475F9E] flex items-center justify-center transition-all cursor-pointer"
            >
              <RotateCcw className="w-[17px] h-[17px]" />
            </button>

            {onToggleMusic && (
              <button
                onClick={onToggleMusic}
                onMouseEnter={() =>
                  setDockHoverLabel(
                    isMusicMuted
                      ? 'Включить музыку (20-мин луп)'
                      : 'Выключить музыку (20-мин луп)'
                  )
                }
                title={isMusicMuted ? 'Включить музыку' : 'Выключить музыку'}
                aria-label={isMusicMuted ? 'Включить музыку' : 'Выключить музыку'}
                className="relative w-10 h-10 rounded-xl bg-[#111930] border border-[#26355E] text-[#CBD5E1] hover:border-[#C084FC] flex items-center justify-center transition-all cursor-pointer"
              >
                <Music
                  className={`w-[17px] h-[17px] ${
                    isMusicMuted || isMuted ? 'text-[#64748B] opacity-55' : 'text-[#C084FC]'
                  }`}
                />
                {(isMusicMuted || isMuted) && (
                  <span className="absolute w-5 h-[2px] bg-[#94A3B8] rotate-45 rounded-full pointer-events-none" />
                )}
              </button>
            )}

            <button
              onClick={onToggleMute}
              onMouseEnter={() => setDockHoverLabel(isMuted ? 'Включить звук' : 'Выключить звук')}
              title={isMuted ? 'Включить звук' : 'Выключить звук'}
              aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
              className="w-10 h-10 rounded-xl bg-[#111930] border border-[#26355E] text-[#CBD5E1] hover:border-[#00E5FF] flex items-center justify-center transition-all cursor-pointer"
            >
              {isMuted ? (
                <VolumeX className="w-[18px] h-[18px] text-[#94A3B8]" />
              ) : (
                <Volume2 className="w-[18px] h-[18px] text-[#00E5FF]" />
              )}
            </button>

            <button
              onClick={onPause}
              onMouseEnter={() => setDockHoverLabel(`Пауза · Глава ${levelId}: ${levelTitle} (Esc)`)}
              title="Пауза (Esc)"
              aria-label="Пауза"
              className="w-10 h-10 rounded-xl bg-[#111930] border border-[#26355E] text-[#CBD5E1] hover:text-white hover:border-[#475F9E] flex items-center justify-center transition-all cursor-pointer"
            >
              <Pause className="w-[17px] h-[17px]" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
