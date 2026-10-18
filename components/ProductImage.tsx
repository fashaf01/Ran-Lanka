import Image from 'next/image';
import type { CategoryKey, Product } from '@/lib/catalogue';

// A thin gold drawing of each collection, for a piece still waiting for its photograph.
const DRAWINGS: Record<CategoryKey, React.ReactNode> = {
  rings: <><ellipse cx="60" cy="70" rx="26" ry="27" /><ellipse cx="60" cy="70" rx="21" ry="22" /><path d="m51 41 9-9 9 9-9 7z" /></>,
  bangles: <><ellipse cx="60" cy="60" rx="34" ry="12" /><ellipse cx="60" cy="70" rx="34" ry="12" /><ellipse cx="60" cy="80" rx="34" ry="12" /></>,
  necklaces: <><path d="M28 28c2 30 16 46 32 46s30-16 32-46" /><circle cx="60" cy="83" r="6" />{[36, 44, 52, 68, 76, 84].map((x, i) => <circle key={x} cx={x} cy={[56, 66, 72, 72, 66, 56][i]} r="2.4" />)}</>,
  earrings: <><path d="M42 30v10M78 30v10" /><path d="M42 40c-8 12-8 26 0 32 8-6 8-20 0-32zM78 40c-8 12-8 26 0 32 8-6 8-20 0-32z" /></>,
  pendants: <><path d="M30 24c4 16 16 26 30 26s26-10 30-26" /><path d="M60 50c-10 14-10 28 0 36 10-8 10-22 0-36z" /></>,
  bracelets: <>{[0, 1, 2, 3, 4, 5, 6].map((i) => <ellipse key={i} cx={24 + i * 12} cy="64" rx="7" ry="4.5" transform={`rotate(${i % 2 ? 0 : 90} ${24 + i * 12} 64)`} />)}</>
};

// The supplied photographs show one piece on a near-white ground. They are drawn with
// `multiply` so that ground melts into the soft tile, and their edges fade into it.
// `fit="cover"` is for small thumbnails, where the centre of the photo is what matters.
export function ProductImage({ product, sizes, priority, className, fit = 'auto' }: { product: Product; sizes: string; priority?: boolean; className?: string; fit?: 'auto' | 'cover' }) {
  const src = product.images[0];
  if (src) {
    const cover = fit === 'cover';
    return (
      <Image
        className={`photo${cover ? ' photo--cover' : ''}${className ? ` ${className}` : ''}`}
        src={src}
        alt={product.name}
        fill
        sizes={sizes}
        quality={90}
        priority={priority}
        style={{ objectFit: cover ? 'cover' : 'contain' }}
      />
    );
  }
  return (
    <span className={`ph ${className ?? ''}`} role="img" aria-label={`${product.name}, photo coming soon`}>
      <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">{DRAWINGS[product.cat]}</svg>
      <span className="ph-note">Photo coming soon</span>
    </span>
  );
}
