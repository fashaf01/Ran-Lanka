'use client';

import { useEffect, useState } from 'react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Whether the showroom is open right now, by the clock in Negombo (Monday to Saturday,
// 10 am to 7.30 pm). Poya days are not known here, so the note says so.
export function OpenNow() {
  const [state, setState] = useState<{ open: boolean; day: number; note: string } | null>(null);
  useEffect(() => {
    const tick = () => {
      const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Colombo', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
      const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
      const day = DAYS.indexOf(get('weekday'));
      const mins = Number(get('hour')) * 60 + Number(get('minute'));
      const open = day >= 0 && day < 6 && mins >= 600 && mins < 1170;
      const note = open ? 'Until 7.30 pm today, unless it is a Poya day' : day === 6 || (day === 5 && mins >= 1170) ? 'Opens Monday at 10 am' : mins < 600 ? 'Opens today at 10 am' : 'Opens tomorrow at 10 am';
      setState({ open, day, note });
    };
    tick();
    const t = setInterval(tick, 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <div className={`open-now${state && !state.open ? ' shut' : ''}`} aria-live="polite">
        <i aria-hidden="true" />
        <div>
          <b>{state ? (state.open ? 'Open now' : 'Closed now') : 'Monday to Saturday'}</b>
          <br />
          <span>{state ? state.note : '10 am to 7.30 pm'}</span>
        </div>
      </div>
      <div className="week" aria-hidden="true">
        {DAYS.map((d, i) => <span key={d} className={`${i === state?.day ? 'on' : ''}${i === 6 ? ' off' : ''}`}>{d}</span>)}
      </div>
    </>
  );
}
