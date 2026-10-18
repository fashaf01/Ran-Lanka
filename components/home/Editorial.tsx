import Image from 'next/image';
import Link from 'next/link';
import { RATE_22K, RATE_24K, PAWN, lkr } from '@/lib/catalogue';
import { InstagramIcon, LongArrow, PencilIcon, RingIcon, ScaleIcon, TruckIcon } from '../Icons';

// Design your own: the finished pendant beside the drawing it started as.
export function Bespoke() {
  return (
    <section className="sec bespoke">
      <div className="wrap bs-grid">
        <div className="bs-pair">
          <figure className="bs-panel bs-panel--sketch rv">
            <svg viewBox="0 0 300 380" aria-hidden="true">
              <g fill="none" stroke="#2b2724" strokeOpacity=".55" strokeWidth="1" strokeLinecap="round">
                <circle cx="150" cy="190" r="14" />
                <circle cx="150" cy="190" r="6" />
                {Array.from({ length: 9 }).map((_, i) => {
                  const a = (i / 9) * Math.PI * 2;
                  const x = 150 + Math.cos(a) * 26, y = 190 + Math.sin(a) * 26;
                  const cx = 150 + Math.cos(a + 0.35) * 70, cy = 190 + Math.sin(a + 0.35) * 70;
                  const ex = 150 + Math.cos(a + 0.15) * (98 + (i % 3) * 14), ey = 190 + Math.sin(a + 0.15) * (98 + (i % 3) * 14);
                  return <path key={i} d={`M${x.toFixed(1)} ${y.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`} />;
                })}
                <path d="M40 336h220M40 330v12M260 330v12" strokeOpacity=".35" />
              </g>
              <g style={{ fontFamily: 'var(--sans)' }} fontSize="9" fill="#5d5853" letterSpacing="1.4">
                <text x="150" y="356" textAnchor="middle">38 MM · 5.2 G · 22K</text>
                <text x="40" y="40">STARBURST · SKETCH 2</text>
              </g>
            </svg>
            <figcaption>The drawing</figcaption>
          </figure>
          <figure className="bs-panel bs-panel--piece rv" style={{ '--d': '.1s' } as React.CSSProperties}>
            <Image src="/images/burst-pendant.webp" alt="The finished starburst pendant in 22 karat gold" fill sizes="(max-width: 900px) 50vw, 25vw" style={{ objectFit: 'contain' }} />
            <figcaption>The piece</figcaption>
          </figure>
        </div>
        <div className="bs-copy rv" style={{ '--d': '.15s' } as React.CSSProperties}>
          <p className="kicker">Design your own</p>
          <h2 className="h1">Your idea, in twenty-two karat gold.</h2>
          <p className="lede">Bring a sketch, a photograph or a family heirloom. We draw it with you, weigh the gold in front of you and make it by hand in Negombo.</p>
          <ol className="steps">
            <li><b>01</b>Bring your idea</li>
            <li><b>02</b>See it drawn and weighed</li>
            <li><b>03</b>Collect your piece</li>
          </ol>
          <Link className="btn btn--dark" href="/about#bespoke">Start a design</Link>
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
    <section className="rates" aria-labelledby="rates-title">
      <div className="wrap rates-in">
        <div className="rates-head rv">
          <p className="kicker">At the counter today</p>
          <h2 className="h2" id="rates-title">Gold rates</h2>
          <p className="note">Sample figures. Rates are posted every morning; prices on this site follow them.</p>
        </div>
        <dl className="rates-figs">
          {figs.map((f, i) => (
            <div key={f.u} className="rv" style={{ '--d': `${i * 0.08}s` } as React.CSSProperties}>
              <dt><span>{f.k}</span>{f.u}</dt>
              <dd>{lkr(f.v).replace('LKR ', '')}<small>LKR</small></dd>
            </div>
          ))}
        </dl>
        <p className="rates-fx rv">Money exchange at the counter: more than fifty currencies, no commission. <Link className="tlink tlink--light" href="/exchange">See the rates <LongArrow size={14} /></Link></p>
      </div>
    </section>
  );
}

export function Services() {
  const items = [
    { icon: <ScaleIcon size={26} />, t: 'Weighed in front of you', d: 'Every piece priced by weight at the day’s rate.' },
    { icon: <RingIcon size={26} />, t: 'Free resizing', d: 'Rings and bangles resized at the showroom.' },
    { icon: <TruckIcon size={26} />, t: 'Insured delivery', d: 'Free, insured delivery anywhere in Sri Lanka.' },
    { icon: <PencilIcon size={26} />, t: 'Made to your design', d: 'Drawn with you, made by hand in Negombo.' }
  ];
  return (
    <section className="services" aria-label="Why Ranlanka">
      <div className="wrap services-in">
        {items.map((s, i) => (
          <div key={s.t} className="svc rv" style={{ '--d': `${i * 0.06}s` } as React.CSSProperties}>
            {s.icon}
            <h3>{s.t}</h3>
            <p>{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const GRAM = [
  { src: '/images/about-detail.webp', tone: '', fit: 'cover' },
  { src: '/images/sun-pendant.webp', tone: 'sand', fit: 'contain' },
  { src: '/images/about-hands.webp', tone: '', fit: 'cover' },
  { src: '/images/dome-earrings.webp', tone: 'wine', fit: 'contain' },
  { src: '/images/look-bride.webp', tone: '', fit: 'cover' },
  { src: '/images/leaf-pendant.webp', tone: 'stone', fit: 'contain' }
] as const;

export function Inspired() {
  return (
    <section className="sec inspired">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="kicker">Get inspired</p>
            <h2 className="h2">From the counter</h2>
          </div>
          <a className="tlink" href="https://www.instagram.com/ranlankanegombo/" target="_blank" rel="noopener"><InstagramIcon size={16} />@ranlankanegombo</a>
        </div>
      </div>
      <div className="gram">
        {GRAM.map((g, i) => (
          <a key={g.src} href="https://www.instagram.com/ranlankanegombo/" target="_blank" rel="noopener" className={`gram-tile${g.tone ? ` tone-${g.tone}` : ''} rv`} style={{ '--d': `${i * 0.05}s` } as React.CSSProperties} aria-label="Ranlanka on Instagram">
            <Image src={g.src} alt="" fill sizes="(max-width: 700px) 50vw, 17vw" style={{ objectFit: g.fit, padding: g.fit === 'contain' ? '18%' : 0 }} />
            <span className="gram-go"><InstagramIcon size={22} /></span>
          </a>
        ))}
      </div>
      <div className="wrap gram-foot"><Link className="tlink" href="/about">Our story <LongArrow size={14} /></Link></div>
    </section>
  );
}
