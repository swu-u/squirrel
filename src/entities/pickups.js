// Acorns and golden acorns: instanced, bobbing, magnetised to the squirrel when close.
import * as THREE from 'three';

function acornGeometry() {
  // nut body (lathe) + cap (lathe) + stem, merged with vertex colours
  const body = [], cap = [];
  for (let i = 0; i <= 10; i++) { const t = i / 10; const y = -0.11 + t * 0.15; const r = 0.062 * Math.pow(Math.sin(Math.min(1, t * 1.08 + 0.02) * Math.PI * 0.5), 0.75); body.push(new THREE.Vector2(i === 0 ? 0.004 : r, y)); }
  for (let i = 0; i <= 6; i++) { const t = i / 6; cap.push(new THREE.Vector2(0.07 * Math.cos(t * Math.PI * 0.5) + 0.002, 0.035 + 0.05 * Math.sin(t * Math.PI * 0.5))); }
  cap.unshift(new THREE.Vector2(0.062, 0.03));
  const parts = [
    [new THREE.LatheGeometry(body, 14), new THREE.Color(0xe08a35)],
    [new THREE.LatheGeometry(cap, 14), new THREE.Color(0x6b4424)],
    [new THREE.CylinderGeometry(0.008, 0.012, 0.05, 5).translate(0, 0.105, 0), new THREE.Color(0x4a2f1c)],
  ];
  let nv = 0, ni = 0;
  for (const [g] of parts) { nv += g.attributes.position.count; ni += g.index.count; }
  const pos = new Float32Array(nv * 3), nor = new Float32Array(nv * 3), col = new Float32Array(nv * 3), idx = new Uint16Array(ni);
  let vo = 0, io = 0;
  for (const [g, c] of parts) {
    g.computeVertexNormals();
    pos.set(g.attributes.position.array, vo * 3); nor.set(g.attributes.normal.array, vo * 3);
    for (let i = 0; i < g.attributes.position.count; i++) { col[(vo + i) * 3] = c.r; col[(vo + i) * 3 + 1] = c.g; col[(vo + i) * 3 + 2] = c.b; }
    for (let i = 0; i < g.index.count; i++) idx[io + i] = g.index.array[i] + vo;
    vo += g.attributes.position.count; io += g.index.count;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3)); geo.setAttribute('normal', new THREE.BufferAttribute(nor, 3)); geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  geo.setIndex(new THREE.BufferAttribute(idx, 1));
  return geo;
}

