'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { lkr, priceOf, productOf } from '@/lib/catalogue';
import { LongArrow, PlusIcon } from '../Icons';
import { ProductImage } from '../ProductImage';

// Points on the photograph (percent of its width and height) and the nearest piece we sell.
const SPOTS = [
  { x: 60.7, y: 30.2, id: 'rl-e14', what: 'Earrings' },
  { x: 51.3, y: 60, id: 'rl-n14', what: 'Necklace' },
  { x: 25.3, y: 71.6, id: 'rl-r12', what: 'Ring' },
  { x: 46.9, y: 80, id: 'rl-b16', what: 'Bangles' }
];

export function ShopTheLook() {
  const [active, setActive] = useState(1);
  const p = productOf(SPOTS[active].id)!;

  return (
    <section className="sec look">
      <div className="wrap look-grid">
        <div className="look-photo rv">
          <Image src="/images/look-bride.webp" alt="The bride, in a gold choker, a long necklace, earrings, rings and bangles" fill sizes="(max-width: 900px) 100vw, 50vw" />
          {SPOTS.map((s, i) => (
            <button key={s.id} type="button" className={`spot${i === active ? ' on' : ''}`} style={{ left: `${s.x}%`, top: `${s.y}%` }} aria-pressed={i === active} aria-label={`${s.what}: show ${productOf(s.id)!.name}`} onClick={() => setActive(i)}>
              <PlusIcon size={14} />
            </button>
          ))}
        </div>
        <div className="look-copy rv" style={{ '--d': '.1s' } as React.CSSProperties}>
          <p className="kicker">Shop the look</p>
          <h2 className="h1 look-title">The bride, in&nbsp;gold.</h2>
          <p className="lede">Choker, long necklace, jhumkas and a stack of bangles. Tap the photograph to find the pieces closest to hers, or bring it to the counter and we will build the set with you.</p>
          <Link href={`/product/${p.id}`} className="look-card" key={p.id}>
            <span className="look-card-img"><ProductImage product={p} sizes="160px" /></span>
            <span className="look-card-info">
              <span className="label">{SPOTS[active].what}</span>
              <span className="look-card-name">{p.name}</span>
              <span className="look-card-price">{lkr(priceOf(p).total)}</span>
              <span className="tlink">View the piece <LongArrow size={14} /></span>
            </span>
          </Link>
          <div className="look-dots" aria-hidden="true">{SPOTS.map((s, i) => <i key={s.id} className={i === active ? 'on' : undefined} />)}</div>
          <Link className="btn btn--dark" href="/shop/bridal">Shop the bridal edit</Link>
        </div>
      </div>
    </section>
  );
}
