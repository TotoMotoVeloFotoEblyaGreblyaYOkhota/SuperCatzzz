export type CatId = 'thomas' | 'torquemada';

export type ThomasSpell = 'telekinesis' | 'enlarge' | 'shrink' | 'shadow';
export type TorqSkill = 'paws' | 'hack';

export type GameScreen =
  | 'TITLE'
  | 'PLAYING'
  | 'PAUSED'
  | 'LEVEL_WIN'
  | 'CAUGHT'
  | 'GAME_VICTORY';

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  icon:
    | 'key'
    | 'fuse'
    | 'gear'
    | 'keycard'
    | 'bone'
    | 'chip'
    | 'wrench';
}

export interface WalkZone {
  id: string;
  minX: number;
  maxX: number;
  y: number; // baseline floor Y
  minY?: number;
  maxY?: number;
  /** Optional flag name in level.flags that unlocks walking into this zone */
  requiresFlag?: string;
}

export interface CatEntity {
  id: CatId;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  zoneId: string;
  facing: 1 | -1;
  state:
    | 'idle'
    | 'walk'
    | 'cast'
    | 'hack'
    | 'strain'
    | 'shock'
    | 'shadow_out'
    | 'shadow_in'
    | 'panic'
    | 'hold';
  stateTimer: number;
  bobPhase: number;
  castTarget?: { x: number; y: number; color: string };
}

export type HotspotVisual =
  | 'door'
  | 'dog'
  | 'pillow'
  | 'grate'
  | 'key'
  | 'panel'
  | 'shadow_pad'
  | 'cable'
  | 'generator'
  | 'counterweight'
  | 'bridge'
  | 'crate'
  | 'fuse'
  | 'elevator'
  | 'telescope'
  | 'lens'
  | 'astro_ring'
  | 'mirror'
  | 'photocell'
  | 'plug'
  | 'terminal'
  | 'organ_pipe'
  | 'pipe_cork'
  | 'resonator'
  | 'organ_key_l'
  | 'organ_key_r'
  | 'wire_break'
  | 'clock_gear_slot'
  | 'small_gear'
  | 'clock_weight'
  | 'pendulum_shadow'
  | 'plant'
  | 'uv_lamp'
  | 'watering_can'
  | 'glass_dome'
  | 'keycard'
  | 'scroll'
  | 'laser_grid'
  | 'holo_socket'
  | 'lever'
  | 'furnace'
  | 'bellows'
  | 'solder_chain'
  | 'hot_hook'
  | 'bolt'
  | 'drone_pug'
  | 'magnet_switch'
  | 'magnet_platform'
  | 'catapult'
  | 'toy_bone'
  | 'holo_steak'
  | 'bio_scanner'
  | 'helm_wheel'
  | 'helper_cat'
  | 'pest_cat';

export type NpcCoat = 'ginger' | 'tabby' | 'white' | 'gray' | 'ginger_white';

export interface Hotspot {
  id: string;
  name: string;
  visual: HotspotVisual;
  coatColor?: NpcCoat;
  x: number;
  y: number;
  w: number;
  h: number;
  zoneId: string;
  /** Whether Thomas can cast non-shadow spells on this from afar */
  remoteMagic?: boolean;
  /** Current visual size modifier from enlarge/shrink */
  sizeState?: 'normal' | 'large' | 'small';
  /** Custom state flags on this hotspot */
  active?: boolean;
  hidden?: boolean;
  locked?: boolean;
  /** Optional extra offset when animated/moved */
  offsetX?: number;
  offsetY?: number;
  rotation?: number;
  /** Smoothly interpolated visual scale & progress (0..1) */
  renderScale?: number;
  animProgress?: number;
  targetX?: number;
  targetY?: number;
  /** For shadow pads: destination zoneId and landing position */
  shadowDest?: { zoneId: string; x: number; y: number };
}

