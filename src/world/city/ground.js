// Ground: height function, park paths, the painted park ground, and the flat road / pavement network.
import * as THREE from 'three';
import { fbm2, mulberry32 } from '../../core/rng.js';
import { mk, tex } from './textures.js';
import { parkGroundMaterial } from './materials.js';
import { C } from './builder.js';

export const G = { PARK: 49, R0: 53, R1: 63, B0: 67, EDGE: 116, ROAD_Y: -0.14 };
export const SIDE_YAW = [0, -Math.PI / 2, Math.PI, Math.PI / 2];   // S, E, N, W: local +z points at the park
export const SIDE_NAME = ['S', 'E', 'N', 'W'];

const HILLS = [[0, 0, 1.3, 13], [-34, -2, 1.1, 11], [33, -4, 1.0, 11], [2, 33, 1.0, 11], [-36, -36, 1.5, 12], [35, 35, 1.2, 11], [31, -33, 0.9, 10]];
export const POND = { x: -21, z: 19, r: 8.5, level: -0.15, island: { x: -19.6, z: 18.2 } };
export const PADS = [
  { name: 'playground', x: 22, z: 21, r: 8.5 },
  { name: 'gazebo', x: -20, z: -20, r: 6 },
  { name: 'picnic', x: 21, z: -21, r: 7 },
  { name: 'pond', x: POND.x, z: POND.z, r: 11, h: 0 },
];
const sstep = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

function hillsRaw(x, z) {
  let h = 0;
  for (let i = 0; i < HILLS.length; i++) { const H = HILLS[i], dx = x - H[0], dz = z - H[1]; h += H[2] * Math.exp(-(dx * dx + dz * dz) / (H[3] * H[3])); }
  return h + (fbm2(x * 0.06 + 3.1, z * 0.06 + 8.7, 3) - 0.47) * 0.55;
}
for (const p of PADS) if (p.h === undefined) p.h = hillsRaw(p.x, p.z);

export function pondRadius(th) { return POND.r * (1 + 0.12 * Math.sin(2 * th + 0.5) + 0.08 * Math.sin(3 * th + 2) + 0.05 * Math.sin(5 * th)); }

export function groundHeight(x, z) {
  const ax = Math.abs(x), az = Math.abs(z), m = ax > az ? ax : az;
  if (m >= G.PARK) {
    // flat city; roads are sunk by the kerb height
    const dx = Math.min(ax - G.R0, G.R1 - ax), dz = Math.min(az - G.R0, G.R1 - az), d = dx > dz ? dx : dz;
    return d <= 0 ? 0 : d >= 0.1 ? G.ROAD_Y : G.ROAD_Y * (d / 0.1);
  }
  let h = hillsRaw(x, z);
  for (let i = 0; i < PADS.length; i++) {
    const p = PADS[i], d = Math.hypot(x - p.x, z - p.z);
    if (d < p.r + 5) h += (p.h - h) * (1 - sstep(p.r, p.r + 5, d));
  }
  const dx = x - POND.x, dz = z - POND.z, d = Math.hypot(dx, dz);
  if (d < POND.r * 1.4) {
    const rr = pondRadius(Math.atan2(dz, dx));
    h -= 0.6 * sstep(1.0, 0.5, d / rr);
    const ix = x - POND.island.x, iz = z - POND.island.z;
    h += 0.8 * Math.exp(-(ix * ix + iz * iz) / 1.7);
  }
  return h * sstep(47.5, 41, m);
}

