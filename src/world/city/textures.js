// Procedural canvas textures for the city. Everything is generated in code.
import * as THREE from 'three';
import { mulberry32, hash2 } from '../../core/rng.js';

export function mk(w, h = w) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
const css = (r, g, b, a = 1) => `rgba(${Math.max(0, Math.min(255, r)) | 0},${Math.max(0, Math.min(255, g)) | 0},${Math.max(0, Math.min(255, b)) | 0},${a})`;
const grey = (l, a = 1) => css(255 * l, 255 * l, 255 * l, a);
const tone = (l, wr, wg, wb, a = 1) => css(255 * l * wr, 255 * l * wg, 255 * l * wb, a);

// tileable value noise, period `per` cells
function tnoise(x, y, per, seed) {
  const xi = Math.floor(x), yi = Math.floor(y); let fx = x - xi, fy = y - yi;
  fx = fx * fx * (3 - 2 * fx); fy = fy * fy * (3 - 2 * fy);
  const m = (v) => ((v % per) + per) % per;
  const a = hash2(m(xi) + seed * 131, m(yi)), b = hash2(m(xi + 1) + seed * 131, m(yi)), c = hash2(m(xi) + seed * 131, m(yi + 1)), d = hash2(m(xi + 1) + seed * 131, m(yi + 1));
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
}
function tfbm(u, v, per, seed, oct = 4) { let s = 0, a = 0.5, p = per; for (let i = 0; i < oct; i++) { s += a * tnoise(u * p, v * p, p, seed + i); p *= 2; a *= 0.5; } return s; }

export function tex(canvas, o = {}) {
  const t = new THREE.CanvasTexture(canvas);
  t.wrapS = t.wrapT = o.clamp ? THREE.ClampToEdgeWrapping : THREE.RepeatWrapping;
  t.colorSpace = o.data ? THREE.NoColorSpace : THREE.SRGBColorSpace;
  t.anisotropy = o.aniso || 4;
  return t;
}

/** Tangent-space normal map from a greyscale height canvas (tileable). */
export function normalMap(hc, strength = 2, aniso = 4) {
  const w = hc.width, h = hc.height, src = hc.getContext('2d').getImageData(0, 0, w, h).data;
  const out = mk(w, h), g = out.getContext('2d'), id = g.createImageData(w, h), d = id.data;
  const H = (x, y) => src[(((y + h) % h) * w + ((x + w) % w)) * 4] / 255;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const dx = (H(x + 1, y) - H(x - 1, y)) * strength, dy = (H(x, y + 1) - H(x, y - 1)) * strength;
    const l = 1 / Math.hypot(dx, dy, 1), i = (y * w + x) * 4;
    d[i] = (-dx * l * 0.5 + 0.5) * 255; d[i + 1] = (dy * l * 0.5 + 0.5) * 255; d[i + 2] = (l * 0.5 + 0.5) * 255; d[i + 3] = 255;
  }
  g.putImageData(id, 0, 0);
  return tex(out, { data: true, aniso });
}

// per pixel pass: f(r,g,b,a,x,y,data,i)
function pixels(g, S, f) { const id = g.getImageData(0, 0, S, S), d = id.data; for (let y = 0, i = 0; y < S; y++) for (let x = 0; x < S; x++, i += 4) f(d, i, x, y); g.putImageData(id, 0, 0); }
function grain(g, S, amt, seed, per = 0) {
  const r = mulberry32(seed);
  pixels(g, S, (d, i, x, y) => { let n = 1 + (r() - 0.5) * amt; if (per) n *= 0.9 + 0.2 * tfbm(x / S, y / S, per, seed, 3); d[i] *= n; d[i + 1] *= n; d[i + 2] *= n; });
}
function wrapDraw(S, x, y, m, fn) {
  for (let ox = -1; ox <= 1; ox++) for (let oy = -1; oy <= 1; oy++) {
    const px = x + ox * S, py = y + oy * S;
    if (px > -m && px < S + m && py > -m && py < S + m) fn(px, py);
  }
}

// ---------------------------------------------------------------- brick
export function brickTex(seed = 1) {
  const S = 512, c = mk(S), g = c.getContext('2d'), hc = mk(S), hg = hc.getContext('2d');
  hg.fillStyle = grey(0.18); hg.fillRect(0, 0, S, S);
  const rows = 24, cols = 8, bw = S / cols, bh = S / rows, mo = 2.3;
  for (let r = 0; r < rows; r++) for (let q = -1; q <= cols; q++) {
    const off = r % 2 ? 0.5 : 0, x = (q + off) * bw, y = r * bh, id = ((q % cols) + cols) % cols;
    const h1 = hash2(id + seed * 17, r), h2 = hash2(id + 91, r + seed * 5), h3 = hash2(id * 3 + 7, r * 5 + seed);
    let l = 0.6 + h1 * 0.3; if (h2 > 0.9) l *= 0.72; if (h2 < 0.07) l = 0.97;
    g.fillStyle = tone(l, 1, 0.94 + h3 * 0.1, 0.9 + h3 * 0.16);
    g.beginPath(); g.roundRect(x + mo / 2, y + mo / 2, bw - mo, bh - mo, 2.2); g.fill();
    hg.fillStyle = grey(0.72 + h3 * 0.24);
    hg.beginPath(); hg.roundRect(x + mo / 2 + 0.6, y + mo / 2 + 0.6, bw - mo - 1.2, bh - mo - 1.2, 2.4); hg.fill();
  }
  grain(g, S, 0.16, seed + 5, 4);
  grain(hg, S, 0.2, seed + 9);
  return { map: tex(c, { aniso: 8 }), normalMap: normalMap(hc, 1.6, 8), tile: 2.0 };
}

// ---------------------------------------------------------------- ashlar stone (mortar = alpha 0)
export function stoneTex(seed = 2) {
  const S = 512, c = mk(S), g = c.getContext('2d'), hc = mk(S), hg = hc.getContext('2d');
  hg.fillStyle = grey(0.15); hg.fillRect(0, 0, S, S);
  const r = mulberry32(seed), hs = [70, 58, 76, 52, 70, 58, 76, 52];
  let y = 0;
  for (let k = 0; k < hs.length; k++) {
    const ws = []; let sum = 0;
    while (sum < S) { const w = 60 + r() * 110; ws.push(w); sum += w; }
    const sc = S / sum; let x = -r() * 40;
    const x0 = x; const cols = ws.map(() => [0.76 + r() * 0.2, 0.97 + r() * 0.05, 0.93 + r() * 0.08, r()]);
    for (let pass = 0; pass < 2; pass++) { // second pass wraps
      x = x0 + pass * S;
      for (let i = 0; i < ws.length; i++) {
        const w = ws[i] * sc, cc = cols[i];
        g.fillStyle = tone(cc[0], 1, cc[1], cc[2]);
        g.beginPath(); g.roundRect(x + 2, y + 2, w - 4, hs[k] - 4, 5); g.fill();
        hg.fillStyle = grey(0.7 + cc[3] * 0.25);
        hg.beginPath(); hg.roundRect(x + 3, y + 3, w - 6, hs[k] - 6, 6); hg.fill();
        x += w;
      }
    }
    y += hs[k];
  }
  grain(g, S, 0.2, seed + 3, 8);
  grain(hg, S, 0.35, seed + 4, 16);
  return { map: tex(c, { aniso: 8 }), normalMap: normalMap(hc, 1.8, 8), tile: 2.0 };
}

