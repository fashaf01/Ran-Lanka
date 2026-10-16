// Shared helpers and the scroll engine. Lenis smooths the wheel; every scroll-linked
// effect subscribes here and runs once per animation frame.
import Lenis from 'lenis';

export const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];
export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const ease = t => 1 - Math.pow(1 - t, 3);

// Sample rates in rupees for one pawn (8 g). Update them here.
export const RATE = { 22: 312000, 24: 340000 };
export const lkr = n => 'LKR ' + Math.round(n).toLocaleString('en-US');

let lenis = null;
const subs = [];
let ticking = false;

function run() {
  ticking = false;
  const y = scrollY, vh = innerHeight;
  for (const fn of subs) fn(y, vh);
}
export function requestFrame() {
  if (!ticking) { ticking = true; requestAnimationFrame(run); }
}
export function onScroll(fn) { subs.push(fn); }

export function initScroll() {
  if (!reduce) {
    lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, smoothWheel: true, autoRaf: true });
    lenis.on('scroll', requestFrame);
  }
  addEventListener('scroll', requestFrame, { passive: true });
  addEventListener('resize', requestFrame);

  // In-page links glide to their section.
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented) return;
    const id = a.getAttribute('href');
    const el = id.length > 1 && document.getElementById(id.slice(1));
    if (!el) return;
    e.preventDefault();
    if (el.tagName === 'DETAILS') el.open = true;
    scrollToEl(el);
  });
  run();
}

export function scrollToY(y) {
  if (lenis) lenis.scrollTo(y, { duration: 1.6, force: true });
  else scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
}
export function scrollToEl(el) {
  const top = el.id === 'top' ? 0 : el.getBoundingClientRect().top + scrollY - (el.closest('section') === el ? 0 : 110);
  scrollToY(Math.max(0, top));
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
}

// Overlays freeze the page behind them.
export function lockScroll(on) {
  if (lenis) on ? lenis.stop() : lenis.start();
  document.documentElement.style.overflow = on ? 'hidden' : '';
}