// ---------------------------------------------------------------- paths
function curve(pts, closed, n) {
  const c = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(p[0], 0, p[1])), closed, 'centripetal');
  return c.getSpacedPoints(n).map((v) => [v.x, v.z]);
}
export function makePaths() {
  const loopPts = [];
  for (let i = 0; i < 24; i++) { const a = (i / 24) * Math.PI * 2, r = 39 + 1.5 * Math.sin(3 * a + 0.7) + 0.8 * Math.sin(5 * a); loopPts.push([Math.cos(a) * r, Math.sin(a) * r]); }
  const ring = []; for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2; ring.push([Math.cos(a) * 7.5, Math.sin(a) * 7.5]); }
  const pondArc = [];
  for (let i = 0; i <= 8; i++) { const a = -0.95 + (i / 8) * 2.75, r = pondRadius(a) + 2.0; pondArc.push([POND.x + Math.cos(a) * r, POND.z + Math.sin(a) * r]); }
  pondArc.push([-23.5, 33], [-24.5, 37.5]);
  return [
    { name: 'loop', w: 2.6, pts: curve(loopPts, true, 220) },
    { name: 'north', w: 2.4, pts: curve([[0, 49.6], [1.2, 42], [-2.2, 31], [-2.6, 20], [0.4, 12], [0.6, 7.4]], false, 44) },
    { name: 'south', w: 2.4, pts: curve([[0, -49.6], [-1.5, -42], [2, -31], [1.5, -20], [-0.6, -12], [-0.6, -7.4]], false, 44) },
    { name: 'west', w: 2.4, pts: curve([[-49.6, 0], [-42, -1.2], [-31, 2.2], [-20, 1.8], [-12, -0.5], [-7.4, -0.5]], false, 44) },
    { name: 'east', w: 2.4, pts: curve([[49.6, 0], [42, 1.2], [31, -2], [20, -1.6], [12, 0.6], [7.4, 0.6]], false, 44) },
    { name: 'ring', w: 2.2, pts: curve(ring, true, 50) },
    { name: 'gazebo', w: 1.8, pts: curve([[-5.3, -5.3], [-9, -11.5], [-13, -15], [-16.2, -16.6]], false, 16) },
    { name: 'playground', w: 1.8, pts: curve([[5.3, 5.3], [10, 9.5], [13.5, 14], [16.2, 16]], false, 16) },
    { name: 'pondSpur', w: 1.8, pts: curve([[-14, 1.2], [-15.6, 6.5], [-14.6, 11], [pondArc[0][0], pondArc[0][1]]], false, 14) },
    { name: 'pondArc', w: 1.8, pts: curve(pondArc, false, 36) },
    { name: 'picnic', w: 1.8, pts: curve([[16, -1.2], [16.6, -7], [17.6, -11.5], [18.4, -14.8]], false, 14) },
  ];
}
export function pathDistance(paths, x, z) {
  let best = 1e9;
  for (const p of paths) { const hw = p.w / 2; for (let i = 0; i < p.pts.length; i += 1) { const d = Math.hypot(p.pts[i][0] - x, p.pts[i][1] - z) - hw; if (d < best) best = d; } }
  return best;
}

