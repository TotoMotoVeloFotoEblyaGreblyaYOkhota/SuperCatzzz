export type SpriteKey =
  | 'thomas_idle'
  | 'thomas_walk'
  | 'thomas_cast'
  | 'thomas_sneak'
  | 'torq_idle'
  | 'torq_walk'
  | 'torq_shock'
  | 'torq_strain'
  | 'dog_sleep'
  | 'dog_angry'
  | 'drone_pug'
  | 'cat_ginger'
  | 'cat_tabby'
  | 'cat_white'
  | 'cat_gray'
  | 'cat_ginger_white'
  | 'prop_key'
  | 'prop_pillow'
  | 'prop_panel'
  | 'prop_fuse'
  | 'prop_weight'
  | 'prop_crate'
  | 'prop_telescope'
  | 'prop_plant'
  | 'prop_scroll'
  | 'prop_dome'
  | 'prop_catapult'
  | 'prop_bone'
  | 'prop_gear'
  | 'prop_generator'
  | 'prop_bell'
  | 'prop_lever'
  | 'prop_can'
  | 'prop_lens'
  | 'prop_organ_key'
  | 'prop_cork'
  | 'prop_cable'
  | 'prop_astro_ring'
  | 'prop_plug'
  | 'prop_photocell'
  | 'prop_keycard'
  | 'prop_socket'
  | 'prop_bellows'
  | 'prop_chain'
  | 'prop_hook'
  | 'prop_mag_platform'
  | 'prop_bolt'
  | 'prop_furnace'
  | 'prop_uv_lamp'
  | 'prop_scanner';

const ROOM_IMAGE_PATHS: Record<number, string> = {
  1: '/src/assets/images/room_tower_cell_1795457027145.jpg',
  2: '/src/assets/images/room_alchemist_lab_1795457027388.jpg',
  3: '/src/assets/images/room_starry_observatory_1795457028469.jpg',
  4: '/src/assets/images/room_organ_hall_1795457030486.jpg',
  5: '/src/assets/images/room_clockwork_tower_1795457030634.jpg',
  6: '/src/assets/images/room_neon_greenhouse_1795457031525.jpg',
  7: '/src/assets/images/room_holo_archive_1795457031336.jpg',
  8: '/src/assets/images/room_cyber_forge_1795457032355.jpg',
  9: '/src/assets/images/room_spiral_well_1795457033925.jpg',
  10: '/src/assets/images/room_freedom_gates_1795457035308.jpg',
};

const SHEET_PATHS = {
  thomas: '/src/assets/images/sprites_thomas_cat_1795457036402.jpg',
  torq: '/src/assets/images/sprites_torq_cat_1795460609074.jpg',
  dogNpcs: '/src/assets/images/sprites_dog_npcs_1795457128590.jpg',
  propsMain: '/src/assets/images/sprites_game_props_1795457056049.jpg',
  propsExtra: '/src/assets/images/sprites_extra_props_1795457127606.jpg',
  propsOrganTech: '/src/assets/images/sprites_organ_tech_props_1795462803678.jpg',
  propsForge: '/src/assets/images/sprites_forge_heavy_props_1795462804212.jpg',
};

const roomImages = new Map<number, HTMLImageElement>();
const spriteMap = new Map<SpriteKey, HTMLCanvasElement>();
let initStarted = false;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

function isGreenBg(r: number, g: number, b: number): boolean {
  // Generous green-screen test that handles JPEG compression near #00FF00
  // without touching cyan (b >= g - 20) or gold/yellow (r >= g - 20)
  return g > 105 && g - Math.max(r, b) > 36;
}

/**
 * Extracts a clean alpha-transparent canvas from a raster sheet by flood-filling
 * connected green-screen pixels inward from the outer boundary + soft despill.
 */
