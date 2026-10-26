import Link from "next/link";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { ProductTile } from "@/components/ProductTile";
import { RateChip } from "@/components/RateChip";
import { SiteFooter } from "@/components/SiteFooter";
import { StatusHeading } from "@/components/StatusHeading";
import { WipeCompare } from "@/components/WipeCompare";
import { Zari } from "@/components/Zari";
import { CATEGORIES, countIn, getPiece } from "@/lib/catalogue";
import { GRAM22, GRAM24, PAWN_GRAMS, PHONE, PHONE_HREF, money } from "@/lib/site";

const TILES = [
  { name: "Necklaces", cat: "nk", img: "/img/life-necklace.jpg" },
  { name: "Bangles", cat: "bg", img: "/img/cat-bg.jpg" },
  { name: "Earrings", cat: "er", img: "/img/cat-er.jpg" },
  { name: "Rings", cat: "rg", img: "/img/cat-rg.jpg" },
  { name: "Pendants", cat: "pd", img: "/img/cat-pd.jpg" },
  { name: "Chains", cat: "ch", img: "/img/cat-ch.jpg" },
  { name: "Bracelets", cat: "br", img: "/img/cat-br.jpg" },
  { name: "Thali and mangalsutra", cat: "ms", img: "/img/cat-ms.jpg" },
];

const FEATURED = ["nk2", "bg5", "er2", "rg4", "pd3", "br7", "nk4", "bg6"];

const GLINTS = [
  { left: "45%", top: "12.7%", delay: "2.1s" },
  { left: "48.7%", top: "42.1%", delay: "2.45s" },
  { left: "49.8%", top: "61.6%", delay: "2.8s" },
  { left: "57%", top: "77.4%", delay: "3.15s" },
  { left: "53.3%", top: "30.2%", delay: "3.5s" },
  { left: "48.1%", top: "78.6%", delay: "3.85s" },
];

const BRIDAL_CROPS = [
  { label: "Tikka", alt: "The gold tikka at the parting", pos: "40% 13%", scale: 2.6 },
  { label: "Jhumkas", alt: "Gold jhumka earrings", pos: "61% 31%", scale: 3 },
  { label: "Choker and necklace", alt: "A gold choker and long necklace", pos: "51% 52%", scale: 2 },
];

const PROMISES = [
  { fig: "916", title: "Pure twenty-two karat", text: "Every piece is 916 gold: strong enough for every day, pure enough to keep." },
  { icon: "scale" as const, title: "Weighed in front of you", text: "Priced by the pawn at the day’s rate. You see the scale, the weight and the sum." },
  { fig: "2008", title: "On Main Street since 2008", text: "The same counter, the same scale and the same rules since the first day." },
  { fig: "50+", title: "Money exchange", text: "More than fifty currencies at the same counter, with no commission." },
];

