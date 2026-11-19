// A short guided run of goals that teaches the game, then opens into free roaming.
// Each quest: { title, text, total?, progress(g), done(g), target(g) -> Vector3 | null, label }
import * as THREE from 'three';

const _v = new THREE.Vector3();

export function createQuests(g) {
  // g: { layout, player, pickups, stats, dogs() }
  const L = g.layout.landmarks || {};
  const near = (p, r) => p && g.player.pos.distanceTo(p) < r;
  const nearestAcorn = () => { const a = g.pickups.nearest(g.player.pos, 'acorn'); return a ? a.base : null; };
  const nearestGolden = () => { const a = g.pickups.nearest(g.player.pos, 'golden'); return a ? a.base : null; };
  const zoneOf = (kind) => { const z = (g.layout.dogZones || []).filter((q) => !kind || q.kind === kind); let b = null, bd = 1e9; for (const q of z) { const d = q.center.distanceTo(g.player.pos); if (d < bd) { bd = d; b = q; } } return b ? _v.copy(b.center).setY(b.center.y + 1.2) : null; };
  const s = g.stats;
  const list = [
    { title: 'Breakfast', text: g.touch ? 'Run with your left thumb and grab 5 acorns' : 'Run with W A S D and grab 5 acorns', total: 5,
      start() { this.base = s.acorns; }, progress() { return s.acorns - this.base; }, target: nearestAcorn, label: 'Acorn' },
    { title: 'Stop and look', text: 'Stand still until the ring fills, then go: you burst into a sprint',
      start() { this.base = s.bursts; }, done() { return s.bursts > this.base; }, target: () => null },
    { title: 'Home tree', text: 'Run straight at the big oak and keep going up to your nest',
      done() { return near(g.layout.home, 3.2); }, target: () => g.layout.home, label: 'Nest' },
    { title: 'Branch to branch', text: 'Aim at a glowing ring and press Jump. Hold Jump to keep leaping. Chain 3 leaps', total: 3,
      progress() { return Math.min(3, s.bestComboNow); }, start() { s.bestComboNow = 0; }, target: () => null },
    { title: 'The high wire', text: 'Leap from the trees to a pole and run along the power line', total: 12,
      start() { this.base = s.wireDist; }, progress() { return Math.floor(s.wireDist - this.base); }, target: () => L.firstPole || null, label: 'Pole' },
    { title: 'Rooftops', text: 'Follow the wire across the street onto a roof',
      done() { return s.onRoof; }, target: () => L.firstRoof || null, label: 'Roof' },
    { title: 'Guard dog', text: g.touch ? 'Chase a dog off: throw nuts with Attack, or drop on it from above' : 'Chase a dog off: throw nuts with F, or drop on it from above',
      start() { this.base = s.dogs; }, done() { return s.dogs > this.base; }, target: () => zoneOf(), label: 'Dog', skipIf: () => !g.hasDogs() },
    { title: 'Something shiny', text: 'Golden acorns hide in hard places. Find one',
      start() { this.base = s.golden; }, done() { return s.golden > this.base; }, target: nearestGolden, label: 'Golden acorn' },
    { title: 'Top of the town', text: 'Climb the church steeple, the highest point in town',
      done() { return L.steeple && g.player.pos.y > L.steeple.y - 3.5 && Math.hypot(g.player.pos.x - L.steeple.x, g.player.pos.z - L.steeple.z) < 5; }, target: () => L.steeple || null, label: 'Steeple' },
    { title: 'The bulldog', text: 'The bulldog guards a golden acorn in his yard. Send him packing',
      done() { return s.bulldog; }, target: () => L.bulldogYard || zoneOf('bulldog'), label: 'Bulldog', skipIf: () => !g.hasDogs() },
    { title: 'Winter store', text: 'Gather 120 acorns and 8 golden acorns before the frost', total: 120,
      progress() { return Math.min(120, s.acorns); }, done() { return s.acorns >= 120 && s.golden >= 8; }, target: () => (s.golden < 8 ? nearestGolden() : nearestAcorn()), label: '', final: true },
  ];

  const q = {
    index: 0, current: null, finished: false, justCompleted: null, justStarted: false,
    setIndex(i) {
      this.index = i; this.current = list[i] || null; this.finished = !this.current;
      while (this.current && this.current.skipIf && this.current.skipIf()) { this.index++; this.current = list[this.index] || null; this.finished = !this.current; }
      if (this.current && this.current.start) this.current.start();
      this.justStarted = true;
    },
    update() {
      this.justCompleted = null;
      const c = this.current;
      if (!c) return;
      const prog = c.progress ? c.progress() : 0;
      const done = c.done ? c.done() : (c.total ? prog >= c.total : false);
      if (done) { this.justCompleted = c; this.setIndex(this.index + 1); }
    },
    view() {
      const c = this.current;
      if (!c) return { title: 'Free roaming', text: 'The whole town is yours. Find every golden acorn', progress: g.stats.golden, total: g.pickups.goldenTotal };
      return { title: c.title, text: c.text, progress: c.progress ? c.progress() : undefined, total: c.total };
    },
    target() { const c = this.current; if (!c) { return nearestGolden(); } return c.target ? c.target() : null; },
    label() { return this.current ? this.current.label || '' : 'Golden acorn'; },
    count: list.length,
  };
  return q;
}