/** spots: [{pos: Vector3, kind: 'acorn' | 'golden', name?}] */
export function createPickups(scene, spots, taken) {
  const geo = acornGeometry();
  const items = spots.map((s, i) => ({ id: i, base: s.pos.clone(), pos: s.pos.clone(), kind: s.kind, name: s.name || '', where: s.where || '', taken: !!(taken && taken[i]), pull: 0, ping: 0, phase: (i * 1.618) % 6.283, slot: -1 }));
  const normal = items.filter((a) => a.kind !== 'golden'), golden = items.filter((a) => a.kind === 'golden');

  const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.42, metalness: 0.0, emissive: 0x8a3c05, emissiveIntensity: 0.9 });
  const mesh = new THREE.InstancedMesh(geo, mat, Math.max(1, normal.length));
  mesh.castShadow = true; mesh.frustumCulled = false;
  const gmat = new THREE.MeshStandardMaterial({ color: 0xffc93a, roughness: 0.22, metalness: 0.85, emissive: 0xffa200, emissiveIntensity: 1.5 });
  const gmesh = new THREE.InstancedMesh(geo, gmat, Math.max(1, golden.length));
  gmesh.frustumCulled = false; gmesh.castShadow = true;
  scene.add(mesh, gmesh);

  // soft beams over golden acorns so they can be spotted from afar
  const beamGeo = new THREE.CylinderGeometry(0.16, 0.5, 9, 10, 1, true).translate(0, 4.5, 0);
  const beamMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false, toneMapped: false,
    uniforms: { uTime: { value: 0 } },
    vertexShader: 'varying float vY; varying vec3 vN; varying vec3 vV; void main(){ vY = position.y / 9.0; vec4 wp = modelMatrix * instanceMatrix * vec4(position,1.0); vN = normalize(mat3(modelMatrix * instanceMatrix) * normal); vV = normalize(cameraPosition - wp.xyz); gl_Position = projectionMatrix * viewMatrix * wp; }',
    fragmentShader: 'uniform float uTime; varying float vY; varying vec3 vN; varying vec3 vV; void main(){ float f = abs(dot(normalize(vN), normalize(vV))); float a = pow(clamp(1.0 - vY, 0.0, 1.0), 1.6) * f * f * (0.2 + 0.05 * sin(uTime * 2.0 + vY * 9.0)); gl_FragColor = vec4(vec3(1.0, 0.82, 0.38) * a, a); }',
  });
  const beams = new THREE.InstancedMesh(beamGeo, beamMat, Math.max(1, golden.length));
  beams.frustumCulled = false; beams.renderOrder = 10; scene.add(beams);

  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), sc = new THREE.Vector3(), p = new THREE.Vector3(), zero = new THREE.Matrix4().makeScale(0, 0, 0);
  function place(list, im, scale, time, all, focus) {
    for (let i = 0; i < list.length; i++) {
      const a = list[i];
      if (a.taken) { if (a.slot !== -2) { im.setMatrixAt(i, zero); a.slot = -2; im.instanceMatrix.needsUpdate = true; } continue; }
      if (!all && a.slot === i) { const dx = a.base.x - focus.x, dz = a.base.z - focus.z; if (dx * dx + dz * dz > 55 * 55) continue; }
      a.slot = i;
      const s = scale * (1 + a.ping * 0.7);
      e.set(0.25, time * 1.6 + a.phase, 0.12); q.setFromEuler(e);
      p.copy(a.pos); p.y += 0.06 + Math.sin(time * 2.4 + a.phase) * 0.045;
      m4.compose(p, q, sc.set(s, s, s));
      im.setMatrixAt(i, m4); im.instanceMatrix.needsUpdate = true;
    }
  }
  for (let i = 0; i < golden.length; i++) { m4.makeTranslation(golden[i].base.x, golden[i].base.y, golden[i].base.z); beams.setMatrixAt(i, golden[i].taken ? zero : m4); }
  place(normal, mesh, 2.3, 0, true, null); place(golden, gmesh, 3.2, 0, true, null);

  const api = {
    items, total: normal.length, goldenTotal: golden.length,
    count() { let n = 0, g = 0; for (const a of items) if (a.taken) { if (a.kind === 'golden') g++; else n++; } return { acorns: n, golden: g }; },
    /** returns array of items collected this frame (reused array) */
    update(dt, time, playerPos, magnet = 1.9) {
      collected.length = 0;
      beamMat.uniforms.uTime.value = time;
      for (let i = 0; i < items.length; i++) {
        const a = items[i];
        if (a.taken) continue;
        if (a.ping > 0) a.ping = Math.max(0, a.ping - dt * 0.9);
        const dx = playerPos.x - a.pos.x, dy = playerPos.y + 0.15 - a.pos.y, dz = playerPos.z - a.pos.z;
        const d2 = dx * dx + dy * dy + dz * dz;
        const r = a.kind === 'golden' ? magnet * 1.2 : magnet;
        if (d2 < r * r || a.pull > 0) {
          a.pull += dt * 5;
          const d = Math.sqrt(d2), k = Math.min(1, (6 + a.pull * 14) * dt / Math.max(d, 0.01));
          a.pos.x += dx * k; a.pos.y += dy * k; a.pos.z += dz * k;
          if (d < 0.45) {
            a.taken = true; collected.push(a);
            if (a.kind === 'golden') { beams.setMatrixAt(golden.indexOf(a), zero); beams.instanceMatrix.needsUpdate = true; }
          }
        }
      }
      place(normal, mesh, 2.3, time, false, playerPos); place(golden, gmesh, 3.2, time, true, playerPos);
      return collected;
    },
    /** highlight acorns near a point; calls cb(item) for each */
    ping(center, radius, cb) {
      let n = 0;
      for (const a of items) { if (a.taken) continue; const d = a.base.distanceTo(center); if (d < radius) { a.ping = 1; n++; if (cb && n <= 14) cb(a); } }
      return n;
    },
    nearest(pos, kind) {
      let best = null, bd = Infinity;
      for (const a of items) { if (a.taken || (kind && a.kind !== kind)) continue; const d = a.base.distanceToSquared(pos); if (d < bd) { bd = d; best = a; } }
      return best;
    },
    takenMap() { const t = {}; for (const a of items) if (a.taken) t[a.id] = 1; return t; },
    reset() { for (const a of items) { a.taken = false; a.pos.copy(a.base); a.pull = 0; a.slot = -1; } for (let i = 0; i < golden.length; i++) { m4.makeTranslation(golden[i].base.x, golden[i].base.y, golden[i].base.z); beams.setMatrixAt(i, m4); } beams.instanceMatrix.needsUpdate = true; },
  };
  const collected = [];
  return api;
}
