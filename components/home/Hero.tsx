'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { LongArrow } from '../Icons';

// One scene: it fades up from black, the lamps come on, the gold catches the light and
// the title opens from a thin line. The stage keeps the photo's proportions, so the
// glints and the gold mask stay on the jewellery at every screen size.
const GLINTS: [number, number, number][] = [
  [45, 12.7, 2.1], [48.7, 42.1, 2.45], [49.8, 61.6, 2.8], [57, 77.4, 3.15], [53.3, 30.2, 3.5], [48.1, 78.6, 3.85]
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const drift = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
    el.style.setProperty('--my', (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
  };

  return (
    <section className="hero" ref={ref} onMouseMove={drift} aria-label="The Bridal Edit">
      <div className="h-stage">
        <div className="h-cam"><div className="h-push"><div className="h-scene">
          <Image className="h-bg" src="/images/hero-saree.webp" alt="A bride in a green silk saree with a red and gold border, wearing a gold choker, a long gold necklace, bangles and rings, seated among lit brass oil lamps" fill priority sizes="(max-aspect-ratio: 1/1) 260vw, 125vw" />
          <div className="h-gold" aria-hidden="true"><span className="h-bloom"><i /></span><span className="h-pass"><i /></span></div>
          <div className="h-light" aria-hidden="true">
            <span className="h-beam" />
            <span className="h-key" />
            {GLINTS.map(([x, y, d]) => <span key={d} className="h-glint" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${d}s` }} />)}
          </div>
        </div></div></div>
      </div>
      <div className="h-shade" aria-hidden="true" />
      <div className="h-ui">
        <div className="wrap">
          <div className="h-copy">
            <p className="h-kick">The Bridal Edit · Twenty-two karat</p>
            <h1 className="h-title">The gold<br />of Lanka.</h1>
            <p className="h-sub">Bridal sets and fine jewellery, weighed in front of you in Negombo since 2008.</p>
            <div className="h-cta">
              <Link className="btn btn--light" href="/shop/bridal">Shop bridal</Link>
              <Link className="tlink tlink--light" href="/shop">All jewellery <LongArrow size={16} /></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
