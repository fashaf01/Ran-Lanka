'use client';

import { useState } from 'react';
import { LongArrow } from './Icons';

// Design only for now: nothing is sent until a mailing service is connected.
export function Newsletter() {
  const [done, setDone] = useState(false);
  if (done) return <p className="news-done">Thank you. You’re on the list.</p>;
  return (
    <form className="news" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
      <label className="sr-only" htmlFor="news-email">Email address</label>
      <input id="news-email" type="email" required placeholder="Your email address" autoComplete="email" />
      <button type="submit" aria-label="Sign up"><LongArrow /></button>
    </form>
  );
}
