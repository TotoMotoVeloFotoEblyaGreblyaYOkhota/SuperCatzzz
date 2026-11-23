// Seamless 20-minute (1200 seconds = 600 bars @ 120 BPM) closed-loop procedural soundtrack
// "Коты Башни: Тень и Искра" — 10 connected 2-minute movements across Van Gogh, Gaudí & cyberpunk moods.

export const TRACK_DURATION_SECONDS = 1200; // ровно 20:00
const STEP_SEC = 0.25; // 8th note at 120 BPM
const STEPS_PER_BAR = 8; // 2.0 seconds per 4/4 bar
const BARS_PER_MOVEMENT = 60; // 60 bars = 120 seconds (2:00) per movement
const TOTAL_BARS = 600; // 600 bars = 1200 seconds (20:00) closed loop

interface MovementSpec {
  id: number;
  title: string;
  rootMidi: number; // MIDI root note (e.g., 50 = D3)
  scale: number[]; // 7-note scale offsets
  padWave: 'glass' | 'organ' | 'warm';
  leadInstrument: 'pizz' | 'celesta' | 'harp' | 'cyber';
  groove: 'stealth' | 'playful' | 'waltz' | 'baroque' | 'clock' | 'dream' | 'cyber' | 'forge' | 'float' | 'finale';
  chordsA: number[][]; // scale degrees per 2 bars
  chordsB: number[][];
  chordsC: number[][];
  turnaround: number[][]; // 4 bars smoothly bridging to next movement
}

