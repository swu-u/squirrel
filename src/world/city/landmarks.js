// The four corner blocks, each with a landmark: corner cafe with market and greenhouse (SE),
// church with steeple (NE), construction site with crane (NW), warehouse with water tower (SW).
import * as THREE from 'three';
import { mulberry32 } from '../../core/rng.js';
import { C, mulC, varyC } from './builder.js';
import { G, SIDE_YAW, SIDE_NAME } from './ground.js';
import { ATLAS } from './textures.js';
import { building, makeStyle, BRICK } from './buildings.js';
import { makeLots, buildRow, fence } from './blocks.js';
import { wire } from './streets.js';
import { lampPost } from './park.js';
import { cardMaterial } from './materials.js';
import { farTreeTex } from './textures.js';

const V = (x, y, z) => new THREE.Vector3(x, y, z);
const IRON = C(0x25272a);

function genericRows(S, s, rng, a0, b1) {
  const b = S.b;
  // row A faces the ring road arm (+z), row B faces the side street (-x)
  const la = makeLots(rng, 116 - a0, { gapP: 0.3, dMin: 11, dVar: 2 });
  const ra = buildRow(S, rng, la, (uc, d) => ({ x: a0 + uc, z: -G.B0 - d / 2, yaw: 0 }), { sideName: 'corner', row: 'corner', detStart: true, detEnd: true });
  const lb = makeLots(rng, b1 + 116, { gapP: 0.3, dMin: 11, dVar: 2 });
  const rb = buildRow(S, rng, lb, (uc, d) => ({ x: G.B0 + d / 2, z: -116 + uc, yaw: -Math.PI / 2 }), { sideName: 'corner', row: 'corner', detStart: true, detEnd: true });
  S.corners[s] = { ra, rb };
}

