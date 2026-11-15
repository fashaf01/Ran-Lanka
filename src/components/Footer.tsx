import { Flourish, Icon, Logo } from "@/components/Icons";
import { EMAIL, MAPS_URL, PHONE, PHONE_2, PHONE_HREF } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap ft-top">
        <div>
          <Logo />
          <p className="ft-about">
            Twenty-two karat gold, bespoke pieces and money exchange on Main Street, Negombo. Weighed in front of you since 2008.
          </p>
          <div className="socials">
            <a className="social" href="https://www.instagram.com/ranlankanegombo/" target="_blank" rel="noopener" aria-label="Ranlanka on Instagram"><Icon n="ig" /></a>
            <a className="social" href={PHONE_HREF} aria-label={`Call ${PHONE}`}><Icon n="phone" /></a>
            <a className="social" href={`mailto:${EMAIL}`} aria-label="Email the shop"><Icon n="mail" /></a>
            <a className="social" href={MAPS_URL} target="_blank" rel="noopener" aria-label="Directions to the showroom"><Icon n="pin" /></a>
          </div>
        </div>
        <div>
          <h4>Collection</h4>
          <ul>
            <li><a href="/collection/necklaces">Necklaces</a></li>
            <li><a href="/collection/bangles">Bangles</a></li>
            <li><a href="/collection/earrings">Earrings</a></li>
            <li><a href="/collection/rings">Rings</a></li>
            <li><a href="/collection/pendants">Pendants</a></li>
            <li><a href="/collection">All 49 pieces</a></li>
          </ul>
        </div>
        <div>
          <h4>The counter</h4>
          <ul>
            <li><a href="/gold-rate">Gold rate</a></li>
            <li><a href="/exchange">Money exchange</a></li>
            <li><a href="/bridal">Bridal</a></li>
            <li><a href="/bespoke">Bespoke</a></li>
            <li><a href="/about">Our story</a></li>
            <li><a href="/visit">Visit</a></li>
          </ul>
        </div>
        <div>
          <h4>Visit</h4>
          <ul>
            <li>192 Main Street, Negombo 11500</li>
            <li>Mon to Sat, 10:00 am – 7:30 pm</li>
            <li>Closed Sundays and Poya days</li>
            <li><a href={PHONE_HREF}>{PHONE}</a></li>
            <li><a href="tel:0312238383">{PHONE_2}</a></li>
          </ul>
        </div>
      </div>
      <Flourish pale />
      <div className="wrap ft-fine">
        <span>© 2026 Ranlanka Jewellery (Pvt) Ltd.</span>
        <span>Gold and exchange rates on this site are sample figures.</span>
      </div>
    </footer>
  );
}
