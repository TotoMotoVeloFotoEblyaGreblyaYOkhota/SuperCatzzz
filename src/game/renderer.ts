import { getRoomImage, getSprite, SpriteKey } from './sprites';
import {
  CatEntity,
  FlyingProp,
  Hotspot,
  LevelDefinition,
  MagicBeam,
  NpcCoat,
  Particle,
  RuntimeLevelState,
  SpeechBubble,
} from './types';

export const CANVAS_W = 1280;
export const CANVAS_H = 720;

function drawSpriteAnchored(
  ctx: CanvasRenderingContext2D,
  sprite: HTMLCanvasElement,
  cx: number,
  bottomY: number,
  targetH: number,
  facing: 1 | -1 = 1,
  scaleX = 1,
  scaleY = 1,
  tilt = 0
) {
  const aspect = sprite.width / Math.max(1, sprite.height);
  const drawH = targetH;
  const drawW = drawH * aspect;

  ctx.save();
  ctx.translate(cx, bottomY);
  if (tilt !== 0) ctx.rotate(tilt);
  ctx.scale(facing * scaleX, scaleY);
  ctx.drawImage(sprite, -drawW * 0.5, -drawH, drawW, drawH);
  ctx.restore();
}

function drawSpriteInBox(
  ctx: CanvasRenderingContext2D,
  sprite: HTMLCanvasElement,
  hs: Hotspot,
  scale = 1,
  extraScale = 1,
  rotation = 0,
  flipX = false,
  extraScaleY = extraScale
) {
  const cx = hs.x + hs.w * 0.5;
  const cy = hs.y + hs.h * 0.5;
  const aspect = sprite.width / Math.max(1, sprite.height);
  const boxAspect = hs.w / Math.max(1, hs.h);

  let dw = hs.w;
  let dh = hs.h;
  if (aspect > boxAspect) {
    dh = hs.w / aspect;
  } else {
    dw = hs.h * aspect;
  }
  dw *= scale * extraScale;
  dh *= scale * extraScaleY;

  ctx.save();
  ctx.translate(cx, cy);
  if (rotation !== 0) ctx.rotate(rotation);
  if (flipX) ctx.scale(-1, 1);
  ctx.drawImage(sprite, -dw * 0.5, -dh * 0.5, dw, dh);
  ctx.restore();
}

function getFloorDepthScale(y: number): number {
  if (y < 380) return 0.78;
  const t = Math.max(0, Math.min(1, (y - 540) / 145));
  return 0.91 + t * 0.14;
}

