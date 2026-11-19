// Squirrel: boot and game loop.
import * as THREE from 'three';
import { World } from './core/world.js';
import { setupEnvironment } from './world/env.js';
import { createCity } from './world/city.js';
import { createSquirrel } from './player/squirrelModel.js';
import { Player, TUNE } from './player/controller.js';
import { FollowCamera } from './player/camera.js';
import { createPickups } from './entities/pickups.js';
import { createEffects } from './core/effects.js';
import { createPost } from './core/post.js';
import { createQuests } from './game/quests.js';
import { createInput } from './core/input.js';
import { createHUD } from './ui/hud.js';
import { createAudio } from './audio/audio.js';
import { mulberry32 } from './core/rng.js';

const dogModules = import.meta.glob('./entities/dogs.js');
const SAVE_KEY = 'squirrel.save.v2';
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const params = new URLSearchParams(location.search);

const QUALITY = {
  low: { q: 0.45, pr: 1.0, shadow: 1024, msaa: 0, bloom: false, range: 34, leaves: 2 },
  medium: { q: 0.65, pr: 1.5, shadow: 1536, msaa: 2, bloom: true, range: 38, leaves: 4 },
  high: { q: 1, pr: 2, shadow: 2048, msaa: 4, bloom: true, range: 44, leaves: 6 },
};

