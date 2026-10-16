// Chapter I: the bridal set. On wide screens the chapter is pinned and scrolling walks
// through the five pieces; on phones it advances by itself every six seconds.
import { $, $$, clamp, reduce, onScroll, scrollToY } from './core.js';

export function initBridal() {
  const set = $('#bride'), items = $$('#set-list li'), figs = $$('#set-media figure'), num = $('#set-n');
  if (!set) return;
  const N = figs.length;
  const wide = matchMedia('(min-width: 861px)');
  const pinned = () => wide.matches && !reduce;
  let active = 0, visible = false, autoStart = performance.now();
  const vid = k => $('video', figs[k]);
  const btn = k => $('button', items[k]);

  function play() {
    figs.forEach((f, k) => {
      const v = vid(k);
      if (k === active && visible && !reduce) { v.preload = 'auto'; v.play().catch(() => {}); }
      else if (!f.classList.contains('was')) v.pause();
    });
  }
  function show(i) {
    if (i === active) return;
    const prev = figs[active], next = figs[i];
    figs.forEach(f => { if (f !== prev) f.classList.remove('was'); });
    prev.classList.remove('on'); prev.classList.add('was');
    next.classList.remove('was'); next.classList.add('on');
    items.forEach((li, k) => {
      li.classList.toggle('on', k === i);
      if (k === i) btn(k).setAttribute('aria-current', 'true');
      else { btn(k).removeAttribute('aria-current'); btn(k).style.setProperty('--p', 0); }
    });
    num.textContent = String(i + 1).padStart(2, '0');
    active = i;
    setTimeout(() => {
      if (!prev.classList.contains('on')) { prev.classList.remove('was'); vid(figs.indexOf(prev)).pause(); }
    }, 1300);
    play();
  }

  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    autoStart = performance.now();
    if (visible) { play(); tick(); } else figs.forEach((f, k) => vid(k).pause());
  }, { threshold: 0.15 }).observe(set);

  items.forEach((li, k) => btn(k).addEventListener('click', () => {
    if (pinned()) {
      const top = set.getBoundingClientRect().top + scrollY, span = set.offsetHeight - innerHeight;
      scrollToY(top + span * ((k + 0.5) / N));
    } else { show(k); autoStart = performance.now(); }
  }));

  function tick() {
    if (!visible || pinned() || reduce) return;
    const p = (performance.now() - autoStart) / 6000;
    if (p >= 1) { show((active + 1) % N); autoStart = performance.now(); }
    btn(active).style.setProperty('--p', Math.min(1, p).toFixed(3));
    requestAnimationFrame(tick);
  }
  wide.addEventListener('change', () => { autoStart = performance.now(); tick(); });

  onScroll((y, vh) => {
    if (!pinned()) return;
    const r = set.getBoundingClientRect();
    if (r.bottom < 0 || r.top > vh) return;
    const sp = clamp(-r.top / Math.max(1, set.offsetHeight - vh), 0, 0.9999);
    const i = Math.floor(sp * N);
    show(i);
    btn(i).style.setProperty('--p', (sp * N - i).toFixed(3));
  });
}
