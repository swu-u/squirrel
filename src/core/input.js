// Input layer: touch (floating stick + camera drag + Jump / Attack buttons), keyboard, mouse, gamepad.
// createInput(element) -> input. See the bottom of this file for the full list of fields.
import '../ui/ui.css';

const STICK_RADIUS = 56;        // px, travel of the knob
const STICK_FOLLOW = 1.35;      // the ring starts to follow the thumb beyond this many radii
const STICK_DEAD = 0.14;
const STICK_CURVE = 1.35;
const STICK_ZONE = 0.45;        // left share of the screen that belongs to the stick
const PAD_DEAD = 0.18;
const PAD_LOOK_SPEED = 1000;    // CSS px per second at full right stick
const CLICK_SLOP = 6;           // px a mouse may travel and still count as a click

const ICON_JUMP = '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M12 27 24 15l12 12" fill="none" stroke="currentColor" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 37l9-9 9 9" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" opacity=".55"/></svg>';
const ICON_ATTACK = '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M11.5 21.5c0 11 6 19 12.5 21 6.500-2 12.500-10 12.500-21z" fill="currentColor" opacity=".9"/><path d="M8.500 21.500c0-8 6.800-12.500 15.500-12.500s15.500 4.500 15.500 12.500c0 1.500-1 2.500-2.300 2.500H10.800c-1.300 0-2.300-1-2.300-2.500z" fill="currentColor"/><path d="M24 9.500c0-2.800 1.200-4.600 3.600-5.500" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>';

const GAME_KEYS = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
  'Space', 'KeyF', 'KeyJ', 'Escape', 'KeyP']);

function shape(x, y, dead, curve, out) {
  const m = Math.hypot(x, y);
  if (m <= dead) { out.x = 0; out.y = 0; return out; }
  const k = Math.pow(Math.min(1, (m - dead) / (1 - dead)), curve) / m;
  out.x = x * k; out.y = y * k;
  return out;
}

