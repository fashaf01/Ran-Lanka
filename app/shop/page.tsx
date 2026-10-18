import type { Metadata } from 'next';
import { ShopView } from '@/components/shop/ShopView';

export const metadata: Metadata = { title: 'All jewellery' };

export default function ShopAll() {
  return <ShopView />;
}
