'use client';

import Link from 'next/link';
import { METALS, SIZES, lkr, priceOf, type Product } from '@/lib/catalogue';
import { useStore } from '@/lib/store';
import { HeartIcon } from './Icons';
import { ProductImage } from './ProductImage';

export function ProductCard({ product, sizes = '(max-width: 700px) 50vw, 25vw', priority }: { product: Product; sizes?: string; priority?: boolean }) {
  const { wish, toggleWish, add } = useStore();
  const saved = wish.includes(product.id);
  const href = `/product/${product.id}`;
  const needsSize = Boolean(SIZES[product.cat]);
  const tag = product.badge ?? (product.bestseller ? 'Bestseller' : undefined);

  return (
    <article className="pc">
      <div className="pc-media">
        <Link className="pc-img" href={href} tabIndex={-1} aria-hidden="true">
          <ProductImage product={product} sizes={sizes} priority={priority} />
        </Link>
        {tag && <span className="tag">{tag}</span>}
        <button type="button" className={`pc-heart${saved ? ' on' : ''}`} aria-pressed={saved} aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`} onClick={() => toggleWish(product.id)}>
          <HeartIcon size={18} />
        </button>
        {needsSize ? (
          <Link className="pc-quick" href={href} aria-label={`Choose a size for the ${product.name}`}>Choose a size</Link>
        ) : (
          <button type="button" className="pc-quick" aria-label={`Add the ${product.name} to your bag`} onClick={() => add(product.id, product.metals[0])}>Add to bag</button>
        )}
      </div>
      <div className="pc-info">
        <h3 className="pc-name"><Link href={href}>{product.name}</Link></h3>
        <span className="pc-price">{lkr(priceOf(product).total)}</span>
        <span className="pc-meta">22K {METALS[product.metals[0]].name.toLowerCase()} · {product.weight} g</span>
        <span className="pc-sw" aria-label={`Comes in ${product.metals.map((m) => METALS[m].name).join(', ')}`}>
          {product.metals.map((m) => <i key={m} style={{ background: METALS[m].swatch }} />)}
        </span>
      </div>
    </article>
  );
}
