// All game sound, synthesised with the Web Audio API. No files, no network, no libraries.
//
//   createAudio()            -> the live audio object used by the game (see the bottom of this file)
//   createEngine(ctx, opts)  -> the graph builder. Works on an AudioContext and on an OfflineAudioContext
//                               (opts.offline = true: time is driven with engine.setTime(t) so a whole
//                               scene can be scheduled up front and then rendered).

const clamp = (x, a, b) => (x < a ? a : x > b ? b : x);
const lerp = (a, b, t) => a + (b - a) * t;
const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const SOUND_NAMES = [
  'jump', 'land', 'step', 'pickup', 'golden', 'burst', 'charge', 'throw', 'nutHit', 'scratch', 'pounce', 'hurt',
  'chatter', 'bark', 'growl', 'notice', 'lunge', 'yelp', 'questDone', 'questNew', 'uiTap', 'respawn', 'leaves', 'wire',
];
export const SURFACES = ['ground', 'wood', 'wire', 'roof', 'wall'];

// duration is the longest the sound can ring (used for the voice cap), send is the reverb send,
// prio = true means the sound is never dropped by the voice cap.
const CFG = {
  jump: { dur: 0.4, send: 0.05 }, land: { dur: 0.45, send: 0.06 }, step: { dur: 0.15, send: 0 },
  pickup: { dur: 1.0, send: 0.3, prio: true }, golden: { dur: 3.0, send: 0.4, prio: true },
  burst: { dur: 0.8, send: 0.1 }, charge: { dur: 0.25, send: 0.15 }, throw: { dur: 0.3, send: 0.05 },
  nutHit: { dur: 0.35, send: 0.12 }, scratch: { dur: 0.35, send: 0.05 }, pounce: { dur: 0.7, send: 0.1, prio: true },
  hurt: { dur: 0.5, send: 0.1, prio: true }, chatter: { dur: 1.3, send: 0.12 }, bark: { dur: 0.9, send: 0.22 },
  growl: { dur: 1.6, send: 0.12 }, notice: { dur: 0.8, send: 0.25, prio: true }, lunge: { dur: 0.35, send: 0.1 },
  yelp: { dur: 1.5, send: 0.25 }, questDone: { dur: 2.2, send: 0.35, prio: true }, questNew: { dur: 1.2, send: 0.3, prio: true },
  uiTap: { dur: 0.15, send: 0, prio: true }, respawn: { dur: 1.8, send: 0.35, prio: true },
  leaves: { dur: 0.7, send: 0.08 }, wire: { dur: 1.2, send: 0.15 },
};
const MAX_VOICES = 26;
const EMPTY = Object.freeze({});