// ---------------------------------------------------------------- stucco / render
export function stuccoTex(seed = 3) {
  const S = 256, c = mk(S), g = c.getContext('2d'), hc = mk(S), hg = hc.getContext('2d');
  const id = g.createImageData(S, S), d = id.data, hd = hg.createImageData(S, S), h = hd.data, r = mulberry32(seed);
  for (let y = 0, i = 0; y < S; y++) for (let x = 0; x < S; x++, i += 4) {
    const n = tfbm(x / S, y / S, 3, seed, 4), f = tfbm(x / S, y / S, 32, seed + 7, 2), sp = r();
    const l = 0.86 + (n - 0.47) * 0.22 + (f - 0.47) * 0.1 + (sp - 0.5) * 0.04;
    d[i] = 255 * l; d[i + 1] = 255 * l * 0.99; d[i + 2] = 255 * l * 0.97; d[i + 3] = 255;
    const hh = 0.5 + (f - 0.47) * 0.9 + (sp - 0.5) * 0.25; h[i] = h[i + 1] = h[i + 2] = 255 * hh; h[i + 3] = 255;
  }
  g.putImageData(id, 0, 0); hg.putImageData(hd, 0, 0);
  return { map: tex(c, { aniso: 4 }), normalMap: normalMap(hc, 1.1), tile: 2.4 };
}

// ---------------------------------------------------------------- roof tiles (v = up the slope)
export function tileTex(seed = 4) {
  const S = 512, c = mk(S), g = c.getContext('2d'), hc = mk(S), hg = hc.getContext('2d');
  g.fillStyle = grey(0.3); g.fillRect(0, 0, S, S); hg.fillStyle = grey(0.2); hg.fillRect(0, 0, S, S);
  const rows = 8, cols = 8, tw = S / cols, th = S / rows;
  for (let r = 0; r < rows; r++) for (let q = -1; q <= cols; q++) {
    const x = (q + (r % 2 ? 0.5 : 0)) * tw, y = r * th, id = ((q % cols) + cols) % cols;
    const h1 = hash2(id + seed * 3, r), h2 = hash2(id * 7 + 1, r + seed);
    let l = 0.62 + h1 * 0.3; if (h2 > 0.9) l *= 0.75;
    const gr = g.createLinearGradient(0, y, 0, y + th);
    gr.addColorStop(0, tone(l * 0.55, 1, 0.97, 0.94)); gr.addColorStop(0.25, tone(l * 0.9, 1, 0.97 + h2 * 0.05, 0.93 + h2 * 0.1)); gr.addColorStop(1, tone(Math.min(1, l * 1.1), 1, 0.97 + h2 * 0.05, 0.93 + h2 * 0.1));
    g.fillStyle = gr; g.beginPath(); g.roundRect(x + 1.2, y, tw - 2.4, th - 1, [0, 0, 9, 9]); g.fill();
    const hr = hg.createLinearGradient(0, y, 0, y + th); hr.addColorStop(0, grey(0.25)); hr.addColorStop(1, grey(0.95));
    hg.fillStyle = hr; hg.beginPath(); hg.roundRect(x + 1.5, y, tw - 3, th - 1.5, [0, 0, 9, 9]); hg.fill();
  }
  grain(g, S, 0.14, seed + 2, 6);
  return { map: tex(c, { aniso: 8 }), normalMap: normalMap(hc, 1.5, 8), tile: 2.0 };
}

// ---------------------------------------------------------------- wood planks (grain along v)
export function woodTex(seed = 5) {
  const S = 512, c = mk(S), g = c.getContext('2d'), hc = mk(S), hg = hc.getContext('2d');
  const id = g.createImageData(S, S), d = id.data, hd = hg.createImageData(S, S), h = hd.data, r = mulberry32(seed);
  const planks = 12, pw = S / planks;
  const pl = []; for (let i = 0; i < planks; i++) pl.push([0.78 + r() * 0.2, r() * 50, 0.95 + r() * 0.08]);
  for (let y = 0, i = 0; y < S; y++) for (let x = 0; x < S; x++, i += 4) {
    const p = Math.floor(x / pw), fx = (x - p * pw) / pw, P = pl[p];
    const gn = tfbm((x + P[1]) / S * 6, y / S, 6, seed + p, 3), fine = tnoise(x * 0.9 + P[1], y * 0.06, 512, seed);
    let l = P[0] * (0.84 + (gn - 0.5) * 0.3 + (fine - 0.5) * 0.14);
    const edge = Math.min(fx, 1 - fx) * pw; let hh = 0.8 + (fine - 0.5) * 0.3;
    if (edge < 1.6) { l *= 0.38; hh = 0.1; } else if (edge < 3.2) { l *= 0.8; hh = 0.55; }
    d[i] = 255 * l; d[i + 1] = 255 * l * P[2] * 0.97; d[i + 2] = 255 * l * 0.93; d[i + 3] = 255;
    h[i] = h[i + 1] = h[i + 2] = 255 * Math.max(0, Math.min(1, hh)); h[i + 3] = 255;
  }
  g.putImageData(id, 0, 0); hg.putImageData(hd, 0, 0);
  // knots
  for (let k = 0; k < 9; k++) { const x = r() * S, y = r() * S; wrapDraw(S, x, y, 20, (px, py) => { g.fillStyle = 'rgba(60,40,25,0.55)'; g.beginPath(); g.ellipse(px, py, 3 + r() * 2, 6 + r() * 4, 0, 0, 7); g.fill(); }); }
  return { map: tex(c, { aniso: 8 }), normalMap: normalMap(hc, 1.2, 8), tile: 2.0 };
}