const MOVEMENTS: MovementSpec[] = [
  {
    id: 1,
    title: 'Башня под звёздами',
    rootMidi: 50, // D3 (D Dorian)
    scale: [0, 2, 3, 5, 7, 9, 10],
    padWave: 'glass',
    leadInstrument: 'pizz',
    groove: 'stealth',
    chordsA: [
      [0, 2, 4, 6],
      [3, 5, 0, 2],
      [4, 6, 1, 3],
      [0, 2, 4, 6],
    ],
    chordsB: [
      [5, 0, 2, 4],
      [3, 5, 0, 2],
      [1, 3, 5, 0],
      [4, 6, 1, 3],
    ],
    chordsC: [
      [0, 2, 4, 7],
      [2, 4, 6, 1],
      [3, 5, 0, 2],
      [4, 6, 1, 3],
    ],
    turnaround: [
      [3, 5, 0, 2],
      [4, 6, 1, 3],
    ],
  },
  {
    id: 2,
    title: 'Лаборатория Алхимика',
    rootMidi: 55, // G3 (G Minor)
    scale: [0, 2, 3, 5, 7, 8, 10],
    padWave: 'warm',
    leadInstrument: 'cyber',
    groove: 'playful',
    chordsA: [
      [0, 2, 4, 6],
      [5, 0, 2, 4],
      [2, 4, 6, 1],
      [4, 6, 1, 3],
    ],
    chordsB: [
      [3, 5, 0, 2],
      [0, 2, 4, 6],
      [6, 1, 3, 5],
      [4, 6, 1, 3],
    ],
    chordsC: [
      [5, 0, 2, 4],
      [3, 5, 0, 2],
      [1, 3, 5, 0],
      [4, 6, 1, 3],
    ],
    turnaround: [
      [5, 0, 2, 4],
      [2, 4, 6, 1],
    ],
  },
  {
    id: 3,
    title: 'Спираль Ван Гога',
    rootMidi: 52, // E3 (E Minor)
    scale: [0, 2, 3, 5, 7, 8, 10],
    padWave: 'glass',
    leadInstrument: 'celesta',
    groove: 'waltz',
    chordsA: [
      [0, 2, 4, 7],
      [5, 0, 2, 4],
      [2, 4, 6, 1],
      [6, 1, 3, 5],
    ],
    chordsB: [
      [3, 5, 0, 2],
      [4, 6, 1, 3],
      [0, 2, 4, 6],
      [5, 0, 2, 4],
    ],
    chordsC: [
      [2, 4, 6, 1],
      [3, 5, 0, 2],
      [4, 6, 1, 3],
      [0, 2, 4, 7],
    ],
    turnaround: [
      [3, 5, 0, 2],
      [3, 5, 0, 4],
    ],
  },
  {
    id: 4,
    title: 'Органный Зал Гауди',
    rootMidi: 45, // A2 (A Minor / Harmonic touches)
    scale: [0, 2, 3, 5, 7, 8, 11],
    padWave: 'organ',
    leadInstrument: 'harp',
    groove: 'baroque',
    chordsA: [
      [0, 2, 4, 7],
      [3, 5, 0, 2],
      [4, 6, 1, 3],
      [0, 2, 4, 7],
    ],
    chordsB: [
      [5, 0, 2, 4],
      [1, 3, 5, 0],
      [4, 6, 1, 3],
      [0, 2, 4, 6],
    ],
    chordsC: [
      [3, 5, 0, 2],
      [5, 0, 2, 4],
      [2, 4, 6, 1],
      [4, 6, 1, 3],
    ],
    turnaround: [
      [3, 5, 0, 2],
      [2, 4, 6, 1],
    ],
  },
  {
    id: 5,
    title: 'Часовая Шестерёночная',
    rootMidi: 48, // C3 (C Dorian)
    scale: [0, 2, 3, 5, 7, 9, 10],
    padWave: 'warm',
    leadInstrument: 'pizz',
    groove: 'clock',
    chordsA: [
      [0, 2, 4, 6],
      [6, 1, 3, 5],
      [3, 5, 0, 2],
      [4, 6, 1, 3],
    ],
    chordsB: [
      [2, 4, 6, 1],
      [5, 0, 2, 4],
      [1, 3, 5, 0],
      [4, 6, 1, 3],
    ],
    chordsC: [
      [0, 2, 4, 7],
      [3, 5, 0, 2],
      [6, 1, 3, 5],
      [4, 6, 1, 3],
    ],
    turnaround: [
      [5, 0, 2, 4],
      [4, 6, 1, 3],
    ],
  },
  {
    id: 6,
    title: 'Неоновая Оранжерея',
    rootMidi: 54, // F#3 (F# Natural Minor)
    scale: [0, 2, 3, 5, 7, 8, 10],
    padWave: 'glass',
    leadInstrument: 'celesta',
    groove: 'dream',
    chordsA: [
      [0, 2, 4, 6],
      [2, 4, 6, 1],
      [5, 0, 2, 4],
      [3, 5, 0, 2],
    ],
    chordsB: [
      [6, 1, 3, 5],
      [2, 4, 6, 1],
      [3, 5, 0, 2],
      [4, 6, 1, 3],
    ],
    chordsC: [
      [0, 2, 4, 7],
      [5, 0, 2, 4],
      [3, 5, 0, 2],
      [6, 1, 3, 5],
    ],
    turnaround: [
      [3, 5, 0, 2],
      [3, 5, 0, 4],
    ],
  },
  {
    id: 7,
    title: 'Архив Голограмм',
    rootMidi: 47, // B2 (B Minor)
    scale: [0, 2, 3, 5, 7, 8, 10],
    padWave: 'warm',
    leadInstrument: 'cyber',
    groove: 'cyber',
    chordsA: [
      [0, 2, 4, 6],
      [4, 6, 1, 3],
      [5, 0, 2, 4],
      [2, 4, 6, 1],
    ],
    chordsB: [
      [3, 5, 0, 2],
      [6, 1, 3, 5],
      [2, 4, 6, 1],
      [4, 6, 1, 3],
    ],
    chordsC: [
      [0, 2, 4, 7],
      [3, 5, 0, 2],
      [5, 0, 2, 4],
      [4, 6, 1, 3],
    ],
    turnaround: [
      [3, 5, 0, 2],
      [3, 5, 0, 4],
    ],
  },
  {
    id: 8,
    title: 'Кузница Горгульи',
    rootMidi: 52, // E3 (E Phrygian Dominant color)
    scale: [0, 1, 4, 5, 7, 8, 10],
    padWave: 'organ',
    leadInstrument: 'pizz',
    groove: 'forge',
    chordsA: [
      [0, 2, 4, 6],
      [1, 3, 5, 0],
      [6, 1, 3, 5],
      [0, 2, 4, 6],
    ],
    chordsB: [
      [3, 5, 0, 2],
      [1, 3, 5, 0],
      [4, 6, 1, 3],
      [1, 3, 5, 0],
    ],
    chordsC: [
      [0, 2, 4, 6],
      [5, 0, 2, 4],
      [3, 5, 0, 2],
      [1, 3, 5, 0],
    ],
    turnaround: [
      [5, 0, 2, 4],
      [5, 0, 2, 6],
    ],
  },
  {
    id: 9,
    title: 'Магнитный Колодец',
    rootMidi: 49, // C#3 (C# Minor)
    scale: [0, 2, 3, 5, 7, 8, 10],
    padWave: 'glass',
    leadInstrument: 'harp',
    groove: 'float',
    chordsA: [
      [0, 2, 4, 7],
      [5, 0, 2, 4],
      [6, 1, 3, 5],
      [2, 4, 6, 1],
    ],
    chordsB: [
      [3, 5, 0, 2],
      [0, 2, 4, 6],
      [5, 0, 2, 4],
      [4, 6, 1, 3],
    ],
    chordsC: [
      [2, 4, 6, 1],
      [5, 0, 2, 4],
      [3, 5, 0, 2],
      [6, 1, 3, 5],
    ],
    turnaround: [
      [6, 1, 3, 5],
      [4, 6, 1, 3],
    ],
  },
  {
    id: 10,
    title: 'Врата Свободы',
    rootMidi: 50, // D3 (returns seamlessly back to Movement 1 D Dorian at 20:00!)
    scale: [0, 2, 4, 5, 7, 9, 11], // D Major / Lydian uplift, softening to D minor turnaround
    padWave: 'glass',
    leadInstrument: 'celesta',
    groove: 'finale',
    chordsA: [
      [0, 2, 4, 7],
      [4, 6, 1, 3],
      [5, 0, 2, 4],
      [3, 5, 0, 2],
    ],
    chordsB: [
      [2, 4, 6, 1],
      [3, 5, 0, 2],
      [0, 2, 4, 7],
      [4, 6, 1, 3],
    ],
    chordsC: [
      [5, 0, 2, 4],
      [3, 5, 0, 2],
      [1, 3, 5, 0],
      [4, 6, 1, 3],
    ],
    turnaround: [
      [5, 0, 2, 4],
      [4, 6, 1, 3], // loops straight into Bar 0 (D Dorian) at 20:00!
    ],
  },
];

