// The central park: trees, paths, pond, playground, bandstand, picnic area, props and ground cover.
import * as THREE from 'three';
import { mulberry32 } from '../../core/rng.js';
import { PALETTE } from '../env.js';
import { C, mulC, varyC, mixC } from './builder.js';
import { G, SIDE_YAW, POND, pondRadius, groundHeight as gh, pathDistance } from './ground.js';
import { cardMaterial } from './materials.js';
import { tuftTex, leafTex, flowerTex } from './textures.js';

const V = (x, y, z) => new THREE.Vector3(x, y, z);

export const PARK_TREES = [
  [0, 0, 'oak', 1.5, 'home'],
  [-12, -7, 'maple', 1.05], [11, -9, 'maple', 1.1], [-10.5, 8.5, 'maple', 1.0],
  [-23, -6, 'oak', 1.1], [-22, 6, 'maple', 1.0], [-34, -5, 'maple', 1.05], [-42.5, -14, 'oak', 1.0],
  [-7, -20, 'oak', 1.05], [7, -21, 'pine', 1.05], [-6, -33, 'maple', 1.1], [-13, -42.5, 'birch', 1.0],
  [21.5, -6.5, 'oak', 1.15], [23, 5.5, 'maple', 1.05], [33.5, 8, 'maple', 1.1], [42.5, 14.5, 'maple', 1.05],
  [-6, 21, 'oak', 1.1], [7, 22, 'maple', 1.05], [7, 35, 'birch', 1.0], [14, 43, 'pine', 1.1],
  [-24, 45.8, 'maple', 1.0, 'link'], [24, 45.8, 'oak', 1.0, 'link'], [45.8, 24, 'maple', 1.0, 'link'], [45.8, -24, 'oak', 1.0, 'link'],
  [24, -45.8, 'maple', 1.0, 'link'], [-24, -45.8, 'oak', 1.0, 'link'], [-45.8, -24, 'maple', 1.0, 'link'], [-45.8, 24, 'oak', 1.0, 'link'],
  [-44, -35, 'pine', 1.15], [-35, -44, 'oak', 1.05], [35, 44, 'oak', 1.1], [44, 35, 'pine', 1.2],
  [-30.5, 13.5, 'birch', 1.05], [30.5, 27.5, 'birch', 1.0], [-28, -29, 'birch', 1.0],
];

export function parkTreeSpecs(S) {
  const r = mulberry32(911);
  PARK_TREES.forEach((t, i) => {
    const jit = t[4] ? 0 : 0.7, x = t[0] + (r() - 0.5) * 2 * jit, z = t[1] + (r() - 0.5) * 2 * jit;
    S.treeSpecs.push({ x, z, y: gh(x, z), type: t[2], seed: 1000 + i * 37, scale: t[3] * (t[4] ? 1 : 0.94 + r() * 0.14), role: t[4] || 'park' });
  });
  S.beds = [
    { x: -27.6, z: -14.5, rx: 2.2, rz: 1.3 }, { x: -25.6, z: -26.8, rx: 1.4, rz: 2.2 }, { x: -13.6, z: -25.6, rx: 2.2, rz: 1.3 },
    { x: -5.2, z: -45.6, rx: 2.0, rz: 1.2 }, { x: 5.2, z: -45.6, rx: 2.0, rz: 1.2 }, { x: -5.2, z: 45.6, rx: 2.0, rz: 1.2 }, { x: 5.2, z: 45.6, rx: 2.0, rz: 1.2 },
    { x: 45.6, z: 5.2, rx: 1.2, rz: 2.0 }, { x: 45.6, z: -5.2, rx: 1.2, rz: 2.0 }, { x: -45.6, z: 5.2, rx: 1.2, rz: 2.0 }, { x: -45.6, z: -5.2, rx: 1.2, rz: 2.0 },
  ];
}