// ---------------------------------------------------------------- paving slabs
export function pavingTex(seed = 6) {
  const S = 512, c = mk(S), g = c.getContext('2d'), hc = mk(S), hg = hc.getContext('2d');
  g.fillStyle = grey(0.42); g.fillRect(0, 0, S, S); hg.fillStyle = grey(0.2); hg.fillRect(0, 0, S, S);
  const rows = 4, cols = 3, sw = S / cols, sh = S / rows;
  for (let r = 0; r < rows; r++) for (let q = -1; q <= cols; q++) {
    const x = (q + (r % 2 ? 0.5 : 0)) * sw, y = r * sh, id = ((q % cols) + cols) % cols;
    const h1 = hash2(id + seed, r * 3), h2 = hash2(id * 5 + 2, r + seed * 3);
    const l = 0.74 + h1 * 0.2;
    g.fillStyle = tone(l, 1, 0.985 + h2 * 0.02, 0.95 + h2 * 0.06);
    g.beginPath(); g.roundRect(x + 1.6, y + 1.6, sw - 3.2, sh - 3.2, 3); g.fill();
    g.strokeStyle = grey(1, 0.12); g.lineWidth = 2; g.strokeRect(x + 4, y + 4, sw - 8, sh - 8);
    hg.fillStyle = grey(0.8 + h2 * 0.15); hg.beginPath(); hg.roundRect(x + 2.4, y + 2.4, sw - 4.8, sh - 4.8, 4); hg.fill();
  }
  const r = mulberry32(seed);
  for (let k = 0; k < 26; k++) { const x = r() * S, y = r() * S, rad = 2 + r() * 5; wrapDraw(S, x, y, 10, (px, py) => { g.fillStyle = grey(r() < 0.5 ? 0.25 : 0.95, 0.16); g.beginPath(); g.arc(px, py, rad, 0, 7); g.fill(); }); }
  grain(g, S, 0.2, seed + 1, 8);
  grain(hg, S, 0.12, seed + 2);
  return { map: tex(c, { aniso: 8 }), normalMap: normalMap(hc, 1.2, 8), tile: 2.0 };
}

// ---------------------------------------------------------------- asphalt
export function asphaltTex(seed = 7) {
  const S = 512, c = mk(S), g = c.getContext('2d'), hc = mk(S), hg = hc.getContext('2d');
  const id = g.createImageData(S, S), d = id.data, hd = hg.createImageData(S, S), h = hd.data, r = mulberry32(seed);
  for (let y = 0, i = 0; y < S; y++) for (let x = 0; x < S; x++, i += 4) {
    const n = tfbm(x / S, y / S, 4, seed, 4), sp = r();
    let l = 0.66 + (n - 0.47) * 0.3 + (sp - 0.5) * 0.2; if (sp > 0.965) l += 0.22; if (sp < 0.03) l -= 0.18;
    d[i] = 255 * l; d[i + 1] = 255 * l; d[i + 2] = 255 * l * 1.02; d[i + 3] = 255;
    const hh = 0.5 + (sp - 0.5) * 0.8; h[i] = h[i + 1] = h[i + 2] = 255 * hh; h[i + 3] = 255;
  }
  g.putImageData(id, 0, 0); hg.putImageData(hd, 0, 0);
  // cracks and tar seams
  g.lineCap = 'round';
  for (let k = 0; k < 7; k++) {
    let x = r() * S, y = r() * S, a = r() * 6.28; const n = 8 + (r() * 10 | 0);
    g.strokeStyle = grey(0.12, 0.5); g.lineWidth = 1 + r() * 1.4;
    g.beginPath(); g.moveTo(x, y);
    for (let j = 0; j < n; j++) { a += (r() - 0.5) * 1.2; x += Math.cos(a) * 14; y += Math.sin(a) * 14; g.lineTo(x, y); }
    g.stroke();
  }
  return { map: tex(c, { aniso: 8 }), normalMap: normalMap(hc, 0.9, 4), tile: 4.0 };
}

// ---------------------------------------------------------------- grass detail (neutral multiplier, 0.5 = no change)
export function grassDetailTex(seed = 8) {
  const S = 512, c = mk(S), g = c.getContext('2d'), r = mulberry32(seed);
  g.fillStyle = css(118, 124, 112); g.fillRect(0, 0, S, S);
  g.lineCap = 'round';
  for (let k = 0; k < 9000; k++) {
    const x = r() * S, y = r() * S, a = -1.57 + (r() - 0.5) * 2.2, len = 5 + r() * 12, l = 80 + r() * 110, w = 0.8 + r() * 1.2;
    const yel = r();
    const col = css(l * (0.95 + yel * 0.25), l * 1.06, l * (0.78 - yel * 0.15), 0.75);
    wrapDraw(S, x, y, 20, (px, py) => { g.strokeStyle = col; g.lineWidth = w; g.beginPath(); g.moveTo(px, py); g.quadraticCurveTo(px + Math.cos(a) * len * 0.5 + 2, py + Math.sin(a) * len * 0.5, px + Math.cos(a + 0.3) * len, py + Math.sin(a + 0.3) * len); g.stroke(); });
  }
  return tex(c, { data: true, aniso: 8 });
}
// colour version for yards and verges (tinted material)
export function grassTileTex(seed = 18) {
  const S = 256, c = mk(S), g = c.getContext('2d'), r = mulberry32(seed);
  g.fillStyle = css(170, 176, 150); g.fillRect(0, 0, S, S);
  g.lineCap = 'round';
  for (let k = 0; k < 3200; k++) {
    const x = r() * S, y = r() * S, a = -1.57 + (r() - 0.5) * 2.4, len = 4 + r() * 9, l = 130 + r() * 120, yel = r();
    const col = css(l * (0.92 + yel * 0.2), l * 1.02, l * (0.74 - yel * 0.1), 0.8);
    wrapDraw(S, x, y, 16, (px, py) => { g.strokeStyle = col; g.lineWidth = 1; g.beginPath(); g.moveTo(px, py); g.lineTo(px + Math.cos(a) * len, py + Math.sin(a) * len); g.stroke(); });
  }
  return { map: tex(c, { aniso: 8 }), tile: 1.6 };
}

// ---------------------------------------------------------------- gravel detail (neutral multiplier)
export function gravelDetailTex(seed = 9) {
  const S = 512, c = mk(S), g = c.getContext('2d'), r = mulberry32(seed);
  g.fillStyle = css(122, 120, 116); g.fillRect(0, 0, S, S);
  for (let k = 0; k < 5200; k++) {
    const x = r() * S, y = r() * S, rad = 1.2 + r() * 3.4, l = 70 + r() * 130, an = r() * 3;
    const col = css(l * 1.03, l, l * 0.94, 0.85);
    wrapDraw(S, x, y, 8, (px, py) => { g.fillStyle = col; g.beginPath(); g.ellipse(px, py, rad, rad * (0.6 + r() * 0.4), an, 0, 7); g.fill(); });
  }
  return tex(c, { data: true, aniso: 8 });
}

// ---------------------------------------------------------------- striped cloth (alpha 0 = secondary colour)
export function stripeTex() {
  const S = 64, c = mk(S), g = c.getContext('2d');
  g.clearRect(0, 0, S, S); g.fillStyle = '#fff'; g.fillRect(0, 0, S / 2, S);
  const t = tex(c, { aniso: 4 }); return { map: t, tile: 0.56 };
}

