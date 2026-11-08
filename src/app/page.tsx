import type React from "react";
import { FxTable, Grid } from "@/components/Cards";
import { HERO_SLIDES, HOME_FAV } from "@/lib/data";

export default function Home() {
  return (
    <div className="page" data-page="home">
      <section className="hero hs" aria-label="From the case" aria-roledescription="carousel">
        <div className="hs-l">
          <div className="hs-media" data-hs-media="">
            <div className="hs-ph" data-hs-prev=""><img src="/img/bride.webp" alt="" /></div>
            <div className="hs-ph cur" data-hs-cur=""><img src="/img/bride.webp" alt="A bride wearing a layered gold necklace and choker" fetchPriority="high" /></div>
          </div>
          <div className="hs-t" id="hs-slide">
            <h1 className="hs-title"><span data-hs-title="">Necklaces</span></h1>
            <p className="hs-sub" data-hs-sub="">Five pieces in the case</p>
          </div>
          <div className="hs-tabs" role="tablist" aria-label="Choose a case">
            {HERO_SLIDES.map((x, i) => (
              <button key={x.t} type="button" role="tab" aria-selected={i === 0} aria-controls="hs-slide" data-i={i}>
                <i></i>
                <span><b>0{i + 1}</b><span className="l">{x.t}</span></span>
              </button>
            ))}
          </div>
        </div>
        <div className="hs-r" data-hs-panel="">
          <div className="hs-top"><span data-hs-stone="">Emerald · 22 karat</span><span data-hs-count="" aria-live="polite">01 / 04</span></div>
          <div className="hs-in" data-hs-in="">
            <div className="hs-arch"><span className="hs-ring" aria-hidden="true"></span><div className="hs-win"><img data-hs-arch="" src="/img/nk3a.webp" alt="Regal Beaded Gold Necklace" /></div></div>
            <p data-hs-text="">Necklaces for the ceremony and for every day, from fine garlands to beaded collars.</p>
            <a className="btn" data-hs-cta="" href="/collection/necklaces">Shop necklaces <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 12h16M13 5l7 7-7 7"></path></svg></a>
          </div>
          <div className="hs-ctl">
            <button type="button" className="hs-btn" data-hs-prevbtn="" aria-label="Previous case"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M20 12H4M11 5l-7 7 7 7"></path></svg></button>
            <button type="button" className="hs-btn solid" data-hs-nextbtn="" aria-label="Next case"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 12h16M13 5l7 7-7 7"></path></svg></button>
          </div>
        </div>
      </section>
      <div className="tick" aria-hidden="true">
        <div className="tk-track" data-marquee=""><span><b>22K pawn</b> LKR 312,000<i></i></span><span><b>24K pawn</b> LKR 340,000<i></i></span><span><b>USD buy</b> 297.40<i></i></span><span><b>EUR buy</b> 344.80<i></i></span><span><b>GBP buy</b> 397.20<i></i></span><span><b>AUD buy</b> 194.30<i></i></span><span><b>AED buy</b> 80.70<i></i></span><span><b>INR buy</b> 3.36<i></i></span><span><b>Sample rates</b> posted every morning<i></i></span></div>
      </div>
      <section className="sec made" aria-label="Bespoke">
        <div className="wrap">
          <div className="made-head rv"><p className="kicker">Bespoke · since 2008</p><h2 className="d2"><span className="ln"><span>Every piece, made</span></span><span className="ln"><span>with <em>intention.</em></span></span></h2></div>
          <div className="mf">
            <div className="mf-top">
              <span className="mf-logo">RANLANKA</span>
              <div className="mf-acts">
                <a className="mf-ic" href="tel:0312222202" aria-label="Call the shop"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"></path></svg></a>
                <a className="mf-ic" href="https://www.google.com/maps/search/?api=1&amp;query=Ranlanka%2C%20192%20Main%20Street%2C%20Negombo" target="_blank" rel="noopener" aria-label="Directions"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"></path><circle cx="12" cy="9.5" r="2.5"></circle></svg></a>
                <a className="mf-cta" href="/visit"><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="5" width="18" height="16"></rect><path d="M3 10h18M8 3v4M16 3v4"></path></svg></span>Book a visit</a>
              </div>
            </div>
            <div className="mf-grid">
              <div className="mf-col">
                <div className="mf-t plate" style={{ "--d": "0s" } as React.CSSProperties}><img src="/img/ch3b.webp" alt="A woman wearing a fine 22 karat gold chain" loading="lazy" /></div>
                <div className="mf-card" style={{ "--d": "1.25s" } as React.CSSProperties}><p>We design every piece with love and intention.</p><a className="mf-go" href="/bespoke" aria-label="How bespoke works"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"></path></svg></a></div>
              </div>
              <div className="mf-t mf-big plate" style={{ "--d": ".15s" } as React.CSSProperties}><img src="/img/pd8b.webp" alt="The Golden Flame Pendant, worn" loading="lazy" /><p className="mf-line">Only 22 karat. <em>Weighed in front of you.</em></p></div>
              <div className="mf-col">
                <div className="mf-t mf-sm plate" style={{ "--d": "1.55s" } as React.CSSProperties}><img src="/img/rg3b.webp" alt="A hand with a leaf pattern gold ring among white flowers" loading="lazy" /></div>
                <div className="mf-t plate" style={{ "--d": ".3s" } as React.CSSProperties}><img src="/img/er3b.webp" alt="Gold leaf drop earrings, worn" loading="lazy" /><span className="mf-no">RL ER3</span></div>
              </div>
            </div>
            <div className="mf-foot">
              <span className="mf-word">Ranlanka</span>
              <p>Bring a sketch, a photo or a piece you liked. We design it, weigh it and price it before anything is made.</p>
              <a className="btn solid" href="/bespoke">Start a design <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 12h16M13 5l7 7-7 7"></path></svg></a>
            </div>
          </div>
        </div>
      </section>
      <section className="ed" aria-label="Bridal and our story">
        <div className="ed-split ed-ruby">
          <div className="ed-copy">
            <p className="kicker">Bridal · <span lang="si" style={{ "letterSpacing": "0", "textTransform": "none", "fontSize": "14px" }}>මනාලිය</span></p>
            <h2 className="d2 rv"><span className="ln"><span>For the day the</span></span><span className="ln"><span>whole family</span></span><span className="ln"><span><em>remembers.</em></span></span></h2>
            <p className="body fade">Bring your family and take your time. We bring out the trays, try every piece with the saree, and size the bangles on the wrist.</p>
            <div className="fade"><a className="tlink" href="/bridal">Bridal viewings</a></div>
          </div>
          <div className="ed-img"><img src="/img/hero.webp" alt="A bride in a red and green silk saree, seated among brass oil lamps" data-zoom="" loading="lazy" /></div>
        </div>
        <div className="ed-worn">
          <h2 className="ed-h" data-spread="">Made to be worn.</h2>
          <div className="ed-three">
            <a className="clip" href="/product/ch1"><img src="/img/ch1b.webp" alt="The Sleek Gold Foxtail Chain, worn" data-speed="-.05" loading="lazy" /><span>RL CH1 · Foxtail chain</span></a>
            <a className="clip" href="/product/br7"><img src="/img/br7b.webp" alt="The Intricate Grace Bracelet on a wrist" data-speed=".04" loading="lazy" /><span>RL BR7 · Grace bracelet</span></a>
            <a className="clip" href="/product/ch5"><img src="/img/ch5b.webp" alt="The Slender Gold Chain, worn" data-speed="-.03" loading="lazy" /><span>RL CH5 · Slender chain</span></a>
          </div>
          <p className="ed-h ed-mirror" aria-hidden="true" data-spread="">Made to be worn.</p>
        </div>
        <div className="ed-tiles ed-ruby">
          <p className="kicker">Our story</p>
          <p className="ed-story" data-words=""><b lang="si">රන්</b> is the Sinhala word for gold. In 2008 Mr. Anas opened a small gold shop in Negombo town. Today the showroom on Main Street keeps the same promise: <i>honest gold, fair rates,</i> and <i>designs that never go out of fashion.</i></p>
          <a className="tlink" href="/about">Read our story</a>
          <span className="ed-seal" aria-hidden="true">RL</span>
        </div>
        <div className="ed-duo">
          <a className="ed-ph" href="/product/pd1" data-cursor="View"><img src="/img/pd1b.webp" alt="A man wearing the gold pendant with an Om and Ganesha design" data-zoom="" loading="lazy" /><span className="ed-sq" aria-hidden="true"></span><span className="ed-lab">RL PD1 · Om and Ganesha pendant</span></a>
          <a className="ed-ph" href="/product/er6" data-cursor="View"><img src="/img/er6b.webp" alt="A woman wearing the gold flowerbud stud earrings" data-zoom="" loading="lazy" /><span className="ed-sq" aria-hidden="true"></span><span className="ed-lab">RL ER6 · Flowerbud studs</span></a>
        </div>
      </section>
      <section className="sec stone rule" aria-label="From the case">
        <div className="wrap">
          <div className="sec-head">
            <div className="rv"><p className="kicker">From the case</p><h2 className="d2"><span className="ln"><span>Pieces to try on</span></span><span className="ln"><span>at the <em>counter.</em></span></span></h2></div>
            <p className="body fade">Every piece has a number. Quote it when you call or visit and we will have it ready.</p>
          </div>
          <Grid name="home" ids={HOME_FAV} />
          <div className="foot-row"><p>Eight favourites from 49 pieces. Rings are sized while you wait, bangles on your wrist, and chain lengths are cut at the counter.</p><a className="btn" href="/collection">See all 49 pieces <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 12h16M13 5l7 7-7 7"></path></svg></a></div>
        </div>
      </section>
      <section className="sec" aria-label="Today's rates">
        <div className="wrap">
          <div className="sec-head">
            <div className="rv"><p className="kicker">Today at the counter</p><h2 className="d2"><span className="ln"><span>Fair rates,</span></span><span className="ln"><span>posted <em>every morning.</em></span></span></h2></div>
            <div style={{ "justifySelf": "end" }}><span className="stamp">Sample figures</span></div>
          </div>
          <div className="rt-grid">
            <div>
              <p className="fl">Gold per pawn · 8 grams</p>
              <div className="big-rate">
                <div><span className="k">22K</span><span className="v"><small>LKR</small><span data-count="312000">312,000</span></span><span className="per">LKR 39,000 per gram</span></div>
                <div><span className="k">24K</span><span className="v"><small>LKR</small><span data-count="340000">340,000</span></span><span className="per">LKR 42,500 per gram</span></div>
              </div>
              <div className="acts" style={{ "marginTop": "26px" }}><a className="btn" href="/gold-rate">Gold calculator</a></div>
            </div>
            <div>
              <p className="fl">Money exchange · LKR per unit</p>
              <div className="tbl"><FxTable rows={4} /></div>
              <p className="note" style={{ "marginTop": "14px" }}>More than fifty currencies at the counter. No commission.</p>
              <div className="acts" style={{ "marginTop": "22px" }}><a className="btn" href="/exchange">All exchange rates</a></div>
            </div>
          </div>
        </div>
      </section>
      <section className="sec-s band raise rule" aria-label="Visit">
        <div className="wrap">
          <p className="kicker">Visit</p>
          <h2 className="d1 rv"><span className="ln"><span>Gold looks best</span></span><span className="ln"><span><em>in person.</em></span></span></h2>
          <p className="lead fade">192 Main Street, Negombo. <span data-open="">Open Monday to Saturday, 10:00 am to 7:30 pm.</span></p>
          <div className="acts fade" style={{ "justifyContent": "center" }}><a className="btn solid" href="/visit">Book a visit</a><a className="btn" href="https://www.google.com/maps/search/?api=1&amp;query=Ranlanka%2C%20192%20Main%20Street%2C%20Negombo" target="_blank" rel="noopener">Get directions</a></div>
        </div>
      </section>
    </div>
  );
}