export interface SpeechBubble {
  id: number;
  catId: CatId | 'dog' | 'system';
  text: string;
  x: number;
  y: number;
  timer: number;
  maxTimer: number;
  color: string;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  kind: 'star' | 'spark' | 'smoke' | 'zzz' | 'note' | 'heart' | 'dust';
}

export interface MagicBeam {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  color: string;
  life: number;
  maxLife: number;
}

export interface FlyingProp {
  spriteKey: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  progress: number;
  duration: number;
  arcHeight: number;
  scaleFrom: number;
  scaleTo: number;
  spin?: number;
  fadeOut?: boolean;
  onArrive?: () => void;
}

export interface ExitSequenceState {
  timer: number;
  duration: number;
  doorId: string;
  doorX: number;
  doorY: number;
  epilogue: string;
}

export interface CaughtSequenceState {
  timer: number;
  duration: number;
  title: string;
  reason: string;
}

export interface ActionContext {
  cat: CatId;
  spell: ThomasSpell;
  skill: TorqSkill;
  itemId: string | null;
  hotspot: Hotspot;
  state: RuntimeLevelState;
  addItem: (item: InventoryItem) => void;
  removeItem: (itemId: string) => void;
  say: (who: CatId | 'dog' | 'system', text: string, duration?: number) => void;
  spawnParticles: (
    x: number,
    y: number,
    color: string,
    kind: Particle['kind'],
    count?: number
  ) => void;
  spawnBeam: (fromX: number, fromY: number, toX: number, toY: number, color: string) => void;
  spawnFlight: (flight: Omit<FlyingProp, 'progress'>) => void;
  triggerCaught: (title: string, reason: string) => void;
  triggerWin: (epilogue: string) => void;
  playSound: (sound: SoundName) => void;
}

export type SoundName =
  | 'meow_thomas'
  | 'meow_torq'
  | 'telekinesis'
  | 'enlarge'
  | 'shrink'
  | 'shadow'
  | 'hack'
  | 'pickup'
  | 'strain'
  | 'error'
  | 'dog_wake'
  | 'dog_bite'
  | 'unlock'
  | 'organ_note'
  | 'organ_chord'
  | 'splash'
  | 'win'
  | 'step_stone'
  | 'door_open'
  | 'flight_whoosh';

export interface LevelTheme {
  skyTop: string;
  skyMid: string;
  wallBase: string;
  wallStroke: string;
  mosaicColors: [string, string, string, string];
  neonPrimary: string;
  neonSecondary: string;
  floorColor: string;
  archStyle: 'tower' | 'lab' | 'observatory' | 'organ' | 'clock' | 'greenhouse' | 'archive' | 'forge' | 'spiral' | 'gate';
}

export interface LevelDefinition {
  id: number;
  title: string;
  subtitle: string;
  introQuote: string;
  winQuote: string;
  theme: LevelTheme;
  walkZones: WalkZone[];
  /** Bridges/connections unlocked by flags: [zoneA, zoneB, flagName] */
  zoneLinks: Array<{ from: string; to: string; flag: string }>;
  thomasStart: { x: number; y: number; zoneId: string };
  torqStart: { x: number; y: number; zoneId: string };
  initialFlags: Record<string, boolean | number | string>;
  initialHotspots: Hotspot[];
  hints: [string, string]; // Tier 1 gentle, Tier 2 explicit
  onInteract: (ctx: ActionContext) => void;
}

export interface RuntimeLevelState {
  levelId: number;
  flags: Record<string, boolean | number | string>;
  hotspots: Hotspot[];
  inventory: InventoryItem[];
  thomas: CatEntity;
  torq: CatEntity;
  activeCat: CatId;
  thomasSpell: ThomasSpell;
  torqSkill: TorqSkill;
  selectedItemId: string | null;
  dogAlertTimer: number;
  dogLunging: boolean;
  dogPos: { x: number; y: number };
  elapsedSeconds: number;
  stepCount: number;
  flyingProps: FlyingProp[];
  exitSequence: ExitSequenceState | null;
  caughtSequence: CaughtSequenceState | null;
}
