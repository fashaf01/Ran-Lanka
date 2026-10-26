import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { GoldCalculator } from "@/components/GoldCalculator";
import { GoldRatePosted } from "@/components/GoldRatePosted";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Zari } from "@/components/Zari";
import { FX, GRAM22, GRAM24, PAWN_GRAMS, money } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gold rate and exchange",
  description: "Today’s 22 and 24 karat gold rate per gram and per pawn, a price calculator, money exchange rates and how we buy old gold at Ranlanka, Negombo.",
};

const OLD_GOLD = [
  { n: "01", title: "Bring it to the counter", text: "A broken chain, a single earring, a piece you no longer wear." },
  { n: "02", title: "We weigh it in front of you", text: "You see the scale and the weight, and we tell you what we can offer before you decide." },
  { n: "03", title: "Take the money, or a new piece", text: "Or have it remade into something you will wear." },
];

export default function GoldRatePage() {
  return (
    <>
      <SiteHeader current="/gold-rate" />
      <main>
        {/* ======================= TODAY'S BOARD (emerald) ======================= */}
        <section className="rl-tray rl-tray--plain velvet" data-theme="velvet" style={{ padding: "32px 0 clamp(56px, 5.5vw, 80px)" }}>
          <div className="wrap">
            <nav aria-label="Breadcrumb" className="small breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>Gold rate and exchange</span>
            </nav>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", gap: "12px 32px", marginTop: 36, paddingBottom: 20, borderBottom: "1px solid var(--line)" }}>
              <h1 className="label kicker">The gold rate today</h1>
              <GoldRatePosted />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "36px 64px", marginTop: 40 }}>
              <div style={{ minWidth: 0 }}>
                <p style={{ margin: 0, display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 18 }}>
                  <span className="rl-figures metal" style={{ fontFamily: "var(--font-display)", fontWeight: 200, fontSize: "clamp(80px, 12.5vw, 188px)", lineHeight: 0.86, letterSpacing: "-0.035em", fontVariationSettings: "'opsz' 72" }}>{money(GRAM22 * PAWN_GRAMS)}</span>
                  <span className="label goldink">LKR</span>
                </p>
                <p className="body muted" style={{ margin: "18px 0 0" }}>One pawn of 22 karat gold, {PAWN_GRAMS} g. Every piece in the case is priced from this, every morning.</p>
              </div>
              <div style={{ flex: "0 1 340px", minWidth: 240, display: "grid" }}>
                {[
                  ["22 karat · per gram", GRAM22],
                  ["24 karat · per gram", GRAM24],
                ].map(([k, v], i) => (
                  <div key={k} style={{ padding: i === 0 ? "0 0 18px" : "18px 0 0", borderBottom: i === 0 ? "1px solid var(--line)" : undefined }}>
                    <p className="label muted" style={{ margin: 0, fontSize: 10.5 }}>{k}</p>
                    <p style={{ margin: "10px 0 0", display: "flex", alignItems: "baseline", gap: 10 }}>
                      <span className="rl-figures" style={{ fontFamily: "var(--font-display)", fontWeight: 250, fontSize: 46, lineHeight: 1 }}>{money(v as number)}</span>
                      <span className="label muted" style={{ fontSize: 10.5 }}>LKR</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ======================= WORK OUT A PRICE ======================= */}
        <section className="lampbg sec" data-theme="lamp">
          <div className="wrap" style={{ display: "flex", flexWrap: "wrap", alignItems: "stretch", gap: "40px clamp(40px, 5vw, 80px)" }}>
            <div style={{ flex: "1 1 380px", minWidth: 0 }}>
              <p className="label kicker">Work out a price</p>
              <h2 className="title t-lg">What does a weight cost today?</h2>
              <p className="body-p" style={{ maxWidth: "42ch" }}>Type a weight, or pick a number of pawns. This is the gold alone, at today’s sample rate. At the counter we weigh the piece itself.</p>
            </div>
            <GoldCalculator />
          </div>
        </section>

        {/* ======================= MONEY EXCHANGE (maroon) ======================= */}
        <section className="rl-tray rl-tray--plain velvet" data-theme="maroon">
          <Zari edge="top" />
          <div className="wrap" style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "40px clamp(40px, 5vw, 80px)", paddingTop: "clamp(56px, 5.5vw, 80px)", paddingBottom: "clamp(56px, 5.5vw, 80px)" }}>
            <div style={{ flex: "1 1 340px", minWidth: 0 }}>
              <p className="label kicker">Money exchange</p>
              <h2 className="title t-lg">More than fifty currencies, no commission.</h2>
              <p className="body muted" style={{ margin: "20px 0 0", maxWidth: "40ch" }}>At the same counter as the gold. Rates change through the day; these are samples.</p>
            </div>
            <div style={{ flex: "1 1 460px", minWidth: 0 }}>
              <div className="fx">
                <span className="label fx__head">Currency</span>
                <span className="label fx__head" style={{ textAlign: "right" }}>LKR for one</span>
                {FX.map((f) => (
                  <Fragment key={f.code}>
                    <span className="fx__code">
                      <b className="label goldink" style={{ fontSize: 11 }}>{f.code}</b>
                      <span className="small muted">{f.name}</span>
                    </span>
                    <span className="rl-figures fx__rate">{f.rate}</span>
                  </Fragment>
                ))}
              </div>
              <p className="small muted" style={{ margin: "16px 0 0" }}>Other currencies at the counter. Call 031 222 2202 to check a rate.</p>
            </div>
          </div>
          <Zari edge="bottom" />
        </section>

        {/* ======================= OLD GOLD ======================= */}
        <section className="lampbg sec" data-theme="lamp">
          <div className="wrap">
            <div className="head-row">
              <div>
                <p className="label kicker">Old gold</p>
                <h2 className="title t-lg">Sell it, or turn it into something new.</h2>
              </div>
              <Button variant="line" icon="pin" href="/visit">Bring it in</Button>
            </div>
            <div className="grid-auto" style={{ ["--min" as string]: "280px", marginTop: 40 }}>
              {OLD_GOLD.map((s) => (
                <div key={s.n} className="card" style={{ gap: 12 }}>
                  <span className="label goldink" style={{ fontSize: 10.5 }}>{s.n}</span>
                  <h3 className="piece-name" style={{ fontSize: 23 }}>{s.title}</h3>
                  <p className="small muted" style={{ fontSize: 14 }}>{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
