// Sri Lanka time: the live opening status, the appointment planner and copy buttons.
import { $, $$, RATE, lkr } from './core.js';

function colombo() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Colombo', weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = t => (parts.find(p => p.type === t) || {}).value;
  return {
    day: { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[get('weekday')],
    mins: (Number(get('hour')) % 24) * 60 + Number(get('minute')),
    y: +get('year'), m: +get('month'), d: +get('day'),
  };
}

export function copyText(text, btn, fallbackEl) {
  const label = btn.textContent;
  const flash = t => { btn.textContent = t; setTimeout(() => { btn.textContent = label; }, 1600); };
  const select = () => {
    const r = document.createRange();
    r.selectNodeContents(fallbackEl);
    const s = getSelection();
    s.removeAllRanges(); s.addRange(r);
    flash('Selected');
  };
  try { navigator.clipboard.writeText(text).then(() => flash('Copied'), select); } catch (e) { select(); }
}

export function initVisit() {
  $$('[data-rate]').forEach(el => { el.textContent = lkr(RATE[el.dataset.rate]); });

  /* ---------- Opening status (Monday to Saturday, 10 am to 7:30 pm) ---------- */
  function updateStatus() {
    let s;
    try { s = colombo(); } catch (e) { return; }
    const work = s.day >= 1 && s.day <= 6, open = work && s.mins >= 600 && s.mins < 1170;
    $('#status-text').textContent = open ? 'Open now, until 7:30 pm'
      : work && s.mins < 600 ? 'Opens today at 10 am'
      : s.day === 6 || s.day === 0 ? 'Closed now, opens Monday at 10 am' : 'Closed now, opens tomorrow at 10 am';
    $('#status').classList.toggle('closed', !open);
    // The rate bar in the header carries a shorter version.
    const rb = $('#rb-status');
    if (rb) {
      rb.textContent = open ? 'Open now until 7:30 pm' : work && s.mins < 600 ? 'Opens today at 10 am' : 'Closed now · opens 10 am';
      rb.parentElement.classList.toggle('closed', !open);
    }
  }
  updateStatus();
  setInterval(updateStatus, 60000);

  /* ---------- Planner: the next six opening days ---------- */
  let now = null;
  try { now = colombo(); } catch (e) { /* no Intl time zones: the day row stays empty */ }
  const plan = { what: 'the bridal set', day: '', time: 'in the morning' };
  const dayBox = $('#plan-day');
  if (now) {
    const short = new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', weekday: 'short', day: 'numeric', month: 'short' });
    const long = new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', weekday: 'long', day: 'numeric', month: 'long' });
    let t = Date.UTC(now.y, now.m - 1, now.d) + (now.mins >= 1110 ? 86400000 : 0);
    const days = [];
    while (days.length < 6) { const dt = new Date(t); if (dt.getUTCDay() !== 0) days.push(dt); t += 86400000; }
    days.forEach((dt, k) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = short.format(dt).replace(',', '');
      b.dataset.v = 'on ' + long.format(dt);
      b.setAttribute('aria-pressed', String(k === 0));
      dayBox.appendChild(b);
    });
    plan.day = 'on ' + long.format(days[0]);
  }
  const msg = $('#plan-msg');
  const write = () => { msg.textContent = `Hello Ranlanka, I would like to come in to see ${plan.what}${plan.day ? ' ' + plan.day : ''}, ${plan.time}.`; };
  [['#plan-what', 'what'], ['#plan-day', 'day'], ['#plan-time', 'time']].forEach(([sel, key]) => {
    $(sel).addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b) return;
      $$('button', $(sel)).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      plan[key] = b.dataset.v;
      write();
    });
  });
  write();

  $$('[data-copy]').forEach(b => b.addEventListener('click', () => copyText(b.dataset.copy, b, b.previousElementSibling)));
  $('#plan-copy').addEventListener('click', e => copyText(msg.textContent, e.currentTarget, msg));
}