function chromaKeyImage(img: HTMLImageElement): HTMLCanvasElement {
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;
  ctx.drawImage(img, 0, 0);

  const imgData = ctx.getImageData(0, 0, w, h);
  const d = imgData.data;
  const visited = new Uint8Array(w * h);
  const queue = new Int32Array(w * h);
  let head = 0;
  let tail = 0;

  const tryPush = (idx: number) => {
    if (visited[idx]) return;
    const p = idx * 4;
    if (isGreenBg(d[p], d[p + 1], d[p + 2])) {
      visited[idx] = 1;
      queue[tail++] = idx;
    }
  };

  // Seed flood-fill from outer border + a sparse grid of known margin lines
  for (let x = 0; x < w; x++) {
    tryPush(x);
    tryPush((h - 1) * w + x);
  }
  for (let y = 0; y < h; y++) {
    tryPush(y * w);
    tryPush(y * w + (w - 1));
  }

  while (head < tail) {
    const idx = queue[head++];
    const x = idx % w;
    const y = (idx - x) / w;
    d[idx * 4 + 3] = 0;

    if (x > 0) tryPush(idx - 1);
    if (x < w - 1) tryPush(idx + 1);
    if (y > 0) tryPush(idx - w);
    if (y < h - 1) tryPush(idx + w);
  }

  // Also check any enclosed interior green holes (e.g. between cat legs/arms or catapult frame)
  // that are VERY pure bright green (#00FF00) so interior cutouts are transparent too!
  for (let i = 0; i < w * h; i++) {
    const p = i * 4;
    if (d[p + 3] > 0 && d[p + 1] > 185 && d[p] < 65 && d[p + 2] < 65) {
      d[p + 3] = 0;
    }
  }

  // Strip straight full-width / full-height dark divider grid lines if present on generated sheets
  const rowOpaqueDark = new Uint16Array(h);
  const colOpaqueDark = new Uint16Array(w);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const p = (y * w + x) * 4;
      if (d[p + 3] > 0 && Math.max(d[p], d[p + 1], d[p + 2]) < 95) {
        rowOpaqueDark[y]++;
        colOpaqueDark[x]++;
      }
    }
  }
  for (let y = 0; y < h; y++) {
    if (rowOpaqueDark[y] > w * 0.85) {
      for (let x = 0; x < w; x++) {
        const p = (y * w + x) * 4;
        if (Math.max(d[p], d[p + 1], d[p + 2]) < 120) d[p + 3] = 0;
      }
    }
  }
  for (let x = 0; x < w; x++) {
    if (colOpaqueDark[x] > h * 0.85) {
      for (let y = 0; y < h; y++) {
        const p = (y * w + x) * 4;
        if (Math.max(d[p], d[p + 1], d[p + 2]) < 120) d[p + 3] = 0;
      }
    }
  }

  // Soft 1px edge despill + anti-aliasing on pixels bordering transparent area
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const idx = y * w + x;
      const p = idx * 4;
      if (d[p + 3] === 0) continue;

      const hasTransNeighbor =
        d[(idx - 1) * 4 + 3] === 0 ||
        d[(idx + 1) * 4 + 3] === 0 ||
        d[(idx - w) * 4 + 3] === 0 ||
        d[(idx + w) * 4 + 3] === 0;

      if (hasTransNeighbor) {
        const r = d[p];
        const g = d[p + 1];
        const b = d[p + 2];
        const greenExcess = g - Math.max(r, b);
        if (greenExcess > 14) {
          // Despill green fringe and feather alpha slightly
          d[p + 1] = Math.max(r, b) + 6;
          if (greenExcess > 28) {
            d[p + 3] = Math.max(0, 255 - (greenExcess - 28) * 5);
          }
        }
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return c;
}

/**
 * Finds continuous horizontal/vertical bands with opaque pixels inside a region
 * and returns tightly cropped canvases for each sprite cell.
 */
