import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BookViewing } from '@/components/about/BookViewing';
import { LongArrow, PhoneIcon, PinIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Our story',
  description: 'Ranlanka has sold twenty-two karat gold in Negombo since 2008. Our story, how we work, and how to visit the Main Street showroom.'
};

export default function About() {
  return (
    <>
      <section className="ab-hero">
        <Image src="/images/hero-saree.webp" alt="" fill priority sizes="100vw" style={{ objectFit: 'cover', objectPosition: '50% 32%' }} />
        <div className="ab-hero-shade" aria-hidden="true" />
        <div className="wrap ab-hero-in">
          <p className="kicker">Our story</p>
          <h1 className="h1">Gold, weighed honestly, since 2008.</h1>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <p className="ab-statement rv">Ranlanka began as a small gold shop in Negombo town. Today it is a showroom on Main Street, and the promise is the one we started with: <em>honest gold, fair rates</em> and designs that last longer than fashion.</p>
        </div>
      </section>

      <section className="sec ab-story">
        <div className="wrap ab-story-grid">
          <figure className="ab-img rv">
            <Image src="/images/about-detail.webp" alt="A maang tikka, earring and gold choker, close up" fill sizes="(max-width: 900px) 100vw, 40vw" style={{ objectFit: 'cover' }} />
          </figure>
          <div className="ab-copy rv" style={{ '--d': '.1s' } as React.CSSProperties}>
            <p className="kicker">Ran means gold</p>
            <p className="ab-si" lang="si">රන්</p>
            <h2 className="h2">The gold of Lanka, sold in Negombo.</h2>
            <p className="lede"><em>Ran</em> is the Sinhala word for gold. In 2008 Mr. Anas opened a small shop in Negombo town to sell it the way he wanted to buy it himself: pure, weighed in the open and priced at the day’s rate.</p>
            <p className="lede">Three years later the shop moved to a larger showroom at 192 Main Street, with room for the full collection, pieces made to order and a counter for money exchange.</p>
          </div>
        </div>
      </section>

      <section className="sec ab-time">
        <div className="wrap">
          <p className="kicker">Along the way</p>
          <ol className="timeline">
            <li className="rv"><span className="yr">2008</span><h3>The first shop</h3><p>A small gold shop in Negombo town, opened by Mr. Anas.</p></li>
            <li className="rv" style={{ '--d': '.08s' } as React.CSSProperties}><span className="yr">2011</span><h3>Main Street</h3><p>A larger showroom with room for the full collection.</p></li>
            <li className="rv" style={{ '--d': '.16s' } as React.CSSProperties}><span className="yr">Today</span><h3>Gold, design and exchange</h3><p>Twenty-two karat jewellery, pieces made to order and money exchange under one roof.</p></li>
          </ol>
        </div>
      </section>

      <section className="sec ab-values">
        <div className="wrap">
          <div className="sec-head"><div><p className="kicker">How we work</p><h2 className="h2">Three things we never change</h2></div></div>
          <div className="values">
            <div className="rv"><span className="v-n">916</span><h3>Pure twenty-two karat</h3><p>Every piece is 916 gold: 916 parts pure gold in every thousand, strong enough to wear every day.</p></div>
            <div className="rv" style={{ '--d': '.08s' } as React.CSSProperties}><span className="v-n">1 pawn</span><h3>Weighed in front of you</h3><p>Gold is weighed and priced by the pawn, eight grams, at the day’s rate. You see the scale and the sum.</p></div>
            <div className="rv" style={{ '--d': '.16s' } as React.CSSProperties}><span className="v-n">By hand</span><h3>Made to your design</h3><p>Bring a sketch or an heirloom. We draw it with you and make it in Negombo.</p></div>
          </div>
        </div>
      </section>

      <section className="sec ab-bespoke" id="bespoke">
        <div className="wrap ab-bespoke-grid">
          <div className="ab-copy rv">
            <p className="kicker">Design your own</p>
            <h2 className="h1">From a drawing to the counter.</h2>
            <ol className="steps steps--four">
              <li><b>01</b><span><strong>Bring your idea.</strong> A sketch, a photograph, or a piece you want to remake.</span></li>
              <li><b>02</b><span><strong>See it drawn.</strong> We draw it with you and tell you its weight in pawn before anything is made.</span></li>
              <li><b>03</b><span><strong>Agree the price.</strong> Based on that day’s gold rate, so you know the cost up front.</span></li>
              <li><b>04</b><span><strong>Collect your piece.</strong> Finished by hand and weighed with you at the showroom.</span></li>
            </ol>
            <a className="btn btn--dark" href="mailto:ranlankanegombo@gmail.com?subject=A%20piece%20made%20to%20my%20design">Start a design</a>
          </div>
          <figure className="ab-img ab-img--wide rv" style={{ '--d': '.1s' } as React.CSSProperties}>
            <Image src="/images/about-hands.webp" alt="Hands with gold rings and a stack of gold bangles" fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
          </figure>
        </div>
      </section>

      <section className="sec ab-visit" id="visit">
        <div className="wrap ab-visit-grid">
          <div className="rv">
            <p className="kicker">Visit us</p>
            <h2 className="h1">192 Main Street, Negombo.</h2>
            <p className="lede">Bring your family. We bring out the trays, weigh every piece in front of you and take as long as you need.</p>
            <dl className="ab-dl">
              <div><dt>Hours</dt><dd>Monday to Saturday<br />10 am to 7.30 pm</dd></div>
              <div><dt>Closed</dt><dd>Sundays and Poya days</dd></div>
              <div><dt>Call</dt><dd><a href="tel:+94312222202">031 222 2202</a><br /><a href="tel:+94312238383">031 223 8383</a></dd></div>
              <div><dt>Write</dt><dd><a href="mailto:ranlankanegombo@gmail.com">ranlankanegombo@gmail.com</a></dd></div>
            </dl>
            <div className="ab-links">
              <a className="tlink" href="https://maps.google.com/?q=Ranlanka+Jewellers+192+Main+Street+Negombo" target="_blank" rel="noopener"><PinIcon size={16} />Get directions</a>
              <a className="tlink" href="tel:+94312222202"><PhoneIcon size={16} />Call the showroom</a>
            </div>
          </div>
          <BookViewing />
        </div>
      </section>

      <section className="sec--tight ab-end">
        <div className="wrap ab-end-in">
          <h2 className="h2">See the collection before you visit.</h2>
          <Link className="btn btn--dark" href="/shop">Shop the jewellery <LongArrow size={16} /></Link>
        </div>
      </section>
    </>
  );
}
