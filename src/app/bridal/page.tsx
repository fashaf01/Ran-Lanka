import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/BookingForm";
import { Button } from "@/components/Button";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Zari } from "@/components/Zari";
import { PHONE, PHONE_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "The bridal edit",
  description: "Bridal sets in 22 karat gold, tried with your saree and weighed in front of you. Book a bridal viewing at Ranlanka, Negombo.",
};

const SETS = [
  { no: "01", title: "Necklace and choker", text: "The pair for the ceremony.", a: "nk3", b: "nk4", cat: "nk" },
  { no: "02", title: "Earrings", text: "Jhumkas, or quiet drops for the days after.", a: "er2", b: "er4", cat: "er" },
  { no: "03", title: "Bangles", text: "Sized on your wrist, by the dozen.", a: "bg5", b: "bg6", cat: "bg" },
  { no: "04", title: "Thali and mangalsutra", text: "From the case, or made to your family’s design.", a: "ms1", b: "ms3", cat: "ms" },
  { no: "05", title: "Wedding rings", text: "Plain or patterned, sized at the counter.", a: "rg4", b: "rg5", cat: "rg" },
  { no: "06", title: "Pendant and chain", text: "For every day after the wedding.", a: "pd3", b: "ch2", cat: "pd" },
];

const LOOKS = [
  { src: "/img/life-bride2.jpg", alt: "A bride in a pink silk saree wearing a layered gold necklace and bangles" },
  { src: "/img/life-bride1.jpg", alt: "A bride in gold silk with a wide gold necklace set with green stones" },
  { src: "/img/life-plain.jpg", alt: "A gold necklace and matching earrings on a white stand" },
  { src: "/img/life-bride3.jpg", alt: "A bride under a veil wearing layered gold jewellery" },
  { src: "/img/life-family.jpg", alt: "Two women laughing together in silk saris and gold jewellery" },
];

const STEPS = ["We call you to agree a time", "You try each piece with your saree", "We weigh the set in front of you"];

export default function BridalPage() {
  return (
    <>
      <SiteHeader current="/bridal" />
      <main>
        {/* ======================= HERO (maroon velvet) ======================= */}
        <section className="rl-tray rl-tray--plain velvet" data-theme="maroon">
          <div className="wrap split" style={{ paddingTop: "clamp(56px, 6vw, 88px)", paddingBottom: "clamp(56px, 6vw, 88px)" }}>
            <div style={{ flex: "1 1 460px", minWidth: 0 }}>
              <nav aria-label="Breadcrumb" className="small breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span>The bridal edit</span>
              </nav>
              <p className="label kicker" style={{ marginTop: 36 }}>The bridal edit</p>
              <h1 className="title t-xl" style={{ fontSize: "clamp(44px, 5.4vw, 78px)" }}>Dressed in gold, from the tikka to the <em>bangles.</em></h1>
              <p className="lede lede-p">
                Bring the family and take your time. We set out the trays, try every piece with your saree and weigh the whole set in front of you, so you know the price before you choose.
              </p>
              <div className="btn-row" style={{ marginTop: 36 }}>
                <Button variant="gold" icon href="#book">Book a bridal viewing</Button>
                <Button variant="line" icon="phone" href={PHONE_HREF}>{PHONE}</Button>
              </div>
            </div>
            <div style={{ flex: "0 1 460px", minWidth: 0 }}>
              <div style={{ position: "relative", aspectRatio: "2 / 3", overflow: "hidden", background: "var(--maroon-deep)" }}>
                <img src="/img/bride-red-green.webp" alt="A bride in a red and green silk saree wearing a gold tikka, choker, long necklace, jhumkas, rings and stacked bangles" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <span aria-hidden="true" style={{ position: "absolute", inset: 12, boxShadow: "inset 0 0 0 1px color-mix(in srgb, #dcb873 50%, transparent)" }} />
              </div>
            </div>
          </div>
          <Zari edge="bottom" />
        </section>

        {/* ======================= BUILD THE SET ======================= */}
        <section className="lampbg sec" data-theme="lamp">
          <div className="wrap">
            <div className="head-row">
              <div>
                <p className="label kicker">Build the set</p>
                <h2 className="title t-lg">Six pieces most brides choose.</h2>
              </div>
              <p className="body muted" style={{ margin: 0, maxWidth: "40ch" }}>Start with one, or bring the whole family and choose the set together at the counter.</p>
            </div>
            <div className="grid-auto" style={{ ["--min" as string]: "360px", marginTop: 44 }}>
              {SETS.map((s) => (
                <Link key={s.no} className="set" href={`/collection?cat=${s.cat}`}>
                  <span style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16 }}>
                    <span style={{ display: "grid", gap: 6 }}>
                      <span className="label goldink" style={{ fontSize: 10.5 }}>{s.no}</span>
                      <span className="piece-name" style={{ fontSize: 23 }}>{s.title}</span>
                    </span>
                    <span className="label goldink" style={{ fontSize: 10 }}>See</span>
                  </span>
                  <span className="small muted" style={{ marginTop: -8 }}>{s.text}</span>
                  <span style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10 }}>
                    {[s.a, s.b].map((id) => (
                      <span key={id} style={{ position: "relative", display: "block", aspectRatio: "1", overflow: "hidden", background: "var(--cream)" }}>
                        <img src={`/img/${id}a.jpg`} alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "multiply" }} />
                      </span>
                    ))}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ======================= INSPIRATION (emerald velvet) ======================= */}
        <section className="rl-tray rl-tray--plain velvet sec-sm" data-theme="velvet">
          <div className="wrap">
            <div className="head-row">
              <div>
                <p className="label kicker">Bridal inspiration</p>
                <h2 className="title t-md" style={{ fontSize: "clamp(32px, 3.4vw, 48px)" }}>Looks to bring to the counter.</h2>
              </div>
              <p className="small muted" style={{ margin: 0, maxWidth: "36ch" }}>Show us a look you love and we will put a set together from the case, or make it.</p>
            </div>
            <div className="grid-auto" style={{ ["--min" as string]: "200px", ["--gap" as string]: "14px", marginTop: 36 }}>
              {LOOKS.map((l) => (
                <figure key={l.src} className="insp">
                  <img src={l.src} alt={l.alt} loading="lazy" />
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ======================= BOOK A VIEWING ======================= */}
        <section id="book" className="lampbg sec" data-theme="lamp">
          <div className="wrap split split--top">
            <div style={{ flex: "1 1 380px", minWidth: 0 }}>
              <p className="label kicker">Book a bridal viewing</p>
              <h2 className="title t-lg">We set out the trays for you.</h2>
              <p className="body-p" style={{ maxWidth: "42ch" }}>Tell us when the wedding is and who is coming. We call you back to agree a time, and have the pieces ready when you arrive.</p>
              <ol style={{ listStyle: "none", margin: "32px 0 0", padding: 0, borderTop: "1px solid var(--line)" }}>
                {STEPS.map((s, i) => (
                  <li key={s} style={{ display: "flex", gap: 18, padding: "16px 0", borderBottom: "1px solid var(--line)" }}>
                    <span className="label goldink" style={{ fontSize: 10.5, paddingTop: 3 }}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="piece-name" style={{ fontSize: 19 }}>{s}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rl-tray velvet" data-theme="maroon" style={{ flex: "1 1 520px", minWidth: 0, borderRadius: 2, padding: "clamp(28px, 3vw, 44px)" }}>
              <BookingForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
