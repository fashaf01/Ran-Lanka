import { RATE_22K, PAWN, CATEGORIES, FILTERS, METALS, SIZES, PRODUCTS, priceOf } from './catalogue.js';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const num = (n) => Math.round(n).toLocaleString('en-US');
const pawns = (g) => String(Math.round((g / PAWN) * 100) / 100);
const code = (p) => p.id.toUpperCase();
const byId = new Map(PRODUCTS.map((p) => [p.id, p]));
const catOf = (key) => CATEGORIES.find((c) => c.key === key);
const link = (p) => `product.html?p=${encodeURIComponent(p.id)}`;
const catLink = (c) => (c.key === 'all' ? 'collection.html' : `collection.html?c=${c.key}`);

const ICON = {
  save: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 2.5h10v15l-5-3.6-5 3.6z"></path></svg>',
  plus: '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M6 0v12M0 6h12"></path></svg>',
  x: '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M1 1l10 10M11 1 1 11"></path></svg>',
  down: '<svg viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4"></path></svg>',
  arrow: '<svg class="ico" viewBox="0 0 26 12" aria-hidden="true"><path d="M1 6h23M19 1l5 5-5 5"></path></svg>',
  mark: '<svg class="mark" viewBox="-24 0 140 140" aria-hidden="true"><path class="mk-g" d="M69 4C58 22 26 44 12 66C2 82 0 103 6 115C12 126 26 129 40 129C56 129 68 121 72 106C74 97 71 90 66 84C63 90 64 98 61 104C58 110 50 113 41 113C28 113 19 107 19 96C19 84 24 74 31 64C44 46 62 26 69 4Z"></path><path class="mk-h" d="M42 60C46 69 59 78 59 89C59 98 51 105 41 105C31 105 24 98 24 89C24 78 38 69 42 60Z"></path><path class="mk-s" d="M52 61C73 59 90 76 90 99C90 121 72 139 48 139C38 139 28 136 21 131C30 133 39 134 47 133C67 131 81 116 81 99C81 82 68 67 52 61Z"></path></svg>'
};

const swatches = (p) => `<span class="sws" role="img" aria-label="${esc(p.metals.map((m) => METALS[m]).join(', '))}">${p.metals.map((m) => `<span class="sw sw--${m}"></span>`).join('')}</span>`;

// the name link stretches over the whole card, so the picture needs no link of its own
const card = (p) => `
  <article class="card">
    <div class="card-media">
      <img src="${esc(p.images[0])}" alt="" width="800" height="1000" loading="lazy" decoding="async">
      ${p.images[1] ? `<img src="${esc(p.images[1])}" alt="" width="800" height="1000" loading="lazy" decoding="async">` : ''}
      ${p.badge ? `<span class="badge">${esc(p.badge)}</span>` : ''}
    </div>
    <button type="button" class="save" data-save="${p.id}" aria-pressed="false" aria-label="Save ${esc(p.name)} to your viewing list">${ICON.save}</button>
    <div class="card-body">
      <h3 class="card-name"><a href="${link(p)}">${esc(p.name)}</a></h3>
      <p class="card-meta">22 karat · ${p.weight} g</p>
      <div class="card-row"><p class="card-price"><small>Est.</small>LKR ${num(priceOf(p).total)}</p>${swatches(p)}</div>
    </div>
  </article>`;

/* menu, as on the home page */
function initMenu() {
  const menu = $('#menu');
  const toggles = $$('[data-menu-toggle]');
  let opener = null;
  const setMenu = (open) => {
    menu.hidden = !open;
    toggles.forEach((b) => {
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
      b.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    if (open) $('.mnav-close', menu).focus();
    else if (opener) opener.focus({ preventScroll: true });
  };
  toggles.forEach((b) => b.addEventListener('click', () => { opener = b; setMenu(menu.hidden); }));
  $$('[data-menu-close]', menu).forEach((el) => el.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) setMenu(false); });
}

/* viewing list: Ranlanka's version of a shopping bag. Pieces are saved in this browser
   and sent to the showroom as a viewing request. */
