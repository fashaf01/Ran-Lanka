// The intro: the maison mark is drawn in gold while a counter weighs the gold up to 916.
// It plays once per visit and never for reduced motion (the inline head script decides).
import { $ } from './core.js';

export function initLoader(onDone) {
  const root = document.documentElement, intro = $('#intro');
  if (!intro || !root.classList.contains('is-loading')) { intro?.remove(); onDone(); return; }

  // Copy the mark into the intro so its strokes can be drawn independently of the header logo.
  const svg = $('.intro-mark', intro), sym = $('#mark');
  if (svg instanceof SVGElement && sym) {
    svg.setAttribute('viewBox', sym.getAttribute('viewBox'));
    svg.textContent = '';
    for (const node of sym.children) {
      const c = node.cloneNode(true);
      const stroked = c.hasAttribute('stroke') && c.getAttribute('fill') === 'none';
      if (stroked || (c.hasAttribute('stroke') && !c.hasAttribute('fill') && c.tagName !== 'text')) {
        c.classList.add('draw');
        c.setAttribute('pathLength', '1');
      } else {
        c.classList.add('fill');
      }
      svg.appendChild(c);
    }
  }

  const n = $('#intro-n'), count = $('.intro-count', intro);
  const t0 = performance.now(), dur = 2100;
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
