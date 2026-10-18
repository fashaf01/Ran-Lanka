import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUCTS, categoryOf, productOf, related } from '@/lib/catalogue';
import { ProductView } from '@/components/product/ProductView';
import { ProductCard } from '@/components/ProductCard';
import { Rail } from '@/components/Rail';

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = productOf((await params).id);
  if (!p) return {};
  return { title: p.name, description: p.about, openGraph: { images: p.images.length ? p.images : ['/images/hero-saree.webp'] } };
}

export default async function ProductPage({ params }: Props) {
  const product = productOf((await params).id);
  if (!product) notFound();
  const cat = categoryOf(product.cat)!;
  return (
    <>
      <div className="wrap">
        <nav className="crumbs crumbs--pv" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>/</span>
          <Link href="/shop">Jewellery</Link><span>/</span>
          <Link href={`/shop/${cat.key}`}>{cat.name}</Link><span>/</span>
          <span aria-current="page">{product.name}</span>
        </nav>
        <ProductView product={product} />
      </div>
      <Rail kicker="Complete the look" title="You may also like">
        {related(product).map((p) => <ProductCard key={p.id} product={p} />)}
      </Rail>
    </>
  );
}
