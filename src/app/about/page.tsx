import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Zari } from "@/components/Zari";

export const metadata: Metadata = {
  title: "Our story",
  description: "Ran is the Sinhala word for gold. Since 2008 Ranlanka has sold 916 gold on Main Street, Negombo: pure, weighed in the open and priced at the day’s rate.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader current="/about" />
      <main>
        {/* ======================= THE STORY ======================= */}
        <section className="lampbg page-head" data-theme="lamp">
          <div className="wrap">
            <nav aria-label="Breadcrumb" className="small breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>Our story</span>
            </nav>
            <div className="split" style={{ marginTop: 28 }}>
              <div style={{ flex: "1 1 460px", minWidth: 0 }}>
                <p className="metal" lang="si" aria-label="රන්, ran, the Sinhala word for gold" style={{ margin: 0, fontFamily: "var(--font-sinhala)", fontWeight: 500, fontSize: "clamp(110px, 12vw, 180px)", lineHeight: 1, width: "fit-content" }}>රන්</p>
                <p className="label muted" style={{ margin: "14px 0 0", letterSpacing: "0.34em", fontSize: 11 }}>Ran · Gold</p>
                <h1 className="title" style={{ margin: "36px 0 0", fontSize: "clamp(40px, 4.6vw, 66px)", textWrap: "balance" }}>The gold of Lanka, sold the <em>honest</em> way.</h1>
                <p className="lede" style={{ margin: "26px 0 0", color: "var(--ink-muted)", maxWidth: "46ch" }}>
                  Ran is the Sinhala word for gold. In 2008 Mr. Anas opened a small shop in Negombo to sell it the way he wanted to buy it: pure, weighed in the open and priced at the day’s rate.
                </p>
                <p className="body muted" style={{ margin: "18px 0 0", maxWidth: "50ch" }}>
                  Today the showroom is on Main Street, and the promise has not changed. Every piece is 916 gold, every piece is weighed in front of you, and the rate is posted every morning.
                </p>
              </div>
              <div style={{ flex: "0 1 520px", minWidth: 0 }}>
                <div className="framed" style={{ aspectRatio: "4 / 5" }}>
                  <img src="/img/hands-bangles.webp" alt="Hands with gold rings and a stack of gold bangles, over a red and green silk saree" style={{ objectPosition: "40% 50%" }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= WHAT HAS NEVER CHANGED (maroon) ======================= */}
        <section className="rl-tray rl-tray--plain velvet" data-theme="maroon" aria-label="How we work">
          <Zari edge="top" />
          <div className="wrap" style={{ paddingTop: 56, paddingBottom: 56 }}>
            <h2 className="title" style={{ margin: "0 0 40px", fontSize: "clamp(32px, 3.4vw, 46px)" }}>Four things we have never changed.</h2>
            <div className="grid-auto" style={{ ["--min" as string]: "230px", ["--gap" as string]: "36px 40px" }}>
              <div className="stat">
                <span className="rl-figures stat__fig metal">916</span>
                <h3 className="piece-name">Pure twenty-two karat</h3>
                <p className="small">Every piece is 916 gold: strong enough for every day, pure enough to keep.</p>
              </div>
              <div className="stat">
                <span className="stat__icon"><Icon name="scale" size={40} /></span>
                <h3 className="piece-name">Weighed in front of you</h3>
                <p className="small">Priced by the pawn at the day’s rate. You see the scale, the weight and the sum.</p>
              </div>
              <div className="stat">
                <span className="stat__icon"><Icon name="sketch" size={40} /></span>
                <h3 className="piece-name">Made to your design</h3>
                <p className="small">Bring a sketch or an heirloom. We draw it with you and make it here in Negombo.</p>
              </div>
              <div className="stat">
                <span className="rl-figures stat__fig metal">50+</span>
                <h3 className="piece-name">Money exchange</h3>
                <p className="small">More than fifty currencies at the same counter, with no commission.</p>
              </div>
            </div>
          </div>
          <Zari edge="bottom" />
        </section>

        {/* ======================= LAMPLIGHT BAND ======================= */}
        <section aria-label="Since 2008" style={{ position: "relative", minHeight: 520, overflow: "hidden", background: "#000", display: "flex", alignItems: "center" }}>
          <img src="/img/hero.webp" alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "20% 60%" }} />
          <span aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.75) 55%, rgba(0, 0, 0, 0.92) 100%)" }} />
          <div style={{ position: "relative", width: "100%", maxWidth: 1320, margin: "0 auto", padding: "72px var(--gutter)", display: "flex", justifyContent: "flex-end" }}>
            <div style={{ maxWidth: 520 }}>
              <p className="label" style={{ margin: 0, color: "#dcb873", fontSize: 11 }}>Since 2008</p>
              <p className="title" style={{ margin: "20px 0 0", color: "#f2ebdd", fontSize: "clamp(34px, 3.6vw, 52px)" }}>The same counter, the same scale and the same rules since the first day.</p>
            </div>
          </div>
        </section>

        {/* ======================= THE SHOWROOM ======================= */}
        <section className="lampbg sec" data-theme="lamp">
          <div className="wrap split">
            <div style={{ flex: "1 1 420px", minWidth: 0 }}>
              <p className="label kicker">The showroom</p>
              <h2 className="title t-lg">192 Main Street, <em>Negombo.</em></h2>
              <p className="body-p" style={{ maxWidth: "44ch" }}>Come in to see a piece, have one sized, sell old gold or change money. We bring out the trays and take as long as you need.</p>
              <div className="btn-row" style={{ marginTop: 32 }}>
                <Button variant="gold" icon="pin" href="/visit">Plan your visit</Button>
                <Button variant="line" icon href="/collection">See the collection</Button>
              </div>
            </div>
            <div style={{ flex: "1 1 460px", minWidth: 0, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 14 }}>
              <figure style={{ margin: 0 }}>
                <img src="/img/showroom-counter.jpg" alt="The counter at the Ranlanka showroom, with customers being served" loading="lazy" style={{ display: "block", width: "100%", aspectRatio: "1", objectFit: "cover" }} />
                <figcaption className="small muted" style={{ marginTop: 10 }}>The counter</figcaption>
              </figure>
              <figure style={{ margin: 0 }}>
                <img src="/img/showroom-floor.jpg" alt="The showroom floor, with seating along the glass counters" loading="lazy" style={{ display: "block", width: "100%", aspectRatio: "1", objectFit: "cover" }} />
                <figcaption className="small muted" style={{ marginTop: 10 }}>The showroom floor</figcaption>
              </figure>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