function findSlicesAlongAxis(
  canvas: HTMLCanvasElement,
  rx: number,
  ry: number,
  rw: number,
  rh: number,
  axis: 'x' | 'y',
  expectedCount: number
): Array<{ start: number; end: number }> {
  const ctx = canvas.getContext('2d')!;
  const data = ctx.getImageData(rx, ry, rw, rh).data;
  const len = axis === 'x' ? rw : rh;
  const ortho = axis === 'x' ? rh : rw;
  const hasContent = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    let opaqueCount = 0;
    for (let j = 0; j < ortho; j++) {
      const x = axis === 'x' ? i : j;
      const y = axis === 'x' ? j : i;
      if (data[(y * rw + x) * 4 + 3] > 28) {
        opaqueCount++;
      }
    }
    if (opaqueCount > 3) hasContent[i] = 1;
  }

  // Merge tiny gaps (< 10px) caused by stray sparkles
  const spans: Array<{ start: number; end: number }> = [];
  let inSpan = false;
  let start = 0;
  let gap = 0;
  for (let i = 0; i < len; i++) {
    if (hasContent[i]) {
      if (!inSpan) {
        inSpan = true;
        start = i;
      }
      gap = 0;
    } else if (inSpan) {
      gap++;
      if (gap >= 12) {
        spans.push({ start, end: i - gap });
        inSpan = false;
      }
    }
  }
  if (inSpan) {
    spans.push({ start, end: len - 1 });
  }

  // Filter out tiny noise specks (< 25px)
  const filtered = spans.filter((s) => s.end - s.start >= 25);
  if (filtered.length === expectedCount) {
    return filtered;
  }

  // Fallback equal division if two sprites ever touched slightly
  const fallback: Array<{ start: number; end: number }> = [];
  const step = Math.floor(len / expectedCount);
  for (let k = 0; k < expectedCount; k++) {
    fallback.push({ start: k * step, end: (k + 1) * step - 1 });
  }
  return fallback;
}

function tightCrop(
  src: HTMLCanvasElement,
  rx: number,
  ry: number,
  rw: number,
  rh: number
): HTMLCanvasElement {
  const ctx = src.getContext('2d')!;
  const data = ctx.getImageData(rx, ry, rw, rh).data;
  let minX = rw;
  let minY = rh;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < rh; y++) {
    for (let x = 0; x < rw; x++) {
      if (data[(y * rw + x) * 4 + 3] > 20) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < minX || maxY < minY) {
    const empty = document.createElement('canvas');
    empty.width = 4;
    empty.height = 4;
    return empty;
  }

  const cw = maxX - minX + 1;
  const ch = maxY - minY + 1;
  const out = document.createElement('canvas');
  out.width = cw;
  out.height = ch;
  out.getContext('2d')!.drawImage(src, rx + minX, ry + minY, cw, ch, 0, 0, cw, ch);
  return out;
}

function extractGrid(
  sheet: HTMLCanvasElement,
  rows: number,
  cols: number,
  keys: SpriteKey[]
) {
  const rowSpans = findSlicesAlongAxis(sheet, 0, 0, sheet.width, sheet.height, 'y', rows);
  let kIdx = 0;
  for (let r = 0; r < rows; r++) {
    const rs = rowSpans[r];
    const rh = rs.end - rs.start + 1;
    const colSpans = findSlicesAlongAxis(sheet, 0, rs.start, sheet.width, rh, 'x', cols);
    for (let c = 0; c < cols; c++) {
      const cs = colSpans[c];
      const cw = cs.end - cs.start + 1;
      const cropped = tightCrop(sheet, cs.start, rs.start, cw, rh);
      if (keys[kIdx]) {
        spriteMap.set(keys[kIdx], cropped);
      }
      kIdx++;
    }
  }
}

function deriveGrayVariant(src: HTMLCanvasElement): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = src.width;
  c.height = src.height;
  const ctx = c.getContext('2d')!;
  ctx.drawImage(src, 0, 0);
  const imgData = ctx.getImageData(0, 0, c.width, c.height);
  const d = imgData.data;
  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] === 0) continue;
    const lum = Math.round(0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]);
    d[i] = Math.min(255, Math.round(lum * 0.92));
    d[i + 1] = Math.min(255, Math.round(lum * 0.96));
    d[i + 2] = Math.min(255, Math.round(lum * 1.08));
  }
  ctx.putImageData(imgData, 0, 0);
  return c;
}