// ---------------------------------------------------------------- painted park ground
export function buildParkGround(S) {
  const res = S.q >= 0.6 ? 2048 : 1024, c = mk(res), g = c.getContext('2d'), mres = 512, mc = mk(mres), mg = mc.getContext('2d');
  const k = res / 98, P = (x) => (x + 49) * k, km = mres / 98, PM = (x) => (x + 49) * km;
  const r = mulberry32(4242);
  // 1. grass base with broad colour variation
  { const n = 196, nc = mk(n), ng = nc.getContext('2d'), id = ng.createImageData(n, n), d = id.data;
    const A = [0x70, 0x82, 0x40], B = [0x96, 0x9c, 0x50], D = [0xb8, 0xa6, 0x5e];
    for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i += 4) {
      const wx = x / n * 98 - 49, wz = y / n * 98 - 49;
      const a = fbm2(wx * 0.05 + 11, wz * 0.05 + 5, 4), b = fbm2(wx * 0.11 + 40, wz * 0.11 + 71, 3);
      const t = Math.max(0, Math.min(1, (a - 0.3) * 2.2)), dry = Math.max(0, Math.min(1, (b - 0.56) * 4));
      for (let q = 0; q < 3; q++) d[i + q] = (A[q] + (B[q] - A[q]) * t) * (1 - dry * 0.55) + D[q] * dry * 0.55;
      d[i + 3] = 255;
    }
    ng.putImageData(id, 0, 0); g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high'; g.drawImage(nc, 0, 0, res, res); }
  mg.fillStyle = '#000'; mg.fillRect(0, 0, mres, mres);
  const circle = (ctx, kk, x, z, rad, fill) => { ctx.fillStyle = fill; ctx.beginPath(); ctx.arc((x + 49) * kk, (z + 49) * kk, rad * kk, 0, 7); ctx.fill(); };
  const soft = (x, z, rad, rgb, a0) => { const gr = g.createRadialGradient(P(x), P(z), 0, P(x), P(z), rad * k); gr.addColorStop(0, `rgba(${rgb},${a0})`); gr.addColorStop(0.55, `rgba(${rgb},${a0 * 0.7})`); gr.addColorStop(1, `rgba(${rgb},0)`); g.fillStyle = gr; g.beginPath(); g.arc(P(x), P(z), rad * k, 0, 7); g.fill(); };
  // 2. worn earth and leaf litter under the trees
  for (const t of S.treeSpecs) { if (t.type === 'street') continue; soft(t.x, t.z, 4.6 * (t.scale || 1), '96,72,44', 0.6); soft(t.x, t.z, 7.5 * (t.scale || 1), '150,96,40', 0.22); }
  // 3. clearings
  soft(21, -21, 8.5, '176,160,92', 0.5);
  circle(g, k, 22, 21, 8.9, '#8f7a52'); circle(g, k, 22, 21, 8.5, '#c7a877'); circle(mg, km, 22, 21, 8.5, '#fff');
  // 4. pond: lush rim, sand, wet sand, bed
  const pond = (s, fill) => { g.fillStyle = fill; g.beginPath(); for (let i = 0; i <= 72; i++) { const a = (i / 72) * Math.PI * 2, rr = pondRadius(a) * s; const px = P(POND.x + Math.cos(a) * rr), pz = P(POND.z + Math.sin(a) * rr); if (i) g.lineTo(px, pz); else g.moveTo(px, pz); } g.fill(); };
  g.filter = `blur(${0.5 * k}px)`; pond(1.16, 'rgba(70,104,44,0.7)'); g.filter = `blur(${0.25 * k}px)`; pond(1.03, '#a9976a'); pond(0.95, '#7b6c4a'); pond(0.86, '#465140'); pond(0.6, '#34423a'); g.filter = 'none';
  circle(g, k, POND.island.x, POND.island.z, 1.15, '#7b8a4a');
  // 5. paths
  g.lineCap = 'round'; g.lineJoin = 'round'; mg.lineCap = 'round'; mg.lineJoin = 'round';
  const stroke = (ctx, kk, p, w, style) => { ctx.strokeStyle = style; ctx.lineWidth = w * kk; ctx.beginPath(); p.pts.forEach((q, i) => { const px = (q[0] + 49) * kk, pz = (q[1] + 49) * kk; if (i) ctx.lineTo(px, pz); else ctx.moveTo(px, pz); }); ctx.stroke(); };
  g.filter = `blur(${0.12 * k}px)`;
  for (const p of S.paths) stroke(g, k, p, p.w + 0.7, 'rgba(92,84,48,0.75)');
  for (const p of S.paths) stroke(g, k, p, p.w, '#b39a70');
  for (const p of S.paths) stroke(g, k, p, p.w * 0.45, 'rgba(200,180,140,0.55)');
  g.filter = 'none';
  for (const p of S.paths) stroke(mg, km, p, p.w - 0.1, '#fff');
  // gazebo paving
  circle(g, k, -20, -20, 6.2, '#7f775f'); circle(g, k, -20, -20, 5.9, '#b9ad96'); circle(mg, km, -20, -20, 5.9, '#fff');
  g.strokeStyle = 'rgba(70,62,50,0.5)'; g.lineWidth = 0.05 * k;
  for (let rr = 1.2; rr < 5.9; rr += 1.15) { g.beginPath(); g.arc(P(-20), P(-20), rr * k, 0, 7); g.stroke(); }
  for (let i = 0; i < 24; i++) { const a = (i / 24) * 6.283; g.beginPath(); g.moveTo(P(-20 + Math.cos(a) * 1.2), P(-20 + Math.sin(a) * 1.2)); g.lineTo(P(-20 + Math.cos(a) * 5.9), P(-20 + Math.sin(a) * 5.9)); g.stroke(); }
  // flower bed soil
  for (const b of S.beds) { g.fillStyle = '#4a3828'; g.beginPath(); g.ellipse(P(b.x), P(b.z), b.rx * k, b.rz * k, 0, 0, 7); g.fill(); g.strokeStyle = '#8a7f6a'; g.lineWidth = 0.14 * k; g.stroke(); }
  // 6. fallen leaves everywhere, thick under trees
  const leafCols = ['#d9541e', '#e8892b', '#f2b632', '#c23b22', '#9c2f1f', '#b8a12e', '#a86a2a'];
  const leaf = (x, z) => { if (Math.abs(x) > 49 || Math.abs(z) > 49) return; g.fillStyle = leafCols[(r() * leafCols.length) | 0]; g.globalAlpha = 0.55 + r() * 0.4; g.beginPath(); g.ellipse(P(x), P(z), (0.05 + r() * 0.06) * k, (0.03 + r() * 0.04) * k, r() * 3, 0, 7); g.fill(); };
  for (const t of S.treeSpecs) { if (t.type === 'street') continue; const n = 520 * (t.scale || 1); for (let i = 0; i < n; i++) { const a = r() * 6.283, d = Math.pow(r(), 0.7) * 8.5 * (t.scale || 1); leaf(t.x + Math.cos(a) * d, t.z + Math.sin(a) * d); } }
  for (let i = 0; i < 9000; i++) leaf(r() * 98 - 49, r() * 98 - 49);
  g.globalAlpha = 1;

  const map = tex(c, { clamp: true, aniso: 8 }), mask = tex(mc, { clamp: true, data: true, aniso: 2 });
  const mat = parkGroundMaterial(map, mask);
  // mesh
  const N = 98, geo = new THREE.BufferGeometry(), pos = [], nor = [], uv = [], idx = [];
  for (let j = 0; j <= N; j++) for (let i = 0; i <= N; i++) {
    const x = -49 + i, z = -49 + j, y = groundHeight(x, z);
    const e = 0.5, gx = (groundHeight(x + e, z) - groundHeight(x - e, z)) / (2 * e), gz = (groundHeight(x, z + e) - groundHeight(x, z - e)) / (2 * e), il = 1 / Math.hypot(gx, 1, gz);
    pos.push(x, y, z); nor.push(-gx * il, il, -gz * il); uv.push(i / N, 1 - j / N);
  }
  for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) { const a = j * (N + 1) + i, b = a + N + 1; idx.push(a, b, a + 1, a + 1, b, b + 1); }
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3)); geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); geo.setIndex(idx);
  const mesh = new THREE.Mesh(geo, mat); mesh.name = 'parkGround'; mesh.receiveShadow = true; mesh.matrixAutoUpdate = false;
  S.group.add(mesh);
}

