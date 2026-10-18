import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FX } from '@/lib/rates';
import { PhoneIcon, PinIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Money exchange',
  description: 'Ranlanka stocks travel money for more than fifty currencies, commission free, with rates checked daily. Collect from the Main Street showroom in Negombo.'
};

const PHOTOS = [
  { src: '/images/exchange/money-1.jpg', alt: 'Banknotes from many countries' },
  { src: '/images/exchange/money-2.jpg', alt: 'Euro and US dollar notes changing hands' },
  { src: '/images/exchange/money-3.jpg', alt: 'US dollar notes being counted out' }
];

export default function Exchange() {
  return (
    <>
      <section className="ex-head">
        <div className="wrap ex-head-in">
          <div>
            <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">Money exchange</span></nav>
            <p className="kicker">Money exchange</p>
            <h1 className="h1">Travel money in over fifty currencies.</h1>
            <p className="lede">Ranlanka stocks travel money for more than fifty currencies and countries. It is commission free, and our rates are checked every day so you get a good rate. Check the rate, then collect from the showroom.</p>
            <div className="ex-cta">
              <a className="btn btn--dark" href="tel:+94312222202"><PhoneIcon size={16} />Call for today’s rate</a>
              <a className="tlink" href="https://maps.google.com/?q=Ranlanka+Jewellers+192+Main+Street+Negombo" target="_blank" rel="noopener"><PinIcon size={16} />Get directions</a>
            </div>
          </div>
          <div className="ex-photos" aria-hidden={false}>
            {PHOTOS.map((p) => <Image key={p.src} src={p.src} alt={p.alt} width={200} height={200} unoptimized />)}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap ex-grid">
          <div className="rv">
            <p className="kicker">Sample rates</p>
            <h2 className="h2">LKR for one unit</h2>
            <p className="lede">These figures are samples to show how the rates look. Ask at the counter, or call, for the rate on the day.</p>
          </div>
          <div className="rv" style={{ '--d': '.1s' } as React.CSSProperties}>
            <table className="fxt">
              <thead><tr><th scope="col">Currency</th><th scope="col">We buy</th><th scope="col">We sell</th></tr></thead>
              <tbody>
                {FX.map((c) => (
                  <tr key={c.code}>
                    <th scope="row"><span className="fx-code">{c.code}</span>{c.name}</th>
                    <td>{c.buy.toFixed(2)}</td>
                    <td>{c.sell.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="note">More than fifty currencies are held at the counter.</p>
          </div>
        </div>
      </section>

      <section className="sec ex-steps-sec">
        <div className="wrap">
          <p className="kicker">How it works</p>
          <ol className="ex-steps">
            <li className="rv"><b>01</b><h3>Check the rate</h3><p>Call the showroom, or ask at the counter, for the day’s rate.</p></li>
            <li className="rv" style={{ '--d': '.08s' } as React.CSSProperties}><b>02</b><h3>Tell us what you need</h3><p>The currency and the amount you would like to change.</p></li>
            <li className="rv" style={{ '--d': '.16s' } as React.CSSProperties}><b>03</b><h3>Collect at the showroom</h3><p>192 Main Street, Negombo. Monday to Saturday, 10 am to 7.30 pm.</p></li>
          </ol>
        </div>
      </section>
    </>
  );
}
