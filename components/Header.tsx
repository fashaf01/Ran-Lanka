'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CATEGORIES, PRODUCTS, RATE_22K, lkr, priceOf, categoryOf } from '@/lib/catalogue';
import { useStore } from '@/lib/store';
import { BagIcon, CloseIcon, HeartIcon, MenuIcon, SearchIcon } from './Icons';
import { ProductImage } from './ProductImage';
import { Logo } from './Logo';

const NAV = [
  { href: '/shop', label: 'Jewellery' },
  { href: '/shop/bridal', label: 'Bridal' },
  { href: '/shop/necklaces', label: 'Necklaces' },
  { href: '/shop/earrings', label: 'Earrings' },
  { href: '/shop/rings', label: 'Rings' },
  { href: '/about', label: 'Our story' }
];

export function Header() {
  const { count, wish, setBagOpen } = useStore();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [strip, setStrip] = useState(true);
  const path = usePathname();

  useEffect(() => { setMenu(false); setSearch(false); }, [path]);
  useEffect(() => {
    document.documentElement.style.overflow = menu || search ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMenu(false); setSearch(false); } };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [menu, search]);

  return (
    <>
      {strip && (
        <div className="strip">
          <p>Today’s 22K rate <b>{lkr(RATE_22K)}</b> per gram <span className="strip-sep">·</span> <span className="strip-more">Free resizing and insured delivery across Sri Lanka</span></p>
          <button type="button" aria-label="Hide this message" onClick={() => setStrip(false)}><CloseIcon size={14} /></button>
        </div>
      )}
      <header className="hdr">
        <div className="wrap hdr-in">
          <button type="button" className="ibtn hdr-menu" aria-label="Open menu" aria-expanded={menu} onClick={() => setMenu(true)}><MenuIcon /></button>
          <Link href="/" className="hdr-logo" aria-label="Ranlanka, home"><Logo priority /></Link>
          <nav className="hdr-nav" aria-label="Main">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className={path === n.href ? 'on' : undefined}>{n.label}</Link>
            ))}
          </nav>
          <div className="hdr-act">
            <button type="button" className="ibtn" aria-label="Search" onClick={() => setSearch(true)}><SearchIcon /></button>
            <Link href="/wishlist" className="ibtn hdr-wish" aria-label={`Wishlist, ${wish.length} saved`}><HeartIcon />{wish.length > 0 && <span className="dot">{wish.length}</span>}</Link>
            <button type="button" className="ibtn" aria-label={`Bag, ${count} items`} onClick={() => setBagOpen(true)}><BagIcon />{count > 0 && <span className="dot">{count}</span>}</button>
          </div>
        </div>
      </header>

      {menu && (
        <div className="drawer-wrap" onClick={() => setMenu(false)}>
          <nav className="drawer drawer--left" aria-label="Menu" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-head">
              <Logo />
              <button type="button" className="ibtn" aria-label="Close menu" onClick={() => setMenu(false)}><CloseIcon /></button>
            </div>
            <div className="mnav">
              <Link href="/shop">All jewellery</Link>
              <Link href="/shop/bridal">Bridal</Link>
              {CATEGORIES.map((c) => <Link key={c.key} href={`/shop/${c.key}`}>{c.name}</Link>)}
            </div>
            <div className="mnav mnav--small">
              <Link href="/exchange">Money exchange</Link>
              <Link href="/about">Our story</Link>
              <Link href="/about#visit">Visit the showroom</Link>
              <Link href="/wishlist">Wishlist</Link>
            </div>
          </nav>
        </div>
      )}

      {search && <Search onClose={() => setSearch(false)} />}
    </>
  );
}

function Search({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState('');
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => { input.current?.focus(); }, []);
  const hits = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    return PRODUCTS.filter((p) => `${p.name} ${categoryOf(p.cat)?.name} ${p.stones.join(' ')} ${p.style.join(' ')}`.toLowerCase().includes(t)).slice(0, 8);
  }, [q]);

  return (
    <div className="search" role="dialog" aria-modal="true" aria-label="Search">
      <div className="wrap">
        <div className="search-bar">
          <SearchIcon />
          <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search rings, studs, bangles…" aria-label="Search the jewellery" />
          <button type="button" className="ibtn" aria-label="Close search" onClick={onClose}><CloseIcon /></button>
        </div>
        {q.trim() === '' ? (
          <div className="search-hints">
            <span className="label">Popular</span>
            {['Bridal', 'Studs', 'Bangle', 'Pendant', 'Ring'].map((h) => <button key={h} type="button" className="chip" onClick={() => setQ(h)}>{h}</button>)}
          </div>
        ) : hits.length ? (
          <ul className="search-hits">
            {hits.map((p) => (
              <li key={p.id}>
                <Link href={`/product/${p.id}`} onClick={onClose}>
                  <span className="sh-img"><ProductImage product={p} sizes="64px" fit="cover" /></span>
                  <span className="sh-name">{p.name}<small>{categoryOf(p.cat)?.name}</small></span>
                  <span className="sh-price">{lkr(priceOf(p).total)}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="search-none">Nothing matches “{q}”. Try a stone, or a kind of piece.</p>
        )}
      </div>
      <button type="button" className="search-scrim" aria-label="Close search" onClick={onClose} />
    </div>
  );
}
