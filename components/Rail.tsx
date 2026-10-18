'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from './Icons';

// A row that scrolls sideways, with quiet arrows in the section head.
export function Rail({ title, kicker, action, children }: { title: string; kicker?: string; action?: React.ReactNode; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const sync = () => setEdge({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 4 });
    sync();
    el.addEventListener('scroll', sync, { passive: true });
    addEventListener('resize', sync);
    return () => { el.removeEventListener('scroll', sync); removeEventListener('resize', sync); };
  }, []);

  const go = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.getBoundingClientRect().width + 16 : 300;
    el.scrollBy({ left: dir * step * 2, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  return (
    <section className="sec rail-sec">
      <div className="wrap">
        <div className="sec-head">
          <div>
            {kicker && <p className="kicker">{kicker}</p>}
            <h2 className="h2">{title}</h2>
          </div>
          <div className="sec-act">
            {action}
            <div className="arrows">
              <button type="button" aria-label="Scroll back" disabled={edge.start} onClick={() => go(-1)}><ArrowLeft size={18} /></button>
              <button type="button" aria-label="Scroll forward" disabled={edge.end} onClick={() => go(1)}><ArrowRight size={18} /></button>
            </div>
          </div>
        </div>
      </div>
      <div className="rail" ref={ref}>{children}</div>
    </section>
  );
}
