import type { Metadata } from "next";

export const metadata: Metadata = { title: "Our story", description: "Ran is the Sinhala word for gold. Ranlanka has sold 22 karat gold in Negombo since 2008." };

export default function AboutPage() {
  return (
    <div className="page" data-page="about">
      <header className="wrap phead">
        <div className="phead-grid wide" style={{ "alignItems": "center" }}>
          <div className="phead-copy">
            <nav className="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span>Our story</span></nav>
            <p className="kicker">Our story</p>
            <h1 className="d1 rv"><span className="ln"><span>Ran is the Sinhala</span></span><span className="ln"><span>word for <em>gold.</em></span></span></h1>
            <p className="lead">Ranlanka is the gold of Lanka, sold in Negombo since 2008.</p>
          </div>
          <p className="glyph" lang="si" aria-hidden="true">රන්</p>
        </div>
      </header>
      <section className="sec-s" style={{ "paddingTop": "0" }} aria-label="The story">
        <div className="wrap split">
          <div className="plate clip" style={{ "aspectRatio": "4/3" }}><img src="/img/hands-bangles.webp" alt="A bride's hands with stacked gold bangles, rings and jasmine" /></div>
          <div style={{ "display": "grid", "gap": "30px" }}>
            <p className="fade" style={{ "font": "500 clamp(20px,1.8vw,26px)/1.5 var(--f-text)", "letterSpacing": "-.01em" }}>In 2008, Mr. Anas opened a small gold shop in Negombo town. By 2011 it had grown into a showroom on Main Street. The promise has stayed the same since the first day. Honest gold, fair rates, and designs that never go out of fashion.</p>
            <dl className="tl fade">
              <div><dt>2008</dt><dd><b>The first shop</b>A small gold shop in Negombo town.</dd></div>
              <div><dt>2011</dt><dd><b>Main Street</b>A showroom with room for the whole collection.</dd></div>
              <div><dt>Today</dt><dd><b>Gold and exchange</b>Jewellery, bespoke pieces and money exchange.</dd></div>
            </dl>
          </div>
        </div>
      </section>
      <section className="sec raise" aria-label="Our promise">
        <div className="wrap">
          <div className="sec-head"><div className="rv"><p className="kicker">Our promise</p><h2 className="d2"><span className="ln"><span>Three things that</span></span><span className="ln"><span>have <em>not changed.</em></span></span></h2></div></div>
          <ul className="tiles fade">
            <li><h3>Honest gold</h3><p>Every piece is 22 karat, 916 parts gold in every 1,000, and weighed in front of you.</p></li>
            <li><h3>Fair rates</h3><p>Gold and exchange rates are checked each morning and posted at the counter. No commission on exchange.</p></li>
            <li><h3>Designs that last</h3><p>Necklaces, bangles and thali chains that families wear for a lifetime and pass on.</p></li>
          </ul>
        </div>
      </section>
      <section className="sec-s band" aria-label="Visit">
        <div className="wrap">
          <h2 className="d2 rv"><span className="ln"><span>Come and see</span></span><span className="ln"><span>the <em>trays.</em></span></span></h2>
          <div className="acts" style={{ "justifyContent": "center" }}><a className="btn solid" href="/visit">Plan a visit</a><a className="btn" href="/collection">Browse the collection</a></div>
        </div>
      </section>
    </div>
  );
}
