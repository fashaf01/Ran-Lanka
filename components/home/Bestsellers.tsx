'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { PRODUCTS, byShowcase, categoryOf, type CategoryKey } from '@/lib/catalogue';
import { ProductCard } from '../ProductCard';

const TABS: { key: CategoryKey; promo: string; tone: string }[] = [
  { key: 'necklaces', promo: '/images/vine-necklace.webp', tone: 'deep' },
  { key: 'earrings', promo: '/images/dome-earrings.webp', tone: 'wine' },
  { key: 'bangles', promo: '/images/lotus-bangle.webp', tone: 'deep' },
  { key: 'pendants', promo: '/images/burst-pendant.webp', tone: 'wine' }
];

export function Bestsellers() {
  const [tab, setTab] = useState(TABS[0]);
  const cat = categoryOf(tab.key)!;
  const items = PRODUCTS.filter((p) => p.cat === tab.key && p.images.length)
    .sort((a, b) => Number(Boolean(b.bestseller)) - Number(Boolean(a.bestseller)) || byShowcase(a, b))
    .slice(0, 3);

  return (
    <section className="sec best">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="kicker">Most wanted</p>
            <h2 className="h2">Bestsellers</h2>
          </div>
          <div className="tabs" role="tablist" aria-label="Bestsellers by category">
            {TABS.map((t) => (
              <button key={t.key} type="button" role="tab" aria-selected={t.key === tab.key} className={t.key === tab.key ? 'on' : undefined} onClick={() => setTab(t)}>
                {categoryOf(t.key)!.name}
              </button>
            ))}
          </div>
        </div>
        <div className="best-grid" role="tabpanel" key={tab.key}>
          <Link href={`/shop/${tab.key}`} className={`promo promo--${tab.tone}`}>
            <span className="promo-img"><Image src={tab.promo} alt="" fill sizes="(max-width: 900px) 100vw, 25vw" style={{ objectFit: 'contain' }} /></span>
            <span className="promo-copy">
              <span className="promo-name">{cat.name}</span>
              <span className="promo-lede">{cat.lede}</span>
              <span className="btn btn--ghost">View all</span>
            </span>
          </Link>
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}