// ---------------------------------------------------------------- road paint (worn, with alpha)
export function paintTex(seed = 11) {
  const S = 128, c = mk(S), g = c.getContext('2d'), r = mulberry32(seed);
  const id = g.createImageData(S, S), d = id.data;
  for (let y = 0, i = 0; y < S; y++) for (let x = 0; x < S; x++, i += 4) {
    const n = tfbm(x / S, y / S, 6, seed, 3), sp = r();
    const l = 235 + (sp - 0.5) * 24;
    let a = 0.94; if (n < 0.36) a = 0.25 + n; if (sp > 0.93) a *= 0.5;
    d[i] = l; d[i + 1] = l; d[i + 2] = l * 0.97; d[i + 3] = 255 * a;
  }
  g.putImageData(id, 0, 0);
  return { map: tex(c, { aniso: 8 }), tile: 1.5 };
}

// ---------------------------------------------------------------- alpha cards (grass tuft, leaf, flower)
export function tuftTex(seed = 12) {
  const S = 128, c = mk(S), g = c.getContext('2d'), r = mulberry32(seed);
  g.clearRect(0, 0, S, S);
  for (let k = 0; k < 34; k++) {
    const bx = S / 2 + (r() - 0.5) * 60, tipx = bx + (r() - 0.5) * 80, h = 50 + r() * 74, w = 2.6 + r() * 3, l = 150 + r() * 90;
    const gr = g.createLinearGradient(0, S, 0, S - h);
    gr.addColorStop(0, css(l * 0.5, l * 0.66, l * 0.36)); gr.addColorStop(1, css(l * 0.86, l, l * 0.56));
    g.fillStyle = gr; g.beginPath(); g.moveTo(bx - w, S); g.quadraticCurveTo((bx + tipx) / 2 - w * 0.4, S - h * 0.6, tipx, S - h); g.quadraticCurveTo((bx + tipx) / 2 + w * 0.6, S - h * 0.5, bx + w, S); g.fill();
  }
  const t = tex(c, { clamp: true, aniso: 2 }); return t;
}
export function leafTex() {
  const S = 64, c = mk(S), g = c.getContext('2d');
  g.clearRect(0, 0, S, S);
  g.fillStyle = '#fff'; g.beginPath();
  // simple lobed leaf
  const pts = [[32, 3], [40, 14], [54, 12], [50, 26], [61, 34], [47, 40], [48, 54], [36, 48], [32, 61], [28, 48], [16, 54], [17, 40], [3, 34], [14, 26], [10, 12], [24, 14]];
  g.moveTo(pts[0][0], pts[0][1]); for (const p of pts) g.lineTo(p[0], p[1]); g.closePath(); g.fill();
  g.strokeStyle = 'rgba(120,90,60,0.6)'; g.lineWidth = 2; g.beginPath(); g.moveTo(32, 8); g.lineTo(32, 60); g.moveTo(32, 30); g.lineTo(14, 18); g.moveTo(32, 30); g.lineTo(50, 18); g.moveTo(32, 42); g.lineTo(18, 44); g.moveTo(32, 42); g.lineTo(46, 44); g.stroke();
  return tex(c, { clamp: true, aniso: 2 });
}
export function flowerTex() {
  const S = 64, c = mk(S, 128), g = c.getContext('2d');
  g.clearRect(0, 0, S, 128);
  g.strokeStyle = '#5d8a3c'; g.lineWidth = 4; g.lineCap = 'round';
  g.beginPath(); g.moveTo(32, 128); g.quadraticCurveTo(28, 90, 32, 44); g.stroke();
  g.fillStyle = '#6c9a45'; g.beginPath(); g.ellipse(22, 98, 12, 5, -0.6, 0, 7); g.fill(); g.beginPath(); g.ellipse(43, 84, 12, 5, 0.6, 0, 7); g.fill();
  g.fillStyle = '#fff';
  for (let i = 0; i < 7; i++) { const a = (i / 7) * 6.283; g.beginPath(); g.ellipse(32 + Math.cos(a) * 14, 32 + Math.sin(a) * 14, 12, 7.5, a, 0, 7); g.fill(); }
  g.fillStyle = '#ffd24a'; g.beginPath(); g.arc(32, 32, 8, 0, 7); g.fill();
  return tex(c, { clamp: true, aniso: 2 });
}

// ---------------------------------------------------------------- facade atlas: windows, doors, shop windows, signs, misc
const AS = 1024;
const R = (x, y, w, h) => { const e = 0.6; return [(x + e) / AS, 1 - (y + h - e) / AS, (x + w - e) / AS, 1 - (y + e) / AS]; };
export const ATLAS = {
  win: Array.from({ length: 8 }, (_, i) => R(i * 128, 0, 128, 256)),
  winLit: [2, 3, 5, 7], winDark: [0, 1, 4, 6],
  door: Array.from({ length: 4 }, (_, i) => R(i * 128, 256, 128, 256)),
  shop: [R(512, 256, 256, 256), R(768, 256, 256, 256)],
  sign: Array.from({ length: 8 }, (_, i) => R((i % 2) * 512, 512 + (i >> 1) * 64, 512, 64)),
  garage: R(0, 768, 256, 256), stained: R(256, 768, 128, 256), clock: R(384, 768, 256, 256),
  round: R(640, 768, 128, 128), fan: R(768, 768, 128, 128), manhole: R(896, 768, 128, 128),
  poster: R(640, 896, 128, 128), crate: R(768, 896, 128, 128), grate: R(896, 896, 128, 128),
};
export const SIGN_NAMES = ['BAKERY', 'BOOKS', 'THE ACORN CAFE', 'FLOWERS', 'GROCER', 'CYCLES', 'TEA ROOM', 'HARDWARE'];

