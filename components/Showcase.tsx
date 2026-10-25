'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CATS, PIECES, type Cat } from '@/lib/pieces';
import { ArrowLeft, ArrowRight } from './Icons';

// The collection as a lit case: the piece in front floats over its own light and the
// rest wait either side, turned away. Drag, swipe, use the arrows or the keyboard;
// it moves on by itself while it is on screen and nobody is touching it.
export function Showcase() {
  const [cat, setCat] = useState<Cat | 'all'>('all');
  const items = useMemo(() => (cat === 'all' ? PIECES : PIECES.filter((p) => p.cat === cat)), [cat]);
  const [at, setAt] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; id: number } | null>(null);
  const moved = useRef(false);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);

  const go = useCallback((d: number) => setAt((i) => (i + d + items.length) % items.length), [items.length]);
  useEffect(() => setAt(0), [cat]);

  useEffect(() => {
    const el = stage.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || paused || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => go(1), 4200);
    return () => clearInterval(t);
  }, [visible, paused, go]);

  const down = (e: React.PointerEvent) => { drag.current = { x: e.clientX, id: e.pointerId }; setPaused(true); };
  const up = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    const dx = e.clientX - d.x;
    moved.current = Math.abs(dx) > 36;
    if (moved.current) go(dx < 0 ? 1 : -1);
  };
  const key = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  };

  const now = items[at] ?? items[0];
  const n = items.length;
  return (
    <section className="sec show" id="collection" aria-labelledby="show-title">
      <div className="wrap">
        <div className="show-head">
          <div>
            <p className="kicker rv">The collection</p>
            <h2 className="title rv" id="show-title" style={{ '--d': '.08s' } as React.CSSProperties}>Pieces from the case</h2>
          </div>
          <div className="tabs rv" role="group" aria-label="Show" style={{ '--d': '.16s' } as React.CSSProperties}>
            <button type="button" aria-pressed={cat === 'all'} onClick={() => setCat('all')}>All</button>
            {CATS.map((c) => <button key={c.key} type="button" aria-pressed={cat === c.key} onClick={() => setCat(c.key)}>{c.name}</button>)}
          </div>
        </div>

        <div
          className="stage rv"
          ref={stage}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Pieces, use the arrow keys to move"
          onPointerDown={down}
          onPointerUp={up}
          onPointerCancel={() => { drag.current = null; }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onKeyDown={key}
        >
          {items.map((p, i) => {
            let o = i - at;
            if (o > n / 2) o -= n;
            if (o < -n / 2) o += n;
            const ao = Math.abs(o);
            return (
              <button
                key={p.id}
                type="button"
                className={`piece${o === 0 ? ' on' : ''}${ao > 3 ? ' far' : ''}`}
                style={{ '--o': o, '--ao': ao, '--r': (p.w / p.h).toFixed(3) } as React.CSSProperties}
                tabIndex={-1}
                aria-hidden={o !== 0}
                onClick={() => { if (!moved.current) setAt(i); }}
              >
                <Image src={p.src} alt={o === 0 ? p.name : ''} width={p.w} height={p.h} sizes="(max-width: 760px) 60vw, 420px" quality={90} />
              </button>
            );
          })}
        </div>

        <div className="show-foot">
          <p className="count" aria-hidden="true"><b>{String(at + 1).padStart(2, '0')}</b> / {String(n).padStart(2, '0')}</p>
          <div className="now" aria-live="polite">
            <div className="swap" key={now.id}>
              <h3>{now.name}</h3>
              <p>{CATS.find((c) => c.key === now.cat)?.one} · {now.note}</p>
            </div>
          </div>
          <div className="arrows">
            <button className="arrow" type="button" aria-label="Previous piece" onClick={() => go(-1)} data-magnetic><ArrowLeft size={20} /></button>
            <button className="arrow" type="button" aria-label="Next piece" onClick={() => go(1)} data-magnetic><ArrowRight size={20} /></button>
          </div>
        </div>
        <div className="progress" aria-hidden="true"><i style={{ '--p': `${((at + 1) / n) * 100}%` } as React.CSSProperties} /></div>
      </div>
    </section>
  );
}