// ---------------------------------------------------------------------------------------------
export function createEngine(ctx, options = {}) {
  const offline = !!options.offline;
  const layers = Object.assign({ steps: true, wind: true, ambience: true, music: true }, options.layers);
  const rand = mulberry32(options.seed != null ? options.seed : (Date.now() ^ 0x5eed) | 0);
  const rnd = (a, b) => a + (b - a) * rand();
  const sr = ctx.sampleRate;
  let vt = 0;
  const now = () => (offline ? vt : ctx.currentTime);

  // ---- shared noise buffers (looped, with the seam cross-faded so loops do not click) ----
  function noiseBuffer(seconds, colour) {
    const len = Math.floor(sr * seconds), fade = Math.floor(sr * 0.05);
    const raw = new Float32Array(len + fade);
    let b0 = 0, b1 = 0, b2 = 0, last = 0, peak = 0;
    for (let i = 0; i < raw.length; i++) {
      const w = rand() * 2 - 1;
      let x = w;
      if (colour === 'pink') {
        b0 = 0.99765 * b0 + w * 0.099046; b1 = 0.963 * b1 + w * 0.2965164; b2 = 0.57 * b2 + w * 1.0526913;
        x = b0 + b1 + b2 + w * 0.1848;
      } else if (colour === 'brown') {
        last = (last + 0.02 * w) / 1.02; x = last;
      }
      raw[i] = x; const a = Math.abs(x); if (a > peak) peak = a;
    }
    const buf = ctx.createBuffer(1, len, sr), d = buf.getChannelData(0), k = 0.95 / peak;
    for (let i = 0; i < len; i++) d[i] = raw[i] * k;
    for (let i = 0; i < fade; i++) { const f = i / fade; d[i] = (raw[i] * f + raw[len + i] * (1 - f)) * k; }
    return buf;
  }
  const WHITE = noiseBuffer(2, 'white'), PINK = noiseBuffer(2.5, 'pink'), BROWN = noiseBuffer(3, 'brown');

  // ---- reverb impulse: a small warm outdoor space ----
  function impulse(seconds) {
    const len = Math.floor(sr * seconds), buf = ctx.createBuffer(2, len, sr), pre = Math.floor(sr * 0.012);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c); let lp = 0;
      for (let i = pre; i < len; i++) {
        const t = (i - pre) / sr;
        const a = 0.12 + 0.75 * Math.exp(-t * 3.2);          // the tail gets darker
        lp += a * ((rand() * 2 - 1) - lp);
        d[i] = lp * Math.exp(-t * 4.4) * (t < 0.004 ? t / 0.004 : 1);
      }
      for (let e = 0; e < 5; e++) {                            // a few early reflections
        const i = pre + Math.floor(sr * rnd(0.004, 0.06)); d[i] += rnd(-0.5, 0.5);
      }
    }
    return buf;
  }

  // ---- master graph ----
  const G = (v = 1) => { const g = ctx.createGain(); g.gain.value = v; return g; };
  const F = (type, f, q = 0.7) => { const b = ctx.createBiquadFilter(); b.type = type; b.frequency.value = Math.min(f, sr * 0.45); b.Q.value = q; return b; };
  const chain = (...n) => { for (let i = 0; i < n.length - 1; i++) n[i].connect(n[i + 1]); return n[n.length - 1]; };

  const pre = G(0.56);
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -12; comp.knee.value = 9; comp.ratio.value = 4; comp.attack.value = 0.004; comp.release.value = 0.18;
  const shaper = ctx.createWaveShaper();                       // soft safety clip: linear up to 0.6, never above 0.9
  {
    const n = 2049, curve = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const x = (i / (n - 1)) * 2 - 1, a = Math.abs(x);
      curve[i] = Math.sign(x) * (a < 0.6 ? a : 0.6 + 0.3 * Math.tanh((a - 0.6) / 0.3));
    }
    shaper.curve = curve;
  }
  const out = G(1);
  chain(pre, comp, shaper, out, ctx.destination);

  const sfxBus = G(1), stepBus = G(0.8), windBus = G(0.7), ambOut = G(0.5), musicBus = G(0);
  const ambBus = G(1), ambLP = F('lowpass', 5500, 0.5);
  sfxBus.connect(pre); stepBus.connect(pre); windBus.connect(pre); musicBus.connect(pre);
  chain(ambBus, ambLP, ambOut, pre);
  const revIn = G(1), conv = ctx.createConvolver(), revOut = G(0.9);
  conv.buffer = impulse(1.5);
  chain(revIn, conv, revOut, pre);
  const musicSend = G(0.28), ambSend = G(0.35);
  musicBus.connect(musicSend); musicSend.connect(revIn);
  ambLP.connect(ambSend); ambSend.connect(revIn);
  const calmPadBus = G(1), tensePadBus = G(0), padLP = F('lowpass', 1500, 0.4);
  calmPadBus.connect(padLP); tensePadBus.connect(padLP); padLP.connect(musicBus);

  let volume = 1, muted = false, musicOn = true;
  const MUSIC_LEVEL = 0.46;
  function applyOut() { const v = muted ? 0 : volume; out.gain.setTargetAtTime(v, now(), 0.03); }

  // ---- envelopes ----
  // attack to peak, exponential decay, and a last short ramp to exact silence
  function perc(p, t, a, peak, d) {
    peak = Math.max(peak, 1e-4);
    p.setValueAtTime(0, t); p.linearRampToValueAtTime(peak, t + a);
    p.exponentialRampToValueAtTime(peak * 0.002, t + a + d); p.linearRampToValueAtTime(0, t + a + d + 0.012);
  }
  // attack, hold, linear release
  function hold(p, t, a, peak, h, r) {
    p.setValueAtTime(0, t); p.linearRampToValueAtTime(peak, t + a);
    p.setValueAtTime(peak, t + a + h); p.linearRampToValueAtTime(0, t + a + h + r);
  }
  // sweep(param, t, v0, [dt, v1], [dt, v2] ...) exponential glides (values must be above zero)
  function sweep(p, t, v0, ...pts) {
    p.setValueAtTime(Math.max(v0, 1), t);
    for (const [dt, v] of pts) p.exponentialRampToValueAtTime(Math.max(v, 1), t + dt);
  }

  // ---- voices ----
  const ends = [];
  const hasPan = typeof ctx.createStereoPanner === 'function';
  function mkVoice(t, o, cfg, bus) {
    const n = now();
    let w = 0;
    for (let i = 0; i < ends.length; i++) if (ends[i] > n) ends[w++] = ends[i];
    ends.length = w;
    if (w >= MAX_VOICES && !cfg.prio) return null;
    if (w >= MAX_VOICES + 8) return null;
    ends.push(t + cfg.dur);
    const dist = Math.max(0, +o.distance || 0);
    const vol = clamp(o.volume == null ? 1 : +o.volume, 0, 2) / (1 + Math.pow(dist / 10, 1.3));
    const g = G(vol), nodes = [g];
    let tail = g;
    if (dist > 0.5) { const lp = F('lowpass', 16000 / (1 + dist / 15), 0.5); tail.connect(lp); tail = lp; nodes.push(lp); }
    const pan = clamp(+o.pan || 0, -1, 1);
    if (pan !== 0 && hasPan) { const p = ctx.createStereoPanner(); p.pan.value = pan; tail.connect(p); tail = p; nodes.push(p); }
    tail.connect(bus || sfxBus);
    const send = (o.send != null ? o.send : cfg.send) * (1 + Math.min(dist, 60) * 0.04);
    if (send > 0) { const s = G(Math.min(send, 1.2)); tail.connect(s); s.connect(revIn); nodes.push(s); }
    const v = { in: g, pitch: clamp(o.pitch == null ? 1 : +o.pitch || 1, 0.25, 4), pending: 0, nodes };
    v.done = () => { if (--v.pending <= 0) for (const nd of v.nodes) { try { nd.disconnect(); } catch (e) { /* already gone */ } } };
    return v;
  }
  function osc(v, type, f, t0, t1) {
    const o = ctx.createOscillator(); o.type = type; o.frequency.value = f;
    o.start(t0); o.stop(t1); v.pending++; o.onended = v.done; return o;
  }
  function noise(v, buf, t0, dur, rate = 1) {
    const s = ctx.createBufferSource(); s.buffer = buf; s.loop = true; s.playbackRate.value = rate;
    s.start(t0, rand() * (buf.duration - 0.1)); s.stop(t0 + dur); v.pending++; s.onended = v.done; return s;
  }
  // band-pass formant bank in parallel: list of [freq, Q, gain]. Returns the filters.
  function formants(src, dest, list) {
    return list.map(([f, q, g]) => { const b = F('bandpass', f, q); chain(src, b, G(g), dest); return b; });
  }

  // ---- building blocks ----
  // FM bell or mallet: bright = modulation depth, ratio = modulator ratio
  function bell(v, t, f, gain, dur, bright = 1, ratio = 3.5) {
    f = Math.min(f, 9000);
    const c = osc(v, 'sine', f, t, t + dur + 0.03), m = osc(v, 'sine', f * ratio, t, t + dur + 0.03);
    const mg = G(0), g = G(0);
    mg.gain.setValueAtTime(f * 1.6 * bright, t); mg.gain.exponentialRampToValueAtTime(Math.max(f * 0.02, 1), t + Math.min(0.14, dur));
    m.connect(mg); mg.connect(c.frequency);
    perc(g.gain, t, 0.003, gain, dur);
    chain(c, g, v.in);
  }
  function thump(v, t, f0, f1, gain, dur) {
    const o = osc(v, 'sine', f0, t, t + dur + 0.04), g = G(0);
    sweep(o.frequency, t, f0, [dur, f1]); perc(g.gain, t, 0.004, gain, dur); chain(o, g, v.in);
  }
  // one burst of filtered noise
  function puff(v, t, buf, type, f0, f1, q, gain, a, d) {
    const s = noise(v, buf, t, a + d + 0.03), fl = F(type, f0, q), g = G(0);
    if (f1 !== f0) sweep(fl.frequency, t, f0, [a + d, f1]);
    perc(g.gain, t, a, gain, d); chain(s, fl, g, v.in); return fl;
  }

  // a single claw or paw contact
  function tick(v, t, surface, gain, pm = 1) {
    const j = rnd(0.9, 1.12) * pm * v.pitch;
    switch (surface) {
      case 'wood':                                             // sharp dry scratch on bark with a little knock
        puff(v, t, WHITE, 'bandpass', 2700 * j, 1700 * j, 2.2, gain * 1.9, 0.001, 0.02);
        puff(v, t, WHITE, 'highpass', 5000, 5000, 0.7, gain * 0.22, 0.001, 0.007);
        thump(v, t, 950 * j, 620 * j, gain * 0.2, 0.024);
        break;
      case 'wire': {                                           // thin metallic ping
        const f = 4100 * j, o1 = osc(v, 'sine', f, t, t + 0.1), o2 = osc(v, 'sine', f * 2.76, t, t + 0.06), g1 = G(0), g2 = G(0);
        perc(g1.gain, t, 0.001, gain * 0.3, 0.07); perc(g2.gain, t, 0.001, gain * 0.14, 0.035);
        chain(o1, g1, v.in); chain(o2, g2, v.in);
        puff(v, t, WHITE, 'highpass', 7000, 7000, 0.7, gain * 0.2, 0.001, 0.006);
        break;
      }
      case 'roof':                                             // hollow tap
        thump(v, t, 330 * j, 230 * j, gain * 0.5, 0.05);
        puff(v, t, WHITE, 'bandpass', 620 * j, 520 * j, 5, gain * 1.2, 0.001, 0.035);
        puff(v, t, WHITE, 'bandpass', 3800, 3800, 1.5, gain * 0.3, 0.001, 0.007);
        break;
      case 'wall':                                             // gritty brick scrape
        puff(v, t, WHITE, 'bandpass', 1900 * j, 1300 * j, 1.4, gain * 1.6, 0.002, 0.028);
        puff(v, t, PINK, 'highpass', 4500, 4500, 0.7, gain * 0.5, 0.001, 0.012);
        break;
      default:                                                 // soft grass or earth thud
        thump(v, t, 170 * j, 85 * j, gain * 0.55, 0.045);
        puff(v, t, PINK, 'lowpass', 1300 * j, 600 * j, 0.6, gain * 0.9, 0.002, 0.03);
        puff(v, t, WHITE, 'bandpass', 4200, 4200, 1, gain * 0.1, 0.001, 0.012);
    }
  }

  // one bark. size 0 = terrier .. 1 = bulldog
  function barkCore(v, t, size, gain = 1, durMul = 1, sharp = 0) {
    size = clamp(size, 0, 1);
    const f0 = 520 * Math.pow(95 / 520, size) * rnd(0.93, 1.07) * v.pitch;
    const dur = lerp(0.1, 0.24, size) * rnd(0.88, 1.14) * durMul;
    const end = t + dur + 0.05;
    const saw = osc(v, 'sawtooth', f0, t, end), sq = osc(v, 'square', f0, t, end), sub = osc(v, 'sawtooth', f0 * 0.5, t, end);
    const top = 1.35 + 0.25 * sharp + rnd(-0.06, 0.06);
    for (const [o, m] of [[saw, 1], [sq, 1.004], [sub, 0.5]]) {
      o.frequency.setValueAtTime(f0 * 1.1 * m, t);
      o.frequency.linearRampToValueAtTime(f0 * top * m, t + dur * 0.16);
      o.frequency.exponentialRampToValueAtTime(f0 * rnd(0.58, 0.68) * m, t + dur);
    }
    const src = G(0);
    chain(saw, G(0.6), src); chain(sq, G(0.3), src); chain(sub, G(0.2 + 0.5 * size), src);
    src.gain.setValueAtTime(0, t); src.gain.linearRampToValueAtTime(1, t + 0.008);
    src.gain.setValueAtTime(0.85, t + dur * 0.45); src.gain.linearRampToValueAtTime(0, t + dur + 0.03);
    const o = G(gain * lerp(2.1, 1.8, size)); o.connect(v.in);
    const f1 = lerp(1050, 470, size) * rnd(0.94, 1.06), f2 = lerp(2400, 1150, size) * rnd(0.94, 1.06), f3 = lerp(3900, 2500, size);
    const bank = formants(src, o, [[f1, 5, 1], [f2, 6, 0.7], [f3, 7, 0.32]]);
    sweep(bank[0].frequency, t, f1 * 0.8, [dur * 0.2, f1 * 1.12], [dur, f1 * 0.78]);   // the mouth opens then closes
    sweep(bank[1].frequency, t, f2 * 0.92, [dur * 0.2, f2 * 1.05], [dur, f2 * 0.88]);
    chain(src, F('lowpass', f0 * 2.6, 0.7), G(0.25 + 0.5 * size), o);                    // chest
    // breath and grit
    const n = noise(v, WHITE, t, dur + 0.05), nb = F('bandpass', f2 * 0.9, 1.1), ng = G(0);
    perc(ng.gain, t, 0.004, 0.55, dur * 0.7); chain(n, nb, ng, o);
    return dur;
  }

  // ---- one-shots ----
  const SOUNDS = {
    jump(v, t, o) {
      const pw = clamp(o.power == null ? 0.6 : o.power, 0, 1), p = v.pitch;
      puff(v, t, PINK, 'bandpass', 500 * p, (1800 + 1400 * pw) * p, 1.1, 0.8 + 0.7 * pw, 0.035, 0.16 + 0.06 * pw);
      tick(v, t, o.surface || 'wood', 0.5 + 0.3 * pw, 1.1);
      tick(v, t + 0.014, o.surface || 'wood', 0.4 + 0.3 * pw, 1.25);
      thump(v, t, 190 * p, 80 * p, 0.2 + 0.3 * pw, 0.06);
    },
    land(v, t, o) {
      const im = clamp(o.impact == null ? 0.5 : o.impact, 0, 1), s = o.surface || 'ground', p = v.pitch;
      const soft = s === 'wire' ? 0.35 : s === 'ground' ? 1 : 0.7;
      thump(v, t, (150 - 40 * im) * p, (62 - 14 * im) * p, (0.3 + 0.6 * im) * soft, 0.08 + 0.1 * im);
      puff(v, t, PINK, 'lowpass', 900 + 900 * im, 300, 0.6, (0.25 + 0.55 * im) * soft, 0.003, 0.05 + 0.05 * im);
      tick(v, t, s, 0.7 + 0.7 * im, 0.92);
      tick(v, t + 0.022 + 0.01 * im, s, 0.55 + 0.6 * im, 0.82);
    },
    step(v, t, o) { tick(v, t, o.surface || 'ground', 1); },
    pickup(v, t, o) {
      const st = clamp(Math.round(o.streak || 0), 0, 12), deg = [0, 2, 4, 7, 9];
      const f = 659.26 * Math.pow(2, (12 * Math.floor(st / 5) + deg[st % 5]) / 12) * v.pitch;
      bell(v, t, f, 0.5, 0.3, 1.1);
      bell(v, t + 0.07, f * 1.5, 0.42, 0.5, 0.9);
      // sparkle on top
      const sh = osc(v, 'sine', Math.min(f * 4, 11000), t + 0.07, t + 0.5), sg = G(0), trem = osc(v, 'sine', 23, t + 0.07, t + 0.5), tg = G(0.03);
      perc(sg.gain, t + 0.07, 0.004, 0.06, 0.35); chain(trem, tg); tg.connect(sg.gain); chain(sh, sg, v.in);
      puff(v, t, WHITE, 'highpass', 7500, 7500, 0.7, 0.12, 0.001, 0.03);
    },
    golden(v, t, o) {
      const p = v.pitch;
      for (const m of [60, 64, 67, 74]) {                      // warm chord
        const a = osc(v, 'triangle', mtof(m) * p, t, t + 2.3), b = osc(v, 'sine', mtof(m) * p * 1.004, t, t + 2.3), g = G(0);
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.09, t + 0.08);
        g.gain.exponentialRampToValueAtTime(0.02, t + 1.6); g.gain.linearRampToValueAtTime(0, t + 2.25);
        chain(a, g); chain(b, g); chain(g, F('lowpass', 2200, 0.5), v.in);
      }
      const arp = [72, 76, 79, 84, 86, 88, 91, 96];
      arp.forEach((m, i) => bell(v, t + 0.04 + i * 0.07, mtof(m) * p, 0.3 - i * 0.012, 0.6 + i * 0.06, 1.2));
      bell(v, t + 0.04 + 8 * 0.07 + 0.05, mtof(96) * p, 0.26, 1.2, 0.8);
      // shimmer
      const n = noise(v, WHITE, t, 1.7), bp = F('bandpass', 8000, 3), g = G(0), tr = osc(v, 'sine', 17, t, t + 1.7), tg = G(0.035);
      hold(g.gain, t, 0.25, 0.07, 0.3, 1.1); chain(tr, tg); tg.connect(g.gain); chain(n, bp, g, v.in);
    },
    burst(v, t, o) {
      const p = v.pitch, n = noise(v, PINK, t, 0.62), bp = F('bandpass', 280, 1.4), g = G(0);
      sweep(bp.frequency, t, 280 * p, [0.42, 3400 * p], [0.6, 2200 * p]);
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.25, t + 0.08);
      g.gain.exponentialRampToValueAtTime(1.3, t + 0.4); g.gain.linearRampToValueAtTime(0, t + 0.6);
      chain(n, bp, g, v.in);
      const s = osc(v, 'triangle', 160, t, t + 0.5), sg = G(0);
      sweep(s.frequency, t, 160 * p, [0.42, 760 * p]); hold(sg.gain, t, 0.05, 0.16, 0.3, 0.12); chain(s, sg, v.in);
      puff(v, t + 0.4, WHITE, 'highpass', 5000, 5000, 0.7, 0.2, 0.01, 0.12);
    },
    charge(v, t, o) {
      const p = v.pitch;
      bell(v, t, 1760 * p, 0.22, 0.09, 0.6, 2); bell(v, t + 0.045, 2637 * p, 0.2, 0.12, 0.6, 2);
      puff(v, t, WHITE, 'highpass', 6000, 6000, 0.7, 0.12, 0.001, 0.01);
    },
    throw(v, t, o) {
      const p = v.pitch, n = noise(v, WHITE, t, 0.2), bp = F('bandpass', 1200, 1.6), g = G(0);
      sweep(bp.frequency, t, 1200 * p, [0.06, 4500 * p], [0.17, 1500 * p]);
      perc(g.gain, t, 0.03, 0.8, 0.13); chain(n, bp, g, v.in);
      thump(v, t, 260 * p, 120 * p, 0.2, 0.05);
    },
    nutHit(v, t, o) {
      const p = v.pitch * rnd(0.95, 1.06);
      thump(v, t, 620 * p, 470 * p, 0.6, 0.07);
      thump(v, t, 1480 * p, 1250 * p, 0.22, 0.035);
      puff(v, t, WHITE, 'bandpass', 900 * p, 800 * p, 8, 1.6, 0.001, 0.05);
      puff(v, t, WHITE, 'bandpass', 2600 * p, 2600 * p, 4, 0.5, 0.001, 0.015);
      thump(v, t, 180 * p, 90 * p, 0.25, 0.05);
    },
    scratch(v, t, o) {
      const p = v.pitch;
      for (let i = 0; i < 3; i++) {
        const tt = t + i * rnd(0.05, 0.062), f = rnd(4200, 5600) * p;
        puff(v, tt, WHITE, 'bandpass', f, f * 0.55, 1.3, 0.75 - i * 0.12, 0.004, 0.04);
        puff(v, tt, WHITE, 'highpass', 7000, 7000, 0.7, 0.2, 0.002, 0.02);
      }
    },
    pounce(v, t, o) {
      const p = v.pitch;
      thump(v, t, 170 * p, 42 * p, 1.0, 0.24);
      puff(v, t, PINK, 'lowpass', 1800, 250, 0.7, 0.9, 0.003, 0.11);
      puff(v, t, WHITE, 'bandpass', 2500, 1500, 1, 0.3, 0.001, 0.03);
      // comic bonk: a springy note that wobbles
      const t2 = t + 0.05, b = osc(v, 'triangle', 300, t2, t2 + 0.42), g = G(0), l = osc(v, 'sine', 19, t2, t2 + 0.42), lg = G(0);
      b.frequency.setValueAtTime(330 * p, t2); b.frequency.exponentialRampToValueAtTime(560 * p, t2 + 0.05);
      b.frequency.exponentialRampToValueAtTime(290 * p, t2 + 0.36);
      lg.gain.setValueAtTime(70, t2); lg.gain.exponentialRampToValueAtTime(4, t2 + 0.36); chain(l, lg); lg.connect(b.frequency);
      perc(g.gain, t2, 0.004, 0.42, 0.34); chain(b, g, v.in);
      bell(v, t2, 660 * p, 0.2, 0.12, 1.4, 1.41);
    },
    hurt(v, t, o) {
      const p = v.pitch, a = osc(v, 'triangle', 2300, t, t + 0.24), b = osc(v, 'sawtooth', 2300, t, t + 0.24), g = G(0), src = G(1);
      for (const x of [a, b]) {
        x.frequency.setValueAtTime(2300 * p, t); x.frequency.exponentialRampToValueAtTime(3700 * p, t + 0.035);
        x.frequency.exponentialRampToValueAtTime(1700 * p, t + 0.2);
      }
      const vib = osc(v, 'sine', 38, t, t + 0.24), vg = G(140); chain(vib, vg); vg.connect(a.frequency); vg.connect(b.frequency);
      chain(a, G(0.7), src); chain(b, G(0.18), src);
      perc(g.gain, t, 0.006, 0.4, 0.19); chain(src, F('bandpass', 3000 * p, 1.2), g, v.in);
      thump(v, t + 0.01, 140 * p, 52 * p, 0.75, 0.14);
      puff(v, t + 0.01, PINK, 'lowpass', 1200, 300, 0.7, 0.5, 0.003, 0.07);
    },
    chatter(v, t, o) {
      const p = v.pitch * rnd(0.95, 1.06), n = o.count || 3 + Math.floor(rand() * 3);
      let tt = t;
      const voiceBurst = (t0, dur, fa, fb, f1a, f1b, gain, rasp) => {
        const s = osc(v, 'sawtooth', fa, t0, t0 + dur + 0.04), ns = noise(v, WHITE, t0, dur + 0.04), src = G(0), am = G(1), o2 = G(gain);
        sweep(s.frequency, t0, fa, [dur, fb]);
        chain(s, G(0.55), src); chain(ns, G(0.5), src);
        if (rasp) {                                            // rough amplitude flutter for the "quaa"
          const l = osc(v, 'sawtooth', rasp, t0, t0 + dur + 0.04), lg = G(0.45);
          sweep(l.frequency, t0, rasp, [dur, rasp * 0.7]); am.gain.value = 0.55; chain(l, lg); lg.connect(am.gain);
          hold(src.gain, t0, 0.02, 1, dur * 0.45, dur * 0.55);
        } else perc(src.gain, t0, 0.004, 1, dur);
        src.connect(am); o2.connect(v.in);
        const bank = formants(am, o2, [[f1a, 4, 1], [f1a * 2.05, 5, 0.6], [5400 * p, 4, 0.22]]);
        sweep(bank[0].frequency, t0, f1a, [dur, f1b]); sweep(bank[1].frequency, t0, f1a * 2.05, [dur, f1b * 1.9]);
      };
      for (let i = 0; i < n; i++) {
        voiceBurst(tt, 0.05, 820 * p * rnd(0.95, 1.05), 520 * p, 1750 * p, 1450 * p, 2.3 * (0.8 + 0.2 * rand()), 0);
        tt += rnd(0.095, 0.125);
      }
      voiceBurst(tt + 0.03, rnd(0.32, 0.42), 930 * p, 610 * p, 1350 * p, 2000 * p, 2.0, 64);
    },
    bark(v, t, o) {
      const size = o.size == null ? 0.5 : o.size, n = Math.max(1, Math.round(o.count || 1));
      let tt = t;
      for (let i = 0; i < n; i++) tt += barkCore(v, tt, size, i ? 0.85 : 1) + rnd(0.09, 0.16);
    },
    growl(v, t, o) {
      const size = clamp(o.size == null ? 0.6 : o.size, 0, 1), dur = clamp(o.duration || 1.0, 0.3, 1.5), p = v.pitch;
      const f0 = lerp(150, 68, size) * rnd(0.94, 1.06) * p, end = t + dur + 0.05;
      const s1 = osc(v, 'sawtooth', f0, t, end), s2 = osc(v, 'sawtooth', f0 * 1.013, t, end), src = G(0), am = G(0.55);
      for (const s of [s1, s2]) { s.frequency.setValueAtTime(f0 * 0.9, t); s.frequency.linearRampToValueAtTime(f0 * 1.12, t + dur * 0.6); s.frequency.linearRampToValueAtTime(f0 * 0.85, t + dur); }
      const l = osc(v, 'sawtooth', rnd(24, 32), t, end), lg = G(0.45); chain(l, lg); lg.connect(am.gain);   // rattle
      const ns = noise(v, PINK, t, dur + 0.05);
      chain(s1, G(0.5), src); chain(s2, G(0.5), src); chain(ns, G(0.35), src);
      src.gain.setValueAtTime(0, t); src.gain.linearRampToValueAtTime(0.6, t + 0.12);
      src.gain.linearRampToValueAtTime(1, t + dur * 0.65); src.gain.linearRampToValueAtTime(0, t + dur);
      src.connect(am);
      const og = G(1.6); og.connect(v.in);
      const f1 = lerp(620, 380, size), bank = formants(am, og, [[f1, 3, 1], [f1 * 2.7, 4, 0.5], [f1 * 5.5, 5, 0.18]]);
      bank[0].frequency.setValueAtTime(f1 * 0.85, t); bank[0].frequency.linearRampToValueAtTime(f1 * 1.2, t + dur * 0.7);
      chain(am, F('lowpass', f0 * 3, 0.7), G(0.5), og);
    },
    notice(v, t, o) {
      const p = v.pitch;
      barkCore(v, t, o.size == null ? 0.5 : o.size, 1.15, 0.8, 1);
      // rising alert sting
      const t2 = t + 0.05, s = osc(v, 'triangle', 700, t2, t2 + 0.3), g = G(0);
      sweep(s.frequency, t2, 660 * p, [0.11, 1320 * p]); perc(g.gain, t2, 0.01, 0.16, 0.2); chain(s, g, v.in);
      bell(v, t2 + 0.1, 1568 * p, 0.2, 0.3, 1.3, 2.4);
      bell(v, t2 + 0.1, 1568 * 1.06 * p, 0.07, 0.25, 1.0, 2.4);
    },
    lunge(v, t, o) {
      const p = v.pitch;
      puff(v, t, PINK, 'bandpass', 420 * p, 1700 * p, 1.5, 0.9, 0.06, 0.04);      // short snarl of air
      const t2 = t + 0.085;
      puff(v, t2, WHITE, 'bandpass', 1700 * p, 1300 * p, 3.5, 1.7, 0.001, 0.028); // the clack of teeth
      puff(v, t2, WHITE, 'highpass', 4500, 4500, 0.7, 0.5, 0.0008, 0.008);
      thump(v, t2, 900 * p, 500 * p, 0.3, 0.02);
      thump(v, t2, 210 * p, 85 * p, 0.5, 0.06);
    },
    yelp(v, t, o) {
      const size = clamp(o.size == null ? 0.4 : o.size, 0, 1), p = v.pitch, n = o.count || 3 + Math.floor(rand() * 2);
      const base = lerp(1900, 900, size) * p;
      let tt = t, g0 = 1;
      for (let i = 0; i < n; i++) {
        const dur = rnd(0.12, 0.17) + i * 0.015, f = base * rnd(0.94, 1.06) * (1 - i * 0.05), end = tt + dur + 0.04;
        const a = osc(v, 'sawtooth', f, tt, end), b = osc(v, 'triangle', f, tt, end), src = G(0), og = G(1.2 * g0);
        for (const x of [a, b]) { x.frequency.setValueAtTime(f * 0.85, tt); x.frequency.exponentialRampToValueAtTime(f * 1.12, tt + dur * 0.15); x.frequency.exponentialRampToValueAtTime(f * 0.55, tt + dur); }
        chain(a, G(0.4), src); chain(b, G(0.7), src); hold(src.gain, tt, 0.008, 1, dur * 0.4, dur * 0.6);
        og.connect(v.in);
        formants(src, og, [[lerp(1500, 1000, size) * p, 3, 1], [lerp(3200, 2300, size) * p, 4, 0.6]]);
        tt += dur + rnd(0.07, 0.11) + i * 0.03; g0 *= 0.62;
      }
    },
    questDone(v, t, o) {
      const p = v.pitch, seq = [[72, 0], [76, 0.11], [79, 0.22], [84, 0.36]];
      const brass = (t0, m, gain, dur) => {
        const f = mtof(m) * p, a = osc(v, 'triangle', f, t0, t0 + dur + 0.05), b = osc(v, 'square', f, t0, t0 + dur + 0.05), lp = F('lowpass', 800, 0.7), g = G(0);
        sweep(lp.frequency, t0, 900, [0.04, 3800], [dur, 1300]);
        hold(g.gain, t0, 0.012, gain, dur * 0.5, dur * 0.5); chain(a, G(0.8), lp); chain(b, G(0.16), lp); chain(lp, g, v.in);
      };
      for (const [m, dt] of seq) { brass(t + dt, m, 0.2, m === 84 ? 0.2 : 0.1); bell(v, t + dt, mtof(m + 12) * p, 0.12, 0.3, 1); }
      const t2 = t + 0.56;
      for (const m of [67, 72, 76, 79, 84]) brass(t2, m, 0.12, 0.85);
      bell(v, t2, mtof(96) * p, 0.16, 0.9, 1); bell(v, t2 + 0.09, mtof(103) * p, 0.1, 0.8, 0.8);
    },
    questNew(v, t, o) {
      const p = v.pitch;
      bell(v, t, mtof(79) * p, 0.26, 0.5, 0.7, 2); bell(v, t + 0.17, mtof(84) * p, 0.24, 0.8, 0.7, 2);
      bell(v, t + 0.17, mtof(72) * p, 0.1, 0.7, 0.4, 1);
    },
    uiTap(v, t, o) {
      const p = v.pitch;
      thump(v, t, 980 * p, 700 * p, 0.3, 0.035);
      puff(v, t, WHITE, 'bandpass', 3200, 3200, 2, 0.25, 0.001, 0.012);
    },
    respawn(v, t, o) {
      const p = v.pitch, n = noise(v, PINK, t, 0.55), bp = F('bandpass', 400, 1.2), g = G(0);
      sweep(bp.frequency, t, 350, [0.45, 2600]); hold(g.gain, t, 0.38, 0.4, 0.02, 0.12); chain(n, bp, g, v.in);
      [[67, 0.4], [72, 0.52], [76, 0.64], [79, 0.76]].forEach(([m, dt], i) => bell(v, t + dt, mtof(m) * p, 0.26, 0.6 + i * 0.12, 0.8, 3));
      for (const m of [60, 67]) {
        const a = osc(v, 'triangle', mtof(m) * p, t + 0.4, t + 1.7), pg = G(0);
        hold(pg.gain, t + 0.4, 0.15, 0.07, 0.4, 0.7); chain(a, pg, v.in);
      }
    },
    leaves(v, t, o) {
      const amt = clamp(o.amount == null ? 0.6 : o.amount, 0, 1), p = v.pitch, n = 5 + Math.floor(amt * 6), span = 0.2 + 0.25 * amt;
      for (let i = 0; i < n; i++) {
        const tt = t + Math.pow(rand(), 1.4) * span, f = rnd(2400, 6800) * p;
        puff(v, tt, rand() < 0.5 ? WHITE : PINK, 'bandpass', f, f * rnd(0.6, 1.3), 0.9, (0.35 + 0.5 * amt) * rnd(0.5, 1), rnd(0.008, 0.03), rnd(0.03, 0.09));
      }
      puff(v, t, PINK, 'bandpass', 1500 * p, 900 * p, 0.7, 0.3 * amt, 0.02, 0.2);          // the branch gives a little
    },
    wire(v, t, o) {
      const im = clamp(o.impact == null ? 0.6 : o.impact, 0, 1), p = v.pitch * rnd(0.96, 1.05), f0 = 196 * p, dur = 0.6 + 0.4 * im;
      const lfo = osc(v, 'sine', rnd(8, 10), t, t + dur + 0.05), parts = [[1, 0.5, 1], [2.01, 0.34, 0.8], [3.04, 0.22, 0.6], [4.12, 0.16, 0.45], [5.4, 0.1, 0.3], [8.3, 0.07, 0.2]];
      for (const [m, g0, d] of parts) {
        const s = osc(v, m < 3 ? 'triangle' : 'sine', f0 * m, t, t + dur * d + 0.05), g = G(0), lg = G(0);
        s.frequency.setValueAtTime(f0 * m * (1 + 0.06 * im), t); s.frequency.exponentialRampToValueAtTime(f0 * m, t + 0.09);   // the spring settles
        lg.gain.setValueAtTime(f0 * m * 0.035 * (0.4 + im), t); lg.gain.exponentialRampToValueAtTime(0.5, t + dur * d);
        chain(lfo, lg); lg.connect(s.frequency);
        perc(g.gain, t, 0.002, g0 * (0.5 + 0.6 * im), dur * d); chain(s, g, v.in);
      }
      bell(v, t, 2480 * p, 0.12 + 0.1 * im, 0.2, 1.5, 2.76);
      puff(v, t, WHITE, 'highpass', 5000, 5000, 0.7, 0.2 * im, 0.001, 0.012);
    },
  };

  function play(name, opts, when) {
    const fn = SOUNDS[name]; if (!fn) return false;
    const o = opts || EMPTY, t = (when != null ? when : now()) + 0.006;
    const v = mkVoice(t, o, CFG[name]); if (!v) return false;
    fn(v, t, o);
    return true;
  }

  // ---------------------------------------------------------------------------------------------
  // update(): footsteps, wind, ambience, music
  const S = { speed: 0, surface: 'ground', airborne: false, height: 0, alert: 0, danger: 0, inTree: 0, flow: 0, paused: false };
  const sm = { air: 0, move: 0, flow: 0, danger: 0, alert: 0, speed: 0, height: 0, inTree: 0 };
  let beds = null, lastParam = -1, stridePhase = 0, strideEvt = 0;
  const gp = [rand() * 6, rand() * 6, rand() * 6, rand() * 6];
  const gust = (t, k = 1) => clamp(0.5 + 0.3 * Math.sin(t * 0.37 * k + gp[0]) + 0.22 * Math.sin(t * 0.83 * k + gp[1]) + 0.14 * Math.sin(t * 1.93 * k + gp[2]) + 0.08 * Math.sin(t * 4.1 * k + gp[3]), 0, 1);
  const stepCfg = { dur: 0.12, send: 0 };

  function loopSrc(buf, rate) {
    const s = ctx.createBufferSource(); s.buffer = buf; s.loop = true; s.playbackRate.value = rate; s.start(0, rand() * (buf.duration - 0.1)); return s;
  }
  function startBeds() {
    const b = {};
    if (layers.wind) {
      b.windLP = F('lowpass', 400, 0.6); b.windG = G(0);
      chain(loopSrc(PINK, 0.9), b.windLP, b.windG, windBus);
      b.rushBP = F('bandpass', 1500, 0.6); b.rushG = G(0);
      chain(loopSrc(WHITE, 1), b.rushBP, b.rushG, windBus);
    }
    if (layers.ambience) {
      b.leafBP = F('bandpass', 4200, 0.5); b.leafG = G(0);
      chain(loopSrc(WHITE, 0.83), b.leafBP, F('highpass', 1600, 0.5), b.leafG, ambBus);
      b.detailG = G(0);                                         // close papery leaf detail, mostly heard when alert or in a tree
      chain(loopSrc(PINK, 1.31), F('bandpass', 7200, 1.2), b.detailG, ambBus);
      b.humG = G(0);
      chain(loopSrc(BROWN, 1), F('lowpass', 210, 0.5), b.humG, ambBus);
      b.hum2G = G(0);                                           // far traffic wash
      chain(loopSrc(PINK, 0.6), F('bandpass', 420, 0.5), b.hum2G, ambBus);
    }
    return b;
  }
  const setP = (p, v, tc = 0.12) => p.setTargetAtTime(v, now(), tc);

  function updateBeds(n) {
    const sp = clamp(sm.speed / 12, 0, 1), h = clamp(sm.height / 15, 0, 1), air = sm.air, al = sm.alert, g = gust(n), g2 = gust(n + 40, 2.3);
    const pz = S.paused ? 0 : 1;
    if (layers.wind) {
      setP(beds.windG.gain, pz * (0.035 + 0.4 * sp * sp + 0.22 * h * (0.45 + 0.55 * g) + 0.05 * g + 0.12 * air) * (1 - 0.3 * al));
      setP(beds.windLP.frequency, 320 + 1500 * sp + 700 * h + 600 * air + 200 * g);
      setP(beds.rushG.gain, pz * air * (0.07 + 0.13 * sp), 0.07);
      setP(beds.rushBP.frequency, 1300 + 2000 * sp);
    }
    if (layers.ambience) {
      const tree = sm.inTree;
      setP(beds.leafG.gain, (0.035 + 0.11 * tree) * (0.25 + 0.75 * g) * (1 + 0.5 * al), 0.25);
      setP(beds.leafBP.frequency, 3400 + 1800 * g + 800 * tree, 0.3);
      setP(beds.detailG.gain, (0.012 + 0.05 * tree + 0.05 * al) * (0.2 + 0.8 * g2), 0.2);
      setP(beds.humG.gain, 0.14 * (1 + 0.25 * al), 0.4);
      setP(beds.hum2G.gain, 0.03 * (1 + 0.5 * al) * (0.7 + 0.3 * g2), 0.4);
      setP(ambOut.gain, 0.5 * (S.paused ? 0.4 : 1) * (1 + 0.7 * al) * (1 - 0.3 * sm.danger), 0.2);
      setP(ambLP.frequency, 5200 + 9000 * al, 0.25);
    }
    if (layers.music) {
      setP(musicBus.gain, musicOn ? MUSIC_LEVEL * (1 - 0.62 * al) * (S.paused ? 0.5 : 1) : 0, 0.25);
      setP(calmPadBus.gain, 1 - sm.danger, 0.3); setP(tensePadBus.gain, sm.danger, 0.3);
      setP(padLP.frequency, 1500 - 500 * sm.danger - 500 * al, 0.3);
    }
  }

  function footsteps(dt, n) {
    const sp = S.speed;
    if (S.paused || S.airborne || sp < 0.35 || !layers.steps) { stridePhase = 0; strideEvt = 0; return; }
    const rate = clamp(2.2 + sp * 0.55, 2.5, 8.5);
    const p0 = stridePhase; let p = p0 + rate * dt, guard = 0;
    while (guard++ < 6) {
      const thr = strideEvt === 0 ? 0 : strideEvt === 1 ? 0.36 : 1;
      if (p < thr) break;
      if (strideEvt === 2) { p -= 1; strideEvt = 0; if (p > 0.3) p = 0.3; continue; }
      const tEv = n + 0.02 + clamp((thr - p0) / rate, 0, dt);
      const hind = strideEvt === 1, v = mkVoice(tEv, EMPTY, stepCfg, stepBus);
      if (v) {
        const g = (0.5 + 0.5 * Math.min(sp / 8, 1)) * (hind ? 1 : 0.8) * rnd(0.8, 1.05), pm = hind ? 0.9 : 1.08;
        tick(v, tEv, S.surface, g, pm);
        if (rate < 6.6) tick(v, tEv + rnd(0.012, 0.02), S.surface, g * 0.7, pm * rnd(1.02, 1.1));   // second paw of the pair
      }
      strideEvt++;
    }
    stridePhase = p;
  }

  // ---- ambience events ----
  const ambCfg = { dur: 2.5, send: 0.7 };
  let nextBird = -1, nextFarDog = -1, nextBell = -1;
  function chirp(v, t, f0, f1, dur, gain, type = 'sine') {
    const o = osc(v, type, f0, t, t + dur + 0.03), g = G(0);
    sweep(o.frequency, t, f0, [dur, f1]); hold(g.gain, t, Math.min(0.012, dur * 0.3), gain, dur * 0.3, dur * 0.55); chain(o, g, v.in);
  }
  function bird(t, kind, alertness) {
    const v = mkVoice(t, { pan: rnd(-0.9, 0.9), distance: rnd(6, 34) / (1 + alertness), volume: 0.5 * (1 + 0.5 * alertness) }, ambCfg, ambBus);
    if (!v) return;
    const pj = rnd(0.88, 1.14);
    let tt = t;
    if (kind === 0) {                                          // tit: a few falling chirps
      const n = 2 + Math.floor(rand() * 4);
      for (let i = 0; i < n; i++) { chirp(v, tt, 5300 * pj, 3500 * pj, 0.055, 0.5); tt += rnd(0.1, 0.13); }
    } else if (kind === 1) {                                   // trill
      const n = 9 + Math.floor(rand() * 9), f = rnd(3300, 4300);
      for (let i = 0; i < n; i++) { chirp(v, tt, f, f * 1.22, 0.028, 0.45 * Math.sin((i + 1) / (n + 1) * Math.PI)); tt += 0.046; }
    } else if (kind === 2) {                                   // two-note song
      const n = 2 + Math.floor(rand() * 3);
      for (let i = 0; i < n; i++) { chirp(v, tt, 4400 * pj, 4250 * pj, 0.09, 0.45); chirp(v, tt + 0.12, 3350 * pj, 3200 * pj, 0.11, 0.4); tt += rnd(0.27, 0.3); }
    } else if (kind === 3) {                                   // dove: soft low coos
      for (const [d, gap] of [[0.34, 0.12], [0.16, 0.1], [0.44, 0]]) {
        const f = 470 * pj; chirp(v, tt, f * 0.94, f, d * 0.5, 0.7, 'triangle'); chirp(v, tt + d * 0.45, f, f * 0.9, d * 0.55, 0.7, 'triangle'); tt += d + gap;
      }
    } else {                                                   // robin: a little improvised phrase
      const n = 4 + Math.floor(rand() * 5);
      for (let i = 0; i < n; i++) { const d = rnd(0.05, 0.14), f = rnd(2500, 5600); chirp(v, tt, f, f * rnd(0.72, 1.35), d, rnd(0.25, 0.5)); tt += d + rnd(0.02, 0.08); }
    }
  }
  function farDog(t) {
    const v = mkVoice(t, { pan: rnd(-0.7, 0.7), distance: rnd(45, 70), volume: 1.6, send: 0.5 }, ambCfg, ambBus);
    if (!v) return;
    const size = rnd(0.45, 0.9), n = 2 + Math.floor(rand() * 3); let tt = t;
    for (let i = 0; i < n; i++) tt += barkCore(v, tt, size, 1) + rnd(0.16, 0.4);
  }
  function churchBell(t) {
    const v = mkVoice(t, { pan: rnd(-0.5, 0.5), distance: 55, volume: 2.2, send: 0.6 }, { dur: 6, send: 0.6 }, ambBus);
    if (!v) return;
    const f = 311, n = 1 + Math.floor(rand() * 3);
    for (let k = 0; k < n; k++) {
      const tt = t + k * 1.5;
      for (const [m, g0, d] of [[0.5, 0.5, 3.2], [1, 0.6, 2.6], [1.19, 0.4, 2.0], [1.5, 0.25, 1.5], [2, 0.3, 1.2], [2.51, 0.14, 0.8], [3.01, 0.1, 0.6]]) {
        const o = osc(v, 'sine', f * m, tt, tt + d + 0.03), g = G(0); perc(g.gain, tt, 0.004, g0 * 0.3, d); chain(o, g, v.in);
      }
    }
  }
  function ambienceEvents(n) {
    if (!layers.ambience) return;
    if (nextBird < 0) { nextBird = n + rnd(0.6, 2); nextFarDog = n + rnd(14, 30); nextBell = n + rnd(30, 60); }
    if (S.paused) return;
    const al = sm.alert;
    if (n >= nextBird) {
      bird(n + 0.03, Math.floor(rand() * 5), al);
      nextBird = n + rnd(1.6, 5.5) * lerp(1, 0.4, al);
    }
    if (n >= nextFarDog) { farDog(n + 0.05); nextFarDog = n + rnd(25, 60); }
    if (n >= nextBell) { churchBell(n + 0.05); nextBell = n + rnd(70, 140); }
  }

  // ---- music: look-ahead scheduler on the audio clock ----
  const BPM = 100, STEP = 60 / BPM / 4, LOOKAHEAD = 0.3;
  const PENT = [57, 60, 62, 64, 67, 69, 72, 74, 76, 79, 81, 84];
  const CALM = [                                               // two bars each
    { pad: [60, 64, 67, 74], root: 48 }, { pad: [57, 60, 64, 67], root: 45 },
    { pad: [57, 60, 65, 72], root: 53 }, { pad: [55, 60, 62, 67], root: 43 },
  ];
  const TENSE = [                                              // one bar each
    { pad: [57, 60, 64], root: 45 }, { pad: [57, 60, 64, 65], root: 45 }, { pad: [53, 57, 60], root: 41 }, { pad: [52, 55, 59], root: 40 },
  ];
  const mus = { started: false, next: 0, step: 0, mel: 5, lastTense: -9 };
  function mdone(node) { return () => { try { node.disconnect(); } catch (e) { /* gone */ } }; }
  // plucked FM note straight into a bus
  function mnote(dest, t, f, gain, dur, ratio, idx) {
    if (gain < 0.004) return;
    const c = ctx.createOscillator(), m = ctx.createOscillator(), mg = G(0), g = G(0);
    c.frequency.value = f; m.frequency.value = f * ratio;
    mg.gain.setValueAtTime(f * idx, t); mg.gain.exponentialRampToValueAtTime(Math.max(f * 0.01, 0.5), t + Math.min(0.1, dur));
    m.connect(mg); mg.connect(c.frequency); perc(g.gain, t, 0.004, gain, dur); chain(c, g, dest);
    c.start(t); m.start(t); c.stop(t + dur + 0.04); m.stop(t + dur + 0.04); c.onended = mdone(g);
  }
  function mpad(dest, t, notes, dur, gain, detune) {
    const g = G(0);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(gain, t + Math.min(0.9, dur * 0.35));
    g.gain.setValueAtTime(gain, t + dur - 0.2); g.gain.linearRampToValueAtTime(0, t + dur + 1.3);
    g.connect(dest);
    notes.forEach((n, i) => {
      const o = ctx.createOscillator(); o.type = i % 2 ? 'sine' : 'triangle'; o.frequency.value = mtof(n) * (1 + (i % 2 ? detune : -detune));
      o.connect(g); o.start(t); o.stop(t + dur + 1.35); if (i === 0) o.onended = mdone(g);
    });
  }
  function mnoise(dest, t, type, f, q, gain, d) {
    if (gain < 0.004) return;
    const s = ctx.createBufferSource(), fl = F(type, f, q), g = G(0);
    s.buffer = WHITE; s.loop = true; s.start(t, rand() * 1.8); s.stop(t + d + 0.03);
    perc(g.gain, t, 0.002, gain, d); chain(s, fl, g, dest); s.onended = mdone(g);
  }
  function musicStep(i, t) {
    const s = i % 16, bar = Math.floor(i / 16);
    const mv = sm.move, fl = sm.flow, dg = sm.danger, thin = 1 - 0.85 * sm.alert, calm = 1 - dg;
    const ch = CALM[Math.floor(bar / 2) % 4], tch = TENSE[bar % 4];
    // pads
    if (s === 0 && bar % 2 === 0 && dg < 0.97) mpad(calmPadBus, t, ch.pad, STEP * 32, 0.07, 0.003);
    if (s % 8 === 0 && dg > 0.04 && bar * 2 + s / 8 - mus.lastTense >= 2) {
      const left = (16 - s) * STEP; mpad(tensePadBus, t, tch.pad, left - 0.3, 0.12, 0.006); mus.lastTense = bar * 2 + s / 8 + (s ? -1 : 0);
    }
    // improvised mallet notes, with rests
    const strong = s % 4 === 0;
    let prob = (s % 2 === 0 ? lerp(0.2, 0.4, mv) : 0.05 * mv) * thin * (1 - 0.45 * dg);
    if (s === 0) prob += 0.25 * thin;
    if (rand() < prob) {
      mus.mel = clamp(mus.mel + [-2, -1, -1, 1, 1, 2, 0, -3, 3][Math.floor(rand() * 9)], dg > 0.5 ? 0 : 2, dg > 0.5 ? 7 : PENT.length - 1);
      let n = PENT[mus.mel];
      if (strong) {                                            // lean on chord tones on the beat
        const tones = dg > 0.5 ? tch.pad : ch.pad; let best = n, bd = 99;
        for (const c of tones) for (const oct of [0, 12]) { const d = Math.abs(c + oct - n); if (d < bd) { bd = d; best = c + oct; } }
        if (bd <= 2) n = best;
      }
      const vel = rnd(0.55, 1) * (strong ? 1 : 0.75);
      mnote(musicBus, t, mtof(n), 0.2 * vel, 0.55, 3, 1.1);
      if (rand() < 0.22 * thin) mnote(musicBus, t + STEP * 2, mtof(n + (rand() < 0.5 ? 12 : 7)), 0.07 * vel, 0.4, 3, 0.8);
    }
    // light pulse while moving: soft low marimba
    if (mv > 0.05 && (s % 4 === 0 || s === 14)) {
      const n = ch.root + (s === 8 || s === 14 ? 7 : s === 4 || s === 12 ? 12 : 0);
      mnote(musicBus, t, mtof(n), 0.46 * mv * thin * calm * (s === 0 ? 1 : 0.75), 0.3, 4, 0.5);
    }
    // flow: brighter arpeggio and a soft shaker
    if (fl > 0.08) {
      if (rand() > 0.12) {
        const pat = [0, 1, 2, 3, 2, 1, 2, 3], pn = ch.pad[pat[s % 8]] + 12 + (s >= 8 && s % 4 === 3 ? 12 : 0);
        mnote(musicBus, t, mtof(pn), 0.085 * fl * thin * calm * (s % 4 === 0 ? 1.2 : 0.85), 0.22, 2, 0.9);
      }
      mnoise(musicBus, t, 'highpass', 6500, 0.7, 0.06 * fl * thin * (s % 4 === 2 ? 1 : s % 2 ? 0.4 : 0.6), s % 4 === 2 ? 0.05 : 0.025);
    }
    // danger: low pulsing bass and faster ticking
    if (dg > 0.05) {
      if (s % 2 === 0) {
        const f = mtof(tch.root), o = ctx.createOscillator(), o2 = ctx.createOscillator(), lp = F('lowpass', 300, 1.5), g = G(0);
        o.type = 'sawtooth'; o2.type = 'square'; o.frequency.value = f; o2.frequency.value = f * 2.005;
        sweep(lp.frequency, t, 900, [0.12, 260]);
        perc(g.gain, t, 0.005, 0.6 * dg * (s % 4 === 0 ? 1 : 0.7), 0.2);
        const o2g = G(0.35); o.connect(lp); o2.connect(o2g); o2g.connect(lp); chain(lp, g, musicBus);
        o.start(t); o2.start(t); o.stop(t + 0.26); o2.stop(t + 0.26); o.onended = mdone(g);
      }
      mnoise(musicBus, t, 'bandpass', s % 4 === 0 ? 2100 : 2900, 9, 1.5 * dg * (s % 4 === 0 ? 1 : 0.5), 0.03);
      if (s === 6 || s === 14) mnote(musicBus, t, mtof(tch.pad[0] + 12 + (s === 14 ? 1 : 0)), 0.09 * dg, 0.25, 1.41, 1.5);   // uneasy semitone flicker
    }
  }
  function scheduleMusic(n) {
    if (!layers.music || !musicOn) { mus.started = false; return; }
    if (!mus.started || mus.next < n - 0.4) { mus.next = n + 0.08; mus.started = true; mus.step = Math.ceil(mus.step / 16) * 16; mus.lastTense = -9; }
    while (mus.next < n + LOOKAHEAD) { musicStep(mus.step, mus.next); mus.step++; mus.next += STEP; }
  }

  function update(dt, state) {
    const s = state || EMPTY, n = now();
    dt = clamp(+dt || 0, 0, 0.1);
    S.speed = Math.max(0, +s.speed || 0); S.surface = s.surface || 'ground'; S.airborne = !!s.airborne; S.height = Math.max(0, +s.height || 0);
    S.alert = clamp(+s.alert || 0, 0, 1); S.danger = clamp(+s.danger || 0, 0, 1); S.inTree = clamp(+s.inTree || 0, 0, 1);
    S.flow = clamp(+s.flow || 0, 0, 1); S.paused = !!s.paused;
    const k = 1 - Math.exp(-dt * 5), kf = 1 - Math.exp(-dt * 14), ks = 1 - Math.exp(-dt * 2.2);
    sm.air += ((S.airborne ? 1 : 0) - sm.air) * kf;
    sm.speed += (S.speed - sm.speed) * kf; sm.height += (S.height - sm.height) * k; sm.inTree += (S.inTree - sm.inTree) * k;
    sm.alert += (S.alert - sm.alert) * k;
    sm.move += ((S.paused ? 0 : clamp((S.speed - 0.5) / 5, 0, 1)) - sm.move) * ks;
    sm.flow += (S.flow - sm.flow) * ks; sm.danger += (S.danger - sm.danger) * ks;
    if (!beds) beds = startBeds();
    footsteps(dt, n);
    if (n - lastParam >= 0.05 || n < lastParam) { updateBeds(n); lastParam = n; }
    ambienceEvents(n);
    scheduleMusic(n);
  }

  return {
    ctx, play, update, now,
    setTime(t) { vt = t; },
    setVolume(v) { volume = clamp(+v || 0, 0, 1); applyOut(); },
    setMuted(b) { muted = !!b; applyOut(); },
    setMusicEnabled(b) { musicOn = !!b; if (!musicOn) musicBus.gain.setTargetAtTime(0, now(), 0.15); else if (beds) musicBus.gain.setTargetAtTime(MUSIC_LEVEL, now(), 0.3); },
    pumpMusic() { if (beds) scheduleMusic(now()); },
    activeVoices() { const n = now(); let c = 0; for (const e of ends) if (e > n) c++; return c; },
  };
}

