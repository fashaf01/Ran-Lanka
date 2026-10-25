/* @ds-bundle: {"format":4,"namespace":"Ranlanka","components":[{"name":"Button"},{"name":"Icon"},{"name":"Eyebrow"},{"name":"SectionHead"},{"name":"Hallmark"},{"name":"PriceTag"},{"name":"RanWord"},{"name":"Glint"},{"name":"LampHero"},{"name":"Tray"},{"name":"PieceCard"},{"name":"FilterTabs"},{"name":"RateChip"},{"name":"RateBoard"},{"name":"StepList"},{"name":"HouseRule"},{"name":"OpenStatus"},{"name":"Hours"},{"name":"Header"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;

  function cx() {
    return Array.prototype.filter.call(arguments, Boolean).join(' ');
  }
  function omit(obj, keys) {
    var out = {};
    for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && keys.indexOf(k) < 0) out[k] = obj[k];
    return out;
  }
  function money(n) {
    return Math.round(n).toLocaleString('en-US');
  }

  /* ---------- Icon ---------- */
  var ICONS = {
    arrow: ['M3 12h17M15 7l5 5-5 5'],
    scale: ['M12 3.5v16.5M8 20h8M4.5 7h15', 'M4.5 7 2 13h5L4.5 7ZM19.5 7 17 13h5l-2.5-6Z', 'M2 13a2.5 2.5 0 0 0 5 0M17 13a2.5 2.5 0 0 0 5 0'],
    sketch: ['M4 20l1.2-4.3L15.8 5.1a1.8 1.8 0 0 1 2.6 0l.5.5a1.8 1.8 0 0 1 0 2.6L8.3 18.8 4 20Z', 'M14 7l3 3'],
    exchange: ['M4 8.5h15l-3.5-3.5M20 15.5H5l3.5 3.5'],
    pin: ['M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z', 'M9.8 10a2.2 2.2 0 1 0 4.4 0a2.2 2.2 0 1 0-4.4 0'],
    phone: ['M6.5 3.5h2.6l1.4 4-2 1.3a10.5 10.5 0 0 0 6.7 6.7l1.3-2 4 1.4v2.6a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z'],
    clock: ['M3.5 12a8.5 8.5 0 1 0 17 0a8.5 8.5 0 1 0-17 0', 'M12 7.5V12l3 2'],
    mail: ['M4 5.5h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1Z', 'm3.5 6.5 8.5 6.5 8.5-6.5']
  };
  function Icon(p) {
    var size = p.size || 20;
    var paths = ICONS[p.name] || ICONS.arrow;
    return h('svg', {
      className: cx('rl-icon', p.className), width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
      strokeWidth: p.strokeWidth || 1.3, strokeLinecap: 'round', strokeLinejoin: 'round',
      'aria-hidden': p.title ? undefined : 'true', role: p.title ? 'img' : undefined, 'aria-label': p.title
    }, paths.map(function (d, i) { return h('path', { key: i, d: d }); }));
  }

  /* ---------- Button ---------- */
  function Button(p) {
    var variant = p.variant || 'gold';
    var rest = omit(p, ['variant', 'size', 'icon', 'children', 'className', 'href']);
    var icon = p.icon === true ? 'arrow' : p.icon;
    rest.className = cx('rl-btn', 'rl-btn--' + variant, p.size === 'sm' && 'rl-btn--sm', p.className);
    if (p.href) rest.href = p.href; else if (!rest.type) rest.type = 'button';
    return h(p.href ? 'a' : 'button', rest, h('span', null, p.children), icon ? h(Icon, { name: icon, size: 16 }) : null);
  }

  /* ---------- Eyebrow & SectionHead ---------- */
  function Eyebrow(p) {
    return h(p.as || 'p', { className: cx('rl-eyebrow eyebrow', p.align === 'center' && 'rl-eyebrow--center', p.rule === false && 'rl-eyebrow--bare', p.className) }, p.children);
  }
  function SectionHead(p) {
    var level = p.level || 2;
    var size = p.size || 'title';
    return h('header', { className: cx('rl-head', p.align === 'center' && 'rl-head--center', p.className) },
      p.eyebrow ? h(Eyebrow, { align: p.align }, p.eyebrow) : null,
      h('h' + level, { className: cx('rl-head__title', size) }, p.title),
      p.lede ? h('p', { className: 'rl-head__lede lede' }, p.lede) : null,
      p.children);
  }

  /* ---------- Hallmark ---------- */
  function Hallmark(p) {
    var value = p.value || '916';
    var karat = p.karat === undefined ? '22K' : p.karat;
    return h('span', {
      className: cx('rl-hm', p.on && 'rl-hm--' + p.on, p.size === 'lg' && 'rl-hm--lg', p.className), role: 'img',
      'aria-label': p.label || (value + ' hallmark' + (karat ? ', ' + karat.replace('K', ' karat') : ''))
    }, h('span', { className: 'rl-hm__in', 'aria-hidden': 'true' },
      h('span', { className: 'rl-hm__v' }, value),
      karat ? h('span', { className: 'rl-hm__k' }, karat) : null));
  }

  /* ---------- PriceTag ---------- */
  function PriceTag(p) {
    var currency = p.currency || 'LKR';
    var price = typeof p.price === 'number' ? currency + ' ' + money(p.price) : p.price;
    return h('span', { className: cx('rl-tag', p.on === 'tray' && 'rl-tag--tray', p.className) },
      h('svg', { className: 'rl-tag__thread', viewBox: '0 0 26 28', fill: 'none', stroke: 'currentColor', strokeWidth: 1, 'aria-hidden': 'true' },
        h('path', { d: 'M19 14C14 14 10 9.5 5.5 10.2 2 10.8 1.8 16.6 5.6 16.6 9.4 16.6 13 14 19 14Z' })),
      h('span', { className: 'rl-tag__edge' },
        h('span', { className: 'rl-tag__body' },
          h('i', { className: 'rl-tag__hole', 'aria-hidden': 'true' }),
          p.weight ? h('span', { className: 'rl-tag__w' }, p.weight) : null,
          price ? h('span', { className: 'rl-tag__p' }, price) : null)));
  }

  /* ---------- RanWord ---------- */
  function RanWord(p) {
    return h('span', { className: cx('rl-ran', p.size && 'rl-ran--' + p.size, p.className) },
      h('span', { className: 'rl-ran__word ' + (p.size === 'text' ? 'sinhala-text' : 'sinhala-mark'), lang: 'si' }, p.word || 'රන්'),
      p.reading === false ? null : h('span', { className: 'rl-ran__read' }, p.reading || 'Ran · Gold'));
  }

  /* ---------- Glint ---------- */
  function Glint(p) {
    var style = { left: (p.x == null ? 50 : p.x) + '%', top: (p.y == null ? 50 : p.y) + '%' };
    if (p.size) style['--size'] = typeof p.size === 'number' ? p.size + 'px' : p.size;
    if (p.delay != null) style.animationDelay = p.delay + 's';
    return h('span', { className: cx('rl-glint', p.loop === false && 'rl-glint--once'), style: style, 'aria-hidden': 'true' });
  }

  /* ---------- LampHero ---------- */
  function LampHero(p) {
    var glints = p.glints || [];
    var style = { height: typeof p.height === 'number' ? p.height + 'px' : (p.height || 'clamp(600px, 100svh, 1040px)') };
    return h('section', { className: cx('rl-lamp', p.className), 'data-theme': 'night', style: style, 'aria-label': p.label },
      h('div', { className: 'rl-lamp__stage', style: { '--fx': p.focus == null ? 0.5 : p.focus }, 'aria-hidden': p.alt ? undefined : 'true' },
        h('div', { className: 'rl-lamp__cam' },
          h('img', { className: 'rl-lamp__img', src: p.image, alt: p.alt || '', decoding: 'async' }),
          p.mask ? h('div', { className: 'rl-lamp__gold', 'aria-hidden': 'true', style: { '--mask': 'url("' + p.mask + '")' } },
            h('span', { className: 'rl-lamp__bloom' }, h('i')),
            h('span', { className: 'rl-lamp__pass' }, h('i'))) : null,
          h('div', { className: 'rl-lamp__light', 'aria-hidden': 'true' },
            h('span', { className: 'rl-lamp__beam' }),
            h('span', { className: 'rl-lamp__key' }),
            glints.map(function (g, i) {
              return h(Glint, { key: i, x: g.x, y: g.y, size: g.size, delay: g.delay == null ? 2.1 + i * 0.35 : g.delay });
            })))),
      h('div', { className: 'rl-lamp__shade', 'aria-hidden': 'true' }),
      p.header || null,
      h('div', { className: 'rl-lamp__ui' },
        h('div', { className: 'rl-lamp__copy' },
          p.eyebrow ? h(Eyebrow, null, p.eyebrow) : null,
          h('h1', { className: 'rl-lamp__title display-hero' }, p.title),
          p.lede ? h('p', { className: 'rl-lamp__lede lede' }, p.lede) : null,
          p.actions ? h('div', { className: 'rl-lamp__actions' }, p.actions) : null)),
      p.foot ? h('div', { className: 'rl-lamp__foot', 'aria-hidden': 'true' },
        h('span', null, p.foot),
        h('span', { className: 'rl-lamp__scroll' }, 'Scroll', h('i'))) : null);
  }

  /* ---------- Tray ---------- */
  function Tray(p) {
    var rest = omit(p, ['as', 'frame', 'className', 'children']);
    rest.className = cx('rl-tray', p.frame === false && 'rl-tray--plain', p.className);
    return h(p.as || 'div', rest, p.children);
  }

  /* ---------- PieceCard ---------- */
  function PieceCard(p) {
    var ground = p.ground || 'paper';
    var glint = p.glint || { x: 62, y: 38 };
    var rest = omit(p, ['image', 'alt', 'name', 'note', 'kind', 'index', 'ground', 'multiply', 'glint', 'hallmark', 'weight', 'price', 'className', 'href', 'as']);
    rest.className = cx('rl-piece', 'rl-piece--' + ground, p.multiply && 'rl-piece--multiply', p.className);
    if (p.href) rest.href = p.href;
    var tag = p.as || (p.href ? 'a' : 'article');
    var wellClass = cx('rl-piece__well', ground === 'tray' && 'rl-tray');
    return h(tag, rest,
      h('div', { className: wellClass },
        p.index ? h('span', { className: 'rl-piece__no' }, p.index) : null,
        p.hallmark ? h('span', { className: 'rl-piece__hm' }, h(Hallmark, { on: ground === 'tray' ? 'tray' : null, value: p.hallmark === true ? '916' : p.hallmark })) : null,
        h('img', { className: 'rl-piece__img', src: p.image, alt: p.alt || '', loading: 'lazy', decoding: 'async' }),
        h(Glint, { x: glint.x, y: glint.y, loop: false })),
      h('div', { className: 'rl-piece__cap' },
        p.kind ? h('span', { className: 'rl-piece__kind' }, p.kind) : null,
        h('h3', { className: 'rl-piece__name piece-name' }, p.name),
        p.note ? h('p', { className: 'rl-piece__note' }, p.note) : null,
        (p.weight || p.price) ? h('div', { className: 'rl-piece__meta' }, h(PriceTag, { weight: p.weight, price: p.price })) : null));
  }

  /* ---------- FilterTabs ---------- */
  function FilterTabs(p) {
    var items = p.items || [];
    var st = React.useState(p.defaultValue || (items[0] && items[0].key));
    var value = p.value !== undefined ? p.value : st[0];
    function pick(k) {
      if (p.value === undefined) st[1](k);
      if (p.onChange) p.onChange(k);
    }
    return h('div', { className: cx('rl-tabs', p.className) },
      h('div', { className: 'rl-tabs__list', role: 'tablist', 'aria-label': p.label || 'Filter pieces' },
        items.map(function (it) {
          return h('button', { key: it.key, type: 'button', role: 'tab', className: 'rl-tabs__tab', 'aria-selected': it.key === value ? 'true' : 'false', onClick: function () { pick(it.key); } },
            it.label, it.count != null ? h('span', { className: 'rl-tabs__n' }, it.count) : null);
        })),
      p.position ? h('span', { className: 'rl-tabs__count', 'aria-live': 'polite' }, h('b', null, p.position[0]), ' / ', p.position[1]) : null);
  }

  /* ---------- RateChip ---------- */
  function RateChip(p) {
    var currency = p.currency || 'LKR';
    var v = typeof p.value === 'number' ? currency + ' ' + money(p.value) : p.value;
    return h(p.href ? 'a' : 'span', { className: cx('rl-chip', p.className), href: p.href, style: p.href ? { textDecoration: 'none' } : undefined },
      h('i', { className: 'rl-chip__dot', 'aria-hidden': 'true' }),
      h('span', null, p.label || '22K pawn'),
      h('b', { className: 'rl-chip__v' }, v));
  }

  /* ---------- RateBoard ---------- */
  function RateBoard(p) {
    var currency = p.currency || 'LKR';
    var pawn = p.pawnGrams || 8;
    var rates = [
      { k: '22 karat · per gram', v: p.gram22 },
      { k: '22 karat · per pawn · ' + pawn + ' g', v: p.gram22 * pawn, lead: true },
      { k: '24 karat · per gram', v: p.gram24 }
    ].filter(function (r) { return typeof r.v === 'number' && !isNaN(r.v); });
    var fx = p.fx || [];
    return h(Tray, { className: cx('rl-board', p.className) },
      h('div', { className: 'rl-board__top' },
        h('span', { className: 'rl-board__posted' }, p.posted || 'Posted this morning'),
        p.sample ? h('span', { className: 'rl-board__sample' }, 'Sample figures') : null),
      h('div', { className: 'rl-board__rates' },
        rates.map(function (r, i) {
          return h('div', { key: i, className: cx('rl-board__rate', r.lead && 'rl-board__rate--lead') },
            h('p', { className: 'rl-board__k' }, r.k),
            h('p', { className: 'rl-board__v' }, h('span', { className: 'figure-xl' }, money(r.v)), h('span', { className: 'rl-board__cur' }, currency)));
        })),
      fx.length ? h('div', { className: 'rl-board__fx' },
        h('p', { className: 'rl-board__fxnote' }, p.fxNote || 'Money exchange at the counter, no commission. ' + currency + ' for one unit.'),
        h('ul', { className: 'rl-board__fxrows' }, fx.map(function (f) {
          return h('li', { key: f.code }, h('b', null, f.code), h('span', null, typeof f.rate === 'number' ? f.rate.toFixed(2) : f.rate));
        }))) : null);
  }

  /* ---------- StepList ---------- */
  function StepList(p) {
    var steps = p.steps || [];
    var layout = p.layout || 'rows';
    var start = p.start || 1;
    return h('ol', { className: cx('rl-steps', 'rl-steps--' + layout, p.className), style: layout === 'thread' ? { '--n': steps.length } : undefined, start: start },
      steps.map(function (s, i) {
        var n = String(start + i).padStart(2, '0');
        return h('li', { key: i, className: 'rl-step' },
          h('span', { className: 'rl-step__no', 'aria-hidden': 'true' }, n),
          h('div', null, h('h3', { className: 'rl-step__title' }, s.title), s.text ? h('p', { className: 'rl-step__text' }, s.text) : null));
      }));
  }

  /* ---------- HouseRule ---------- */
  function HouseRule(p) {
    return h('article', { className: cx('rl-rule', p.className) },
      h('div', { className: 'rl-rule__mark', 'aria-hidden': p.figure ? undefined : 'true' },
        p.figure ? h('span', { className: 'figure' }, p.figure) : h(Icon, { name: p.icon || 'scale', size: 40, strokeWidth: 1.1 })),
      h('h3', { className: 'rl-rule__title title-sm' }, p.title),
      p.children ? h('p', { className: 'rl-rule__text' }, p.children) : null);
  }

  /* ---------- OpenStatus & Hours ---------- */
  var DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  function colomboNow() {
    var parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Colombo', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
    function get(t) { var f = parts.find(function (x) { return x.type === t; }); return f ? f.value : ''; }
    var day = DAYS.indexOf(get('weekday'));
    var mins = 60 * Number(get('hour')) + Number(get('minute'));
    var open = day >= 0 && day < 6 && mins >= 600 && mins < 1170;
    var note = open ? 'Until 7.30 pm today, unless it is a Poya day'
      : (day === 6 || (day === 5 && mins >= 1170)) ? 'Opens Monday at 10 am'
        : mins < 600 ? 'Opens today at 10 am' : 'Opens tomorrow at 10 am';
    return { open: open, day: day, note: note };
  }
  function useNow(p) {
    var st = React.useState(null);
    React.useEffect(function () {
      if (p.open !== undefined) return undefined;
      function tick() { st[1](colomboNow()); }
      tick();
      var t = setInterval(tick, 60000);
      return function () { clearInterval(t); };
    }, [p.open]);
    if (p.open !== undefined) return { open: p.open, day: p.today == null ? -1 : p.today, note: p.note };
    return st[0];
  }
  function OpenStatus(p) {
    var now = useNow(p);
    var open = now ? now.open : true;
    return h('div', { className: cx('rl-open', now && !open && 'rl-open--shut', p.className), 'aria-live': 'polite' },
      h('i', { className: 'rl-open__dot', 'aria-hidden': 'true' }),
      h('div', null,
        h('span', { className: 'rl-open__state' }, now ? (open ? 'Open now' : 'Closed now') : 'Monday to Saturday'),
        h('span', { className: 'rl-open__note' }, now ? now.note : '10 am to 7.30 pm')));
  }
  function Hours(p) {
    var now = useNow(p);
    var rows = p.rows || [
      { k: 'Hours', v: ['Monday to Saturday', '10 am to 7.30 pm'] },
      { k: 'Closed', v: ['Sundays and Poya days'] }
    ];
    return h('div', { className: cx('rl-hours', p.className) },
      h('dl', { className: 'rl-hours__rows' }, rows.map(function (r, i) {
        return [h('dt', { key: 'k' + i }, r.k), h('dd', { key: 'v' + i }, r.v.map(function (line, j) { return h('div', { key: j }, line); }))];
      })),
      h(OpenStatus, { open: now ? now.open : undefined, note: now ? now.note : undefined, today: now ? now.day : undefined }),
      h('div', { className: 'rl-week', 'aria-hidden': 'true' }, DAYS.map(function (d, i) {
        return h('span', { key: d, className: cx(now && now.day === i && 'is-today', i === 6 && 'is-off') }, d);
      })));
  }

  /* ---------- Header ---------- */
  function Header(p) {
    var links = p.links || [];
    return h('header', { className: cx('rl-header', p.ground === 'paper' && 'rl-header--paper', p.className) },
      h('nav', { className: 'rl-header__nav', 'aria-label': 'Main' }, links.map(function (l) {
        return h('a', { key: l.href, href: l.href, 'aria-current': l.current ? 'page' : undefined }, l.label);
      })),
      h('a', { href: p.homeHref || '#top', 'aria-label': 'Ranlanka, home' }, h('img', { className: 'rl-header__logo', src: p.logo, alt: 'Ranlanka', height: 22 })),
      h('div', { className: 'rl-header__end' },
        p.rate ? h(RateChip, p.rate) : null,
        p.cta || null));
  }

  var api = {
    Button: Button, Icon: Icon, Eyebrow: Eyebrow, SectionHead: SectionHead, Hallmark: Hallmark, PriceTag: PriceTag, RanWord: RanWord,
    Glint: Glint, LampHero: LampHero, Tray: Tray, PieceCard: PieceCard, FilterTabs: FilterTabs, RateChip: RateChip, RateBoard: RateBoard,
    StepList: StepList, HouseRule: HouseRule, OpenStatus: OpenStatus, Hours: Hours, Header: Header
  };
  window.Ranlanka = Object.assign(window.Ranlanka || {}, api);
})();
