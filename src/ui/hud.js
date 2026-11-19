// On-screen interface: a DOM overlay above the canvas. createHUD(root, input) -> hud.
import './ui.css';

const SETTINGS_KEY = 'squirrel.settings.v1';
const TIP_KEY = 'squirrel.tip.sideways.v1';
const DEFAULT_SETTINGS = { volume: 0.8, music: true, sensitivity: 1, invertY: false, quality: 'auto', vibration: true };
const QUALITIES = [['auto', 'Auto'], ['low', 'Low'], ['medium', 'Medium'], ['high', 'High']];

// ---------- icons (all drawn here, 24 x 24 unless noted) ----------
const acornSvg = (nut, nutDark, cap, capDark, extra = '') =>
  `<svg class="sq-ico" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12.4 4.600c0-1.500.7-2.500 2-3" fill="none" stroke="${capDark}" stroke-width="1.700" stroke-linecap="round"/>
    <path d="M5.300 10.800c0 6 3.300 10.200 6.700 11.400 3.400-1.200 6.700-5.400 6.700-11.400z" fill="${nut}"/>
    <path d="M12 22.200c3.400-1.200 6.700-5.400 6.700-11.400h-3.200c0 5-1.300 9-3.500 11.400z" fill="${nutDark}" opacity=".55"/>
    <ellipse cx="9" cy="14.500" rx="1.300" ry="2.600" fill="#fff" opacity=".42" transform="rotate(12 9 14.500)"/>
    <path d="M3.600 10.600c0-4.200 3.700-6.600 8.400-6.600s8.400 2.400 8.400 6.600c0 .9-.6 1.600-1.500 1.600H5.100c-.9 0-1.500-.7-1.500-1.600z" fill="${cap}"/>
    <path d="M6.500 7.300l2.200 2.300M10 5.800l2.300 2.600M14 5.600l2.300 2.600M8.200 10.300l1 1M12.600 9.900l1.200 1.300" fill="none" stroke="${capDark}" stroke-width="1" stroke-linecap="round" opacity=".7"/>
    ${extra}
  </svg>`;

const ICON = {
  acorn: acornSvg('#e8842c', '#b65a12', '#7a4a26', '#4a2f1c'),
  golden: acornSvg('#ffd24a', '#e09a12', '#c98a1a', '#8a5a0c',
    '<path d="M19.500 1.500l.7 1.800 1.800.7-1.800.7-.7 1.800-.7-1.800-1.800-.7 1.800-.7z" fill="#fff6c8"/>'),
  heart: `<svg class="sq-ico" viewBox="0 0 24 24" aria-hidden="true">
    <path class="sq-heart-shape" d="M12 20.800S3.200 14.900 3.200 8.900c0-3 2.300-5.200 5-5.200 1.600 0 3 .8 3.800 2.100.8-1.300 2.200-2.100 3.800-2.100 2.700 0 5 2.200 5 5.200 0 6-8.800 11.900-8.800 11.900z"/>
    <path class="sq-heart-shine" d="M7.900 6.200c-1.300.2-2.200 1.300-2.200 2.700" fill="none" stroke="#fff" stroke-width="1.500" stroke-linecap="round" opacity=".6"/>
  </svg>`,
  paw: `<svg class="sq-ico" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
    <path d="M12 11.600c-3 0-5.600 2.700-5.600 5.300 0 1.900 1.500 2.900 3.200 2.900 1 0 1.600-.4 2.400-.4s1.400.4 2.400.4c1.700 0 3.200-1 3.200-2.900 0-2.600-2.600-5.300-5.600-5.300z"/>
    <ellipse cx="5.300" cy="10.300" rx="1.700" ry="2.300" transform="rotate(-22 5.300 10.300)"/>
    <ellipse cx="9.400" cy="6.600" rx="1.800" ry="2.500" transform="rotate(-8 9.400 6.600)"/>
    <ellipse cx="14.600" cy="6.600" rx="1.800" ry="2.500" transform="rotate(8 14.600 6.600)"/>
    <ellipse cx="18.700" cy="10.300" rx="1.700" ry="2.300" transform="rotate(22 18.700 10.300)"/>
  </svg>`,
  pause: `<svg class="sq-ico" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
    <rect x="6" y="5" width="4.400" height="14" rx="2"/><rect x="13.600" y="5" width="4.400" height="14" rx="2"/></svg>`,
  dog: `<svg class="sq-ico" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5.200 5.200C3.300 6 2.300 8.600 2.700 11.800c.2 1.500 1.300 2.300 2.300 1.900l1.600-.7z" fill="currentColor"/>
    <path d="M18.800 5.200c1.900.8 2.900 3.400 2.500 6.600-.2 1.500-1.300 2.300-2.300 1.900l-1.600-.7z" fill="currentColor"/>
    <path d="M12 3.600c-4 0-6.800 2.600-6.800 6.600 0 2.300.6 3.900 1.300 5.600.9 2.400 2.800 4.600 5.500 4.600s4.600-2.200 5.500-4.600c.7-1.700 1.300-3.300 1.300-5.600 0-4-2.800-6.600-6.800-6.600z" fill="currentColor"/>
    <ellipse cx="12" cy="15.600" rx="3.300" ry="2.900" fill="#fff6e4" opacity=".92"/>
    <path d="M10.600 14.300h2.800c.4 0 .6.400.3.800l-1.200 1.200c-.3.300-.7.300-1 0l-1.200-1.200c-.3-.4-.1-.8.300-.8z" fill="#2e1c10"/>
    <circle cx="9" cy="10" r="1.150" fill="#fff6e4"/><circle cx="15" cy="10" r="1.150" fill="#fff6e4"/>
  </svg>`,
  eye: `<svg class="sq-ico" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M1.800 12S5.600 5.400 12 5.400 22.200 12 22.200 12 18.400 18.600 12 18.600 1.800 12 1.800 12z" fill="#fff6e4" stroke="currentColor" stroke-width="1.800" stroke-linejoin="round"/>
    <circle cx="12" cy="12" r="3.700" fill="currentColor"/><circle cx="13.300" cy="10.700" r="1.100" fill="#fff6e4"/>
  </svg>`,
  clock: `<svg class="sq-ico" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.200" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12.500" r="8"/><path d="M12 8v4.800l3 1.900M9.500 2.200h5"/></svg>`,
  close: `<svg class="sq-ico" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.800" stroke-linecap="round"><path d="M7 7l10 10M17 7L7 17"/></svg>`,
  turn: `<svg class="sq-ico" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.900" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="11.500" width="15" height="8.500" rx="2"/><path d="M8 8V5.500a2 2 0 0 1 2-2h1" opacity=".55"/><path d="M15 3.500c3 .3 5 2.300 5.300 5.200M20.300 8.700l-2.200-1M20.300 8.700l1.200-2.100"/></svg>`,
  arrow: `<svg class="sq-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4.600c-.9-.5-1.900.4-1.500 1.400L5.900 12l-2.400 6c-.4 1 .6 1.900 1.500 1.400l14.600-6.500c.9-.4.9-1.400 0-1.800z" fill="currentColor" stroke="#2e1c10" stroke-width="1.300" stroke-linejoin="round"/></svg>`,
  pin: `<svg class="sq-ico" viewBox="0 0 24 30" aria-hidden="true"><path d="M12 28.500S3 18.400 3 11.600C3 6.300 7 2.500 12 2.500s9 3.800 9 9.100c0 6.800-9 16.900-9 16.900z" fill="currentColor" stroke="#2e1c10" stroke-width="1.500" stroke-linejoin="round"/><circle cx="12" cy="11.500" r="3.600" fill="#fff6e4"/></svg>`,
  reticle: `<svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3.400" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 16v-5a5 5 0 0 1 5-5h5M32 6h5a5 5 0 0 1 5 5v5M42 32v5a5 5 0 0 1-5 5h-5M16 42h-5a5 5 0 0 1-5-5v-5"/></svg>`,
};