function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function scaleDegreeToMidi(spec: MovementSpec, degree: number, octaveOffset = 0): number {
  const len = spec.scale.length;
  const oct = Math.floor(degree / len) + octaveOffset;
  const idx = ((degree % len) + len) % len;
  return spec.rootMidi + oct * 12 + spec.scale[idx];
}

function hashStep(bar: number, step: number, salt: number): number {
  let n = (bar * 73856093) ^ (step * 19349663) ^ (salt * 83492791);
  n = ((n >> 13) ^ n) * 1274126177;
  return ((n ^ (n >> 16)) >>> 0) / 4294967296;
}

class MusicEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private dryBus: GainNode | null = null;
  private wetBus: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;

  private isPlaying = false;
  private isGlobalMuted = false;
  private isMusicMuted = false;
  private isDucked = false;

  private schedulerTimer: number | null = null;
  private nextStepTime = 0;
  private globalStep = 0; // wraps cleanly at TOTAL_BARS * STEPS_PER_BAR (4800 steps = 1200s = 20 min)

  private ensureGraph(): AudioContext | null {
    if (typeof window === 'undefined') return null;

    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();

      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.value = -16;
      this.compressor.knee.value = 18;
      this.compressor.ratio.value = 4;
      this.compressor.attack.value = 0.015;
      this.compressor.release.value = 0.25;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.targetGain();

      this.dryBus = this.ctx.createGain();
      this.dryBus.gain.value = 0.85;

      this.wetBus = this.ctx.createGain();
      this.wetBus.gain.value = 0.52;

      // Cozy stereo cathedral delay network
      const delayL = this.ctx.createDelay(1.0);
      delayL.delayTime.value = 0.28;
      const delayR = this.ctx.createDelay(1.0);
      delayR.delayTime.value = 0.42;

      const lpL = this.ctx.createBiquadFilter();
      lpL.type = 'lowpass';
      lpL.frequency.value = 1850;
      const lpR = this.ctx.createBiquadFilter();
      lpR.type = 'lowpass';
      lpR.frequency.value = 1650;

      const fbL = this.ctx.createGain();
      fbL.gain.value = 0.34;
      const fbR = this.ctx.createGain();
      fbR.gain.value = 0.34;

      const panL = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
      const panR = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
      if (panL) panL.pan.value = -0.48;
      if (panR) panR.pan.value = 0.48;

      this.wetBus.connect(delayL);
      this.wetBus.connect(delayR);

      delayL.connect(lpL);
      delayR.connect(lpR);

      // Cross-feedback for lush stereo space
      lpL.connect(fbL);
      fbL.connect(delayR);
      lpR.connect(fbR);
      fbR.connect(delayL);

      if (panL && panR) {
        lpL.connect(panL);
        panL.connect(this.compressor);
        lpR.connect(panR);
        panR.connect(this.compressor);
      } else {
        lpL.connect(this.compressor);
        lpR.connect(this.compressor);
      }

      this.dryBus.connect(this.compressor);
      this.compressor.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    return this.ctx;
  }

  private targetGain(): number {
    if (this.isGlobalMuted || this.isMusicMuted) return 0.0001;
    return this.isDucked ? 0.11 : 0.34;
  }

  private updateGainSmooth() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setTargetAtTime(this.targetGain(), now, this.isDucked ? 0.14 : 0.38);
  }

  public start() {
    const ctx = this.ensureGraph();
    if (!ctx) return;

    if (!this.isPlaying) {
      this.isPlaying = true;
      this.nextStepTime = ctx.currentTime + 0.08;
      this.schedulerTimer = window.setInterval(() => this.schedulerTick(), 110);
    } else if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    this.updateGainSmooth();
  }

  public stop() {
    this.isPlaying = false;
    if (this.schedulerTimer !== null) {
      window.clearInterval(this.schedulerTimer);
      this.schedulerTimer = null;
    }
  }

  public setGlobalMuted(muted: boolean) {
    this.isGlobalMuted = muted;
    this.updateGainSmooth();
  }

  public setMusicMuted(muted: boolean) {
    this.isMusicMuted = muted;
    if (!muted && !this.isPlaying) {
      this.start();
    }
    this.updateGainSmooth();
  }

  public isAudioMusicMuted(): boolean {
    return this.isMusicMuted;
  }

  public setDucked(ducked: boolean) {
    if (this.isDucked === ducked) return;
    this.isDucked = ducked;
    this.updateGainSmooth();
  }

  public getElapsedLoopSeconds(): number {
    return (this.globalStep * STEP_SEC) % TRACK_DURATION_SECONDS;
  }

  public getCurrentMovementTitle(): string {
    const bar = Math.floor(this.globalStep / STEPS_PER_BAR) % TOTAL_BARS;
    const mIdx = Math.floor(bar / BARS_PER_MOVEMENT) % MOVEMENTS.length;
    return MOVEMENTS[mIdx].title;
  }

  private schedulerTick() {
    if (!this.isPlaying || !this.ctx || this.ctx.state !== 'running') return;
    if (this.isGlobalMuted || this.isMusicMuted) {
      // Keep virtual clock moving silently so loop position advances without audio work
      while (this.nextStepTime < this.ctx.currentTime + 0.25) {
        this.nextStepTime += STEP_SEC;
        this.globalStep = (this.globalStep + 1) % (TOTAL_BARS * STEPS_PER_BAR);
      }
      return;
    }

    const lookAhead = 0.34;
    while (this.nextStepTime < this.ctx.currentTime + lookAhead) {
      this.scheduleStep(this.globalStep, this.nextStepTime);
      this.nextStepTime += STEP_SEC;
      this.globalStep = (this.globalStep + 1) % (TOTAL_BARS * STEPS_PER_BAR);
    }
  }

  private scheduleStep(stepTotal: number, time: number) {
    const ctx = this.ctx;
    if (!ctx || !this.dryBus || !this.wetBus) return;

    const barGlobal = Math.floor(stepTotal / STEPS_PER_BAR) % TOTAL_BARS;
    const step = stepTotal % STEPS_PER_BAR;

    const movementIdx = Math.floor(barGlobal / BARS_PER_MOVEMENT) % MOVEMENTS.length;
    const barInMov = barGlobal % BARS_PER_MOVEMENT;
    const mov = MOVEMENTS[movementIdx];

    // Pick harmonic section inside 60-bar movement:
    // 0..15 (A), 16..31 (B), 32..47 (C), 48..55 (A reprise), 56..59 (Turnaround -> next movement)
    let chordGroup: number[][];
    let sectionIntensity = 1.0;
    if (barInMov < 16) {
      chordGroup = mov.chordsA;
      sectionIntensity = barInMov < 4 ? 0.65 : 0.85;
    } else if (barInMov < 32) {
      chordGroup = mov.chordsB;
      sectionIntensity = 1.0;
    } else if (barInMov < 48) {
      chordGroup = mov.chordsC;
      sectionIntensity = 1.08;
    } else if (barInMov < 56) {
      chordGroup = mov.chordsA;
      sectionIntensity = 0.9;
    } else {
      chordGroup = mov.turnaround;
      sectionIntensity = 0.72;
    }

    // Chord changes every 2 bars (4.0s)
    const chordIdx = Math.floor((barInMov % 16) / 2) % chordGroup.length;
    const chord = chordGroup[chordIdx];

    // 1. Harmonic Pad / Organ on even bar downbeat (every 4 seconds)
    if (step === 0 && barInMov % 2 === 0) {
      const padFreqs = chord.slice(0, 3).map((deg, idx) =>
        midiToFreq(scaleDegreeToMidi(mov, deg, idx === 0 ? 1 : 1))
      );
      this.playPad(ctx, mov.padWave, padFreqs, time, 3.85, 0.085 * sectionIntensity);
    }

    // 2. Deep Velvet Bass on beat 0 and syncopated beat 3/5 depending on groove
    const playBassOnStep =
      step === 0 ||
      (mov.groove === 'playful' && (step === 3 || step === 6)) ||
      (mov.groove === 'forge' && (step === 3 || step === 4)) ||
      (mov.groove === 'cyber' && (step === 2 || step === 4 || step === 6)) ||
      (mov.groove === 'clock' && step === 4) ||
      (mov.groove === 'finale' && (step === 4 || step === 6));

    if (playBassOnStep) {
      const deg = step === 0 ? chord[0] : step === 6 ? chord[2] : chord[1];
      const bassFreq = midiToFreq(scaleDegreeToMidi(mov, deg, 0));
      const dur = step === 0 ? 0.95 : 0.42;
      this.playBass(ctx, bassFreq, time, dur, step === 0 ? 0.14 : 0.095);
    }

    // 3. Arpeggio / Rhythmic Companion Texture (subtle & never crowded)
    if (barInMov >= 2 && step % 2 === 0) {
      const arpSlot = (step / 2 + barInMov) % chord.length;
      const arpDeg = chord[arpSlot];
      const arpFreq = midiToFreq(scaleDegreeToMidi(mov, arpDeg, 2));
      const pan = ((step % 4) - 1.5) * 0.22;
      if (mov.groove === 'clock' || mov.groove === 'cyber' || mov.groove === 'playful') {
        this.playPluck(ctx, arpFreq, time, 0.22, 0.048 * sectionIntensity, pan);
      } else if (step === 2 || step === 6) {
        this.playCelesta(ctx, arpFreq, time, 0.55, 0.042 * sectionIntensity, pan);
      }
    }

    // 4. Expressive Melodic Lead Phrase (question in bars 0-1, answer in bars 2-3, rest in bar 4!)
    const phraseBar = barInMov % 4;
    if (phraseBar !== 3 || step < 4) {
      // Leave breathing space at end of 4-bar phrases
      const r = hashStep(barGlobal, step, mov.id * 17);
      const density =
        mov.groove === 'dream' || mov.groove === 'float'
          ? 0.34
          : mov.groove === 'stealth' || mov.groove === 'baroque'
            ? 0.44
            : 0.52;

      if (r < density) {
        const chordTone = chord[Math.floor(hashStep(barGlobal, step, 99) * chord.length)];
        const neighbor = hashStep(barGlobal, step, 31) > 0.72 ? 1 : 0;
        const oct = mov.leadInstrument === 'celesta' ? 3 : 2;
        const melFreq = midiToFreq(scaleDegreeToMidi(mov, chordTone + neighbor, oct));
        const pan = (hashStep(barGlobal, step, 7) - 0.5) * 0.55;
        const vel = (step % 2 === 0 ? 1 : 0.78) * 0.088 * sectionIntensity;

        if (mov.leadInstrument === 'pizz') {
          this.playPluck(ctx, melFreq, time, 0.28, vel * 1.15, pan);
        } else if (mov.leadInstrument === 'celesta') {
          this.playCelesta(ctx, melFreq, time, 0.85, vel, pan);
        } else if (mov.leadInstrument === 'harp') {
          this.playPluck(ctx, melFreq, time, 0.46, vel, pan);
        } else {
          this.playCyberBell(ctx, melFreq, time, 0.55, vel, pan);
        }
      }
    }

    // 5. Subtle Brushed Percussion / Clockwork Pulse (only on rhythmic movements)
    if (
      mov.groove === 'clock' ||
      mov.groove === 'forge' ||
      mov.groove === 'cyber' ||
      mov.groove === 'playful' ||
      mov.groove === 'finale'
    ) {
      if (step === 0 || (mov.groove === 'forge' && step === 4)) {
        this.playSoftKick(ctx, time, 0.055 * sectionIntensity);
      }
      if (mov.groove === 'clock' ? step % 2 === 0 : step === 2 || step === 6) {
        this.playBrushTick(ctx, time, step === 2 ? 0.024 : 0.016, mov.groove === 'clock' ? 2400 : 3800);
      }
    }
  }

  private routeOutput(ctx: AudioContext, node: AudioNode, panVal: number, wetMix: number) {
    if (!this.dryBus || !this.wetBus) return;
    const drySend = ctx.createGain();
    drySend.gain.value = 1 - wetMix * 0.4;
    const wetSend = ctx.createGain();
    wetSend.gain.value = wetMix;

    if (ctx.createStereoPanner) {
      const panner = ctx.createStereoPanner();
      panner.pan.value = panVal;
      node.connect(panner);
      panner.connect(drySend);
      panner.connect(wetSend);
    } else {
      node.connect(drySend);
      node.connect(wetSend);
    }

    drySend.connect(this.dryBus);
    wetSend.connect(this.wetBus);
  }

  private playPad(
    ctx: AudioContext,
    style: MovementSpec['padWave'],
    freqs: number[],
    start: number,
    dur: number,
    vol: number
  ) {
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(style === 'organ' ? 1050 : 1250, start);
    filter.Q.value = style === 'organ' ? 1.4 : 0.7;

    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, start);
    env.gain.linearRampToValueAtTime(vol, start + (style === 'organ' ? 0.14 : 0.55));
    env.gain.setValueAtTime(vol * 0.88, start + dur * 0.65);
    env.gain.exponentialRampToValueAtTime(0.0001, start + dur);

    filter.connect(env);
    this.routeOutput(ctx, env, 0, 0.58);

    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      osc.type = style === 'organ' ? (idx === 0 ? 'sawtooth' : 'triangle') : idx % 2 === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(f, start);
      osc.detune.setValueAtTime(idx === 1 ? -5 : idx === 2 ? 5 : 0, start);
      osc.connect(filter);
      osc.start(start);
      osc.stop(start + dur + 0.05);
    });
  }

  private playBass(ctx: AudioContext, freq: number, start: number, dur: number, vol: number) {
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(420, start);

    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, start);
    env.gain.linearRampToValueAtTime(vol, start + 0.025);
    env.gain.exponentialRampToValueAtTime(0.0001, start + dur);

    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, start);

    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq, start);

    const g2 = ctx.createGain();
    g2.gain.value = 0.4;

    osc1.connect(filter);
    osc2.connect(g2);
    g2.connect(filter);
    filter.connect(env);
    this.routeOutput(ctx, env, 0, 0.15);

    osc1.start(start);
    osc2.start(start);
    osc1.stop(start + dur + 0.04);
    osc2.stop(start + dur + 0.04);
  }

  private playPluck(
    ctx: AudioContext,
    freq: number,
    start: number,
    dur: number,
    vol: number,
    pan: number
  ) {
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2200, start);
    filter.frequency.exponentialRampToValueAtTime(340, start + dur);

    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, start);
    env.gain.linearRampToValueAtTime(vol, start + 0.008);
    env.gain.exponentialRampToValueAtTime(0.0001, start + dur);

    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, start);

    const overtone = ctx.createOscillator();
    overtone.type = 'sine';
    overtone.frequency.setValueAtTime(freq * 2, start);
    const overGain = ctx.createGain();
    overGain.gain.value = 0.25;

    osc.connect(filter);
    overtone.connect(overGain);
    overGain.connect(filter);
    filter.connect(env);
    this.routeOutput(ctx, env, pan, 0.45);

    osc.start(start);
    overtone.start(start);
    osc.stop(start + dur + 0.03);
    overtone.stop(start + dur + 0.03);
  }

  private playCelesta(
    ctx: AudioContext,
    freq: number,
    start: number,
    dur: number,
    vol: number,
    pan: number
  ) {
    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, start);
    env.gain.linearRampToValueAtTime(vol, start + 0.01);
    env.gain.exponentialRampToValueAtTime(0.0001, start + dur);

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, start);

    const bell = ctx.createOscillator();
    bell.type = 'sine';
    bell.frequency.setValueAtTime(freq * 3, start);
    const bellGain = ctx.createGain();
    bellGain.gain.setValueAtTime(vol * 0.22, start);
    bellGain.gain.exponentialRampToValueAtTime(0.0001, start + dur * 0.35);

    osc.connect(env);
    bell.connect(bellGain);
    bellGain.connect(env);
    this.routeOutput(ctx, env, pan, 0.62);

    osc.start(start);
    bell.start(start);
    osc.stop(start + dur + 0.04);
    bell.stop(start + dur + 0.04);
  }

  private playCyberBell(
    ctx: AudioContext,
    freq: number,
    start: number,
    dur: number,
    vol: number,
    pan: number
  ) {
    const carrier = ctx.createOscillator();
    carrier.type = 'sine';
    carrier.frequency.setValueAtTime(freq, start);

    const mod = ctx.createOscillator();
    mod.type = 'sine';
    mod.frequency.setValueAtTime(freq * 2, start);
    const modGain = ctx.createGain();
    modGain.gain.setValueAtTime(freq * 0.55, start);
    modGain.gain.exponentialRampToValueAtTime(4, start + dur * 0.5);

    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, start);
    env.gain.linearRampToValueAtTime(vol, start + 0.012);
    env.gain.exponentialRampToValueAtTime(0.0001, start + dur);

    mod.connect(modGain);
    modGain.connect(carrier.frequency);
    carrier.connect(env);
    this.routeOutput(ctx, env, pan, 0.55);

    carrier.start(start);
    mod.start(start);
    carrier.stop(start + dur + 0.04);
    mod.stop(start + dur + 0.04);
  }

  private playSoftKick(ctx: AudioContext, start: number, vol: number) {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(105, start);
    osc.frequency.exponentialRampToValueAtTime(42, start + 0.14);

    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, start);
    env.gain.linearRampToValueAtTime(vol, start + 0.006);
    env.gain.exponentialRampToValueAtTime(0.0001, start + 0.16);

    osc.connect(env);
    this.routeOutput(ctx, env, 0, 0.08);
    osc.start(start);
    osc.stop(start + 0.18);
  }

  private playBrushTick(ctx: AudioContext, start: number, vol: number, freq: number) {
    const len = Math.floor(ctx.sampleRate * 0.035);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    }

    const src = ctx.createBufferSource();
    src.buffer = buf;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq, start);
    filter.Q.value = 1.8;

    const env = ctx.createGain();
    env.gain.setValueAtTime(vol, start);
    env.gain.exponentialRampToValueAtTime(0.0001, start + 0.035);

    src.connect(filter);
    filter.connect(env);
    this.routeOutput(ctx, env, 0.18, 0.25);
    src.start(start);
    src.stop(start + 0.04);
  }
}

export const musicEngine = new MusicEngine();