// ============================================================================
// RASTER HERO CATS (Томас & Торквемада — строго по полу с глубиной!)
// ============================================================================
function drawHeroCat(
  ctx: CanvasRenderingContext2D,
  cat: CatEntity,
  isSelected: boolean,
  state: RuntimeLevelState,
  time: number
) {
  const isThomas = cat.id === 'thomas';
  const depthScale = getFloorDepthScale(cat.y);
  const walkPhase = time * (isThomas ? 12 : 14);
  const isWalking = cat.state === 'walk';
  const walkBob = isWalking ? -Math.abs(Math.sin(walkPhase)) * 5 : 0;
  const walkTilt = isWalking ? Math.sin(walkPhase) * 0.045 * cat.facing : 0;

  const panicJump = cat.state === 'panic' ? -Math.abs(Math.sin(time * 22)) * 16 : 0;
  const shakeX =
    cat.state === 'strain'
      ? Math.sin(time * 48) * 4
      : cat.state === 'shock'
        ? Math.sin(time * 65) * 5
        : 0;

  // Fade/shrink slightly when stepping inside an open exit door
  let exitAlpha = 1;
  let exitScale = 1;
  if (state.exitSequence) {
    const seq = state.exitSequence;
    const distToDoor = Math.hypot(cat.x - seq.doorX, cat.y - seq.doorY);
    if (seq.timer > 1.2 && distToDoor < 85) {
      const enterT = Math.min(1, (seq.timer - 1.2) / 0.85);
      exitAlpha = Math.max(0.08, 1 - enterT * 0.9);
      exitScale = 1 - enterT * 0.28;
    }
  }

  ctx.save();
  ctx.globalAlpha = exitAlpha;

  // Ground shadow directly beneath paws on floor plane
  ctx.fillStyle = isThomas ? 'rgba(15, 10, 35, 0.5)' : 'rgba(0, 0, 0, 0.48)';
  ctx.beginPath();
  ctx.ellipse(cat.x, cat.y + 2, 28 * depthScale * exitScale, 9 * depthScale, 0, 0, Math.PI * 2);
  ctx.fill();

  // Active character floor ring
  if (isSelected && !state.exitSequence) {
    ctx.strokeStyle = isThomas ? '#C084FC' : '#00E5FF';
    ctx.lineWidth = 2.8;
    ctx.setLineDash([7, 5]);
    ctx.beginPath();
    ctx.ellipse(cat.x, cat.y + 2, 38 * depthScale, 12 * depthScale, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Select exact raster sprite pose
  let key: SpriteKey;
  if (isThomas) {
    if (cat.state === 'cast') key = 'thomas_cast';
    else if (cat.state === 'shadow_in' || cat.state === 'shadow_out' || cat.state === 'panic')
      key = 'thomas_sneak';
    else if (isWalking) key = Math.floor(time * 7) % 2 === 0 ? 'thomas_walk' : 'thomas_idle';
    else key = 'thomas_idle';
  } else {
    if (cat.state === 'shock' || cat.state === 'panic') key = 'torq_shock';
    else if (cat.state === 'strain' || cat.state === 'hold') key = 'torq_strain';
    else if (isWalking) key = Math.floor(time * 8.5) % 2 === 0 ? 'torq_walk' : 'torq_idle';
    else key = 'torq_idle';
  }

  const sprite = getSprite(key);
  const drawY = cat.y + walkBob + panicJump;
  const drawX = cat.x + shakeX;

  if (sprite) {
    const breathe = cat.state === 'idle' ? 1 + Math.sin(time * 3 + cat.bobPhase) * 0.016 : 1;
    const popScale = cat.state === 'shadow_in' ? 1 + cat.stateTimer * 0.45 : 1;
    const targetH = 126 * depthScale * exitScale;
    drawSpriteAnchored(
      ctx,
      sprite,
      drawX,
      drawY + 4,
      targetH,
      cat.facing,
      popScale,
      breathe * popScale,
      walkTilt
    );
  } else {
    ctx.fillStyle = '#0B0D14';
    ctx.beginPath();
    ctx.ellipse(drawX, drawY - 35, 18, 30, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Magic aura around Thomas when casting spell
  if (isThomas && cat.state === 'cast') {
    ctx.strokeStyle = '#C084FC';
    ctx.shadowColor = '#C084FC';
    ctx.shadowBlur = 14;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(cat.x, cat.y + 1, 32 * depthScale, 10 * depthScale, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Electric sparks overlay for Torquemada shock
  if (!isThomas && cat.state === 'shock') {
    ctx.strokeStyle = '#00E5FF';
    ctx.shadowColor = '#00E5FF';
    ctx.shadowBlur = 10;
    ctx.lineWidth = 2.5;
    for (let s = 0; s < 6; s++) {
      const a = (s / 6) * Math.PI * 2 + time * 18;
      ctx.beginPath();
      ctx.moveTo(drawX + Math.cos(a) * 22, drawY - 58 * depthScale + Math.sin(a) * 28);
      ctx.lineTo(drawX + Math.cos(a + 0.25) * 44, drawY - 58 * depthScale + Math.sin(a + 0.25) * 48);
      ctx.stroke();
    }
  }

  ctx.restore();
}

// ============================================================================
// FLYING PROPS OVERLAY (key drops, crates, gears, bones, fleeing pests)
// ============================================================================
function drawFlyingProps(ctx: CanvasRenderingContext2D, flyingProps: FlyingProp[]) {
  for (const fp of flyingProps) {
    const t = Math.max(0, Math.min(1, fp.progress));
    const ease = t * (2 - t);
    const x = fp.fromX + (fp.toX - fp.fromX) * ease;
    const linearY = fp.fromY + (fp.toY - fp.fromY) * t;
    const arcY = Math.sin(t * Math.PI) * fp.arcHeight;
    const y = linearY - arcY;
    const sc = fp.scaleFrom + (fp.scaleTo - fp.scaleFrom) * t;
    const alpha = fp.fadeOut ? Math.max(0, 1 - Math.max(0, (t - 0.5) * 2)) : 1;
    const rot = (fp.spin ?? 0) * t;

    const sp = getSprite(fp.spriteKey as SpriteKey);
    if (!sp) continue;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    if (rot !== 0) ctx.rotate(rot);
    const drawH = 68 * sc;
    const drawW = drawH * (sp.width / Math.max(1, sp.height));
    ctx.shadowColor = 'rgba(192, 132, 252, 0.7)';
    ctx.shadowBlur = 14;
    ctx.drawImage(sp, -drawW * 0.5, -drawH * 0.5, drawW, drawH);
    ctx.restore();
  }
}

// ============================================================================
// OPEN DOOR / PORTAL / ELEVATOR ANIMATION
// ============================================================================
function drawAnimatedDoorOpening(
  ctx: CanvasRenderingContext2D,
  hs: Hotspot,
  levelId: number,
  time: number
) {
  const p = hs.animProgress ?? (hs.active ? 1 : 0);
  if (p <= 0.01) return;

  ctx.save();
  // Golden/Starry portal light spill on the stone floor outside
  const floorGrad = ctx.createLinearGradient(hs.x, hs.y + hs.h, hs.x + hs.w, hs.y + hs.h + 75);
  floorGrad.addColorStop(0, `rgba(253, 224, 71, ${0.42 * p})`);
  floorGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
  ctx.fillStyle = floorGrad;
  ctx.beginPath();
  ctx.moveTo(hs.x + 12, hs.y + hs.h);
  ctx.lineTo(hs.x + hs.w - 12, hs.y + hs.h);
  ctx.lineTo(hs.x + hs.w + 40, hs.y + hs.h + 75);
  ctx.lineTo(hs.x - 55, hs.y + hs.h + 75);
  ctx.closePath();
  ctx.fill();

  // Clip interior opening
  ctx.beginPath();
  ctx.roundRect(hs.x + 8, hs.y + 8, hs.w - 16, hs.h - 14, [hs.w * 0.35, hs.w * 0.35, 4, 4]);
  ctx.clip();

  // Swirling cosmic starry interior behind open doorway
  const cx = hs.x + hs.w * 0.5;
  const cy = hs.y + hs.h * 0.48;
  const portalGrad = ctx.createRadialGradient(cx, cy, 8, cx, cy, Math.max(hs.w, hs.h) * 0.65);
  portalGrad.addColorStop(0, levelId === 10 ? '#FEF08A' : '#E0F2FE');
  portalGrad.addColorStop(0.42, levelId === 10 ? '#F59E0B' : '#38BDF8');
  portalGrad.addColorStop(0.8, '#1E1B4B');
  portalGrad.addColorStop(1, '#090D1F');
  ctx.globalAlpha = Math.min(1, p * 1.15);
  ctx.fillStyle = portalGrad;
  ctx.fillRect(hs.x, hs.y, hs.w, hs.h);

  // Twinkling swirl rings inside portal
  ctx.strokeStyle = 'rgba(254, 240, 138, 0.55)';
  ctx.lineWidth = 2.5;
  for (let r = 1; r <= 3; r++) {
    ctx.beginPath();
    ctx.arc(cx, cy, r * 22 + ((time * 24) % 18), 0, Math.PI * 1.45);
    ctx.stroke();
  }

  // Parting double-door panels sliding outward
  const slideOffset = p * (hs.w * 0.45);
  ctx.fillStyle = '#1E293B';
  ctx.strokeStyle = '#F5B82E';
  ctx.lineWidth = 3;
  const halfW = hs.w * 0.5;
  // Left leaf
  ctx.fillRect(hs.x - slideOffset, hs.y, halfW, hs.h);
  ctx.strokeRect(hs.x - slideOffset + 2, hs.y + 4, halfW - 4, hs.h - 8);
  // Right leaf
  ctx.fillRect(hs.x + halfW + slideOffset, hs.y, halfW, hs.h);
  ctx.strokeRect(hs.x + halfW + slideOffset + 2, hs.y + 4, halfW - 4, hs.h - 8);

  // Level 5 Clock Dial Vault hands spinning counter-clockwise when opening!
  if (levelId === 5) {
    ctx.strokeStyle = '#F5B82E';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(-time * 9) * 42, cy + Math.sin(-time * 9) * 42);
    ctx.stroke();
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(-time * 2.5) * 60, cy + Math.sin(-time * 2.5) * 60);
    ctx.stroke();
  }

  ctx.restore();
}

// ============================================================================
// AMBIENT & STORY EVENT ANIMATIONS PER LEVEL
// ============================================================================
function drawLevelEffectsBehindHotspots(
  ctx: CanvasRenderingContext2D,
  level: LevelDefinition,
  state: RuntimeLevelState,
  time: number
) {
  // Level 2: Bubbling neon acid trench in chasm
  if (level.id === 2) {
    ctx.save();
    const glow = 0.65 + Math.sin(time * 3.5) * 0.2;
    const grad = ctx.createLinearGradient(475, 620, 475, 720);
    grad.addColorStop(0, `rgba(126, 224, 129, ${0.42 * glow})`);
    grad.addColorStop(1, 'rgba(16, 185, 129, 0.78)');
    ctx.fillStyle = grad;
    ctx.fillRect(468, 634, 308, 86);

    for (let i = 0; i < 9; i++) {
      const bx = 490 + ((i * 34 + time * 18) % 270);
      const bt = (time * 0.8 + i * 0.37) % 1;
      const by = 695 - bt * 58;
      const br = 3 + Math.sin(bt * Math.PI) * 5.5;
      ctx.fillStyle = `rgba(167, 243, 208, ${(1 - bt) * 0.85})`;
      ctx.beginPath();
      ctx.arc(bx, by, br, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // Level 3: Skylight Moonbeam & 3-bounce Reflected Beam Path!
  if (level.id === 3) {
    ctx.save();
    // Twinkling Van Gogh stars around upper cupola
    for (let i = 0; i < 12; i++) {
      const sx = 180 + ((i * 87) % 920);
      const sy = 52 + ((i * 43) % 105);
      const tw = 0.4 + 0.6 * Math.abs(Math.sin(time * 2.5 + i));
      ctx.fillStyle = `rgba(253, 224, 71, ${tw * 0.8})`;
      ctx.beginPath();
      ctx.arc(sx, sy, 1.8 + tw * 1.6, 0, Math.PI * 2);
      ctx.fill();
    }

    if (state.flags.roof_open) {
      // Open roof hatch glow
      const hatchGrad = ctx.createRadialGradient(555, 65, 8, 555, 65, 95);
      hatchGrad.addColorStop(0, 'rgba(254, 249, 195, 0.85)');
      hatchGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = hatchGrad;
      ctx.fillRect(460, 15, 190, 100);

      // Skylight -> Lens moonbeam cone
      const beamAlpha = state.flags.lens_big ? 0.34 : 0.18;
      ctx.fillStyle = state.flags.lens_big
        ? `rgba(253, 224, 71, ${beamAlpha})`
        : `rgba(147, 197, 253, ${beamAlpha})`;
      ctx.beginPath();
      ctx.moveTo(522, 65);
      ctx.lineTo(592, 65);
      ctx.lineTo(586, 442);
      ctx.lineTo(506, 442);
      ctx.closePath();
      ctx.fill();

      // Focused reflected rays!
      if (state.flags.pest_gone && state.flags.lens_big) {
        ctx.strokeStyle = 'rgba(253, 224, 71, 0.92)';
        ctx.shadowColor = '#FDE047';
        ctx.shadowBlur = 16;
        ctx.lineWidth = state.flags.ring_aligned ? 8 : 5;
        ctx.lineCap = 'round';

        // Bounce 1: Lens (575, 438) -> Astro Ring (752, 225)
        ctx.beginPath();
        ctx.moveTo(575, 438);
        ctx.lineTo(752, 225);
        // Bounce 2: Astro Ring -> Photocell / Plug (1012, 472)
        if (state.flags.ring_aligned) {
          ctx.lineTo(1012, 472);
        }
        ctx.stroke();

        // Inner crisp white core of light ray
        ctx.strokeStyle = '#FEF9C3';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(575, 438);
        ctx.lineTo(752, 225);
        if (state.flags.ring_aligned) {
          ctx.lineTo(1012, 472);
        }
        ctx.stroke();

        // Spark shimmer where beam hits Ring or Photocell
        const pulseR = 10 + Math.sin(time * 9) * 4;
        ctx.fillStyle = 'rgba(253, 224, 71, 0.85)';
        ctx.beginPath();
        ctx.arc(752, 225, pulseR, 0, Math.PI * 2);
        ctx.fill();
        if (state.flags.ring_aligned) {
          ctx.beginPath();
          ctx.arc(1012, 472, state.flags.plug_removed ? pulseR * 1.45 : pulseR, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    ctx.restore();
  }

  // Level 5: Background gears & heavy swinging pendulum
  if (level.id === 5) {
    ctx.save();
    // Subtle rotating cogs in upper wall
    const drawCog = (gx: number, gy: number, r: number, dir: number) => {
      ctx.save();
      ctx.translate(gx, gy);
      ctx.rotate(time * 0.65 * dir);
      ctx.strokeStyle = 'rgba(245, 184, 46, 0.32)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();
      for (let t = 0; t < 8; t++) {
        const a = (t / 8) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
        ctx.lineTo(Math.cos(a) * (r + 10), Math.sin(a) * (r + 10));
        ctx.stroke();
      }
      ctx.restore();
    };
    drawCog(420, 145, 38, 1);
    drawCog(502, 182, 28, -1.35);

    const ang = Math.sin(time * 2.15) * 0.44;
    ctx.translate(688, 55);
    ctx.rotate(ang);
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 315);
    ctx.stroke();
    ctx.fillStyle = '#F5B82E';
    ctx.shadowColor = '#F5B82E';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(0, 325, 33, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Level 6: Glowing greenhouse fireflies / spores
  if (level.id === 6) {
    ctx.save();
    for (let i = 0; i < 12; i++) {
      const fx = 120 + i * 92 + Math.sin(time * 1.3 + i) * 28;
      const fy = 160 + ((i * 53) % 280) + Math.cos(time * 1.7 + i * 2) * 22;
      const alpha = 0.35 + 0.45 * Math.sin(time * 3 + i);
      ctx.fillStyle = `rgba(126, 224, 129, ${alpha})`;
      ctx.beginPath();
      ctx.arc(fx, fy, 3.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // Level 9: Swirling magnetic abyss vortex
  if (level.id === 9) {
    ctx.save();
    const vx = 625;
    const vy = 640;
    for (let r = 0; r < 3; r++) {
      const rad = 45 + r * 38 + Math.sin(time * 3 + r) * 6;
      ctx.strokeStyle = r % 2 === 0 ? 'rgba(0, 229, 255, 0.35)' : 'rgba(168, 85, 247, 0.35)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(vx, vy, rad, rad * 0.28, time * 0.7 * (r % 2 === 0 ? 1 : -1), 0, Math.PI * 1.55);
      ctx.stroke();
    }
    ctx.restore();
  }
}

function drawLevelEffectsInFront(
  ctx: CanvasRenderingContext2D,
  level: LevelDefinition,
  state: RuntimeLevelState,
  time: number
) {
  // Level 1: Lullaby notes or Zzz bubbles + EQ bars on active panel
  if (level.id === 1) {
    const dogHs = state.hotspots.find((h) => h.id === 'dog');
    if (dogHs && !state.caughtSequence) {
      ctx.save();
      if (state.flags.dog_lullaby) {
        // Music waves pulsing around dog headphones
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.65)';
        ctx.lineWidth = 2.5;
        for (let k = 0; k < 2; k++) {
          const r = 24 + ((time * 28 + k * 14) % 28);
          ctx.globalAlpha = 1 - (r - 24) / 28;
          ctx.beginPath();
          ctx.arc(dogHs.x + 62, dogHs.y + 42, r, Math.PI * 0.9, Math.PI * 2.1);
          ctx.stroke();
        }
        ctx.globalAlpha = 0.95;
        ctx.fillStyle = '#C084FC';
        ctx.font = 'bold 20px Manrope';
        ctx.fillText('♪', dogHs.x + 32, dogHs.y + 18 - ((time * 18) % 24));
        ctx.fillText('♫', dogHs.x + 88, dogHs.y + 26 - (((time * 18) + 12) % 24));
      } else {
        const zOff = (time * 18) % 34;
        ctx.fillStyle = 'rgba(226, 232, 240, 0.85)';
        ctx.font = 'bold 18px Manrope';
        ctx.fillText('Z', dogHs.x + 42, dogHs.y + 22 - zOff);
        ctx.font = 'bold 14px Manrope';
        ctx.fillText('z', dogHs.x + 56, dogHs.y + 10 - zOff * 0.8);
      }
      ctx.restore();
    }

    const panel = state.hotspots.find((h) => h.id === 'panel');
    if (panel?.active) {
      ctx.save();
      ctx.fillStyle = '#00E5FF';
      for (let b = 0; b < 5; b++) {
        const bh = 8 + Math.abs(Math.sin(time * 9 + b * 1.4)) * 22;
        ctx.fillRect(panel.x + 22 + b * 9, panel.y + 62 - bh, 5, bh);
      }
      ctx.restore();
    }
  }

  // Level 2: Winch hoist cable + counterweight lift
  if (level.id === 2) {
    const cw = state.hotspots.find((h) => h.id === 'counterweight');
    if (cw) {
      const liftY = state.flags.bridge_down ? -52 : 0;
      ctx.save();
      ctx.strokeStyle = '#CBD5E1';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(cw.x + cw.w * 0.5, 45);
      ctx.lineTo(cw.x + cw.w * 0.5, cw.y + 20 + liftY);
      ctx.stroke();

      // Pulley wheel
      ctx.translate(cw.x + cw.w * 0.5, 58);
      if (state.flags.power_on) ctx.rotate(time * 5);
      ctx.strokeStyle = state.flags.power_on ? '#00E5FF' : '#94A3B8';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0, 18, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }

  // Level 4: Resonating sound rings from organ & cleared pipe
  if (level.id === 4) {
    ctx.save();
    if (state.flags.pipe_clear) {
      const ny = (time * 26) % 45;
      ctx.fillStyle = '#F5B82E';
      ctx.font = 'bold 20px Manrope';
      ctx.fillText('♪', 575, 225 - ny);
    }
    if (state.flags.resonator_big) {
      const res = state.hotspots.find((h) => h.id === 'resonator');
      if (res) {
        const ring = (time * 32) % 36;
        ctx.strokeStyle = `rgba(253, 224, 71, ${1 - ring / 36})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(res.x + res.w * 0.5, res.y + res.h * 0.5, 34 + ring, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
    if (state.exitSequence) {
      // Expanding golden acoustic waves blasting open the doors!
      for (let i = 0; i < 3; i++) {
        const wr = ((time * 220 + i * 70) % 240);
        ctx.strokeStyle = `rgba(255, 178, 107, ${1 - wr / 240})`;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(885, 315, 35 + wr, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  // Level 6: UV light beam & pouring nectar stream from watering can onto sunflower!
  if (level.id === 6) {
    ctx.save();
    if (state.flags.uv_on) {
      const uvGrad = ctx.createLinearGradient(235, 490, 840, 490);
      uvGrad.addColorStop(0, 'rgba(192, 132, 252, 0.52)');
      uvGrad.addColorStop(1, 'rgba(168, 85, 247, 0.14)');
      ctx.fillStyle = uvGrad;
      ctx.beginPath();
      ctx.moveTo(235, 478);
      ctx.lineTo(845, 395);
      ctx.lineTo(855, 595);
      ctx.lineTo(235, 520);
      ctx.closePath();
      ctx.fill();
    }
    if (state.flags.plant_asleep) {
      // Animated pouring sleeping nectar stream from tilted watering can
      ctx.strokeStyle = 'rgba(126, 224, 129, 0.78)';
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 8]);
      ctx.lineDashOffset = -time * 120;
      for (let s = 0; s < 3; s++) {
        ctx.beginPath();
        ctx.moveTo(765 + s * 6, 232 + s * 4);
        ctx.quadraticCurveTo(805 + s * 10, 320, 822 + s * 14, 435);
        ctx.stroke();
      }
      ctx.setLineDash([]);
    }
    ctx.restore();
  }

  // Level 8: Furnace heat glow + roaring bellows flame jet melting solder chain!
  if (level.id === 8) {
    ctx.save();
    if (state.flags.furnace_on) {
      const fg = ctx.createRadialGradient(580, 535, 10, 580, 535, 130);
      fg.addColorStop(0, 'rgba(255, 107, 53, 0.55)');
      fg.addColorStop(1, 'rgba(255, 107, 53, 0)');
      ctx.fillStyle = fg;
      ctx.fillRect(450, 405, 260, 260);
    }
    if (state.flags.solder_melted) {
      // Glowing stream of hot air/sparks from bellows to solder chain
      ctx.strokeStyle = '#FF6B35';
      ctx.shadowColor = '#FF6B35';
      ctx.shadowBlur = 12;
      ctx.lineWidth = 5;
      ctx.setLineDash([12, 10]);
      ctx.lineDashOffset = -time * 160;
      ctx.beginPath();
      ctx.moveTo(752, 495);
      ctx.quadraticCurveTo(810, 410, 868, 345);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    ctx.restore();
  }

  // Level 9: Magnetic levitation beams holding platform
  if (level.id === 9) {
    const mp = state.hotspots.find((h) => h.id === 'magnet_platform');
    if (mp) {
      ctx.save();
      ctx.strokeStyle = mp.active ? 'rgba(0, 229, 255, 0.72)' : 'rgba(168, 85, 247, 0.55)';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([6, 6]);
      ctx.lineDashOffset = -time * 40;
      ctx.beginPath();
      ctx.moveTo(mp.x + 35, 110);
      ctx.lineTo(mp.x + 35, mp.y + 18);
      ctx.moveTo(mp.x + mp.w - 35, 110);
      ctx.lineTo(mp.x + mp.w - 35, mp.y + 18);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }
  }

  // Level 10: Heart bubbles & Mega-Bone beside happy Baskerville on the left
  if (level.id === 10 && state.flags.dog_distracted) {
    const dogHs = state.hotspots.find((h) => h.id === 'dog');
    const boneSp = getSprite('prop_bone');
    if (dogHs && boneSp) {
      const bx = dogHs.x + 30;
      const by = dogHs.y + dogHs.h - 4;
      drawSpriteAnchored(ctx, boneSp, bx, by, 58, 1);
      ctx.save();
      ctx.fillStyle = '#FF5E7E';
      ctx.font = 'bold 18px Manrope';
      const hy = (time * 24) % 30;
      ctx.fillText('♥', dogHs.x + 95, dogHs.y + 20 - hy);
      ctx.restore();
    }
  }
}

// ============================================================================
// HOTSPOTS & RASTER PROPS RENDERER
// ============================================================================
function getPropSpriteKey(hs: Hotspot): SpriteKey | null {
  switch (hs.visual) {
    case 'key':
      return 'prop_key';
    case 'pillow':
      return 'prop_pillow';
    case 'panel':
    case 'holo_steak':
      return 'prop_panel';
    case 'terminal':
    case 'bio_scanner':
      return 'prop_scanner';
    case 'fuse':
      return 'prop_fuse';
    case 'counterweight':
    case 'clock_weight':
      return 'prop_weight';
    case 'bolt':
      return 'prop_bolt';
    case 'crate':
      return 'prop_crate';
    case 'telescope':
      return 'prop_telescope';
    case 'plant':
      return 'prop_plant';
    case 'scroll':
      return 'prop_scroll';
    case 'glass_dome':
      return 'prop_dome';
    case 'catapult':
      return 'prop_catapult';
    case 'toy_bone':
      return 'prop_bone';
    case 'small_gear':
    case 'clock_gear_slot':
      return 'prop_gear';
    case 'generator':
      return 'prop_generator';
    case 'furnace':
      return 'prop_furnace';
    case 'uv_lamp':
      return 'prop_uv_lamp';
    case 'resonator':
      return 'prop_bell';
    case 'lever':
    case 'magnet_switch':
      return 'prop_lever';
    case 'watering_can':
      return 'prop_can';
    case 'lens':
      return 'prop_lens';
    case 'organ_key_l':
    case 'organ_key_r':
      return 'prop_organ_key';
    case 'pipe_cork':
      return 'prop_cork';
    case 'cable':
    case 'wire_break':
      return 'prop_cable';
    case 'holo_socket':
      return 'prop_socket';
    case 'astro_ring':
      return 'prop_astro_ring';
    case 'plug':
      return 'prop_plug';
    case 'photocell':
      return 'prop_photocell';
    case 'keycard':
      return 'prop_keycard';
    case 'bellows':
      return 'prop_bellows';
    case 'solder_chain':
      return 'prop_chain';
    case 'hot_hook':
      return 'prop_hook';
    case 'magnet_platform':
      return 'prop_mag_platform';
    default:
      return null;
  }
}

function drawHotspot(
  ctx: CanvasRenderingContext2D,
  hs: Hotspot,
  state: RuntimeLevelState,
  isHovered: boolean,
  time: number
) {
  if (hs.hidden) return;

  const targetScale = hs.sizeState === 'large' ? 1.52 : hs.sizeState === 'small' ? 0.56 : 1;
  const scale = hs.renderScale ?? targetScale;
  const animP = hs.animProgress ?? (hs.active ? 1 : 0);
  const cx = hs.x + hs.w * 0.5;
  const cy = hs.y + hs.h * 0.5;

  // Hover highlight frame (clean golden corner brackets)
  if (isHovered) {
    ctx.save();
    ctx.strokeStyle = '#F5B82E';
    ctx.shadowColor = '#F5B82E';
    ctx.shadowBlur = 12;
    ctx.lineWidth = 2.5;
    const pad = 6;
    const bx = hs.x - pad;
    const by = hs.y - pad;
    const bw = hs.w + pad * 2;
    const bh = hs.h + pad * 2;
    const cLen = 14;
    ctx.beginPath();
    ctx.moveTo(bx, by + cLen);
    ctx.lineTo(bx, by);
    ctx.lineTo(bx + cLen, by);
    ctx.moveTo(bx + bw - cLen, by);
    ctx.lineTo(bx + bw, by);
    ctx.lineTo(bx + bw, by + cLen);
    ctx.moveTo(bx + bw, by + bh - cLen);
    ctx.lineTo(bx + bw, by + bh);
    ctx.lineTo(bx + bw - cLen, by + bh);
    ctx.moveTo(bx + cLen, by + bh);
    ctx.lineTo(bx, by + bh);
    ctx.lineTo(bx, by + bh - cLen);
    ctx.stroke();
    ctx.restore();
  }

  // 1. Helper & Pest NPC Cats (grounded with subtle idle breath)
  if (hs.visual === 'helper_cat' || hs.visual === 'pest_cat') {
    const coat: NpcCoat = hs.coatColor || 'ginger';
    const coatMap: Record<NpcCoat, SpriteKey> = {
      ginger: 'cat_ginger',
      tabby: 'cat_tabby',
      white: 'cat_white',
      gray: 'cat_gray',
      ginger_white: 'cat_ginger_white',
    };
    const sp = getSprite(coatMap[coat]);
    const breath = 1 + Math.sin(time * (hs.visual === 'helper_cat' ? 3 : 5) + hs.x) * 0.02;
    if (sp) {
      drawSpriteAnchored(
        ctx,
        sp,
        cx,
        hs.y + hs.h + 2,
        106,
        hs.visual === 'helper_cat' ? 1 : -1,
        1,
        breath
      );
    }
    return;
  }

  // 2. Watchdog Баскервиль (sleeps, runs when distracted, lunges angry when caught!)
  if (hs.visual === 'dog') {
    const isAngry = Boolean(state.caughtSequence);
    const isRunning = hs.targetX !== undefined && Math.abs(hs.x - hs.targetX) > 4;
    const sp = getSprite(isAngry ? 'dog_angry' : 'dog_sleep');
    const breath = isAngry || isRunning ? 1 : 1 + Math.sin(time * 2.4) * 0.025;
    const bounce = isRunning ? -Math.abs(Math.sin(time * 16)) * 12 : 0;
    const lungeX = isAngry ? -Math.min(1, state.caughtSequence!.timer * 2.5) * 85 : 0;
    const facing: 1 | -1 = isRunning || isAngry ? -1 : 1;

    // Ground shadow under dog
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.beginPath();
    ctx.ellipse(cx + lungeX, hs.y + hs.h + 2, 65, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    if (sp) {
      drawSpriteAnchored(ctx, sp, cx + lungeX, hs.y + hs.h + 4 + bounce, 122, facing, 1, breath);
    }

    if (isAngry) {
      ctx.save();
      ctx.fillStyle = '#EF4444';
      ctx.font = 'bold 28px Manrope';
      ctx.fillText('!! ГАВ !!', cx + lungeX - 45, hs.y - 8);
      ctx.restore();
    } else if (hs.active && state.levelId === 1) {
      ctx.save();
      ctx.strokeStyle = '#00E5FF';
      ctx.shadowColor = '#00E5FF';
      ctx.shadowBlur = 10;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(hs.x + 56, hs.y + 52, 26, Math.PI * 1.05, Math.PI * 1.95);
      ctx.stroke();
      ctx.fillStyle = '#A855F7';
      ctx.fillRect(hs.x + 68, hs.y + 52, 14, 20);
      ctx.restore();
    }
    return;
  }

  // 3. Drone-Pug (patrol hover + scanner eye cone)
  if (hs.visual === 'drone_pug') {
    const sp = getSprite('drone_pug');
    const patrolX = hs.active ? Math.sin(time * 3) * 8 : Math.sin(time * 1.5) * 26;
    const hover = Math.sin(time * 5.5) * 8;
    if (!hs.active) {
      ctx.save();
      ctx.fillStyle = 'rgba(239, 68, 68, 0.18)';
      ctx.beginPath();
      ctx.moveTo(cx + patrolX, cy + hover);
      ctx.lineTo(cx + patrolX - 85, hs.y + hs.h + 55);
      ctx.lineTo(cx + patrolX - 15, hs.y + hs.h + 55);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
    if (sp) {
      drawSpriteInBox(ctx, sp, { ...hs, x: hs.x + patrolX, y: hs.y + hover }, scale, 1.15);
    }
    return;
  }

  // 4. Shadow Teleport Portal
  if (hs.visual === 'shadow_pad') {
    const pulse = 0.75 + Math.sin(time * 3.5 + hs.x) * 0.25;
    ctx.save();
    const g = ctx.createRadialGradient(cx, cy + 12, 8, cx, cy + 12, hs.w * 0.54);
    g.addColorStop(0, `rgba(109, 40, 217, ${0.82 * pulse})`);
    g.addColorStop(0.55, 'rgba(15, 10, 35, 0.85)');
    g.addColorStop(1, 'rgba(15, 10, 35, 0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(cx, cy + 16, hs.w * 0.48, hs.h * 0.34, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = `rgba(216, 180, 254, ${0.65 * pulse})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(cx, cy + 16, hs.w * 0.35, hs.h * 0.22, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
    return;
  }

  // 5. Doors, Elevator & Grand Helm Gates
  if (hs.visual === 'door' || hs.visual === 'elevator' || hs.visual === 'helm_wheel') {
    drawAnimatedDoorOpening(ctx, hs, state.levelId, time);
    if (hs.visual === 'helm_wheel') {
      ctx.save();
      const wheelRot = animP * time * 3.2;
      const wx = cx;
      const wy = cy + 25;
      ctx.strokeStyle = hs.active ? '#7EE081' : '#F5B82E';
      ctx.shadowColor = hs.active ? '#7EE081' : '#F5B82E';
      ctx.shadowBlur = 10;
      ctx.lineWidth = 4.5;
      ctx.beginPath();
      ctx.arc(wx, wy, 36, 0, Math.PI * 2);
      ctx.stroke();
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 + wheelRot;
        ctx.beginPath();
        ctx.moveTo(wx, wy);
        ctx.lineTo(wx + Math.cos(a) * 44, wy + Math.sin(a) * 44);
        ctx.stroke();
      }
      ctx.restore();
    }
    return;
  }

  // 6. Animated Pivoting Wooden Plank Bridge (Level 2) & Descending Magnetic Platform (Level 9)
  if (hs.visual === 'bridge') {
    const len = hs.w + 4;
    const pivotX = hs.x + 6;
    const pivotY = hs.y + 44;
    const angle = (1 - animP) * -1.02;

    // Hoist chain from pulley above (615, 62) down to bridge tip
    const tipX = pivotX + Math.cos(angle) * (len - 24);
    const tipY = pivotY + Math.sin(angle) * (len - 24);
    ctx.save();
    ctx.strokeStyle = '#64748B';
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(615, 68);
    ctx.lineTo(tipX, tipY - 6);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    ctx.save();
    ctx.translate(pivotX, pivotY);
    ctx.rotate(angle);

    // Subtle green acid reflection along underside of bridge
    ctx.fillStyle = 'rgba(126, 224, 129, 0.28)';
    ctx.beginPath();
    ctx.roundRect(4, 10, len - 8, 12, 4);
    ctx.fill();

    // Heavy main underside wooden beam (балка-основа)
    const beamGrad = ctx.createLinearGradient(0, 2, 0, 18);
    beamGrad.addColorStop(0, '#5C381C');
    beamGrad.addColorStop(1, '#2B170A');
    ctx.fillStyle = beamGrad;
    ctx.strokeStyle = '#160B04';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(0, 3, len, 14, 3);
    ctx.fill();
    ctx.stroke();

    // Long wooden side rail / stringer holding planks along front edge
    ctx.fillStyle = '#6F4423';
    ctx.beginPath();
    ctx.roundRect(2, -5, len - 4, 10, 2);
    ctx.fill();
    ctx.stroke();

    // Individual cross-nailed wooden planks (сколоченные доски)
    const plankCount = 10;
    const plankW = (len - 12) / plankCount;
    const tones = ['#9A6434', '#855329', '#A8703C', '#7A4A23', '#925D30'];
    for (let i = 0; i < plankCount; i++) {
      const px = 6 + i * plankW;
      const staggerY = ((i % 3) - 1) * 1.4;
      const py = -16 + staggerY;
      const ph = 20;

      ctx.fillStyle = tones[i % tones.length];
      ctx.strokeStyle = '#1E0F05';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(px + 1, py, plankW - 2.5, ph, 2);
      ctx.fill();
      ctx.stroke();

      // Painterly wood grain line & bevel highlight
      ctx.strokeStyle = 'rgba(254, 215, 170, 0.28)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(px + 4, py + 4);
      ctx.lineTo(px + plankW - 6, py + 4);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(43, 23, 10, 0.45)';
      ctx.beginPath();
      ctx.moveTo(px + 5, py + 11);
      ctx.quadraticCurveTo(px + plankW * 0.5, py + 13, px + plankW - 5, py + 10);
      ctx.stroke();

      // Forged iron nail heads on both ends of every plank
      for (const ny of [py + 4.5, py + ph - 4.5]) {
        ctx.fillStyle = '#0F172A';
        ctx.beginPath();
        ctx.arc(px + plankW * 0.5, ny, 2.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#CBD5E1';
        ctx.beginPath();
        ctx.arc(px + plankW * 0.5 - 0.5, ny - 0.5, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Wrought-iron hinge bracket & chain ring at tip
    ctx.fillStyle = '#334155';
    ctx.strokeStyle = '#0F172A';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(-5, -9, 18, 22, 4);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#F5B82E';
    ctx.beginPath();
    ctx.arc(4, 2, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Iron chain shackle near far end
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(len - 24, -6, 6, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
    return;
  }

  // 7. Laser Security Grid (Level 7) with brass emitter housings
  if (hs.visual === 'laser_grid') {
    ctx.save();
    const flicker = 0.72 + Math.sin(time * 18) * 0.25;
    for (let ly = hs.y + 18; ly < hs.y + hs.h - 10; ly += 42) {
      ctx.strokeStyle = `rgba(255, 42, 133, ${flicker})`;
      ctx.shadowColor = '#FF2A85';
      ctx.shadowBlur = 14;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(hs.x + 6, ly);
      ctx.lineTo(hs.x + hs.w - 6, ly);
      ctx.stroke();

      ctx.shadowBlur = 0;
      for (const ex of [hs.x + 6, hs.x + hs.w - 6]) {
        ctx.fillStyle = '#334155';
        ctx.strokeStyle = '#F5B82E';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(ex, ly, 6.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#FF2A85';
        ctx.beginPath();
        ctx.arc(ex, ly, 2.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
    return;
  }

  // 8. Raster Props from extracted sprite sheets + per-prop live animations!
  const propKey = getPropSpriteKey(hs);
  if (propKey) {
    const sp = getSprite(propKey);
    if (sp) {
      let extraRot = 0;
      let extraY = 0;
      let extraScaleX = 1.15;
      let extraScaleY = 1.15;
      let flipX = false;

      if (hs.visual === 'watering_can') {
        extraRot = animP * 0.65;
      } else if (hs.visual === 'lever' || hs.visual === 'magnet_switch') {
        extraRot = (animP - 0.5) * 0.72;
      } else if (hs.visual === 'counterweight' && state.levelId === 2 && state.flags.bridge_down) {
        extraY = -52;
      } else if (hs.visual === 'clock_gear_slot' && hs.active) {
        extraRot = time * 3.5;
      } else if (hs.visual === 'organ_key_l' || hs.visual === 'organ_key_r') {
        extraY = animP * 12;
        flipX = hs.visual === 'organ_key_r';
      } else if (hs.visual === 'astro_ring') {
        extraRot = -0.35 + animP * 0.42;
      } else if (hs.visual === 'bellows' && hs.active) {
        const pump = 1 + Math.sin(time * 9) * 0.14;
        extraScaleX = 1.15 * pump;
        extraScaleY = 1.15 * (2 - pump);
      } else if (hs.visual === 'plant') {
        if (hs.active) {
          extraRot = 0.14;
          extraScaleY = 1.03;
        } else {
          extraRot = Math.sin(time * 2.5) * 0.05;
        }
      }

      // Soft ambient neon halo behind active devices & powered items (no boxy frames!)
      if (
        hs.active &&
        (hs.visual === 'panel' ||
          hs.visual === 'generator' ||
          hs.visual === 'terminal' ||
          hs.visual === 'bio_scanner' ||
          hs.visual === 'uv_lamp' ||
          hs.visual === 'furnace' ||
          hs.visual === 'photocell' ||
          hs.visual === 'holo_socket' ||
          hs.visual === 'organ_key_l' ||
          hs.visual === 'organ_key_r' ||
          hs.visual === 'magnet_platform')
      ) {
        ctx.save();
        const glowColor =
          hs.visual === 'furnace'
            ? 'rgba(255, 107, 53, 0.48)'
            : hs.visual === 'uv_lamp'
              ? 'rgba(192, 132, 252, 0.5)'
              : hs.visual === 'photocell' || hs.visual === 'organ_key_l' || hs.visual === 'organ_key_r'
                ? 'rgba(253, 224, 71, 0.5)'
                : 'rgba(0, 229, 255, 0.46)';
        const rad = Math.max(hs.w, hs.h) * 0.68;
        const rg = ctx.createRadialGradient(cx, cy + extraY, 6, cx, cy + extraY, rad);
        rg.addColorStop(0, glowColor);
        rg.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = rg;
        ctx.beginPath();
        ctx.arc(cx, cy + extraY, rad, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      const hsMod = extraY !== 0 ? { ...hs, y: hs.y + extraY } : hs;
      drawSpriteInBox(ctx, sp, hsMod, scale, extraScaleX, extraRot, flipX, extraScaleY);

      // Electric sparks crackling on unfixed cables / broken organ wires / overloaded holo socket
      if (hs.visual === 'cable' || hs.visual === 'wire_break' || hs.visual === 'holo_socket') {
        ctx.save();
        if (!hs.active) {
          ctx.strokeStyle = '#00E5FF';
          ctx.shadowColor = '#00E5FF';
          ctx.shadowBlur = 10;
          ctx.lineWidth = 2.4;
          for (let s = 0; s < 3; s++) {
            const ang = time * 14 + s * 2.1;
            const sx = cx + Math.cos(ang) * 18;
            const sy = cy + Math.sin(ang * 1.3) * 16;
            ctx.beginPath();
            ctx.moveTo(cx, cy - 6);
            ctx.lineTo(sx, sy);
            ctx.lineTo(sx + Math.sin(time * 28 + s) * 10, sy + 10);
            ctx.stroke();
          }
        }
        ctx.restore();
      }

      // Level 8: Attached glowing hot hook hanging on chain once linked
      if (hs.visual === 'solder_chain' && state.flags.hook_attached) {
        const hookSp = getSprite('prop_hook');
        if (hookSp) {
          drawSpriteInBox(
            ctx,
            hookSp,
            { ...hs, x: hs.x + 8, y: hs.y + hs.h * 0.46, w: hs.w * 0.8, h: hs.h * 0.56 },
            1,
            1.1,
            0.25
          );
        }
      }

      // Level 10 Catapult throwing arm & loaded Mega-Bone overlay!
      if (hs.visual === 'catapult') {
        ctx.save();
        const cocked = Boolean(state.flags.bone_loaded) && !state.flags.dog_distracted;
        const fired = Boolean(state.flags.dog_distracted);
        const armAng = cocked ? -0.82 : fired ? 0.45 : -0.25;
        ctx.translate(cx + 8, cy + 16);
        ctx.rotate(armAng);
        ctx.strokeStyle = '#92400E';
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -54);
        ctx.stroke();
        ctx.fillStyle = '#F5B82E';
        ctx.beginPath();
        ctx.arc(0, -56, 12, 0, Math.PI * 2);
        ctx.fill();
        if (cocked) {
          const boneSp = getSprite('prop_bone');
          if (boneSp) {
            ctx.drawImage(boneSp, -22, -78, 46, 32);
          }
        }
        ctx.restore();
      }

      // Level 7 Enlarged Scroll readable code placard
      if (hs.visual === 'scroll' && hs.sizeState === 'large') {
        ctx.save();
        ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
        ctx.strokeStyle = '#F5B82E';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(cx - 38, cy - 16, 76, 32, 8);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#FDE047';
        ctx.font = 'bold 20px JetBrains Mono';
        ctx.textAlign = 'center';
        ctx.fillText('7-4-2', cx, cy + 7);
        ctx.restore();
      }

      // Level 6 Sleeping Sunflower Zzz
      if (hs.visual === 'plant' && hs.active) {
        ctx.save();
        ctx.fillStyle = '#7EE081';
        ctx.font = 'bold 18px Manrope';
        const zy = (time * 22) % 28;
        ctx.fillText('Zzz...', cx + 18, hs.y - zy);
        ctx.restore();
      }
    }
  }
}

// ============================================================================
// MAIN FRAME RENDER
// ============================================================================
export function renderGameFrame(
  ctx: CanvasRenderingContext2D,
  level: LevelDefinition,
  state: RuntimeLevelState,
  hoveredHotspot: Hotspot | null,
  particles: Particle[],
  beams: MagicBeam[],
  _bubbles: SpeechBubble[],
  time: number
) {
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

  // 1. Hand-painted raster room backdrop!
  const roomImg = getRoomImage(level.id);
  if (roomImg && roomImg.complete && roomImg.naturalWidth > 0) {
    ctx.drawImage(roomImg, 0, 0, CANVAS_W, CANVAS_H);
  } else {
    ctx.fillStyle = level.theme.wallBase;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
  }

  // Subtle ambient vignette at top/bottom edges
  const vig = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
  vig.addColorStop(0, 'rgba(6, 10, 24, 0.25)');
  vig.addColorStop(0.75, 'rgba(6, 10, 24, 0)');
  vig.addColorStop(1, 'rgba(6, 10, 24, 0.35)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // 2. Dynamic room background effects (acid bubbles, skylight beams, pendulum, vortex)
  drawLevelEffectsBehindHotspots(ctx, level, state, time);

  // 3. Hotspots & Raster Props
  for (const hs of state.hotspots) {
    drawHotspot(ctx, hs, state, hoveredHotspot?.id === hs.id, time);
  }

  // 4. Foreground animated level event cues (hoist cables, UV beams, pouring droplets, forge flame stream)
  drawLevelEffectsInFront(ctx, level, state, time);

  // 5. Hero Cats sorted by floor Y depth (further cat first, closer/active cat in front!)
  const cats = [state.thomas, state.torq].sort((a, b) => {
    if (Math.abs(a.y - b.y) > 4) return a.y - b.y;
    return a.id === state.activeCat ? 1 : -1;
  });
  for (const cat of cats) {
    drawHeroCat(ctx, cat, cat.id === state.activeCat, state, time);
  }

  // 6. Flying Props along parabolic trajectories
  drawFlyingProps(ctx, state.flyingProps);

  // 7. Magic beams
  for (const b of beams) {
    const alpha = Math.max(0, b.life / b.maxLife);
    ctx.save();
    ctx.strokeStyle = b.color;
    ctx.globalAlpha = alpha;
    ctx.lineWidth = 5;
    ctx.shadowColor = b.color;
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.moveTo(b.fromX, b.fromY);
    const midX = (b.fromX + b.toX) * 0.5;
    const midY = (b.fromY + b.toY) * 0.5 - 35;
    ctx.quadraticCurveTo(midX, midY, b.toX, b.toY);
    ctx.stroke();
    ctx.restore();
  }

  // 8. Particles
  for (const p of particles) {
    const alpha = Math.max(0, p.life / p.maxLife);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = p.color;
    if (p.kind === 'zzz') {
      ctx.font = 'bold 16px Manrope';
      ctx.fillText('Z', p.x, p.y);
    } else if (p.kind === 'note') {
      ctx.font = 'bold 18px Manrope';
      ctx.fillText('♪', p.x, p.y);
    } else if (p.kind === 'heart') {
      ctx.font = 'bold 16px Manrope';
      ctx.fillText('♥', p.x, p.y);
    } else {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // 9. Brief crimson hazard flash during caught cutscene
  if (state.caughtSequence) {
    const flash = Math.sin(state.caughtSequence.timer * 18) * 0.12 + 0.16;
    ctx.save();
    ctx.fillStyle = `rgba(239, 68, 68, ${flash})`;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.restore();
  }
}