// ---------------------------------------------------------------------------------------------
// The live audio object. Everything is a silent no-op before unlock() and nothing ever throws.
export function createAudio() {
  let ctx = null, eng = null, volume = 1, muted = false, musicOn = true, hooked = false, lastUpdate = 0, timer = 0;
  const warned = {};
  const safe = (label, fn) => { try { return fn(); } catch (e) { if (!warned[label]) { warned[label] = 1; console.warn('[audio] ' + label + ': ' + (e && e.message)); } } };
  const hidden = () => typeof document !== 'undefined' && document.visibilityState === 'hidden';

  function resume() {
    if (!ctx || hidden()) return;
    if (ctx.state !== 'running') { const p = ctx.resume(); if (p && p.catch) p.catch(() => {}); }
  }
  function kick() {                                            // iOS Safari only really starts after a buffer has been played inside a gesture
    const b = ctx.createBuffer(1, 1, 22050), s = ctx.createBufferSource();
    s.buffer = b; s.connect(ctx.destination); s.start(0); s.onended = () => { try { s.disconnect(); } catch (e) { /* gone */ } };
  }
  function onVisibility() {
    safe('visibility', () => {
      if (!ctx) return;
      if (hidden()) { const p = ctx.suspend(); if (p && p.catch) p.catch(() => {}); } else resume();
    });
  }
  function onGesture() { safe('gesture', () => { if (ctx && ctx.state !== 'running' && !hidden()) { kick(); resume(); } }); }
  function hook() {
    if (hooked || typeof document === 'undefined') return; hooked = true;
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pageshow', onVisibility);
    for (const ev of ['touchend', 'pointerup', 'keydown', 'click']) window.addEventListener(ev, onGesture, { passive: true, capture: true });
    ctx.onstatechange = () => { if (ctx.state === 'interrupted' || (ctx.state === 'suspended' && !hidden())) resume(); };
    // keeps the music scheduler fed if a few frames are dropped (update() stays the main driver)
    timer = setInterval(() => safe('timer', () => {
      if (eng && ctx.state === 'running' && lastUpdate && performance.now() - lastUpdate < 2000) eng.pumpMusic();
    }), 120);
  }

  const audio = {
    get unlocked() { return !!ctx && ctx.state === 'running'; },
    get context() { return ctx; },
    unlock() {
      return !!safe('unlock', () => {
        if (!ctx) {
          const AC = typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext);
          if (!AC) return false;
          ctx = new AC({ latencyHint: 'interactive' });
          eng = createEngine(ctx);
          eng.setVolume(volume); eng.setMuted(muted); eng.setMusicEnabled(musicOn);
          hook();
        }
        kick(); resume();
        return true;
      });
    },
    setVolume(v) { volume = clamp(+v || 0, 0, 1); if (eng) safe('setVolume', () => eng.setVolume(volume)); },
    setMuted(b) { muted = !!b; if (eng) safe('setMuted', () => eng.setMuted(muted)); },
    setMusicEnabled(b) { musicOn = !!b; if (eng) safe('setMusicEnabled', () => eng.setMusicEnabled(musicOn)); },
    play(name, opts) { if (eng && ctx.state === 'running') safe('play ' + name, () => eng.play(name, opts)); },
    update(dt, state) {
      if (!eng || ctx.state !== 'running') return;
      lastUpdate = performance.now();
      safe('update', () => eng.update(dt, state));
    },
    names: SOUND_NAMES,
    dispose() {
      safe('dispose', () => {
        clearInterval(timer);
        if (hooked) {
          document.removeEventListener('visibilitychange', onVisibility); window.removeEventListener('pageshow', onVisibility);
          for (const ev of ['touchend', 'pointerup', 'keydown', 'click']) window.removeEventListener(ev, onGesture, { capture: true });
        }
        if (ctx) ctx.close(); ctx = null; eng = null; hooked = false;
      });
    },
  };
  return audio;
}