// ---------------------------------------------------------------- SE: cafe, market stalls, greenhouse
function parasol(S, x, z, col, golden) {
  const b = S.b, M = S.mats;
  b.scyl(M.wood, [x, 0, z], [x, 2.55, z], 0.035, 0.03, 6, C(0xb89468), 'pole', 0);
  b.cyl(M.cloth, [x, 2.2, z], [x, 2.6, z], 1.45, 0.06, 8, col, 3);
  b.cbox(x, 2.36, z, 2.1, 0.1, 2.1, 'awning', null, { tag: 'parasol' }); b.cbox(x, 2.36, z, 2.1, 0.1, 2.1, 'awning', { yaw: Math.PI / 4 }, { tag: 'parasol' });
  b.cyl(M.plain, [x, 0, z], [x, 0.08, z], 0.3, 0.26, 8, IRON, 2);
  if (golden) S.golden.push({ pos: b.toWorld(x, 2.62 + 0.3, z), where: 'special', name: 'On top of the cafe parasol' });
  else S.run('special', [b.toWorld(x, 2.62 + 0.28, z)], 'parasol');
}
function cafeTable(S, x, z, rng) {
  const b = S.b, M = S.mats;
  b.cyl(M.plain, [x, 0, z], [x, 0.72, z], 0.04, 0.04, 6, IRON, 0); b.cyl(M.plain, [x, 0, z], [x, 0.04, z], 0.24, 0.22, 8, IRON, 2);
  b.cyl(M.plain, [x, 0.72, z], [x, 0.76, z], 0.42, 0.42, 12, C(0xe8e2d6), 3);
  b.cbox(x, 0.74, z, 0.72, 0.05, 0.72, 'prop');
  const n = 2 + ((rng() * 2) | 0), a0 = rng() * 6.28;
  for (let i = 0; i < n; i++) {
    const a = a0 + (i * 6.283) / n, cx = x + Math.cos(a) * 0.78, cz = z + Math.sin(a) * 0.78, yaw = Math.atan2(x - cx, z - cz), cc = C(0x2f6a4a);
    b.push(cx, 0, cz, yaw);
    b.sbox(M.plain, 0, 0.45, 0, 0.42, 0.04, 0.42, 'prop', { c: cc });
    b.box(M.plain, 0, 0.72, -0.2, 0.42, 0.42, 0.03, { c: cc });
    for (const [lx, lz] of [[-0.18, -0.18], [0.18, -0.18], [-0.18, 0.18], [0.18, 0.18]]) b.box(M.plain, lx, 0.22, lz, 0.03, 0.45, 0.03, { c: IRON });
    b.pop();
  }
  if (rng() < 0.5) b.cyl(M.plain, [x + 0.1, 0.76, z], [x + 0.1, 0.86, z + 0.02], 0.04, 0.045, 6, C(0xf1ebde), 2);
}
function stall(S, x, z, yaw, col, rng) {
  const b = S.b, M = S.mats, wood = C(0xb08a56);
  b.push(x, 0, z, yaw);
  b.sbox(M.wood, 0, 0.5, 0, 2.8, 1.0, 1.0, 'prop', { c: wood, ao: [0.6, 1], tile: 1.2 });
  for (const sx of [-1.4, 1.4]) { b.scyl(M.wood, [sx, 0, -0.55], [sx, 2.75, -0.55], 0.04, 0.04, 5, wood, 'pole', 0); b.scyl(M.wood, [sx, 0, 0.75], [sx, 2.2, 0.75], 0.04, 0.04, 5, wood, 'pole', 0); }
  const o = { c: col, rot: [0.4, 0, 0], tile: 0.56 };
  b.box(M.cloth, 0, 2.5, 0.12, 3.2, 0.05, 1.7, o); b.cbox(0, 2.5, 0.12, 3.2, 0.05, 1.7, 'awning', o);
  b.fq(M.cloth, -1.6, 1.95, 1.6, 2.17, 0.9, col, 0.9, 1);
  // produce
  const pc = [C(0xd8452f), C(0xe8a030), C(0x6f9a3a), C(0xc8c040), C(0x8a3a5a), C(0xe0d8c0)];
  for (let i = 0; i < 4; i++) {
    const cx = -1.05 + i * 0.7, c = pc[(rng() * pc.length) | 0];
    b.box(M.wood, cx, 1.08, 0.05, 0.6, 0.16, 0.8, { c: C(0x8a6a44), rot: [0.18, 0, 0], tile: 0.8 });
    for (let k = 0; k < 6; k++) b.blob(M.plain, cx - 0.18 + (k % 3) * 0.18, 1.2 + ((k / 3) | 0) * 0.02, -0.15 + ((k / 3) | 0) * 0.3, 0.1, 0.09, 0.1, c, { seg: 6, rings: 3 });
  }
  S.run('special', [b.toWorld(-0.9, 2.5 + 0.3, 0.12), b.toWorld(0, 2.5 + 0.3, 0.12), b.toWorld(0.9, 2.5 + 0.3, 0.12)], 'stall');
  b.pop();
}
function greenhouse(S, x, z, yaw) {
  const b = S.b, M = S.mats, W = 8, D = 5, H = 2.3, white = C(0xf1ebde), gl = [0.8, 0.95, 0.92];
  b.push(x, 0, z, yaw);
  // base wall
  for (const [cx, cz, sx, sz] of [[0, D / 2 - 0.1, W, 0.2], [0, -D / 2 + 0.1, W, 0.2], [-W / 2 + 0.1, 0, 0.2, D - 0.4], [W / 2 - 0.1, 0, 0.2, D - 0.4]]) b.box(M.brick, cx, 0.3, cz, sx, 0.6, sz, { c: mulC(C(0x9c4a36), 1.35), ao: [0.6, 1] });
  b.cbox(0, H / 2, 0, W, H, D, 'building', null, { tag: 'greenhouse' });
  // frame and panes
  const bar = (x0, y0, z0, x1, y1, z1, t = 0.06) => b.cyl(M.plain, [x0, y0, z0], [x1, y1, z1], t / 2, t / 2, 4, white, 0);
  for (let i = 0; i <= 8; i++) { const px = -W / 2 + i; for (const sz of [-1, 1]) { bar(px, 0.6, sz * D / 2, px, H, sz * D / 2); bar(px, H, sz * D / 2, px, H + 1.25, 0); } }
  for (const sz of [-1, 1]) { bar(-W / 2, H, sz * D / 2, W / 2, H, sz * D / 2, 0.08); bar(-W / 2, 1.45, sz * D / 2, W / 2, 1.45, sz * D / 2, 0.04); }
  bar(-W / 2, H + 1.25, 0, W / 2, H + 1.25, 0, 0.1);
  for (const sx of [-1, 1]) { bar(sx * W / 2, 0.6, 0, sx * W / 2, H + 1.25, 0); bar(sx * W / 2, 0.6, -D / 4, sx * W / 2, H + 0.62, -D / 4); bar(sx * W / 2, 0.6, D / 4, sx * W / 2, H + 0.62, D / 4); }
  for (const sz of [-1, 1]) {
    b.quad(M.pane, sz > 0 ? [-W / 2, 0.6, D / 2] : [W / 2, 0.6, -D / 2], sz > 0 ? [W / 2, 0.6, D / 2] : [-W / 2, 0.6, -D / 2], sz > 0 ? [W / 2, H, D / 2] : [-W / 2, H, -D / 2], sz > 0 ? [-W / 2, H, D / 2] : [W / 2, H, -D / 2], null, gl);
    b.quad(M.pane, sz > 0 ? [-W / 2, H, D / 2] : [W / 2, H, -D / 2], sz > 0 ? [W / 2, H, D / 2] : [-W / 2, H, -D / 2], sz > 0 ? [W / 2, H + 1.25, 0] : [-W / 2, H + 1.25, 0], sz > 0 ? [-W / 2, H + 1.25, 0] : [W / 2, H + 1.25, 0], null, gl);
    const pitch = Math.atan2(1.25, D / 2), L = Math.hypot(1.25, D / 2), T = (D / 2) * Math.sin(pitch);
    b.cbox(0, H + 0.625 - Math.cos(pitch) * T / 2, sz * D / 4 - sz * Math.sin(pitch) * T / 2, W, T, L, 'roof', { rot: [sz * pitch, 0, 0] }, { tag: 'greenhouse' });
  }
  for (const sx of [-1, 1]) { b.quad(M.pane, sx > 0 ? [W / 2, 0.6, D / 2] : [-W / 2, 0.6, -D / 2], sx > 0 ? [W / 2, 0.6, -D / 2] : [-W / 2, 0.6, D / 2], sx > 0 ? [W / 2, H, -D / 2] : [-W / 2, H, D / 2], sx > 0 ? [W / 2, H, D / 2] : [-W / 2, H, -D / 2], null, gl); }
  // plants inside
  for (let i = 0; i < 7; i++) for (const sz of [-1.4, 1.4]) { const px = -3.3 + i * 1.1; b.box(M.plain, px, 0.75, sz, 0.5, 0.3, 0.5, { c: C(0xa8553a) }); b.blob(M.plain, px, 1.2, sz, 0.35, 0.45, 0.35, [C(0x4f8a3c), C(0x7aa040), C(0x3f7a4a)][i % 3], { seg: 6, rings: 4, noise: 0.2, seed: i }); }
  b.hq(M.plain, -W / 2 + 0.2, -D / 2 + 0.2, W / 2 - 0.2, D / 2 - 0.2, 0.02, C(0x6a5a48));
  S.run('roof', [-3, -1.5, 0, 1.5, 3].map((px) => b.toWorld(px, H + 1.25 + 0.3, 0)), 'greenhouse');
  S.landmarks.greenhouse = b.toWorld(0, H + 1.25, 0);
  b.pop();
}
function cornerCafe(S, s, rng) {
  const b = S.b, M = S.mats;
  genericRows(S, s, rng, 92, -96);
  b.setChunk('q' + S.quadOf(b.wx(75, -75), b.wz(75, -75)));
  const st = makeStyle(S, 'shop', rng, { style: 'stucco', hex: 0xe8dcc0 }); st.awn = C(0xb8352a); st.band = true;
  const rec = building(S, { x: 75, z: -88.5, yaw: 0, w: 15, d: 12, floors: 3, kind: 'shop', roof: 'flat', st, expL: true, expR: true, detL: true, detR: true, sideName: 'corner', row: 'cafe', sign: 2, fire: true }, rng);
  // plaza paving
  b.hq(M.stone, 67, -82.5, 91, -67, 0.014, C(0xc9b89a, 1.25), 1.0);
  const reds = [C(0xb8352a), C(0xe8e2d0), C(0x2f6a4a)];
  const tables = [[70.5, -71], [74.5, -70.2], [78.8, -71.4], [71, -76], [75.6, -75.2], [79.6, -76.6], [72.6, -79.6], [78, -80]];
  tables.forEach(([x, z], i) => { cafeTable(S, x, z, rng); if (i % 3 === 0) parasol(S, x + 0.9, z + 0.5, reds[i % 3 === 0 ? (i / 3) % 3 | 0 : 0], i === 3); });
  // planters around the plaza
  for (const [x, z, sx, sz] of [[67.6, -72, 0.7, 5], [67.6, -79.5, 0.7, 4], [72, -67.6, 5, 0.7], [79.5, -67.6, 4, 0.7]]) {
    b.sbox(M.wood, x, 0.3, z, sx, 0.6, sz, 'prop', { c: C(0x7a5a3c), ao: [0.6, 1], tile: 1.2 });
    const n = Math.round(Math.max(sx, sz) / 0.9); for (let k = 0; k < n; k++) { const t = (k + 0.5) / n - 0.5; b.blob(M.plain, x + (sx > sz ? t * sx : 0), 0.82, z + (sx > sz ? 0 : t * sz), 0.5, 0.4, 0.44, k % 3 === 1 ? C(0xa8442a) : C(0x4f7a34), { seg: 9, rings: 6, noise: 0.1, seed: k + x, top: k % 3 === 1 ? C(0xd87a2b) : C(0x8fb04a) }); }
  }
  // chalk board
  b.push(81.6, 0, -81.2, -0.4); b.box(M.plain, 0, 0.5, 0, 0.6, 1.0, 0.05, { c: C(0x26282b), rot: [-0.2, 0, 0] }); b.box(M.wood, 0, 0.5, -0.01, 0.68, 1.08, 0.04, { c: C(0xb08a56), rot: [-0.2, 0, 0] }); b.pop();
  // strings of lights from the cafe front to two posts
  for (const px of [68.6, 81.4]) { const top = lampPost(S, px, -68.4, { h: 3.6 }); wire(S, V(top.x, top.y - 0.7, top.z), rec.toWorld(px - 75, 4.0, 6.1), { sag: 0.6, pieces: 5, r: 0.02, tag: 'lights', bulbs: 10 }); }
  // market stalls and greenhouse
  const cols = [C(0x2f5f8f), C(0xe0a830), C(0x2f6a4a)];
  for (let i = 0; i < 3; i++) stall(S, 87.6, -70.4 - i * 4.2, -Math.PI / 2, cols[i], rng);
  b.hq(M.grassTile, 84, -112, 114, -84, 0.016, C(0x7d9a45, 1.25));
  greenhouse(S, 100, -99, 0.0);
  for (let i = 0; i < 4; i++) { const bx = 88 + i * 3.4; b.sbox(M.wood, bx, 0.2, -90, 2.4, 0.4, 1.2, 'prop', { c: C(0x7a5a3c), ao: [0.6, 1], tile: 1.2 }); for (let k = 0; k < 4; k++) b.blob(M.plain, bx - 0.8 + k * 0.55, 0.52, -90, 0.24, 0.22, 0.3, k % 2 ? C(0x4f8a3c) : C(0x9ab048), { seg: 6, rings: 3, noise: 0.2, seed: k + i }); }
  S.landmarks.cafe = b.toWorld(75, 0, -75);
  S.landmarks.market = b.toWorld(87.6, 0, -74.6);
  S.zonesRaw.push({ center: b.toWorld(75, 0, -75), radius: 7, kind: 'terrier', name: 'Cafe terrace' });
}

