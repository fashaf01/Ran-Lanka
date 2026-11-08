import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CollectionView from "@/components/CollectionView";
import { BY_SLUG, CATS, CAT_KEYS } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return CAT_KEYS.map((k) => ({ slug: CATS[k].slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const k = BY_SLUG[slug];
  return k ? { title: CATS[k].name, description: CATS[k].text } : {};
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const k = BY_SLUG[slug];
  if (!k) notFound();
  return <CollectionView cat={k} />;
}