// ---------------------------------------------------------------- small props (frame origin = ground point)
function bench(S, x, z, yaw) {
  const b = S.b, M = S.mats, y = gh(x, z), wood = C(0x9a6a3c), iron = C(0x2a2c2e);
  b.push(x, y, z, yaw);
  b.sbox(M.wood, 0, 0.45, 0, 1.8, 0.07, 0.5, 'prop', { c: wood, tile: 1.1 });
  b.sbox(M.wood, 0, 0.78, -0.27, 1.8, 0.5, 0.06, 'prop', { c: wood, rot: [-0.22, 0, 0], tile: 1.1 });
  for (const sx of [-0.78, 0.78]) {
    b.box(M.plain, sx, 0.22, 0, 0.07, 0.44, 0.46, { c: iron, ao: [0.6, 1] });
    b.box(M.plain, sx, 0.64, 0.2, 0.07, 0.05, 0.1, { c: iron }); b.box(M.plain, sx, 0.55, 0.22, 0.06, 0.2, 0.05, { c: iron });
  }
  S.run('special', [b.toWorld(0, 0.74, 0.02)], 'bench');
  b.pop();
}
function bin(S, x, z) {
  const b = S.b, M = S.mats, y = gh(x, z);
  b.push(x, y, z, 0);
  b.cyl(M.plain, [0, 0, 0], [0, 0.92, 0], 0.27, 0.3, 10, C(0x2f4a3a), 2, 0.55, 1);
  b.cyl(M.plain, [0, 0.92, 0], [0, 1.0, 0], 0.32, 0.26, 10, C(0x24382c), 2);
  b.cyl(M.metal, [0, 0.62, 0], [0, 0.7, 0], 0.305, 0.31, 10, C(0xc9a24a), 0);
  b.cbox(0, 0.5, 0, 0.56, 1.0, 0.56, 'prop');
  b.pop();
}
export function lampPost(S, x, z, o = {}) {
  const b = S.b, M = S.mats, y = gh(x, z), iron = C(0x26282b), h = o.h || 4.1;
  b.push(x, y, z, 0);
  b.cyl(M.plain, [0, 0, 0], [0, 0.5, 0], 0.14, 0.1, 8, iron, 0, 0.55, 1);
  b.cyl(M.plain, [0, 0.5, 0], [0, h, 0], 0.07, 0.05, 8, iron, 0);
  b.ccap([0, 0, 0], [0, h, 0], 0.08, 0.055, 'pole');
  b.cyl(M.plain, [0, h - 0.08, 0], [0, h, 0], 0.05, 0.16, 8, iron, 0);
  // lantern
  b.box(M.glow, 0, h + 0.22, 0, 0.26, 0.4, 0.26, { c: [1, 0.86, 0.6] });
  for (const [sx, sz] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) b.box(M.plain, sx * 0.14, h + 0.22, sz * 0.14, 0.03, 0.44, 0.03, { c: iron });
  b.cyl(M.plain, [0, h + 0.44, 0], [0, h + 0.68, 0], 0.26, 0.03, 8, iron, 1);
  b.cyl(M.plain, [0, h + 0.68, 0], [0, h + 0.8, 0], 0.025, 0.025, 6, iron, 2);
  b.cbox(0, h + 0.3, 0, 0.36, 0.62, 0.36, 'prop');
  const top = b.toWorld(0, h + 0.8, 0);
  b.pop();
  S.lamps.push(top);
  return top;
}
function rock(S, x, z, r, seed, sink = 0.3) {
  const b = S.b, y = gh(x, z);
  const c = varyC(C(0x8a857c), S.rng, 0.12);
  b.blob(S.mats.plain, x, y + r * (0.55 - sink), z, r * 1.15, r * 0.75, r, c, { seg: 7, rings: 5, noise: 0.16, seed, top: mulC(c, 1.15), bottomAo: 0.5 });
  S.b.ccap([x - r * 0.25, y + r * (0.5 - sink), z], [x + r * 0.25, y + r * (0.5 - sink), z], r * 0.78, r * 0.78, 'rock');
}
function bush(S, x, z, r, col, seed) {
  const b = S.b, y = gh(x, z);
  // leafy cards poking out of a darker core
  for (let i = 0; i < 16; i++) {
    const a = i * 2.4 + seed, e = 0.25 + ((i * 5) % 7) * 0.17, d = r * 0.95 * Math.cos(e), k = 1.0 + (i % 4) * 0.12;
    S.tufts.push([x + Math.cos(a) * d, y + r * 0.62 * Math.sin(e) * 1.2, z + Math.sin(a) * d, 1.0 + (i % 3) * 0.35, Math.min(1, col[0] * 2.6 * k), Math.min(1, col[1] * 2.6 * k), Math.min(1, col[2] * 2.6 * k)]);
  }
  for (let i = 0; i < 4; i++) {
    const a = seed * 1.7 + i * 1.9, d = i ? r * 0.55 : 0, rr = r * (i ? 0.55 : 0.72);
    b.blob(S.mats.plain, x + Math.cos(a) * d, y + rr * 0.62, z + Math.sin(a) * d, rr, rr * 0.82, rr, mulC(col, 0.85 + (i % 3) * 0.12), { seg: 8, rings: 5, noise: 0.12, seed: seed + i, top: mulC(col, 1.4), bottomAo: 0.4 });
  }
}
function log(S, x, z, yaw, len, r) {
  const b = S.b, M = S.mats, y = gh(x, z), bark = C(PALETTE.bark, 1.15), cut = C(0xc9a878);
  b.push(x, y + r * 0.86, z, yaw);
  b.cyl(M.wood, [-len / 2, 0, 0], [len / 2, 0, 0], r, r * 0.86, 10, bark, 0);
  b.cyl(M.plain, [-len / 2 + 0.001, 0, 0], [-len / 2, 0, 0], r * 0.98, r * 0.98, 10, cut, 1); b.cyl(M.plain, [len / 2 - 0.001, 0, 0], [len / 2, 0, 0], r * 0.84, r * 0.84, 10, cut, 2);
  b.cyl(M.plain, [-len / 2 - 0.004, 0, 0], [-len / 2 - 0.005, 0, 0], r * 0.5, r * 0.5, 8, mulC(cut, 0.8), 1);
  b.ccap([-len / 2 + r, 0, 0], [len / 2 - r, 0, 0], r, r * 0.86, 'log');
  // a broken branch stub
  b.cyl(M.wood, [len * 0.15, r * 0.5, 0], [len * 0.22, r * 1.9, r * 0.5], r * 0.3, r * 0.2, 6, bark, 2);
  const p0 = b.toWorld(-len * 0.3, r + 0.25, 0), p1 = b.toWorld(0, r + 0.25, 0), p2 = b.toWorld(len * 0.3, r + 0.25, 0);
  b.pop();
  S.run('ground', [p0, p1, p2], 'log');
}

// ---------------------------------------------------------------- perimeter wall with four gates
function parkWall(S) {
  const b = S.b, M = S.mats, stone = C(0xb3a48c, 1.2), cap = C(0xc9bfae);
  for (let s = 0; s < 4; s++) {
    b.push(0, 0, 0, SIDE_YAW[s]);
    for (const sg of [-1, 1]) {
      const x0 = 3.85, x1 = 49.22, cx = sg * (x0 + x1) / 2, len = x1 - x0;
      b.sbox(M.stone, cx, 0.45, -49, len, 0.9, 0.45, 'wall', { c: stone, ao: [0.6, 1] });
      b.box(M.plain, cx, 0.94, -49, len, 0.09, 0.56, { c: cap });
      b.cbox(cx, 0.94, -49, len, 0.09, 0.56, 'wall');
      // gate pier
      b.sbox(M.stone, sg * 3.5, 0.85, -49, 0.72, 1.7, 0.72, 'wall', { c: stone, ao: [0.6, 1] });
      b.sbox(M.plain, sg * 3.5, 1.76, -49, 0.9, 0.12, 0.9, 'wall', { c: cap });
      b.blob(M.plain, sg * 3.5, 2.08, -49, 0.27, 0.27, 0.27, cap, { seg: 10, rings: 7, bottomAo: 0.7 });
      b.ccap([sg * 3.5, 2.07, -49], [sg * 3.5, 2.09, -49], 0.27, 0.27, 'prop');
      // acorn runs along the wall top
      const xs = sg * (12 + s * 5);
      S.run('ground', [0, 1, 2, 3].map((i) => b.toWorld(xs + sg * i * 1.6, 0.99 + 0.25, -49)), 'wall');
    }
    b.pop();
  }
}

