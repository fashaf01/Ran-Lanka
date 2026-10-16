// The page in motion: hero film, header, the statement, films on screen, scroll scrubs,
// the 916 chapter, reveals and the bokeh in the private viewing.
import { $, $$, clamp, ease, reduce, onScroll } from './core.js';

export function initPage() {
  /* ---------- Hero film ---------- */
  const heroV = $('#hero-video'), ctl = $('#film-ctl'), prog = $('#film-prog');
  let userPaused = false;
  const reveal = () => heroV.classList.add('on');
  heroV.addEventListener('playing', reveal);
  heroV.addEventListener('timeupdate', () => {
    if (heroV.duration) prog.style.strokeDashoffset = (138.2 * (1 - heroV.currentTime / heroV.duration)).toFixed(1);
  });
  const setCtl = paused => { ctl.classList.toggle('paused', paused); ctl.setAttribute('aria-label', paused ? 'Play the film' : 'Pause the film'); };
  ctl.addEventListener('click', () => {
    if (heroV.paused) { userPaused = false; heroV.play().then(reveal).catch(() => {}); setCtl(false); }
    else { userPaused = true; heroV.pause(); setCtl(true); }
  });
  if (reduce) setCtl(true);

  /* ---------- Films play only while on screen ---------- */
  const vio = new IntersectionObserver(es => es.forEach(e => {
    const v = e.target;
    if (e.isIntersecting && !reduce && !(v === heroV && userPaused)) v.play().catch(() => {});
    else if (!e.isIntersecting) v.pause();
  }), { threshold: 0.12 });
  $$('video[data-auto]').forEach(v => vio.observe(v));
  // The hero film waits until the page has loaded, so it never competes with the first paint.
  const startHero = () => vio.observe(heroV);
  if (document.readyState === 'complete') startHero(); else addEventListener('load', startHero, { once: true });

  /* ---------- Posters arrive only as their film comes near ---------- */
  const pio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.poster = e.target.dataset.poster;
    pio.unobserve(e.target);
  }), { rootMargin: '100% 0px' });
  $$('video[data-poster]').forEach(v => pio.observe(v));

  /* ---------- Header: solid past the film, tucked while reading down ---------- */
  const hdr = $('#hdr'), hero = $('#top'), menu = $('#menu'), drawer = $('#drawer');
  let lastY = scrollY;
  onScroll(y => {
    const past = y > hero.offsetHeight - 70;
    hdr.classList.toggle('compact', y > 40);
    hdr.classList.toggle('solid', past);
    hdr.classList.toggle('tuck', past && y > lastY + 2 && menu.hidden && drawer.hidden);
    if (y < lastY - 2) hdr.classList.remove('tuck');
    lastY = y;
  });

  /* ---------- Statement: words fill in as you read ---------- */
  const st = $('#statement'), words = [];
  if (st) {
    const parts = st.textContent.split(/(\s+)/);
    st.textContent = '';
    parts.forEach(t => {
      if (!t || /^\s+$/.test(t)) { st.appendChild(document.createTextNode(t)); return; }
      const s = document.createElement('span');
      s.className = 'w'; s.textContent = t;
      st.appendChild(s); words.push(s);
    });
    onScroll((y, vh) => {
      const r = st.getBoundingClientRect();
      const p = clamp((vh * 0.82 - r.top) / (r.height + vh * 0.25), 0, 1);
      const n = Math.round(p * words.length * 1.05);
      words.forEach((w, i) => w.classList.toggle('on', i < n));
    });
  }

  /* ---------- Rise on enter ---------- */
  const rio = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); rio.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  $$('[data-rise]').forEach(el => rio.observe(el));

  /* ---------- Bokeh: slow points of candle light ---------- */
  $$('.bokeh').forEach(box => {
    if (reduce) return;
    let seed = 7;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    for (let i = 0; i < 16; i++) {
      const s = 8 + rnd() * 46, el = document.createElement('i');
      el.style.cssText = `--x:${(42 + rnd() * 56).toFixed(1)}%;--y:${(8 + rnd() * 84).toFixed(1)}%;--s:${s.toFixed(0)}px;` +
        `--b:${(s > 34 ? 3 : 1).toFixed(0)}px;--t:${(14 + rnd() * 14).toFixed(1)}s;--dl:${(-rnd() * 24).toFixed(1)}s;` +
        `--dx:${(-30 + rnd() * 60).toFixed(0)}px;--o:${(0.35 + rnd() * 0.5).toFixed(2)}`;
      box.appendChild(el);
    }
  });

  if (reduce) return;

  /* ---------- Scroll choreography ---------- */
  const heroFilm = $('#hero-film'), heroCopy = $('.hero-copy');
  const scrubs = $$('[data-scrub]');
  const pure = $('#pure'), pureStick = $('.pure-stick'), pureFrame = $('#pure-frame'), pureNum = $('.pure-num'), pureBody = $('.pure-copy .body');
  onScroll((y, vh) => {
    const hp = clamp(y / Math.max(1, hero.offsetHeight), 0, 1);
    if (hp < 1 || heroFilm.dataset.p !== '1') {
      heroFilm.style.transform = `translate3d(0,${(hp * 18).toFixed(2)}%,0) scale(${(1 + hp * 0.08).toFixed(4)})`;
      heroCopy.style.transform = `translate3d(0,${(-hp * 60).toFixed(1)}px,0)`;
      heroCopy.style.opacity = (1 - hp * 1.6).toFixed(3);
      heroFilm.dataset.p = hp >= 1 ? '1' : '0';
    }
    for (const el of scrubs) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -50 || r.top > vh + 50) continue;
      const p = ease(clamp((vh - r.top) / (vh * 0.85), 0, 1));
      el.style.setProperty('--clip', ((1 - p) * 6).toFixed(2) + '%');
      el.style.setProperty('--zoom', (1 + (1 - p) * 0.14).toFixed(4));
    }
    const pr = pure.getBoundingClientRect();
    if (pr.bottom > -50 && pr.top < vh + 50) {
      const enter = ease(clamp(1 - pr.top / vh, 0, 1));
      pureFrame.style.setProperty('--pi', ((1 - enter) * 9).toFixed(2) + '%');
      pureFrame.style.setProperty('--pi2', ((1 - enter) * 16).toFixed(2) + '%');
      const pp = clamp(-pr.top / Math.max(1, pr.height - vh), 0, 1);
      const settle = ease(clamp(pp * 1.6, 0, 1));
      pureStick.style.setProperty('--pz', (1.12 - pp * 0.12).toFixed(4));
      pureFrame.style.setProperty('--shade', (0.42 + pp * 0.26).toFixed(3));
      pureNum.style.setProperty('--ns', (1.18 - settle * 0.18).toFixed(4));
      pureBody.style.setProperty('--to', (0.35 + ease(clamp((pp - 0.15) * 2.2, 0, 1)) * 0.65).toFixed(3));
    }
  });
}
