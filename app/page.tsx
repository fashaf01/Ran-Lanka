import Link from 'next/link';
import { newIn } from '@/lib/catalogue';
import { Hero } from '@/components/home/Hero';
import { Categories } from '@/components/home/Categories';
import { Bestsellers } from '@/components/home/Bestsellers';
import { ShopTheLook } from '@/components/home/ShopTheLook';
import { Bespoke, Inspired, Rates, Services } from '@/components/home/Editorial';
import { Rail } from '@/components/Rail';
import { ProductCard } from '@/components/ProductCard';
import { LongArrow } from '@/components/Icons';

export default function Home() {
  return (
    <>
      <Hero />
      <Rail kicker="New in" title="Fine jewellery, in twenty-two karat" action={<Link className="tlink" href="/shop">Shop all <LongArrow size={14} /></Link>}>
        {newIn().map((p) => <ProductCard key={p.id} product={p} />)}
      </Rail>
      <Categories />
      <Bestsellers />
      <ShopTheLook />
      <Bespoke />
      <Rates />
      <Inspired />
      <Services />
    </>
  );
}