// ---------------------------------------------------------------- pond
function pond(S) {
  const b = S.b, M = S.mats, r = mulberry32(77);
  // water surface
  const B = b.batch(M.water), c0 = B.n, n = 40;
  B.pos.push(POND.x, POND.level, POND.z); B.nor.push(0, 1, 0); B.uv.push(0.5, 0.5); B.col.push(0.75, 0.9, 0.9, 1); B.n++;
  for (let i = 0; i <= n; i++) { const a = (i / n) * Math.PI * 2, rr = pondRadius(a) * 1.0; B.pos.push(POND.x + Math.cos(a) * rr, POND.level, POND.z + Math.sin(a) * rr); B.nor.push(0, 1, 0); B.uv.push(0, 0); B.col.push(1, 1, 1, 1); B.n++; }
  for (let i = 0; i < n; i++) B.idx.push(c0, c0 + 2 + i, c0 + 1 + i);
  // rocks on the bank
  for (let i = 0; i < 13; i++) { const a = i * 0.483 + r() * 0.2, rr = pondRadius(a) * (0.93 + r() * 0.1), rad = 0.3 + r() * 0.45; rock(S, POND.x + Math.cos(a) * rr, POND.z + Math.sin(a) * rr, rad, i + 3); }
  rock(S, POND.island.x + 0.5, POND.island.z - 0.3, 0.42, 99, 0.2);
  // lily pads
  for (let i = 0; i < 16; i++) { const a = r() * 6.283, d = pondRadius(a) * (0.25 + r() * 0.5), x = POND.x + Math.cos(a) * d, z = POND.z + Math.sin(a) * d, rad = 0.22 + r() * 0.2;
    if (Math.hypot(x - POND.island.x, z - POND.island.z) < 1.6) continue;
    b.cyl(M.plain, [x, POND.level + 0.012, z], [x, POND.level + 0.02, z], rad, rad, 7, varyC(C(0x5f8a3c), r, 0.2), 2);
    if (r() < 0.3) b.blob(M.plain, x, POND.level + 0.07, z, 0.08, 0.06, 0.08, C(0xf3d6e0), { seg: 6, rings: 3 }); }
  // jetty
  const ja = -0.55, jr = pondRadius(ja), jx = POND.x + Math.cos(ja) * (jr - 0.6), jz = POND.z + Math.sin(ja) * (jr - 0.6);
  b.push(jx, 0.12, jz, Math.PI / 2 - ja);
  b.sbox(M.wood, 0, 0, -0.2, 1.5, 0.09, 4.4, 'prop', { c: C(0xa98a62), tile: 1.4 });
  for (const sx of [-0.68, 0.68]) for (const sz of [-2.2, -0.6, 1.4]) b.cyl(M.wood, [sx, -0.9, sz], [sx, 0.32, sz], 0.07, 0.07, 6, C(0x7a5c3c), 2);
  S.run('ground', [0, 1, 2].map((i) => b.toWorld(0, 0.3, -2.0 + i * 1.3)), 'jetty');
  b.pop();
  // reeds
  for (let i = 0; i < 60 * S.q + 20; i++) { const a = Math.floor(r() * 7) * 0.9 + r() * 0.45, rr = pondRadius(a) * (0.86 + r() * 0.12), x = POND.x + Math.cos(a) * rr, z = POND.z + Math.sin(a) * rr; if (Math.abs(a - (ja + 6.283)) < 0.3 || Math.abs(a - ja) < 0.3) continue; S.tufts.push([x, Math.max(gh(x, z), POND.level - 0.05), z, 1.2 + r() * 1.1, 0.5, 0.72, 0.3]); }
  S.landmarks.pond = V(POND.x, POND.level, POND.z);
  S.golden.push({ pos: V(POND.island.x - 0.25, gh(POND.island.x - 0.25, POND.island.z + 0.2) + 0.3, POND.island.z + 0.2), where: 'special', name: 'Island in the pond' });
}

