// Small readable signals above a dog's head: "!" pop on notice, circling stars when
// stunned, a row of health pips after the first hit.
import * as THREE from 'three';

let exclTex = null, starGeo = null, starMat = null;
function exclamationTexture() {
  if (exclTex) return exclTex;
  const c = document.createElement('canvas'); c.width = 96; c.height = 160;
  const g = c.getContext('2d');
  g.lineJoin = 'round'; g.lineWidth = 16; g.strokeStyle = '#3a1608'; g.fillStyle = '#ffd23c';
  const body = () => { g.beginPath(); g.moveTo(30, 14); g.lineTo(66, 14); g.lineTo(58, 100); g.lineTo(38, 100); g.closePath(); };
  body(); g.stroke(); g.beginPath(); g.arc(48, 132, 14, 0, 7); g.stroke();
  body(); g.fill(); g.beginPath(); g.arc(48, 132, 14, 0, 7); g.fill();
  g.fillStyle = '#fff3b0'; g.beginPath(); g.moveTo(36, 20); g.lineTo(46, 20); g.lineTo(44, 60); g.lineTo(39, 60); g.closePath(); g.fill();
  exclTex = new THREE.CanvasTexture(c); exclTex.colorSpace = THREE.SRGBColorSpace;
  return exclTex;
}
function starGeometry() {
  if (starGeo) return starGeo;
  const shape = new THREE.Shape();
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2 + Math.PI / 2, r = i % 2 ? 0.045 : 0.1;
    if (i === 0) shape.moveTo(Math.cos(a) * r, Math.sin(a) * r); else shape.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  const one = new THREE.ExtrudeGeometry(shape, { depth: 0.03, bevelEnabled: true, bevelSize: 0.012, bevelThickness: 0.012, bevelSegments: 1 });
  one.translate(0, 0, -0.015);
  // four stars on a ring, merged into one geometry
  const pos = [], nrm = [], idx = [];
  const src = one.toNonIndexed(), sp = src.attributes.position, sn = src.attributes.normal;
  const v = new THREE.Vector3(), e = new THREE.Euler();
  for (let k = 0; k < 4; k++) {
    const a = (k / 4) * Math.PI * 2;
    e.set(0, a + Math.PI / 2, k * 0.5);
    const base = pos.length / 3;
    for (let i = 0; i < sp.count; i++) {
      v.fromBufferAttribute(sp, i).multiplyScalar(k % 2 ? 0.8 : 1).applyEuler(e); v.x += Math.sin(a) * 0.34; v.z += Math.cos(a) * 0.34; v.y += k % 2 ? 0.04 : -0.02;
      pos.push(v.x, v.y, v.z);
      v.fromBufferAttribute(sn, i).applyEuler(e); nrm.push(v.x, v.y, v.z);
      idx.push(base + i);
    }
  }
  starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  starGeo.setAttribute('normal', new THREE.Float32BufferAttribute(nrm, 3));
  starMat = new THREE.MeshStandardMaterial({ color: 0xffd640, emissive: 0xffa800, emissiveIntensity: 0.9, roughness: 0.4 });
  return starGeo;
}

export function createSignals(S, maxHealth) {
  const group = new THREE.Group();
  const excl = new THREE.Sprite(new THREE.SpriteMaterial({ map: exclamationTexture(), depthWrite: false, transparent: true }));
  excl.visible = false; excl.center.set(0.5, 0); group.add(excl);
  const stars = new THREE.Mesh(starGeometry(), starMat);
  stars.visible = false; group.add(stars);
  const pc = document.createElement('canvas'); pc.width = 32 * maxHealth + 8; pc.height = 40;
  const ptex = new THREE.CanvasTexture(pc); ptex.colorSpace = THREE.SRGBColorSpace;
  const pips = new THREE.Sprite(new THREE.SpriteMaterial({ map: ptex, depthWrite: false, transparent: true }));
  pips.visible = false; group.add(pips);
  const pw = 0.11 * maxHealth + 0.03;
  pips.scale.set(pw, pw * (pc.height / pc.width), 1);
  let exclT = 9, pipPop = 0, starSpin = 0, stun = 0;
  const api = {
    group,
    notice() { exclT = 0; },
    setStun(on) { stun = on ? 1 : 0; },
    setHealth(h, show) {
      const g = pc.getContext('2d');
      g.clearRect(0, 0, pc.width, pc.height);
      for (let i = 0; i < maxHealth; i++) {
        const x = 20 + i * 32;
        g.beginPath(); g.arc(x, 20, 13, 0, 7); g.fillStyle = 'rgba(40,18,8,0.85)'; g.fill();
        g.beginPath(); g.arc(x, 20, 9.5, 0, 7); g.fillStyle = i < h ? '#ff6a3c' : 'rgba(255,240,220,0.22)'; g.fill();
        if (i < h) { g.beginPath(); g.arc(x - 3, 16, 3, 0, 7); g.fillStyle = 'rgba(255,255,255,0.75)'; g.fill(); }
      }
      ptex.needsUpdate = true; pips.visible = show; pipPop = 1;
    },
    hide() { excl.visible = false; stars.visible = false; pips.visible = false; exclT = 9; stun = 0; },
    update(dt, headTop) {
      group.position.copy(headTop);
      // "!" pops up with a little overshoot, holds, then shrinks away
      if (exclT < 1.1) {
        exclT += dt;
        const k = exclT < 0.16 ? (exclT / 0.16) * 1.25 : exclT < 0.26 ? 1.25 - ((exclT - 0.16) / 0.1) * 0.25 : exclT > 0.95 ? Math.max(0, 1 - (exclT - 0.95) / 0.15) : 1;
        excl.visible = k > 0.01;
        const h = 0.62 * Math.max(0.75, S) * k;
        excl.scale.set(h * 0.6, h, 1); excl.position.set(0, 0.16 * S, 0);
      } else excl.visible = false;
      stars.visible = stun > 0;
      if (stars.visible) { starSpin += dt * 5; stars.rotation.y = starSpin; stars.position.y = 0.16 * S + Math.sin(starSpin * 0.7) * 0.03; const sc = 0.75 + S * 0.45; stars.scale.setScalar(sc); }
      if (pips.visible) {
        pipPop = Math.max(0, pipPop - dt * 4);
        const k = 1 + pipPop * 0.35;
        pips.scale.set(pw * k, pw * k * (pc.height / pc.width), 1);
        pips.position.set(0, (stars.visible || excl.visible ? 0.62 : 0.2) * S + 0.08, 0);
      }
    },
  };
  return api;
}
