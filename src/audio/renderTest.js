// Offline render test for the audio engine: renders every one-shot and a set of update() scenarios with an
// OfflineAudioContext and measures them (length, peak, RMS, NaN, clipping, spectral centroid).
// Also holds the scripted scenes used by dev/audio.html, so the live page and the test play the same thing.
import { createEngine, SOUND_NAMES, SURFACES } from './audio.js';

const SR = 44100;
const clamp = (x, a, b) => (x < a ? a : x > b ? b : x);
const ramp = (t, t0, t1) => clamp((t - t0) / (t1 - t0), 0, 1);
const BASE = { speed: 0, surface: 'ground', airborne: false, height: 0, alert: 0, danger: 0, inTree: 0, flow: 0, paused: false };

// ---- scripted scenes: state(t) plus timed one-shots ----
export const SCENES = {
  'run then freeze': {
    dur: 11,
    state: (t) => ({ ...BASE, speed: t < 3.5 ? 8 : t < 7.5 ? 0 : 9, alert: t < 3.5 ? 0 : t < 7.5 ? ramp(t, 3.5, 3.9) : 1 - ramp(t, 7.5, 7.7), inTree: 0.2 }),
    events: [[5.6, 'chatter', {}], [7.5, 'burst', {}]],
    segments: [[0.5, 3.5, 'run'], [4.5, 7.5, 'freeze'], [8, 11, 'run again']],
  },
  'leap chain with pickups': (() => {
    const events = [], hop = 1.15, n = 8;
    for (let i = 0; i < n; i++) {
      const t0 = 0.8 + i * hop, wire = i === 4;
      events.push([t0, 'jump', { power: 0.6 + 0.05 * i, surface: 'wood' }]);
      events.push([t0 + 0.28, 'pickup', { streak: i }]);
      events.push([t0 + 0.55, 'land', { impact: 0.4 + 0.05 * i, surface: wire ? 'wire' : 'wood' }]);
      events.push([t0 + 0.55, wire ? 'wire' : 'leaves', wire ? { impact: 0.7 } : { amount: 0.6 }]);
    }
    events.push([0.8 + n * hop, 'golden', {}]);
    return {
      dur: 12,
      state: (t) => {
        const ph = ((t - 0.8) / hop) % 1, on = t > 0.8 && t < 0.8 + n * hop, idx = Math.floor((t - 0.8) / hop);
        return { ...BASE, speed: 7.5, surface: on && idx === 4 && ph > 0.47 ? 'wire' : 'wood', airborne: on && ph < 0.47, height: 8, inTree: 1, flow: ramp(t, 1, 6) * (1 - ramp(t, 10.5, 12)) };
      },
      events,
    };
  })(),
  'dog chase': {
    dur: 13,
    state: (t) => ({
      ...BASE, speed: t < 1 ? 3 : t < 7.2 ? 9 + 3 * ramp(t, 2, 2.6) : t < 8 ? 9 : 5,
      airborne: t > 7.2 && t < 7.7, danger: ramp(t, 1, 1.6) * (1 - ramp(t, 8.2, 9.5)), height: t > 7.2 && t < 7.7 ? 2 : 0,
    }),
    events: [
      [1, 'notice', { size: 0.85, distance: 12, pan: -0.5 }], [2, 'burst', {}],
      ...[2.3, 3.0, 3.6, 4.3, 4.9].map((t, i) => [t, 'bark', { size: 0.85, distance: 12 - i * 2, pan: -0.5 + i * 0.2, count: i % 2 ? 2 : 1 }]),
      [3.2, 'bark', { size: 0.1, distance: 18, pan: 0.6, count: 3 }],
      [5.3, 'growl', { size: 0.85, distance: 3 }], [6.1, 'lunge', { distance: 1 }], [6.2, 'hurt', {}],
      [7.2, 'jump', { power: 1 }], [7.7, 'pounce', {}], [7.75, 'yelp', { size: 0.85, distance: 1 }],
      [8.3, 'chatter', {}], [10.3, 'questDone', {}],
    ],
    segments: [[2, 7, 'chase'], [10.5, 13, 'after']],
  },
};