// ---------------------------------------------------------------- playground
function playground(S) {
  const b = S.b, M = S.mats, y0 = gh(22, 21);
  const red = C(0xc8452f), yel = C(0xe8b030), blu = C(0x3a6f9f), steel = C(0x9aa0a4), grn = C(0x4f8f5a);
  // swing frame
  b.push(18.5, y0, 25, 0.25);
  for (const sx of [-1.7, 1.7]) for (const sz of [-1, 1]) b.scyl(M.gloss, [sx * 1.08, 0, sz], [sx, 2.4, 0], 0.05, 0.05, 6, red, 'pole', 0);
  b.scyl(M.gloss, [-1.8, 2.4, 0], [1.8, 2.4, 0], 0.055, 0.055, 6, red, 'pole', 3);
  for (const sx of [-0.75, 0.75]) {
    for (const cx of [-0.2, 0.2]) b.cyl(M.plain, [sx + cx, 2.4, 0], [sx + cx, 0.52, 0.18], 0.012, 0.012, 4, C(0x555a5e), 0);
    b.sbox(M.plain, sx, 0.5, 0.18, 0.5, 0.045, 0.2, 'prop', { c: C(0x2a2c2e) });
  }
  S.run('special', [-1.1, 0, 1.1].map((x) => b.toWorld(x, 2.4 + 0.31, 0)), 'swing');
  b.pop();
  // slide
  b.push(26.2, y0, 23.2, -0.6);
  for (const sx of [-0.5, 0.5]) for (const sz of [-0.5, 0.5]) b.scyl(M.gloss, [sx, 0, sz], [sx, 2.5, sz], 0.04, 0.04, 6, blu, 'pole', 2);
  b.sbox(M.plain, 0, 1.7, 0, 1.1, 0.07, 1.1, 'prop', { c: yel });
  for (const sx of [-0.5, 0.5]) b.scyl(M.gloss, [sx, 2.5, -0.5], [sx, 2.5, 0.5], 0.035, 0.035, 6, blu, 'rail', 0);
  // chute: from platform edge (z=0.55,y=1.7) down to (z=3.6,y=0.22)
  const dz = 3.05, dy = 1.48, L = Math.hypot(dz, dy), ang = Math.atan2(dy, dz);
  b.sbox(M.gloss, 0, 1.7 - dy / 2 - 0.02, 0.55 + dz / 2, 0.62, 0.05, L, 'prop', { c: C(0xd8dadc), rot: [ang, 0, 0] });
  for (const sx of [-0.33, 0.33]) b.box(M.gloss, sx, 1.7 - dy / 2 + 0.07, 0.55 + dz / 2, 0.05, 0.2, L, { c: red, rot: [ang, 0, 0] });
  // ladder
  for (const sx of [-0.3, 0.3]) b.scyl(M.gloss, [sx, 0, -1.35], [sx, 1.72, -0.55], 0.03, 0.03, 6, blu, 'rail', 0);
  for (let i = 1; i < 6; i++) b.cyl(M.plain, [-0.3, i * 0.287, -1.35 + i * 0.133], [0.3, i * 0.287, -1.35 + i * 0.133], 0.02, 0.02, 5, steel, 0);
  S.run('special', [b.toWorld(0, 1.99, 0), b.toWorld(0, 1.25, 1.6), b.toWorld(0, 0.62, 2.9)], 'slide');
  b.pop();
  // climbing frame
  b.push(20.2, y0, 16.6, 0.4);
  const cs = 0.8, n = 3, r = 0.035;
  for (let i = 0; i <= n; i++) for (let j = 0; j <= n; j++) {
    const x = (i - n / 2) * cs, z = (j - n / 2) * cs, top = (i === 1 || i === 2) && (j === 1 || j === 2) ? 3.2 : 2.4;
    b.scyl(M.gloss, [x, 0, z], [x, top, z], r, r, 6, (i + j) % 2 ? yel : grn, 'pole', 2);
  }
  for (let lv = 1; lv <= 3; lv++) for (let i = 0; i <= n; i++) {
    const p = (i - n / 2) * cs, e = (n / 2) * cs, y = lv * cs;
    b.scyl(M.gloss, [-e, y, p], [e, y, p], r, r, 6, lv % 2 ? red : blu, 'rail', 0);
    b.scyl(M.gloss, [p, y, -e], [p, y, e], r, r, 6, lv % 2 ? blu : red, 'rail', 0);
  }
  for (const p of [-0.4, 0.4]) { b.scyl(M.gloss, [-0.4, 3.2, p], [0.4, 3.2, p], r, r, 6, red, 'rail', 0); b.scyl(M.gloss, [p, 3.2, -0.4], [p, 3.2, 0.4], r, r, 6, red, 'rail', 0); }
  S.golden.push({ pos: b.toWorld(0, 3.2 + 0.3, -0.4), where: 'special', name: 'Top of the climbing frame' });
  S.run('special', [b.toWorld(-1.2, 2.4 + 0.29, -1.2), b.toWorld(0, 2.4 + 0.29, -1.2), b.toWorld(1.2, 2.4 + 0.29, -1.2)], 'frame');
  b.pop();
  // seesaw
  b.push(26, y0, 17, 1.1);
  b.cyl(M.plain, [0, 0, -0.2], [0, 0.5, 0], 0.05, 0.05, 6, steel, 0); b.cyl(M.plain, [0, 0, 0.2], [0, 0.5, 0], 0.05, 0.05, 6, steel, 0);
  b.sbox(M.wood, 0, 0.55, 0, 3.2, 0.06, 0.26, 'prop', { c: yel, rot: [0, 0, 0.2], tile: 1.2 });
  b.pop();
  // sandbox
  b.push(16.8, y0, 20.5, 0.15);
  for (const [x, z, sx, sz] of [[0, -1.3, 2.8, 0.2], [0, 1.3, 2.8, 0.2], [-1.3, 0, 0.2, 2.4], [1.3, 0, 0.2, 2.4]]) b.sbox(M.wood, x, 0.13, z, sx, 0.26, sz, 'prop', { c: C(0xb08a56), tile: 1.3, ao: [0.6, 1] });
  b.hq(M.plain, -1.2, -1.2, 1.2, 1.2, 0.1, C(0xc9b07a));
  b.blob(M.plain, 0.5, 0.2, 0.3, 0.16, 0.14, 0.16, red, { seg: 7, rings: 4 });
  b.pop();
  bench(S, 28.6, 26.5, -2.3); bench(S, 15.2, 26.6, 2.5); bin(S, 29.4, 24.4);
  S.landmarks.playground = V(22, y0, 21);
}

