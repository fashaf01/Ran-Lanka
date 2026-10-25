'use client';

import { useEffect } from 'react';

// The page's small motions, wired once:
// .rv and .words settle into place the first time they are seen,
// [data-count] figures count up to their value, [data-magnetic] buttons lean towards
// the pointer, and [data-spot] cards keep a light under it.
export function Effects() {
  useEffect(() => {
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const off: (() => void)[] = [];

    const count = (el: HTMLElement) => {
      const to = Number(el.dataset.count), from = Number(el.dataset.from ?? 0);
      const fmt = (n: number) => (to >= 10000 ? Math.round(n).toLocaleString('en-US') : String(Math.round(n)));
      if (still) { el.textContent = fmt(to); return; }
      const t0 = performance.now(), dur = 1800;
      const step = (t: number) => {
        const k = Math.min(1, (t - t0) / dur);
        el.textContent = fmt(from + (to - from) * (1 - Math.pow(1 - k, 4)));
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const seen = [...document.querySelectorAll<HTMLElement>('.rv, .words, .seen, [data-count]')];
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        el.classList.add('in');
        if (el.dataset.count) count(el);
        io.unobserve(el);
      }), { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
      seen.forEach((el) => io.observe(el));
      off.push(() => io.disconnect());
    } else {
      seen.forEach((el) => el.classList.add('in'));
    }

    if (fine && !still) {
      document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left - r.width / 2) * 0.22;
          const y = (e.clientY - r.top - r.height / 2) * 0.3;
          el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
        };
        const leave = () => { el.style.transform = ''; };
        el.addEventListener('pointermove', move);
        el.addEventListener('pointerleave', leave);
        off.push(() => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); });
      });
      const spot = (e: PointerEvent) => {
        document.querySelectorAll<HTMLElement>('[data-spot]').forEach((el) => {
          const r = el.getBoundingClientRect();
          el.style.setProperty('--x', `${(e.clientX - r.left).toFixed(0)}px`);
          el.style.setProperty('--y', `${(e.clientY - r.top).toFixed(0)}px`);
        });
      };
      window.addEventListener('pointermove', spot, { passive: true });
      off.push(() => window.removeEventListener('pointermove', spot));
    }
    return () => off.forEach((f) => f());
  }, []);
  return null;
}

// A line of display type whose words rise out of a blur one after another.
export function Words({ text, className, as: Tag = 'h2', delay }: { text: string; className?: string; as?: 'h1' | 'h2' | 'p'; delay?: number }) {
  const words = text.split(' ');
  return (
    <Tag className={`words ${className ?? ''}`} style={delay ? ({ '--d': `${delay}s` } as React.CSSProperties) : undefined} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="w" style={{ '--i': i } as React.CSSProperties}>{w}</span>{i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
