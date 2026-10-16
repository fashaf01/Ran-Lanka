// The tray: choose the pieces of a bridal set and they are laid, in gold, into their compartments
// on a moss-velvet tray, the way the trays come out at the counter. The weight in pawn and grams
// and the value at the day's sample rate tot up beneath it.
import { $, $$, reduce, RATE, lkr } from './core.js';

const FRACTION = { 0.25: '¼', 0.5: '½', 0.75: '¾' };
const tidy = n => String(Number(n.toFixed(3)));
const pawnText = p => {
  const whole = Math.floor(p), frac = Number((p - whole).toFixed(3));
  const f = FRACTION[frac] || (frac ? String(frac).replace(/^0/, '') : '');
  return (whole || !f ? String(whole) : '') + f;
};

export function initTray() {
  const tray = $('#tray');
  if (!tray) return;
  const slots = $$('.slot', tray);
  const gIn = $('#grams'), pIn = $('#pawn'), out = $('#value'), total = $('#tray-total');
  const on = s => s.getAttribute('aria-pressed') === 'true';
  let karat = 22, pawn = parseFloat(pIn.value) || 0, shown = pawn * RATE[karat], seen = false, tween = 0;

  /* ---------- The reading ---------- */
  function showValue() {
    const to = Number.isFinite(pawn) && pawn >= 0 ? pawn * RATE[karat] : NaN;
    cancelAnimationFrame(tween);
    if (!Number.isFinite(to)) { out.textContent = 'Enter a weight'; shown = 0; return; }
    if (reduce || !seen) { out.textContent = lkr(to); shown = to; return; }
    const from = shown, t0 = performance.now();
    out.setAttribute('aria-busy', 'true');
    const run = now => {
      const k = Math.min(1, (now - t0) / 900), e = 1 - Math.pow(1 - k, 4);
      shown = from + (to - from) * e;
      out.textContent = lkr(shown);
      if (k < 1) tween = requestAnimationFrame(run);
      else out.setAttribute('aria-busy', 'false');
    };
    tween = requestAnimationFrame(run);
  }

  function fromTray() {
    const chosen = slots.filter(on);
    pawn = chosen.reduce((sum, s) => sum + parseFloat(s.dataset.pawn), 0);
    pIn.value = tidy(pawn);
    gIn.value = tidy(pawn * 8);
    total.textContent = chosen.length
      ? `${chosen.length} piece${chosen.length > 1 ? 's' : ''} · ${pawnText(pawn)} pawn · ${tidy(pawn * 8)} g`
      : 'The tray is empty';
    showValue();
  }

  const lay = s => {
    if (reduce) return;
    s.classList.remove('placed');
    void s.offsetWidth;
    s.classList.add('placed');
  };

  slots.forEach(s => s.addEventListener('click', () => {
    const now = !on(s);
    s.setAttribute('aria-pressed', String(now));
    if (now) lay(s);
    fromTray();
  }));

  /* ---------- Your own weight ---------- */
  const typed = () => {
    total.textContent = Number.isFinite(pawn) ? `Your own weight · ${pawnText(Math.round(pawn * 8) / 8)} pawn · ${tidy(pawn * 8)} g` : 'Enter a weight';
    showValue();
  };
  gIn.addEventListener('input', () => {
    const v = parseFloat(gIn.value);
    pawn = Number.isFinite(v) ? v / 8 : NaN;
    pIn.value = Number.isFinite(v) ? tidy(v / 8) : '';
    typed();
  });
  pIn.addEventListener('input', () => {
    const v = parseFloat(pIn.value);
    pawn = Number.isFinite(v) ? v : NaN;
    gIn.value = Number.isFinite(v) ? tidy(v * 8) : '';
    typed();
  });

  $$('.kseg button').forEach(b => b.addEventListener('click', () => {
    karat = Number(b.dataset.k);
    $$('.kseg button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    showValue();
  }));

  // The first time the tray comes into view, its pieces are laid one after another and the
  // value counts up from nothing.
  out.textContent = lkr(shown);
  new IntersectionObserver((es, io) => {
    if (!es[0].isIntersecting) return;
    io.disconnect();
    seen = true;
    slots.filter(on).forEach((s, k) => setTimeout(() => lay(s), k * 180));
    shown = 0;
    showValue();
  }, { threshold: 0.35 }).observe(tray);
}