// ---------- how to play diagrams (160 x 100) ----------
const C = { bark: '#4a2f1c', deep: '#2e1c10', orange: '#e8842c', gold: '#f6c445', cream: '#fff6e4', fur: '#c96f2a', leaf: '#8fae4b', red: '#d9503a' };
const squirrel = (x, y, s = 1, flip = false) => `
  <g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
    <path d="M-9 0c-9 1-15-6-12-14 2-6 9-7 12-3 2 3 0 7-3 6" fill="none" stroke="${C.fur}" stroke-width="6.500" stroke-linecap="round"/>
    <ellipse cx="0" cy="-5" rx="9.500" ry="6.500" fill="${C.fur}"/>
    <circle cx="9" cy="-10.500" r="5.200" fill="${C.fur}"/>
    <path d="M6.500-14.500l.6-4.600 3.300 3z" fill="${C.fur}"/>
    <circle cx="10.800" cy="-11.200" r="1.150" fill="${C.deep}"/>
    <ellipse cx="2" cy="-3" rx="5" ry="3" fill="${C.cream}" opacity=".75"/>
  </g>`;
const branch = (x1, y1, x2, y2) => `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${C.bark}" stroke-width="6" stroke-linecap="round"/>`;
const key = (x, y, label, w = 20) => `<rect x="${x}" y="${y}" width="${w}" height="20" rx="5" fill="${C.cream}" stroke="${C.bark}" stroke-width="2"/><text x="${x + w / 2}" y="${y + 14.500}" text-anchor="middle" font-size="11" font-weight="700" fill="${C.bark}">${label}</text>`;
const wrap = (inner) => `<svg class="sq-diagram" viewBox="0 0 160 100" aria-hidden="true">${inner}</svg>`;

