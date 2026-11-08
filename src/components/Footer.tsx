export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap ft-top">
        <div>
          <p className="d3">
            Twenty-two karat gold and money exchange on Main Street, <em>since 2008.</em>
          </p>
        </div>
        <div>
          <h4>Collection</h4>
          <ul>
            <li><a href="/collection/necklaces">Necklaces</a></li>
            <li><a href="/collection/bangles">Bangles</a></li>
            <li><a href="/collection/rings">Rings</a></li>
            <li><a href="/collection/chains">Chains</a></li>
            <li><a href="/collection/pendants">Pendants</a></li>
            <li><a href="/collection">All pieces</a></li>
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
            <li>192 Main Street, Negombo</li>
            <li>Mon to Sat, 10:00 am – 7:30 pm</li>
            <li>Closed Sundays and Poya days</li>
            <li><a href="tel:0312222202">031 222 2202</a></li>
          </ul>
        </div>
      </div>
      <p className="ft-word" aria-hidden="true">RANLANKA</p>
      <div className="wrap ft-fine">
        <span>© 2026 Ranlanka Jewellery (Pvt) Ltd.</span>
        <span>Gold and exchange rates on this site are sample figures.</span>
      </div>
    </footer>
  );
}