// ---------------------------------------------------------------- NE: church
function church(S, s, rng) {
  const b = S.b, M = S.mats, stone = C(0xc2b49a, 1.25), dark = C(0x8a8170, 1.2), slate = C(0x4f5a66, 1.3);
  genericRows(S, s, rng, 94, -93);
  b.setChunk('q' + S.quadOf(b.wx(78, -78), b.wz(78, -78)));
  b.hq(M.grassTile, 67, -92, 93, -67, 0.016, C(0x6f9040, 1.25));
  // nave
  const nx = 81.5, nz = -79.5, NW = 19, ND = 10, NH = 8.5, pitch = 0.9;
  b.push(nx, 0, nz, 0);
  b.sbox(M.stone, 0, NH / 2, 0, NW, NH, ND, 'building', { c: stone, ao: [0.62, 1], skip: 'py ny' }, { tag: 'church' });
  b.box(M.stone, 0, 0.4, 0, NW + 0.3, 0.8, ND + 0.3, { c: dark, ao: [0.6, 1], skip: 'py ny' });
  const rise = (ND / 2) * Math.tan(pitch), ridge = NH + rise, over = 0.3, L = (ND / 2 + over) / Math.cos(pitch), T = (ND / 2) * Math.sin(pitch);
  for (const sg of [1, -1]) {
    const mz = sg * (ND / 2 + over) / 2, my = ridge - ((ND / 2 + over) / 2) * Math.tan(pitch), rot = [sg * pitch, 0, 0];
    b.box(M.tiles, 0, my - 0.06 * Math.cos(pitch), mz - sg * 0.06 * Math.sin(pitch), NW + 0.5, 0.12, L, { c: slate, rot });
    b.cbox(0, my - Math.cos(pitch) * T / 2, mz - sg * Math.sin(pitch) * T / 2, NW + 0.5, T, L, 'roof', { rot }, { tag: 'church' });
    // stained glass and buttresses along the nave
    for (let i = 0; i < 5; i++) {
      const wx = -NW / 2 + 2.6 + i * 3.45;
      b.quad(M.atlas, sg > 0 ? [wx - 0.7, 2.6, ND / 2 + 0.012] : [wx + 0.7, 2.6, -ND / 2 - 0.012], sg > 0 ? [wx + 0.7, 2.6, ND / 2 + 0.012] : [wx - 0.7, 2.6, -ND / 2 - 0.012], sg > 0 ? [wx + 0.7, 6.4, ND / 2 + 0.012] : [wx - 0.7, 6.4, -ND / 2 - 0.012], sg > 0 ? [wx - 0.7, 6.4, ND / 2 + 0.012] : [wx + 0.7, 6.4, -ND / 2 - 0.012], ATLAS.stained);
      b.sbox(M.plain, wx, 2.5, sg * (ND / 2 + 0.16), 1.7, 0.12, 0.34, 'ledge', { c: dark });
      if (i < 4) { const bx = wx + 1.72; b.sbox(M.stone, bx, 3.0, sg * (ND / 2 + 0.4), 0.6, 6.0, 0.8, 'building', { c: stone, ao: [0.6, 1], tile: 1.4 }); const o = { c: dark, rot: [sg * 0.9, 0, 0] }; b.box(M.plain, bx, 6.15, sg * (ND / 2 + 0.33), 0.66, 0.1, 1.0, o); }
    }
  }
  b.box(M.plain, 0, ridge + 0.06, 0, NW + 0.5, 0.14, 0.3, { c: mulC(slate, 0.7) });
  const tl = 2;
  for (const sg of [-1, 1]) { const x = sg * NW / 2, zb = sg * ND / 2; b.tri(M.stone, [x, NH, zb], [x, NH, -zb], [x, ridge, 0], [(zb + ND / 2) / tl, NH / tl], [(-zb + ND / 2) / tl, NH / tl], [ND / 2 / tl, ridge / tl], stone, 1, 1, 0.9); }
  // east end: round window, small cross
  b.quad(M.atlas, [NW / 2 + 0.012, 5.6, 1.1], [NW / 2 + 0.012, 5.6, -1.1], [NW / 2 + 0.012, 7.8, -1.1], [NW / 2 + 0.012, 7.8, 1.1], ATLAS.round);
  b.box(M.plain, NW / 2, ridge + 0.6, 0, 0.1, 1.0, 0.1, { c: dark }); b.box(M.plain, NW / 2, ridge + 0.75, 0, 0.1, 0.1, 0.6, { c: dark });
  S.run('roof', [-7, -4.2, -1.4, 1.4, 4.2, 7].map((x) => b.toWorld(x, ridge + 0.13 + 0.25, 0)), 'ridge');
  b.pop();
  // tower
  const tx = 70.8, tz = -71.2, TW = 5.4, TH = 19;
  b.push(tx, 0, tz, 0);
  b.sbox(M.stone, 0, TH / 2, 0, TW, TH, TW, 'building', { c: stone, ao: [0.62, 1], skip: 'ny' }, { tag: 'tower' });
  b.box(M.stone, 0, 0.5, 0, TW + 0.4, 1.0, TW + 0.4, { c: dark, ao: [0.6, 1], skip: 'ny' });
  for (const y of [7.0, 13.2, TH - 0.2]) { b.box(M.plain, 0, y, 0, TW + 0.36, 0.24, TW + 0.36, { c: dark, ao: [0.75, 1] }); b.cbox(0, y, 0, TW + 0.36, 0.24, TW + 0.36, 'ledge'); }
  for (let k = 0; k < 4; k++) {
    b.push(0, 0, 0, k * Math.PI / 2);
    b.fq(M.atlas, -1.35, 14.0, 1.35, 16.7, TW / 2 + 0.014, [1, 1, 1], 1, 1, ATLAS.clock);
    for (const sx of [-0.8, 0.8]) { b.fq(M.plain, sx - 0.42, 9.0, sx + 0.42, 11.8, TW / 2 + 0.012, C(0x1a1c20)); for (let y = 9.2; y < 11.8; y += 0.36) b.box(M.plain, sx, y, TW / 2 + 0.05, 0.84, 0.06, 0.14, { c: dark, rot: [0.5, 0, 0] }); b.box(M.plain, sx, 8.92, TW / 2 + 0.1, 1.0, 0.1, 0.22, { c: dark }); }
    if (k === 0) { b.fq(M.atlas, -1.0, 0.06, 1.0, 3.6, TW / 2 + 0.2, [0.9, 0.8, 0.7], 1, 1, ATLAS.door[0]); b.box(M.stone, 0, 3.85, TW / 2 + 0.1, 2.6, 0.4, 0.24, { c: dark }); for (const sx of [-1.2, 1.2]) b.box(M.stone, sx, 1.9, TW / 2 + 0.1, 0.36, 3.8, 0.24, { c: dark, ao: [0.6, 1] }); b.sbox(M.stone, 0, 0.1, TW / 2 + 0.7, 3.0, 0.2, 1.0, 'prop', { c: stone }); }
    else b.fq(M.atlas, -0.55, 2.4, 0.55, 5.4, TW / 2 + 0.012, [1, 1, 1], 1, 1, ATLAS.stained);
    // battlements and corner pinnacle
    for (const sx of [-1.35, 0, 1.35]) b.sbox(M.stone, sx, TH + 0.35, TW / 2 - 0.2, 0.9, 0.7, 0.4, 'building', { c: stone, tile: 1.4 });
    b.sbox(M.stone, TW / 2 - 0.3, TH + 0.8, TW / 2 - 0.3, 0.6, 1.6, 0.6, 'building', { c: stone, tile: 1.4 });
    b.cyl(M.plain, [TW / 2 - 0.3, TH + 1.6, TW / 2 - 0.3], [TW / 2 - 0.3, TH + 2.7, TW / 2 - 0.3], 0.36, 0.02, 4, dark, 0);
    b.pop();
  }
  // spire
  const sy0 = TH + 0.1, sy1 = 30.0, SR = 2.25;
  b.cyl(M.tiles, [0, sy0, 0], [0, sy1, 0], SR, 0.07, 8, slate, 0, 0.8, 1);
  b.cyl(M.plain, [0, sy0 - 0.1, 0], [0, sy0 + 0.25, 0], SR + 0.22, SR + 0.05, 8, dark, 3);
  b.ccap([0, sy0 + 0.1, 0], [0, sy1 - 0.1, 0], SR * 0.95, 0.1, 'roof', { tag: 'spire' });
  b.blob(M.metal, 0, sy1 + 0.12, 0, 0.22, 0.22, 0.22, C(0xd8b455), { seg: 10, rings: 6 });
  b.ccap([0, sy1 + 0.1, 0], [0, sy1 + 0.14, 0], 0.22, 0.22, 'prop', { tag: 'finial' });
  b.cyl(M.metal, [0, sy1 + 0.3, 0], [0, sy1 + 1.3, 0], 0.03, 0.02, 5, C(0xd8b455), 2); b.box(M.metal, 0, sy1 + 0.95, 0, 0.5, 0.05, 0.05, { c: C(0xd8b455) });
  S.golden.push({ pos: b.toWorld(0.0, sy1 + 0.36 + 0.3, 0.28), where: 'special', name: 'Top of the steeple' });
  S.landmarks.steeple = b.toWorld(0, sy1 + 0.35, 0);
  S.run('roof', [[-2, -2.3], [0, -2.5], [2, -2.3]].map(([x, z]) => b.toWorld(x, TH + 0.25, z)), 'tower');
  b.pop();
  // churchyard wall, gravestones, yews, bench
  for (const [x0, z0, x1, z1] of [[74, -67.4, 93, -67.4], [67.4, -75, 67.4, -92]]) {
    const len = Math.hypot(x1 - x0, z1 - z0); b.push((x0 + x1) / 2, 0, (z0 + z1) / 2, Math.atan2(-(z1 - z0), x1 - x0));
    b.sbox(M.stone, 0, 0.4, 0, len, 0.8, 0.4, 'wall', { c: stone, ao: [0.6, 1] }); b.box(M.plain, 0, 0.84, 0, len, 0.08, 0.5, { c: dark }); b.pop();
  }
  for (let i = 0; i < 9; i++) { const gx = 70 + (i % 3) * 2.0 + rng() * 0.5, gz = -80 - ((i / 3) | 0) * 2.6 - rng() * 0.6; b.push(gx, 0, gz, (rng() - 0.5) * 0.3); b.sbox(M.stone, 0, 0.45, 0, 0.6, 0.9, 0.14, 'prop', { c: varyC(dark, rng, 0.15), rot: [(rng() - 0.5) * 0.12, 0, (rng() - 0.5) * 0.1], tile: 1.2 }); b.blob(M.stone, 0, 0.92, 0, 0.3, 0.2, 0.07, dark, { seg: 8, rings: 4 }); b.pop(); }
  for (const [x, z] of [[76.5, -71], [90.5, -71.5], [89.5, -88]]) { const w = b.toWorld(x, 0, z); S.treeSpecs.push({ x: w.x, z: w.z, y: 0, type: 'pine', seed: 7000 + x, scale: 0.8, role: 'yard' }); }
  S.landmarks.church = b.toWorld(nx, 0, nz);
}