// ---------------------------------------------------------------- bandstand (cross-gabled pavilion)
function gazebo(S) {
  const b = S.b, M = S.mats, y0 = gh(-20, -20);
  const white = C(0xf1ebde), roofC = C(0x5f9a84, 1.25), wood = C(0xa07a50), trim = C(0xd8cfbe);
  b.push(-20, y0, -20, Math.PI / 4);
  const H0 = 0.45, HP = 3.1, half = 2.8;
  b.sbox(M.stone, 0, H0 / 2 - 0.1, 0, 6.2, H0 + 0.2, 6.2, 'prop', { c: C(0xb3a48c, 1.2), ao: [0.6, 1] });
  b.box(M.wood, 0, H0 + 0.02, 0, 6.3, 0.05, 6.3, { c: wood, tile: 1.6 }); b.cbox(0, H0 + 0.02, 0, 6.3, 0.05, 6.3, 'prop');
  // steps (front = +z)
  b.sbox(M.stone, 0, 0.11, 3.45, 2.4, 0.22, 0.7, 'prop', { c: C(0xb3a48c, 1.25) });
  b.sbox(M.stone, 0, 0.28, 3.25, 2.4, 0.16, 0.3, 'prop', { c: C(0xb3a48c, 1.25) });
  // posts
  const posts = [[-half, -half], [half, -half], [-half, half], [half, half], [0, -half], [-half, 0], [half, 0], [-1.15, half], [1.15, half]];
  for (const [x, z] of posts) {
    b.scyl(M.plain, [x, H0, z], [x, HP, z], 0.085, 0.07, 8, white, 'pole', 0);
    b.box(M.plain, x, H0 + 0.1, z, 0.24, 0.2, 0.24, { c: white }); b.box(M.plain, x, HP - 0.06, z, 0.22, 0.12, 0.22, { c: white });
    // brackets
    b.box(M.plain, x, HP - 0.3, z, 0.05, 0.05, 0.5, { c: white, rot: [0.7, x === 0 || Math.abs(z) < half ? Math.PI / 2 : 0, 0] });
  }
  // railings
  const rail = (x0, z0, x1, z1) => {
    b.scyl(M.plain, [x0, H0 + 0.9, z0], [x1, H0 + 0.9, z1], 0.035, 0.035, 6, white, 'rail', 0);
    b.cyl(M.plain, [x0, H0 + 0.18, z0], [x1, H0 + 0.18, z1], 0.025, 0.025, 5, white, 0);
    const n = Math.round(Math.hypot(x1 - x0, z1 - z0) / 0.26);
    for (let i = 1; i < n; i++) { const t = i / n, x = x0 + (x1 - x0) * t, z = z0 + (z1 - z0) * t; b.box(M.plain, x, H0 + 0.54, z, 0.035, 0.7, 0.035, { c: white, skip: Math.abs(x1 - x0) > 0.1 ? 'py ny px nx' : 'py ny pz nz' }); }
  };
  rail(-half, -half, half, -half); rail(-half, -half, -half, half); rail(half, -half, half, half); rail(-half, half, -1.15, half); rail(1.15, half, half, half);
  // eave beams
  for (const [x, z, sx, sz] of [[0, -half, 5.9, 0.16], [0, half, 5.9, 0.16], [-half, 0, 0.16, 5.9], [half, 0, 0.16, 5.9]]) b.box(M.plain, x, HP + 0.08, z, sx, 0.2, sz, { c: white });
  // tie beams (the golden acorn sits where they cross)
  b.scyl(M.wood, [-half, HP + 0.1, 0], [half, HP + 0.1, 0], 0.07, 0.07, 6, wood, 'rail', 0);
  b.scyl(M.wood, [0, HP + 0.1, -half], [0, HP + 0.1, half], 0.07, 0.07, 6, wood, 'rail', 0);
  S.golden.push({ pos: b.toWorld(0, HP + 0.1 + 0.07 + 0.28, 0), where: 'special', name: 'Inside the bandstand roof' });
  // cross gable roof: four thin slopes
  const W = 3.45, pitch = 0.56, rise = W * Math.tan(pitch), L = W / Math.cos(pitch), th = 0.1;
  const ey = HP + 0.18;
  const slope = (rotY, sign) => {
    // slope descending toward local +z (sign 1) or -z after rotY
    const cy = ey + rise / 2, cz = sign * W / 2;
    const o = { c: roofC, rot: [sign * pitch, rotY, 0], tile: 1.5 };
    // centre offset in the rotated frame
    const cx2 = Math.sin(rotY) * cz, cz2 = Math.cos(rotY) * cz;
    b.box(M.tiles, cx2, cy, cz2, 6.9, th, L, o); b.cbox(cx2, cy, cz2, 6.9, th, L, 'roof', o);
  };
  slope(0, 1); slope(0, -1); slope(Math.PI / 2, 1); slope(Math.PI / 2, -1);
  // ridge caps and finial
  b.box(M.plain, 0, ey + rise + 0.05, 0, 6.95, 0.1, 0.16, { c: trim }); b.box(M.plain, 0, ey + rise + 0.05, 0, 0.16, 0.1, 6.95, { c: trim });
  b.cyl(M.metal, [0, ey + rise, 0], [0, ey + rise + 0.9, 0], 0.07, 0.02, 6, C(0xc9a24a), 2);
  b.blob(M.metal, 0, ey + rise + 0.35, 0, 0.16, 0.16, 0.16, C(0xc9a24a), { seg: 8, rings: 5 });
  // barge boards on the four gable ends
  for (let k = 0; k < 4; k++) for (const sg of [-1, 1]) {
    const ry = k * Math.PI / 2, d = 3.47, lx = sg * W / 2;
    const px = Math.cos(ry) * lx + Math.sin(ry) * d, pz = -Math.sin(ry) * lx + Math.cos(ry) * d;
    b.box(M.plain, px, ey + rise / 2 - 0.04, pz, L, 0.18, 0.05, { c: white, rot: [0, ry, sg * -pitch] });
  }
  S.run('roof', [-2.4, -1.2, 1.2, 2.4].map((x) => b.toWorld(x, ey + rise + 0.1 + 0.25, 0)), 'gazebo');
  S.landmarks.gazebo = b.toWorld(0, H0, 0);
  const corners = [[W, W], [-W, W], [W, -W], [-W, -W]].map(([x, z]) => b.toWorld(x * 0.98, ey + 0.05, z * 0.98));
  b.pop();
  // four lamp posts with strings of lights to the roof corners
  corners.forEach((cn, i) => {
    const dx = cn.x + 20, dz = cn.z + 20, l = Math.hypot(dx, dz), px = -20 + (dx / l) * 9.6, pz = -20 + (dz / l) * 9.6;
    const top = lampPost(S, px, pz, { h: 3.9 });
    S.wire(V(top.x, top.y - 0.75, top.z), cn, { sag: 0.35, pieces: 4, r: 0.02, kind: 'wire', tag: 'lights', bulbs: 7, col: C(0x2a2c2e) });
  });
}

// ---------------------------------------------------------------- picnic area
function picnicTable(S, x, z, yaw) {
  const b = S.b, M = S.mats, y = gh(x, z), wood = C(0xa8825a);
  b.push(x, y, z, yaw);
  b.sbox(M.wood, 0, 0.74, 0, 1.9, 0.06, 0.8, 'prop', { c: wood, tile: 1.2 });
  for (const sz of [-0.68, 0.68]) b.sbox(M.wood, 0, 0.44, sz, 1.9, 0.05, 0.28, 'prop', { c: wood, tile: 1.2 });
  for (const sx of [-0.72, 0.72]) { b.box(M.wood, sx, 0.37, 0, 0.07, 0.74, 0.08, { c: mulC(wood, 0.8), rot: [0.75, 0, 0] }); b.box(M.wood, sx, 0.37, 0, 0.07, 0.74, 0.08, { c: mulC(wood, 0.8), rot: [-0.75, 0, 0] }); b.box(M.wood, sx, 0.4, 0, 0.06, 0.07, 1.5, { c: mulC(wood, 0.8) }); }
  S.run('special', [b.toWorld(0, 0.77 + 0.25, 0)], 'table');
  b.pop();
}
function picnic(S) {
  const b = S.b, M = S.mats;
  picnicTable(S, 18.3, -20.3, 0.3); picnicTable(S, 23.2, -18.2, -0.5); picnicTable(S, 21.6, -25.2, 1.2);
  // blanket and basket
  const bx = 25.6, bz = -22.6, by = gh(bx, bz);
  b.push(bx, by + 0.02, bz, 0.5);
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) b.hq(M.plain, -1 + i * 0.5, -1 + j * 0.5, -0.5 + i * 0.5, -0.5 + j * 0.5, 0.01 + ((i + j) % 2) * 0.001, (i + j) % 2 ? C(0xc8452f) : C(0xf1ebde));
  b.sbox(M.wood, 0.45, 0.16, 0.3, 0.5, 0.3, 0.36, 'prop', { c: C(0xb8904e), tile: 0.5 });
  b.cyl(M.wood, [0.2, 0.3, 0.3], [0.45, 0.52, 0.3], 0.02, 0.02, 4, C(0x8a6a3a), 0); b.cyl(M.wood, [0.45, 0.52, 0.3], [0.7, 0.3, 0.3], 0.02, 0.02, 4, C(0x8a6a3a), 0);
  b.pop();
  bin(S, 16.4, -23.6);
  // low dry stone wall arc
  for (let i = 0; i < 6; i++) { const a = -1.5 + i * 0.3, r = 8.6, x = 21 + Math.cos(a) * r, z = -21 + Math.sin(a) * r; b.push(x, gh(x, z), z, -a + Math.PI / 2); b.sbox(M.stone, 0, 0.3, 0, 2.7, 0.75, 0.5, 'wall', { c: C(0xa89a84, 1.2), ao: [0.6, 1], tile: 1.4 }); if (i % 2 === 0) S.run('ground', [b.toWorld(-0.7, 0.93, 0), b.toWorld(0.7, 0.93, 0)], 'drywall'); b.pop(); }
  S.landmarks.picnic = V(21, gh(21, -21), -21);
}

