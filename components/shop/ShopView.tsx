'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  CATEGORIES, EDITS, METALS, PRODUCTS, STONES, STYLES, byShowcase, priceOf, productsIn,
  type Collection, type Metal, type Product, type Stone, type Style
} from '@/lib/catalogue';
import { ProductCard } from '../ProductCard';
import { CloseIcon, FilterIcon, LongArrow } from '../Icons';

type Filters = { stone: string[]; style: string[]; metal: string[]; price: string[] };
const EMPTY: Filters = { stone: [], style: [], metal: [], price: [] };
const PRICES: [string, string, number, number][] = [
  ['u200', 'Under LKR 200,000', 0, 200000],
  ['200-500', 'LKR 200,000 to 500,000', 200000, 500000],
  ['500-1m', 'LKR 500,000 to 1,000,000', 500000, 1000000],
  ['1m', 'Over LKR 1,000,000', 1000000, Infinity]
];
const SORTS = { featured: 'Featured', new: 'Newest', low: 'Price, low to high', high: 'Price, high to low' } as const;
type Sort = keyof typeof SORTS;

const GROUPS: { key: keyof Filters; name: string; options: [string, string][] }[] = [
  { key: 'stone', name: 'Stone', options: Object.entries(STONES) },
  { key: 'style', name: 'Occasion', options: Object.entries(STYLES) },
  { key: 'metal', name: 'Gold colour', options: Object.entries(METALS).map(([k, v]) => [k, v.name]) },
  { key: 'price', name: 'Price', options: PRICES.map(([k, n]) => [k, n]) }
];

const matches = (p: Product, f: Filters) => {
  const total = priceOf(p).total;
  return (
    (!f.stone.length || f.stone.some((s) => (s === 'plain' ? p.stones.length === 0 : p.stones.includes(s as Stone)))) &&
    (!f.style.length || f.style.some((s) => p.style.includes(s as Style))) &&
    (!f.metal.length || f.metal.some((m) => p.metals.includes(m as Metal))) &&
    (!f.price.length || f.price.some((k) => { const r = PRICES.find((x) => x[0] === k)!; return total >= r[2] && total < r[3]; }))
  );
};

