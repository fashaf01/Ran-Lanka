import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Icon } from "@/components/Icon";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StatusHeading } from "@/components/StatusHeading";
import { WeekStrip } from "@/components/WeekStrip";
import { EMAIL, MAPS_URL, PHONE, PHONE_2, PHONE_2_HREF, PHONE_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "Visit",
  description: "Ranlanka, 192 Main Street, Negombo. Open Monday to Saturday, 10 am to 7.30 pm. Closed Sundays and Poya days.",
};

const AT_COUNTER = [
  { icon: "arrow" as const, title: "See and try pieces", text: "We bring out the trays. Try them with your saree." },
  { icon: "sketch" as const, title: "Have a piece sized", text: "Rings, bangles and chains, adjusted at the counter." },
  { icon: "scale" as const, title: "Sell or exchange old gold", text: "Weighed in front of you before you decide." },
  { icon: "exchange" as const, title: "Change money", text: "More than fifty currencies, with no commission." },
];

const photos = (
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
);

export default function VisitPage() {
  return (
    <>
      <SiteHeader current="/visit" />
      <main>
        {/* ======================= OPEN OR CLOSED ======================= */}
        <section className="lampbg page-head" data-theme="lamp">
          <div className="wrap">
            <nav aria-label="Breadcrumb" className="small breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>Visit</span>
            </nav>
            <div className="split" style={{ justifyContent: "space-between", marginTop: 28 }}>
              <div style={{ flex: "1 1 500px", minWidth: 0 }}>
                <p className="label kicker">Visit the showroom</p>
                <StatusHeading as="h1" poyaNote dotSize="0.17em" style={{ margin: "24px 0 0", fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(44px, 5.4vw, 80px)", lineHeight: 1.04, letterSpacing: "-0.02em", fontVariationSettings: "'opsz' 72", color: "var(--ink)", textWrap: "balance" }} />
                <p className="body-p" style={{ margin: "24px 0 0", maxWidth: "48ch" }}>Come in to see a piece, have one sized, sell old gold or change money. We bring out the trays and take as long as you need.</p>
                <div className="btn-row" style={{ marginTop: 32 }}>
                  <Button variant="gold" icon="pin" href={MAPS_URL}>Get directions</Button>
                  <Button variant="line" icon="phone" href={PHONE_HREF}>{PHONE}</Button>
                </div>
              </div>
              <div className="rl-tray velvet" data-theme="maroon" style={{ flex: "0 1 460px", minWidth: 0, borderRadius: 2, padding: "40px 38px" }}>
                <div style={{ display: "grid", gap: 22 }}>
                  <div style={{ display: "grid", gap: 8 }}>
                    <span className="label kicker" style={{ fontSize: 10.5 }}>Address</span>
                    <p className="piece-name" style={{ margin: 0, fontSize: 28 }}>192 Main Street, Negombo</p>
                  </div>
                  <div style={{ display: "grid", gap: 12, paddingTop: 20, borderTop: "1px solid var(--line)" }}>
                    <span className="label kicker" style={{ fontSize: 10.5 }}>Hours</span>
                    <p className="body" style={{ margin: 0 }}>Monday to Saturday, 10 am to 7.30 pm</p>
                    <p className="small muted" style={{ margin: 0 }}>Closed Sundays and Poya days</p>
                    <WeekStrip />
                  </div>
                  <div style={{ display: "grid", gap: 6, paddingTop: 20, borderTop: "1px solid var(--line)" }}>
                    <span className="label kicker" style={{ fontSize: 10.5 }}>Call or write</span>
                    <p className="body" style={{ margin: 0, display: "flex", flexWrap: "wrap", gap: "4px 16px" }}>
                      <a href={PHONE_HREF} style={{ textDecoration: "none" }}>{PHONE}</a>
                      <a href={PHONE_2_HREF} style={{ textDecoration: "none" }}>{PHONE_2}</a>
                    </p>
                    <p className="body" style={{ margin: 0, overflowWrap: "anywhere" }}>
                      <a href={`mailto:${EMAIL}`} className="more-link" style={{ color: "var(--ink)", fontSize: "inherit", paddingBottom: 0 }}>{EMAIL}</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= FIND US (emerald) ======================= */}
        <section className="rl-tray rl-tray--plain velvet sec-sm" data-theme="velvet">
          <div className="wrap split" style={{ gap: "40px clamp(40px, 5vw, 80px)" }}>
            <div style={{ flex: "1 1 420px", minWidth: 0 }}>
              <p className="label kicker">Find us</p>
              <p className="title" style={{ margin: "20px 0 0", fontSize: "clamp(40px, 4.6vw, 66px)" }}>On Main Street, in Negombo town.</p>
              <p className="body muted" style={{ margin: "18px 0 0", maxWidth: "44ch" }}>Open the map on your phone for directions to the door. Call us if you would like a piece kept ready for you.</p>
              <div className="btn-row" style={{ marginTop: 30 }}>
                <Button variant="gold" icon="pin" href={MAPS_URL}>Open in Google Maps</Button>
              </div>
            </div>
            {photos}
          </div>
        </section>

        {/* ======================= AT THE COUNTER ======================= */}
        <section className="lampbg" data-theme="lamp" style={{ padding: "clamp(64px, 6.5vw, 96px) 0 0" }}>
          <div className="wrap">
            <p className="label kicker">At the counter</p>
            <h2 className="title t-lg">What you can do when you come in.</h2>
            <div className="grid-auto" style={{ ["--min" as string]: "240px", marginTop: 40 }}>
              {AT_COUNTER.map((c) => (
                <div key={c.title} className="card" style={{ gap: 12, padding: 26 }}>
                  <span className="goldink"><Icon name={c.icon} size={28} /></span>
                  <h3 className="piece-name" style={{ fontSize: 22 }}>{c.title}</h3>
                  <p className="small muted" style={{ fontSize: 14 }}>{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======================= WRITE TO US ======================= */}
        <section className="lampbg sec" data-theme="lamp">
          <div className="wrap split split--top">
            <div style={{ flex: "1 1 360px", minWidth: 0 }}>
              <p className="label kicker">Ask us anything</p>
              <h2 className="title t-lg">We will call you back.</h2>
              <p className="body-p" style={{ maxWidth: "40ch" }}>A question about a piece, a viewing to book, or a rate to check. We reply on shop days.</p>
            </div>
            <div className="rl-tray velvet" data-theme="maroon" style={{ flex: "1 1 520px", minWidth: 0, borderRadius: 2, padding: "clamp(28px, 3vw, 44px)" }}>
              <EnquiryForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
