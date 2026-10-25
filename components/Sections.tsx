import Image from 'next/image';
import { FX } from '@/lib/rates';
import { BESPOKE, PAWN, RATE_22K, RATE_24K } from '@/lib/pieces';
import { Compare } from './Compare';
import { Words } from './Effects';
import { LongArrow, PencilIcon, PhoneIcon, PinIcon, ScaleIcon } from './Icons';
import { OpenNow } from './OpenNow';

const Star = () => <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" /></svg>;
const d = (s: number) => ({ '--d': `${s}s` }) as React.CSSProperties;

export function Marquee() {
  const line = ['Twenty-two karat', '916 gold', 'Weighed in front of you', 'Bridal sets', 'Made to your design', 'Money exchange', 'Main Street, Negombo', 'Since 2008'];
  const run = <span>{line.map((t) => <span key={t}>{t}<Star /></span>)}</span>;
  return (
    <div className="marquee" aria-hidden="true">
      <div className="mq-track">{run}{run}</div>
    </div>
  );
}

export function Intro() {
  return (
    <section className="sec intro" aria-labelledby="intro-title">
      <div className="wrap intro-grid">
        <div className="intro-si rv" aria-hidden="true">
          <span className="ring-orbit" />
          <span className="gilt" lang="si">රන්</span>
          <small>Ran · gold</small>
        </div>
        <div className="intro-copy">
          <p className="kicker rv">Ran means gold</p>
          <Words className="title" text="The gold of Lanka, sold the honest way." />
          <p className="lede rv" style={d(0.2)}>
            <em lang="si" style={{ fontStyle: 'normal' }}>Ran</em> is the Sinhala word for gold. In 2008 Mr. Anas opened a small shop in Negombo
            to sell it the way he wanted to buy it: pure, weighed in the open and priced at the day’s rate.
            Today the showroom is on Main Street, and the promise has not changed.
          </p>
          <dl className="stats" aria-label="Ranlanka in figures">
            <div className="rv" style={d(0.1)}><dt className="sr-only">Opened</dt><dd><b data-count="2008" data-from="1990">2008</b><span>Opened in Negombo town</span></dd></div>
            <div className="rv" style={d(0.18)}><dt className="sr-only">Purity</dt><dd><b data-count="916">916</b><span>Parts pure gold in every thousand</span></dd></div>
            <div className="rv" style={d(0.26)}><dt className="sr-only">One pawn</dt><dd><b>{PAWN} g</b><span>One pawn, weighed in front of you</span></dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}

const SET = [
  { t: 'Choker and long necklace', n: 'The pair for the ceremony' },
  { t: 'Jhumkas and studs', n: 'Temple bells or quiet light' },
  { t: 'Bangles, by the dozen', n: 'Sized at the counter' },
  { t: 'Wedding bands', n: 'His and hers, plain or set' }
];

export function Bridal() {
  return (
    <section className="sec bridal" id="bridal" aria-labelledby="bridal-title">
      <div className="wrap bridal-grid">
        <figure className="arch seen rv">
          <div className="arch-img">
            <Image src="/images/look-bride.webp" alt="A bride in a red and green silk saree wearing a gold choker, long necklace, jhumkas and stacked bangles" fill sizes="(max-width: 900px) 84vw, 46vw" quality={85} />
          </div>
          <div className="arch-small">
            <Image src="/images/about-hands.webp" alt="Hands with gold rings and a stack of gold bangles" fill sizes="(max-width: 900px) 44vw, 300px" />
          </div>
        </figure>
        <div className="bridal-copy">
          <p className="kicker rv">The bridal edit</p>
          <Words className="title" text="Dressed in gold, from the tikka to the bangles." />
          <p className="lede rv" style={d(0.2)}>
            Bring the family and take your time. We set out the trays, try every piece with your saree
            and weigh the whole set in front of you, so you know the price before you choose.
          </p>
          <ol className="set">
            {SET.map((s, i) => (
              <li key={s.t} className="rv" style={d(0.08 * i)}><b>0{i + 1}</b><span>{s.t}</span><small>{s.n}</small></li>
            ))}
          </ol>
          <div className="rv"><a className="btn btn--gold" href="tel:+94312222202" data-magnetic>Book a bridal viewing <LongArrow size={16} /></a></div>
        </div>
      </div>
    </section>
  );
}

const PROMISES = [
  { top: <span className="card-n gilt">916</span>, t: 'Pure twenty-two karat', p: 'Every piece is 916 gold: strong enough for every day, pure enough to keep.' },
  { top: <ScaleIcon size={34} />, t: 'Weighed in front of you', p: 'Priced by the pawn at the day’s rate. You see the scale, the weight and the sum.' },
  { top: <PencilIcon size={34} />, t: 'Made to your design', p: 'Bring a sketch or an heirloom. We draw it with you and make it here in Negombo.' },
  { top: <span className="card-n gilt">50+</span>, t: 'Money exchange', p: 'More than fifty currencies at the same counter, with no commission.' }
];

export function Promises() {
  return (
    <section className="sec promises" aria-labelledby="promise-title">
      <div className="wrap">
        <div className="promise-head">
          <div>
            <p className="kicker rv">How we work</p>
            <Words className="title" text="Four things we have never changed." />
          </div>
          <p className="lede rv" style={{ maxWidth: '24em' }}>The same counter, the same scale and the same rules since the first day.</p>
        </div>
        <div className="cards">
          {PROMISES.map((c, i) => (
            <article key={c.t} className="card rv" data-spot style={d(0.08 * i)}>
              {c.top}
              <h3>{c.t}</h3>
              <p>{c.p}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Bespoke() {
  return (
    <section className="sec bespoke" id="bespoke" aria-labelledby="bs-title">
      <div className="wrap bs-grid">
        <div className="bs-copy">
          <p className="kicker rv">Design your own</p>
          <Words className="title" text="From a drawing to the counter." />
          <p className="lede rv" style={d(0.2)}>Bring a sketch, a photograph or a family piece to remake. We draw it with you, tell you its weight before anything is made, and finish it by hand.</p>
          <ol className="steps">
            {[
              ['Bring your idea', 'A sketch, a photo, or a piece to remake.'],
              ['See it drawn', 'With its weight in pawn before anything is cast.'],
              ['Agree the price', 'At that day’s gold rate, so the cost is clear.'],
              ['Collect your piece', 'Finished by hand and weighed with you.']
            ].map(([t, s], i) => (
              <li key={t} className="rv" style={d(0.08 * i)}><b>0{i + 1}</b><div><strong>{t}</strong><span>{s}</span></div></li>
            ))}
          </ol>
          <div className="rv"><a className="btn btn--line" href="mailto:ranlankanegombo@gmail.com?subject=A%20piece%20made%20to%20my%20design" data-magnetic>Start a design <LongArrow size={16} /></a></div>
        </div>
        <div className="rv" style={d(0.1)}>
          <Compare src={BESPOKE.src} w={BESPOKE.w} h={BESPOKE.h} alt={`The finished ${BESPOKE.name.toLowerCase()} in twenty-two karat gold`} />
        </div>
      </div>
    </section>
  );
}

export function Rates() {
  const figs = [
    { k: '22 karat', u: 'per gram', v: RATE_22K },
    { k: '22 karat', u: `per pawn · ${PAWN} g`, v: RATE_22K * PAWN },
    { k: '24 karat', u: 'per gram', v: RATE_24K }
  ];
  return (
    <section className="sec rates" id="rates" aria-labelledby="rates-title">
      <div className="wrap">
        <div className="rates-head">
          <p className="kicker rv">At the counter today</p>
          <Words className="title" text="The gold rate." />
          <p className="small rv">Sample figures. The rate is posted every morning and every piece is priced from it.</p>
        </div>
        <dl className="figs">
          {figs.map((f, i) => (
            <div key={f.u} className="rv" style={d(0.08 * i)}>
              <dt><span>{f.k}</span> · {f.u}</dt>
              <dd><span data-count={f.v}>{f.v.toLocaleString('en-US')}</span><small>LKR</small></dd>
            </div>
          ))}
        </dl>
        <div className="fx rv">
          <span>Money exchange at the counter, no commission</span>
          <div className="fx-list">
            {FX.slice(0, 4).map((x) => <span key={x.code}><b>{x.code}</b>{x.buy.toFixed(2)}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

const ROOM = [
  { src: '/images/showroom/showroom-1.jpg', alt: 'The counter at the Ranlanka showroom, with customers being served' },
  { src: '/images/showroom/showroom-2.jpg', alt: 'The showroom floor, with seating along the glass counters' },
  { src: '/images/showroom/showroom-3.jpg', alt: 'Rows of chairs facing the lit jewellery cabinets' }
];

export function Visit() {
  return (
    <section className="sec visit" id="visit" aria-labelledby="visit-title">
      <div className="wrap visit-grid">
        <div>
          <p className="kicker rv">Visit us</p>
          <Words className="display" text="192 Main Street, Negombo." />
          <p className="lede rv" style={d(0.2)}>Come in to see a piece, have one sized, sell old gold or change money. We bring out the trays and take as long as you need.</p>
          <dl className="info">
            <div className="rv"><dt>Hours</dt><dd>Monday to Saturday<br />10 am to 7.30 pm</dd></div>
            <div className="rv" style={d(0.06)}><dt>Closed</dt><dd>Sundays and Poya days</dd></div>
            <div className="rv" style={d(0.12)}><dt>Call</dt><dd><a href="tel:+94312222202">031 222 2202</a><br /><a href="tel:+94312238383">031 223 8383</a></dd></div>
            <div className="rv" style={d(0.18)}><dt>Write</dt><dd><a href="mailto:ranlankanegombo@gmail.com">ranlankanegombo@gmail.com</a></dd></div>
          </dl>
          <div className="visit-cta rv">
            <a className="btn btn--gold" href="https://maps.google.com/?q=Ranlanka+Jewellers+192+Main+Street+Negombo" target="_blank" rel="noopener" data-magnetic><PinIcon size={17} />Get directions</a>
            <a className="btn btn--line" href="tel:+94312222202" data-magnetic><PhoneIcon size={16} />Call the showroom</a>
          </div>
        </div>
        <div className="room">
          <div className="room-card rv" data-spot>
            <OpenNow />
          </div>
          <div className="room-card rv" style={d(0.1)}>
            <p className="kicker">The showroom</p>
            <div className="photos">
              {ROOM.map((r) => (
                <figure key={r.src}><Image src={r.src} alt={r.alt} width={200} height={200} unoptimized /></figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <h2 className="title rv">See it in the light, on Main Street.</h2>
          <nav className="foot-nav" aria-label="Footer">
            <a href="#collection">Collection</a>
            <a href="#bridal">Bridal</a>
            <a href="#bespoke">Bespoke</a>
            <a href="#rates">Gold rate</a>
            <a href="https://www.instagram.com/ranlankanegombo/" target="_blank" rel="noopener">Instagram</a>
          </nav>
        </div>
        <FootWord />
        <div className="foot-bottom">
          <span>© 2026 Ranlanka Jewellers · 192 Main Street, Negombo</span>
          <span>Pieces shown are samples. Gold is priced at the day’s rate.</span>
        </div>
      </div>
    </footer>
  );
}

function FootWord() {
  return <p className="foot-word" data-spot aria-hidden="true">Ranlanka</p>;
}