export function ShopView({ collection }: { collection?: Collection }) {
  const [f, setF] = useState<Filters>(EMPTY);
  const [sort, setSort] = useState<Sort>('featured');
  const [panel, setPanel] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = panel ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [panel]);

  const base = useMemo(() => productsIn(collection?.key), [collection?.key]);
  const list = useMemo(() => {
    const out = base.filter((p) => matches(p, f));
    if (sort === 'featured') out.sort(byShowcase);
    if (sort === 'new') out.sort((a, b) => b.added.localeCompare(a.added));
    if (sort === 'low') out.sort((a, b) => priceOf(a).total - priceOf(b).total);
    if (sort === 'high') out.sort((a, b) => priceOf(b).total - priceOf(a).total);
    return out;
  }, [base, f, sort]);

  const toggle = (g: keyof Filters, v: string) => setF((s) => ({ ...s, [g]: s[g].includes(v) ? s[g].filter((x) => x !== v) : [...s[g], v] }));
  const active = GROUPS.flatMap((g) => f[g.key].map((v) => ({ g: g.key, v, label: g.options.find((o) => o[0] === v)?.[1] ?? v })));
  const count = (g: keyof Filters, v: string) => base.filter((p) => matches(p, { ...f, [g]: [v] })).length;

  return (
    <>
      <section className="shop-head">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span>
            {collection ? <><Link href="/shop">Jewellery</Link><span>/</span><span aria-current="page">{collection.name}</span></> : <span aria-current="page">Jewellery</span>}
          </nav>
          <h1 className="h1">{collection ? collection.name : 'All jewellery'}</h1>
          <p className="lede">{collection ? collection.lede : 'Twenty-two karat gold, weighed in front of you. Every price follows the day’s gold rate.'}</p>
          <nav className="cat-pills" aria-label="Categories">
            <Link href="/shop" className={!collection ? 'on' : undefined}>All</Link>
            {[...EDITS, ...CATEGORIES].map((c) => <Link key={c.key} href={`/shop/${c.key}`} className={collection?.key === c.key ? 'on' : undefined}>{c.name}</Link>)}
          </nav>
        </div>
      </section>

      <div className="toolbar">
        <div className="wrap toolbar-in">
          <button type="button" className="tool-btn" onClick={() => setPanel(true)} aria-expanded={panel}>
            <FilterIcon size={18} />Filter{active.length > 0 && <span className="dot dot--inline">{active.length}</span>}
          </button>
          <span className="tool-count">{list.length} {list.length === 1 ? 'piece' : 'pieces'}</span>
          <label className="tool-sort">
            <span className="sr-only">Sort by</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </label>
        </div>
        {active.length > 0 && (
          <div className="wrap active-chips">
            {active.map((a) => (
              <button key={a.g + a.v} type="button" className="chip chip--x" onClick={() => toggle(a.g, a.v)} aria-label={`Remove filter ${a.label}`}>{a.label}<CloseIcon size={12} /></button>
            ))}
            <button type="button" className="tlink tlink--muted" onClick={() => setF(EMPTY)}>Clear all</button>
          </div>
        )}
      </div>

      <section className="wrap grid-sec">
        {list.length === 0 ? (
          <div className="empty">
            <p className="h3">Nothing matches those filters.</p>
            <button type="button" className="btn btn--line" onClick={() => setF(EMPTY)}>Clear the filters</button>
          </div>
        ) : (
          <div className="pgrid">
            {list.map((p, i) => (
              <WithTile key={p.id} i={i} show={list.length > 6}>
                <ProductCard product={p} priority={i < 4} />
              </WithTile>
            ))}
          </div>
        )}
      </section>

      {panel && (
        <div className="drawer-wrap" onClick={() => setPanel(false)}>
          <aside className="drawer drawer--right filters" role="dialog" aria-modal="true" aria-label="Filter the jewellery" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-head">
              <span className="drawer-title">Filter</span>
              <button type="button" className="ibtn" aria-label="Close filters" onClick={() => setPanel(false)}><CloseIcon /></button>
            </div>
            <div className="fgroups">
              {GROUPS.map((g) => (
                <fieldset key={g.key} className="fgroup">
                  <legend className="label">{g.name}</legend>
                  {g.options.map(([v, label]) => {
                    const n = count(g.key, v);
                    return (
                      <label key={v} className={`fopt${n === 0 && !f[g.key].includes(v) ? ' off' : ''}`}>
                        <input type="checkbox" checked={f[g.key].includes(v)} onChange={() => toggle(g.key, v)} />
                        <span className="fbox" aria-hidden="true" />
                        <span className="fname">{label}</span>
                        <span className="fn">{n}</span>
                      </label>
                    );
                  })}
                </fieldset>
              ))}
            </div>
            <div className="bag-foot filters-foot">
              <button type="button" className="btn btn--line" onClick={() => setF(EMPTY)}>Clear</button>
              <button type="button" className="btn btn--dark" onClick={() => setPanel(false)}>Show {list.length} {list.length === 1 ? 'piece' : 'pieces'}</button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

// After the sixth piece, a tile for the pieces we make to order.
function WithTile({ i, show, children }: { i: number; show: boolean; children: React.ReactNode }) {
  return (
    <>
      {children}
      {show && i === 5 && (
        <Link href="/about#bespoke" className="ptile">
          <span className="kicker">Made to order</span>
          <span className="ptile-t">Can’t find it? We’ll make it.</span>
          <span className="ptile-d">Bring a sketch or a photograph. We draw it with you and weigh it before we begin.</span>
          <span className="tlink tlink--light">Start a design <LongArrow size={14} /></span>
        </Link>
      )}
    </>
  );
}