export default function HomePage() {
  const pawn = GRAM22 * PAWN_GRAMS;
  return (
    <>
      {/* ======================= HERO ======================= */}
      <section id="top" className="rl-lamp" data-theme="night" aria-label="Ranlanka" style={{ height: "clamp(640px, 100svh, 900px)" }}>
        <div className="rl-lamp__stage" style={{ ["--fx" as string]: 0.52 }}>
          <div className="rl-lamp__cam">
            <img
              className="rl-lamp__img"
              src="/img/hero.webp"
              alt="A bride in a green silk saree with a red and gold border, wearing a gold choker, a long gold necklace, bangles and rings, seated among lit brass oil lamps"
              fetchPriority="high"
            />
            <div className="rl-lamp__gold hero-gold" aria-hidden="true">
              <span className="rl-lamp__bloom"><i /></span>
              <span className="rl-lamp__pass"><i /></span>
            </div>
            <div className="rl-lamp__light" aria-hidden="true">
              <span className="rl-lamp__beam" />
              <span className="rl-lamp__key" />
              {GLINTS.map((g) => (
                <span key={g.top} className="rl-glint" style={{ left: g.left, top: g.top, animationDelay: g.delay }} />
              ))}
            </div>
          </div>
        </div>
        <div className="rl-lamp__shade" aria-hidden="true" />
        <header className="rl-header">
          <nav className="rl-header__nav" aria-label="Main">
            <Link href="/collection">Collection</Link>
            <Link href="/bridal">Bridal</Link>
            <Link href="/bespoke">Bespoke</Link>
            <Link href="/visit">Visit</Link>
          </nav>
          <Link href="/" aria-label="Ranlanka, home">
            <img className="rl-header__logo" src="/img/logo.png" alt="Ranlanka" height={22} />
          </Link>
          <div className="rl-header__end">
            <RateChip label="22K pawn" value={pawn} href="/gold-rate" />
            <Button variant="line" size="sm" href="/visit">Book a viewing</Button>
          </div>
        </header>
        <div className="rl-lamp__ui">
          <div className="rl-lamp__copy">
            <p className="rl-eyebrow eyebrow">Twenty-two karat · Negombo</p>
            <h1 className="rl-lamp__title display-hero">
              The gold<br />of <em>Lanka.</em>
            </h1>
            <p className="rl-lamp__lede lede">Bridal sets and fine jewellery in 916 gold, weighed in front of you on Main Street since 2008.</p>
            <div className="rl-lamp__actions">
              <Button variant="gold" icon href="/collection">See the collection</Button>
              <Button variant="line" href="/visit">Visit the showroom</Button>
            </div>
          </div>
        </div>
        <div className="rl-lamp__foot" aria-hidden="true">
          <span>192 Main Street · Since 2008</span>
          <span className="rl-lamp__scroll">Scroll<i /></span>
        </div>
      </section>

      {/* ======================= STICKY BAR ======================= */}
      <header data-theme="lamp" className="sticky-mini">
        <div className="sticky-mini__in">
          <Link href="/" aria-label="Ranlanka, home" style={{ display: "block" }}>
            <img src="/img/logo.png" alt="Ranlanka" style={{ height: 17, width: "auto", display: "block" }} />
          </Link>
          <nav className="nav" aria-label="Sections">
            <Link className="label" href="/collection">Collection</Link>
            <Link className="label" href="/bridal">Bridal</Link>
            <Link className="label" href="/bespoke">Bespoke</Link>
            <Link className="label" href="/gold-rate">Gold rate</Link>
            <Link className="label" href="/about">Our story</Link>
            <Link className="label" href="/visit">Visit</Link>
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span className="hide-sm"><RateChip label="22K pawn" value={pawn} href="/gold-rate" /></span>
            <Button variant="gold" size="sm" icon="phone" href={PHONE_HREF}>Call</Button>
          </div>
        </div>
      </header>

      <main id="main">
        {/* ======================= WHAT ARE YOU LOOKING FOR? ======================= */}
        <section className="lampbg" data-theme="lamp" style={{ padding: "clamp(64px, 6.5vw, 96px) 0 clamp(72px, 7vw, 104px)" }}>
          <div className="wrap">
            <div className="rise head-row">
              <div>
                <p className="label kicker">The collection</p>
                <h2 className="title t-lg">What are you looking for?</h2>
              </div>
              <Link className="label more-link" href="/collection">See all {countIn("all")} pieces</Link>
            </div>
            <div className="grid-auto" style={{ ["--min" as string]: "260px", ["--gap" as string]: "20px", marginTop: 44 }}>
              {TILES.map((t) => (
                <Link key={t.cat} className="tile" href={`/collection?cat=${t.cat}`}>
                  <img src={t.img} alt="" loading="lazy" />
                  <span className="tile__shade" aria-hidden="true" />
                  <span className="tile__rule" aria-hidden="true" />
                  <span className="tile__cap">
                    <span className="piece-name" style={{ fontSize: 24 }}>{t.name}</span>
                    <span className="label" style={{ color: "#e2c27e", fontSize: 10, whiteSpace: "nowrap" }}>{countIn(t.cat)} pieces</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ======================= THE BRIDAL EDIT (maroon velvet) ======================= */}
        <section className="rl-tray rl-tray--plain velvet" data-theme="maroon">
          <Zari edge="top" />
          <div className="wrap split" style={{ paddingTop: "clamp(64px, 6.5vw, 96px)", paddingBottom: "clamp(64px, 6.5vw, 96px)" }}>
            <div className="rise" style={{ flex: "1 1 400px", minWidth: 0, maxWidth: 520 }}>
              <div style={{ position: "relative", aspectRatio: "2 / 3", overflow: "hidden", background: "var(--maroon-deep)" }}>
                <img src="/img/bride-red-green.webp" alt="A bride in a red and green silk saree wearing a gold tikka, choker, long necklace, jhumkas, rings and stacked bangles" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
                <span aria-hidden="true" style={{ position: "absolute", inset: 12, boxShadow: "inset 0 0 0 1px color-mix(in srgb, #dcb873 50%, transparent)" }} />
              </div>
            </div>
            <div className="rise" style={{ flex: "1 1 440px", minWidth: 0 }}>
              <p className="label kicker">The bridal edit</p>
              <h2 className="title t-split">Dressed in gold, from the tikka to the <em>bangles.</em></h2>
              <p className="body" style={{ margin: "22px 0 0", color: "var(--ink-muted)", maxWidth: "46ch", fontSize: 17 }}>
                Bring the family and take your time. We set out the trays, try every piece with your saree and weigh the whole set in front of you, so you know the price before you choose.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14, marginTop: 36, maxWidth: 480 }}>
                {BRIDAL_CROPS.map((c) => (
                  <figure key={c.label} style={{ margin: 0 }}>
                    <div style={{ aspectRatio: "1", overflow: "hidden", background: "var(--maroon-deep)" }}>
                      <img src="/img/bride-red-green.webp" alt={c.alt} loading="lazy" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: c.pos, transform: `scale(${c.scale})`, transformOrigin: c.pos }} />
                    </div>
                    <figcaption className="small" style={{ marginTop: 10, color: "var(--ink)" }}>{c.label}</figcaption>
                  </figure>
                ))}
              </div>
              <div className="btn-row" style={{ marginTop: 36 }}>
                <Button variant="gold" icon href="/bridal">See the bridal edit</Button>
                <Button variant="line" icon="phone" href={PHONE_HREF}>Book a viewing</Button>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= NEW IN THE CASE ======================= */}
        <section className="lampbg" data-theme="lamp" style={{ padding: "clamp(72px, 7vw, 104px) 0" }}>
          <div className="wrap">
            <div className="rise head-row">
              <div>
                <p className="label kicker">New in the case</p>
                <h2 className="title t-lg">Pieces from the case.</h2>
              </div>
              <p className="body muted" style={{ margin: 0, maxWidth: "40ch" }}>All in 22 karat gold. Every piece is weighed in front of you and priced at the day’s rate.</p>
            </div>
            <div className="grid-auto" style={{ ["--min" as string]: "250px", ["--gap" as string]: "36px 22px", marginTop: 44 }}>
              {FEATURED.map((id) => {
                const p = getPiece(id)!;
                return <ProductTile key={id} piece={p} kind={CATEGORIES.find((c) => c.key === p.cat)?.kind ?? ""} />;
              })}
            </div>
            <div className="rise" style={{ display: "flex", justifyContent: "center", marginTop: 48 }}>
              <Button variant="line" icon href="/collection">See all {countIn("all")} pieces</Button>
            </div>
          </div>
        </section>

        {/* ======================= WHY RANLANKA ======================= */}
        <section className="rl-tray rl-tray--plain velvet" data-theme="maroon" aria-label="How we work">
          <Zari edge="top" />
          <div className="wrap grid-auto" style={{ ["--min" as string]: "230px", ["--gap" as string]: "36px 40px", paddingTop: 52, paddingBottom: 52 }}>
            {PROMISES.map((p) => (
              <div key={p.title} className="rise stat">
                {"fig" in p ? (
                  <span className="rl-figures stat__fig metal">{p.fig}</span>
                ) : (
                  <span className="stat__icon"><Icon name={p.icon} size={40} /></span>
                )}
                <h3 className="piece-name">{p.title}</h3>
                <p className="small">{p.text}</p>
              </div>
            ))}
          </div>
          <Zari edge="bottom" />
        </section>

        {/* ======================= DESIGN YOUR OWN ======================= */}
        <section className="lampbg" data-theme="lamp" style={{ padding: "clamp(72px, 7vw, 104px) 0" }}>
          <div className="wrap split">
            <div className="rise" style={{ flex: "1 1 420px", minWidth: 0 }}>
              <p className="label kicker">Design your own</p>
              <h2 className="title t-split">From a drawing to the counter.</h2>
              <p className="body-p" style={{ maxWidth: "44ch" }}>
                Bring a sketch, a photograph or a family piece to remake. We draw it with you, tell you its weight before anything is made, and finish it by hand.
              </p>
              <div className="btn-row" style={{ marginTop: 32 }}>
                <Button variant="gold" icon="sketch" href="/bespoke">Start a design</Button>
              </div>
            </div>
            <div className="rise" style={{ flex: "1 1 480px", minWidth: 0, maxWidth: 580 }}>
              <WipeCompare sketch="/img/starburst-sketch.png" gold="/img/starburst-gold.webp" sketchAlt="A pencil drawing of the Starburst pendant" goldAlt="The finished Starburst pendant in 22 karat gold" />
              <p className="small muted" style={{ margin: "16px 0 0", display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                <span>Starburst · sketch 2 · 38 mm · 6.4 g</span>
                <span>Drag across the drawing</span>
              </p>
            </div>
          </div>
        </section>

        {/* ======================= TODAY: RATE AND VISIT ======================= */}
        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(480px, 100%), 1fr))" }}>
          <div className="rl-tray rl-tray--plain velvet" data-theme="velvet" style={{ padding: "clamp(56px, 5.5vw, 80px) var(--gutter)" }}>
            <div className="rise" style={{ maxWidth: 600, marginLeft: "auto" }}>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, paddingBottom: 18, borderBottom: "1px solid var(--line)" }}>
                <span className="label kicker">The gold rate today</span>
                <span className="label muted" style={{ fontSize: 10 }}>Posted 9.30 am · Sample</span>
              </div>
              <p style={{ margin: "30px 0 0", display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 14 }}>
                <span className="rl-figures metal" style={{ fontFamily: "var(--font-display)", fontWeight: 200, fontSize: "clamp(64px, 7vw, 108px)", lineHeight: 0.88, letterSpacing: "-0.03em" }}>{money(pawn)}</span>
                <span className="label goldink">LKR</span>
              </p>
              <p className="small muted" style={{ margin: "14px 0 0" }}>
                One pawn of 22 karat gold, {PAWN_GRAMS} g · LKR {money(GRAM22)} a gram · 24 karat LKR {money(GRAM24)} a gram
              </p>
              <div style={{ marginTop: 30 }}>
                <Button variant="line" icon href="/gold-rate">Rates and exchange</Button>
              </div>
            </div>
          </div>
          <div className="lampbg" data-theme="lamp" style={{ padding: "clamp(56px, 5.5vw, 80px) var(--gutter)" }}>
            <div className="rise" style={{ maxWidth: 600 }}>
              <div style={{ paddingBottom: 18, borderBottom: "1px solid var(--line)" }}>
                <span className="label kicker">Visit the showroom</span>
              </div>
              <StatusHeading style={{ margin: "30px 0 0", fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(34px, 3.4vw, 50px)", lineHeight: 1.08, letterSpacing: "-0.015em", color: "var(--ink)" }} />
              <p className="small muted" style={{ margin: "14px 0 0" }}>192 Main Street, Negombo · Monday to Saturday, 10 am to 7.30 pm</p>
              <div className="btn-row" style={{ marginTop: 30 }}>
                <Button variant="gold" icon="pin" href="/visit">Plan your visit</Button>
                <Button variant="line" icon="phone" href={PHONE_HREF}>{PHONE}</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
