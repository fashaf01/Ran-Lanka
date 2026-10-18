'use client';

import Link from 'next/link';
import { productOf, type Product } from '@/lib/catalogue';
import { useStore } from '@/lib/store';
import { ProductCard } from '@/components/ProductCard';
import { HeartIcon } from '@/components/Icons';

export default function Wishlist() {
  const { wish } = useStore();
  const items = wish.map(productOf).filter((p): p is Product => Boolean(p));
  return (
    <section className="wrap wish">
      <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">Wishlist</span></nav>
      <h1 className="h1">Wishlist</h1>
      {items.length ? (
        <>
          <p className="lede">Saved on this device. Show this list at the counter and we will bring out every piece.</p>
          <div className="pgrid">{items.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </>
      ) : (
        <div className="empty">
          <HeartIcon size={34} />
          <p className="lede">Nothing saved yet. Tap the heart on any piece to keep it here.</p>
          <Link className="btn btn--dark" href="/shop">Shop the jewellery</Link>
        </div>
      )}
    </section>
  );
}
