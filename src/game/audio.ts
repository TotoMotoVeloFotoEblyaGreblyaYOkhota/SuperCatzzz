import { SoundName } from './types';

class SoundEngine {
  private ctx: AudioContext | null = null;
  private muted = false;

  public ensureContext(): AudioContext | null {
    if (this.muted) return null;
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(m: boolean) {
    this.muted = m;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public play(name: SoundName) {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    switch (name) {
      case 'meow_thomas': {
        this.tone(ctx, 'triangle', 320, 480, now, 0.13, 0.14);
        this.tone(ctx, 'sine', 480, 355, now + 0.11, 0.18, 0.11);
        break;
      }
      case 'meow_torq': {
        this.tone(ctx, 'sine', 540, 770, now, 0.08, 0.13);
        this.tone(ctx, 'triangle', 770, 580, now + 0.07, 0.13, 0.1);
        break;
      }
      case 'step_stone': {
        this.noise(ctx, now, 0.045, 720, 0.045);
        this.tone(ctx, 'sine', 120, 68, now, 0.045, 0.035);
        break;
      }
      case 'door_open': {
        this.noise(ctx, now, 0.35, 320, 0.08);
        this.tone(ctx, 'sawtooth', 95, 138, now, 0.42, 0.06);
        [392, 523.25, 659.25].forEach((f, idx) => {
          this.tone(ctx, 'sine', f, f * 1.01, now + 0.18 + idx * 0.07, 0.32, 0.08);
        });
        break;
      }
      case 'flight_whoosh': {
        this.noise(ctx, now, 0.28, 1200, 0.07);
        this.tone(ctx, 'sine', 280, 560, now, 0.22, 0.06);
        break;
      }
      case 'telekinesis': {
        [330, 440, 554, 659, 880].forEach((freq, i) => {
          this.tone(ctx, 'sine', freq, freq * 1.04, now + i * 0.04, 0.2, 0.08);
        });
        break;
      }
      case 'enlarge': {
        this.tone(ctx, 'triangle', 175, 620, now, 0.3, 0.16);
        this.tone(ctx, 'sine', 290, 780, now + 0.06, 0.24, 0.09);
        break;
      }
      case 'shrink': {
        this.tone(ctx, 'triangle', 720, 165, now, 0.28, 0.15);
        this.tone(ctx, 'sine', 540, 140, now + 0.04, 0.22, 0.09);
        break;
      }
      case 'shadow': {
        this.noise(ctx, now, 0.28, 520, 0.08);
        this.tone(ctx, 'sine', 420, 120, now, 0.18, 0.14);
        this.tone(ctx, 'sine', 160, 520, now + 0.16, 0.18, 0.11);
        break;
      }
      case 'hack': {
        this.noise(ctx, now, 0.14, 2400, 0.06);
        [880, 1174, 987, 1318, 1567].forEach((freq, i) => {
          this.tone(ctx, 'square', freq, freq * 0.96, now + i * 0.035, 0.05, 0.055);
        });
        break;
      }
      case 'pickup': {
        this.tone(ctx, 'sine', 523, 784, now, 0.1, 0.14);
        this.tone(ctx, 'sine', 784, 1046, now + 0.07, 0.14, 0.12);
        break;
      }
      case 'strain': {
        this.tone(ctx, 'sawtooth', 160, 115, now, 0.18, 0.08);
        this.tone(ctx, 'triangle', 220, 140, now + 0.12, 0.14, 0.08);
        break;
      }
      case 'error': {
        this.tone(ctx, 'sawtooth', 210, 150, now, 0.12, 0.08);
        this.tone(ctx, 'sawtooth', 160, 120, now + 0.1, 0.14, 0.07);
        break;
      }
      case 'dog_wake': {
        this.noise(ctx, now, 0.2, 600, 0.1);
        this.tone(ctx, 'sawtooth', 110, 220, now, 0.14, 0.18);
        this.tone(ctx, 'sawtooth', 140, 260, now + 0.15, 0.16, 0.2);
        break;
      }
      case 'dog_bite': {
        this.noise(ctx, now, 0.22, 950, 0.12);
        this.tone(ctx, 'sawtooth', 260, 80, now, 0.22, 0.2);
        this.tone(ctx, 'square', 480, 180, now + 0.12, 0.2, 0.11);
        break;
      }
      case 'unlock': {
        [392, 523, 659, 784].forEach((freq, i) => {
          this.tone(ctx, 'triangle', freq, freq, now + i * 0.06, 0.16, 0.14);
        });
        break;
      }
      case 'organ_note': {
        this.tone(ctx, 'triangle', 261.6, 261.6, now, 0.4, 0.13);
        this.tone(ctx, 'sine', 523.2, 523.2, now, 0.4, 0.08);
        this.tone(ctx, 'sine', 784.8, 784.8, now, 0.35, 0.04);
        break;
      }
      case 'organ_chord': {
        [130.8, 261.6, 329.6, 392.0, 523.2].forEach((f) => {
          this.tone(ctx, 'triangle', f, f, now, 0.78, 0.095);
        });
        break;
      }
      case 'splash': {
        this.noise(ctx, now, 0.24, 1500, 0.11);
        this.tone(ctx, 'sine', 600, 240, now, 0.16, 0.11);
        this.tone(ctx, 'sine', 340, 520, now + 0.08, 0.14, 0.08);
        break;
      }
      case 'win': {
        [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((freq, i) => {
          this.tone(ctx, 'triangle', freq, freq * 1.008, now + i * 0.085, 0.32, 0.13);
        });
        break;
      }
    }
  }

  private tone(
    ctx: AudioContext,
    type: OscillatorType,
    startFreq: number,
    endFreq: number,
    startTime: number,
    duration: number,
    volume: number
  ) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(startFreq, startTime);
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), startTime + duration);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(volume, startTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
  }

  private noise(
    ctx: AudioContext,
    startTime: number,
    duration: number,
    filterFreq: number,
    volume: number
  ) {
    const sampleRate = ctx.sampleRate;
    const frameCount = Math.max(1, Math.floor(sampleRate * duration));
    const buf = ctx.createBuffer(1, frameCount, sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < frameCount; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const src = ctx.createBufferSource();
    src.buffer = buf;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(filterFreq, startTime);
    filter.Q.setValueAtTime(1.4, startTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(volume, startTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    src.start(startTime);
    src.stop(startTime + duration + 0.02);
  }
}

export const soundEngine = new SoundEngine();