const DIAGRAM = {
  moveTouch: wrap(`
    <rect x="8" y="14" width="144" height="72" rx="13" fill="${C.cream}" stroke="${C.bark}" stroke-width="3"/>
    <circle cx="44" cy="56" r="19" fill="none" stroke="${C.bark}" stroke-width="2.500" opacity=".45"/>
    <circle cx="50" cy="48" r="9.500" fill="${C.orange}" stroke="${C.bark}" stroke-width="2"/>
    <path d="M57 39l7-9M64 30l-6.500 1.200M64 30l-.8 6.500" fill="none" stroke="${C.bark}" stroke-width="2.400" stroke-linecap="round"/>
    <path d="M84 60c10-18 34-18 46-4" fill="none" stroke="${C.orange}" stroke-width="3" stroke-linecap="round" stroke-dasharray="1 7"/>
    <path d="M130 56l-1.500-8M130 56l-8 1" fill="none" stroke="${C.orange}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="84" cy="60" r="7" fill="${C.gold}" stroke="${C.bark}" stroke-width="2"/>`),
  moveKeys: wrap(`
    ${key(34, 26, 'W')}${key(10, 50, 'A')}${key(34, 50, 'S')}${key(58, 50, 'D')}
    <rect x="104" y="20" width="36" height="58" rx="18" fill="${C.cream}" stroke="${C.bark}" stroke-width="3"/>
    <path d="M122 20v22M104 42h36" stroke="${C.bark}" stroke-width="2.500"/>
    <path d="M90 88c14 7 44 7 62 0" fill="none" stroke="${C.orange}" stroke-width="3" stroke-linecap="round" stroke-dasharray="1 7"/>
    <path d="M152 88l-7.500-2.500M152 88l-5 6" fill="none" stroke="${C.orange}" stroke-width="3" stroke-linecap="round"/>`),
  leap: wrap(`
    ${branch(4, 74, 50, 68)}${branch(112, 60, 158, 52)}
    <path d="M40 54C60 18 96 14 124 44" fill="none" stroke="${C.bark}" stroke-width="2.600" stroke-linecap="round" stroke-dasharray="1 7"/>
    <ellipse cx="132" cy="54" rx="15" ry="6" fill="none" stroke="${C.gold}" stroke-width="7" opacity=".35"/>
    <ellipse cx="132" cy="54" rx="15" ry="6" fill="none" stroke="${C.gold}" stroke-width="3.200"/>
    <ellipse cx="132" cy="54" rx="15" ry="6" fill="none" stroke="#fff" stroke-width="1" opacity=".8"/>
    ${squirrel(30, 66, 1)}`),
  still: wrap(`
    ${branch(6, 80, 84, 80)}
    ${squirrel(40, 78, 1.150)}
    <path d="M62 52l9-5M64 62h11M60 43l6-8" stroke="${C.bark}" stroke-width="2.400" stroke-linecap="round" opacity=".6"/>
    <circle cx="120" cy="50" r="24" fill="${C.cream}" stroke="${C.bark}" stroke-width="2" opacity=".95"/>
    <circle cx="120" cy="50" r="17" fill="none" stroke="${C.bark}" stroke-width="5.500" opacity=".18"/>
    <path d="M120 33a17 17 0 1 1-17 17" fill="none" stroke="${C.gold}" stroke-width="5.500" stroke-linecap="round"/>
    <g transform="translate(109 39) scale(.92)" color="${C.bark}" fill="${C.bark}">
      <path d="M12 11.600c-3 0-5.600 2.700-5.600 5.300 0 1.900 1.500 2.900 3.200 2.900 1 0 1.600-.4 2.400-.4s1.400.4 2.400.4c1.700 0 3.200-1 3.200-2.900 0-2.600-2.600-5.300-5.600-5.300z"/>
      <ellipse cx="5.300" cy="10.300" rx="1.700" ry="2.300"/><ellipse cx="9.400" cy="6.600" rx="1.800" ry="2.500"/>
      <ellipse cx="14.600" cy="6.600" rx="1.800" ry="2.500"/><ellipse cx="18.700" cy="10.300" rx="1.700" ry="2.300"/>
    </g>`),
  dogs: wrap(`
    <path d="M4 88h152" stroke="${C.bark}" stroke-width="3" stroke-linecap="round" opacity=".35"/>
    <g transform="translate(96 40) scale(2)" color="${C.bark}">
      <path d="M5.200 5.200C3.300 6 2.300 8.600 2.700 11.800c.2 1.500 1.300 2.300 2.300 1.900l1.600-.7z" fill="${C.bark}"/>
      <path d="M18.800 5.200c1.900.8 2.900 3.400 2.500 6.600-.2 1.500-1.300 2.300-2.300 1.900l-1.600-.7z" fill="${C.bark}"/>
      <path d="M12 3.600c-4 0-6.800 2.600-6.800 6.600 0 2.300.6 3.900 1.300 5.600.9 2.400 2.800 4.600 5.500 4.600s4.600-2.200 5.500-4.600c.7-1.700 1.300-3.300 1.300-5.600 0-4-2.800-6.600-6.800-6.600z" fill="#9a6a44"/>
      <ellipse cx="12" cy="15.600" rx="3.300" ry="2.900" fill="${C.cream}"/>
      <path d="M10.600 14.300h2.800c.4 0 .6.400.3.800l-1.200 1.200c-.3.300-.7.300-1 0l-1.200-1.200c-.3-.4-.1-.8.300-.8z" fill="${C.deep}"/>
      <circle cx="9" cy="10" r="1.100" fill="${C.deep}"/><circle cx="15" cy="10" r="1.100" fill="${C.deep}"/>
    </g>
    <path d="M36 66h30" stroke="${C.bark}" stroke-width="2.600" stroke-linecap="round" stroke-dasharray="1 7"/>
    <g transform="translate(70 55) scale(.92) rotate(70 12 12)">
      <path d="M5.300 10.800c0 6 3.300 10.200 6.700 11.400 3.400-1.200 6.700-5.400 6.700-11.400z" fill="${C.orange}"/>
      <path d="M3.600 10.600c0-4.200 3.700-6.600 8.400-6.600s8.400 2.400 8.400 6.600c0 .9-.6 1.600-1.500 1.600H5.100c-.9 0-1.500-.7-1.500-1.600z" fill="${C.bark}"/>
    </g>
    ${squirrel(22, 86, .95)}
    <path d="M120 8v22M120 30l-6.500-6.500M120 30l6.500-6.500" fill="none" stroke="${C.orange}" stroke-width="3.400" stroke-linecap="round" stroke-linejoin="round"/>`),
};

const HOWTO = {
  touch: [
    ['moveTouch', 'Move and look', 'Your left thumb moves you. Drag anywhere else to look around.'],
    ['leap', 'Leap', 'Tap Jump to leap to the glowing ring. Keep holding Jump to keep leaping.'],
    ['still', 'Stop still', 'Stand still to look around and fill the ring. When it glows, run for a burst of speed.'],
    ['dogs', 'Dogs', 'Tap Attack to throw a nut, or scratch up close. Best of all, land on a dog from above.'],
  ],
  keys: [
    ['moveKeys', 'Move and look', 'W, A, S, D or the arrow keys move you. Click, then move the mouse to look around.'],
    ['leap', 'Leap', 'Press Space to leap to the glowing ring. Keep holding Space to keep leaping.'],
    ['still', 'Stop still', 'Stand still to look around and fill the ring. When it glows, run for a burst of speed.'],
    ['dogs', 'Dogs', 'Press F or click to throw a nut, or scratch up close. Best of all, land on a dog from above.'],
  ],
};

