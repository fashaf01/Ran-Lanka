'use client';

import { useEffect, useState } from 'react';

const TOPICS = ['The collections', 'Bridal jewellery', 'Design your own', 'Gold rate and exchange'];

// No server: the request opens the visitor's email app with a tidy message to the showroom.
export function BookViewing() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [min, setMin] = useState<string>();
  useEffect(() => {
    const d = new Date();
    setMin([d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-'));
  }, []);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = [
      'I would like to book a private viewing.',
      '',
      `To see: ${topic}`,
      `Name: ${String(f.get('name') ?? '').trim()}`,
      `Phone: ${String(f.get('phone') ?? '').trim()}`,
      `Preferred day: ${String(f.get('day') ?? '') || 'Any day'}`
    ].join('\n');
    location.href = `mailto:ranlankanegombo@gmail.com?subject=${encodeURIComponent('Private viewing request')}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="book rv" onSubmit={submit} style={{ '--d': '.1s' } as React.CSSProperties}>
      <h3 className="h3">Book a private viewing</h3>
      <fieldset>
        <legend className="label">I would like to see</legend>
        <div className="chips">
          {TOPICS.map((t) => <button key={t} type="button" className="chip" aria-pressed={t === topic} onClick={() => setTopic(t)}>{t}</button>)}
        </div>
      </fieldset>
      <div className="field-row">
        <label className="field"><span className="label">Your name</span><input className="inp" name="name" autoComplete="name" required /></label>
        <label className="field"><span className="label">Phone</span><input className="inp" name="phone" type="tel" autoComplete="tel" required /></label>
      </div>
      <label className="field"><span className="label">Preferred day</span><input className="inp" name="day" type="date" min={min} /></label>
      <button type="submit" className="btn btn--dark btn--full">Request my viewing</button>
      <p className="note">We confirm every viewing by phone.</p>
    </form>
  );
}
