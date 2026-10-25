'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { RATE_22K, PAWN, lkr } from '@/lib/pieces';

const NAV = [
  { href: '#collection', label: 'Collection' },
  { href: '#bridal', label: 'Bridal' },
  { href: '#bespoke', label: 'Bespoke' },
  { href: '#visit', label: 'Visit' }
];

// Clear over the hero; a smoked-glass bar once the page moves, tucked away while
// scrolling down and back on the way up.
export function Header() {
  const [stuck, setStuck] = useState(false);
  const [away, setAway] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      setStuck(y > 24);
      setAway(y > 640 && y > last + 2);
      if (y < last - 2) setAway(false);
      last = y;
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open]);

  return (
    <>
      <header className={`hdr${stuck ? ' stuck' : ''}${away && !open ? ' away' : ''}${open ? ' open' : ''}`}>
        <div className="wrap hdr-in">
          <nav className="hdr-nav" aria-label="Sections">
            {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
          </nav>
          <button className="hdr-menu" type="button" aria-expanded={open} aria-controls="sheet" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}><span /></button>
          <a className="hdr-logo" href="#top" aria-label="Ranlanka, back to the top">
            <Image className="logo-img" src="/images/logo-light.png" alt="Ranlanka" width={276} height={35} priority unoptimized />
          </a>
          <div className="hdr-end">
            <a className="hdr-rate" href="#rates" title="Sample figure"><i aria-hidden="true" />22K pawn <b>{lkr(RATE_22K * PAWN)}</b></a>
            <a className="btn btn--line" href="#visit" data-magnetic>Book a viewing</a>
          </div>
        </div>
      </header>
      <div className="sheet" id="sheet" inert={!open} onClick={() => setOpen(false)}>
        {NAV.map((n, i) => <a key={n.href} href={n.href} style={{ '--i': i } as React.CSSProperties}>{n.label}</a>)}
        <p>192 Main Street, Negombo · 031 222 2202</p>
      </div>
    </>
  );
}
