/* Ranlanka · The Jharokha: page behaviour, ported from the design canvas. */
(() => {
  const root = document.querySelector('.rl');
  if (!root) return;
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  // very tall viewports lay the pinned scroll scenes out flat
  const fit = () => root.classList.toggle('rl--tall', window.innerHeight > 1800);
  fit();
  window.addEventListener('resize', fit);

  // compact header: scroll timelines drive it where supported, this class everywhere else
  const hdrFixed = $('.hdr-fixed');
  const onScroll = () => hdrFixed.classList.toggle('is-shown', window.scrollY > 800);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* hero slideshow */
  const hero = $('#top');
  const slides = $$('.sl', hero);
  const kickers = $$('.hk', hero);
  const heads = $$('.hg', hero);
  const bars = $$('.sb', hero);
  const counter = $('.hc-num', hero);
  let slide = 0;
  let prevSlide = -1;
  let paused = false;
  let last = Date.now();

  const paintSlides = () => {
    [slides, kickers, heads].forEach((set) => set.forEach((el, i) => {
      el.classList.toggle('is-on', i === slide);
      el.classList.toggle('is-past', i === prevSlide);
    }));
    bars.forEach((el, i) => {
      el.classList.toggle('is-on', i === slide);
      el.classList.toggle('is-done', i < slide);
    });
    counter.textContent = '0' + (slide + 1);
  };
  const go = (i) => {
    if (i === slide) return;
    last = Date.now();
    prevSlide = slide;
    slide = i;
    hero.classList.remove('is-intro');
    paintSlides();
  };
  const advance = () => go((slide + 1) % slides.length);
  const setPaused = (on) => {
    paused = on;
    hero.classList.toggle('is-paused', on);
    if (!on) last = Date.now();
  };

  bars.forEach((bar, i) => bar.addEventListener('click', () => go(i)));
  $$('.harr', hero).forEach((btn) => btn.addEventListener('click', () => {
    go((slide + Number(btn.dataset.step) + slides.length) % slides.length);
  }));
  // the progress bar's fill animation sets the pace
  hero.addEventListener('animationend', (e) => {
    if (e.animationName === 'sbFill' && e.target.parentElement === bars[slide]) advance();
  });
  // fallback in case an animationend never arrives
  setInterval(() => {
    if (paused || document.hidden) { last = Date.now(); return; }
    if (reduce.matches) return;
    if (Date.now() - last > 11000) advance();
  }, 1000);

  hero.addEventListener('mousemove', (e) => {
    const r = hero.getBoundingClientRect();
    if (!r.width || !r.height) return;
    hero.style.setProperty('--mx', (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
    hero.style.setProperty('--my', (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
  });
  hero.addEventListener('mouseenter', () => setPaused(true));
  hero.addEventListener('mouseleave', () => {
    hero.style.setProperty('--mx', '0');
    hero.style.setProperty('--my', '0');
    if (!hero.contains(document.activeElement)) setPaused(false);
  });
  // keyboard users pause it the same way, by moving focus into the hero
  hero.addEventListener('focusin', () => setPaused(true));
  hero.addEventListener('focusout', (e) => {
    if (!hero.contains(e.relatedTarget) && !hero.matches(':hover')) setPaused(false);
  });

  /* mobile menu */
  const menu = $('#mnav');
  const menuBtns = $$('.menu-btn');
  const menuClose = $('.mnav-close', menu);
  let opener = null;
  const onMenuKey = (e) => { if (e.key === 'Escape') setMenu(false, true); };
  function setMenu(open, restoreFocus) {
    menu.hidden = !open;
    document.documentElement.classList.toggle('is-locked', open);
    menuBtns.forEach((btn) => {
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    if (open) {
      document.addEventListener('keydown', onMenuKey);
      menuClose.focus();
    } else {
      document.removeEventListener('keydown', onMenuKey);
      if (restoreFocus && opener) opener.focus();
      opener = null;
    }
  }
  menuBtns.forEach((btn) => btn.addEventListener('click', () => {
    if (menu.hidden) { opener = btn; setMenu(true); } else setMenu(false, true);
  }));
  menuClose.addEventListener('click', () => setMenu(false, true));
  // a link closes the menu and lets the page scroll to its section
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false, false)));

  /* the Rani edit: jeweller's loupe */
  $$('.stage').forEach((stage) => stage.addEventListener('mousemove', (e) => {
    const r = stage.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const w = stage.offsetWidth;
    const h = stage.offsetHeight;
    const fx = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    const fy = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    stage.style.setProperty('--w', w + 'px');
    stage.style.setProperty('--h', h + 'px');
    stage.style.setProperty('--x', (fx * w).toFixed(1) + 'px');
    stage.style.setProperty('--y', (fy * h).toFixed(1) + 'px');
  }));

  /* the tray: a tharasu that weighs the pieces against brass pawn weights */
  const scale = $('#scale');
  const PIECES = [
    { k: 'tikka', pawn: 1 },
    { k: 'nath', pawn: 0.5 },
    { k: 'jhumkas', pawn: 3 },
    { k: 'choker', pawn: 4.5 },
    { k: 'bangles', pawn: 8 },
    { k: 'ring', pawn: 0.75 }
  ];
  const RATE = { 22: 312000, 24: 340000 }; // sample LKR per pawn
  const ARM = 220;
  // Vonca Light digit advances (em), so each odometer cell is as wide as the digit it shows
  const DIGIT_W = [0.696, 0.33, 0.592, 0.62, 0.624, 0.619, 0.644, 0.522, 0.65, 0.643];
  const sel = { tikka: true, jhumkas: true, choker: true };
  let karat = '22';
  let settle = 0;

  const trayBtns = $$('.tray-btn', scale);
  const gems = $$('[data-gem]', scale);
  const weights = $$('.wt', scale).map((el) => ({ el, pawn: Number(el.dataset.wt) }));
  const beam = $('.t-beam', scale);
  const [panL, panR] = $$('.t-pan', scale);
  const odoCells = $$('.odo-cell, .odo-comma', scale);
  const countLine = $('.ro-line', scale);
  const valueLine = $('.ro-value', scale);
  const karatName = $('.ro-karat', scale);
  const karatBtns = $$('.karat-btn', scale);

  const total = () => PIECES.reduce((a, p) => a + (sel[p.k] ? p.pawn : 0), 0);
  const frac = (x) => {
    const w = Math.floor(x + 1e-9);
    const f = ['', '¼', '½', '¾'][Math.round((x - w) * 4)] || '';
    return w === 0 && f ? f : String(w) + f;
  };
  const drop = (el, on, lift) => {
    el.style.opacity = on ? '1' : '0';
    el.style.transform = 'translateY(' + (on ? 0 : lift) + 'px)';
  };
  const setTilt = (tilt) => {
    const rad = tilt * Math.PI / 180;
    const dx = ARM * Math.cos(rad);
    const dy = ARM * Math.sin(rad);
    beam.style.transform = 'rotate(' + tilt + 'deg)';
    panL.style.transform = 'translate(' + (320 - dx).toFixed(2) + 'px, ' + (120 - dy).toFixed(2) + 'px)';
    panR.style.transform = 'translate(' + (320 + dx).toFixed(2) + 'px, ' + (120 + dy).toFixed(2) + 'px)';
  };
  // the counterweights catch up once the beam settles
  const setWeights = (pawn) => {
    let rem = pawn;
    weights.forEach(({ el, pawn: w }) => {
      const on = rem >= w - 1e-9;
      if (on) rem -= w;
      drop(el, on, -40);
    });
  };
  const renderTray = () => {
    const sum = total();
    trayBtns.forEach((btn) => btn.setAttribute('aria-pressed', String(!!sel[btn.dataset.piece])));
    gems.forEach((el) => drop(el, sel[el.dataset.gem], -44));

    const value = Math.round(sum * RATE[karat]);
    const digits = String(value).padStart(7, '0').slice(-7);
    const chars = [digits[0], ',', digits[1], digits[2], digits[3], ',', digits[4], digits[5], digits[6]];
    let lead = true;
    chars.forEach((c, i) => {
      const el = odoCells[i];
      if (c === ',') { el.classList.toggle('is-lead', lead); return; }
      const d = Number(c);
      const isLead = lead && d === 0 && i < chars.length - 1;
      if (!isLead) lead = false;
      el.classList.toggle('is-lead', isLead);
      el.style.width = isLead ? '0' : DIGIT_W[d] + 'em';
      el.firstElementChild.style.transform = 'translateY(' + (-d * 10) + '%)';
    });

    const count = PIECES.filter((p) => sel[p.k]).length;
    countLine.textContent = count + (count === 1 ? ' piece' : ' pieces') + ' · ' + frac(sum) + ' pawn · ' + (sum * 8) + ' g';
    valueLine.textContent = 'Gold value LKR ' + value.toLocaleString('en-US');
    karatName.textContent = karat + ' karat';
    karatBtns.forEach((btn) => btn.setAttribute('aria-pressed', String(btn.dataset.karat === karat)));
  };

  trayBtns.forEach((btn) => btn.addEventListener('click', () => {
    const k = btn.dataset.piece;
    const adding = !sel[k];
    sel[k] = adding;
    clearTimeout(settle);
    renderTray();
    setTilt(adding ? -8 : 8);
    settle = setTimeout(() => { setTilt(0); setWeights(total()); }, 720);
  }));
  karatBtns.forEach((btn) => btn.addEventListener('click', () => {
    karat = btn.dataset.karat;
    renderTray();
  }));
  renderTray();
  setTilt(0);
  setWeights(total());

  /* services: the window beside the list shows the service under the pointer or focus */
  const svcRows = $$('.svc');
  const svcImgs = $$('.svc-media img');
  const capNo = $('.svc-cap-n');
  const capName = $('.svc-cap-t');
  const pickSvc = (i) => {
    svcRows.forEach((row, j) => row.classList.toggle('is-on', i === j));
    svcImgs.forEach((img, j) => img.classList.toggle('is-on', i === j));
    capNo.textContent = '0' + (i + 1);
    capName.textContent = $('.svc-name', svcRows[i]).textContent;
  };
  svcRows.forEach((row, i) => {
    row.addEventListener('mouseenter', () => pickSvc(i));
    row.addEventListener('focus', () => pickSvc(i));
  });

  /* the private viewing request */
  const form = $('#viewing-form');
  const note = $('#viewing-note');
  const field = (name) => form.elements.namedItem(name);

  // the next six days the shop is open (it closes on Sundays)
  const dayBox = $('#day-options', form);
  const next = new Date();
  next.setHours(12, 0, 0, 0);
  for (let added = 0; added < 6;) {
    next.setDate(next.getDate() + 1);
    if (next.getDay() === 0) continue;
    const label = document.createElement('label');
    label.className = 'opt';
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'day';
    input.value = next.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    input.checked = added === 0;
    const face = document.createElement('span');
    face.className = 'opt-face';
    [['day-w', { weekday: 'short' }], ['day-n', { day: 'numeric' }], ['day-m', { month: 'short' }]].forEach(([cls, opt]) => {
      const part = document.createElement('span');
      part.className = cls;
      part.textContent = next.toLocaleDateString('en-GB', opt);
      face.append(part);
    });
    label.append(input, face);
    dayBox.append(label);
    added += 1;
  }

  // no booking backend yet: the request opens in the visitor's email app, addressed to the shop
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const body = [
      'I would like to see: ' + field('topic').value,
      'Preferred day: ' + field('day').value,
      'Time of day: ' + field('time').value,
      'Name: ' + field('name').value.trim(),
      'Phone: ' + field('phone').value.trim()
    ].join('\n');
    window.location.href = 'mailto:ranlankanegombo@gmail.com?subject=' + encodeURIComponent('Private viewing request') + '&body=' + encodeURIComponent(body);
    note.textContent = 'Your email app should open with the request ready to send. We confirm every viewing by phone or email.';
  });
})();