// ---------------------------------------------------------------- main
export function buildPark(S) {
  const b = S.b, M = S.mats, r = mulberry32(555);
  b.setChunk('park');
  parkWall(S); pond(S); playground(S); gazebo(S); picnic(S);
  // benches and lamps along the loop
  const loop = S.paths[0].pts, cross = S.paths.slice(1, 5);
  const at = (pts, i, off) => { const n = pts.length, p = pts[(i + n) % n], q = pts[(i + 1) % n], dx = q[0] - p[0], dz = q[1] - p[1], l = Math.hypot(dx, dz) || 1; return { x: p[0] - (dz / l) * off, z: p[1] + (dx / l) * off, yaw: Math.atan2(dx, dz) }; };
  for (let k = 0; k < 10; k++) {
    const i = 9 + k * 22, side = k % 2 ? 1 : -1, P = at(loop, i, side * 2.1);
    if (pathDistance(cross, P.x, P.z) < 2.5) continue;
    bench(S, P.x, P.z, P.yaw + (side > 0 ? -Math.PI / 2 : Math.PI / 2));
    if (k % 3 === 0) { const Q = at(loop, i + 3, side * 2.0); bin(S, Q.x, Q.z); }
  }
  for (let k = 0; k < 9; k++) { const i = 20 + k * 24.4 | 0, P = at(loop, i, (k % 2 ? -1 : 1) * 1.9); if (pathDistance(cross, P.x, P.z) < 2) continue; const top = lampPost(S, P.x, P.z); if (k % 2 === 0) S.run('special', [V(top.x, top.y + 0.25, top.z)], 'lamp'); }
  for (const p of cross) { const P = at(p.pts, 20, 1.8); const top = lampPost(S, P.x, P.z); S.run('special', [V(top.x, top.y + 0.25, top.z)], 'lamp'); const Q = at(p.pts, 30, -2.0); bench(S, Q.x, Q.z, Q.yaw + Math.PI / 2); }
  for (const a of [0.8, 2.4, 3.9, 5.5]) lampPost(S, Math.cos(a) * 9.2, Math.sin(a) * 9.2);
  // acorn trails along the paths
  for (const [pi, i0] of [[0, 30], [0, 96], [0, 150], [0, 204], [1, 10], [2, 26], [3, 14], [4, 28], [9, 12]]) {
    const pts = S.paths[pi].pts, run = [];
    for (let k = 0; k < 5; k++) { const p = pts[(i0 + k * 2) % pts.length]; run.push(V(p[0], gh(p[0], p[1]) + 0.25, p[1])); }
    S.run('ground', run, 'path');
  }
  // logs, stumps, rocks, bushes
  log(S, -28.5, -13, 0.5, 3.8, 0.36); log(S, 13, 29.5, 2.1, 3.2, 0.3); log(S, 33.5, -13, -0.4, 4.2, 0.38); log(S, -3.5, -27, 1.3, 2.8, 0.28); log(S, -36, 22, 0.9, 3.4, 0.33);
  for (const [x, z] of [[-30, -11], [15.5, 31], [31, -15.5], [-17, 33]]) {
    const y = gh(x, z); b.cyl(M.wood, [x, y - 0.1, z], [x, y + 0.42, z], 0.36, 0.3, 10, C(PALETTE.bark, 1.15), 0); b.cyl(M.plain, [x, y + 0.42, z], [x, y + 0.421, z], 0.3, 0.3, 10, C(0xc9a878), 2);
    b.ccap([x, y, z], [x, y + 0.14, z], 0.33, 0.3, 'log'); S.run('ground', [V(x, y + 0.42 + 0.25, z)], 'stump');
    for (let m = 0; m < 3; m++) { const a = m * 2.2 + x, mx = x + Math.cos(a) * 0.55, mz = z + Math.sin(a) * 0.55, my = gh(mx, mz); b.cyl(M.plain, [mx, my, mz], [mx, my + 0.1, mz], 0.025, 0.02, 5, C(0xf1ebde), 0); b.blob(M.plain, mx, my + 0.1, mz, 0.075, 0.05, 0.075, C(0xc8352a), { seg: 7, rings: 4 }); }
  }
  for (const [x, z, rr] of [[-38, 16, 0.6], [-39, 17.2, 0.4], [28, 33, 0.7], [9, -38, 0.5], [-16, -34, 0.55], [38, -22, 0.6], [39, -20.8, 0.35], [-3, 15, 0.4]]) rock(S, x, z, rr, x * 3 + z);
  const bushCols = [C(0x4f7a34), C(0x6a8a36), C(0xb5482a), C(0xc98a2c), C(0x3f6a3a), C(0x8a3a2a)];
  for (let s = 0; s < 4; s++) {
    b.push(0, 0, 0, SIDE_YAW[s]);
    for (let k = 0; k < 9; k++) { const x = -44 + k * 11 + (r() - 0.5) * 4; if (Math.abs(x) < 7) continue; const w = b.toWorld(x, 0, -47.6 + r() * 0.6); bush(S, w.x, w.z, 0.6 + r() * 0.35, bushCols[(r() * bushCols.length) | 0], k * 7 + s * 31); }
    for (const sg of [-1, 1]) { const w = b.toWorld(sg * 5.2, 0, -47.7); bush(S, w.x, w.z, 0.75, bushCols[s % 2 ? 2 : 0], s * 13 + sg); }
    b.pop();
  }
  for (const [x, z] of [[-25, -13], [-14, -27.5], [-27.5, -25], [12, 14], [29, 17], [-12, 26.5], [16.5, -27.5], [27.5, -15.5]]) bush(S, x, z, 0.65 + r() * 0.3, bushCols[(r() * bushCols.length) | 0], x * 5 + z);
  // leaf piles
  for (const [x, z] of [[3.5, -4.5], [-20, -9], [9, 19], [26, -2.5], [-9, -36], [40, 10], [-40, -15], [-3, 38]]) { const y = gh(x, z); b.blob(M.plain, x, y - 0.02, z, 1.1, 0.16, 0.9, C(0x8a5a2a), { seg: 9, rings: 3, noise: 0.15, seed: x + z, top: C(0xb07a30), bottomAo: 0.7 }); for (let k = 0; k < 70; k++) { const a = k * 2.4, d = 0.08 + ((k * 7) % 13) * 0.085; S.extraLeaves.push([x + Math.cos(a) * d, y + 0.15 - d * d * 0.13, z + Math.sin(a) * d * 0.82]); } }
  // home marker
  S.landmarks.home = V(S.treeSpecs[0].x, S.treeSpecs[0].y, S.treeSpecs[0].z);
}