export function createInput(element) {
  const doc = element.ownerDocument || document;
  const win = doc.defaultView || window;
  const nav = win.navigator;

  element.classList.add('sq-input-root');

  // ---- touch controls (DOM) ----
  const layer = doc.createElement('div');
  layer.className = 'sq-touch';
  layer.innerHTML =
    '<div class="sq-stick is-idle"><div class="sq-stick-ring"></div><div class="sq-stick-knob"></div></div>' +
    '<div class="sq-btn sq-btn-attack" data-btn="attack" role="button" aria-label="Attack">' + ICON_ATTACK + '<span class="sq-btn-hint"></span></div>' +
    '<div class="sq-btn sq-btn-jump" data-btn="jump" role="button" aria-label="Jump">' + ICON_JUMP + '<span class="sq-btn-hint"></span></div>';
  element.appendChild(layer);
  const stickEl = layer.querySelector('.sq-stick');
  const knobEl = layer.querySelector('.sq-stick-knob');
  const btnEls = { jump: layer.querySelector('.sq-btn-jump'), attack: layer.querySelector('.sq-btn-attack') };

  // ---- state ----
  let enabled = true;
  let selfExitLock = false;
  const keys = new Set();
  const stick = { id: -1, ox: 0, oy: 0, x: 0, y: 0 };
  const lookPtr = { id: -1, x: 0, y: 0 };
  const btn = { jump: { id: -1 }, attack: { id: -1 } };
  const mouse = { id: -1, x: 0, y: 0, travel: 0, button: 0, attack: false };
  const pad = { x: 0, y: 0, jump: false, attack: false, start: false, seen: 0, last: 0 };
  const lookAcc = { dx: 0, dy: 0 };
  const lookOut = { dx: 0, dy: 0 };
  const tmp = { x: 0, y: 0 };

  const input = {
    move: { x: 0, y: 0 },
    jumpPressed: false, jumpHeld: false,
    attackPressed: false, attackHeld: false,
    pausePressed: false, anyPressed: false,
    isTouch: false,
    pointerLocked: false,
    enabled: true,
    vibrationEnabled: true,
    consumeLook, endFrame, setEnabled, setButtonHint, vibrate, destroy,
    element, touchLayer: layer,
  };

  // true while a finger or a held mouse button is dragging the camera
  Object.defineProperty(input, 'lookActive', {
    enumerable: true,
    get() { return enabled && (lookPtr.id !== -1 || mouse.id !== -1); },
  });

  function refreshLayer() {
    layer.classList.toggle('is-on', input.isTouch && enabled);
  }
  function markTouch() {
    if (input.isTouch) return;
    input.isTouch = true;
    element.classList.add('sq-is-touch');
    refreshLayer();
  }
  // Show the controls straight away on phones, before the first touch.
  try {
    if (win.matchMedia && win.matchMedia('(hover: none) and (pointer: coarse)').matches) markTouch();
  } catch (e) { /* ignore */ }

  function press(name) {
    if (!enabled) return;
    input[name + 'Pressed'] = true;
    input.anyPressed = true;
  }

  function recompute() {
    if (!enabled) {
      input.move.x = 0; input.move.y = 0;
      input.jumpHeld = false; input.attackHeld = false;
      return;
    }
    let kx = (keys.has('KeyD') || keys.has('ArrowRight') ? 1 : 0) - (keys.has('KeyA') || keys.has('ArrowLeft') ? 1 : 0);
    let ky = (keys.has('KeyW') || keys.has('ArrowUp') ? 1 : 0) - (keys.has('KeyS') || keys.has('ArrowDown') ? 1 : 0);
    if (kx && ky) { kx *= Math.SQRT1_2; ky *= Math.SQRT1_2; }
    let x = kx + stick.x + pad.x;
    let y = ky + stick.y + pad.y;
    const m = Math.hypot(x, y);
    if (m > 1) { x /= m; y /= m; }
    input.move.x = x; input.move.y = y;
    input.jumpHeld = btn.jump.id !== -1 || keys.has('Space') || pad.jump;
    input.attackHeld = btn.attack.id !== -1 || keys.has('KeyF') || keys.has('KeyJ') || mouse.attack || pad.attack;
  }

  function isUI(t) {
    if (!t || !t.closest || t === element) return false;
    return !!t.closest('[data-no-input], button, a, input, select, textarea, label');
  }

  // ---- stick ----
  function placeStick() {
    stickEl.style.transform = 'translate3d(' + (stick.ox - STICK_RADIUS) + 'px,' + (stick.oy - STICK_RADIUS) + 'px,0)';
  }
  function stickStart(e, rect) {
    stick.id = e.pointerId;
    stick.ox = e.clientX - rect.left; stick.oy = e.clientY - rect.top;
    stick.x = 0; stick.y = 0;
    stickEl.classList.remove('is-idle');
    stickEl.classList.add('is-active');
    placeStick();
    knobEl.style.transform = 'translate3d(0px,0px,0)';
  }
  function stickMove(e) {
    const rect = element.getBoundingClientRect();
    const px = e.clientX - rect.left, py = e.clientY - rect.top;
    let dx = px - stick.ox, dy = py - stick.oy;
    let d = Math.hypot(dx, dy);
    const far = STICK_RADIUS * STICK_FOLLOW;
    if (d > far) {                       // the ring trails after a thumb that wandered far
      const pull = (d - far) / d;
      stick.ox += dx * pull; stick.oy += dy * pull;
      dx = px - stick.ox; dy = py - stick.oy; d = far;
      placeStick();
    }
    const k = d > STICK_RADIUS ? STICK_RADIUS / d : 1;
    knobEl.style.transform = 'translate3d(' + (dx * k) + 'px,' + (dy * k) + 'px,0)';
    shape(dx * k / STICK_RADIUS, -dy * k / STICK_RADIUS, STICK_DEAD, STICK_CURVE, tmp);
    stick.x = tmp.x; stick.y = tmp.y;
  }
  function stickEnd() {
    stick.id = -1; stick.x = 0; stick.y = 0;
    stickEl.classList.remove('is-active');
    stickEl.classList.add('is-idle');
    stickEl.style.transform = '';
    knobEl.style.transform = '';
  }

  // ---- pointer events ----
  function capture(e) {
    try { if (e.isTrusted && e.target.setPointerCapture) e.target.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
  }

  function onPointerDown(e) {
    const touch = e.pointerType === 'touch' || e.pointerType === 'pen';
    if (touch) markTouch();
    if (!enabled) return;
    const t = e.target;
    const b = t && t.closest ? t.closest('.sq-btn') : null;
    if (b && layer.contains(b)) {        // a finger that starts on a button belongs to the button until it lifts
      const name = b.dataset.btn, s = btn[name];
      if (s.id === -1) {
        s.id = e.pointerId;
        b.classList.add('is-down');
        press(name);
        vibrate(8);
        recompute();
      }
      capture(e);
      e.preventDefault();
      return;
    }
    if (isUI(t)) return;
    if (!touch) {
      if (input.pointerLocked) {
        if (e.button === 0) { mouse.attack = true; press('attack'); recompute(); }
        return;
      }
      mouse.id = e.pointerId; mouse.x = e.clientX; mouse.y = e.clientY; mouse.travel = 0; mouse.button = e.button;
      input.anyPressed = true;
      e.preventDefault();
      return;
    }
    input.anyPressed = true;
    const rect = element.getBoundingClientRect();
    if (stick.id === -1 && e.clientX - rect.left < rect.width * STICK_ZONE) {
      stickStart(e, rect);
      recompute();
    } else if (lookPtr.id === -1) {
      lookPtr.id = e.pointerId; lookPtr.x = e.clientX; lookPtr.y = e.clientY;
    }
    e.preventDefault();
  }

  function onPointerMove(e) {
    const id = e.pointerId;
    if (id === stick.id) { stickMove(e); recompute(); return; }
    if (id === lookPtr.id) {
      lookAcc.dx += e.clientX - lookPtr.x; lookAcc.dy += e.clientY - lookPtr.y;
      lookPtr.x = e.clientX; lookPtr.y = e.clientY;
      return;
    }
    if (e.pointerType !== 'mouse' || !enabled) return;
    if (input.pointerLocked) {
      lookAcc.dx += e.movementX || 0; lookAcc.dy += e.movementY || 0;
    } else if (id === mouse.id) {
      const dx = e.clientX - mouse.x, dy = e.clientY - mouse.y;
      mouse.x = e.clientX; mouse.y = e.clientY;
      mouse.travel += Math.abs(dx) + Math.abs(dy);
      lookAcc.dx += dx; lookAcc.dy += dy;
    }
  }

  function releaseButton(name) {
    btn[name].id = -1;
    btnEls[name].classList.remove('is-down');
  }

  function onPointerUp(e) {
    const id = e.pointerId;
    if (id === stick.id) { stickEnd(); recompute(); }
    if (id === lookPtr.id) lookPtr.id = -1;
    if (id === btn.jump.id) { releaseButton('jump'); recompute(); }
    if (id === btn.attack.id) { releaseButton('attack'); recompute(); }
    if (e.pointerType === 'mouse') {
      if (e.button === 0 && mouse.attack) { mouse.attack = false; recompute(); }
      if (id === mouse.id) {
        const click = e.type === 'pointerup' && mouse.button === 0 && mouse.travel < CLICK_SLOP;
        mouse.id = -1;
        if (click && enabled && !input.pointerLocked) requestLock();
      }
    }
  }

  function requestLock() {
    if (!element.requestPointerLock) return;
    try {
      const p = element.requestPointerLock();
      if (p && p.catch) p.catch(() => {});
    } catch (err) { /* ignore */ }
  }
  function exitLock() {
    if (doc.pointerLockElement === element && doc.exitPointerLock) {
      selfExitLock = true;
      try { doc.exitPointerLock(); } catch (err) { /* ignore */ }
    }
  }
  function onLockChange() {
    const locked = doc.pointerLockElement === element;
    const was = input.pointerLocked;
    input.pointerLocked = locked;
    if (was && !locked) {
      mouse.attack = false;
      // The browser swallows Escape while the pointer is locked, so losing the lock counts as the pause key.
      if (!selfExitLock) press('pause');
      selfExitLock = false;
      recompute();
    }
  }

  // ---- keyboard ----
  function typing(e) {
    const t = e.target, tag = t && t.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (t && t.isContentEditable);
  }
  function onKeyDown(e) {
    if (!enabled || e.metaKey || e.ctrlKey || e.altKey || typing(e)) return;
    const c = e.code;
    if (!GAME_KEYS.has(c)) { if (!e.repeat) input.anyPressed = true; return; }
    e.preventDefault();
    if (e.repeat) return;
    keys.add(c);
    input.anyPressed = true;
    if (c === 'Space') press('jump');
    else if (c === 'KeyF' || c === 'KeyJ') press('attack');
    else if (c === 'Escape' || c === 'KeyP') press('pause');
    recompute();
  }
  function onKeyUp(e) {
    if (keys.delete(e.code)) recompute();
  }

  // ---- gamepad (polled from endFrame) ----
  function onPadConnect() { pad.seen++; }
  function onPadDisconnect() {
    pad.seen = Math.max(0, pad.seen - 1);
    pad.x = pad.y = 0; pad.jump = pad.attack = pad.start = false;
    recompute();
  }
  function pollPad() {
    const now = win.performance.now();
    const dt = pad.last ? Math.min(0.05, (now - pad.last) / 1000) : 0;
    pad.last = now;
    if (!pad.seen || !nav.getGamepads) return;
    const list = nav.getGamepads();
    let gp = null;
    for (let i = 0; i < list.length; i++) { if (list[i] && list[i].connected) { gp = list[i]; break; } }
    if (!gp) return;
    const ax = gp.axes, bt = gp.buttons;
    shape(ax[0] || 0, -(ax[1] || 0), PAD_DEAD, STICK_CURVE, tmp);
    pad.x = tmp.x; pad.y = tmp.y;
    shape(ax[2] || 0, ax[3] || 0, PAD_DEAD, 1.8, tmp);
    if (enabled) { lookAcc.dx += tmp.x * PAD_LOOK_SPEED * dt; lookAcc.dy += tmp.y * PAD_LOOK_SPEED * dt; }
    const j = !!(bt[0] && bt[0].pressed), a = !!(bt[2] && bt[2].pressed), s = !!(bt[9] && bt[9].pressed);
    if (j && !pad.jump) press('jump');
    if (a && !pad.attack) press('attack');
    if (s && !pad.start) press('pause');
    pad.jump = j; pad.attack = a; pad.start = s;
    recompute();
  }

  // ---- housekeeping ----
  function releaseAll() {
    keys.clear();
    if (stick.id !== -1) stickEnd();
    lookPtr.id = -1;
    releaseButton('jump'); releaseButton('attack');
    mouse.id = -1; mouse.attack = false;
    lookAcc.dx = 0; lookAcc.dy = 0;
    recompute();
  }
  function onBlur() { releaseAll(); }
  function onVisibility() { if (doc.hidden) releaseAll(); }
  function stop(e) { if (!isUI(e.target)) e.preventDefault(); }
  function stopAlways(e) { e.preventDefault(); }

  const passiveOff = { passive: false };
  element.addEventListener('pointerdown', onPointerDown, passiveOff);
  win.addEventListener('pointermove', onPointerMove);
  win.addEventListener('pointerup', onPointerUp);
  win.addEventListener('pointercancel', onPointerUp);
  win.addEventListener('keydown', onKeyDown);
  win.addEventListener('keyup', onKeyUp);
  win.addEventListener('blur', onBlur);
  doc.addEventListener('visibilitychange', onVisibility);
  doc.addEventListener('pointerlockchange', onLockChange);
  win.addEventListener('gamepadconnected', onPadConnect);
  win.addEventListener('gamepaddisconnected', onPadDisconnect);
  // No scrolling, pinch zoom, double-tap zoom, long-press callout or context menu over the game.
  element.addEventListener('touchstart', stop, passiveOff);
  element.addEventListener('touchmove', stop, passiveOff);
  element.addEventListener('contextmenu', stopAlways);
  element.addEventListener('dblclick', stop);
  element.addEventListener('selectstart', stop);
  element.addEventListener('dragstart', stopAlways);
  element.addEventListener('gesturestart', stopAlways);
  element.addEventListener('gesturechange', stopAlways);

  // ---- public methods ----
  function consumeLook() {
    lookOut.dx = enabled ? lookAcc.dx : 0;
    lookOut.dy = enabled ? lookAcc.dy : 0;
    lookAcc.dx = 0; lookAcc.dy = 0;
    return lookOut;
  }
  function endFrame() {
    input.jumpPressed = false; input.attackPressed = false;
    input.pausePressed = false; input.anyPressed = false;
    pollPad();
  }
  function setEnabled(on) {
    on = !!on;
    if (on === enabled) return;
    enabled = on; input.enabled = on;
    if (!on) {
      releaseAll();
      exitLock();
      input.jumpPressed = input.attackPressed = input.pausePressed = input.anyPressed = false;
    }
    refreshLayer();
    recompute();
  }
  function setButtonHint(name, text) {
    const b = btnEls[name];
    if (!b) return;
    const h = b.querySelector('.sq-btn-hint');
    h.textContent = text || '';
    b.classList.toggle('has-hint', !!text);
  }
  function vibrate(ms) {
    if (!input.vibrationEnabled || !nav.vibrate) return;
    if (nav.userActivation && !nav.userActivation.hasBeenActive) return;   // browsers block it before the first tap
    try { nav.vibrate(ms); } catch (err) { /* ignore */ }
  }
  function destroy() {
    element.removeEventListener('pointerdown', onPointerDown, passiveOff);
    win.removeEventListener('pointermove', onPointerMove);
    win.removeEventListener('pointerup', onPointerUp);
    win.removeEventListener('pointercancel', onPointerUp);
    win.removeEventListener('keydown', onKeyDown);
    win.removeEventListener('keyup', onKeyUp);
    win.removeEventListener('blur', onBlur);
    doc.removeEventListener('visibilitychange', onVisibility);
    doc.removeEventListener('pointerlockchange', onLockChange);
    win.removeEventListener('gamepadconnected', onPadConnect);
    win.removeEventListener('gamepaddisconnected', onPadDisconnect);
    element.removeEventListener('touchstart', stop, passiveOff);
    element.removeEventListener('touchmove', stop, passiveOff);
    element.removeEventListener('contextmenu', stopAlways);
    element.removeEventListener('dblclick', stop);
    element.removeEventListener('selectstart', stop);
    element.removeEventListener('dragstart', stopAlways);
    element.removeEventListener('gesturestart', stopAlways);
    element.removeEventListener('gesturechange', stopAlways);
    exitLock();
    layer.remove();
  }

  refreshLayer();
  return input;
}
