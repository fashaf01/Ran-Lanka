import { FxTable, ProductCard } from "@/components/Cards";
import { Icon, Seal } from "@/components/Icons";
import { CATS, CAT_KEYS, EMAIL, FX, HOME_FAV, MAPS_URL, PAWN_GRAMS, PHONE, PHONE_HREF, PIECES, PIECE_BY_ID, RATE, countIn, money } from "@/lib/data";

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
  const pawn22 = money(RATE[22] * PAWN_GRAMS), pawn24 = money(RATE[24] * PAWN_GRAMS);
  return (
    <div className="page" data-page="home">
      {/* ---------- hero ---------- */}
      <section className="eh" aria-label="Introduction">
        <div className="wrap eh-in">
          <span className="eh-arcade" aria-hidden="true"><svg viewBox="0 0 640 220"><use href="#rl-arcade" /></svg></span>
          <div className="eh-copy">
            <p className="kicker">22 karat gold · Negombo · since 2008</p>
            <h1 className="eh-title">Honest gold, <em>weighed in front of you.</em></h1>
            <p className="eh-lead">Ranlanka is the gold of Lanka. Necklaces, bangles and thali chains in 22 karat, each one priced by its weight at the day&apos;s rate on Main Street, Negombo.</p>
            <div className="acts eh-acts"><a className="btn solid" href="/visit">Book a visit <Icon n="right" /></a><a className="tlink" href="/collection">See the collection</a></div>
          </div>
          <div className="eh-art">
            <img className="eh-mandala" src="/img/mandala.svg" alt="" aria-hidden="true" />
            <div className="arch-rim eh-arch"><span className="arch"><img src="/img/em-gown.jpg" alt="A woman in a draped rose gown against deep green, wearing a jewelled necklace and drop earrings" fetchPriority="high" /></span></div>
            <Seal />
            <a className="eh-card" href="/collection/bangles"><img src="/img/cat-bg.webp" alt="A gold bangle on emerald silk" /><span><small>From the bangle case</small>Sized on your wrist</span></a>
          </div>
        </div>
        <div className="eh-facts">
          <div className="wrap">
            <p><b>2008</b>A small gold shop opens in Negombo town</p>
            <p><b>916</b>Parts gold in every 1,000. Only 22 karat</p>
            <p><b>{PIECES.length}</b>Pieces in the case, each with its own number</p>
            <p><b>50+</b>Currencies exchanged, with no commission</p>
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
                <a className="cat" key={k} href={`/collection/${CATS[k].slug}`}>
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

      <section className="bottle name-band" aria-label="The name">
        <span className="lace pale" aria-hidden="true"></span>
        <div className="wrap">
          <p className="name-line fade"><b lang="si">රන්</b> is the Sinhala word for gold. Ranlanka is the <em>gold of Lanka.</em></p>
          <p className="script name-sub fade">Main Street, Negombo, since 2008</p>
          <svg className="name-arcade" viewBox="0 0 640 220" aria-hidden="true"><use href="#rl-arcade" /></svg>
        </div>
      </section>


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
          <div className="compare">
            <img src="/img/starburst-sketch.webp" alt="A pencil drawing of the Starburst pendant" loading="lazy" />
            <img className="gold" src="/img/starburst-gold.webp" alt="The finished Starburst pendant in 22 karat gold" loading="lazy" />
            <span className="lab l">Sketch</span>
            <span className="lab r">Gold</span>
            <input type="range" min="0" max="100" defaultValue="50" aria-label="Compare the sketch with the finished pendant" />
            <span className="cut"><i>Drag</i></span>
          </div>
        </div>
        <div className="at-body">
          <div className="rv"><p className="kicker">Bespoke</p><h2 className="d2"><span className="ln"><span>Your sketch,</span></span><span className="ln"><span>in <em>22 karat gold.</em></span></span></h2></div>
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
            <div className="tile"><img src="/img/er3b.webp" alt="A woman wearing gold leaf drop earrings" loading="lazy" style={{ objectPosition: "50% 35%" }} /><span>Tried on at the counter</span></div>
            <div className="tile wide"><img src="/img/bride.webp" alt="A bride wearing a layered gold choker and long temple necklace" loading="lazy" style={{ objectPosition: "50% 52%" }} /><span>Designs that are passed on</span></div>
          </div>
        </div>
      </section>

      {/* ---------- at the counter ---------- */}
      <section className="sec counter" aria-label="At the counter">
        <div className="wrap ct-grid">
          <div className="ct-intro">
            <div className="rv"><p className="kicker">At the counter</p><h2 className="d2"><span className="ln"><span>More than</span></span><span className="ln"><span>the <em>jewellery case.</em></span></span></h2></div>
            <p className="body fade">Ranlanka is a working gold shop. Alongside the collection we post the day&apos;s rates, change money, buy old gold and make pieces to order.</p>
            <a className="ct-rate fade" href="/gold-rate"><small>22K today · sample</small><b>LKR {pawn22}</b><span>per pawn of 8 grams</span></a>
          </div>
          <ol className="ct-list">
            {SERVICES.map((s, i) => (
              <li key={s.name} className="fade" data-d={String(Math.min(i, 2))}>
                <a href={s.href}>
                  <span className="ct-ic"><Icon n={s.icon} /></span>
                  <span className="ct-t"><b>{s.name}</b><small>{s.text}</small></span>
                  <span className="ct-go">{s.go} <Icon n="right" /></span>
                </a>
              </li>
            ))}
          </ol>
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
            <div className="sh-media"><img src="/img/hero.webp" alt="A bride in a red and green silk saree, seated among brass oil lamps" loading="lazy" style={{ objectPosition: "50% 30%" }} /><span className="sh-tag">Main Street, Negombo</span></div>
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
