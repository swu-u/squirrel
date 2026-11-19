// Third-person follow camera: drag to orbit, eases behind the squirrel when left alone,
// looks at the surface when climbing, never goes inside buildings.
import * as THREE from 'three';

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const _t = new THREE.Vector3(), _d = new THREE.Vector3(), _c = new THREE.Vector3();

function angDiff(a, b) { let d = a - b; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; return d; }

export class FollowCamera {
  constructor(camera, world) {
    this.camera = camera; this.world = world;
    this.yaw = 0; this.pitch = 0.24;
    this.dist = 2.8; this.curDist = 2.8;
    this.target = new THREE.Vector3();
    this.manualTime = 9;     // seconds since the player last dragged the view
    this.sensitivity = 1; this.invertY = false;
    this.shake = 0; this.fovKick = 0; this.baseFov = 60;
    this.time = 0;
    this.lookActive = false;
  }

  snap(player) { this.target.copy(player.visPos); this.yaw = Math.atan2(-player.heading.x, -player.heading.z); this.curDist = this.dist; }

  addShake(a) { this.shake = Math.min(1, this.shake + a); }

  update(dt, player, look, aspect) {
    this.time += dt;
    const sens = 0.0052 * this.sensitivity;
    this.lookActive = false;
    if (look && (look.dx !== 0 || look.dy !== 0)) {
      this.yaw -= look.dx * sens;
      this.pitch += look.dy * sens * (this.invertY ? -1 : 1);
      this.manualTime = 0; this.lookActive = true;
    } else this.manualTime += dt;
    this.pitch = clamp(this.pitch, -1.15, 1.35);

    const n = player.normal, h = player.heading;
    const steep = player.mode === 'surface' ? clamp(1 - Math.abs(n.y) * 1.15, 0, 1) : 0;
    // automatic framing when the player is not dragging
    if (this.manualTime > 1.1 && player.mode === 'surface') {
      const moving = player.speed > 0.5;
      let wantYaw = null, rate = 0;
      const hl = Math.hypot(h.x, h.z);
      if (steep > 0.5) {
        // on a wall or trunk: look at the surface, shifted a little toward where we are heading
        let fx = -n.x, fz = -n.z;
        if (hl > 0.3) { fx += h.x * 0.6; fz += h.z * 0.6; }
        wantYaw = Math.atan2(-fx, -fz); rate = moving ? 2.2 : 0.8;
      } else if (moving && hl > 0.4) {
        wantYaw = Math.atan2(-h.x, -h.z); rate = 1.5 + player.speed * 0.12;
      }
      if (wantYaw !== null) {
        const d = angDiff(wantYaw, this.yaw);
        // do not fight the player when they run toward the camera
        if (steep > 0.5 || Math.abs(d) < 2.4) this.yaw += d * Math.min(1, rate * dt);
      }
      if (moving) {
        let wantPitch = 0.24;
        if (steep > 0.5) wantPitch = h.y > 0.3 ? -0.18 : h.y < -0.3 ? 0.75 : 0.22;
        else if (player.thin > 0.5) wantPitch = 0.42;
        this.pitch += (wantPitch - this.pitch) * Math.min(1, dt * 1.3);
      }
    }
    if (player.mode === 'air' && this.manualTime > 1.1) {
      const v = player.vel, hl = Math.hypot(v.x, v.z);
      if (hl > 3) { const d = angDiff(Math.atan2(-v.x, -v.z), this.yaw); if (Math.abs(d) < 2.2) this.yaw += d * Math.min(1, 2.2 * dt); }
    }

    // focus point: a little above the squirrel, pushed off the surface it stands on
    _t.copy(player.visPos).addScaledVector(n, 0.22); _t.y += 0.16;
    const k = Math.min(1, dt * (player.mode === 'air' ? 14 : 18));
    this.target.lerp(_t, k);
    if (this.target.distanceToSquared(_t) > 9) this.target.copy(_t);

    const portrait = aspect < 1;
    let want = this.dist * (portrait ? 0.92 : 1) * (1 - 0.14 * player.alert) + clamp(player.speed - 8, 0, 5) * 0.12;
    const cp = Math.cos(this.pitch), sp = Math.sin(this.pitch);
    _d.set(Math.sin(this.yaw) * cp, sp, Math.cos(this.yaw) * cp); // from target toward camera
    // keep the camera out of solid things
    const hit = this.world.raycast(this.target, _d, want + 0.3, 0.25, 0.12);
    let allowed = want;
    if (hit < want + 0.3) allowed = Math.max(0.55, hit - 0.3);
    if (allowed < this.curDist) this.curDist += (allowed - this.curDist) * Math.min(1, dt * 22);
    else this.curDist += (allowed - this.curDist) * Math.min(1, dt * 3.5);
    _c.copy(this.target).addScaledVector(_d, this.curDist);
    const gh = this.world.groundHeight(_c.x, _c.z) + 0.18;
    if (_c.y < gh) _c.y = gh;

    // shake
    if (this.shake > 0.001) {
      const s = this.shake * this.shake * 0.12, t = this.time * 47;
      _c.x += Math.sin(t * 1.3) * s; _c.y += Math.sin(t * 1.7 + 1) * s; _c.z += Math.sin(t * 1.1 + 2) * s;
      this.shake = Math.max(0, this.shake - dt * 2.6);
    }
    this.camera.position.copy(_c);
    this.camera.up.set(0, 1, 0);
    this.camera.lookAt(this.target);

    // field of view: wider in portrait, kick on burst
    const kickT = player.bursting ? 1 : clamp((player.speed - 7) / 6, 0, 0.5);
    this.fovKick += (kickT - this.fovKick) * Math.min(1, dt * 5);
    let fov = this.baseFov + this.fovKick * 12;
    if (portrait) fov = clamp(2 * Math.atan(Math.tan((fov * Math.PI / 180) / 2) / Math.max(aspect, 0.45) * 0.5) * 180 / Math.PI, fov, 88);
    if (Math.abs(this.camera.fov - fov) > 0.01 || this.camera.aspect !== aspect) { this.camera.fov = fov; this.camera.aspect = aspect; this.camera.updateProjectionMatrix(); }
  }
}
