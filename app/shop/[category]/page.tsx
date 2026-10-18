import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CATEGORIES, categoryOf } from '@/lib/catalogue';
import { ShopView } from '@/components/shop/ShopView';

type Props = { params: Promise<{ category: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.key }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = categoryOf((await params).category);
  return c ? { title: c.name, description: c.lede } : {};
}

export default async function ShopCategory({ params }: Props) {
  const category = categoryOf((await params).category);
  if (!category) notFound();
  return <ShopView category={category} />;
}