// ---------------------------------------------------------------- NW: construction site and crane
function construction(S, s, rng) {
  const b = S.b, M = S.mats, conc = C(0xb5b0a6, 1.1), steel = C(0xe0b030), ply = C(0x3f6f9f);
  genericRows(S, s, rng, 93, -93);
  b.setChunk('q' + S.quadOf(b.wx(79, -79), b.wz(79, -79)));
  b.hq(M.grassTile, 67, -92, 92, -67, 0.016, C(0x9a8a62, 1.15));
  // hoarding around the plot, gate on the park side
  for (const [hi, [x0, z0, x1, z1]] of [[67.3, -67.3, 74, -67.3], [80, -67.3, 91.6, -67.3], [91.6, -67.3, 91.6, -91.6], [91.6, -91.6, 67.3, -91.6], [67.3, -91.6, 67.3, -67.3]].entries()) fence(S, x0, z0, x1, z1, hi % 2 ? ply : C(0xe8e2d0), 2.3);
  // concrete frame
  const fx = 79, fz = -81, FW = 16, FD = 13, levels = [0.25, 3.5, 6.75, 10.0];
  b.push(fx, 0, fz, 0);
  levels.forEach((y, i) => { b.sbox(M.stucco, 0, y - 0.15, 0, FW, 0.3, FD, 'building', { c: conc, ao: [0.75, 1] }, { tag: 'slab' }); });
  for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) { const cx = -FW / 2 + 0.5 + (i * (FW - 1)) / 3, cz = -FD / 2 + 0.5 + (j * (FD - 1)) / 2; b.sbox(M.stucco, cx, 5.0, cz, 0.5, 10.0, 0.5, 'building', { c: mulC(conc, 0.92), ao: [0.6, 1] }); for (let k = 0; k < 4; k++) b.cyl(M.plain, [cx - 0.15 + (k % 2) * 0.3, 10.0, cz - 0.15 + ((k / 2) | 0) * 0.3], [cx - 0.15 + (k % 2) * 0.3, 10.9, cz - 0.15 + ((k / 2) | 0) * 0.3], 0.015, 0.015, 3, C(0x8a4a2a), 0); }
  b.sbox(M.stucco, 4.5, 5.6, -3.5, 3.2, 11.2, 3.2, 'building', { c: mulC(conc, 0.85), ao: [0.6, 1] }, { tag: 'core' });
  // scaffolding on the front
  const sz0 = FD / 2 + 0.35, sz1 = FD / 2 + 1.45, decks = [2.3, 4.5, 6.7, 8.9];
  for (let i = 0; i <= 6; i++) { const sx = -FW / 2 + (i * FW) / 6; for (const z of [sz0, sz1]) b.scyl(M.metal, [sx, 0, z], [sx, 10.6, z], 0.03, 0.03, 5, C(0x9aa0a6), 'pole', 0, { tag: 'scaffold' }); for (const y of decks) b.cyl(M.metal, [sx, y - 0.08, sz0], [sx, y - 0.08, sz1], 0.025, 0.025, 4, C(0x9aa0a6), 0); }
  for (const y of decks) { b.sbox(M.wood, 0, y, (sz0 + sz1) / 2, FW, 0.05, 1.0, 'prop', { c: C(0xc9a878), tile: 1.5 }, { noCamera: true, tag: 'scaffold' }); b.scyl(M.metal, [-FW / 2, y + 1.0, sz1], [FW / 2, y + 1.0, sz1], 0.025, 0.025, 4, C(0x9aa0a6), 'rail', 0); b.cyl(M.metal, [-FW / 2, y + 0.5, sz1], [FW / 2, y + 0.5, sz1], 0.02, 0.02, 4, C(0x9aa0a6), 0); }
  for (let i = 0; i < 6; i += 2) { const x0 = -FW / 2 + (i * FW) / 6, x1 = x0 + FW / 6; for (let k = 0; k < 4; k++) b.cyl(M.metal, [k % 2 ? x1 : x0, k ? decks[k - 1] : 0, sz1 + 0.03], [k % 2 ? x0 : x1, decks[k], sz1 + 0.03], 0.02, 0.02, 4, C(0x9aa0a6), 0); }
  // safety net on part of it
  b.quad(M.pane, [-FW / 2, 4.5, sz1 + 0.06], [0, 4.5, sz1 + 0.06], [0, 10.4, sz1 + 0.06], [-FW / 2, 10.4, sz1 + 0.06], null, [0.3, 0.75, 0.45]);
  // ladders between decks
  decks.forEach((y, k) => { const lx = FW / 2 - 1.0 - (k % 2) * 2.2, y0 = k ? decks[k - 1] : 0; for (const o2 of [-0.2, 0.2]) b.scyl(M.metal, [lx + o2, y0, sz1 - 0.2], [lx + o2, y + 1.0, sz0 + 0.25], 0.022, 0.022, 4, C(0xd8d2c4), 'rail', 0); });
  S.run('roof', decks.map((y, k) => b.toWorld(-FW / 2 + 2 + k * 3.2, y + 0.3, (sz0 + sz1) / 2)), 'scaffold');
  S.run('roof', [-6, -3, 0, 3].map((x) => b.toWorld(x, 10.0 + 0.25, 3)), 'slab');
  S.landmarks.scaffold = b.toWorld(0, 9, sz1);
  b.pop();
  // tower crane
  const cx = 87.2, cz = -71.6, MH = 23, jyaw = 3.86;
  b.push(cx, 0, cz, 0);
  b.sbox(M.stucco, 0, 0.5, 0, 3.2, 1.0, 3.2, 'prop', { c: conc, ao: [0.6, 1] });
  b.cbox(0, MH / 2 + 0.5, 0, 1.4, MH - 1, 1.4, 'building', null, { tag: 'crane' });
  for (const [sx, sz] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) b.box(M.gloss, sx * 0.65, MH / 2 + 0.5, sz * 0.65, 0.12, MH - 1, 0.12, { c: steel });
  for (let y = 1; y < MH - 0.5; y += 1.4) for (let k = 0; k < 4; k++) {
    b.push(0, 0, 0, k * Math.PI / 2);
    b.box(M.gloss, 0, y + 0.7, 0.65, 1.9, 0.06, 0.06, { c: steel, rot: [0, 0, (Math.round(y / 1.4) + k) % 2 ? 0.82 : -0.82] });
    b.box(M.gloss, 0, y, 0.65, 1.3, 0.06, 0.06, { c: steel });
    b.pop();
  }
  // slewing unit, cab, jib
  b.push(0, MH, 0, jyaw);
  b.sbox(M.gloss, 0, 0.4, 0, 1.9, 0.8, 1.9, 'building', { c: mulC(steel, 0.8) }, { tag: 'crane' });
  b.sbox(M.gloss, 0.2, 1.5, 1.2, 1.5, 1.5, 1.3, 'building', { c: C(0xe8e2d0) }, { tag: 'crane' });
  b.fq(M.gloss, -0.45, 1.05, 0.85, 2.1, 1.86, C(0x1c2630));
  const JL = 23, CJ = 7.5, jy = 1.6;
  b.cbox(JL / 2 + 0.5, jy + 0.45, 0, JL, 1.0, 0.9, 'building', null, { tag: 'jib' });
  b.cbox(-CJ / 2 - 0.5, jy + 0.2, 0, CJ, 0.5, 1.0, 'building', null, { tag: 'jib' });
  for (const sz of [-0.42, 0.42]) { b.box(M.gloss, JL / 2 + 0.5, jy, sz, JL, 0.1, 0.1, { c: steel }); b.box(M.gloss, -CJ / 2 - 0.5, jy, sz, CJ, 0.1, 0.1, { c: steel }); }
  b.box(M.gloss, JL / 2 + 0.5, jy + 0.9, 0, JL, 0.1, 0.1, { c: steel });
  for (let x = 0.5; x < JL + 0.4; x += 1.15) { const up = Math.round(x / 1.15) % 2; for (const sz of [-0.42, 0.42]) b.cyl(M.gloss, [x, up ? jy : jy + 0.9, up ? sz : 0], [x + 1.15, up ? jy + 0.9 : jy, up ? 0 : sz], 0.03, 0.03, 4, steel, 0); b.cyl(M.gloss, [x, jy, -0.42], [x, jy, 0.42], 0.025, 0.025, 4, steel, 0); }
  for (let x = -0.5; x > -CJ; x -= 1.2) b.cyl(M.gloss, [x, jy, -0.42], [x - 1.2, jy, 0.42], 0.03, 0.03, 4, steel, 0);
  for (let k = 0; k < 3; k++) b.sbox(M.stucco, -CJ + 0.4 + k * 0.75, jy - 0.5, 0, 0.6, 1.2, 1.3, 'building', { c: mulC(conc, 0.8) });
  // apex and tie rods
  b.scyl(M.gloss, [0, 0.8, 0], [0, 5.6, 0], 0.09, 0.06, 6, steel, 'pole', 2);
  const worldTie = (a, c) => { b.cyl(M.plain, a, c, 0.03, 0.03, 4, IRON, 0); b.ccap(a, c, 0.03, 0.03, 'wire', { tag: 'tie' }); };
  worldTie([0, 5.5, 0], [JL * 0.62, jy + 0.95, 0]); worldTie([0, 5.5, 0], [-CJ, jy + 0.25, 0]);
  // trolley, cable, hook and load
  const hx = 15.5;
  b.box(M.plain, hx, jy - 0.15, 0, 1.0, 0.2, 0.9, { c: IRON });
  b.scyl(M.plain, [hx, jy - 0.2, 0], [hx, jy - 9.5, 0], 0.03, 0.03, 4, IRON, 'wire', 0, { tag: 'cable' });
  b.sbox(M.gloss, hx, jy - 9.8, 0, 0.5, 0.6, 0.3, 'prop', { c: steel });
  for (const [ox, oz] of [[0.7, 0.5], [0.7, -0.5], [-0.7, 0.5], [-0.7, -0.5]]) b.cyl(M.plain, [hx, jy - 10.1, 0], [hx + ox, jy - 11.3, oz], 0.012, 0.012, 3, IRON, 0);
  b.sbox(M.brick, hx, jy - 11.8, 0, 1.5, 1.0, 1.1, 'prop', { c: mulC(C(0xb5654a), 1.35) }, { tag: 'load' });
  b.sbox(M.wood, hx, jy - 12.36, 0, 1.6, 0.12, 1.2, 'prop', { c: C(0xc9a878) });
  S.golden.push({ pos: b.toWorld(JL + 0.2, jy + 0.95 + 0.33, 0), where: 'special', name: 'Tip of the crane' });
  S.run('special', [6, 9, 12, 15, 18].map((x) => b.toWorld(x, jy + 0.95 + 0.3, 0)), 'jib');
  S.run('special', [b.toWorld(hx, jy - 11.3 + 0.28, 0)], 'load');
  S.landmarks.crane = b.toWorld(JL * 0.5, jy + 1, 0);
  b.pop();
  b.pop();
  // site yard behind: cabin, pipes, sand, pallets
  b.sbox(M.plain, 99, 1.35, -86.5, 6.2, 2.5, 2.6, 'prop', { c: C(0xe0d8c8), ao: [0.6, 1] }, { tag: 'cabin' }); b.box(M.plain, 99, 2.64, -86.5, 6.4, 0.08, 2.8, { c: C(0x8a8f94) });
  b.fq(M.atlas, 96.6, 0.25, 97.5, 2.2, -85.19, [1, 1, 1], 1, 1, ATLAS.door[1]); b.fq(M.atlas, 99, 1.1, 100.4, 2.1, -85.19, [1, 1, 1], 1, 1, ATLAS.win[5]);
  for (let k = 0; k < 3; k++) { const px = 96 + (k % 2) * 1.15 + (k === 2 ? 0.57 : 0), py = k === 2 ? 1.55 : 0.56; b.cyl(M.stucco, [px, py, -104], [px, py, -99.5], 0.56, 0.56, 12, conc, 3); b.cyl(M.plain, [px, py, -99.49], [px, py, -99.48], 0.46, 0.46, 12, C(0x1a1a1c), 2); b.ccap([px, py, -103.5], [px, py, -100], 0.56, 0.56, 'prop', { tag: 'pipe' }); }
  b.blob(M.plain, 106, 0.2, -100, 2.6, 1.3, 2.2, C(0xd8c090), { seg: 10, rings: 5, noise: 0.08, seed: 4, top: C(0xe8d4a4), bottomAo: 0.7 });
  b.ccap([105.6, 0.0, -100], [106.4, 0.0, -100], 1.25, 1.25, 'prop', { tag: 'sand' });
  for (const [px, pz] of [[104, -90], [106, -90.3], [104.4, -92.4]]) { b.sbox(M.wood, px, 0.07, pz, 1.3, 0.14, 1.1, 'prop', { c: C(0xc9a878) }); b.sbox(M.brick, px, 0.55, pz, 1.2, 0.82, 1.0, 'prop', { c: mulC(C(0xb5654a), 1.35), ao: [0.7, 1] }); }
  S.zonesRaw.push({ center: b.toWorld(101, 0, -96), radius: 8, kind: 'shepherd', name: 'Building site yard' });
  S.landmarks.site = b.toWorld(79, 0, -81);
}

