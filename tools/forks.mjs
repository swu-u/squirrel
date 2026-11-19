// Controller tests for climbing and forks: node tools/forks.mjs
// A tree: trunk to 6 m, splitting into a left and a right limb, plus a side branch at 3 m that
// itself forks. The camera looks along -z (yaw 0) unless a test says otherwise.
import * as THREE from 'three';
import { World } from '../src/core/world.js';
import { Player } from '../src/player/controller.js';
const V = (x, y, z) => new THREE.Vector3(x, y, z);

function tree() {
  const w = new World();
  w.addCapsule(V(0, -0.5, -6), V(0, 6, -6), 0.45, 0.3, { kind: 'trunk' });
  w.addCapsule(V(0, 6, -6), V(-3, 8.5, -6.5), 0.25, 0.08, { kind: 'branch' });   // top fork, left
  w.addCapsule(V(0, 6, -6), V(3, 8.8, -6.3), 0.25, 0.08, { kind: 'branch' });    // top fork, right
  w.addCapsule(V(0, 3, -6), V(0.3, 3.6, -10), 0.2, 0.12, { kind: 'branch' });   // side branch going away
  w.addCapsule(V(0.2, 3.4, -8.5), V(-2.5, 4.2, -11), 0.12, 0.05, { kind: 'branch' }); // its left fork
  w.addCapsule(V(0.2, 3.4, -8.5), V(2.5, 4.4, -11), 0.12, 0.05, { kind: 'branch' });  // its right fork
  return w;
}

let fails = 0;
function run(name, frames, step, check, start = V(0, 0.2, -2), yaw = 0) {
  const w = tree(); const p = new Player(w); p.teleport(start, V(0, 0, -1));
  const inp = { moveX: 0, moveY: 0, jumpPressed: false, jumpHeld: false };
  let maxY = -1e9, stall = 0, maxStall = 0, lastPos = p.pos.clone();
  for (let f = 0; f < frames; f++) {
    inp.jumpPressed = false; step(f, inp, p);
    p.update(1 / 60, inp, yaw);
    maxY = Math.max(maxY, p.pos.y);
    const moved = p.pos.distanceTo(lastPos); lastPos.copy(p.pos);
    if (p.mode === 'surface' && (inp.moveX || inp.moveY) && moved < 0.002 && !p.atTip) { stall++; maxStall = Math.max(maxStall, stall); } else stall = 0;
    if (!isFinite(p.pos.x + p.pos.y + p.pos.z)) { console.log('NaN'); break; }
  }
  const ok = check(p, { maxY, maxStall });
  if (!ok) fails++;
  console.log(ok ? 'PASS' : 'FAIL', name, '| end', p.mode, p.prim && p.prim.kind, p.pos.toArray().map((v) => v.toFixed(2)).join(','), '| max height', maxY.toFixed(2), '| longest stall', maxStall);
}

// 1. hold up from the ground: climb the trunk and keep going up, never turn round
run('hold up climbs to the top', 300, (f, i) => { i.moveY = 1; }, (p, s) => s.maxY > 7 && p.pos.y > 6);
// 2. same, camera on the far side of the tree (looking +z), approaching from behind
run('hold up from the far side', 300, (f, i) => { i.moveY = 1; }, (p, s) => s.maxY > 7 && p.pos.y > 6, V(0, 0.2, -10), Math.PI);
// 3. at the top fork, up-right takes the right limb, up-left the left limb
run('up-right takes the right fork', 320, (f, i, p) => { i.moveY = 1; i.moveX = p.pos.y > 4.5 ? 0.8 : 0; }, (p) => p.pos.x > 1.5 && p.pos.y > 7);
run('up-left takes the left fork', 320, (f, i, p) => { i.moveY = 1; i.moveX = p.pos.y > 4.5 ? -0.8 : 0; }, (p) => p.pos.x < -1.5 && p.pos.y > 7);
// 4. from the side branch: start on it, run out (away from the camera), then pick a fork
run('side branch, right fork', 200, (f, i, p) => { i.moveY = 1; i.moveX = p.pos.z < -8 ? 0.8 : 0; }, (p) => p.pos.x > 1.2 && p.pos.z < -9.5, V(0.05, 3.6, -6.8));
run('side branch, left fork', 200, (f, i, p) => { i.moveY = 1; i.moveX = p.pos.z < -8 ? -0.8 : 0; }, (p) => p.pos.x < -1.2 && p.pos.z < -9.5, V(0.05, 3.6, -6.8));
// 5. come back: hold down on the side branch walks back toward the trunk
run('down walks back to the trunk', 150, (f, i) => { i.moveY = -1; }, (p, s) => p.pos.z > -7.2 && s.maxStall < 20, V(0.1, 3.75, -9));
// 6. hold down on the trunk climbs down
run('hold down climbs down', 300, (f, i, p) => { i.moveY = f < 150 ? 1 : -1; }, (p) => p.pos.y < 1);

console.log(fails ? fails + ' failed' : 'all passed');
process.exit(fails ? 1 : 0);