// ---------------------------------------------------------------- instanced ground cover (grass tufts, flowers, fallen leaves)
export function buildGroundCover(S) {
  const r = mulberry32(31337), q = S.q;
  const inPond = (x, z) => { const dx = x - POND.x, dz = z - POND.z; return Math.hypot(dx, dz) < pondRadius(Math.atan2(dz, dx)) * 0.97; };
  const okGrass = (x, z) => Math.abs(x) < 48.2 && Math.abs(z) < 48.2 && pathDistance(S.paths, x, z) > 0.25 && !inPond(x, z) && Math.hypot(x - 22, z - 21) > 8.9 && Math.hypot(x + 20, z + 20) > 6.3;
  const nT = Math.round(2400 + 6000 * q);
  const greens = [[0.62, 0.86, 0.34], [0.7, 0.9, 0.36], [0.8, 0.88, 0.4], [0.55, 0.78, 0.33], [0.9, 0.88, 0.45]];
  let tries = 0;
  const parkTrees = S.treeSpecs.filter((t) => t.type !== 'street');
  while (S.tufts.length < nT && tries++ < nT * 6) {
    let x, z; const m = r();
    if (m < 0.34) { const p = S.paths[(r() * S.paths.length) | 0], pt = p.pts[(r() * p.pts.length) | 0], a = r() * 6.283, d = p.w / 2 + 0.3 + r() * r() * 2.6; x = pt[0] + Math.cos(a) * d; z = pt[1] + Math.sin(a) * d; }
    else if (m < 0.56) { const t = parkTrees[(r() * parkTrees.length) | 0], a = r() * 6.283, d = 0.6 + r() * 3.6; x = t.x + Math.cos(a) * d; z = t.z + Math.sin(a) * d; }
    else if (m < 0.68) { const s = (r() * 4) | 0, u = r() * 96 - 48, v = 47.9 - r() * r() * 2.5; [x, z] = s === 0 ? [u, v] : s === 1 ? [u, -v] : s === 2 ? [v, u] : [-v, u]; }
    else { x = r() * 96 - 48; z = r() * 96 - 48; }
    if (!okGrass(x, z)) continue;
    const c = greens[(r() * greens.length) | 0], k = 0.85 + r() * 0.4;
    S.tufts.push([x, gh(x, z), z, 0.45 + r() * r() * 0.9, c[0] * k, c[1] * k, c[2] * k]);
  }
  const quads = (w, h, n, y0 = 0) => {
    const g = new THREE.BufferGeometry(), pos = [], uv = [], nor = [], idx = [];
    for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI, c = Math.cos(a) * w / 2, s = Math.sin(a) * w / 2, k = i * 4;
      pos.push(-c, y0, -s, c, y0, s, c, y0 + h, s, -c, y0 + h, -s); uv.push(0, 0, 1, 0, 1, 1, 0, 1); nor.push(0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0); idx.push(k, k + 1, k + 2, k, k + 2, k + 3); }
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3)); g.setIndex(idx); return g;
  };
  const dummy = new THREE.Object3D(), col = new THREE.Color();
  const instanced = (name, geo, mat, items, place) => {
    // split into quadrants so they can be culled
    const buckets = [[], [], [], []];
    for (const it of items) buckets[(it[0] >= 0 ? 1 : 0) + (it[2] >= 0 ? 2 : 0)].push(it);
    buckets.forEach((list, bi) => {
      if (!list.length) return;
      const im = new THREE.InstancedMesh(geo, mat, list.length); im.name = name + bi;
      list.forEach((it, i) => { place(it, dummy, i); dummy.updateMatrix(); im.setMatrixAt(i, dummy.matrix); im.setColorAt(i, col.setRGB(it[4], it[5], it[6])); });
      im.instanceMatrix.needsUpdate = true; im.instanceColor.needsUpdate = true; im.castShadow = false; im.receiveShadow = true;
      im.computeBoundingSphere(); S.group.add(im);
    });
  };
  const tuftMat = cardMaterial('tufts', tuftTex(), 0.07); S.animated.push(tuftMat.userData.uTime);
  instanced('tufts', quads(0.56, 0.36, 2), tuftMat, S.tufts, (it, d, i) => { d.position.set(it[0], it[1] - 0.02, it[2]); d.rotation.set(0, i * 2.399, 0); d.scale.set(it[3], it[3] * (0.8 + (i % 5) * 0.1), it[3]); });
  // flowers in the beds
  const fl = [], fcols = [[1, 0.85, 0.3], [1, 0.45, 0.4], [0.95, 0.95, 0.95], [0.85, 0.5, 0.9], [1, 0.6, 0.2]];
  for (const bd of S.beds) { const n = Math.round((18 + 50 * q) * bd.rx * bd.rz / 2.6); for (let i = 0; i < n; i++) { const a = r() * 6.283, d = Math.sqrt(r()) * 0.92, x = bd.x + Math.cos(a) * bd.rx * d, z = bd.z + Math.sin(a) * bd.rz * d, c = fcols[(r() * fcols.length) | 0]; fl.push([x, gh(x, z), z, 0.7 + r() * 0.5, c[0], c[1], c[2]]); } }
  for (const f of S.flowers) fl.push(f);
  const flMat = cardMaterial('flowers', flowerTex(), 0.04); S.animated.push(flMat.userData.uTime);
  instanced('flowers', quads(0.26, 0.5, 2), flMat, fl, (it, d, i) => { d.position.set(it[0], it[1] - 0.02 * it[3], it[2]); d.rotation.set(0, i * 1.7, 0); d.scale.setScalar(it[3]); });
  // fallen leaves lying on the ground
  const lv = [], nL = Math.round(1500 + 5500 * q), lc = PALETTE.leaves.slice(0, 6).map((h) => C(h));
  const allTrees = S.treeSpecs;
  tries = 0;
  while (lv.length < nL && tries++ < nL * 4) {
    let x, z;
    if (r() < 0.75) { const t = allTrees[(r() * allTrees.length) | 0], a = r() * 6.283, d = Math.pow(r(), 0.6) * (t.type === 'street' ? 4.5 : 8) * (t.scale || 1); x = t.x + Math.cos(a) * d; z = t.z + Math.sin(a) * d; }
    else { const p = S.paths[(r() * S.paths.length) | 0], pt = p.pts[(r() * p.pts.length) | 0]; x = pt[0] + (r() - 0.5) * p.w; z = pt[1] + (r() - 0.5) * p.w; }
    if (Math.abs(x) < 49 && Math.abs(z) < 49 && inPond(x, z)) continue;
    if (Math.max(Math.abs(x), Math.abs(z)) > 66.5) continue;
    const c = lc[(r() * lc.length) | 0], k = 0.7 + r() * 0.4;
    lv.push([x, gh(x, z), z, 0.7 + r() * 0.6, c[0] * k, c[1] * k, c[2] * k]);
  }
  for (const e of S.extraLeaves) { const c = lc[(r() * lc.length) | 0]; lv.push([e[0], e[1], e[2], 1.0, c[0], c[1], c[2], 1]); }
  const lg = new THREE.PlaneGeometry(0.16, 0.16); lg.rotateX(-Math.PI / 2);
  const na = lg.getAttribute('normal'); for (let i = 0; i < na.count; i++) na.setXYZ(i, 0, 1, 0);
  const leafMat = cardMaterial('leaves', leafTex(), 0.0);
  instanced('leaves', lg, leafMat, lv, (it, d, i) => { d.position.set(it[0], it[1] + 0.012 + (i % 7) * 0.002, it[2]); const tl = it[7] ? 0.2 : 0.03; d.rotation.set((((i * 7) % 11) - 5) * tl, i * 2.1, (((i * 3) % 9) - 4) * tl); d.scale.setScalar(it[3]); });
}