export function atlasTex(seed = 21) {
  const c = mk(AS), g = c.getContext('2d'), ec = mk(AS), eg = ec.getContext('2d'), rc = mk(AS), rg = rc.getContext('2d');
  const r = mulberry32(seed);
  g.fillStyle = '#777'; g.fillRect(0, 0, AS, AS); eg.fillStyle = '#000'; eg.fillRect(0, 0, AS, AS); rg.fillStyle = grey(0.72); rg.fillRect(0, 0, AS, AS);
  const rough = (x, y, w, h, v) => { rg.fillStyle = css(0, 255 * v, 0); rg.fillRect(x, y, w, h); };

  // ---- windows
  const frames = ['#efe9dc', '#efe9dc', '#f3ecdf', '#e9e2d2', '#2d3a34', '#f1ebe0', '#3a3230', '#efe8da'];
  const curt = ['#d9cdb8', '#b9c4c9', '#c98f6a', '#e7dcc6', '#8fa39a', '#d6b98a', '#b3a59a', '#caa07e'];
  for (let i = 0; i < 8; i++) {
    const x = i * 128, y = 0, w = 128, h = 256, lit = ATLAS.winLit.includes(i), m = 10;
    g.fillStyle = frames[i]; g.fillRect(x, y, w, h); rough(x, y, w, h, 0.6);
    const gx = x + m, gy = y + m, gw = w - 2 * m, gh = h - 2 * m;
    const paint = (ctx, em) => {
      ctx.save(); ctx.beginPath(); ctx.rect(gx, gy, gw, gh); ctx.clip();
      if (lit) {
        const gr = ctx.createRadialGradient(gx + gw * 0.5, gy + gh * 0.55, 8, gx + gw * 0.5, gy + gh * 0.5, gh * 0.75);
        gr.addColorStop(0, em ? '#ffe9b0' : '#ffe2a0'); gr.addColorStop(0.5, em ? '#f7b458' : '#f3b25c'); gr.addColorStop(1, em ? '#b8662a' : '#c8742f');
        ctx.fillStyle = gr; ctx.fillRect(gx, gy, gw, gh);
        // interior silhouettes
        ctx.fillStyle = em ? 'rgba(70,30,10,0.75)' : 'rgba(80,40,20,0.8)';
        if (i === 3) { ctx.beginPath(); ctx.ellipse(gx + gw * 0.3, gy + gh * 0.82, 16, 22, 0, 0, 7); ctx.fill(); ctx.fillRect(gx + gw * 0.3 - 9, gy + gh * 0.88, 18, 30); }
        if (i === 7) { ctx.beginPath(); ctx.moveTo(gx + gw * 0.5, gy + gh * 0.34); ctx.lineTo(gx + gw * 0.74, gy + gh * 0.5); ctx.lineTo(gx + gw * 0.26, gy + gh * 0.5); ctx.fill(); ctx.fillRect(gx + gw * 0.48, gy + gh * 0.5, 4, gh * 0.5); }
        if (i === 5) { ctx.fillRect(gx, gy + gh * 0.7, gw, 6); ctx.fillRect(gx + gw * 0.2, gy + gh * 0.52, 14, gh * 0.2); ctx.fillRect(gx + gw * 0.6, gy + gh * 0.58, 22, gh * 0.13); }
        // warm curtains
        ctx.fillStyle = em ? 'rgba(190,90,40,0.75)' : curt[i]; ctx.globalAlpha = em ? 1 : 0.9;
        ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + gw * 0.3, gy); ctx.quadraticCurveTo(gx + gw * 0.26, gy + gh * 0.6, gx + gw * 0.1, gy + gh); ctx.lineTo(gx, gy + gh); ctx.fill();
        ctx.beginPath(); ctx.moveTo(gx + gw, gy); ctx.lineTo(gx + gw * 0.7, gy); ctx.quadraticCurveTo(gx + gw * 0.74, gy + gh * 0.6, gx + gw * 0.9, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.fill();
        ctx.globalAlpha = 1;
      } else if (!em) {
        const gr = ctx.createLinearGradient(0, gy, 0, gy + gh);
        gr.addColorStop(0, '#5f7f9a'); gr.addColorStop(0.45, '#2f4458'); gr.addColorStop(1, '#1d2a36');
        ctx.fillStyle = gr; ctx.fillRect(gx, gy, gw, gh);
        // sky reflection streaks
        ctx.fillStyle = 'rgba(255,236,205,0.16)'; ctx.beginPath(); ctx.moveTo(gx, gy + gh * 0.5); ctx.lineTo(gx + gw, gy + gh * 0.12); ctx.lineTo(gx + gw, gy + gh * 0.3); ctx.lineTo(gx, gy + gh * 0.72); ctx.fill();
        ctx.fillStyle = 'rgba(255,236,205,0.09)'; ctx.beginPath(); ctx.moveTo(gx, gy + gh * 0.8); ctx.lineTo(gx + gw, gy + gh * 0.42); ctx.lineTo(gx + gw, gy + gh * 0.48); ctx.lineTo(gx, gy + gh * 0.86); ctx.fill();
        ctx.fillStyle = curt[i]; ctx.globalAlpha = 0.85;
        if (i === 1 || i === 6) { const bh = i === 1 ? gh * 0.42 : gh * 0.68; ctx.fillRect(gx, gy, gw, bh); ctx.globalAlpha = 0.25; ctx.fillStyle = '#000'; for (let k = 0; k < bh; k += 7) ctx.fillRect(gx, gy + k, gw, 1.5); }
        else if (i === 0) { ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + gw * 0.36, gy); ctx.quadraticCurveTo(gx + gw * 0.3, gy + gh * 0.5, gx + gw * 0.08, gy + gh * 0.72); ctx.lineTo(gx, gy + gh * 0.72); ctx.fill(); ctx.beginPath(); ctx.moveTo(gx + gw, gy); ctx.lineTo(gx + gw * 0.64, gy); ctx.quadraticCurveTo(gx + gw * 0.7, gy + gh * 0.5, gx + gw * 0.92, gy + gh * 0.72); ctx.lineTo(gx + gw, gy + gh * 0.72); ctx.fill(); }
        else { ctx.globalAlpha = 0.5; ctx.fillRect(gx, gy, gw * 0.22, gh); ctx.fillRect(gx + gw * 0.78, gy, gw * 0.22, gh); }
        ctx.globalAlpha = 1;
      }
      // inner shadow from the reveal
      if (!em) {
        const sh = ctx.createLinearGradient(0, gy, 0, gy + 26); sh.addColorStop(0, 'rgba(10,10,20,0.6)'); sh.addColorStop(1, 'rgba(10,10,20,0)');
        ctx.fillStyle = sh; ctx.fillRect(gx, gy, gw, 26);
        const sl = ctx.createLinearGradient(gx, 0, gx + 14, 0); sl.addColorStop(0, 'rgba(10,10,20,0.4)'); sl.addColorStop(1, 'rgba(10,10,20,0)');
        ctx.fillStyle = sl; ctx.fillRect(gx, gy, 14, gh);
      } else if (lit) { ctx.fillStyle = 'rgba(0,0,0,0.22)'; ctx.fillRect(gx, gy, gw, gh); }
      ctx.restore();
    };
    paint(g, false); paint(eg, true);
    rough(gx, gy, gw, gh, lit ? 0.3 : 0.07);
    // glazing bars
    const bar = (bx, by, bw, bh) => { g.fillStyle = frames[i]; g.fillRect(bx, by, bw, bh); eg.fillStyle = '#000'; eg.fillRect(bx, by, bw, bh); rough(bx, by, bw, bh, 0.6); g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect(bx, by + bh, bw, 2); };
    bar(gx, y + h * 0.5 - 4, gw, 8);
    if (i % 2 === 0) bar(x + w / 2 - 3, gy, 6, gh);
    if (i === 3 || i === 5) { bar(x + w * 0.36, gy, 4, gh * 0.47); bar(x + w * 0.64 - 4, gy, 4, gh * 0.47); }
    g.strokeStyle = 'rgba(0,0,0,0.28)'; g.lineWidth = 2; g.strokeRect(gx - 1, gy - 1, gw + 2, gh + 2);
  }

  // ---- doors
  const dcol = ['#8f2f2b', '#27405a', '#2f5a42', '#3a3a3e'];
  for (let i = 0; i < 4; i++) {
    const x = i * 128, y = 256, w = 128, h = 256;
    g.fillStyle = '#ece5d6'; g.fillRect(x, y, w, h); rough(x, y, w, h, 0.55);
    // fanlight
    const lit = i === 0 || i === 2;
    const fl = (ctx, em) => { ctx.fillStyle = lit ? (em ? '#e8a550' : '#f6c170') : (em ? '#000' : '#31465a'); ctx.fillRect(x + 12, y + 10, w - 24, 40); if (!em || lit) { ctx.fillStyle = em ? '#000' : '#ece5d6'; ctx.fillRect(x + w / 2 - 2, y + 10, 4, 40); ctx.fillRect(x + w * 0.3, y + 10, 3, 40); ctx.fillRect(x + w * 0.7, y + 10, 3, 40); } };
    fl(g, false); fl(eg, true); rough(x + 12, y + 10, w - 24, 40, 0.1);
    const dx = x + 12, dy = y + 58, dw = w - 24, dh = h - 58;
    g.fillStyle = dcol[i]; g.fillRect(dx, dy, dw, dh); rough(dx, dy, dw, dh, 0.35);
    if (i === 3) { // glazed shop door
      const p = (ctx, em) => { ctx.fillStyle = em ? '#c98a44' : '#e9c17a'; ctx.fillRect(dx + 12, dy + 12, dw - 24, dh * 0.62); if (!em) { ctx.fillStyle = 'rgba(40,30,20,0.5)'; ctx.fillRect(dx + 12, dy + dh * 0.45, dw - 24, dh * 0.2); } };
      p(g, false); p(eg, true); rough(dx + 12, dy + 12, dw - 24, dh * 0.62, 0.1);
    } else {
      const pan = (px, py, pw, ph) => { g.fillStyle = 'rgba(0,0,0,0.28)'; g.fillRect(px, py, pw, ph); g.fillStyle = dcol[i]; g.fillRect(px + 3, py + 4, pw - 5, ph - 6); g.fillStyle = 'rgba(255,255,255,0.12)'; g.fillRect(px + 3, py + ph - 4, pw - 5, 2); };
      pan(dx + 10, dy + 10, dw / 2 - 15, 70); pan(dx + dw / 2 + 5, dy + 10, dw / 2 - 15, 70);
      pan(dx + 10, dy + 90, dw / 2 - 15, 50); pan(dx + dw / 2 + 5, dy + 90, dw / 2 - 15, 50);
      pan(dx + 10, dy + 150, dw / 2 - 15, 40); pan(dx + dw / 2 + 5, dy + 150, dw / 2 - 15, 40);
      g.fillStyle = '#c9a24a'; g.fillRect(dx + dw / 2 - 16, dy + 84, 32, 5);
    }
    g.fillStyle = '#d8b455'; g.beginPath(); g.arc(dx + dw - 14, dy + dh * 0.52, 5, 0, 7); g.fill();
    g.strokeStyle = 'rgba(0,0,0,0.35)'; g.lineWidth = 2; g.strokeRect(dx, dy, dw, dh);
  }

  // ---- shop windows
  for (let i = 0; i < 2; i++) {
    const x = 512 + i * 256, y = 256, w = 256, h = 256;
    g.fillStyle = i ? '#2c3a36' : '#3a2f2a'; g.fillRect(x, y, w, h); rough(x, y, w, h, 0.5);
    const gx = x + 9, gy = y + 9, gw = w - 18, gh = h - 30;
    const p = (ctx, em) => {
      const gr = ctx.createLinearGradient(0, gy, 0, gy + gh);
      if (i === 0) { gr.addColorStop(0, em ? '#b56a2a' : '#d98a40'); gr.addColorStop(0.5, em ? '#f0b660' : '#ffd590'); gr.addColorStop(1, em ? '#8a4a20' : '#a8612c'); }
      else { gr.addColorStop(0, em ? '#7a8a80' : '#9db0a4'); gr.addColorStop(0.5, em ? '#d8d6b8' : '#f1ecd2'); gr.addColorStop(1, em ? '#5a6258' : '#74806f'); }
      ctx.fillStyle = gr; ctx.fillRect(gx, gy, gw, gh);
      // shelves and goods
      const rr = mulberry32(77 + i);
      for (let s = 0; s < 3; s++) {
        const sy = gy + gh * (0.42 + s * 0.2);
        ctx.fillStyle = em ? 'rgba(40,20,10,0.6)' : 'rgba(60,35,20,0.85)'; ctx.fillRect(gx, sy, gw, 5);
        for (let k = 0; k < 9; k++) {
          const bx = gx + 8 + k * (gw - 16) / 9, bw = 12 + rr() * 12, bh = 10 + rr() * 22;
          const cols = i === 0 ? ['#c98a3c', '#e2b062', '#a8652c', '#f0d08a'] : ['#b8443a', '#3f6f8f', '#e0b040', '#5f8f5a', '#e8e2d2'];
          ctx.fillStyle = cols[(rr() * cols.length) | 0]; if (em) ctx.globalAlpha = 0.6;
          if (i === 0) { ctx.beginPath(); ctx.ellipse(bx + bw / 2, sy - bh * 0.35, bw * 0.6, bh * 0.4, 0, 0, 7); ctx.fill(); } else ctx.fillRect(bx, sy - bh, bw * 0.8, bh);
          ctx.globalAlpha = 1;
        }
      }
      if (!em) { ctx.fillStyle = 'rgba(255,240,215,0.13)'; ctx.beginPath(); ctx.moveTo(gx, gy + gh * 0.6); ctx.lineTo(gx + gw * 0.7, gy); ctx.lineTo(gx + gw, gy); ctx.lineTo(gx, gy + gh * 0.95); ctx.fill();
        const sh = ctx.createLinearGradient(0, gy, 0, gy + 30); sh.addColorStop(0, 'rgba(10,10,20,0.55)'); sh.addColorStop(1, 'rgba(10,10,20,0)'); ctx.fillStyle = sh; ctx.fillRect(gx, gy, gw, 30); }
      else { ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(gx, gy, gw, gh); }
    };
    p(g, false); p(eg, true); rough(gx, gy, gw, gh, 0.08);
  }

  // ---- signs
  const sbg = ['#2f4a3a', '#7a2f2a', '#27405a', '#e6d8b8', '#3a3230', '#c9a24a', '#5a3a4a', '#2f3a4a'];
  const sfg = ['#f0e2b8', '#f3e6c8', '#f0d890', '#5a2f2a', '#e8c878', '#2a2622', '#f0dcc0', '#e8e2d0'];
  for (let i = 0; i < 8; i++) {
    const x = (i % 2) * 512, y = 512 + (i >> 1) * 64;
    g.fillStyle = sbg[i]; g.fillRect(x, y, 512, 64); rough(x, y, 512, 64, 0.45);
    g.strokeStyle = sfg[i]; g.globalAlpha = 0.7; g.lineWidth = 2; g.strokeRect(x + 6, y + 6, 500, 52); g.globalAlpha = 1;
    g.fillStyle = sfg[i]; g.font = 'bold 36px Georgia, "Times New Roman", serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    const name = SIGN_NAMES[i]; g.fillText(name.split('').join(' '), x + 256, y + 34, 470);
  }

  // ---- garage door
  { const x = 0, y = 768; g.fillStyle = '#6f756f'; g.fillRect(x, y, 256, 256); rough(x, y, 256, 256, 0.5);
    for (let k = 0; k < 256; k += 16) { g.fillStyle = 'rgba(0,0,0,0.3)'; g.fillRect(x, y + k, 256, 3); g.fillStyle = 'rgba(255,255,255,0.12)'; g.fillRect(x, y + k + 3, 256, 2); }
    g.fillStyle = 'rgba(90,50,30,0.25)'; for (let k = 0; k < 12; k++) g.fillRect(x + r() * 250, y + 150 + r() * 100, 3 + r() * 4, 20 + r() * 60); }
  // ---- stained glass (pointed arch)
  { const x = 256, y = 768, w = 128, h = 256;
    g.fillStyle = '#8a8478'; g.fillRect(x, y, w, h);
    const path = (ctx) => { ctx.beginPath(); ctx.moveTo(x + 14, y + h - 10); ctx.lineTo(x + 14, y + 96); ctx.quadraticCurveTo(x + 16, y + 30, x + w / 2, y + 10); ctx.quadraticCurveTo(x + w - 16, y + 30, x + w - 14, y + 96); ctx.lineTo(x + w - 14, y + h - 10); ctx.closePath(); };
    const cols = ['#d94a3a', '#e8a030', '#3f7fbf', '#4f9f6a', '#f0d060', '#8a4fa0', '#e87850'];
    for (const [ctx, em] of [[g, 0], [eg, 1]]) { ctx.save(); path(ctx); ctx.clip();
      const rr = mulberry32(5);
      for (let yy = 0; yy < h; yy += 22) for (let xx = 0; xx < w; xx += 19) { ctx.fillStyle = cols[(rr() * cols.length) | 0]; ctx.globalAlpha = em ? 0.75 : 1; ctx.fillRect(x + xx + (((yy / 22) | 0) % 2) * 9 - 9, y + yy, 18, 21); }
      ctx.globalAlpha = 1; ctx.strokeStyle = em ? '#000' : '#2a2620'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + w / 2, y); ctx.lineTo(x + w / 2, y + h); ctx.stroke();
      ctx.restore(); }
    g.strokeStyle = '#3a342c'; g.lineWidth = 4; path(g); g.stroke(); rough(x + 14, y + 20, w - 28, h - 30, 0.15); }
  // ---- clock face
  { const x = 384, y = 768, cx = x + 128, cy = y + 128;
    g.fillStyle = '#8a8478'; g.fillRect(x, y, 256, 256);
    for (const [ctx, em] of [[g, 0], [eg, 1]]) {
      ctx.fillStyle = em ? '#8a7a50' : '#f3ead2'; ctx.beginPath(); ctx.arc(cx, cy, 112, 0, 7); ctx.fill();
      ctx.strokeStyle = em ? '#000' : '#2a2620'; ctx.lineWidth = 9; ctx.beginPath(); ctx.arc(cx, cy, 112, 0, 7); ctx.stroke();
      ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cy, 86, 0, 7); ctx.stroke();
      for (let k = 0; k < 12; k++) { const a = (k / 12) * 6.283; ctx.lineWidth = k % 3 === 0 ? 9 : 5; ctx.beginPath(); ctx.moveTo(cx + Math.sin(a) * 90, cy - Math.cos(a) * 90); ctx.lineTo(cx + Math.sin(a) * 104, cy - Math.cos(a) * 104); ctx.stroke(); }
      const hand = (a, len, wd) => { ctx.lineWidth = wd; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx - Math.sin(a) * 12, cy + Math.cos(a) * 12); ctx.lineTo(cx + Math.sin(a) * len, cy - Math.cos(a) * len); ctx.stroke(); };
      hand((4.7 / 12) * 6.283, 56, 10); hand((42 / 60) * 6.283, 84, 6);
      ctx.fillStyle = em ? '#000' : '#2a2620'; ctx.beginPath(); ctx.arc(cx, cy, 9, 0, 7); ctx.fill();
    } }
  // ---- round window
  { const x = 640, y = 768, cx = x + 64, cy = y + 64; g.fillStyle = '#efe9dc'; g.fillRect(x, y, 128, 128);
    for (const [ctx, em] of [[g, 0], [eg, 1]]) { ctx.fillStyle = em ? '#d9963f' : '#f6c26a'; ctx.beginPath(); ctx.arc(cx, cy, 50, 0, 7); ctx.fill(); ctx.strokeStyle = em ? '#000' : '#efe9dc'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(cx - 50, cy); ctx.lineTo(cx + 50, cy); ctx.moveTo(cx, cy - 50); ctx.lineTo(cx, cy + 50); ctx.stroke(); }
    g.strokeStyle = 'rgba(0,0,0,0.3)'; g.lineWidth = 2; g.beginPath(); g.arc(cx, cy, 51, 0, 7); g.stroke(); rough(x + 14, y + 14, 100, 100, 0.2); }
  // ---- fan grille
  { const x = 768, y = 768, cx = x + 64, cy = y + 64; g.fillStyle = '#c9cbc6'; g.fillRect(x, y, 128, 128); rough(x, y, 128, 128, 0.4);
    g.fillStyle = '#26282a'; g.beginPath(); g.arc(cx, cy, 52, 0, 7); g.fill();
    g.strokeStyle = '#9a9c98'; g.lineWidth = 2; for (let k = 10; k < 52; k += 8) { g.beginPath(); g.arc(cx, cy, k, 0, 7); g.stroke(); }
    for (let k = 0; k < 6; k++) { const a = k * 1.047; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.cos(a) * 52, cy + Math.sin(a) * 52); g.stroke(); }
    g.fillStyle = '#9a9c98'; g.beginPath(); g.arc(cx, cy, 8, 0, 7); g.fill(); }
  // ---- manhole
  { const x = 896, y = 768, cx = x + 64, cy = y + 64; g.fillStyle = '#56585c'; g.fillRect(x, y, 128, 128);
    g.fillStyle = '#3a3c40'; g.beginPath(); g.arc(cx, cy, 58, 0, 7); g.fill(); g.strokeStyle = '#6a6c70'; g.lineWidth = 3;
    for (let k = -50; k <= 50; k += 12) { g.beginPath(); g.moveTo(cx + k, cy - 44); g.lineTo(cx + k, cy + 44); g.stroke(); g.beginPath(); g.moveTo(cx - 44, cy + k); g.lineTo(cx + 44, cy + k); g.stroke(); }
    g.beginPath(); g.arc(cx, cy, 56, 0, 7); g.stroke(); }
  // ---- poster
  { const x = 640, y = 896; g.fillStyle = '#e8dcc0'; g.fillRect(x, y, 128, 128); g.fillStyle = '#c9542a'; g.fillRect(x + 8, y + 8, 112, 60); g.fillStyle = '#f2b632'; g.beginPath(); g.arc(x + 64, y + 44, 22, 0, 7); g.fill();
    g.fillStyle = '#3a3230'; g.font = 'bold 17px Georgia, serif'; g.textAlign = 'center'; g.fillText('AUTUMN FAIR', x + 64, y + 90); g.font = 'bold 12px Georgia, serif'; g.fillText('IN THE PARK', x + 64, y + 110); rough(x, y, 128, 128, 0.7); }
  // ---- crate
  { const x = 768, y = 896; g.fillStyle = '#b08a56'; g.fillRect(x, y, 128, 128); g.strokeStyle = '#6a4a2a'; g.lineWidth = 5; g.strokeRect(x + 4, y + 4, 120, 120); for (let k = 1; k < 4; k++) { g.lineWidth = 2; g.beginPath(); g.moveTo(x, y + k * 32); g.lineTo(x + 128, y + k * 32); g.stroke(); } g.lineWidth = 5; g.beginPath(); g.moveTo(x + 4, y + 4); g.lineTo(x + 124, y + 124); g.stroke(); rough(x, y, 128, 128, 0.8); }
  // ---- grate
  { const x = 896, y = 896; g.fillStyle = '#3c3e42'; g.fillRect(x, y, 128, 128); g.fillStyle = '#1c1d20'; for (let k = 10; k < 120; k += 14) g.fillRect(x + 12, y + k, 104, 7); g.strokeStyle = '#5a5c60'; g.lineWidth = 4; g.strokeRect(x + 4, y + 4, 120, 120); rough(x, y, 128, 128, 0.45); }

  const map = tex(c, { clamp: true, aniso: 8 }), emissiveMap = tex(ec, { clamp: true, aniso: 4 }), roughnessMap = tex(rc, { clamp: true, data: true, aniso: 4 });
  return { map, emissiveMap, roughnessMap };
}

