import Link from 'next/link';
import { CATEGORIES } from '@/lib/catalogue';
import { InstagramIcon } from './Icons';
import { Logo } from './Logo';
import { Newsletter } from './Newsletter';

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-news">
            <h2 className="h3">Letters from the counter</h2>
            <p>New pieces, the bridal calendar and the odd note on the gold price. Once a month, never more.</p>
            <Newsletter />
          </div>
          <div className="foot-cols">
            <div>
              <span className="label">Shop</span>
              <Link href="/shop">All jewellery</Link>
              {CATEGORIES.map((c) => <Link key={c.key} href={`/shop/${c.key}`}>{c.name}</Link>)}
            </div>
            <div>
              <span className="label">Ranlanka</span>
              <Link href="/about">Our story</Link>
              <Link href="/about#bespoke">Design your own</Link>
              <Link href="/about#visit">Visit the showroom</Link>
              <Link href="/wishlist">Wishlist</Link>
            </div>
            <div>
              <span className="label">Visit</span>
              <p>192 Main Street<br />Negombo, Sri Lanka</p>
              <p>Monday to Saturday<br />10 am to 7.30 pm</p>
              <p>Closed Sundays and Poya days</p>
            </div>
            <div>
              <span className="label">Contact</span>
              <a href="tel:+94312222202">031 222 2202</a>
              <a href="tel:+94312238383">031 223 8383</a>
              <a href="mailto:ranlankanegombo@gmail.com">ranlankanegombo@gmail.com</a>
              <a className="foot-ig" href="https://www.instagram.com/ranlankanegombo/" target="_blank" rel="noopener"><InstagramIcon size={16} />@ranlankanegombo</a>
            </div>
          </div>
        </div>
        <div className="foot-mark">
          <Logo />
          <span lang="si">රන්ලංකා</span>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Ranlanka Jewellers, Negombo</span>
          <span>Prices and pieces shown are samples. Gold is priced at the day’s rate.</span>
        </div>
      </div>
    </footer>
  );
}
