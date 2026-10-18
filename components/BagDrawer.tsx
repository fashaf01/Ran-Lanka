'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { METALS, lkr, priceOf, productOf } from '@/lib/catalogue';
import { useStore } from '@/lib/store';
import { BagIcon, CloseIcon, MinusIcon, PlusIcon } from './Icons';
import { ProductImage } from './ProductImage';

export function BagDrawer() {
  const { lines, subtotal, count, setQty, remove, bagOpen, setBagOpen } = useStore();

  useEffect(() => {
    if (!bagOpen) return;
    document.documentElement.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setBagOpen(false); };
    addEventListener('keydown', onKey);
    return () => { document.documentElement.style.overflow = ''; removeEventListener('keydown', onKey); };
  }, [bagOpen, setBagOpen]);

  if (!bagOpen) return null;
  return (
    <div className="drawer-wrap" onClick={() => setBagOpen(false)}>
      <aside className="drawer drawer--right bag" role="dialog" aria-modal="true" aria-label="Your bag" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <span className="drawer-title">Your bag <small>({count})</small></span>
          <button type="button" className="ibtn" aria-label="Close bag" onClick={() => setBagOpen(false)}><CloseIcon /></button>
        </div>
        {lines.length === 0 ? (
          <div className="bag-empty">
            <BagIcon size={34} />
            <p>Your bag is empty.</p>
            <Link className="btn btn--dark" href="/shop" onClick={() => setBagOpen(false)}>Shop the jewellery</Link>
          </div>
        ) : (
          <>
            <ul className="bag-lines">
              {lines.map((l) => {
                const p = productOf(l.id);
                if (!p) return null;
                return (
                  <li key={l.key} className="bl">
                    <Link className="bl-img" href={`/product/${p.id}`} onClick={() => setBagOpen(false)}><ProductImage product={p} sizes="96px" /></Link>
                    <div className="bl-info">
                      <Link className="bl-name" href={`/product/${p.id}`} onClick={() => setBagOpen(false)}>{p.name}</Link>
                      <span className="bl-meta">{METALS[l.metal].name}{l.size ? ` · Size ${l.size}` : ''}</span>
                      <div className="bl-row">
                        <div className="qty" aria-label="Quantity">
                          <button type="button" aria-label="One fewer" onClick={() => setQty(l.key, l.qty - 1)}><MinusIcon size={14} /></button>
                          <span aria-live="polite">{l.qty}</span>
                          <button type="button" aria-label="One more" onClick={() => setQty(l.key, l.qty + 1)}><PlusIcon size={14} /></button>
                        </div>
                        <span className="bl-price">{lkr(priceOf(p).total * l.qty)}</span>
                      </div>
                      <button type="button" className="tlink tlink--muted" onClick={() => remove(l.key)}>Remove</button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="bag-foot">
              <div className="bag-sum"><span>Subtotal</span><b>{lkr(subtotal)}</b></div>
              <p className="note">Estimated at today’s gold rate. Delivery and collection are free.</p>
              <Link className="btn btn--dark btn--full" href="/checkout" onClick={() => setBagOpen(false)}>Checkout</Link>
              <button type="button" className="btn btn--line btn--full" onClick={() => setBagOpen(false)}>Continue shopping</button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