// ---------- helpers ----------
function h(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  return e;
}
function restart(el, cls) {           // replay a CSS animation
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
}
function formatTime(sec) {
  sec = Math.max(0, Math.round(sec || 0));
  const m = Math.floor(sec / 60), s = sec % 60;
  return m + ':' + (s < 10 ? '0' : '') + s;
}
function loadSettings() {
  const s = { ...DEFAULT_SETTINGS };
  try {
    const raw = JSON.parse(localStorage.getItem(SETTINGS_KEY) || 'null');
    if (raw && typeof raw === 'object') {
      for (const k of Object.keys(DEFAULT_SETTINGS)) if (typeof raw[k] === typeof DEFAULT_SETTINGS[k]) s[k] = raw[k];
    }
  } catch (e) { /* storage may be blocked */ }
  if (!QUALITIES.some((q) => q[0] === s.quality)) s.quality = 'auto';
  s.volume = Math.min(1, Math.max(0, s.volume));
  s.sensitivity = Math.min(2, Math.max(0.3, s.sensitivity));
  return s;
}

export function createHUD(root, input) {
  const settings = loadSettings();
  const listeners = [];
  if (input) input.vibrationEnabled = settings.vibration;

  const el = h('div', 'sq-hud');
  el.innerHTML = `
    <div class="sq-safe-probe"></div>
    <div class="sq-vignette"></div>
    <div class="sq-play">
      <div class="sq-topleft">
        <div class="sq-hearts"></div>
        <div class="sq-counters">
          <div class="sq-pill sq-acorns">${ICON.acorn}<span class="sq-num">0</span></div>
          <div class="sq-pill sq-golden">${ICON.golden}<span class="sq-num">0</span><span class="sq-of"></span></div>
        </div>
      </div>
      <div class="sq-topcentre">
        <div class="sq-quest"><div class="sq-quest-in">
          <div class="sq-quest-title"></div>
          <div class="sq-quest-text"></div>
          <div class="sq-quest-prog"><div class="sq-quest-bar"><span></span></div><div class="sq-quest-count"></div></div>
        </div></div>
        <div class="sq-toasts"></div>
      </div>
      <div class="sq-topright">
        <div class="sq-alert"><span class="sq-alert-eye">${ICON.eye}</span><span class="sq-alert-dog">${ICON.dog}</span></div>
        <button class="sq-pausebtn" type="button" aria-label="Pause">${ICON.pause}</button>
      </div>
      <div class="sq-bottom">
        <div class="sq-burst">
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <circle class="sq-burst-bg" cx="24" cy="24" r="21"/>
            <circle class="sq-burst-track" cx="24" cy="24" r="19"/>
            <circle class="sq-burst-fill" cx="24" cy="24" r="19" pathLength="100"/>
          </svg>
          ${ICON.paw}
        </div>
        <div class="sq-combo">
          <div class="sq-combo-row"><span class="sq-combo-l">Flow</span><span class="sq-combo-n">2</span></div>
          <div class="sq-combo-bar"><span></span></div>
        </div>
      </div>
      <div class="sq-reticle">${ICON.reticle}</div>
      <div class="sq-waypoint">
        <div class="sq-wp-pin">${ICON.pin}</div>
        <div class="sq-wp-arrow">${ICON.arrow}</div>
        <div class="sq-wp-text"><span class="sq-wp-label"></span><span class="sq-wp-dist"></span></div>
      </div>
      <div class="sq-banner"><div class="sq-banner-in">
        <div class="sq-banner-rays"></div>
        <div class="sq-banner-small">${ICON.golden}<span>Done</span></div>
        <div class="sq-banner-title"></div>
      </div></div>
    </div>
    <div class="sq-tip" data-no-input>${ICON.turn}<span>Turn your phone sideways for a wider view</span><button type="button" aria-label="Close">${ICON.close}</button></div>
    <div class="sq-fade"></div>`;
  root.appendChild(el);

  const $ = (s) => el.querySelector(s);
  const play = $('.sq-play');
  const heartsEl = $('.sq-hearts');
  const acornsEl = $('.sq-acorns'), acornsNum = $('.sq-acorns .sq-num');
  const goldenEl = $('.sq-golden'), goldenNum = $('.sq-golden .sq-num'), goldenOf = $('.sq-golden .sq-of');
  const questEl = $('.sq-quest'), questIn = $('.sq-quest-in');
  const toastsEl = $('.sq-toasts');
  const alertEl = $('.sq-alert');
  const burstEl = $('.sq-burst'), burstFill = $('.sq-burst-fill');
  const comboEl = $('.sq-combo'), comboN = $('.sq-combo-n'), comboBar = $('.sq-combo-bar span');
  const reticleEl = $('.sq-reticle');
  const wpEl = $('.sq-waypoint'), wpArrow = $('.sq-wp-arrow'), wpLabel = $('.sq-wp-label'), wpDist = $('.sq-wp-dist');
  const bannerEl = $('.sq-banner');
  const vignetteEl = $('.sq-vignette');
  const fadeEl = $('.sq-fade');
  const tipEl = $('.sq-tip');
  const probe = $('.sq-safe-probe');

  const state = {
    acorns: 0, golden: -1, goldenTotal: -1, health: -1, healthMax: -1, burst: -1, burstFull: false,
    combo: 0, comboBar: -1, questKey: null, questProg: null, alert: -1, alertMode: '',
    wpMode: '', wpDist: -1, wpLabel: null, reticle: false, reticleKind: '',
    visible: true, time: 0, tipTimer: 0, tipShown: false,
  };
  const safe = { t: 0, r: 0, b: 0, l: 0, w: 0, h: 0 };
  const modals = new Set();
  let pauseHandler = null;

  function measure() {
    const cs = getComputedStyle(probe);
    safe.t = parseFloat(cs.paddingTop) || 0; safe.r = parseFloat(cs.paddingRight) || 0;
    safe.b = parseFloat(cs.paddingBottom) || 0; safe.l = parseFloat(cs.paddingLeft) || 0;
    safe.w = el.clientWidth; safe.h = el.clientHeight;
    checkTip();
  }
  window.addEventListener('resize', measure);
  window.addEventListener('orientationchange', measure);

  // ---------- pause button ----------
  $('.sq-pausebtn').addEventListener('click', (e) => {
    e.currentTarget.blur();
    if (input) { input.pausePressed = true; input.anyPressed = true; }
    if (pauseHandler) pauseHandler();
  });

  // ---------- modal bookkeeping ----------
  function syncModals() {
    const open = modals.size > 0;
    hud.modalOpen = open;
    el.classList.toggle('sq-has-modal', open);
    document.documentElement.classList.toggle('sq-modal-open', open);
  }
  function openModal(node) {
    el.appendChild(node);
    el.appendChild(fadeEl);            // the fade always stays on top
    modals.add(node);
    void node.offsetWidth;
    node.classList.add('is-open');
    syncModals();
  }
  function closeModal(node) {
    if (!node || !modals.has(node)) return;
    modals.delete(node);
    node.classList.remove('is-open');
    node.classList.add('is-closing');
    setTimeout(() => node.remove(), 260);
    syncModals();
  }
  function topModal() {
    let last = null;
    for (const m of modals) last = m;
    return last;
  }
  // Escape closes the top panel. Capture phase, so the game's pause key never sees the same press.
  window.addEventListener('keydown', (e) => {
    if (!modals.size) return;
    if (e.code !== 'Escape' && !(e.code === 'KeyP' && topModal() === pauseEl)) return;
    const m = topModal();
    if (m && m._escape) {
      e.stopImmediatePropagation();
      e.preventDefault();
      m._escape();
    }
  }, true);

  function button(cls, label, onClick) {
    const b = h('button', cls, label);
    b.type = 'button';
    b.addEventListener('click', (e) => { if (input) input.vibrate(6); onClick(e); });
    return b;
  }

  // ---------- title ----------
  let titleEl = null;
  function showTitle(opts = {}) {
    hideTitle(true);
    const { onStart, hasSave } = opts;
    titleEl = h('div', 'sq-overlay sq-title');
    titleEl.setAttribute('data-no-input', '');
    titleEl.innerHTML = `
      <div class="sq-title-top">
        <h1 class="sq-wordmark" aria-label="Squirrel">
          <span class="sq-wm-text" aria-hidden="true">Squ<span class="sq-wm-i">i${ICON.acorn}</span>rrel</span>
          <svg class="sq-wm-line" viewBox="0 0 200 24" preserveAspectRatio="none" aria-hidden="true"><path d="M3 5C50 21 140 24 200 16" vector-effect="non-scaling-stroke"/></svg>
          <svg class="sq-wm-tail" viewBox="0 0 64 92" aria-hidden="true"><path d="M0 83C30 80 54 64 54 38 54 18 38 8 26 14 14 20 16 38 28 40c8 1 12-6 9-11"/></svg>
        </h1>
        <p class="sq-tagline">Climb high. Leap far. Fill the nest before winter.</p>
      </div>
      <div class="sq-title-bottom">
        <div class="sq-title-links"></div>
      </div>`;
    const bottom = titleEl.querySelector('.sq-title-bottom');
    const playBtn = button('sq-bigbtn', `<span>${hasSave ? 'Continue' : 'Play'}</span>`, () => { if (onStart) onStart(); });
    bottom.insertBefore(playBtn, bottom.firstChild);
    const links = titleEl.querySelector('.sq-title-links');
    links.appendChild(button('sq-smallbtn', 'Settings', () => showSettings()));
    links.appendChild(button('sq-smallbtn', 'How to play', () => showHowTo()));
    openModal(titleEl);
    el.classList.add('sq-on-title');
    try { playBtn.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
    checkTip();
  }
  function hideTitle(instant) {
    if (!titleEl) return;
    const t = titleEl; titleEl = null;
    if (instant === true) { modals.delete(t); t.remove(); syncModals(); } else closeModal(t);
    el.classList.remove('sq-on-title');
    checkTip();
  }

  // ---------- panels ----------
  function panel(cls, title) {
    const ov = h('div', 'sq-overlay sq-dim ' + cls);
    ov.setAttribute('data-no-input', '');
    const p = h('div', 'sq-panel');
    if (title) p.appendChild(h('h2', 'sq-panel-title', title));
    ov.appendChild(p);
    return { ov, p };
  }

  let howEl = null;
  function showHowTo() {
    if (howEl) return;
    const { ov, p } = panel('sq-howto', 'How to play');
    const cards = h('div', 'sq-cards');
    const list = input && input.isTouch ? HOWTO.touch : HOWTO.keys;
    for (const [d, title, text] of list) {
      cards.appendChild(h('div', 'sq-card', `${DIAGRAM[d]}<h3>${title}</h3><p>${text}</p>`));
    }
    p.appendChild(cards);
    const close = () => { closeModal(ov); howEl = null; };
    p.appendChild(button('sq-bigbtn sq-bigbtn--small', '<span>Got it</span>', close));
    ov._escape = close;
    howEl = ov;
    openModal(ov);
  }

  let settingsEl = null;
  function emit(key) {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch (e) { /* storage may be blocked */ }
    if (input) input.vibrationEnabled = settings.vibration;
    for (const cb of listeners) { try { cb(settings, key); } catch (e) { console.error(e); } }
  }
  function showSettings() {
    if (settingsEl) return;
    const { ov, p } = panel('sq-settings', 'Settings');
    const rows = h('div', 'sq-rows');
    const slider = (label, key, min, max, step, fmt) => {
      const row = h('label', 'sq-row', `<span class="sq-row-label">${label}</span><span class="sq-row-ctl"><input type="range" min="${min}" max="${max}" step="${step}"><span class="sq-row-val"></span></span>`);
      const inp = row.querySelector('input'), val = row.querySelector('.sq-row-val');
      const paint = () => {
        inp.style.setProperty('--fill', ((settings[key] - min) / (max - min) * 100) + '%');
        val.textContent = fmt(settings[key]);
      };
      inp.value = settings[key];
      inp.addEventListener('input', () => { settings[key] = parseFloat(inp.value); paint(); emit(key); });
      paint();
      rows.appendChild(row);
    };
    const toggle = (label, key, onText = 'On', offText = 'Off') => {
      const row = h('div', 'sq-row', `<span class="sq-row-label">${label}</span><span class="sq-row-ctl"><button type="button" class="sq-switch" role="switch" aria-label="${label}"><span class="sq-switch-knob"></span></button><span class="sq-row-val"></span></span>`);
      const b = row.querySelector('button'), val = row.querySelector('.sq-row-val');
      const paint = () => {
        b.setAttribute('aria-checked', settings[key] ? 'true' : 'false');
        val.textContent = settings[key] ? onText : offText;
      };
      const flip = () => {
        settings[key] = !settings[key]; paint(); emit(key);
        if (key === 'vibration' && settings.vibration && input) input.vibrate(30);
      };
      row.addEventListener('click', flip);
      paint();
      rows.appendChild(row);
    };
    slider('Sound volume', 'volume', 0, 1, 0.05, (v) => Math.round(v * 100) + '%');
    toggle('Music', 'music');
    slider('Camera speed', 'sensitivity', 0.3, 2, 0.05, (v) => Math.round(v * 100) + '%');
    toggle('Flip up and down look', 'invertY');
    {
      const row = h('div', 'sq-row sq-row--stack', `<span class="sq-row-label">Picture quality</span><span class="sq-seg" role="radiogroup" aria-label="Picture quality"></span>`);
      const seg = row.querySelector('.sq-seg');
      const paint = () => { for (const b of seg.children) b.setAttribute('aria-checked', b.dataset.q === settings.quality ? 'true' : 'false'); };
      for (const [q, label] of QUALITIES) {
        const b = h('button', 'sq-seg-btn', label);
        b.type = 'button'; b.dataset.q = q; b.setAttribute('role', 'radio');
        b.addEventListener('click', () => { settings.quality = q; paint(); emit('quality'); });
        seg.appendChild(b);
      }
      paint();
      rows.appendChild(row);
    }
    toggle('Vibration', 'vibration');
    p.appendChild(rows);
    const close = () => { closeModal(ov); settingsEl = null; };
    p.appendChild(button('sq-bigbtn sq-bigbtn--small', '<span>Done</span>', close));
    ov._escape = close;
    settingsEl = ov;
    openModal(ov);
  }

  let pauseEl = null;
  function showPause(opts = {}) {
    if (pauseEl) return;
    const { onResume, onRestart } = opts;
    const { ov, p } = panel('sq-pause', 'Paused');
    p.classList.add('sq-panel--narrow');
    const resume = () => { hidePause(); if (onResume) onResume(); };
    const col = h('div', 'sq-col');
    col.appendChild(button('sq-bigbtn sq-bigbtn--small', '<span>Keep playing</span>', resume));
    col.appendChild(button('sq-smallbtn sq-smallbtn--solid', 'Start again', () => { hidePause(); if (onRestart) onRestart(); }));
    const pair = h('div', 'sq-pair');
    pair.appendChild(button('sq-smallbtn sq-smallbtn--solid', 'Settings', () => showSettings()));
    pair.appendChild(button('sq-smallbtn sq-smallbtn--solid', 'How to play', () => showHowTo()));
    col.appendChild(pair);
    p.appendChild(col);
    ov._escape = resume;
    pauseEl = ov;
    openModal(ov);
  }
  function hidePause() {
    if (!pauseEl) return;
    closeModal(pauseEl); pauseEl = null;
  }

  let endEl = null;
  function showEnding(stats = {}, onContinue) {
    if (endEl) { modals.delete(endEl); endEl.remove(); endEl = null; }
    const { ov, p } = panel('sq-ending', null);
    p.classList.add('sq-panel--end');
    const golden = stats.goldenTotal != null ? `${stats.golden || 0} of ${stats.goldenTotal}` : `${stats.golden || 0}`;
    p.innerHTML = `
      <div class="sq-end-glow"></div>
      <div class="sq-end-acorn">${ICON.golden}</div>
      <h2 class="sq-panel-title">Snug for the winter</h2>
      <p class="sq-end-text">The nest is full and the park is yours.</p>
      <div class="sq-stats">
        <div class="sq-stat">${ICON.acorn}<b>${stats.acorns || 0}</b><span>Acorns gathered</span></div>
        <div class="sq-stat">${ICON.golden}<b>${golden}</b><span>Golden acorns</span></div>
        <div class="sq-stat sq-stat--ink">${ICON.clock}<b>${formatTime(stats.time)}</b><span>Time</span></div>
        <div class="sq-stat sq-stat--ink">${ICON.dog}<b>${stats.dogs || 0}</b><span>Dogs chased off</span></div>
      </div>`;
    const done = () => { closeModal(ov); endEl = null; if (onContinue) onContinue(); };
    p.appendChild(button('sq-bigbtn sq-bigbtn--small', '<span>Keep exploring</span>', done));
    endEl = ov;
    openModal(ov);
  }

  // ---------- meters ----------
  function setAcorns(n) {
    n = Math.max(0, n | 0);
    if (n === state.acorns) return;
    const gain = n - state.acorns;
    state.acorns = n;
    acornsNum.textContent = n;
    if (gain > 0) {
      restart(acornsEl, 'is-bump');
      const fly = h('span', 'sq-fly', '+' + gain);
      acornsEl.appendChild(fly);
      setTimeout(() => fly.remove(), 900);
    }
  }
  function setGolden(n, total) {
    n = Math.max(0, n | 0);
    if (n === state.golden && total === state.goldenTotal) return;
    const gain = state.golden >= 0 && n > state.golden;
    state.golden = n; state.goldenTotal = total;
    goldenNum.textContent = n;
    goldenOf.textContent = total != null ? '/' + total : '';
    if (gain) restart(goldenEl, 'is-bump');
  }
  function setHealth(n, max) {
    n = Math.max(0, Math.round(n));
    max = Math.max(1, Math.round(max == null ? (state.healthMax > 0 ? state.healthMax : n) : max));
    if (max !== state.healthMax) {
      heartsEl.innerHTML = '';
      for (let i = 0; i < max; i++) heartsEl.appendChild(h('span', 'sq-heart', ICON.heart));
      state.healthMax = max;
      state.health = -1;
    }
    if (n === state.health) return;
    const lost = state.health >= 0 && n < state.health;
    const gained = state.health >= 0 && n > state.health;
    for (let i = 0; i < max; i++) {
      const hEl = heartsEl.children[i];
      const full = i < n;
      if (lost && !full && i < state.health) restart(hEl, 'is-pop');
      if (gained && full && i >= state.health) restart(hEl, 'is-gain');
      hEl.classList.toggle('is-empty', !full);
    }
    heartsEl.classList.toggle('is-low', n <= 1 && max > 1);
    if (lost) restart(heartsEl, 'is-shake');
    state.health = n;
  }
  function flashDamage() {
    restart(vignetteEl, 'is-flash');
    if (input) input.vibrate(40);
  }
  function setBurst(v) {
    v = Math.min(1, Math.max(0, v || 0));
    const q = Math.round(v * 100);
    if (q === state.burst) return;
    state.burst = q;
    burstFill.style.strokeDashoffset = String(100 - q);
    burstEl.classList.toggle('is-on', q > 2);
    const full = q >= 100;
    if (full !== state.burstFull) {
      state.burstFull = full;
      burstEl.classList.toggle('is-full', full);
      if (full) restart(burstEl, 'is-ping');
    }
  }
  function setCombo(n, timeLeft01) {
    n = n | 0;
    const t = Math.min(1, Math.max(0, timeLeft01 == null ? 1 : timeLeft01));
    const show = n >= 2 && t > 0;
    if (show) {
      if (n !== state.combo) {
        comboN.textContent = n;
        comboEl.classList.toggle('is-hot', n >= 5);
        if (n > state.combo) restart(comboEl, 'is-bump');
      }
      const q = Math.round(t * 50);
      if (q !== state.comboBar) { state.comboBar = q; comboBar.style.transform = 'scaleX(' + (q / 50) + ')'; }
    }
    comboEl.classList.toggle('is-on', show);
    state.combo = show ? n : 0;
  }
  function setQuest(q) {
    if (!q) {
      if (state.questKey !== null) { questEl.classList.remove('is-on'); state.questKey = null; state.questProg = null; }
      return;
    }
    const key = (q.title || '') + '\n' + (q.text || '');
    const hasProg = q.total != null && q.total > 0;
    const prog = hasProg ? Math.min(q.total, Math.max(0, q.progress || 0)) + '/' + q.total : '';
    if (key !== state.questKey) {
      $('.sq-quest-title').textContent = q.title || '';
      $('.sq-quest-text').textContent = q.text || '';
      $('.sq-quest-text').style.display = q.text ? '' : 'none';
      questEl.classList.add('is-on');
      if (state.questKey !== null) restart(questIn, 'is-swap'); else restart(questIn, 'is-in');
      state.questKey = key;
      state.questProg = null;
    }
    if (prog !== state.questProg) {
      const pEl = $('.sq-quest-prog');
      pEl.style.display = hasProg ? '' : 'none';
      if (hasProg) {
        const p = Math.min(q.total, Math.max(0, q.progress || 0));
        $('.sq-quest-bar span').style.transform = 'scaleX(' + (p / q.total) + ')';
        $('.sq-quest-count').textContent = p + ' of ' + q.total;
        if (state.questProg !== null) restart(pEl, 'is-bump');
      }
      state.questProg = prog;
    }
  }
  let bannerTimer = 0;
  function questComplete(title) {
    $('.sq-banner-title').textContent = title || '';
    restart(bannerEl, 'is-on');
    play.classList.add('has-banner');
    clearTimeout(bannerTimer);
    bannerTimer = setTimeout(() => { bannerEl.classList.remove('is-on'); play.classList.remove('has-banner'); }, 2600);
    if (input) input.vibrate(25);
  }
  function toast(text, ms = 2600) {
    while (toastsEl.children.length >= 2) toastsEl.firstChild.remove();
    const t = h('div', 'sq-toast');
    t.textContent = text;
    toastsEl.appendChild(t);
    void t.offsetWidth;
    t.classList.add('is-on');
    setTimeout(() => {
      t.classList.remove('is-on');
      setTimeout(() => t.remove(), 320);
    }, ms);
  }

  // ---------- markers ----------
  // angle: radians in screen space, 0 points right, a quarter turn (PI / 2) points down (atan2(dy, dx) with y down).
  function setWaypoint(w) {
    if (!w || !w.visible) {
      if (state.wpMode !== '') { wpEl.className = 'sq-waypoint'; state.wpMode = ''; }
      return;
    }
    if (!safe.w) measure();
    let x = w.x, y = w.y;
    const mode = w.onScreen ? 'on' : 'off';
    if (mode === 'off') {
      const a = w.angle || 0, dx = Math.cos(a), dy = Math.sin(a);
      const l = safe.l + 36, r = safe.w - safe.r - 36;
      const t = safe.t + 76, b = safe.h - safe.b - (input && input.isTouch ? 84 : 44);
      const cx = (l + r) / 2, cy = (t + b) / 2;
      const k = Math.min(Math.abs(dx) > 1e-4 ? (r - l) / 2 / Math.abs(dx) : 1e9, Math.abs(dy) > 1e-4 ? (b - t) / 2 / Math.abs(dy) : 1e9);
      x = cx + dx * k; y = cy + dy * k;
      wpArrow.style.transform = 'rotate(' + a + 'rad)';
    }
    if (mode !== state.wpMode) {
      wpEl.className = 'sq-waypoint is-on is-' + mode;
      state.wpMode = mode;
    }
    if (mode === 'off') {                // keep the text on the inner side of the arrow, never off the edge
      const dx = Math.cos(w.angle || 0), dy = Math.sin(w.angle || 0);
      const side = Math.abs(dx) > 0.5;
      wpEl.classList.toggle('is-right', side && dx > 0);
      wpEl.classList.toggle('is-left', side && dx < 0);
      wpEl.classList.toggle('is-above', !side && dy > 0);
    }
    wpEl.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
    const d = w.distance == null ? -1 : Math.round(w.distance);
    if (d !== state.wpDist) { state.wpDist = d; wpDist.textContent = d < 0 ? '' : d + ' m'; }
    const label = w.label || '';
    if (label !== state.wpLabel) { state.wpLabel = label; wpLabel.textContent = label; wpLabel.style.display = label ? '' : 'none'; }
  }
  // kind: 'dog' (default), 'throw', 'scratch', 'pounce'
  function setTargetReticle(r) {
    const on = !!(r && r.visible);
    if (on !== state.reticle) { reticleEl.classList.toggle('is-on', on); state.reticle = on; }
    if (!on) return;
    const kind = r.kind || 'dog';
    if (kind !== state.reticleKind) {
      if (state.reticleKind) reticleEl.classList.remove('is-' + state.reticleKind);
      reticleEl.classList.add('is-' + kind);
      state.reticleKind = kind;
    }
    reticleEl.style.transform = 'translate3d(' + r.x.toFixed(1) + 'px,' + r.y.toFixed(1) + 'px,0)';
  }
  function setDogAlert(level) {
    level = Math.min(1, Math.max(0, level || 0));
    const q = Math.round(level * 20);
    if (q === state.alert) return;
    state.alert = q;
    const mode = q === 0 ? '' : level < 0.6 ? 'eye' : 'dog';
    if (mode !== state.alertMode) {
      alertEl.className = 'sq-alert' + (mode ? ' is-on is-' + mode : '');
      state.alertMode = mode;
    }
    alertEl.style.setProperty('--pulse', (1.3 - level * 0.85).toFixed(2) + 's');
  }

  // ---------- respawn ----------
  function showRespawn(cb) {
    return new Promise((resolve) => {
      fadeEl.classList.add('is-on');
      setTimeout(() => {
        try { if (cb) cb(); } finally {
          resolve();
          setTimeout(() => fadeEl.classList.remove('is-on'), 160);
        }
      }, 380);
    });
  }

  // ---------- sideways tip ----------
  function tipSeen() { try { return localStorage.getItem(TIP_KEY) === '1'; } catch (e) { return state.tipShown && !tipEl.classList.contains('is-on'); } }
  function dismissTip() {
    tipEl.classList.remove('is-on');
    state.tipTimer = 0;
    try { localStorage.setItem(TIP_KEY, '1'); } catch (e) { /* ignore */ }
  }
  function checkTip() {
    const portrait = el.clientHeight > el.clientWidth * 1.15;
    const touch = !!(input && input.isTouch);
    if (tipEl.classList.contains('is-on')) {
      if (!portrait) dismissTip();
      return;
    }
    if (state.tipShown || !portrait || !touch || tipSeen()) return;
    state.tipShown = true;
    tipEl.classList.add('is-on');
    state.tipTimer = 12;
  }
  tipEl.querySelector('button').addEventListener('click', dismissTip);

  function setVisible(v) {
    v = !!v;
    if (v === state.visible) return;
    state.visible = v;
    play.classList.toggle('is-hidden', !v);
  }
  function update(dt) {
    state.time += dt;
    if (state.tipTimer > 0 && !titleEl) {      // the tip waits on the title, then counts down during play
      state.tipTimer -= dt;
      if (state.tipTimer <= 0) dismissTip();
    }
    if (!state.tipShown && input && input.isTouch) checkTip();
  }

  const hud = {
    el, settings, modalOpen: false,
    showTitle, hideTitle, showHowTo, showSettings, showPause, hidePause, showEnding, showRespawn,
    setAcorns, setGolden, setHealth, flashDamage, setBurst, setCombo, setQuest, questComplete, toast,
    setWaypoint, setTargetReticle, setDogAlert, setVisible, update,
    onSettingsChange(cb) { listeners.push(cb); return () => { const i = listeners.indexOf(cb); if (i >= 0) listeners.splice(i, 1); }; },
    onPause(cb) { pauseHandler = cb; },
  };

  setHealth(3, 3);
  setGolden(0, null);
  setBurst(0);
  measure();
  return hud;
}
