'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  METALS, PAWN, RATE_22K, SIZES, STONES, categoryOf, lkr, priceOf, type CategoryKey, type Metal, type Product
} from '@/lib/catalogue';
import { useStore } from '@/lib/store';
import { CheckIcon, HeartIcon, MinusIcon, PlusIcon, RingIcon, ScaleIcon, TruckIcon } from '../Icons';
import { ProductImage } from '../ProductImage';

// Where on the bride's photograph each kind of piece is worn: [x%, y%] focus for the close crop.
const WORN: Partial<Record<CategoryKey, [number, number]>> = {
  necklaces: [52, 52], earrings: [62, 30], bangles: [46, 80], rings: [26, 72], pendants: [52, 56], bracelets: [46, 80]
};

type View = 'piece' | 'detail' | 'worn';

export function ProductView({ product }: { product: Product }) {
  const { add, wish, toggleWish } = useStore();
  const [metal, setMetal] = useState<Metal>(product.metals[0]);
  const sizes = SIZES[product.cat];
  const [size, setSize] = useState<string | undefined>(undefined);
  const [qty, setQty] = useState(1);
  const [view, setView] = useState<View>('piece');
  const [needSize, setNeedSize] = useState(false);
  const price = priceOf(product);
  const saved = wish.includes(product.id);
  const hasPhoto = product.images.length > 0;
  const worn = WORN[product.cat];
  const closeUp = hasPhoto && product.cat !== 'bracelets';
  const views: View[] = ['piece', ...(closeUp ? (['detail'] as View[]) : []), ...(worn ? (['worn'] as View[]) : [])];

  const onAdd = () => {
    if (sizes && !size) { setNeedSize(true); return; }
    add(product.id, metal, size, qty);
  };

  const stage = (v: View, thumb = false) => {
    if (v === 'worn' && worn) {
      return <Image src="/images/look-bride.webp" alt={thumb ? '' : `How a piece like the ${product.name} is worn`} fill sizes={thumb ? '96px' : '(max-width: 900px) 100vw, 55vw'} style={{ objectFit: 'cover', objectPosition: `${worn[0]}% ${worn[1]}%`, transform: 'scale(1.9)', transformOrigin: `${worn[0]}% ${worn[1]}%` }} />;
    }
    return <span className={`pv-img${v === 'detail' ? ' pv-img--detail' : ''}`}><ProductImage product={product} sizes={thumb ? '96px' : '(max-width: 900px) 100vw, 55vw'} priority={!thumb && v === 'piece'} /></span>;
  };

  return (
    <div className="pv">
      <div className="pv-gallery">
        <div className={`pv-stage pv-stage--${view}`}>
          {stage(view)}
          {product.badge && <span className="tag">{product.badge}</span>}
          {view === 'worn' && <span className="pv-cap">Worn by the bride in our photograph. A similar piece, shown for scale.</span>}
        </div>
        {views.length > 1 && (
          <div className="pv-thumbs" role="tablist" aria-label="Views">
            {views.map((v) => (
              <button key={v} type="button" role="tab" aria-selected={v === view} className={`pv-thumb pv-stage--${v}${v === view ? ' on' : ''}`} onClick={() => setView(v)} aria-label={{ piece: 'The piece', detail: 'Close up', worn: 'As worn' }[v]}>
                {stage(v, true)}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="pv-info">
        <p className="kicker"><Link href={`/shop/${product.cat}`}>{categoryOf(product.cat)?.name}</Link></p>
        <h1 className="pv-name">{product.name}</h1>
        <p className="pv-price">{lkr(price.total)}</p>
        <p className="note">Estimated at today’s 22K rate of {lkr(RATE_22K)} per gram. We confirm the final price when we weigh your piece.</p>

        <p className="pv-about">{product.about}</p>

        <fieldset className="pv-opt">
          <legend className="label">Gold colour <span>{METALS[metal].name}</span></legend>
          <div className="pv-metals">
            {product.metals.map((m) => (
              <label key={m} className={`pv-metal${m === metal ? ' on' : ''}`} title={METALS[m].name}>
                <input type="radio" name="metal" value={m} checked={m === metal} onChange={() => setMetal(m)} className="sr-only" />
                <i style={{ background: METALS[m].swatch }} />
                <span className="sr-only">{METALS[m].name}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {sizes && (
          <fieldset className="pv-opt">
            <legend className="label">{sizes.name} {needSize && !size && <em className="pv-warn">Please choose a size</em>}</legend>
            <div className="pv-sizes">
              {sizes.values.map((s) => (
                <button key={s} type="button" className={`chip${s === size ? ' on' : ''}`} aria-pressed={s === size} onClick={() => { setSize(s); setNeedSize(false); }}>{s}</button>
              ))}
            </div>
            <p className="note">Not sure? We size you at the showroom, and resizing is free.</p>
          </fieldset>
        )}

        <div className="pv-buy">
          <div className="qty qty--lg" aria-label="Quantity">
            <button type="button" aria-label="One fewer" onClick={() => setQty((q) => Math.max(1, q - 1))}><MinusIcon size={14} /></button>
            <span aria-live="polite">{qty}</span>
            <button type="button" aria-label="One more" onClick={() => setQty((q) => Math.min(9, q + 1))}><PlusIcon size={14} /></button>
          </div>
          <button type="button" className="btn btn--dark pv-add" onClick={onAdd}>Add to bag<span className="pv-add-price"> · {lkr(price.total * qty)}</span></button>
          <button type="button" className={`ibtn pv-wish${saved ? ' on' : ''}`} aria-pressed={saved} aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'} onClick={() => toggleWish(product.id)}><HeartIcon /></button>
        </div>
        <Link className="btn btn--line btn--full" href="/about#visit">Book a viewing at the showroom</Link>

        <ul className="pv-trust">
          <li><ScaleIcon size={18} />Weighed in front of you</li>
          <li><TruckIcon size={18} />Free insured delivery</li>
          <li><RingIcon size={18} />Free resizing</li>
        </ul>

        <div className="acc">
          <details open>
            <summary>Details</summary>
            <dl className="pv-dl">
              <div><dt>Gold</dt><dd>22 karat (916)</dd></div>
              <div><dt>Weight</dt><dd>{product.weight} g · {(product.weight / PAWN).toFixed(2).replace(/\.?0+$/, '')} pawn</dd></div>
              <div><dt>Stones</dt><dd>{product.stones.length ? product.stones.map((s) => STONES[s]).join(', ') : 'None, plain gold'}</dd></div>
              <div><dt>Colours</dt><dd>{product.metals.map((m) => METALS[m].name).join(', ')}</dd></div>
              <div><dt>Reference</dt><dd>{product.id.toUpperCase()}</dd></div>
            </dl>
          </details>
          <details>
            <summary>How the price is made</summary>
            <dl className="pv-dl">
              <div><dt>Gold, {product.weight} g at {lkr(RATE_22K)}</dt><dd>{lkr(price.gold)}</dd></div>
              <div><dt>Making charge, {product.making}%</dt><dd>{lkr(price.making)}</dd></div>
              {price.stones > 0 && <div><dt>Stones</dt><dd>{lkr(price.stones)}</dd></div>}
              <div className="pv-dl-total"><dt>Estimate</dt><dd>{lkr(price.total)}</dd></div>
            </dl>
          </details>
          <details>
            <summary>Delivery and collection</summary>
            <p>Free, insured delivery anywhere in Sri Lanka in two to four working days, signed for on arrival. Or collect from 192 Main Street, Negombo, where we weigh the piece with you before you take it home.</p>
          </details>
          <details>
            <summary>Care</summary>
            <p>Keep gold away from perfume and chlorine, and store each piece on its own in the pouch it came in. Bring it back once a year and we will clean and check the settings for free.</p>
          </details>
        </div>
        <p className="pv-added"><CheckIcon size={14} />{product.badge === 'Made to order' ? 'Made to order for you, by hand in Negombo' : 'We can hold it for you at the Main Street showroom'}</p>
      </div>
    </div>
  );
}
