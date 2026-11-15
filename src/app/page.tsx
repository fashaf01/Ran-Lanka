import { FxTable, ProductCard } from "@/components/Cards";
import { Flourish, Icon, Seal } from "@/components/Icons";
import { CATS, CAT_KEYS, EMAIL, FX, HERO_SLIDES, HOME_FAV, MAPS_URL, PAWN_GRAMS, PHONE, PHONE_HREF, PIECES, PIECE_BY_ID, RATE, countIn, money } from "@/lib/data";

const SERVICES = [
  { icon: "scale", name: "Gold rate", text: "22 and 24 karat rates per pawn and per gram, checked each morning, with a calculator for any weight.", go: "Today's rate", href: "/gold-rate" },
  { icon: "exchange", name: "Money exchange", text: "More than fifty currencies at the counter. The rate on the board is the rate you get, with no commission.", go: "Exchange rates", href: "/exchange" },
  { icon: "coins", name: "Old gold", text: "Bring a broken chain or a piece you no longer wear. We weigh it in front of you and tell you what we can offer before you decide.", go: "How it works", href: "/gold-rate#old-gold" },
  { icon: "sparkle", name: "Bridal viewings", text: "Bring your family and take your time. We bring out the trays and try every piece with the saree.", go: "Request a viewing", href: "/bridal" },
  { icon: "pencil", name: "Bespoke", text: "A sketch, a photo or a piece you liked. We design it, weigh it and price it before anything is made.", go: "Start a design", href: "/bespoke" },
  { icon: "ring", name: "Sizing at the counter", text: "Rings are sized while you wait, bangles on your wrist, and chain lengths are cut at the counter.", go: "Plan a visit", href: "/visit" },
];

const CarNav = ({ what }: { what: string }) => (
  <div className="car-nav">
    <button className="car-btn" type="button" data-car-prev="" aria-label={`Previous ${what}`}><Icon n="left" /></button>
    <button className="car-btn" type="button" data-car-next="" aria-label={`Next ${what}`}><Icon n="right" /></button>
  </div>
);