// ---- rendering ----
async function render(seconds, layers, build) {
  const OAC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
  const ctx = new OAC(2, Math.ceil(seconds * SR), SR);
  const eng = createEngine(ctx, { offline: true, seed: 12345, layers });
  build(eng);
  return ctx.startRendering();
}
export function renderOneShot(name, opts, seconds = 3) {
  return render(seconds, null, (eng) => { eng.setTime(0.05); eng.play(name, opts); });
}
// scene = { dur, state(t), events? }. Steps the engine at 60 frames a second, with an optional dropped-frame stutter.
export function renderScene(scene, layers, stutter = false) {
  return render(scene.dur, layers, (eng) => {
    const ev = (scene.events || []).slice().sort((a, b) => a[0] - b[0]);
    let e = 0, t = 0, f = 0;
    while (t < scene.dur) {
      const dt = stutter && f % 37 === 0 ? 0.18 : 1 / 60;
      eng.setTime(t);
      while (e < ev.length && ev[e][0] <= t) { eng.play(ev[e][1], ev[e][2]); e++; }
      eng.update(dt, scene.state(t));
      t += dt; f++;
    }
  });
}

// ---- measuring ----
function fft(re, im) {
  const n = re.length;
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) { let x = re[i]; re[i] = re[j]; re[j] = x; x = im[i]; im[i] = im[j]; im[j] = x; }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const ang = -2 * Math.PI / len, wr = Math.cos(ang), wi = Math.sin(ang);
    for (let i = 0; i < n; i += len) {
      let cr = 1, ci = 0;
      for (let k = 0; k < len / 2; k++) {
        const a = i + k, b = a + len / 2, xr = re[b] * cr - im[b] * ci, xi = re[b] * ci + im[b] * cr;
        re[b] = re[a] - xr; im[b] = im[a] - xi; re[a] += xr; im[a] += xi;
        const t = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = t;
      }
    }
  }
}
const N = 2048, HANN = new Float32Array(N).map((_, i) => 0.5 - 0.5 * Math.cos(2 * Math.PI * i / N));
export function measure(buf, t0 = 0, t1 = Infinity) {
  const L = buf.getChannelData(0), R = buf.numberOfChannels > 1 ? buf.getChannelData(1) : L;
  const i0 = Math.floor(t0 * SR), i1 = Math.min(L.length, Math.floor(t1 * SR));
  let peak = 0, nan = false, first = -1, last = -1, sum = 0;
  for (let i = i0; i < i1; i++) {
    const a = L[i], b = R[i];
    if (a !== a || b !== b || !isFinite(a) || !isFinite(b)) { nan = true; continue; }
    const m = Math.max(Math.abs(a), Math.abs(b));
    if (m > peak) peak = m;
    if (m > 0.004) { if (first < 0) first = i; last = i; }
    sum += (a * a + b * b) * 0.5;
  }
  const span = first < 0 ? 0 : last - first + 1;
  let act = 0;
  if (span) for (let i = first; i <= last; i++) act += (L[i] * L[i] + R[i] * R[i]) * 0.5;
  // centroid: magnitude spectra summed over the whole span
  const re = new Float32Array(N), im = new Float32Array(N); let num = 0, den = 0;
  for (let p = Math.max(i0, first - 256); p + N <= Math.max(i1, 0) && p <= last && first >= 0; p += N / 2) {
    for (let i = 0; i < N; i++) { re[i] = (L[p + i] + R[p + i]) * 0.5 * HANN[i]; im[i] = 0; }
    fft(re, im);
    for (let k = 1; k < N / 2; k++) { const m = Math.hypot(re[k], im[k]); num += m * k * SR / N; den += m; }
  }
  // onsets a second (for footsteps): rising edges of a fast envelope
  let env = 0, on = false, onsets = 0, hold = 0;
  const thr = peak * 0.3, rel = Math.exp(-1 / (SR * 0.004));
  for (let i = i0; i < i1; i++) {
    const m = Math.abs(L[i] + R[i]) * 0.5; env = m > env ? m : env * rel;
    if (hold > 0) hold--;
    if (!on && env > thr && hold === 0) { on = true; onsets++; hold = Math.floor(SR * 0.008); } else if (on && env < thr * 0.35) on = false;
  }
  return {
    dur: span / SR, peak, rms: span ? Math.sqrt(act / span) : 0, rmsAll: Math.sqrt(sum / Math.max(1, i1 - i0)),
    centroid: den > 0 ? num / den : 0, nan, clipped: peak >= 0.985, onsets: onsets / ((i1 - i0) / SR),
  };
}

