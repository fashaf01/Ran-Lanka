import Image from 'next/image';
import Link from 'next/link';

// Four rooms of light: each category's piece on its own colour, the name set large across it.
const TILES = [
  { key: 'necklaces', name: 'Necklaces', img: '/images/leaf-necklace.webp', tone: 'deep' },
  { key: 'earrings', name: 'Earrings', img: '/images/star-earrings.webp', tone: 'sand' },
  { key: 'bangles', name: 'Bangles', img: '/images/openwork-cuff.webp', tone: 'wine' },
  { key: 'rings', name: 'Rings', img: '/images/ruby-ring.webp', tone: 'stone' }
];

export function Categories() {
  return (
    <section className="cats" aria-label="Shop by category">
      {TILES.map((t, i) => (
        <Link key={t.key} href={`/shop/${t.key}`} className={`cat cat--${t.tone} rv`} style={{ '--d': `${i * 0.08}s` } as React.CSSProperties}>
          <span className="cat-img"><Image src={t.img} alt="" fill sizes="(max-width: 700px) 50vw, 25vw" style={{ objectFit: 'contain' }} /></span>
          <span className="cat-name">{t.name}</span>
          <span className="cat-go">Shop now</span>
        </Link>
      ))}
    </section>
  );
}
