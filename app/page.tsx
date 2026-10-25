import { Hero } from '@/components/Hero';
import { Showcase } from '@/components/Showcase';
import { Bespoke, Bridal, Intro, Marquee, Promises, Rates, Visit } from '@/components/Sections';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Intro />
      <Showcase />
      <Bridal />
      <Promises />
      <Bespoke />
      <Rates />
      <Visit />
    </>
  );
}
