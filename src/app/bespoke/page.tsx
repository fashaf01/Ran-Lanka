import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { DesignForm } from "@/components/DesignForm";
import { Icon } from "@/components/Icon";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WipeCompare } from "@/components/WipeCompare";
import { Zari } from "@/components/Zari";
import { EMAIL, PHONE, PHONE_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "Design your own",
  description: "Bring a sketch, a photograph or a family piece. We draw it with you, tell you its weight before anything is made, and finish it by hand in Negombo.",
};

const HOW = [
  { n: "01", title: "Bring your idea", text: "A sketch, a photo on your phone, or a family piece to remake." },
  { n: "02", title: "See it drawn", text: "With its weight in pawn, before anything is cast." },
  { n: "03", title: "Agree the price", text: "At that day’s gold rate, so the cost is clear from the start." },
  { n: "04", title: "Collect your piece", text: "Finished by hand and weighed with you at the counter." },
];

const WAYS = [
  { icon: "exchange" as const, title: "Remake an heirloom", text: "Bring your mother’s chain or a broken bangle. We weigh it in front of you and remake it into something you will wear." },
  { icon: "sketch" as const, title: "Your own design", text: "A drawing on paper is enough to start. We draw it properly with you and show you the weight." },
  { icon: "scale" as const, title: "A thali to your family’s design", text: "Tell us the pattern your family wears and we make it in 22 karat gold, ready for the wedding." },
];

export default function BespokePage() {
  return (
    <>
      <SiteHeader current="/bespoke" />
      <main>
        {/* ======================= HERO WITH THE DRAWING ======================= */}
        <section className="lampbg page-head" data-theme="lamp">
          <div className="wrap">
            <nav aria-label="Breadcrumb" className="small breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>Design your own</span>
            </nav>
            <div className="split" style={{ marginTop: 28 }}>
              <div style={{ flex: "1 1 420px", minWidth: 0 }}>
                <p className="label kicker">Design your own</p>
                <h1 className="title t-xl">From a drawing to the <em>counter.</em></h1>
                <p className="lede lede-p">Bring a sketch, a photograph or a family piece to remake. We draw it with you, tell you its weight before anything is made, and finish it by hand here in Negombo.</p>
                <div className="btn-row" style={{ marginTop: 34 }}>
                  <Button variant="gold" icon="sketch" href="#start">Start a design</Button>
                  <Button variant="line" icon="phone" href={PHONE_HREF}>Talk to us first</Button>
                </div>
              </div>
              <div style={{ flex: "1 1 500px", minWidth: 0, maxWidth: 620 }}>
                <WipeCompare sketch="/img/starburst-sketch.png" gold="/img/starburst-gold.webp" sketchAlt="A pencil drawing of the Starburst pendant" goldAlt="The finished Starburst pendant in 22 karat gold" />
                <p className="small muted" style={{ margin: "16px 0 0", display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                  <span>Starburst · sketch 2 · 38 mm · 6.4 g</span>
                  <span>Drag across the drawing</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= HOW IT WORKS (maroon band) ======================= */}
        <section className="rl-tray rl-tray--plain velvet" data-theme="maroon" aria-label="How it works">
          <Zari edge="top" />
          <div className="wrap grid-auto" style={{ ["--min" as string]: "240px", ["--gap" as string]: "36px 40px", paddingTop: 56, paddingBottom: 56 }}>
            {HOW.map((s) => (
              <div key={s.n} className="stat" style={{ gap: 12 }}>
                <span className="rl-figures stat__fig metal" style={{ fontSize: 52 }}>{s.n}</span>
                <h2 className="piece-name" style={{ fontSize: 22 }}>{s.title}</h2>
                <p className="small">{s.text}</p>
              </div>
            ))}
          </div>
          <Zari edge="bottom" />
        </section>

        {/* ======================= WHAT WE MAKE ======================= */}
        <section className="lampbg sec" data-theme="lamp">
          <div className="wrap">
            <p className="label kicker">What we make</p>
            <h2 className="title t-lg">Three ways to begin.</h2>
            <div className="grid-auto" style={{ ["--min" as string]: "300px", marginTop: 40 }}>
              {WAYS.map((w) => (
                <div key={w.title} className="card" style={{ padding: 30 }}>
                  <span className="goldink"><Icon name={w.icon} size={32} /></span>
                  <h3 className="piece-name" style={{ fontSize: 24 }}>{w.title}</h3>
                  <p className="small muted" style={{ fontSize: 14 }}>{w.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======================= START A DESIGN (emerald form) ======================= */}
        <section id="start" className="rl-tray rl-tray--plain velvet sec" data-theme="velvet">
          <div className="wrap split split--top">
            <div style={{ flex: "1 1 360px", minWidth: 0 }}>
              <p className="label kicker">Start a design</p>
              <h2 className="title t-lg">Tell us what you have in mind.</h2>
              <p className="body-p" style={{ maxWidth: "40ch" }}>We call you back, and you bring the idea to the counter. Nothing is made until you have seen the drawing and agreed the weight.</p>
              <p className="small muted" style={{ margin: "28px 0 0" }}>
                Prefer to talk? Call <a href={PHONE_HREF} style={{ color: "var(--ink)" }}>{PHONE}</a> or write to <a href={`mailto:${EMAIL}`} style={{ color: "var(--ink)" }}>{EMAIL}</a>.
              </p>
            </div>
            <div style={{ flex: "1 1 540px", minWidth: 0, padding: "clamp(28px, 3vw, 44px)", background: "color-mix(in srgb, #000000 18%, transparent)", boxShadow: "inset 0 0 0 1px var(--line)" }}>
              <DesignForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