async function boot() {
  const container = document.getElementById('game');
  const loading = document.getElementById('loading');
  const input = createInput(container);
  const hud = createHUD(container, input);
  const audio = createAudio();
  const isMobile = matchMedia('(pointer: coarse)').matches || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  let qname = params.get('q') || hud.settings.quality || 'auto';
  if (!QUALITY[qname]) qname = isMobile ? 'medium' : 'high';
  const Q = QUALITY[qname];

  // ---------------------------------------------------------------- renderer
  const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance', stencil: false });
  let maxPR = Math.min(window.devicePixelRatio || 1, Q.pr), curPR = maxPR;
  renderer.setPixelRatio(curPR);
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.domElement.className = 'game-canvas';
  container.prepend(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.08, 900);
  const env = setupEnvironment(scene, renderer, { shadowSize: Q.shadow, shadowRange: Q.range });
  await new Promise((r) => setTimeout(r, 30)); // let the loading screen paint

  // ---------------------------------------------------------------- world
  const world = new World();
  const city = createCity(world, { quality: Q.q });
  scene.add(city.group);
  const layout = city.layout;
  const trees = layout.trees || [];
  const post = createPost(renderer, scene, camera, { msaa: Q.msaa, bloom: Q.bloom });

  // acorns: the city's own spots plus a few on the branches of every tree
  const rng = mulberry32(7);
  const spots = layout.pickupSpots.map((s) => ({ pos: s.pos.clone(), kind: s.kind, name: s.name, where: s.where }));
  for (const t of trees) {
    const ps = t.perches || []; if (!ps.length) continue;
    const n = Math.min(ps.length, t.crownRadius > 5 ? 5 : 3);
    const start = Math.floor(rng() * ps.length);
    for (let i = 0; i < n; i++) { const p = ps[(start + i * 2) % ps.length]; spots.push({ pos: new THREE.Vector3(p.x, p.y + 0.22, p.z), kind: 'acorn', where: 'tree' }); }
  }
  const save = loadSave();
  const pickups = createPickups(scene, spots, save.taken);
  const effects = createEffects(scene);

  // ---------------------------------------------------------------- player
  const squirrel = createSquirrel({ shells: Q.q < 0.6 ? 10 : 16 });
  scene.add(squirrel.group);
  squirrel.group.scale.setScalar(1.3);
  const player = new Player(world);
  const rig = new FollowCamera(camera, world);
  { // keep the start point clear of lamp posts and benches so the first view is open
    const probe = new THREE.Vector3(), hitc = { dist: 0, point: new THREE.Vector3(), normal: new THREE.Vector3(), prim: null, t: 0 };
    search: for (let r = 0; r <= 8; r += 1.5) for (let a = 0; a < 6.28; a += 0.7) {
      probe.set(layout.spawn.x + Math.cos(a) * r, 0, layout.spawn.z + Math.sin(a) * r); probe.y = world.groundHeight(probe.x, probe.z) + 0.6;
      if (!world.nearest(probe, 3.2, hitc, null, true)) { layout.spawn.set(probe.x, probe.y - 0.6, probe.z); break search; }
    }
  }
  const spawnFacing = new THREE.Vector3().copy(layout.home).sub(layout.spawn).setY(0).normalize();
  player.teleport(new THREE.Vector3(layout.spawn.x, layout.spawn.y + 0.3, layout.spawn.z), spawnFacing);
  rig.snap(player);

  // ---------------------------------------------------------------- dogs (optional module)
  let dogs = null;
  try {
    const loader = dogModules['./entities/dogs.js'];
    if (loader && params.get('dogs') !== '0') { const mod = await loader(); dogs = mod.createDogs(scene, world, layout.dogZones || [], { quality: Q.q }); }
  } catch (err) { console.error('dogs failed to load', err); dogs = null; }

  // ---------------------------------------------------------------- game state
  const stats = { acorns: save.acorns || 0, golden: save.golden || 0, dogs: save.dogs || 0, bursts: 0, wireDist: 0, onRoof: false, bulldog: !!save.bulldog, bestComboNow: 0, time: save.time || 0 };
  { const c = pickups.count(); stats.golden = c.golden; }
  const G = { layout, player, pickups, stats, touch: isMobile, hasDogs: () => !!dogs && dogs.list.length > 0 };
  const quests = createQuests(G);
  quests.setIndex(save.quest || 0);
  let mode = 'title';
  let health = 4; const maxHealth = 4;
  let sinceHurt = 99, regenT = 0, combo = 0, comboTimer = 0, streak = 0, streakTimer = 0, attackCd = 0, hitStop = 0, dangerT = 0, saveT = 0, endingShown = !!save.ended;
  let time = 0, inTree = 0, flow = 0, leafAcc = 0, respawning = false;
  const pin = { moveX: 0, moveY: 0, jumpPressed: false, jumpHeld: false, lookActive: false };
  const sstate = { mode: 'surface', speed: 0, steep: 0, climb: 0, thin: 0, turn: 0, airForward: 0, airUp: 0, airTime: 0, alert: 0, lookLocal: null, time: 0 };
  const lookLocal = new THREE.Vector3(), _v = new THREE.Vector3(), _v2 = new THREE.Vector3(), _head = new THREE.Vector3(), _q = new THREE.Quaternion();
  const dogCtx = { time: 0, camera, player: { position: player.pos, velocity: player.vel, heightAboveGround: 0, hidden: false, invulnerable: false }, onEvent: onDogEvent };

  player.extraTargets = (cb) => {
    if (!dogs) return;
    for (const d of dogs.list) { if (!d.alive) continue; if (player.pos.y - d.position.y < 1.0) continue; _v2.set(d.position.x, d.position.y + (d.height || 0.6), d.position.z); cb(_v2, d); }
  };

  hud.setAcorns(stats.acorns); hud.setGolden(stats.golden, pickups.goldenTotal); hud.setHealth(health, maxHealth);
  hud.setVisible(false); input.setEnabled(false);
  applySettings();
  hud.onSettingsChange((s, key) => { if (key === 'quality') { saveNow(); location.reload(); return; } applySettings(); });
  hud.onPause(() => togglePause());

  function applySettings() {
    const s = hud.settings;
    audio.setVolume(s.volume); audio.setMusicEnabled(!!s.music);
    rig.sensitivity = s.sensitivity || 1; rig.invertY = !!s.invertY;
  }
  function startGame() {
    audio.unlock(); audio.play('uiTap');
    hud.hideTitle(); hud.setVisible(true); input.setEnabled(true);
    mode = 'play'; rig.snap(player); rig.manualTime = 0.4;
    hud.setQuest(quests.view()); audio.play('questNew');
    if (isMobile && document.documentElement.requestFullscreen && params.get('fs') !== '0') { try { document.documentElement.requestFullscreen({ navigationUI: 'hide' }).catch(() => {}); } catch (e) { /* not allowed */ } }
  }
  function togglePause() {
    if (mode === 'play') {
      mode = 'paused'; input.setEnabled(false);
      hud.showPause({ onResume: () => { hud.hidePause(); mode = 'play'; input.setEnabled(true); }, onRestart: () => { try { localStorage.removeItem(SAVE_KEY); } catch (e) { /* ignore */ } location.reload(); } });
    } else if (mode === 'paused') { hud.hidePause(); mode = 'play'; input.setEnabled(true); }
  }
  hud.showTitle({ onStart: startGame, hasSave: (save.acorns || 0) > 0 });
  if (params.get('autostart') === '1') startGame();

  // ---------------------------------------------------------------- helpers
  function surfaceName() {
    const p = player.prim;
    if (!p || p.type === 'ground') return 'ground';
    if (p.type === 'capsule') return p.kind === 'trunk' || p.kind === 'branch' || p.kind === 'pole' ? 'wood' : 'wire';
    return player.normal.y > 0.6 ? 'roof' : 'wall';
  }
  function hurt(damage, dir) {
    if (player.invuln > 0 || respawning) return;
    health -= damage; sinceHurt = 0; combo = 0;
    hud.setHealth(Math.max(0, health), maxHealth); hud.flashDamage(); input.vibrate(80);
    squirrel.trigger('hurt'); audio.play('hurt'); rig.addShake(0.7); hitStop = 0.08;
    player.knock(dir || _v.set(0, 0, 0), 7.5);
    effects.hit(player.pos);
    if (health <= 0) respawn();
  }
  function respawn() {
    respawning = true; input.setEnabled(false);
    const lost = Math.min(stats.acorns, 5);
    hud.showRespawn(() => {
      player.teleport(new THREE.Vector3(layout.spawn.x, layout.spawn.y + 0.3, layout.spawn.z), spawnFacing);
      rig.snap(player);
      health = maxHealth; hud.setHealth(health, maxHealth);
      stats.acorns -= lost; hud.setAcorns(stats.acorns);
      audio.play('respawn');
    }).then(() => { respawning = false; if (mode === 'play') input.setEnabled(true); if (lost) hud.toast('Back at the home tree. Dropped ' + lost + ' acorns'); });
  }
  function onDogEvent(type, dog, data) {
    const dist = dog.position.distanceTo(player.pos);
    const size = dog.kind === 'terrier' ? 0.1 : dog.kind === 'bulldog' ? 1 : 0.6;
    const pan = clamp(_v.copy(dog.position).sub(camera.position).dot(_v2.set(1, 0, 0).applyQuaternion(camera.quaternion)) / 12, -1, 1);
    if (type === 'bark') { audio.play('bark', { size, distance: dist, pan }); dangerT = Math.max(dangerT, 2.5); }
    else if (type === 'growl') audio.play('growl', { size, distance: dist, pan });
    else if (type === 'notice') { audio.play('notice', { size, distance: dist, pan }); dangerT = 4; hud.toast('A dog has seen you. Climb!', 1800); }
    else if (type === 'lunge') { audio.play('lunge', { distance: dist, pan }); dangerT = Math.max(dangerT, 3); }
    else if (type === 'bite') hurt((data && data.damage) || 1, data && data.dir);
    else if (type === 'yelp') audio.play('yelp', { size, distance: dist, pan });
    else if (type === 'flee') {
      stats.dogs++; if (dog.kind === 'bulldog') stats.bulldog = true;
      stats.acorns += 3; hud.setAcorns(stats.acorns); hud.toast(dog.kind === 'bulldog' ? 'The bulldog runs for it!' : 'Dog chased off! +3 acorns');
      effects.sparkle(_v.copy(dog.position).setY(dog.position.y + 0.8), 14, true);
    }
  }
  function nearestDog(maxDist) {
    if (!dogs) return null;
    let best = null, bd = maxDist;
    for (const d of dogs.list) { if (!d.alive) continue; const dist = d.position.distanceTo(player.pos); if (dist < bd) { bd = dist; best = d; } }
    return best;
  }
  function doAttack() {
    attackCd = 0.42;
    const d = nearestDog(15);
    if (!d) { squirrel.trigger('chatter'); audio.play('chatter'); attackCd = 0.9; return; }
    const dist = d.position.distanceTo(player.pos);
    _v.copy(d.position).sub(player.pos); const dir = _v.clone().setY(0).normalize();
    // face the dog
    if (player.mode === 'surface' && player.normal.y > 0.7) { player.heading.copy(dir); }
    if (dist < 2.3) {
      squirrel.trigger('attack'); audio.play('scratch');
      d.hit(1, dir, 'scratch'); effects.hit(_v.copy(d.mouthPosition || d.position).setY((d.mouthPosition || d.position).y + (d.mouthPosition ? 0 : 0.5)));
      hitStop = 0.07; rig.addShake(0.35); input.vibrate(30);
      // spring back out of reach
      player.bounce(6.5, 0); player.vel.x = -dir.x * 6; player.vel.z = -dir.z * 6; player.invuln = Math.max(player.invuln, 0.35);
    } else {
      squirrel.trigger('throw'); audio.play('throw');
      squirrel.getHeadWorldPosition(_head);
      effects.throwNut(_head, d, (pos, hdir) => { if (!d.alive) return; d.hit(1, hdir, 'nut'); audio.play('nutHit', { distance: pos.distanceTo(player.pos) }); effects.hit(pos); });
    }
  }
  function loadSave() { try { return JSON.parse(localStorage.getItem(SAVE_KEY)) || {}; } catch (e) { return {}; } }
  function saveNow() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify({ taken: pickups.takenMap(), acorns: stats.acorns, golden: stats.golden, dogs: stats.dogs, bulldog: stats.bulldog, quest: quests.index, time: stats.time, ended: endingShown })); } catch (e) { /* storage may be blocked */ }
  }

  // ---------------------------------------------------------------- resize
  function resize() {
    const w = container.clientWidth, h = container.clientHeight;
    renderer.setPixelRatio(curPR); renderer.setSize(w, h); post.setSize(w, h, curPR);
  }
  window.addEventListener('resize', resize); window.addEventListener('orientationchange', () => setTimeout(resize, 200));
  resize();

  // ---------------------------------------------------------------- frame
  let last = performance.now(), frameAvg = 16, prT = 0;
  function frame(now) {
    let rawDt = Math.min(0.05, (now - last) / 1000); last = now;
    if (rawDt <= 0) rawDt = 0.001;
    frameAvg += (rawDt * 1000 - frameAvg) * 0.05;
    let dt = rawDt;
    if (hitStop > 0) { hitStop -= rawDt; dt *= 0.05; }
    const playing = mode === 'play';
    if (input.pausePressed && (mode === 'play' || mode === 'paused') && !hud.modalOpen) togglePause();
    if (mode === 'paused') { audio.update(rawDt, { paused: true, speed: 0 }); hud.update(rawDt); input.endFrame(); post.render(rawDt); return; }
    time += dt; if (playing) stats.time += dt;

    // ---- input -> player
    pin.moveX = playing ? input.move.x : 0; pin.moveY = playing ? input.move.y : 0;
    pin.jumpPressed = playing && input.jumpPressed; pin.jumpHeld = playing && input.jumpHeld; pin.lookActive = rig.lookActive;
    const fk = window.__fake; // test hook: scripted input
    if (fk && playing) { pin.moveX = fk.x || 0; pin.moveY = fk.y || 0; pin.jumpHeld = !!fk.hold; pin.jumpPressed = !!fk.jump; fk.jump = false; }
    player.update(dt, pin, rig.yaw);
    for (const e of player.events) {
      if (e.type === 'jump') { squirrel.trigger('jump'); audio.play('jump', { power: e.power, surface: surfaceName() }); }
      else if (e.type === 'land') {
        squirrel.trigger('land', { impact: e.impact });
        const sn = surfaceName();
        audio.play('land', { impact: e.impact, surface: sn });
        const pk = e.prim.kind;
        if (pk === 'branch') { effects.leafPuff(player.pos, 3 + Math.round(e.impact * 8), 0.6 + e.impact); audio.play('leaves', { amount: 0.3 + e.impact * 0.7 }); }
        else if (pk === 'wire') audio.play('wire', { impact: 0.3 + e.impact * 0.7 });
        else if (e.prim.type === 'ground') effects.dust(player.pos, 4 + Math.round(e.impact * 6), 0.6 + e.impact);
        if (e.impact > 0.5) rig.addShake(e.impact * 0.35);
        // flow: chained leaps between different perches without touching the ground
        if (e.prim.type !== 'ground' && e.from && e.from !== e.prim && e.from.type !== 'ground') {
          combo++; comboTimer = 1; stats.bestComboNow = Math.max(stats.bestComboNow, combo);
          if (combo > 0 && combo % 4 === 0) { player.burstLeft = TUNE.burstTime; squirrel.trigger('burst'); audio.play('burst'); hud.toast('Flow! Free burst', 1200); }
        } else if (e.prim.type === 'ground') combo = 0;
      } else if (e.type === 'burst') { stats.bursts++; squirrel.trigger('burst'); audio.play('burst'); effects.dust(player.pos, 8, 1.4); rig.addShake(0.2); input.vibrate(20); }
      else if (e.type === 'charged') {
        audio.play('charge');
        const n = pickups.ping(player.pos, 26, (a) => effects.ping(a.base));
        if (n === 0 && playing && quests.index > 1) { /* nothing nearby */ }
      }
    }
    if (comboTimer > 0 && player.mode === 'surface') { comboTimer -= dt / 3.4; if (comboTimer <= 0) combo = 0; }
    if (player.prim && player.prim.kind === 'wire' && player.mode === 'surface') stats.wireDist += player.speed * dt;
    stats.onRoof = player.mode === 'surface' && player.prim && player.prim.type === 'box' && player.normal.y > 0.5 && player.heightAboveGround > 5;

    // ---- squirrel model
    const g = squirrel.group;
    g.position.copy(player.visPos); g.quaternion.copy(player.visQuat);
    g.visible = !(player.invuln > 0 && Math.floor(time * 18) % 2 === 0);
    sstate.mode = player.mode === 'air' ? 'air' : 'surface';
    sstate.speed = player.speed; sstate.steep = clamp(1 - player.normal.y, 0, 1); sstate.climb = player.heading.y;
    sstate.thin = player.thin; sstate.turn = player.turn; sstate.airTime = player.airTime; sstate.alert = player.alert; sstate.time = time;
    if (player.mode === 'air') { sstate.airForward = player.vel.dot(player.heading); sstate.airUp = player.vel.dot(player.normal); sstate.speed = Math.abs(sstate.airForward); }
    const ld = nearestDog(16);
    if (ld && player.alert > 0.3) { g.updateMatrixWorld(); sstate.lookLocal = g.worldToLocal(lookLocal.copy(ld.position).setY(ld.position.y + 0.6)); } else sstate.lookLocal = null;
    squirrel.update(dt, sstate);

    // ---- camera
    const aspect = container.clientWidth / Math.max(1, container.clientHeight);
    if (mode === 'title') {
      const a = time * 0.07 + 0.9;
      _v.copy(player.visPos); _v.y += 0.28;
      camera.position.set(_v.x + Math.sin(a) * 2.6, _v.y + 0.55, _v.z + Math.cos(a) * 2.6);
      camera.lookAt(_v.x, _v.y + (aspect < 1 ? -0.25 : 0.25), _v.z);
      const fov = aspect < 1 ? 62 : 42; if (camera.fov !== fov || camera.aspect !== aspect) { camera.fov = fov; camera.aspect = aspect; camera.updateProjectionMatrix(); }
    } else rig.update(dt, player, input.consumeLook(), aspect);

    // ---- pickups
    const got = pickups.update(dt, time, player.visPos);
    if (streakTimer > 0) { streakTimer -= dt; if (streakTimer <= 0) streak = 0; }
    for (const a of got) {
      if (a.kind === 'golden') {
        stats.golden++; hud.setGolden(stats.golden, pickups.goldenTotal); audio.play('golden'); effects.sparkle(a.pos, 26, true);
        hud.toast('Golden acorn: ' + (a.name || 'found') + '  (' + stats.golden + ' of ' + pickups.goldenTotal + ')', 3200); input.vibrate(60);
        health = maxHealth; hud.setHealth(health, maxHealth);
      } else {
        stats.acorns++; hud.setAcorns(stats.acorns); audio.play('pickup', { streak: Math.min(12, streak) }); effects.sparkle(a.pos, 6, false);
        streak++; streakTimer = 1.6; input.vibrate(8);
      }
      squirrel.trigger('pickup');
    }

    // ---- combat and dogs
    if (attackCd > 0) attackCd -= dt;
    if (playing && input.attackPressed && attackCd <= 0 && player.stun <= 0) doAttack();
    if (dogs) {
      dogCtx.time = time; dogCtx.player.heightAboveGround = player.heightAboveGround; dogCtx.player.hidden = player.hidden; dogCtx.player.invulnerable = player.invuln > 0 || respawning || mode !== 'play';
      dogs.update(dt, dogCtx);
      if (player.mode === 'air' && player.vel.y < -1.5) {
        for (const d of dogs.list) {
          if (!d.alive || d.stunned) continue;
          const dx = d.position.x - player.pos.x, dz = d.position.z - player.pos.z, top = d.position.y + (d.height || 0.6);
          if (dx * dx + dz * dz < (d.radius + 0.35) * (d.radius + 0.35) && player.pos.y < top + 0.35 && player.pos.y > top - 0.6) {
            d.hit(2, _v.set(player.vel.x, 0, player.vel.z).normalize(), 'pounce');
            audio.play('pounce'); effects.hit(_v.set(player.pos.x, top, player.pos.z)); rig.addShake(0.8); hitStop = 0.11; input.vibrate(50);
            player.bounce(9.5, 0.5); player.invuln = Math.max(player.invuln, 0.5); squirrel.trigger('jump');
            break;
          }
        }
      }
    }
    if (dangerT > 0) dangerT -= dt;
    sinceHurt += dt;
    if (health < maxHealth && sinceHurt > 12 && dangerT <= 0) { regenT += dt; if (regenT > 6) { regenT = 0; health++; hud.setHealth(health, maxHealth); } }

    // ---- quests
    if (playing) {
      quests.update();
      if (quests.justCompleted) {
        const c = quests.justCompleted;
        hud.questComplete(c.title); audio.play('questDone'); saveNow();
        if (c.final && !endingShown) { endingShown = true; setTimeout(() => { if (mode !== 'play') return; mode = 'paused'; input.setEnabled(false); hud.showEnding({ acorns: stats.acorns, golden: stats.golden, goldenTotal: pickups.goldenTotal, time: stats.time, dogs: stats.dogs }, () => { mode = 'play'; input.setEnabled(true); }); }, 2200); }
        setTimeout(() => audio.play('questNew'), 1500);
      }
      hud.setQuest(quests.view());
      const tg = quests.target();
      if (tg) {
        _v.copy(tg).project(camera);
        const behind = _v.z > 1;
        const on = !behind && Math.abs(_v.x) < 0.9 && Math.abs(_v.y) < 0.82;
        const w = container.clientWidth, h = container.clientHeight;
        let ax = _v.x, ay = -_v.y; if (behind) { ax = -ax; ay = -ay; }
        const dist = tg.distanceTo(player.pos);
        hud.setWaypoint({ visible: dist > 2.2, x: (_v.x * 0.5 + 0.5) * w, y: (-_v.y * 0.5 + 0.5) * h, distance: dist, onScreen: on, angle: Math.atan2(ay, ax), label: quests.label() });
      } else hud.setWaypoint({ visible: false });
    }

    // ---- hud meters
    hud.setBurst(player.bursting ? 1 : player.charge);
    hud.setCombo(combo, comboTimer);
    hud.setDogAlert(clamp(dangerT / 2.5, 0, 1));
    if (ld && playing) {
      _v.set(ld.position.x, ld.position.y + (ld.height || 0.6) * 0.8, ld.position.z).project(camera);
      const vis = _v.z < 1 && Math.abs(_v.x) < 1 && Math.abs(_v.y) < 1;
      const dd = ld.position.distanceTo(player.pos);
      hud.setTargetReticle({ visible: vis, x: (_v.x * 0.5 + 0.5) * container.clientWidth, y: (-_v.y * 0.5 + 0.5) * container.clientHeight, kind: dd < 2.3 ? 'scratch' : 'throw' });
    } else hud.setTargetReticle({ visible: false });
    hud.update(rawDt);

    // ---- effects, world, audio
    effects.setRing(playing && player.mode === 'surface' && player.target.valid && (player.wishMag > 0 || player.steepW > 0.5), player.target.point, player.target.normal, time, camera);
    if (player.bursting && player.speed > 9) { leafAcc += dt * 40; while (leafAcc > 1) { leafAcc -= 1; effects.streak(player.visPos, player.vel); } }
    effects.update(dt, time, player.visPos, Q.leaves);
    const tk = player.prim && (player.prim.kind === 'branch' || player.prim.kind === 'trunk') && player.heightAboveGround > 2.5 ? 1 : 0;
    inTree += (tk - inTree) * Math.min(1, dt * 2); flow += (clamp(combo / 6, 0, 1) - flow) * Math.min(1, dt * 2);
    env.update(player.visPos, time);
    city.update(dt, time, camera, mode === 'title' ? null : player.visPos);
    audio.update(rawDt, { speed: player.mode === 'surface' ? player.speed : player.vel.length(), surface: surfaceName(), airborne: player.mode === 'air', height: player.heightAboveGround, alert: mode === 'title' ? 0.3 : player.alert, danger: clamp(dangerT / 2.5, 0, 1), inTree, flow, paused: false });
    post.grade.uniforms.uDanger.value += (clamp(dangerT / 3, 0, 0.5) + (sinceHurt < 0.5 ? 0.5 : 0) - post.grade.uniforms.uDanger.value) * 0.1;
    post.grade.uniforms.uSpeed.value += ((player.bursting ? 1 : 0) - post.grade.uniforms.uSpeed.value) * 0.1;

    post.render(rawDt);
    input.endFrame();

    // ---- housekeeping
    saveT += rawDt; if (saveT > 6 && playing) { saveT = 0; saveNow(); }
    prT += rawDt;
    if (prT > 1.5 && time > 4) { // adapt resolution to hold the frame rate
      prT = 0;
      if (frameAvg > 21 && curPR > 0.85) { curPR = Math.max(0.85, curPR - 0.15); resize(); }
      else if (frameAvg < 14.5 && curPR < maxPR) { curPR = Math.min(maxPR, curPR + 0.1); resize(); }
    }
  }
  renderer.setAnimationLoop(frame);
  document.addEventListener('visibilitychange', () => { if (document.hidden) { saveNow(); if (mode === 'play') togglePause(); } last = performance.now(); });
  window.addEventListener('pagehide', saveNow);

  // compile shaders before showing the title so the first seconds are smooth
  try { renderer.compile(scene, camera); } catch (e) { /* ignore */ }
  loading.classList.add('done'); setTimeout(() => loading.remove(), 700);

  window.game = { player, world, rig, camera, scene, renderer, stats, quests, pickups, dogs: () => dogs, layout, hud, input, audio, squirrel, TUNE, start: startGame, info: () => ({ calls: renderer.info.render.calls, tris: renderer.info.render.triangles, frameAvg, curPR, mode }), step: (n, dtt = 1 / 60) => { for (let i = 0; i < n; i++) frame(last + dtt * 1000); } };
}

boot().catch((err) => {
  console.error(err);
  const l = document.getElementById('loading');
  if (l) l.querySelector('.loading-text').textContent = 'Could not start: ' + (err && err.message ? err.message : err);
});
