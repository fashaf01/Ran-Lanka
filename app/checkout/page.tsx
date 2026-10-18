import type { Metadata } from 'next';
import { Checkout } from '@/components/checkout/Checkout';

export const metadata: Metadata = { title: 'Checkout', robots: { index: false } };

export default function CheckoutPage() {
  return (
    <div className="wrap">
      <Checkout />
    </div>
  );
}