// far-building facade (floors of 3 m, bays of 3 m; tile = 12 m) for the backdrop
export function backdropTex(seed = 31) {
  const S = 256, c = mk(S), g = c.getContext('2d'), ec = mk(S), eg = ec.getContext('2d'), r = mulberry32(seed);
  g.fillStyle = '#d6cfc4'; g.fillRect(0, 0, S, S); eg.fillStyle = '#000'; eg.fillRect(0, 0, S, S);
  for (let y = 0; y < 4; y++) {
    g.fillStyle = 'rgba(255,255,255,0.22)'; g.fillRect(0, y * 64, S, 5); g.fillStyle = 'rgba(0,0,0,0.16)'; g.fillRect(0, y * 64 + 5, S, 3);
    for (let x = 0; x < 4; x++) {
      const lit = r() < 0.14, px = x * 64 + 19, py = y * 64 + 16;
      g.fillStyle = '#efe9de'; g.fillRect(px - 3, py - 3, 32, 44);
      const gr = g.createLinearGradient(0, py, 0, py + 38);
      if (lit) { gr.addColorStop(0, '#f2cf96'); gr.addColorStop(1, '#d89a50'); } else { gr.addColorStop(0, '#7f93a6'); gr.addColorStop(1, '#4c5c6c'); }
      g.fillStyle = gr; g.fillRect(px, py, 26, 38);
      g.fillStyle = '#efe9de'; g.fillRect(px, py + 18, 26, 2); g.fillRect(px + 12, py, 2, 38);
      g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect(px - 5, py + 41, 36, 3);
      if (!lit && r() < 0.4) { g.fillStyle = 'rgba(230,220,200,0.5)'; g.fillRect(px, py, 26, 8 + r() * 12); }
      if (lit) { eg.fillStyle = '#7a4e22'; eg.fillRect(px, py, 26, 38); }
    }
  }
  grain(g, S, 0.1, seed + 1, 4);
  return { map: tex(c, { aniso: 4 }), emissiveMap: tex(ec, { aniso: 2 }), tile: 12 };
}

