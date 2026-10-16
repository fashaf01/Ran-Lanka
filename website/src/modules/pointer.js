// Fine pointers only: a bronze cursor disc that names the action, the jeweller's loupe over
// the jewellery photographs, and buttons that lean towards the pointer.
import { $, $$, reduce, finePointer } from './core.js';

const ZOOM = 2.6, R = 105;

export function initPointer() {
  if (!finePointer || reduce) return;
  const root = document.documentElement;
  const cur = $('#cursor'), label = $('.cursor-label', cur), loupe = $('#loupe');
  root.classList.add('has-cursor', 'has-loupe');

  let tx = innerWidth / 2, ty = innerHeight / 2, cx = tx, cy = ty, raf = 0;
  let lens = null; // the [data-loupe] element under the pointer

  const loop = () => {
    cx += (tx - cx) * 0.22; cy += (ty - cy) * 0.22;
    cur.style.setProperty('--cx', cx.toFixed(1) + 'px');
    cur.style.setProperty('--cy', cy.toFixed(1) + 'px');
    if (lens) aim();
    raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.4 ? requestAnimationFrame(loop) : 0;
  };
  addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
    tx = e.clientX; ty = e.clientY;
    if (!raf) raf = requestAnimationFrame(loop);
  }, { passive: true });

  /* ---------- Cursor label ---------- */
  $$('[data-cursor]').forEach(el => {
    el.addEventListener('pointerenter', () => { label.textContent = el.dataset.cursor; if (!lens) cur.classList.add('on'); });
    el.addEventListener('pointerleave', () => cur.classList.remove('on'));
  });

  /* ---------- Loupe ---------- */
  function aim() {
    const img = $('img', lens);
    if (!img || !img.naturalWidth) return;
    const r = img.getBoundingClientRect(), cs = getComputedStyle(img);
    const nw = img.naturalWidth, nh = img.naturalHeight;
    const s = cs.objectFit === 'contain' ? Math.min(r.width / nw, r.height / nh) : Math.max(r.width / nw, r.height / nh);
    const dw = nw * s, dh = nh * s;
    const [px, py] = cs.objectPosition.split(' ').map(v => (v.endsWith('%') ? parseFloat(v) / 100 : 0.5));
    const ox = r.left + (r.width - dw) * px, oy = r.top + (r.height - dh) * py;
    const u = (tx - ox) / dw, v = (ty - oy) / dh;
    loupe.style.setProperty('--lx', tx.toFixed(1) + 'px');
    loupe.style.setProperty('--ly', ty.toFixed(1) + 'px');
    loupe.style.setProperty('--bs', `${(dw * ZOOM).toFixed(1)}px ${(dh * ZOOM).toFixed(1)}px`);
    loupe.style.setProperty('--bp', `${(R - u * dw * ZOOM).toFixed(1)}px ${(R - v * dh * ZOOM).toFixed(1)}px`);
  }
  $$('[data-loupe]').forEach(el => {
    el.addEventListener('pointerenter', e => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      const img = $('img', el);
      if (!img) return;
      lens = el;
      // The loupe always shows the largest file in the srcset, whatever size the page shows.
      const largest = img.srcset ? new URL(img.srcset.split(',').pop().trim().split(/\s+/)[0], document.baseURI).href : '';
      loupe.style.setProperty('--img', `url("${largest || img.currentSrc || img.src}")`);
      tx = e.clientX; ty = e.clientY;
      aim();
      loupe.classList.add('on');
      cur.classList.remove('on');
    });
    el.addEventListener('pointermove', () => { if (lens === el && !raf) aim(); }, { passive: true });
    el.addEventListener('pointerleave', () => {
      if (lens !== el) return;
      lens = null;
      loupe.classList.remove('on');
      if (el.closest('[data-cursor]')?.matches(':hover')) cur.classList.add('on');
    });
  });
  addEventListener('scroll', () => { if (lens) aim(); }, { passive: true });

  /* ---------- Magnetic buttons ---------- */
  $$('[data-magnetic]').forEach(el => {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      el.classList.add('pull');
      el.style.translate = `${(x * 9).toFixed(1)}px ${(y * 7).toFixed(1)}px`;
    });
    el.addEventListener('pointerleave', () => { el.classList.remove('pull'); el.style.translate = ''; });
  });
}
