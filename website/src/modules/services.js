// Services: five panels in a row (stacked on phones). The open panel widens to show its film,
// its details and where it leads. Money exchange is a split-flap board that reads its rates from
// the exchange table in the gold-rate section, so the two never disagree.
import { $, $$, reduce, finePointer } from './core.js';

const DIGITS = '0123456789', LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function buildBoard(board) {
  const rows = $$('#fx tbody tr').map(tr => {
    const td = $$('td', tr);
    return [$('b', td[0]).textContent.trim(), td[1].textContent.trim(), td[2].textContent.trim()];
  });
  const head = document.createElement('div');
  head.className = 'board-head';
  head.innerHTML = '<span>Currency</span><span>We buy</span><span>We sell</span>';
  board.appendChild(head);
  const cells = [];
  rows.forEach(([code, buy, sell]) => {
    const row = document.createElement('div');
    row.className = 'board-row';
    [[code, 3, true], [buy, 6], [sell, 6]].forEach(([text, width, isCode]) => {
      const group = document.createElement('span');
      group.className = 'cells';
      text.padStart(width, ' ').split('').forEach(ch => {
        const c = document.createElement('span');
        c.className = 'cell' + (ch === ' ' ? ' blank' : '') + (isCode ? ' code' : '');
        c.textContent = ch === ' ' ? '' : ch;
        if (ch !== ' ') cells.push({ el: c, ch });
        group.appendChild(c);
      });
      row.appendChild(group);
    });
    board.appendChild(row);
  });
  return cells;
}

// Each character spins through a few random ones before it settles, column by column.
function flip(cells) {
  if (reduce) return;
  cells.forEach(({ el, ch }, i) => {
    const pool = /\d/.test(ch) ? DIGITS : /[A-Z]/.test(ch) ? LETTERS : '';
    if (!pool) return;
    let n = 6 + (i % 7);
    const step = () => {
      el.classList.remove('tick');
      void el.offsetWidth;
      el.classList.add('tick');
      el.textContent = n > 0 ? pool[(Math.random() * pool.length) | 0] : ch;
      if (n-- > 0) setTimeout(step, 55);
    };
    setTimeout(step, (i % 12) * 28);
  });
}

export function initServices() {
  const acc = $('#svc-acc');
  if (!acc) return;
  const panels = $$('.sp', acc);
  const board = $('#board');
  const cells = board ? buildBoard(board) : [];
  let active = panels.findIndex(p => p.classList.contains('on'));
  let inView = false, hoverT = 0;

  function films() {
    panels.forEach((p, k) => {
      const v = $('video', p);
      if (!v) return;
      if (k === active && inView && !reduce) v.play().catch(() => {});
      else v.pause();
    });
  }

  function open(i) {
    if (i === active) return;
    active = i;
    panels.forEach((p, k) => {
      p.classList.toggle('on', k === i);
      $('.sp-tab', p).setAttribute('aria-expanded', String(k === i));
    });
    films();
    if (board && panels[i].contains(board)) setTimeout(() => flip(cells), 380);
  }

  panels.forEach((p, k) => {
    $('.sp-tab', p).addEventListener('click', () => open(k));
    if (finePointer) {
      p.addEventListener('pointerenter', () => { clearTimeout(hoverT); hoverT = setTimeout(() => open(k), 140); });
      p.addEventListener('pointerleave', () => clearTimeout(hoverT));
    }
  });

  new IntersectionObserver(([e]) => { inView = e.isIntersecting; films(); }, { threshold: 0.2 }).observe(acc);
}