const KEY = 'rl-viewing-list';
let saved = [];
try { saved = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { saved = []; }
saved = Array.isArray(saved) ? saved.filter((it) => it && byId.has(it.id)) : [];
const isSaved = (id) => saved.some((it) => it.id === id);

function setSaved(next) {
  saved = next;
  try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (e) { /* kept for this visit only */ }
  syncSaved();
}

function syncSaved() {
  $$('[data-save]').forEach((b) => {
    const on = isSaved(b.dataset.save);
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
    const t = $('[data-save-text]', b);
    if (t) t.textContent = on ? b.dataset.on : b.dataset.off;
    b.classList.toggle('is-on', on && !!t);
  });
  $$('[data-list-count]').forEach((el) => { el.textContent = saved.length || ''; });
  $$('.hico[data-list-open]').forEach((b) => b.setAttribute('aria-label', `Viewing list, ${saved.length} ${saved.length === 1 ? 'piece' : 'pieces'}`));
  renderList();
}

const DRAWER = `
  <dialog class="drawer" id="list" aria-labelledby="list-t">
    <div class="dr-head"><h2 class="dr-title" id="list-t">Your viewing list</h2><button type="button" class="dr-x" data-list-close>Close ${ICON.x}</button></div>
    <div class="dr-body" data-list-body></div>
    <div class="dr-foot" data-list-foot hidden>
      <div class="dr-total"><span>Estimate at today’s sample rate</span><strong data-list-total></strong></div>
      <form class="dr-form" data-list-form>
        <div class="field-row">
          <label class="field"><span class="field-l">Your name</span><input class="inp" type="text" name="name" autocomplete="name" required></label>
          <label class="field"><span class="field-l">Phone</span><input class="inp" type="tel" name="phone" autocomplete="tel" required></label>
        </div>
        <label class="field"><span class="field-l">Preferred day</span><input class="inp" type="date" name="day"></label>
        <button type="submit" class="btn btn--wine">Request a viewing${ICON.arrow}</button>
        <p class="note">We confirm every viewing by phone and have the pieces ready at the counter.</p>
      </form>
    </div>
  </dialog>`;

function renderList() {
  const body = $('[data-list-body]');
  if (!body) return;
  const foot = $('[data-list-foot]');
  if (!saved.length) {
    body.innerHTML = `<div class="dr-empty"><p>Your viewing list is empty. Save the pieces you would like to see, and we will have them ready at the counter.</p><a class="tlink" href="collection.html">See the collections${ICON.arrow}</a></div>`;
    foot.hidden = true;
    return;
  }
  body.innerHTML = `<ul class="dr-items">${saved.map((it) => {
    const p = byId.get(it.id);
    const extra = [it.metal && METALS[it.metal], it.size && `${SIZES[p.cat] ? SIZES[p.cat].name : 'Size'} ${it.size}`].filter(Boolean).join(' · ');
    return `<li class="dr-item">
      <img src="${esc(p.images[0])}" alt="" width="800" height="1000">
      <div><a class="dr-name" href="${link(p)}">${esc(p.name)}</a><span class="dr-meta">${code(p)} · 22 karat · ${p.weight} g${extra ? `<br>${esc(extra)}` : ''}<br>Est. LKR ${num(priceOf(p).total)}</span></div>
      <button type="button" class="dr-rm" data-list-rm="${p.id}" aria-label="Remove ${esc(p.name)}">Remove</button>
    </li>`;
  }).join('')}</ul>`;
  $('[data-list-total]').textContent = 'LKR ' + num(saved.reduce((t, it) => t + priceOf(byId.get(it.id)).total, 0));
  foot.hidden = false;
}

function initList() {
  $('.rl').insertAdjacentHTML('beforeend', DRAWER);
  const dlg = $('#list');
  const form = $('[data-list-form]');
  const d = new Date();
  form.elements.day.min = [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-');

  document.addEventListener('click', (e) => { if (e.target.closest('[data-list-open]')) dlg.showModal(); });
  $('[data-list-close]', dlg).addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('click', (e) => {
    const rm = e.target.closest('[data-list-rm]');
    if (rm) setSaved(saved.filter((it) => it.id !== rm.dataset.listRm));
  });

  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-save]');
    if (!b) return;
    const id = b.dataset.save;
    if (isSaved(id)) { setSaved(saved.filter((it) => it.id !== id)); return; }
    const item = { id };
    const opts = b.dataset.options && $(b.dataset.options);
    if (opts) {
      const fd = new FormData(opts);
      if (fd.get('metal')) item.metal = fd.get('metal');
      if (fd.get('size')) item.size = fd.get('size');
    }
    setSaved([...saved, item]);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const lines = [
      'I would like to book a private viewing of these pieces:',
      '',
      ...saved.map((it) => {
        const p = byId.get(it.id);
        return '- ' + [code(p), p.name, `${p.weight} g`, it.metal && METALS[it.metal], it.size && `size ${it.size}`].filter(Boolean).join(', ');
      }),
      '',
      'Name: ' + form.elements.name.value.trim(),
      'Phone: ' + form.elements.phone.value.trim(),
      'Preferred day: ' + (form.elements.day.value || 'Any day')
    ];
    location.href = 'mailto:ranlankanegombo@gmail.com'
      + '?subject=' + encodeURIComponent('Private viewing request')
      + '&body=' + encodeURIComponent(lines.join('\n'));
  });
  syncSaved();
}

