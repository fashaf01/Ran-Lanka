(() => {
  const root = document.querySelector('.rl');
  const still = matchMedia('(prefers-reduced-motion: reduce)');

  // very tall windows get the static layout instead of the pinned scroll stages
  const fit = () => root.classList.toggle('rl--tall', innerHeight > 1800);
  fit();
  addEventListener('resize', fit);

  // hero: the scene drifts against the pointer
  const hero = document.querySelector('.hero');
  hero.addEventListener('mousemove', (e) => {
    if (still.matches) return;
    const r = hero.getBoundingClientRect();
    if (!r.width || !r.height) return;
    hero.style.setProperty('--mx', (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
    hero.style.setProperty('--my', (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
  });
  hero.addEventListener('mouseleave', () => {
    hero.style.setProperty('--mx', '0');
    hero.style.setProperty('--my', '0');
  });

  // menu
  const menu = document.getElementById('menu');
  const toggles = document.querySelectorAll('[data-menu-toggle]');
  let opener = null;
  const setMenu = (open) => {
    menu.hidden = !open;
    toggles.forEach((b) => {
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
      b.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    if (open) menu.querySelector('.mnav-close').focus();
    else if (opener) opener.focus({ preventScroll: true });
  };
  toggles.forEach((b) => b.addEventListener('click', () => {
    opener = b;
    setMenu(menu.hidden);
  }));
  menu.querySelectorAll('[data-menu-close]').forEach((el) => el.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) setMenu(false);
  });

  // booking: one topic at a time
  const chips = document.querySelectorAll('.chip');
  chips.forEach((c) => c.addEventListener('click', () => {
    chips.forEach((o) => o.setAttribute('aria-pressed', o === c ? 'true' : 'false'));
  }));

  // booking: no-JS falls back to the form's mailto action; here we write a tidy email instead
  const book = document.getElementById('book');
  const day = book.elements.day;
  const d = new Date();
  day.min = [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-');
  book.addEventListener('submit', (e) => {
    e.preventDefault();
    const topic = book.querySelector('.chip[aria-pressed="true"]');
    const lines = [
      'I would like to book a private viewing.',
      '',
      'To see: ' + (topic ? topic.dataset.topic : 'The collections'),
      'Name: ' + book.elements.name.value.trim(),
      'Phone: ' + book.elements.phone.value.trim(),
      'Preferred day: ' + (day.value || 'Any day')
    ];
    location.href = 'mailto:ranlankanegombo@gmail.com'
      + '?subject=' + encodeURIComponent('Private viewing request')
      + '&body=' + encodeURIComponent(lines.join('\n'));
  });
})();
