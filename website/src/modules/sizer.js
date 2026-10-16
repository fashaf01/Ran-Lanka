// Find your size. The screen becomes a sizing gauge: match a bank card's outline once to learn
// how many CSS pixels make a millimetre, then rest a ring or bangle on the circle.
// Card: ISO/IEC 7810 ID-1, 85.60 × 53.98 mm. Ring sizes: US = (d − 11.63) / 0.8128;
// Indian size ≈ circumference − 39.8 mm. Bangles: Indian sizes in sixteenths of an inch.
import { $, $$ } from './core.js';

const NS = 'http://www.w3.org/2000/svg';
const CARD = [85.6, 53.98];
const BANGLES = [['2.2', 53.98], ['2.4', 57.15], ['2.6', 60.33], ['2.8', 63.5], ['2.10', 66.68], ['2.12', 69.85]];
const RANGE = { ring: [13, 24, 17.3], bangle: [50, 72, 60.3] };

const el = (tag, attrs) => {
  const n = document.createElementNS(NS, tag);
  for (const k in attrs) n.setAttribute(k, attrs[k]);
  return n;
};
const read = () => { try { return parseFloat(localStorage.getItem('rl-ppm')) || 0; } catch (e) { return 0; } };
const save = v => { try { localStorage.setItem('rl-ppm', String(v)); } catch (e) { /* calibration just isn't remembered */ } };

export function initSizer() {
  const view = $('#sz-view');
  if (!view) return;
  const svg = $('#sz-svg'), range = $('#sz-range'), label = $('#sz-label'), out = $('#sz-read');
  const next = $('#sz-next'), back = $('#sz-back'), warn = $('#sz-warn');
  const s1 = $('#sz-s1'), s2 = $('#sz-s2');

  // A first guess at the screen's density; the card match replaces it.
  let ppm = read() || (matchMedia('(pointer: coarse)').matches ? 6.2 : 4.2);
  let step = read() ? 2 : 1, mode = 'ring';
  const size = { ring: RANGE.ring[2], bangle: RANGE.bangle[2] };

  function setStep(n) {
    step = n;
    s1.classList.toggle('on', n === 1);
    s2.classList.toggle('on', n === 2);
    back.hidden = n === 1;
    next.hidden = n === 2;
    if (n === 1) {
      Object.assign(range, { min: 2.5, max: 9, step: 0.01 });
      range.value = ppm;
      label.textContent = 'Card width';
    } else {
      const [lo, hi] = RANGE[mode];
      Object.assign(range, { min: lo, max: hi, step: 0.1 });
      range.value = size[mode];
      label.textContent = mode === 'ring' ? 'Inside of the ring' : 'Inside of the bangle';
    }
    draw();
  }

  function draw() {
    const W = view.clientWidth, H = view.clientHeight;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('width', W);
    svg.setAttribute('height', H);
    svg.textContent = '';
    const cx = W / 2, cy = H / 2;
    out.textContent = '';
    warn.hidden = true;

    if (step === 1) {
      // The card lies landscape when it fits; otherwise it stands portrait from the top edge of the
      // gauge, and only its width needs to match.
      let [cw, ch] = CARD.map(v => v * ppm), y;
      const landscape = cw <= W - 24 && ch <= H - 56;
      if (!landscape) { [cw, ch] = [ch, cw]; y = 18; } else y = cy - ch / 2 - 10;
      const x = cx - cw / 2, r = 3.18 * ppm;
      svg.append(
        el('rect', { x, y, width: cw, height: ch, rx: r, class: 'sz-card' }),
        el('rect', { x: x + (landscape ? 10 : 7.5) * ppm, y: y + (landscape ? 18 : 10) * ppm, width: (landscape ? 11 : 9) * ppm, height: (landscape ? 9 : 11) * ppm, rx: 1.5 * ppm, class: 'sz-chip' }),
      );
      if (landscape) {
        const t = el('text', { x: cx, y: y + ch + 24, class: 'sz-cap', 'text-anchor': 'middle' });
        t.textContent = 'Trace a bank card';
        svg.appendChild(t);
      }
      return;
    }

    const d = size[mode], r = d / 2 * ppm;
    if (r * 2 > Math.min(W, H) - 8) warn.hidden = false;
    const band = (mode === 'ring' ? 2.2 : 5) * ppm;
    svg.append(
      el('circle', { cx, cy, r: r + band / 2, class: 'sz-band', 'stroke-width': band }),
      el('circle', { cx, cy, r, class: 'sz-in' }),
      el('path', { d: `M${cx - r} ${cy}H${cx + r}`, class: 'sz-dia' }),
    );
    const t = el('text', { x: cx, y: cy - 8, class: 'sz-cap', 'text-anchor': 'middle' });
    t.textContent = `${d.toFixed(1)} mm`;
    svg.appendChild(t);

    const rows = [['Diameter', `${d.toFixed(1)} mm`]];
    if (mode === 'ring') {
      const c = Math.PI * d;
      const us = Math.round(((d - 11.63) / 0.8128) * 2) / 2;
      rows.push(['Circumference', `${c.toFixed(1)} mm`], ['Indian size', String(Math.max(1, Math.round(c - 39.8)))], ['US size', us <= 0 ? '0' : String(us)]);
    } else {
      const [name] = BANGLES.reduce((best, b) => (Math.abs(b[1] - d) < Math.abs(best[1] - d) ? b : best));
      rows.push(['Bangle size', name], ['Circumference', `${(Math.PI * d).toFixed(0)} mm`]);
    }
    rows.forEach(([k, v]) => {
      const div = document.createElement('div'), dt = document.createElement('dt'), dd = document.createElement('dd');
      dt.textContent = k; dd.textContent = v;
      div.append(dt, dd); out.appendChild(div);
    });
  }

  range.addEventListener('input', () => {
    const v = parseFloat(range.value);
    if (step === 1) ppm = v; else size[mode] = v;
    draw();
  });
  next.addEventListener('click', () => { save(ppm); setStep(2); range.focus(); });
  back.addEventListener('click', () => setStep(1));
  $$('.sz-tabs button').forEach(b => b.addEventListener('click', () => {
    mode = b.dataset.mode;
    $$('.sz-tabs button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    $$('.sz-what').forEach(x => { x.textContent = mode; });
    setStep(step);
  }));
  new ResizeObserver(draw).observe(view);
  setStep(step);
}