function deriveGingerWhiteVariant(src: HTMLCanvasElement): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = src.width;
  c.height = src.height;
  const ctx = c.getContext('2d')!;
  ctx.drawImage(src, 0, 0);
  const imgData = ctx.getImageData(0, 0, c.width, c.height);
  const d = imgData.data;
  // Brighten belly & give warm cream-ginger scholar look + tiny white patches
  for (let y = 0; y < c.height; y++) {
    for (let x = 0; x < c.width; x++) {
      const i = (y * c.width + x) * 4;
      if (d[i + 3] === 0) continue;
      if (y > c.height * 0.45 && x > c.width * 0.3 && x < c.width * 0.7 && d[i] > 140) {
        d[i] = Math.min(255, d[i] + 55);
        d[i + 1] = Math.min(255, d[i + 1] + 75);
        d[i + 2] = Math.min(255, d[i + 2] + 120);
      }
    }
  }
  ctx.putImageData(imgData, 0, 0);
  return c;
}

export function preloadAllGameAssets() {
  if (initStarted) return;
  initStarted = true;

  // 1. Load all 10 room backdrops
  Object.entries(ROOM_IMAGE_PATHS).forEach(([idStr, path]) => {
    const id = Number(idStr);
    loadImage(path)
      .then((img) => {
        roomImages.set(id, img);
      })
      .catch(() => {});
  });

  // 2. Load & extract all raster sprite sheets
  loadImage(SHEET_PATHS.thomas)
    .then((img) => {
      const keyed = chromaKeyImage(img);
      extractGrid(keyed, 1, 4, [
        'thomas_idle',
        'thomas_walk',
        'thomas_cast',
        'thomas_sneak',
      ]);
    })
    .catch(() => {});

  loadImage(SHEET_PATHS.torq)
    .then((img) => {
      const keyed = chromaKeyImage(img);
      extractGrid(keyed, 1, 4, [
        'torq_idle',
        'torq_walk',
        'torq_shock',
        'torq_strain',
      ]);
    })
    .catch(() => {});

  loadImage(SHEET_PATHS.dogNpcs)
    .then((img) => {
      const keyed = chromaKeyImage(img);
      extractGrid(keyed, 2, 3, [
        'dog_sleep',
        'dog_angry',
        'drone_pug',
        'cat_ginger',
        'cat_tabby',
        'cat_white',
      ]);
      const tabby = spriteMap.get('cat_tabby');
      if (tabby) spriteMap.set('cat_gray', deriveGrayVariant(tabby));
      const ginger = spriteMap.get('cat_ginger');
      if (ginger) spriteMap.set('cat_ginger_white', deriveGingerWhiteVariant(ginger));
    })
    .catch(() => {});

  loadImage(SHEET_PATHS.propsMain)
    .then((img) => {
      const keyed = chromaKeyImage(img);
      extractGrid(keyed, 3, 4, [
        'prop_key',
        'prop_pillow',
        'prop_panel',
        'prop_fuse',
        'prop_weight',
        'prop_crate',
        'prop_telescope',
        'prop_plant',
        'prop_scroll',
        'prop_dome',
        'prop_catapult',
        'prop_bone',
      ]);
    })
    .catch(() => {});

  loadImage(SHEET_PATHS.propsExtra)
    .then((img) => {
      const keyed = chromaKeyImage(img);
      extractGrid(keyed, 2, 3, [
        'prop_gear',
        'prop_generator',
        'prop_bell',
        'prop_lever',
        'prop_can',
        'prop_lens',
      ]);
    })
    .catch(() => {});

  loadImage(SHEET_PATHS.propsOrganTech)
    .then((img) => {
      const keyed = chromaKeyImage(img);
      extractGrid(keyed, 2, 4, [
        'prop_organ_key',
        'prop_cork',
        'prop_cable',
        'prop_astro_ring',
        'prop_plug',
        'prop_photocell',
        'prop_keycard',
        'prop_socket',
      ]);
    })
    .catch(() => {});

  loadImage(SHEET_PATHS.propsForge)
    .then((img) => {
      const keyed = chromaKeyImage(img);
      extractGrid(keyed, 2, 4, [
        'prop_bellows',
        'prop_chain',
        'prop_hook',
        'prop_mag_platform',
        'prop_bolt',
        'prop_furnace',
        'prop_uv_lamp',
        'prop_scanner',
      ]);
    })
    .catch(() => {});
}

export function getRoomImage(levelId: number): HTMLImageElement | null {
  return roomImages.get(levelId) || null;
}

export function getSprite(key: SpriteKey): HTMLCanvasElement | null {
  return spriteMap.get(key) || null;
}
