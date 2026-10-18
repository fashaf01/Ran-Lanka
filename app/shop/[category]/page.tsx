import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CATEGORIES, EDITS, collectionOf } from '@/lib/catalogue';
import { ShopView } from '@/components/shop/ShopView';

type Props = { params: Promise<{ category: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return [...CATEGORIES, ...EDITS].map((c) => ({ category: c.key }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = collectionOf((await params).category);
  return c ? { title: c.name, description: c.lede } : {};
}

export default async function ShopCategory({ params }: Props) {
  const collection = collectionOf((await params).category);
  if (!collection) notFound();
  return <ShopView collection={collection} />;
}
