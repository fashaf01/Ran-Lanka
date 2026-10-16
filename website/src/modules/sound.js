// The score: off until asked for, faded in and out, paused when the tab is hidden.
import { $ } from './core.js';

export function initSound() {
  const btn = $('#sound'), score = $('#score'), lbl = $('.lbl', btn);
  let raf = 0;
  function fadeTo(target, ms, done) {
    cancelAnimationFrame(raf);
    const from = score.volume, t0 = performance.now();
    const step = now => {
      const k = Math.min(1, (now - t0) / ms);
      score.volume = from + (target - from) * k;
      if (k < 1) raf = requestAnimationFrame(step); else if (done) done();
    };
    raf = requestAnimationFrame(step);
  }
  const on = () => btn.getAttribute('aria-pressed') === 'true';
  const set = v => { btn.setAttribute('aria-pressed', String(v)); lbl.textContent = v ? 'Sound on' : 'Sound'; };
  btn.addEventListener('click', () => {
    if (!on()) {
      set(true);
      score.volume = 0;
      score.play().then(() => fadeTo(0.6, 1800)).catch(() => set(false));
    } else {
      set(false);
      fadeTo(0, 900, () => score.pause());
    }
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) score.pause();
    else if (on()) score.play().catch(() => {});
  });
}