// ---- the test ----
const ONE_SHOTS = [
  ['jump', { power: 0.2 }], ['jump', { power: 1 }],
  ...SURFACES.map((s) => ['land', { impact: 0.2, surface: s }]), ...SURFACES.map((s) => ['land', { impact: 1, surface: s }]),
  ...SURFACES.map((s) => ['step', { surface: s }]),
  ...[0, 3, 6, 9, 12].map((s) => ['pickup', { streak: s }]),
  ['golden'], ['burst'], ['charge'], ['throw'], ['nutHit'], ['scratch'], ['pounce'], ['hurt'], ['chatter'],
  ['bark', { size: 0 }], ['bark', { size: 0.5 }], ['bark', { size: 1 }], ['bark', { size: 0.8, count: 3 }], ['bark', { size: 0.8, distance: 30, pan: -0.7 }],
  ['growl', { size: 0.2 }], ['growl', { size: 1 }], ['notice', { size: 0.8 }], ['lunge'], ['yelp', { size: 0.2 }], ['yelp', { size: 0.9 }],
  ['questDone'], ['questNew'], ['uiTap'], ['respawn'], ['leaves', { amount: 0.2 }], ['leaves', { amount: 1 }], ['wire', { impact: 0.3 }], ['wire', { impact: 1 }],
  ['pickup', { streak: 4, pitch: 0.5, volume: 0.5, pan: 1 }],
];
const MAX_LEN = { jump: 0.6, land: 0.6, step: 0.25, pickup: 1.6, golden: 4, burst: 1.3, charge: 0.6, throw: 0.5, nutHit: 0.6, scratch: 0.5, pounce: 1.1, hurt: 0.7, chatter: 1.6, bark: 1.7, growl: 2.2, notice: 1.4, lunge: 0.6, yelp: 2.2, questDone: 3, questNew: 2, uiTap: 0.25, respawn: 3, leaves: 1, wire: 2 };
const ONLY = (k) => ({ steps: false, wind: false, ambience: false, music: false, [k]: true });
const hold = (dur, st) => ({ dur, state: () => ({ ...BASE, ...st }) });

