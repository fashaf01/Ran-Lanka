// The menu, with a preview of each destination, and the quick view of a piece.
import { $, $$, reduce, lockScroll, RATE, lkr } from './core.js';

const PIECES = {
  jhumka: {
    img: 'm/jhumka-1200.webp', title: 'Rani temple jhumkas', pawn: 3,
    alt: 'A pair of 22 karat gold temple jhumkas with ruby flower studs and pearl fringes',
    text: 'Domed temple bells covered in fine gold granulation, hung from ruby flower studs, with a fringe of seed pearls that moves as you turn your head.',
    specs: [['Gold', '22 karat yellow gold'], ['Stones', 'Rubies and seed pearls'], ['Weight', 'About 3 pawn (24 g), the pair'], ['Made', 'By hand in Negombo']],
  },
  choker: {
    img: 'm/choker-1200.webp', title: 'Rani kundan choker', pawn: 4.5,
    alt: 'A 22 karat gold kundan choker with uncut diamonds, rubies, emerald drops and pearls',
    text: 'Uncut polki diamonds and rubies set in gold, with an emerald drop and a pearl beneath every setting. It sits close at the base of the neck.',
    specs: [['Gold', '22 karat yellow gold'], ['Stones', 'Polki diamonds, rubies, emeralds, pearls'], ['Weight', 'About 4½ pawn (36 g)'], ['Made', 'By hand in Negombo']],
  },
  bangles: {
    img: 'm/hands-1200.webp', title: 'Rani bangles & kada', pawn: 8,
    alt: "A bride's hands wearing 22 karat gold bangles, an engraved kada and a ruby ring",
    text: 'Beaded bangles worn in a stack with one wide, hand-engraved kada. Sold one by one or as a set, sized at the counter.',
    specs: [['Gold', '22 karat yellow gold'], ['Finish', 'Beaded and hand-engraved'], ['Weight', 'About 8 pawn (64 g), set of five'], ['Made', 'By hand in Negombo']],
  },
};

export function initOverlays() {
  const menu = $('#menu'), drawer = $('#drawer');

  /* ---------- Menu ---------- */
  const openBtn = $('#menu-open'), closeBtn = $('#menu-close'), peeks = $$('.menu-peek img');
  function setMenu(on, focus = true) {
    menu.hidden = !on;
    openBtn.setAttribute('aria-expanded', String(on));
    lockScroll(on);
    if (focus) (on ? closeBtn : openBtn).focus();
  }
  openBtn.addEventListener('click', () => setMenu(true));
  closeBtn.addEventListener('click', () => setMenu(false));
  $$('#menu-nav a').forEach(a => {
    a.addEventListener('click', () => setMenu(false, false));
    const peek = () => peeks.forEach((im, k) => im.classList.toggle('on', k === Number(a.dataset.peek)));
    a.addEventListener('pointerenter', peek);
    a.addEventListener('focus', peek);
  });

  /* ---------- Quick view ---------- */
  let opener = null;
  const img = $('#dw-img');
  function openPiece(key, from) {
    const p = PIECES[key];
    if (!p) return;
    opener = from;
    img.src = p.img; img.alt = p.alt;
    $('#dw-title').textContent = p.title;
    $('#dw-text').textContent = p.text;
    const dl = $('#dw-specs');
    dl.textContent = '';
    p.specs.forEach(([k, v]) => {
      const d = document.createElement('div'), dt = document.createElement('dt'), dd = document.createElement('dd');
      dt.textContent = k; dd.textContent = v;
      d.append(dt, dd); dl.appendChild(d);
    });
    $('#dw-worth').textContent = lkr(p.pawn * RATE[22]);
    drawer.hidden = false;
    lockScroll(true);
    requestAnimationFrame(() => requestAnimationFrame(() => drawer.classList.add('open')));
    $('.drawer-close', drawer).focus();
  }
  function closePiece(restore = true) {
    drawer.classList.remove('open');
    lockScroll(false);
    setTimeout(() => { drawer.hidden = true; }, reduce ? 0 : 750);
    if (restore && opener) opener.focus({ preventScroll: true });
  }
  $$('[data-piece]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); openPiece(a.dataset.piece, a); }));
  $$('[data-close]', drawer).forEach(b => b.addEventListener('click', () => closePiece(b.tagName !== 'A')));

  addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (!drawer.hidden) closePiece();
    else if (!menu.hidden) setMenu(false);
  });
}