/* collection page */
const SORTS = [['rec', 'Recommended'], ['new', 'Newest'], ['low', 'Price: low to high'], ['high', 'Price: high to low'], ['light', 'Weight: light to heavy']];

const matches = (p, key, v) => {
  if (key === 'stone') return v === 'plain' ? !p.stones.length : p.stones.includes(v);
  if (key === 'style') return p.style.includes(v);
  if (key === 'metal') return p.metals.includes(v);
  if (key === 'weight') {
    const [lo, hi] = v.split('-');
    return p.weight >= Number(lo) && (hi === '' || p.weight < Number(hi));
  }
  return true;
};
const matchesGroup = (p, key, set) => !set.size || [...set].some((v) => matches(p, key, v));

function initCollection() {
  const params = new URLSearchParams(location.search);
  const cat = catOf(params.get('c')) || CATEGORIES[0];
  const picked = Object.fromEntries(FILTERS.map((g) => [g.key, new Set((params.get(g.key) || '').split(',').filter((v) => g.options.some((o) => o[0] === v)))]));
  let sort = SORTS.some((s) => s[0] === params.get('sort')) ? params.get('sort') : 'rec';
  const inCat = PRODUCTS.filter((p) => cat.key === 'all' || p.cat === cat.key);

  document.title = `${cat.name} · Ranlanka`;
  $('[data-c-title]').textContent = cat.title;
  $('[data-c-lede]').textContent = cat.lede;
  $('[data-c-crumbs]').innerHTML = cat.key === 'all'
    ? '<li><a href="index.html">Home</a></li><li aria-current="page">Jewellery</li>'
    : `<li><a href="index.html">Home</a></li><li><a href="collection.html">Jewellery</a></li><li aria-current="page">${esc(cat.name)}</li>`;
  $('[data-c-tiles]').innerHTML = CATEGORIES.map((c) => `
    <li><a class="tile" href="${catLink(c)}"${c === cat ? ' aria-current="page"' : ''}>
      <span class="tile-media"><img src="images/dummy/${c.key === 'all' ? 'all' : c.key + '-1'}.svg" alt="" width="800" height="1000" loading="lazy"></span>
      <span class="tile-l">${esc(c.name)}</span>
    </a></li>`).join('');

  const groups = $('[data-f-groups]');
  groups.innerHTML = FILTERS.map((g) => {
    const opts = g.options.filter(([v]) => picked[g.key].has(v) || inCat.some((p) => matches(p, g.key, v)));
    if (!opts.length) return '';
    return `<details class="fgroup" open>
      <summary>${esc(g.name)}${ICON.down}</summary>
      <div class="fopts">${opts.map(([v, label]) => `
        <label class="fopt" data-opt="${g.key}:${v}"><input type="checkbox" name="${g.key}" value="${v}"${picked[g.key].has(v) ? ' checked' : ''}>${esc(label)}<small></small></label>`).join('')}
      </div>
    </details>`;
  }).join('');

  const sel = $('[data-sort]');
  sel.innerHTML = SORTS.map(([v, l]) => `<option value="${v}"${v === sort ? ' selected' : ''}>${l}</option>`).join('');

  const grid = $('[data-grid]');
  const count = $('[data-count]');
  const active = $('[data-active]');
  const panel = $('.filters');

  const update = () => {
    const results = inCat.filter((p) => FILTERS.every((g) => matchesGroup(p, g.key, picked[g.key])));
    const order = new Map(PRODUCTS.map((p, i) => [p.id, i]));
    const sorters = {
      rec: (a, b) => order.get(a.id) - order.get(b.id),
      new: (a, b) => b.added.localeCompare(a.added),
      low: (a, b) => priceOf(a).total - priceOf(b).total,
      high: (a, b) => priceOf(b).total - priceOf(a).total,
      light: (a, b) => a.weight - b.weight
    };
    results.sort(sorters[sort]);

    $$('[data-opt]', groups).forEach((el) => {
      const [key, v] = el.dataset.opt.split(':');
      const n = inCat.filter((p) => matches(p, key, v) && FILTERS.every((g) => g.key === key || matchesGroup(p, g.key, picked[g.key]))).length;
      $('small', el).textContent = n;
      el.classList.toggle('is-none', !n);
    });

    const cards = results.map(card);
    const promo = `<aside class="promo dark" aria-label="Design your own">
      <span class="eyebrow">Design your own</span>
      <p class="promo-t">Can’t find it? We make it in twenty-two karat gold.</p>
      <a class="tlink" href="index.html#bespoke">Start a design${ICON.arrow}</a>
    </aside>`;
    if (cards.length) cards.splice(Math.min(4, cards.length), 0, promo);
    grid.innerHTML = cards.length ? cards.join('') : `<div class="empty"><p class="empty-t">No pieces match these filters.</p><button type="button" class="btn btn--line" data-clear>Clear filters</button></div>`;
    count.textContent = `${results.length} ${results.length === 1 ? 'piece' : 'pieces'}`;
    $('[data-f-show]').textContent = `Show ${results.length} ${results.length === 1 ? 'piece' : 'pieces'}`;

    const chips = FILTERS.flatMap((g) => [...picked[g.key]].map((v) => {
      const label = g.options.find((o) => o[0] === v)[1];
      return `<button type="button" class="achip" data-unpick="${g.key}:${v}" aria-label="Remove filter: ${esc(label)}">${esc(label)}${ICON.x}</button>`;
    }));
    active.innerHTML = chips.length ? chips.join('') + '<button type="button" class="aclear" data-clear>Clear all</button>' : '';

    const q = new URLSearchParams();
    if (cat.key !== 'all') q.set('c', cat.key);
    FILTERS.forEach((g) => { if (picked[g.key].size) q.set(g.key, [...picked[g.key]].join(',')); });
    if (sort !== 'rec') q.set('sort', sort);
    history.replaceState(null, '', location.pathname + (q.toString() ? '?' + q : ''));
    syncSaved();
  };

  groups.addEventListener('change', (e) => {
    const box = e.target;
    if (box.checked) picked[box.name].add(box.value); else picked[box.name].delete(box.value);
    update();
  });
  sel.addEventListener('change', () => { sort = sel.value; update(); });
  const clear = () => {
    FILTERS.forEach((g) => picked[g.key].clear());
    $$('input', groups).forEach((i) => { i.checked = false; });
    update();
  };
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-clear]')) clear();
    const un = e.target.closest('[data-unpick]');
    if (un) {
      const [key, v] = un.dataset.unpick.split(':');
      picked[key].delete(v);
      const box = $(`input[name="${key}"][value="${v}"]`, groups);
      if (box) box.checked = false;
      update();
    }
  });

  // filters become a full-screen panel on small screens
  const opener = $('[data-f-open]');
  const setPanel = (open) => {
    panel.classList.toggle('is-open', open);
    opener.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (open) $('[data-f-close]').focus(); else opener.focus({ preventScroll: true });
  };
  opener.addEventListener('click', () => setPanel(true));
  $$('[data-f-close]').forEach((b) => b.addEventListener('click', () => setPanel(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && panel.classList.contains('is-open')) setPanel(false); });

  update();
}