// billboard tree for the backdrop (crossed cards)
export function farTreeTex(seed = 41) {
  const S = 256, c = mk(S), g = c.getContext('2d'), r = mulberry32(seed);
  g.clearRect(0, 0, S, S);
  g.strokeStyle = '#4a3b30'; g.lineCap = 'round';
  g.lineWidth = 11; g.beginPath(); g.moveTo(128, 256); g.lineTo(127, 150); g.stroke();
  g.lineWidth = 6; for (const [x, y] of [[80, 110], [170, 100], [128, 80], [100, 140], [160, 140]]) { g.beginPath(); g.moveTo(127, 170); g.quadraticCurveTo((127 + x) / 2, 150, x, y); g.stroke(); }
  const blobs = [[128, 92, 62], [78, 118, 44], [178, 112, 46], [106, 62, 40], [156, 58, 40], [128, 132, 50]];
  for (let k = 0; k < 1500; k++) {
    const bl = blobs[(r() * blobs.length) | 0], a = r() * 6.283, d = Math.sqrt(r()) * bl[2], x = bl[0] + Math.cos(a) * d, y = bl[1] + Math.sin(a) * d * 0.9;
    const light = 0.55 + 0.45 * Math.min(1, Math.max(0, (150 - y) / 120 + (r() - 0.5) * 0.5)), l = 255 * light;
    g.fillStyle = css(l, l * (0.93 + r() * 0.07), l * (0.86 + r() * 0.1)); g.beginPath(); g.ellipse(x, y, 4 + r() * 5, 3 + r() * 3.5, r() * 3, 0, 7); g.fill();
  }
  return tex(c, { clamp: true, aniso: 4 });
}
