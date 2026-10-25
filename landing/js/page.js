/* Ranlanka home page: the Homepage showcase from the design system, built from its components. */
(function () {
  var R = window.Ranlanka, h = React.createElement, F = React.Fragment;

  /* The day's 22 karat rate, rupees per gram. Every price on the page is worked out from it.
     Sample figures until the shop's real ones are wired in. */
  var GRAM_22 = 39000, GRAM_24 = 42500, PAWN_GRAMS = 8;

  var PHONE_A = { label: '031 222 2202', href: 'tel:0312222202' };
  var PHONE_B = { label: '031 223 8383', href: 'tel:0312238383' };
  var EMAIL = 'ranlankanegombo@gmail.com';
  var MAPS = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Ranlanka, 192 Main Street, Negombo');

  var IMG = {
    logoDark: 'img/ranlanka-logo-on-dark.png',
    hero: 'img/hero-saree.webp', mask: 'img/hero-gold-mask.png',
    bride: 'img/look-bride.webp', hands: 'img/about-hands.webp',
    show1: 'img/showroom-1.jpg', show2: 'img/showroom-2.jpg', sketch: 'img/pendants-14.webp'
  };

  var GOLD = [
    { cat: 'necklaces', ground: 'tray', hallmark: true, kind: 'Necklace', name: 'Leaf Spray Necklace', note: 'Curved leaves tipped with stones', image: 'img/necklaces-14.webp', glint: { x: 66, y: 46 } },
    { cat: 'pendants', kind: 'Pendant', name: 'Sun Spiral Pendant', note: 'Rays turning around a spiral of stones', image: 'img/pendants-13.webp', glint: { x: 50, y: 50 } },
    { cat: 'earrings', kind: 'Earrings', name: 'Blossom Studs', note: 'Five polished petals and a stone', image: 'img/earrings-12.webp', glint: { x: 30, y: 48 } },
    { cat: 'necklaces', kind: 'Necklace', name: 'Orchid Spray Necklace', note: 'An orchid on zigzag links', image: 'img/necklaces-16.webp', glint: { x: 52, y: 58 } }
  ];
  var STONES = [
    { kind: 'Ring', name: 'Oval emerald halo ring', note: 'An oval emerald ringed with small stones', image: 'img/ca-11-vittoria-lorne-ring.webp', glint: { x: 52, y: 44 } },
    { kind: 'Ring', name: 'Emerald and diamond band', note: 'Rows of emeralds set side by side', image: 'img/ca-12-nuala-seren-ring.webp', glint: { x: 46, y: 46 } },
    { kind: 'Earrings', name: 'Emerald hoops', note: 'Emeralds channel-set around the hoop', image: 'img/ca-09-selindra-lush-earrings.webp', glint: { x: 40, y: 40 } },
    { kind: 'Ring', name: 'Square emerald ring', note: 'A square emerald between two small stones', image: 'img/ca-13-darcy-brooks-ring.webp', glint: { x: 50, y: 44 } }
  ];

  var LINKS = [
    { label: 'Collection', href: '#collection' },
    { label: 'Bridal', href: '#bridal' },
    { label: 'Bespoke', href: '#bespoke' },
    { label: 'Visit', href: '#visit' }
  ];

  function pad(n) { return String(n).padStart(2, '0'); }

  /* The rate is posted on shop days: on a Sunday the latest board is Saturday's. */
  function postedDay() {
    var day = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Colombo', weekday: 'long' }).format(new Date());
    return day === 'Sunday' ? 'Saturday' : day;
  }

  function Hero() {
    return h(R.LampHero, {
      height: 'clamp(640px, 100svh, 900px)', focus: 0.52, image: IMG.hero, mask: IMG.mask, label: 'Ranlanka',
      alt: 'A bride in a green silk saree with a red and gold border, wearing a gold choker, a long gold necklace, bangles and rings, seated among lit brass oil lamps',
      glints: [{ x: 45, y: 12.7 }, { x: 48.7, y: 42.1 }, { x: 49.8, y: 61.6 }, { x: 57, y: 77.4 }, { x: 53.3, y: 30.2 }, { x: 48.1, y: 78.6 }],
      header: h(R.Header, {
        logo: IMG.logoDark, links: LINKS, homeHref: '#top',
        rate: { label: '22K pawn', value: GRAM_22 * PAWN_GRAMS, href: '#rate' },
        cta: h(R.Button, { variant: 'line', size: 'sm', href: '#visit' }, 'Book a viewing')
      }),
      eyebrow: 'Twenty-two karat · Negombo',
      title: h(F, null, 'The gold', h('br'), 'of ', h('em', null, 'Lanka.')),
      lede: 'Bridal sets and fine jewellery in 916 gold, weighed in front of you on Main Street since 2008.',
      actions: h(F, null,
        h(R.Button, { variant: 'gold', icon: true, href: '#collection' }, 'See the collection'),
        h(R.Button, { variant: 'line', href: '#visit' }, 'Visit the showroom')),
      foot: '192 Main Street · Since 2008'
    });
  }

  function Intro() {
    return h('section', { className: 'sec', id: 'about' }, h('div', { className: 'wrap intro' },
      h('div', { className: 'intro__mark' },
        h('img', { src: IMG.hands, alt: 'Hands with gold rings and a stack of gold bangles', loading: 'lazy', decoding: 'async' }),
        h(R.RanWord)),
      h('div', null,
        h(R.SectionHead, { eyebrow: 'Ran means gold', title: h(F, null, 'The gold of Lanka, sold the ', h('em', null, 'honest'), ' way.') }),
        h('p', { className: 'body' }, 'Ran is the Sinhala word for gold. In 2008 Mr. Anas opened a small shop in Negombo to sell it the way he wanted to buy it: pure, weighed in the open and priced at the day’s rate. Today the showroom is on Main Street, and the promise has not changed.'),
        h('div', { className: 'facts' },
          h('div', { className: 'fact' }, h('span', { className: 'figure' }, '2008'), h('span', { className: 'small' }, 'Opened in Negombo town')),
          h('div', { className: 'fact' }, h('span', { className: 'figure' }, '916'), h('span', { className: 'small' }, 'Parts pure gold in every thousand')),
          h('div', { className: 'fact' }, h('span', { className: 'figure' }, '8 g'), h('span', { className: 'small' }, 'One pawn, weighed in front of you'))))));
  }

  function Collection() {
    var st = React.useState('all'), filter = st[0], setFilter = st[1];
    var showGold = GOLD.filter(function (p) { return filter === 'all' || filter === p.cat; });
    var showStones = filter === 'all' || filter === 'stones';
    var total = GOLD.length + STONES.length;
    var shown = showGold.length + (showStones ? STONES.length : 0);
    function count(key) { return GOLD.filter(function (p) { return p.cat === key; }).length; }
    var n = 0;
    function card(p, multiply) {
      n += 1;
      return h(R.PieceCard, {
        key: p.name, index: pad(n), image: p.image, name: p.name, note: p.note, kind: p.kind, ground: p.ground, hallmark: p.hallmark, glint: p.glint,
        multiply: multiply, alt: p.name + (multiply ? '' : ' in 22 karat gold')
      });
    }
    return h('section', { className: 'sec rule-top', id: 'collection' }, h('div', { className: 'wrap' },
      h('div', { className: 'coll-head' },
        h(R.SectionHead, { eyebrow: 'The collection', title: 'Pieces from the case.' }),
        h(R.Button, { variant: 'quiet', icon: true, href: '#visit' }, 'Ask at the counter')),
      h('div', { className: 'coll-tabs' }, h(R.FilterTabs, {
        value: filter, onChange: setFilter, label: 'Filter the collection', position: [pad(shown), pad(total)],
        items: [
          { key: 'all', label: 'All', count: total },
          { key: 'necklaces', label: 'Necklaces', count: count('necklaces') },
          { key: 'pendants', label: 'Pendants', count: count('pendants') },
          { key: 'earrings', label: 'Earrings', count: count('earrings') },
          { key: 'stones', label: 'Set with stones', count: STONES.length }
        ]
      })),
      showGold.length ? h('div', { className: 'grid4' }, showGold.map(function (p) { return card(p); })) : null,
      showStones ? h(F, null,
        filter === 'all' ? h('div', { className: 'subhead' },
          h('h3', { className: 'title-sm' }, 'Set with stones'),
          h('p', null, 'Emeralds and diamonds, for the second ring and the anniversary.')) : null,
        h('div', { className: 'grid4', style: filter === 'all' ? { marginTop: 'var(--space-6)' } : null },
          STONES.map(function (p) { return card(p, true); }))) : null));
  }

  function Bridal() {
    return h('section', { className: 'sec night', id: 'bridal', 'data-theme': 'night' }, h('div', { className: 'wrap bridal' },
      h('div', { className: 'bridal__photo' },
        h('img', { src: IMG.bride, alt: 'A bride in a red and green silk saree wearing a gold choker, long necklace, jhumkas and stacked bangles', loading: 'lazy', decoding: 'async' }),
        h(R.Hallmark, { on: 'paper', size: 'lg' })),
      h('div', null,
        h(R.SectionHead, {
          eyebrow: 'The bridal edit', title: h(F, null, 'Dressed in gold, from the tikka to the ', h('em', null, 'bangles.')),
          lede: 'Bring the family and take your time. We set out the trays, try every piece with your saree and weigh the whole set in front of you, so you know the price before you choose.'
        }),
        h(R.StepList, { steps: [
          { title: 'Choker and long necklace', text: 'The pair for the ceremony' },
          { title: 'Jhumkas and studs', text: 'Temple bells or quiet light' },
          { title: 'Bangles, by the dozen', text: 'Sized at the counter' },
          { title: 'Wedding bands', text: 'His and hers, plain or set' }
        ] }),
        h(R.Button, { variant: 'gold', icon: true, href: PHONE_A.href }, 'Book a bridal viewing'))));
  }

  function HouseRules() {
    return h('section', { className: 'sec', id: 'rules' }, h('div', { className: 'wrap' },
      h(R.SectionHead, { align: 'center', eyebrow: 'How we work', title: 'Four things we have never changed.', lede: 'The same counter, the same scale and the same rules since the first day.' }),
      h('div', { className: 'rules' },
        h(R.HouseRule, { figure: '916', title: 'Pure twenty-two karat' }, 'Every piece is 916 gold: strong enough for every day, pure enough to keep.'),
        h(R.HouseRule, { icon: 'scale', title: 'Weighed in front of you' }, 'Priced by the pawn at the day’s rate. You see the scale, the weight and the sum.'),
        h(R.HouseRule, { icon: 'sketch', title: 'Made to your design' }, 'Bring a sketch or an heirloom. We draw it with you and make it here in Negombo.'),
        h(R.HouseRule, { figure: '50+', title: 'Money exchange' }, 'More than fifty currencies at the same counter, with no commission.'))));
  }

  function Bespoke() {
    return h('section', { className: 'sec sunken', id: 'bespoke' },
      h('div', { className: 'wrap bespoke' },
        h('div', null,
          h(R.SectionHead, { eyebrow: 'Design your own', title: 'From a drawing to the counter.', lede: 'Bring a sketch, a photograph or a family piece to remake. We draw it with you, tell you its weight before anything is made, and finish it by hand.' }),
          h(R.Button, { variant: 'line', icon: 'sketch', href: 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('A piece to design') }, 'Start a design')),
        h(R.Tray, { className: 'bespoke__tray' },
          h('img', { src: IMG.sketch, alt: 'The finished Radiant Star Pendant in twenty-two karat gold', loading: 'lazy', decoding: 'async' }),
          h(R.Glint, { x: 50, y: 47, size: '10cqw', delay: 1.2 }),
          h('div', { className: 'bespoke__cap' }, h('span', null, 'Starburst · sketch 2'), h(R.PriceTag, { on: 'tray', weight: '38 mm · 6.4 g' })))),
      h('div', { className: 'wrap bespoke-steps' }, h(R.StepList, { layout: 'thread', steps: [
        { title: 'Bring your idea', text: 'A sketch, a photo, or a piece to remake.' },
        { title: 'See it drawn', text: 'With its weight in pawn before anything is cast.' },
        { title: 'Agree the price', text: 'At that day’s gold rate, so the cost is clear.' },
        { title: 'Collect your piece', text: 'Finished by hand and weighed with you.' }
      ] })));
  }

  function Rates() {
    return h('section', { className: 'sec rates', id: 'rate' }, h('div', { className: 'wrap' },
      h(R.SectionHead, { align: 'center', eyebrow: 'At the counter today', title: 'The gold rate.', lede: 'The rate is posted every morning and every piece is priced from it.' }),
      h(R.RateBoard, {
        gram22: GRAM_22, gram24: GRAM_24, pawnGrams: PAWN_GRAMS, sample: true, posted: 'Posted 9.30 am · ' + postedDay(),
        fx: [{ code: 'USD', rate: 297.40 }, { code: 'EUR', rate: 344.80 }, { code: 'GBP', rate: 397.20 }, { code: 'AUD', rate: 194.30 }]
      })));
  }

  function Visit() {
    return h('section', { className: 'sec rule-top', id: 'visit' }, h('div', { className: 'wrap visit' },
      h('div', null,
        h(R.SectionHead, { eyebrow: 'Visit us', title: '192 Main Street, Negombo.', lede: 'Come in to see a piece, have one sized, sell old gold or change money. We bring out the trays and take as long as you need.' }),
        h('div', { className: 'contact' },
          h('div', null, h(R.Icon, { name: 'phone' }),
            h('a', { href: PHONE_A.href }, PHONE_A.label), h('span', { 'aria-hidden': 'true', style: { color: 'var(--ink-muted)' } }, '·'), h('a', { href: PHONE_B.href }, PHONE_B.label)),
          h('div', null, h(R.Icon, { name: 'mail' }), h('a', { href: 'mailto:' + EMAIL }, EMAIL)),
          h('div', null, h(R.Icon, { name: 'pin' }), h('span', null, '192 Main Street, Negombo'))),
        h('div', { className: 'visit__actions' },
          h(R.Button, { variant: 'gold', icon: 'pin', href: MAPS, target: '_blank', rel: 'noopener' }, 'Get directions'),
          h(R.Button, { variant: 'line', icon: 'phone', href: PHONE_A.href }, 'Call the showroom'))),
      h('div', null,
        h(R.Hours, null),
        h('div', { className: 'photos' },
          h('img', { src: IMG.show1, alt: 'The counter at the Ranlanka showroom, with customers being served', loading: 'lazy', decoding: 'async' }),
          h('img', { src: IMG.show2, alt: 'The showroom floor, with seating along the glass counters', loading: 'lazy', decoding: 'async' })))));
  }

  function Footer() {
    return h('footer', { className: 'night foot', 'data-theme': 'night' }, h('div', { className: 'wrap' },
      h('div', { className: 'foot__top' },
        h('div', null, h('img', { src: IMG.logoDark, alt: 'Ranlanka', height: 26 }), h('p', null, '916 gold, weighed in front of you, since 2008.')),
        h('div', { className: 'foot__cols' },
          h('div', null, h('b', null, 'Showroom'), h('span', null, '192 Main Street'), h('span', null, 'Negombo')),
          h('div', null, h('b', null, 'Hours'), h('span', null, 'Mon to Sat, 10 am to 7.30 pm'), h('span', null, 'Closed Sundays and Poya days')),
          h('div', null, h('b', null, 'Call'), h('a', { href: PHONE_A.href }, PHONE_A.label), h('a', { href: PHONE_B.href }, PHONE_B.label)))),
      h('div', { className: 'foot__base' }, h('span', null, '© 2026 Ranlanka, Negombo'), h('span', null, 'Gold rates on this page are sample figures'))));
  }

  function Page() {
    return h(F, null, h(Hero), h('main', { id: 'main' }, h(Intro), h(Collection), h(Bridal), h(HouseRules), h(Bespoke), h(Rates), h(Visit)), h(Footer));
  }

  ReactDOM.createRoot(document.getElementById('root')).render(h(Page));
})();