/* product page */
const SIZE_HELP = {
  rings: 'Ring sizes are US sizes. If you are not sure of yours, we measure your finger at the counter.',
  bangles: 'Bangle sizes are the inside width in inches, from 2.2 (small) to 2.10 (large). If you are not sure, we size your hand at the counter.',
  bracelets: 'Lengths are measured end to end with the clasp closed. Most wrists suit 7 inches.',
  chains: 'Lengths are measured end to end with the clasp closed. 16 inches sits at the base of the neck, 18 inches at the collarbone.'
};

function initProduct() {
  const root = $('[data-pdp]');
  const p = byId.get(new URLSearchParams(location.search).get('p'));
  if (!p) {
    root.innerHTML = `<div class="wrap nf"><span class="eyebrow">Not found</span><h1 class="h2">We couldn’t find that piece.</h1><a class="btn btn--line" href="collection.html">See all jewellery${ICON.arrow}</a></div>`;
    return;
  }
  const cat = catOf(p.cat);
  const price = priceOf(p);
  const size = SIZES[p.cat];
  document.title = `${p.name} · Ranlanka`;

  const pills = (name, values, label, first) => values.map((v, i) => `
    <label class="pill"><input type="radio" name="${name}" value="${esc(v)}"${first && i === 0 ? ' checked' : ''}><span>${label(v)}</span></label>`).join('');
  const related = [...PRODUCTS.filter((x) => x.cat === p.cat && x !== p), ...PRODUCTS.filter((x) => x.cat !== p.cat)].slice(0, 4);

  root.innerHTML = `
    <div class="wrap">
      <nav class="p-top" aria-label="Breadcrumb"><ol class="crumbs">
        <li><a href="index.html">Home</a></li><li><a href="collection.html">Jewellery</a></li>
        <li><a href="${catLink(cat)}">${esc(cat.name)}</a></li><li aria-current="page">${esc(p.name)}</li>
      </ol></nav>
      <div class="pdp">
        <div class="gal">
          <ul class="gal-thumbs">${p.images.map((src, i) => `
            <li><button type="button" class="gal-thumb" data-img="${i}" aria-current="${i === 0}" aria-label="Show image ${i + 1} of ${p.images.length}"><img src="${esc(src)}" alt="" width="800" height="1000"></button></li>`).join('')}
          </ul>
          <figure class="gal-main"><img src="${esc(p.images[0])}" alt="${esc(p.name)}" width="800" height="1000" data-main>${p.badge ? `<span class="badge">${esc(p.badge)}</span>` : ''}</figure>
        </div>
        <div class="p-info">
          <div>
            <span class="eyebrow">${esc(cat.name)}</span>
            <h1 class="p-name">${esc(p.name)}</h1>
            <p class="p-spec">22 karat · ${p.weight} g · about ${pawns(p.weight)} pawn <span class="p-code">· ${code(p)}</span></p>
          </div>
          <p class="p-about">${esc(p.about)}</p>
          <div class="p-price">
            <span class="rc-label">Estimate at today’s rate</span>
            <span class="p-fig"><small>LKR</small>${num(price.total)}</span>
            <span class="p-why">Gold is priced by weight on the day. The final price is set when the piece is weighed in front of you.</span>
            <details class="bd-wrap">
              <summary>How this is priced${ICON.down}</summary>
              <table class="bd"><tbody>
                <tr><th scope="row">Gold, ${p.weight} g at LKR ${num(RATE_22K)} a gram</th><td>${num(price.gold)}</td></tr>
                <tr><th scope="row">Making charge, ${p.making}%</th><td>${num(price.making)}</td></tr>
                ${p.stoneValue ? `<tr><th scope="row">Stones</th><td>${num(price.stones)}</td></tr>` : ''}
                <tr><th scope="row">Estimate</th><td>LKR ${num(price.total)}</td></tr>
              </tbody></table>
            </details>
          </div>
          ${p.metals.length > 1 || size ? `<form class="p-opts" id="p-opts">
            ${p.metals.length > 1 ? `<fieldset class="opt"><legend>Gold colour <span data-show="metal">${METALS[p.metals[0]]}</span></legend><div class="opts">${pills('metal', p.metals, (m) => `<span class="sw sw--${m}"></span>${METALS[m]}`, true)}</div></fieldset>` : ''}
            ${size ? `<fieldset class="opt"><legend>${size.name} <span data-show="size">Not sure yet</span></legend><div class="opts">${pills('size', size.values, esc, false)}</div><p class="opt-help">${SIZE_HELP[p.cat]}</p></fieldset>` : ''}
          </form>` : ''}
          <div class="p-act">
            <button type="button" class="btn btn--wine" data-save="${p.id}" data-options="#p-opts" data-off="Add to viewing list" data-on="On your viewing list" aria-pressed="false"><span data-save-text>Add to viewing list</span>${ICON.arrow}</button>
            <button type="button" class="btn btn--line" data-list-open>See your viewing list</button>
          </div>
          <ul class="p-trust">
            <li>${ICON.mark}Pure 22 karat, 916 gold</li>
            <li>${ICON.mark}Weighed in front of you</li>
            <li>${ICON.mark}Made to your design</li>
          </ul>
          <div class="acc">
            <details open><summary>Details${ICON.plus}</summary><div class="acc-body"><dl>
              <dt>Code</dt><dd>${code(p)}</dd>
              <dt>Gold</dt><dd>22 karat (916)</dd>
              <dt>Weight</dt><dd>${p.weight} g, about ${pawns(p.weight)} pawn</dd>
              <dt>Colour</dt><dd>${p.metals.map((m) => METALS[m]).join(', ')}</dd>
              <dt>Stones</dt><dd>${p.stones.length ? p.stones.map((s) => s[0].toUpperCase() + s.slice(1)).join(', ') : 'None, plain gold'}</dd>
            </dl></div></details>
            ${size ? `<details><summary>Size guide${ICON.plus}</summary><div class="acc-body"><p>${SIZE_HELP[p.cat]}</p></div></details>` : ''}
            <details><summary>Care${ICON.plus}</summary><div class="acc-body"><p>Gold keeps its colour, but perfume, soap and chlorine dull the shine. Put your jewellery on last, take it off to swim or bathe, and store each piece on its own so stones and chains do not scratch. Wipe it with a soft, dry cloth after wearing.</p></div></details>
            <details><summary>Seeing it in the showroom${ICON.plus}</summary><div class="acc-body"><p>Save this piece to your viewing list and send it to us with a preferred day. We confirm every viewing by phone and have the pieces ready at the counter.</p><p>192 Main Street, Negombo. Monday to Saturday, 10 am to 7.30 pm. Closed on Sundays and Poya days.</p></div></details>
          </div>
        </div>
      </div>
    </div>
    <section class="related" aria-labelledby="rel-t">
      <div class="wrap">
        <div class="related-h">
          <div><span class="eyebrow">More from Ranlanka</span><h2 class="h2" id="rel-t">You may also like.</h2></div>
          <a class="tlink" href="${catLink(cat)}">All ${esc(cat.name.toLowerCase())}${ICON.arrow}</a>
        </div>
        <div class="grid grid--4">${related.map(card).join('')}</div>
      </div>
    </section>`;

  const main = $('[data-main]', root);
  $$('[data-img]', root).forEach((b) => b.addEventListener('click', () => {
    main.src = p.images[Number(b.dataset.img)];
    $$('[data-img]', root).forEach((o) => o.setAttribute('aria-current', o === b ? 'true' : 'false'));
  }));
  const opts = $('#p-opts');
  if (opts) opts.addEventListener('change', (e) => {
    const show = $(`[data-show="${e.target.name}"]`, opts);
    if (show) show.textContent = e.target.name === 'metal' ? METALS[e.target.value] : e.target.value;
  });
}

initMenu();
initList();
if (document.body.dataset.page === 'collection') initCollection();
if (document.body.dataset.page === 'product') { initProduct(); syncSaved(); }
