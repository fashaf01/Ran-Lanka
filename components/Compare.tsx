'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

// The drawing and the finished pendant, one over the other: drag the line to see one
// become the other. When it first comes into view the line sweeps across by itself.
export function Compare({ src, w, h, alt }: { src: string; w: number; h: number; alt: string }) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const touched = useRef(false);

  useEffect(() => {
    const el = box.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      el.classList.add('in');
      io.disconnect();
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const t0 = performance.now();
      const step = (t: number) => {
        if (touched.current) return;
        const k = Math.min(1, (t - t0) / 3600);
        // in from the drawing, across to the piece, and back to the middle
        const v = k < 0.5 ? 92 - (92 - 14) * ease(k * 2) : 14 + (50 - 14) * ease((k - 0.5) * 2);
        setPos(v);
        if (k < 1) requestAnimationFrame(step);
      };
      setTimeout(() => requestAnimationFrame(step), 900);
    }, { threshold: 0.45 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const rays = Array.from({ length: 9 }, (_, i) => {
    const a = (i / 9) * Math.PI * 2;
    const x = 150 + Math.cos(a) * 26, y = 160 + Math.sin(a) * 26;
    const cx = 150 + Math.cos(a + 0.35) * 70, cy = 160 + Math.sin(a + 0.35) * 70;
    const r = 98 + (i % 3) * 14;
    const ex = 150 + Math.cos(a + 0.15) * r, ey = 160 + Math.sin(a + 0.15) * r;
    return `M${x.toFixed(1)} ${y.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;
  });

  return (
    <div className="compare" ref={box} style={{ '--pos': `${pos}%` } as React.CSSProperties}>
      <div className="cmp-layer cmp-piece">
        <Image src={src} alt={alt} width={w} height={h} sizes="(max-width: 900px) 80vw, 460px" quality={90} />
      </div>
      <div className="cmp-layer cmp-sketch" aria-hidden="true">
        <svg viewBox="0 0 300 330">
          <g fill="none" stroke="#2b2724" strokeOpacity=".62" strokeWidth="1" strokeLinecap="round">
            <circle className="draw" cx="150" cy="160" r="14" />
            <circle className="draw" cx="150" cy="160" r="6" />
            {rays.map((d, i) => <path key={i} className="draw" d={d} style={{ '--i': i } as React.CSSProperties} />)}
            <path d="M40 300h220M40 294v12M260 294v12" strokeOpacity=".35" />
          </g>
          <g style={{ fontFamily: 'var(--sans)' }} fontSize="8.5" fill="#5d5853" letterSpacing="1.4">
            <text x="150" y="320" textAnchor="middle">38 MM · 22 KARAT</text>
            <text x="40" y="26">STARBURST · SKETCH 2</text>
          </g>
        </svg>
      </div>
      <span className="cmp-tag cmp-tag--a">The drawing</span>
      <span className="cmp-tag cmp-tag--b">The piece</span>
      <div className="cmp-handle" aria-hidden="true"><span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6 3 12l6 6M15 6l6 6-6 6" /></svg></span></div>
      <input type="range" min={0} max={100} step={1} value={Math.round(pos)} aria-label="Slide between the drawing and the finished piece" onChange={(e) => { touched.current = true; setPos(Number(e.target.value)); }} onPointerDown={() => { touched.current = true; }} />
    </div>
  );
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