// ---------------------------------------------------------------- SW: warehouse and water tower
function waterTower(S, s, rng) {
  const b = S.b, M = S.mats;
  genericRows(S, s, rng, 93, -92);
  b.setChunk('q' + S.quadOf(b.wx(79, -78), b.wz(79, -78)));
  const st = makeStyle(S, 'apt', rng, { style: 'brick', hex: 0x8a4a3a }); st.band = true; st.sills = true;
  const rec = building(S, { x: 79.5, z: -78.5, yaw: 0, w: 23, d: 19, floors: 4, kind: 'apt', roof: 'flat', st, expL: true, expR: true, detL: true, detR: true, sideName: 'corner', row: 'warehouse', fire: true, ph: 0.8 }, rng);
  const h = rec.h;
  b.push(79.5 - 4.5, h, -78.5 + 1.5, 0.35);
  const LH = 6.2, R = 2.35, TH = 3.5, steelC = C(0x3a4a52), tankC = C(0xa8553a, 1.1);
  const legs = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
  for (const [sx, sz] of legs) b.scyl(M.metal, [sx * 2.2, 0, sz * 2.2], [sx * 1.55, LH, sz * 1.55], 0.1, 0.09, 6, steelC, 'pole', 0, { tag: 'towerLeg' });
  for (let k = 0; k < 4; k++) {
    const a = legs[[0, 1, 3, 2][k]], c = legs[[1, 3, 2, 0][k]];
    for (const [y, f] of [[2.0, 0.895], [4.1, 0.785]]) b.scyl(M.metal, [a[0] * 2.2 * f, y, a[1] * 2.2 * f], [c[0] * 2.2 * f, y, c[1] * 2.2 * f], 0.05, 0.05, 5, steelC, 'rail', 0, { tag: 'towerBrace' });
    b.scyl(M.metal, [a[0] * 2.2, 0.1, a[1] * 2.2], [c[0] * 2.2 * 0.895, 2.0, c[1] * 2.2 * 0.895], 0.03, 0.03, 4, steelC, 'rail', 0); b.scyl(M.metal, [a[0] * 2.2 * 0.895, 2.0, a[1] * 2.2 * 0.895], [c[0] * 2.2 * 0.785, 4.1, c[1] * 2.2 * 0.785], 0.03, 0.03, 4, steelC, 'rail', 0);
    b.scyl(M.metal, [a[0] * 2.2 * 0.785, 4.1, a[1] * 2.2 * 0.785], [c[0] * 1.55, LH, c[1] * 1.55], 0.03, 0.03, 4, steelC, 'rail', 0);
  }
  b.cyl(M.metal, [0, LH - 0.1, 0], [0, LH + 0.12, 0], R + 0.25, R + 0.25, 16, steelC, 3);
  b.cyl(M.gloss, [0, LH + 0.12, 0], [0, LH + 0.12 + TH, 0], R, R, 16, tankC, 0, 0.7, 1);
  for (const hy of [0.5, 1.75, 3.0]) b.cyl(M.metal, [0, LH + 0.12 + hy, 0], [0, LH + 0.24 + hy, 0], R + 0.02, R + 0.02, 16, steelC, 0);
  b.cyl(M.gloss, [0, LH + 0.12 + TH, 0], [0, LH + 0.27 + TH, 0], R + 0.14, R + 0.1, 16, mulC(tankC, 0.8), 3);
  b.cyl(M.gloss, [0, LH + 0.27 + TH, 0], [0, LH + 0.5 + TH, 0], 0.5, 0.45, 10, mulC(tankC, 0.7), 2);
  const top = LH + 0.27 + TH;
  b.ccyl(0, 0, LH - 0.1, top, R + 0.06, 'prop', { tag: 'waterTower' });
  b.cbox(0, top + 0.12, 0, 0.8, 0.24, 0.8, 'prop', null, { tag: 'waterTower' });
  // lettering band and ladder
  b.cyl(M.plain, [0, LH + 1.2, 0], [0, LH + 2.3, 0], R + 0.008, R + 0.008, 16, C(0xe8e2d0), 0);
  for (const o2 of [-0.2, 0.2]) b.scyl(M.metal, [o2, 0, 2.2 + 0.25], [o2, top + 0.8, R + 0.12], 0.025, 0.025, 4, C(0xc9ccd0), 'rail', 0, { tag: 'ladder' });
  for (let y = 0.3; y < top + 0.6; y += 0.32) { const t = y / (top + 0.8), z = 2.45 + (R + 0.12 - 2.45) * t; b.cyl(M.metal, [-0.2, y, z], [0.2, y, z], 0.014, 0.014, 4, C(0xc9ccd0), 0); }
  S.golden.push({ pos: b.toWorld(0.9, top + 0.3, -0.6), where: 'special', name: 'Roof of the water tower' });
  S.landmarks.waterTower = b.toWorld(0, top, 0);
  S.run('special', [0, 1, 2, 3].map((k) => b.toWorld(Math.cos(k * 1.2) * 1.9, top + 0.26, Math.sin(k * 1.2) * 1.9)), 'tank');
  b.pop();
  // yard: containers and crates
  const cc = [C(0x2f6a8a), C(0xb8452f), C(0x4a7a4a)];
  [[100, -93, 0.05], [100.4, -96.2, -0.03], [100.1, -94.5, 0.1]].forEach(([x, z, yaw], i) => { b.push(x, i === 2 ? 2.6 : 0, z, yaw); b.sbox(M.gloss, 0, 1.3, 0, 6.1, 2.6, 2.44, 'prop', { c: cc[i], ao: [0.65, 1] }, { tag: 'container' }); for (let k = -2.8; k < 2.9; k += 0.4) { b.box(M.gloss, k, 1.3, 1.23, 0.06, 2.5, 0.05, { c: mulC(cc[i], 0.8) }); b.box(M.gloss, k, 1.3, -1.23, 0.06, 2.5, 0.05, { c: mulC(cc[i], 0.8) }); } if (i === 2) S.run('special', [-2, 0, 2].map((k) => b.toWorld(k, 2.6 + 0.26, 0)), 'container'); b.pop(); });
  for (const [x, z, sz] of [[94, -100, 1.0], [95.2, -100.3, 0.8], [94.3, -100.1, 0.7]]) { b.push(x, sz === 0.7 ? 1.0 : 0, z, x); b.sbox(M.wood, 0, sz / 2, 0, sz, sz, sz, 'prop', { c: C(0xb89460), ao: [0.65, 1], tile: 0.9 }); b.pop(); }
  S.landmarks.warehouse = b.toWorld(79.5, h, -78.5);
}

