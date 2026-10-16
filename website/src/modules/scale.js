// The tharasu: choose the pieces of a bridal set, watch gold coins drop into one pan and
// brass pawn weights balance them in the other, then read the value at the day's rate.
import { $, $$, reduce, RATE, lkr } from './core.js';

const NS = 'http://www.w3.org/2000/svg';
const el = (tag, attrs = {}) => {
  const n = document.createElementNS(NS, tag);
  for (const k in attrs) n.setAttribute(k, attrs[k]);
  return n;
};

// Coin slots on the left pan, laid layer by layer from the centre out.
const CAP = [4, 7, 9, 7, 4], COLX = [-38, -19, 0, 19, 38];
const SLOTS = [];
for (let level = 0; level < 9; level++) {
  [2, 1, 3, 0, 4].forEach(c => { if (level < CAP[c]) SLOTS.push({ c, level }); });
}
const jitter = i => ((i * 7919) % 7) - 3;

// Brass weights in pawn, the way a jeweller's box holds them.
const DENOMS = [8, 4, 2, 1, 0.5, 0.25, 0.125];
const LABEL = { 8: '8', 4: '4', 2: '2', 1: '1', 0.5: '½', 0.25: '¼', 0.125: '⅛' };

export function initScale() {
  const svg = $('#tharasu');
  if (!svg) return;
  const beam = $('#beam', svg), panL = $('#pan-l', svg), panR = $('#pan-r', svg);
  const pile = $('#gold-pile', svg), wbox = $('#weights', svg);
  const coinGrad = $('#g-coin', svg);
  const gIn = $('#grams'), pIn = $('#pawn'), out = $('#value');
  const chips = $$('#set-pick button');
  let karat = 22, pawn = parseFloat(pIn.value) || 0, shown = 0, seen = false;

  /* ---------- Beam physics: a damped spring around the pivot ---------- */
  let theta = 0, vel = 0, target = 0, raf = 0, last = 0;
  const pose = () => {
    beam.setAttribute('transform', `rotate(${theta.toFixed(3)} 260 64)`);
    panL.setAttribute('transform', `rotate(${(-theta).toFixed(3)} 84 64)`);
    panR.setAttribute('transform', `rotate(${(-theta).toFixed(3)} 436 64)`);
  };
  const step = now => {
    const dt = Math.min(0.033, (now - last) / 1000 || 0.016);
    last = now;
    vel += (-58 * (theta - target) - 6.4 * vel) * dt;
    theta += vel * dt;
    pose();
    if (Math.abs(vel) > 0.01 || Math.abs(theta - target) > 0.01) raf = requestAnimationFrame(step);
    else { theta = target; pose(); raf = 0; }
  };
  const swing = to => {
    target = to;
    if (reduce) { theta = to; pose(); return; }
    if (!raf) { last = performance.now(); raf = requestAnimationFrame(step); }
  };

  /* ---------- Gold coins ---------- */
  function setCoins(n) {
    n = Math.max(0, Math.min(SLOTS.length, n));
    const have = pile.children.length;
    for (let i = have; i < n; i++) {
      const { c, level } = SLOTS[i];
      const g = el('g', { transform: `translate(${84 + COLX[c] + jitter(i)} ${193 - level * 3.5})` });
      const drop = el('g', { class: 'coin' });
      drop.append(
        el('path', { d: 'M-9.5 0v2.6a9.5 3.3 0 0 0 19 0V0', fill: '#8d6626' }),
        el('ellipse', { rx: 9.5, ry: 3.3, fill: 'url(#g-coin)', stroke: '#9a7f30', 'stroke-width': 0.4 }),
      );
      g.appendChild(drop);
      pile.appendChild(g);
      if (!reduce) drop.animate(
        [{ transform: 'translate(0px,-120px)', opacity: 0 }, { opacity: 1, offset: 0.3 }, { transform: 'translate(0px,0px)', opacity: 1 }],
        { duration: 620, delay: (i - have) * 45, easing: 'cubic-bezier(.34,1.42,.52,1)', fill: 'backwards' },
      );
    }
    for (let i = have - 1; i >= n; i--) {
      const g = pile.children[i];
      if (reduce) { g.remove(); continue; }
      g.firstChild.animate([{ opacity: 1 }, { transform: 'translate(0px,-40px)', opacity: 0 }],
        { duration: 380, delay: (have - 1 - i) * 30, easing: 'ease-in', fill: 'forwards' }).onfinish = () => g.remove();
    }
  }

  /* ---------- Pawn weights ---------- */
  function setWeights(p) {
    let rest = Math.round(p * 8) / 8;
    const cols = [];
    for (const d of DENOMS) {
      const k = Math.floor(rest / d + 1e-9);
      if (k > 0) { cols.push({ d, k }); rest -= k * d; }
    }
    wbox.textContent = '';
    if (!cols.length) return;
    const group = el('g');
    let x = 0;
    cols.forEach(({ d, k }, ci) => {
      const w = 9 + 6 * Math.sqrt(d), h = 8 + 5.5 * Math.sqrt(d);
      const shownK = Math.min(k, 4);
      for (let s = 0; s < shownK; s++) {
        const y = -(s + 1) * (h + 1.2);
        const wg = el('g', { transform: `translate(${x} ${y})` });
        const body = el('g');
        body.append(
          el('rect', { x: 0, y: 2, width: w, height: h - 2, rx: 1.6, fill: 'url(#g-brass)' }),
          el('ellipse', { cx: w / 2, cy: 2, rx: w / 2, ry: 1.8, fill: '#f1d898' }),
          el('rect', { x: w / 2 - 2, y: -2.6, width: 4, height: 4, rx: 1.4, fill: '#c49a4f' }),
        );
        if (s === shownK - 1 || shownK === 1) {
          const t = el('text', { x: w / 2, y: 2 + (h - 2) / 2 + 2.6, 'text-anchor': 'middle', 'font-family': 'Bodoni Moda, Didot, serif', 'font-size': Math.max(6, Math.min(9, h * 0.42)), 'font-weight': 600, fill: '#6b4a1a' });
          t.textContent = LABEL[d];
          body.appendChild(t);
        }
        wg.appendChild(body);
        group.appendChild(wg);
        if (!reduce) body.animate([{ transform: 'translate(0px,-70px)', opacity: 0 }, { opacity: 1, offset: 0.35 }, { transform: 'translate(0px,0px)', opacity: 1 }],
          { duration: 560, delay: (ci * 2 + s) * 70, easing: 'cubic-bezier(.34,1.3,.5,1)', fill: 'backwards' });
      }
      if (k > 4) {
        const t = el('text', { x: x + w / 2, y: -(4 * (h + 1.2)) - 6, 'text-anchor': 'middle', 'font-family': 'Bodoni Moda, Didot, serif', 'font-size': 8, fill: '#6b4a1a' });
        t.textContent = '×' + k;
        group.appendChild(t);
      }
      x += w + 3;
    });
    const total = x - 3, scale = Math.min(1, 104 / total);
    group.setAttribute('transform', `translate(436 196) scale(${scale.toFixed(3)}) translate(${(-total / 2).toFixed(2)} 0)`);
    wbox.appendChild(group);
  }

  /* ---------- The reading ---------- */
  let tween = 0;
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

  /* ---------- Weigh: gold first, the beam dips, then the weights bring it level ---------- */
  let settle = 0, weighed = 0;
  function weigh() {
    if (!seen) return;
    const p = Number.isFinite(pawn) && pawn > 0 ? pawn : 0;
    const coins = p > 0 ? Math.max(1, Math.round(p * 2)) : 0;
    const diff = p - weighed, added = Math.max(0, coins - pile.children.length);
    setCoins(coins);
    clearTimeout(settle);
    if (Math.abs(diff) > 1e-6) {
      const tilt = Math.min(11, 3 + Math.abs(diff) * 1.1);
      settle = setTimeout(() => {
        swing(diff > 0 ? -tilt : tilt);
        settle = setTimeout(() => { setWeights(p); swing(0); }, reduce ? 0 : 520 + Math.min(14, added) * 30);
      }, reduce ? 0 : 220);
    } else setWeights(p);
    weighed = p;
    showValue();
  }

  const tidy = n => String(Number(n.toFixed(3)));
  function fromChips() {
    pawn = chips.reduce((s, b) => s + (b.getAttribute('aria-pressed') === 'true' ? parseFloat(b.dataset.pawn) : 0), 0);
    pIn.value = tidy(pawn);
    gIn.value = tidy(pawn * 8);
    weigh();
  }
  chips.forEach(b => b.addEventListener('click', () => {
    b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'));
    fromChips();
  }));

  let typing = 0;
  const typed = () => { clearTimeout(typing); typing = setTimeout(weigh, 350); showValue(); };
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
    const stops = karat === 24 ? ['#fff3b8', '#eccb52', '#a8842a'] : ['#fff4c4', '#dcc265', '#9a7f30'];
    [...coinGrad.children].forEach((s, i) => s.setAttribute('stop-color', stops[i]));
    showValue();
  }));

  // The first weighing happens when the scale comes into view.
  out.textContent = lkr(pawn * RATE[karat]);
  shown = pawn * RATE[karat];
  new IntersectionObserver((es, io) => {
    if (!es[0].isIntersecting) return;
    io.disconnect();
    seen = true;
    shown = 0;
    weigh();
  }, { threshold: 0.35 }).observe(svg);
}
