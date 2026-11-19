// Particles (leaf puffs, dust, sparkles, speed streaks, drifting leaves), the jump target ring,
// and thrown nuts.
import * as THREE from 'three';

const MAX = 520;
const _v = new THREE.Vector3();

function makeAtlas() {
  // 2 x 2 atlas: 0 soft dot, 1 leaf, 2 star, 3 streak
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const g = c.getContext('2d');
  let gr = g.createRadialGradient(64, 64, 0, 64, 64, 60);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.4, 'rgba(255,255,255,0.55)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
  // leaf
  g.save(); g.translate(192, 64); g.rotate(0.5); g.fillStyle = '#fff';
  g.beginPath(); g.moveTo(0, -50); g.bezierCurveTo(38, -30, 34, 26, 0, 50); g.bezierCurveTo(-34, 26, -38, -30, 0, -50); g.fill();
  g.strokeStyle = 'rgba(0,0,0,0.25)'; g.lineWidth = 3; g.beginPath(); g.moveTo(0, -44); g.lineTo(0, 46); g.stroke(); g.restore();
  // star
  g.save(); g.translate(64, 192); g.fillStyle = '#fff'; g.beginPath();
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, r = i % 2 ? 12 : 54; g.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
  g.closePath(); g.fill(); g.restore();
  gr = g.createRadialGradient(64, 192, 0, 64, 192, 40); gr.addColorStop(0, 'rgba(255,255,255,0.9)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 128, 128, 128);
  // streak
  gr = g.createLinearGradient(128, 0, 256, 0); gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(0.5, 'rgba(255,255,255,0.9)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(132, 186, 120, 12);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function createEffects(scene) {
  // ---------------- particles
  const geo = new THREE.InstancedBufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute([-0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0], 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute([0, 0, 1, 0, 1, 1, 0, 1], 2));
  geo.setIndex([0, 1, 2, 0, 2, 3]);
  const aPos = new THREE.InstancedBufferAttribute(new Float32Array(MAX * 4), 4); // xyz, size
  const aCol = new THREE.InstancedBufferAttribute(new Float32Array(MAX * 4), 4); // rgb, alpha
  const aMisc = new THREE.InstancedBufferAttribute(new Float32Array(MAX * 4), 4); // rot, tex, stretch, additive
  aPos.setUsage(THREE.DynamicDrawUsage); aCol.setUsage(THREE.DynamicDrawUsage); aMisc.setUsage(THREE.DynamicDrawUsage);
  geo.setAttribute('aPos', aPos); geo.setAttribute('aCol', aCol); geo.setAttribute('aMisc', aMisc);
  geo.instanceCount = 0;
  const mat = new THREE.ShaderMaterial({
    uniforms: { map: { value: makeAtlas() } },
    vertexShader: /* glsl */`
      attribute vec4 aPos; attribute vec4 aCol; attribute vec4 aMisc;
      varying vec2 vUv; varying vec4 vCol; varying float vAdd;
      void main(){
        float c = cos(aMisc.x), s = sin(aMisc.x);
        vec2 p = position.xy; p.x *= aMisc.z;
        p = vec2(c*p.x - s*p.y, s*p.x + c*p.y) * aPos.w;
        vec4 mv = viewMatrix * vec4(aPos.xyz, 1.0);
        mv.xy += p;
        gl_Position = projectionMatrix * mv;
        float tx = mod(aMisc.y, 2.0), ty = floor(aMisc.y / 2.0);
        vUv = (uv + vec2(tx, 1.0 - ty)) * 0.5;
        vCol = aCol; vAdd = aMisc.w;
      }`,
    fragmentShader: /* glsl */`
      uniform sampler2D map; varying vec2 vUv; varying vec4 vCol; varying float vAdd;
      void main(){
        vec4 t = texture2D(map, vUv);
        float a = t.a * vCol.a;
        if (a < 0.01) discard;
        gl_FragColor = vec4(vCol.rgb * t.rgb * a * (1.0 + vAdd), a * (1.0 - vAdd));
      }`,
    transparent: true, depthWrite: false, blending: THREE.CustomBlending,
    blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor, toneMapped: false,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false; mesh.renderOrder = 20;
  scene.add(mesh);

  const P = [];
  for (let i = 0; i < MAX; i++) P.push({ live: false, x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, life: 0, max: 1, size: 1, size2: 1, r: 1, g: 1, b: 1, a: 1, rot: 0, spin: 0, tex: 0, grav: 0, drag: 0, stretch: 1, add: 0, sway: 0, seed: 0 });
  let cursor = 0;
  function spawn(o) {
    let p = null;
    for (let i = 0; i < MAX; i++) { const q = P[(cursor + i) % MAX]; if (!q.live) { p = q; cursor = (cursor + i + 1) % MAX; break; } }
    if (!p) { p = P[cursor]; cursor = (cursor + 1) % MAX; }
    p.live = true; p.x = o.x; p.y = o.y; p.z = o.z; p.vx = o.vx || 0; p.vy = o.vy || 0; p.vz = o.vz || 0;
    p.life = 0; p.max = o.life || 1; p.size = o.size || 0.2; p.size2 = o.size2 === undefined ? p.size : o.size2;
    p.r = o.r === undefined ? 1 : o.r; p.g = o.g === undefined ? 1 : o.g; p.b = o.b === undefined ? 1 : o.b; p.a = o.a === undefined ? 1 : o.a;
    p.rot = o.rot || 0; p.spin = o.spin || 0; p.tex = o.tex || 0; p.grav = o.grav || 0; p.drag = o.drag || 0; p.stretch = o.stretch || 1; p.add = o.add || 0; p.sway = o.sway || 0; p.seed = Math.random() * 10;
    return p;
  }
  const rnd = (a, b) => a + Math.random() * (b - a);
  const LEAF_COLS = [[0.85, 0.33, 0.12], [0.91, 0.54, 0.17], [0.95, 0.71, 0.2], [0.76, 0.23, 0.13], [0.72, 0.63, 0.18]];

  const fx = {
    leafPuff(pos, n = 8, power = 1) {
      for (let i = 0; i < n; i++) {
        const c = LEAF_COLS[(Math.random() * LEAF_COLS.length) | 0];
        spawn({ x: pos.x + rnd(-0.2, 0.2), y: pos.y + rnd(0, 0.3), z: pos.z + rnd(-0.2, 0.2), vx: rnd(-2, 2) * power, vy: rnd(0.5, 3) * power, vz: rnd(-2, 2) * power,
          life: rnd(1.2, 2.4), size: rnd(0.1, 0.2), r: c[0], g: c[1], b: c[2], rot: rnd(0, 6), spin: rnd(-6, 6), tex: 1, grav: 2.2, drag: 1.6, sway: 1.5 });
      }
    },
    dust(pos, n = 6, power = 1) {
      for (let i = 0; i < n; i++) spawn({ x: pos.x, y: pos.y + 0.05, z: pos.z, vx: rnd(-1.6, 1.6) * power, vy: rnd(0.2, 1) * power, vz: rnd(-1.6, 1.6) * power,
        life: rnd(0.4, 0.8), size: 0.12, size2: rnd(0.4, 0.7), r: 0.85, g: 0.78, b: 0.66, a: 0.35, drag: 3 });
    },
    sparkle(pos, n = 8, gold = false) {
      for (let i = 0; i < n; i++) spawn({ x: pos.x, y: pos.y, z: pos.z, vx: rnd(-2, 2), vy: rnd(0.5, 3.5), vz: rnd(-2, 2), life: rnd(0.35, 0.8),
        size: rnd(0.1, 0.22) * (gold ? 1.6 : 1), size2: 0, r: 1, g: gold ? 0.85 : 0.8, b: gold ? 0.3 : 0.45, rot: rnd(0, 6), spin: rnd(-4, 4), tex: 2, grav: 3, drag: 2, add: 1 });
    },
    ping(pos) { spawn({ x: pos.x, y: pos.y + 0.15, z: pos.z, life: 0.9, size: 0.2, size2: 1.1, r: 1, g: 0.85, b: 0.4, a: 0.8, tex: 0, add: 1 }); spawn({ x: pos.x, y: pos.y + 0.15, z: pos.z, vy: 0.6, life: 1.1, size: 0.3, size2: 0, r: 1, g: 0.9, b: 0.5, tex: 2, add: 1, spin: 2 }); },
    streak(pos, vel) {
      spawn({ x: pos.x + rnd(-0.5, 0.5), y: pos.y + rnd(0.05, 0.6), z: pos.z + rnd(-0.5, 0.5), vx: -vel.x * 0.3, vy: -vel.y * 0.3, vz: -vel.z * 0.3, life: 0.25, size: 0.5, size2: 0.2, a: 0.5, tex: 3, stretch: 2.2, add: 1, rot: rnd(-0.2, 0.2) });
    },
    hit(pos) {
      for (let i = 0; i < 7; i++) spawn({ x: pos.x, y: pos.y, z: pos.z, vx: rnd(-3.5, 3.5), vy: rnd(1, 4.5), vz: rnd(-3.5, 3.5), life: 0.5, size: 0.3, size2: 0, r: 1, g: 0.95, b: 0.6, tex: 2, grav: 5, rot: rnd(0, 6), spin: rnd(-8, 8), add: 1 });
      spawn({ x: pos.x, y: pos.y, z: pos.z, life: 0.22, size: 0.4, size2: 1.8, a: 0.9, tex: 0, add: 1 });
    },
    ambientLeaf(focus) {
      const c = LEAF_COLS[(Math.random() * LEAF_COLS.length) | 0];
      const a = rnd(0, 6.28), d = rnd(2, 16);
      spawn({ x: focus.x + Math.cos(a) * d, y: focus.y + rnd(3, 9), z: focus.z + Math.sin(a) * d, vx: rnd(-0.6, -0.1), vy: -rnd(0.5, 1), vz: rnd(0.1, 0.5), life: rnd(6, 10), size: rnd(0.1, 0.17), r: c[0], g: c[1], b: c[2], rot: rnd(0, 6), spin: rnd(-2.5, 2.5), tex: 1, sway: 2.2 });
    },
  };

  // ---------------- jump target ring
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xffe9a8, transparent: true, opacity: 0.9, depthTest: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, toneMapped: false, fog: false });
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.2, 0.27, 28), ringMat);
  const dot = new THREE.Mesh(new THREE.CircleGeometry(0.06, 12), ringMat);
  ring.add(dot); ring.renderOrder = 30; ring.visible = false; scene.add(ring);
  let ringA = 0; const ringQ = new THREE.Quaternion(), Z = new THREE.Vector3(0, 0, 1);
  fx.setRing = (visible, point, normal, time, camera) => {
    ringA += ((visible ? 1 : 0) - ringA) * 0.3;
    ring.visible = ringA > 0.03;
    if (!ring.visible) return;
    if (visible) {
      ring.position.copy(point).addScaledVector(normal, 0.05);
      // face mostly along the surface normal but tilt toward the camera so it is always readable
      _v.copy(camera.position).sub(point).normalize().multiplyScalar(0.55).add(normal).normalize();
      ring.quaternion.slerp(ringQ.setFromUnitVectors(Z, _v), 0.5);
      const d = camera.position.distanceTo(point);
      ring.scale.setScalar((0.9 + 0.12 * Math.sin(time * 9)) * Math.max(1, d * 0.16));
    }
    ringMat.opacity = 0.85 * ringA;
  };

  // ---------------- thrown nuts
  const nutGeo = new THREE.SphereGeometry(0.06, 8, 6);
  const nutMat = new THREE.MeshStandardMaterial({ color: 0x9a5a22, roughness: 0.6 });
  const nuts = [];
  for (let i = 0; i < 6; i++) { const m = new THREE.Mesh(nutGeo, nutMat); m.visible = false; m.castShadow = true; scene.add(m); nuts.push({ m, live: false, t: 0, vel: new THREE.Vector3(), target: null, onHit: null }); }
  fx.throwNut = (from, target, onHit) => {
    const n = nuts.find((q) => !q.live) || nuts[0];
    n.live = true; n.t = 0; n.m.visible = true; n.m.position.copy(from); n.target = target; n.onHit = onHit;
  };

  fx.update = (dt, time, focus, leafRate) => {
    // ambient drifting leaves
    fx._acc = (fx._acc || 0) + dt * leafRate;
    while (fx._acc > 1) { fx._acc -= 1; fx.ambientLeaf(focus); }
    let n = 0;
    const ap = aPos.array, ac = aCol.array, am = aMisc.array;
    for (let i = 0; i < MAX; i++) {
      const p = P[i];
      if (!p.live) continue;
      p.life += dt;
      if (p.life >= p.max) { p.live = false; continue; }
      const k = p.life / p.max;
      p.vy -= p.grav * dt;
      if (p.drag) { const d = Math.max(0, 1 - p.drag * dt); p.vx *= d; p.vy = p.vy > 0 ? p.vy * d : Math.max(p.vy, -1.6); p.vz *= d; }
      let sx = 0, sz = 0;
      if (p.sway) { sx = Math.sin(time * 2.1 + p.seed) * p.sway * 0.4; sz = Math.cos(time * 1.7 + p.seed * 1.3) * p.sway * 0.4; }
      p.x += (p.vx + sx) * dt; p.y += p.vy * dt; p.z += (p.vz + sz) * dt; p.rot += p.spin * dt;
      const o = n * 4;
      ap[o] = p.x; ap[o + 1] = p.y; ap[o + 2] = p.z; ap[o + 3] = p.size + (p.size2 - p.size) * k;
      const fade = k < 0.1 ? k / 0.1 : k > 0.7 ? (1 - k) / 0.3 : 1;
      ac[o] = p.r; ac[o + 1] = p.g; ac[o + 2] = p.b; ac[o + 3] = p.a * fade;
      am[o] = p.rot; am[o + 1] = p.tex; am[o + 2] = p.stretch; am[o + 3] = p.add;
      n++;
    }
    geo.instanceCount = n;
    aPos.needsUpdate = true; aCol.needsUpdate = true; aMisc.needsUpdate = true;
    // nuts
    for (const q of nuts) {
      if (!q.live) continue;
      q.t += dt;
      const tp = q.target.mouthPosition || q.target.position;
      _v.set(tp.x, tp.y + (q.target.mouthPosition ? 0 : (q.target.height || 0.6) * 0.7), tp.z).sub(q.m.position);
      const d = _v.length();
      const step = 26 * dt;
      if (d <= step + 0.25 || q.t > 1.2) {
        q.live = false; q.m.visible = false;
        if (d <= step + 0.6 && q.onHit) q.onHit(q.m.position, _v.normalize());
      } else { q.m.position.addScaledVector(_v, step / d); q.m.position.y += Math.sin(Math.min(1, q.t * 3) * Math.PI) * 0.02; q.m.rotation.x += dt * 20; }
    }
  };
  return fx;
}
