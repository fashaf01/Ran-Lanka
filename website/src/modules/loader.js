// The intro: the Ranlanka lamp is lit while a counter weighs the gold up to 916.
// It plays once per visit and never for reduced motion (the inline head script decides).
import { $ } from './core.js';

export function initLoader(onDone) {
  const root = document.documentElement, intro = $('#intro');
  if (!intro || !root.classList.contains('is-loading')) { intro?.remove(); onDone(); return; }

  // Light the lamp: copy the Ranlanka mark into the intro and pour its gold and silver in along
  // their centre lines (masks), while CSS kindles the flame.
  const svg = $('.intro-mark', intro), sym = $('#rl-mark');
  if (svg instanceof SVGElement && sym) {
    svg.setAttribute('viewBox', sym.getAttribute('viewBox'));
    svg.innerHTML = `<defs>
      <mask id="im-swirl" maskUnits="userSpaceOnUse" x="-10" y="-10" width="112" height="160"><path class="m-line m-swirl" pathLength="1" d="M69 5C56 26 30 48 18 70C8 88 6 104 12 114C18 124 30 122 40 122C54 122 66 114 68 100C69 94 68 89 66 85"/></mask>
      <mask id="im-cres" maskUnits="userSpaceOnUse" x="-10" y="-10" width="112" height="160"><path class="m-line m-cres" pathLength="1" d="M53 62C72 64 86 80 86 99C86 118 70 135 48 136C38 136 29 133 21 131"/></mask>
    </defs>`;
    for (const node of sym.children) {
      const c = node.cloneNode(true);
      if (c.classList.contains('rl-swirl')) c.setAttribute('mask', 'url(#im-swirl)');
      if (c.classList.contains('rl-crescent')) c.setAttribute('mask', 'url(#im-cres)');
      svg.appendChild(c);
    }
  }

  const n = $('#intro-n'), count = $('.intro-count', intro);
  const t0 = performance.now(), dur = 2200;
  let fast = false, done = false;
  const fonts = Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise(r => setTimeout(r, 2600))]);
  let fontsReady = false;
  fonts.then(() => { fontsReady = true; });

  const tick = now => {
    const k = Math.min(1, (now - t0) / (fast ? dur * 0.45 : dur));
    const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
    const v = Math.round(916 * e);
    n.textContent = String(v).padStart(3, '0');
    count.style.setProperty('--p', e.toFixed(3));
    if (k < 1 || !fontsReady) requestAnimationFrame(tick);
    else finish();
  };
  requestAnimationFrame(tick);

  function finish() {
    if (done) return;
    done = true;
    setTimeout(() => {
      intro.classList.add('done');
      root.classList.remove('is-loading');
      try { sessionStorage.setItem('rl-intro', '1'); } catch (e) { /* storage blocked: the intro simply plays again */ }
      setTimeout(onDone, 120);
      setTimeout(() => intro.remove(), 1500);
    }, 260);
  }
  const hurry = () => { fast = true; };
  addEventListener('pointerdown', hurry, { once: true });
  addEventListener('keydown', hurry, { once: true });
}