export function buildLandmarks(S) {
  const b = S.b, fns = [cornerCafe, church, construction, waterTower];
  for (let s = 0; s < 4; s++) { b.push(0, 0, 0, SIDE_YAW[s]); fns[s](S, s, mulberry32(700 + s * 31)); b.pop(); }
}

// ---------------------------------------------------------------- backdrop beyond the playable area
export function buildBackdrop(S) {
  const b = S.b, M = S.mats, rng = mulberry32(999);
  b.setChunk('base');
  const tints = [0xb5654a, 0xc9a27e, 0xd8cbb8, 0xa8553a, 0xd9b06a, 0xb8c0b4, 0xd99a7c, 0x9a8f88, 0xc4b49c];
  const haze = C(0xf2c9a4), leaf = [C(0xd9541e), C(0xe8892b), C(0xf2b632), C(0xc23b22), C(0xb8a12e), C(0x8a9a3a)];
  const mixh = (c, t) => [c[0] + (haze[0] - c[0]) * t, c[1] + (haze[1] - c[1]) * t, c[2] + (haze[2] - c[2]) * t];
  const far = [];
  const farTree = (x, z, s) => { const w = b.toWorld(x, 0, z), c = leaf[(rng() * leaf.length) | 0], k = 0.85 + rng() * 0.3; far.push([w.x, w.z, s, c[0] * k, c[1] * k, c[2] * k]); };
  for (let s = 0; s < 4; s++) {
    b.push(0, 0, 0, SIDE_YAW[s]);
    // street just outside the playable edge, then rows of far buildings
    b.hq(M.asphalt, -124, -123.6, 142, -117.5, 0.004, C(0x8d8a88));
    for (let row = 0; row < 3; row++) {
      if (S.q < 0.4 && row === 2) continue;
      const z = row === 0 ? -124 : -128 - row * 30;
      let x = row === 0 ? -124 : -150 - row * 30 + rng() * 6;
      const xEnd = row === 0 ? 142 : 180 + row * 30;
      while (x < xEnd) {
        const w = 13 + rng() * 11, d = 14 + rng() * 6, h = (row === 0 ? 12.3 : row === 1 ? 21 : 30) + ((rng() * (row === 0 ? 3 : 5 + row * 3)) | 0) * 3;
        const cx = x + w / 2;
        if (Math.abs(Math.abs(cx) - 58) > w / 2 + 7.5) {
          const c = mixh(mulC(C(tints[(rng() * tints.length) | 0]), 1.1), 0.12 + row * 0.2);
          b.uvOx = (rng() * 4 | 0) * 3 - (cx - w / 2);
          b.box(M.far, cx, h / 2, z - d / 2, w, h, d, { c, ao: [0.72, 1], skip: 'ny py' });
          b.uvOx = 0;
          const dark = mixh(C(0x5a5048), 0.2 + row * 0.2);
          if (rng() < 0.45) { const pitch = 0.62, hd = d / 2 + 0.3, L = hd / Math.cos(pitch); for (const sg of [1, -1]) b.box(M.plain, cx, h + (hd * Math.tan(pitch)) / 2 - 0.1, z - d / 2 + sg * hd / 2, w + 0.4, 0.2, L, { c: mixh(C(rng() < 0.5 ? 0x8a4a36 : 0x56626e), 0.15 + row * 0.2), rot: [sg * pitch, 0, 0], skip: 'ny' }); for (const sx of [-1, 1]) b.tri(M.plain, [cx + sx * w / 2, h, z - d / 2 + sx * d / 2], [cx + sx * w / 2, h, z - d / 2 - sx * d / 2], [cx + sx * w / 2, h + (d / 2) * Math.tan(pitch), z - d / 2], [0, 0], [0, 0], [0, 0], mulC(c, 0.95)); }
          else { b.box(M.plain, cx, h + 0.35, z - d / 2, w + 0.3, 0.7, d + 0.3, { c: mulC(c, 0.9), skip: 'ny' }); b.hq(M.plain, cx - w / 2 + 0.3, z - d + 0.3, cx + w / 2 - 0.3, z - 0.3, h + 0.705, dark); b.box(M.plain, cx + (rng() - 0.5) * w * 0.5, h + 1.9, z - d / 2 + (rng() - 0.5) * d * 0.4, 2.6, 2.6, 2.8, { c: mulC(c, 0.85), skip: 'ny' }); if (rng() < 0.5) { const tx = cx + (rng() - 0.5) * w * 0.5, tz = z - d / 2 + (rng() - 0.5) * 4; b.cyl(M.plain, [tx, h + 2.2, tz], [tx, h + 4.4, tz], 1.1, 1.1, 8, mixh(C(0x8a5a3a), 0.2 + row * 0.2), 0); b.cyl(M.plain, [tx, h + 4.4, tz], [tx, h + 5.1, tz], 1.2, 0.1, 8, dark, 0); for (const [ox, oz] of [[0.8, 0.8], [-0.8, 0.8], [0.8, -0.8], [-0.8, -0.8]]) b.box(M.plain, tx + ox, h + 1.45, tz + oz, 0.1, 1.5, 0.1, { c: dark, skip: 'py ny' }); } }
          // a dark ground floor strip with lit shop fronts on the nearest row
          if (row === 0) { b.box(M.plain, cx, 1.6, z + 0.06, w, 3.2, 0.12, { c: mulC(c, 0.5), ao: [0.6, 1], skip: 'ny py nz' }); for (let k = 0; k < Math.floor(w / 4.5); k++) b.fq(M.atlas, cx - w / 2 + 0.8 + k * 4.5, 0.5, cx - w / 2 + 3.8 + k * 4.5, 2.7, z + 0.13, [0.8, 0.8, 0.8], 1, 1, ATLAS.shop[(rng() * 2) | 0]); }
        }
        x += w + (row === 0 ? 0 : 2 + rng() * 7);
      }
    }
    // billboard trees along the outer street, the arms and between the rows
    for (let k = 0; k < 20; k++) { const x = -118 + k * 13 + rng() * 5; if (Math.abs(Math.abs(x) - 58) < 8) continue; farTree(x, -119.2 - rng() * 1.5, 0.85 + rng() * 0.35); }
    for (let k = 0; k < 6; k++) for (const xs of [50.6, 65.4]) farTree(xs, -122 - k * 13 - rng() * 4, 0.9 + rng() * 0.3);
    for (let k = 0; k < 10; k++) farTree(-140 + k * 30 + rng() * 14, -146 - rng() * 6, 1.1 + rng() * 0.5);
    b.pop();
  }
  // instanced crossed cards
  const g = new THREE.BufferGeometry(), pos = [], uv = [], nor = [], idx = [];
  for (let i = 0; i < 3; i++) { const a = (i / 3) * Math.PI, cx = Math.cos(a) * 3.6, sz = Math.sin(a) * 3.6, k = i * 4; pos.push(-cx, 0, -sz, cx, 0, sz, cx, 8.6, sz, -cx, 8.6, -sz); uv.push(0, 0, 1, 0, 1, 1, 0, 1); nor.push(0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0); idx.push(k, k + 1, k + 2, k, k + 2, k + 3); }
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3)); g.setIndex(idx);
  const mat = cardMaterial('farTrees', farTreeTex(), 0.0); mat.alphaTest = 0.5;
  const im = new THREE.InstancedMesh(g, mat, far.length), d = new THREE.Object3D(), col = new THREE.Color();
  far.forEach((t, i) => { d.position.set(t[0], 0, t[1]); d.rotation.set(0, i * 1.3, 0); d.scale.set(t[2], t[2] * (0.9 + (i % 4) * 0.07), t[2]); d.updateMatrix(); im.setMatrixAt(i, d.matrix); im.setColorAt(i, col.setRGB(t[3], t[4], t[5])); });
  im.name = 'farTrees'; im.castShadow = false; im.receiveShadow = false; im.frustumCulled = false;
  S.group.add(im);
}