export async function renderTest(onProgress) {
  const rows = [], problems = [], byKey = {};
  const add = (group, label, m, extra = '') => {
    const row = Object.assign(m, { group, label, extra }); rows.push(row); byKey[label] = m;
    if (m.nan) problems.push(label + ': NaN or infinite samples');
    if (m.clipped) problems.push(label + ': clipped, peak ' + m.peak.toFixed(3));
    if (m.peak < 0.012) problems.push(label + ': silent or far too quiet, peak ' + m.peak.toFixed(4));
    return m;
  };
  const check = (ok, text) => { if (!ok) problems.push('CHECK FAILED: ' + text); };

  // every one-shot
  const seen = new Set();
  for (const [name, opts] of ONE_SHOTS) {
    seen.add(name);
    const label = name + (opts ? ' ' + JSON.stringify(opts).replace(/"/g, '') : '');
    const m = add('one-shot', label, measure(await renderOneShot(name, opts, (MAX_LEN[name] || 2) + 1.5)));
    if (m.dur > MAX_LEN[name]) problems.push(label + ': too long, ' + m.dur.toFixed(2) + ' s (limit ' + MAX_LEN[name] + ')');
    if (onProgress) onProgress(label);
  }
  for (const n of SOUND_NAMES) if (!seen.has(n)) problems.push('one-shot not covered by the test: ' + n);
  const c = (k) => byKey[k] ? byKey[k].centroid : NaN;
  for (const [a, b] of [[0, 3], [3, 6], [6, 9], [9, 12]]) check(c(`pickup {streak:${b}}`) > c(`pickup {streak:${a}}`), `pickup streak ${b} is brighter than streak ${a}`);
  check(c('bark {size:0}') > c('bark {size:0.5}') && c('bark {size:0.5}') > c('bark {size:1}'), 'terrier bark is higher than the middle bark, which is higher than the bulldog bark');
  check(byKey['bark {size:1}'].dur > byKey['bark {size:0}'].dur, 'bulldog bark is longer than terrier bark');
  check(c('yelp {size:0.2}') > c('yelp {size:0.9}'), 'small dog yelp is higher than big dog yelp');
  check(c('step {surface:wire}') > c('step {surface:wood}') && c('step {surface:wood}') > c('step {surface:roof}') && c('step {surface:roof}') > c('step {surface:ground}'), 'step brightness: wire > wood > roof > ground');
  check(byKey['land {impact:1,surface:ground}'].rms > byKey['land {impact:0.2,surface:ground}'].rms, 'hard landing is louder than soft landing');
  check(byKey['bark {size:0.8,distance:30,pan:-0.7}'].peak < byKey['bark {size:0.5}'].peak * 0.6, 'distance makes the bark quieter');

  // update(): each layer on its own
  const scen = async (group, label, scene, layers, stutter) => { const b = await renderScene(scene, layers, stutter); if (onProgress) onProgress(label); return [b, add(group, label, measure(b, 0.3))]; };
  for (const s of SURFACES) {
    const [, m] = await scen('footsteps', 'steps ' + s + ' at 8 m/s', hold(3, { speed: 8, surface: s }), ONLY('steps'));
    m.extraOnsets = true;
  }
  const [, slow] = await scen('footsteps', 'steps ground at 2 m/s', hold(3, { speed: 2 }), ONLY('steps'));
  const [, fast] = await scen('footsteps', 'steps ground at 12 m/s', hold(3, { speed: 12 }), ONLY('steps'));
  slow.extraOnsets = fast.extraOnsets = true;
  check(fast.onsets > slow.onsets, 'footsteps are faster at 12 m/s than at 2 m/s');
  check(c('steps wire at 8 m/s') > c('steps wood at 8 m/s') && c('steps wood at 8 m/s') > c('steps ground at 8 m/s'), 'running brightness: wire > wood > ground');
  const quiet = measure(await renderScene(hold(2, { speed: 8, airborne: true }), ONLY('steps')));
  check(quiet.peak < 0.001, 'no footsteps while airborne'); rows.push({ group: 'footsteps', label: 'steps while airborne (must be silent)', ...quiet, extra: '' });
  const still = measure(await renderScene(hold(2, { speed: 0 }), ONLY('steps')));
  check(still.peak < 0.001, 'no footsteps while still'); rows.push({ group: 'footsteps', label: 'steps while still (must be silent)', ...still, extra: '' });

  const [, w0] = await scen('wind', 'wind: still on the ground', hold(4, {}), ONLY('wind'));
  const [, w1] = await scen('wind', 'wind: running 12 m/s', hold(4, { speed: 12 }), ONLY('wind'));
  const [, w2] = await scen('wind', 'wind: still, 20 m up', hold(4, { height: 20 }), ONLY('wind'));
  const [, w3] = await scen('wind', 'wind: airborne at 9 m/s', hold(4, { speed: 9, airborne: true, height: 6 }), ONLY('wind'));
  check(w1.rmsAll > w0.rmsAll * 2 && w1.centroid > w0.centroid, 'wind is stronger and brighter when running');
  check(w2.rmsAll > w0.rmsAll * 1.5, 'wind is stronger high up'); check(w3.rmsAll > w0.rmsAll * 2, 'wind rushes while airborne');

  const [, a0] = await scen('ambience', 'ambience: normal', hold(14, {}), ONLY('ambience'));
  const [, a1] = await scen('ambience', 'ambience: alert (frozen, listening)', hold(14, { alert: 1 }), ONLY('ambience'));
  const [, a2] = await scen('ambience', 'ambience: in a tree', hold(14, { inTree: 1 }), ONLY('ambience'));
  await scen('ambience', 'ambience: 75 s (far dog and church bell included)', hold(75, {}), ONLY('ambience'));
  check(a1.rmsAll > a0.rmsAll * 1.2 && a1.centroid > a0.centroid, 'ambience opens up (louder and brighter) when alert');
  check(a2.rmsAll > a0.rmsAll, 'more leaf rustle in a tree');

  const [, m0] = await scen('music', 'music: at rest', hold(12, {}), ONLY('music'));
  const [, m1] = await scen('music', 'music: moving', hold(12, { speed: 7 }), ONLY('music'));
  const [, m2] = await scen('music', 'music: moving with full flow', hold(12, { speed: 8, flow: 1 }), ONLY('music'));
  const [, m3] = await scen('music', 'music: danger', hold(12, { speed: 9, danger: 1 }), ONLY('music'));
  const [, m4] = await scen('music', 'music: alert (thinned out)', hold(12, { alert: 1 }), ONLY('music'));
  const [, m5] = await scen('music', 'music: moving, with dropped frames', hold(12, { speed: 7 }), ONLY('music'), true);
  check(m1.rmsAll > m0.rmsAll, 'music gains a pulse when moving'); check(m2.centroid > m1.centroid, 'flow makes the music brighter');
  check(m4.rmsAll < m0.rmsAll * 0.6, 'music thins out when alert'); check(m3.rmsAll > m0.rmsAll, 'danger variation is present');
  check(Math.abs(m5.rmsAll - m1.rmsAll) < m1.rmsAll * 0.35, 'music holds up when frames drop');

  // whole scenes, full mix
  for (const [name, scene] of Object.entries(SCENES)) {
    const [b] = await scen('scene (full mix)', 'scene: ' + name, scene);
    for (const [t0, t1, lab] of scene.segments || []) add('scene (full mix)', '   part: ' + lab, measure(b, t0, t1));
  }
  const worst = await scen('scene (full mix)', 'stress: everything at once', {
    dur: 4, state: () => ({ ...BASE, speed: 12, surface: 'roof', danger: 1, flow: 1, inTree: 1, height: 15 }),
    events: SOUND_NAMES.map((n, i) => [0.5 + (i % 6) * 0.02, n, { size: 1, impact: 1, power: 1 }]),
  });
  check(!worst[1].clipped, 'the limiter holds when every sound fires at once');

  const f = (x, n = 3) => (x == null ? '' : x.toFixed(n));
  const lines = ['group             | sound                                              | length s | peak  | rms   | centroid Hz | NaN | clip | notes'];
  for (const r of rows) {
    lines.push([r.group.padEnd(17), r.label.padEnd(50), f(r.dur, 2).padStart(8), f(r.peak).padStart(5), f(r.rms).padStart(5), String(Math.round(r.centroid)).padStart(11),
      r.nan ? 'YES' : 'no ', r.clipped ? 'YES ' : 'no  ', r.extraOnsets ? r.onsets.toFixed(1) + ' ticks a second' : ''].join(' | '));
  }
  lines.push('', problems.length ? 'PROBLEMS (' + problems.length + '):\n' + problems.join('\n') : 'ALL CHECKS PASSED: every sound exists, is audible, has no NaN, does not clip, and has a sensible length and brightness.');
  return { ok: problems.length === 0, problems, rows, text: lines.join('\n') };
}

// Calls every method on a fresh audio object before unlock(). Returns 'ok' or the error.
export function preUnlockTest(createAudio) {
  try {
    const a = createAudio();
    a.setVolume(0.5); a.setMuted(true); a.setMuted(false); a.setMusicEnabled(false); a.setMusicEnabled(true);
    for (const n of SOUND_NAMES) { a.play(n); a.play(n, { volume: 1, pitch: 1.2, pan: -1, distance: 10, size: 1, streak: 5, impact: 1, power: 1, surface: 'wire' }); }
    a.play('does not exist'); a.play(); a.play(null, null);
    a.update(0.016, { ...BASE, speed: 8 }); a.update(0.016); a.update(); a.update(NaN, null); a.update(0.016, { paused: true });
    if (a.unlocked) return 'error: reports unlocked before unlock()';
    return 'ok: ' + (SOUND_NAMES.length * 2 + 12) + ' calls before unlock(), nothing thrown';
  } catch (e) { return 'error: ' + e.message; }
}