// ---------------------------------------------------------------- roads, kerbs, pavements (flat)
export function buildRoadNetwork(S) {
  const b = S.b, M = S.mats, FAR = 230;
  b.setChunk('base');
  const asph = C(0x8d8a88), pave = C(0xa9a196), kerb = C(0xa8a39a), paveIn = C(0xb0a797);
  // far ground under everything
  b.hq(M.asphalt, -420, -420, 420, 420, -0.3, C(0x6f6558, 1.2), 9);
  for (let s = 0; s < 4; s++) {
    b.push(0, 0, 0, SIDE_YAW[s]);
    // ring road piece plus the two arms leaving this side's corner
    b.hq(M.asphalt, -G.R0, -G.R1, G.R1, -G.R0, G.ROAD_Y, asph);
    b.hq(M.asphalt, G.R1, -G.R1, FAR, -G.R0, G.ROAD_Y, asph);
    b.hq(M.asphalt, G.R0, -FAR, G.R1, -G.R1, G.ROAD_Y, asph);
    // pavements: park side, block side, along the arms
    b.hq(M.paving, -G.PARK, -G.R0, G.R0, -G.PARK, 0, paveIn);
    b.hq(M.paving, -G.R0, -G.B0, G.R0, -G.R1, 0, pave);
    b.hq(M.paving, G.PARK, -FAR, G.R0, -G.B0, 0, pave);
    b.hq(M.paving, -G.R0, -FAR, -G.PARK, -G.B0, 0, pave);
    b.hq(M.paving, G.R1, -FAR, G.B0, -G.R1, 0, pave);
    b.hq(M.paving, G.B0, -G.B0, FAR, -G.R1, 0, pave);
    // block interiors (base slab; yards and lanes are laid on top)
    b.hq(M.paving, -G.PARK, -FAR, G.PARK, -G.B0, -0.03, C(0x8f877c));
    b.hq(M.paving, G.B0, -FAR, FAR, -G.B0, 0, C(0xa39a8e, 1.1));
    // kerbs: sloped face + top stone strip
    const kz = (x0, x1, zEdge, dir) => { // kerb along x at z = zEdge, road on the side dir (+1: road at larger z)
      b.quad(M.plain, dir > 0 ? [x1, 0, zEdge] : [x0, 0, zEdge], dir > 0 ? [x0, 0, zEdge] : [x1, 0, zEdge], dir > 0 ? [x0, G.ROAD_Y, zEdge + 0.1] : [x1, G.ROAD_Y, zEdge - 0.1], dir > 0 ? [x1, G.ROAD_Y, zEdge + 0.1] : [x0, G.ROAD_Y, zEdge - 0.1], null, kerb, 1, 0.62);
      b.hq(M.plain, x0, dir > 0 ? zEdge - 0.16 : zEdge, x1, dir > 0 ? zEdge : zEdge + 0.16, 0.004, kerb);
    };
    const kx = (z0, z1, xEdge, dir) => {
      b.quad(M.plain, dir > 0 ? [xEdge, 0, z0] : [xEdge, 0, z1], dir > 0 ? [xEdge, 0, z1] : [xEdge, 0, z0], dir > 0 ? [xEdge + 0.1, G.ROAD_Y, z1] : [xEdge - 0.1, G.ROAD_Y, z0], dir > 0 ? [xEdge + 0.1, G.ROAD_Y, z0] : [xEdge - 0.1, G.ROAD_Y, z1], null, kerb, 1, 0.62);
      b.hq(M.plain, dir > 0 ? xEdge - 0.16 : xEdge, z0, dir > 0 ? xEdge : xEdge + 0.16, z1, 0.004, kerb);
    };
    kz(-G.R0, G.R0, -G.R0, -1);       // park side kerb (road at smaller z)
    kz(-G.R0, G.R0, -G.R1, 1);        // block side kerb
    kz(G.R1, FAR, -G.R0, -1); kz(G.R1, FAR, -G.R1, 1);
    kx(-FAR, -G.R1, G.R0, 1); kx(-FAR, -G.R1, G.R1, -1);
    b.pop();
  }
}