// ---------------------------------------------------------------- the nest (needs the real tree)
export function buildNest(S, tree) {
  const b = S.b, M = S.mats;
  b.setChunk('park');
  const sp = tree.spec, base = sp.y || 0, want = base + tree.height * 0.62;
  // a sturdy spot close to the trunk, about two thirds up
  let best = null, bs = 1e9;
  for (const p of tree.perches) {
    const hd = Math.hypot(p.x - sp.x, p.z - sp.z), rel = (p.y - base) / tree.height;
    if (rel < 0.45 || rel > 0.8) continue;
    const sc = Math.abs(p.y - want) * 0.6 + hd * 1.6;
    if (sc < bs) { bs = sc; best = p; }
  }
  if (!best) for (const p of tree.perches) { const sc = Math.abs(p.y - want) + Math.hypot(p.x - sp.x, p.z - sp.z) * 2; if (sc < bs) { bs = sc; best = p; } }
  const p = best ? best.clone() : new THREE.Vector3(sp.x, want, sp.z);
  const R = 0.58, cy = p.y + R * 0.72;
  const twig = C(0x7a5a38), dark = C(0x4a3624), pale = C(0xa8885a);
  b.blob(M.plain, p.x, cy, p.z, R, R * 0.86, R, twig, { seg: 12, rings: 8, noise: 0.1, seed: 5, top: C(0x9a7a4a), bottomAo: 0.4 });
  const r = mulberry32(99);
  // woven twigs wrapped around the ball, a few poking out
  for (let i = 0; i < 70; i++) {
    const a = r() * 6.283, e = (r() - 0.4) * 2.0, rad = R * (0.97 + r() * 0.08), len = 0.22 + r() * 0.34;
    const dx = Math.cos(a) * Math.cos(e), dy = Math.sin(e), dz = Math.sin(a) * Math.cos(e);
    let tx = -Math.sin(a) + (r() - 0.5) * 0.9, tz = Math.cos(a) + (r() - 0.5) * 0.9, ty = (r() - 0.5) * 1.0;
    const poke = r() < 0.2 ? 0.5 : 0.06; tx += dx * poke; ty += dy * poke; tz += dz * poke;
    const ox = p.x + dx * rad, oy = cy + dy * rad * 0.86, oz = p.z + dz * rad;
    b.cyl(M.plain, [ox - tx * len, oy - ty * len, oz - tz * len], [ox + tx * len, oy + ty * len, oz + tz * len], 0.02, 0.01, 4, r() < 0.3 ? dark : r() < 0.5 ? pale : varyC(twig, r, 0.2), 0);
  }
  // dry leaves tucked in
  const lc = PALETTE.leaves.slice(0, 5).map((h) => C(h, 0.85));
  for (let i = 0; i < 34; i++) {
    const a = r() * 6.283, e = r() * 1.5 - 0.3, rad = R * 1.0, c = lc[(r() * lc.length) | 0];
    const x = p.x + Math.cos(a) * Math.cos(e) * rad, y = cy + Math.sin(e) * rad * 0.86, z = p.z + Math.sin(a) * Math.cos(e) * rad;
    b.blob(M.plain, x, y, z, 0.11, 0.025, 0.08, c, { seg: 5, rings: 2 });
  }
  // entrance hole facing the spawn side
  const ha = Math.atan2(5.6 - p.z, 5.6 - p.x);
  b.blob(M.plain, p.x + Math.cos(ha) * R * 0.86, cy + 0.04, p.z + Math.sin(ha) * R * 0.86, 0.2, 0.2, 0.2, C(0x0e0a07), { seg: 8, rings: 5, bottomAo: 1 });
  b.world.addCapsule({ x: p.x, y: cy - 0.03, z: p.z }, { x: p.x, y: cy + 0.03, z: p.z }, R * 0.9, R * 0.9, { kind: 'nest' });
  return new THREE.Vector3(p.x, cy + R * 0.86 + 0.05, p.z);
}