export default function Home() {
  const first = HERO_SLIDES[0];
  const pawn22 = money(RATE[22] * PAWN_GRAMS), pawn24 = money(RATE[24] * PAWN_GRAMS);
  return (
    <div className="page" data-page="home">
      {/* ---------- hero: a piece set over its own name ---------- */}
      <section className="hero" data-hs="" aria-label="From the case" aria-roledescription="carousel">
        <div className="hero-stage">
          <span className="lace" aria-hidden="true"></span>
          <h1 className="sr">Ranlanka, 22 karat gold jewellers on Main Street, Negombo</h1>
          <p className="hero-piece" id="hs-slide"><span className="script" data-hs-name="">{first.name}</span> <span data-hs-kind="">{first.kind}</span>, 22kt</p>
          <div className="hero-comp">
            <span className="hero-ghost" aria-hidden="true"><span data-hs-g1="">{first.ghost[0]}</span><span data-hs-g2="">{first.ghost[1]}</span></span>
            <a className="hero-obj" data-hs-obj="" href={`/product/${first.id}`} data-cursor="View"><img src={`/img/${first.id}a.webp`} alt={`${first.name} ${first.kind.toLowerCase()}`} fetchPriority="high" /></a>
          </div>
          <p className="hero-price"><span>Priced at today&apos;s gold rate</span><i aria-hidden="true"></i><span data-hs-no="">RL {first.id.toUpperCase()}</span></p>
          <p className="hero-note">On Main Street in Negombo since 2008. <em>Only</em> 22 karat gold, weighed in front of you and priced at the day&apos;s rate. Every piece has a number, so quote it and we will have it <em>ready.</em></p>
          <div className="hero-tabs" role="tablist" aria-label="Choose a piece">
            {HERO_SLIDES.map((x, i) => (
              <button key={x.id} type="button" role="tab" aria-selected={i === 0} aria-controls="hs-slide" aria-label={`${x.name} ${x.kind.toLowerCase()}`} data-i={i}><i></i><span>0{i + 1}</span></button>
            ))}
          </div>
          <svg className="sketch hero-sketch" viewBox="0 0 640 220" aria-hidden="true"><use href="#rl-arcade" /></svg>
        </div>
        <div className="hero-aside">
          <div className="hero-ph" data-hs-prev=""><img src={`/img/${first.img}.webp`} alt="" /></div>
          <div className="hero-ph cur" data-hs-cur=""><img src={`/img/${first.img}.webp`} alt={first.alt} style={{ objectPosition: first.pos }} fetchPriority="high" /></div>
          <span className="lace pale" aria-hidden="true"></span>
          <span className="hero-badge"><Icon n="scale" />Weighed in front of you</span>
          <div className="hero-foot">
            <p className="hero-cap"><b data-hs-cap="">{first.cap}</b><a data-hs-cta="" href={first.href}>{first.cta} <Icon n="right" /></a></p>
            <div className="hero-ctl">
              <span className="hero-count" data-hs-count="" aria-live="polite">01 / 0{HERO_SLIDES.length}</span>
              <button type="button" className="hero-btn" data-hs-prevbtn="" aria-label="Previous piece"><Icon n="left" /></button>
              <button type="button" className="hero-btn" data-hs-nextbtn="" aria-label="Next piece"><Icon n="right" /></button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- assurances and the morning's rates ---------- */}
      <div className="tick" aria-hidden="true">
        <div className="tk-track" data-marquee="">
          <span><Icon n="shield" />Only 22 karat, 916 gold</span>
          <span><Icon n="scale" />Weighed in front of you</span>
          <span><b>22K pawn</b> LKR {pawn22}</span>
          <span><Icon n="ring" />Sized at the counter while you wait</span>
          <span><Icon n="exchange" />Money exchange, no commission</span>
          <span><b>24K pawn</b> LKR {pawn24}</span>
          <span><Icon n="coins" />Old gold bought and remade</span>
          <span><Icon n="pencil" />Bespoke, from your sketch</span>
          <span><b>{FX[0][0]} buy</b> {FX[0][2].toFixed(2)}</span>
          <span><Icon n="clock" />Sample rates, posted every morning</span>
        </div>
      </div>

      {/* ---------- the cases, as an arcade ---------- */}
      <section className="sec cases" data-car="" aria-label="Jewellery by kind">
        <div className="wrap">
          <div className="car-head">
            <div className="rv"><p className="kicker">Our jewellery</p><h2 className="d2"><span className="ln"><span>Eight cases,</span></span><span className="ln"><span>all in <em>22 karat.</em></span></span></h2></div>
            <CarNav what="cases" />
          </div>
          <div className="car-view" tabIndex={0} role="region" aria-label="Jewellery by kind, scrollable">
            <div className="car-track">
              {CAT_KEYS.map((k) => (
                <a className="cat" key={k} href={`/collection/${CATS[k].slug}`} data-cursor="Open">
                  <span className="cat-media"><img src={`/img/${CATS[k].img}.webp`} alt="" loading="lazy" /></span>
                  <span className="cat-label"><small>{countIn(k)} pieces</small><b>{k === "ms" ? "Thali" : CATS[k].name}</b></span>
                </a>
              ))}
            </div>
          </div>
          <div className="cases-foot fade">
            <a className="btn" href="/collection">See all {PIECES.length} pieces</a>
            <a className="tlink" href="/bespoke">Or have one made for you</a>
          </div>
        </div>
      </section>

      <Flourish />

      {/* ---------- favourites ---------- */}
      <section className="sec favs" data-car="" aria-label="Favourites from the case">
        <div className="wrap">
          <div className="car-head">
            <div className="rv"><p className="kicker">From the case</p><h2 className="d2"><span className="ln"><span>Pieces to try on</span></span><span className="ln"><span>at the <em>counter.</em></span></span></h2></div>
            <CarNav what="pieces" />
          </div>
          <div className="car-view" tabIndex={0} role="region" aria-label="Favourite pieces, scrollable">
            <div className="car-track">
              {HOME_FAV.map((id) => <ProductCard key={id} p={PIECE_BY_ID[id]} />)}
            </div>
          </div>
          <div className="foot-row">
            <p>Every piece has a number. Quote it when you call or visit and we will have it ready. Gold is priced by weight at the day&apos;s rate, so call <a className="inl" href={PHONE_HREF}>{PHONE}</a> for today&apos;s price.</p>
            <a className="btn" href="/gold-rate">Gold calculator <Icon n="right" /></a>
          </div>
        </div>
      </section>

      {/* ---------- bespoke ---------- */}
      <section className="atelier" aria-label="Bespoke">
        <div className="at-visual">
          <img src="/img/starburst-sketch.webp" alt="A pencil drawing of the Starburst pendant" loading="lazy" />
          <div className="at-marks">
            <span className="mark"><Icon n="pencil" />Your sketch or photo</span>
            <span className="mark"><Icon n="scale" />Weight in pawn first</span>
          </div>
          <div className="at-marks">
            <span className="mark"><Icon n="shield" />Price agreed before we start</span>
          </div>
        </div>
        <div className="at-body">
          <div className="rv"><p className="kicker">Bespoke</p><h2 className="d2"><span className="ln"><span>Your sketch,</span></span><span className="ln"><span>in <em>22 karat gold.</em></span></span></h2></div>
          <div className="at-frame arch-rim"><span className="arch"><img src="/img/starburst-gold.webp" alt="The finished Starburst pendant in 22 karat gold" loading="lazy" /></span></div>
          <p className="at-text">Bring a drawing, a photo or a piece you have seen and liked. We draw it up, tell you its weight in pawn and agree the price before anything is made. You approve every step.</p>
          <a className="btn" href="/bespoke">Start a design <Icon n="right" /></a>
        </div>
      </section>

      {/* ---------- our story ---------- */}
      <section className="sec" aria-label="Our story">
        <div className="wrap heritage">
          <div>
            <div className="rv"><p className="kicker">Since 2008</p><h2 className="d2"><span className="ln"><span>Honest gold</span></span><span className="ln"><span>on <em>Main Street.</em></span></span></h2></div>
            <div className="her-copy fade">
              <p><b lang="si">රන්</b> is the Sinhala word for gold. In 2008 Mr. Anas opened a small gold shop in Negombo town, and by 2011 it had grown into a showroom on Main Street.</p>
              <p>The promise has stayed the same since the first day: honest gold, fair rates, and designs that never go out of fashion.</p>
            </div>
            <div className="stats fade">
              <div className="stat"><p className="stat-num">2008</p><p className="stat-label">Established</p></div>
              <div className="stat"><p className="stat-num">22kt</p><p className="stat-label">Every piece</p></div>
              <div className="stat"><p className="stat-num">{PIECES.length}</p><p className="stat-label">Pieces in the case</p></div>
              <div className="stat"><p className="stat-num">50+</p><p className="stat-label">Currencies exchanged</p></div>
            </div>
            <div className="fade" style={{ marginTop: "30px" }}><a className="tlink" href="/about">Read our story</a></div>
          </div>
          <div className="her-aside fade" data-d="1">
            <Seal />
            <div className="tile tall"><img src="/img/hands-bangles.webp" alt="A bride's hands with stacked gold bangles, rings and jasmine" loading="lazy" /><span>Sized on the wrist</span></div>
            <div className="tile pack"><img src="/img/bg4a.webp" alt="Twilight Hues gold bangles" loading="lazy" /><span>Weighed in front of you</span></div>
            <div className="tile"><img src="/img/showroom-counter.jpg" alt="The counter at the Ranlanka showroom" loading="lazy" /><span>Main Street since 2011</span></div>
            <div className="tile wide"><img src="/img/life-family.jpg" alt="Two women in silk sarees and gold necklaces, laughing together" loading="lazy" style={{ objectPosition: "50% 30%" }} /><span>Designs that are passed on</span></div>
          </div>
        </div>
      </section>

      {/* ---------- at the counter ---------- */}
      <section className="sec raise rule" aria-label="At the counter">
        <div className="wrap">
          <div className="sec-head">
            <div className="rv"><p className="kicker">At the counter</p><h2 className="d2"><span className="ln"><span>More than</span></span><span className="ln"><span>the <em>jewellery case.</em></span></span></h2></div>
            <p className="body fade">Ranlanka is a working gold shop. Alongside the collection we post the day&apos;s rates, change money, buy old gold and make pieces to order.</p>
          </div>
          <div className="svc fade">
            {SERVICES.map((s) => (
              <a key={s.name} href={s.href}>
                <Icon n={s.icon} />
                <h3>{s.name}</h3>
                <p>{s.text}</p>
                <span className="go">{s.go} <Icon n="right" /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- bridal ---------- */}
      <section className="bottle" aria-label="Bridal">
        <div className="wrap bridal-in">
          <div>
            <p className="kicker">Bridal · <span lang="si">මනාලිය</span></p>
            <h2 className="d2 rv"><span className="ln"><span>For the day the</span></span><span className="ln"><span>whole family</span></span><span className="ln"><span><em>remembers.</em></span></span></h2>
            <p className="body fade">Bring your family and take your time. We bring out the trays, try every piece with the saree, and size the bangles on the wrist.</p>
            <ul className="checks-l fade">
              <li><Icon n="check" />Necklaces, bangles and mangalsutras chosen for the wedding</li>
              <li><Icon n="check" />Bangles sized on the wrist, by the dozen for a bride</li>
              <li><Icon n="check" />Thali chains made to your family&apos;s design</li>
              <li><Icon n="check" />Every piece weighed in front of you and priced at the day&apos;s rate</li>
            </ul>
            <div className="fade"><a className="btn solid" href="/bridal">Request a bridal viewing</a></div>
          </div>
          <div className="panels fade" data-d="1">
            <div className="arch-rim"><span className="arch"><img src="/img/life-bride2.webp" alt="A bride laughing in a pink saree and layered gold" loading="lazy" /></span></div>
            <div className="arch-rim"><span className="arch"><img src="/img/life-bride1.webp" alt="A bride in a layered gold necklace, surrounded by her family's hands" loading="lazy" /></span></div>
            <div className="arch-rim"><span className="arch"><img src="/img/life-bride3.webp" alt="A bride in a gold-bordered saree on her wedding day" loading="lazy" /></span></div>
          </div>
        </div>
      </section>

      {/* ---------- today's rates ---------- */}
      <section className="sec" aria-label="Today's rates">
        <div className="wrap">
          <div className="sec-head end">
            <div className="rv"><p className="kicker">Today at the counter</p><h2 className="d2"><span className="ln"><span>Fair rates,</span></span><span className="ln"><span>posted <em>every morning.</em></span></span></h2></div>
            <div style={{ justifySelf: "end" }}><span className="stamp">Sample figures</span></div>
          </div>
          <div className="rt-grid">
            <div>
              <p className="fl">Gold per pawn · 8 grams</p>
              <div className="big-rate">
                <div><span className="k">22K</span><span className="v"><small>LKR</small><span data-count={RATE[22] * PAWN_GRAMS}>{pawn22}</span></span><span className="per">LKR {money(RATE[22])} per gram</span></div>
                <div><span className="k">24K</span><span className="v"><small>LKR</small><span data-count={RATE[24] * PAWN_GRAMS}>{pawn24}</span></span><span className="per">LKR {money(RATE[24])} per gram</span></div>
              </div>
              <div className="acts" style={{ marginTop: "26px" }}><a className="btn" href="/gold-rate">Gold calculator</a></div>
            </div>
            <div>
              <p className="fl">Money exchange · LKR per unit</p>
              <div className="tbl"><FxTable rows={4} /></div>
              <p className="note" style={{ marginTop: "14px" }}>More than fifty currencies at the counter. No commission.</p>
              <div className="acts" style={{ marginTop: "22px" }}><a className="btn" href="/exchange">All exchange rates</a></div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- visit ---------- */}
      <section className="sec raise rule" aria-label="Visit">
        <div className="wrap visit">
          <div className="visit-copy">
            <p className="kicker">Visit</p>
            <h2 className="d2 rv"><span className="ln"><span>Gold looks best</span></span><span className="ln"><span><em>in person.</em></span></span></h2>
            <p className="body fade">Come in, hold it to the light and take your time. We are on Main Street in the centre of Negombo, a short drive from Bandaranaike International Airport.</p>
            <div className="direct fade">
              <a href={PHONE_HREF}><Icon n="phone" /><span><small>Call the shop</small>{PHONE}</span></a>
              <a href={`mailto:${EMAIL}`}><Icon n="mail" /><span><small>Email</small>{EMAIL}</span></a>
              <a href="/visit#enquiry"><Icon n="cal" /><span><small>Plan ahead</small>Send an enquiry before you come</span></a>
            </div>
          </div>
          <article className="showroom fade" data-d="1">
            <div className="sh-media"><img src="/img/showroom-floor.jpg" alt="Inside the Ranlanka showroom on Main Street" loading="lazy" /><span className="sh-tag">Showroom</span></div>
            <div className="sh-body">
              <h3 className="sh-name">Ranlanka Jewellery, Main Street</h3>
              <ul className="sh-rows">
                <li><Icon n="pin" /><span>192 Main Street, Negombo 11500, Sri Lanka</span></li>
                <li><Icon n="phone" /><span><a href={PHONE_HREF}>{PHONE}</a> · <a href="tel:0312238383">031 223 8383</a></span></li>
                <li><Icon n="clock" /><span data-open="">Open Monday to Saturday, 10:00 am to 7:30 pm</span></li>
              </ul>
              <p className="sh-hours">
                <span><span>Monday to Saturday</span><span>10:00 am – 7:30 pm</span></span>
                <span><span>Sundays and Poya days</span><span>Closed</span></span>
              </p>
              <div className="acts"><a className="btn solid sm" href={MAPS_URL} target="_blank" rel="noopener">Get directions</a><a className="btn sm" href="/visit">Book a visit</a></div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
