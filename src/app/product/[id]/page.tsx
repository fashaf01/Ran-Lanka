import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Hallmark } from "@/components/Hallmark";
import { Icon } from "@/components/Icon";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductTile } from "@/components/ProductTile";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Zari } from "@/components/Zari";
import { PIECES, PIECE_NOTES, getCategory, getPiece } from "@/lib/catalogue";
import { GRAM22, PHONE_HREF, money } from "@/lib/site";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;

export function generateStaticParams() {
  return PIECES.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const piece = getPiece((await params).id);
  if (!piece) return {};
  return { title: piece.name, description: `${piece.name}, ${piece.no}. 22 karat 916 gold, weighed in front of you and priced at the day’s rate in Negombo.` };
}

export default async function ProductPage({ params }: { params: Params }) {
  const piece = getPiece((await params).id);
  if (!piece) notFound();
  const cat = getCategory(piece.cat)!;
  const kind = cat.kind ?? "";
  const related = PIECES.filter((p) => p.cat === piece.cat && p.id !== piece.id).slice(0, 4);
  const views = [
    { img: piece.a, alt: `${piece.name} in 22 karat gold`, label: "Show the front view" },
    { img: piece.b, alt: `${piece.name}, second view`, label: "Show the second view" },
  ];

  const spec: Array<[string, string]> = [
    ["Metal", "22 karat yellow gold"],
    ["Purity", "916 hallmark"],
    ["Piece number", piece.no],
    ["Where", "In the case at 192 Main Street, Negombo"],
  ];

  return (
    <>
      <SiteHeader current="/collection" />
      <main>
        <section className="lampbg" data-theme="lamp" style={{ padding: "32px 0 clamp(64px, 6vw, 88px)" }}>
          <div className="wrap">
            <nav aria-label="Breadcrumb" className="small breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/collection">Collection</Link>
              <span aria-hidden="true">/</span>
              <Link href={`/collection?cat=${cat.key}`}>{cat.name}</Link>
              <span aria-hidden="true">/</span>
              <span>{piece.name}</span>
            </nav>

            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "40px clamp(40px, 5vw, 80px)", marginTop: 28 }}>
              <ProductGallery views={views} />

              <div style={{ flex: "1 1 420px", minWidth: 0 }}>
                <p className="label kicker">{kind} · {piece.no}</p>
                <h1 className="title" style={{ margin: "18px 0 0", fontSize: "clamp(38px, 3.8vw, 54px)", textWrap: "balance" }}>{piece.name}</h1>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 20 }}>
                  <Hallmark />
                  <span className="small muted">Twenty-two karat yellow gold</span>
                </div>
                <p className="body muted" style={{ margin: "22px 0 0", maxWidth: "46ch" }}>
                  {PIECE_NOTES[piece.id] ?? `${piece.name} in 22 karat gold. Try it on with your saree at the counter.`}
                </p>

                <div className="rl-tray rl-tray--plain velvet" data-theme="velvet" style={{ marginTop: 30, borderRadius: 2, padding: "28px 30px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, paddingBottom: 16, borderBottom: "1px solid var(--line)" }}>
                    <span className="label kicker" style={{ fontSize: 10.5 }}>Priced by weight</span>
                    <span className="label muted" style={{ fontSize: 10 }}>Sample rate</span>
                  </div>
                  <dl className="small" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "12px 24px", margin: "18px 0 0" }}>
                    <dt className="muted">22 karat today</dt>
                    <dd style={{ margin: 0, textAlign: "right" }}>LKR {money(GRAM22)} a gram</dd>
                    <dt className="muted">Weight</dt>
                    <dd style={{ margin: 0, textAlign: "right" }}>Weighed at the counter</dd>
                  </dl>
                  <p style={{ margin: "18px 0 0", paddingTop: 16, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16 }}>
                    <span className="small muted">At today’s rate</span>
                    <span className="metal" style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: 28, lineHeight: 1 }}>Quoted at the counter</span>
                  </p>
                  <p className="small muted" style={{ margin: "12px 0 0" }}>We weigh it in front of you before you pay.</p>
                </div>

                <div className="btn-row" style={{ marginTop: 26 }}>
                  <Button variant="gold" icon href="/visit">Reserve to see it in store</Button>
                  <Button variant="line" icon="phone" href={PHONE_HREF}>Call about this piece</Button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16, marginTop: 30, paddingTop: 24, borderTop: "1px solid var(--line)" }}>
                  {([
                    ["scale", "Weighed in front of you"],
                    ["exchange", "Old gold taken in exchange"],
                    ["sketch", cat.fit ?? "Fitted at the counter"],
                  ] as const).map(([icon, text]) => (
                    <div key={text} style={{ display: "grid", gap: 8, color: "var(--gold-ink)", alignContent: "start" }}>
                      <Icon name={icon} size={24} />
                      <span className="small" style={{ color: "var(--ink)" }}>{text}</span>
                    </div>
                  ))}
                </div>

                <dl className="spec small">
                  {spec.map(([k, v]) => (
                    <div key={k} style={{ display: "contents" }}>
                      <dt className="label">{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= MORE LIKE THIS ======================= */}
        {related.length ? (
          <section className="rl-tray rl-tray--plain velvet" data-theme="maroon">
            <Zari edge="top" />
            <div className="wrap" style={{ paddingTop: "clamp(56px, 5.5vw, 80px)", paddingBottom: "clamp(56px, 5.5vw, 80px)" }}>
              <div className="head-row">
                <h2 className="title" style={{ margin: 0, fontSize: "clamp(32px, 3.4vw, 46px)" }}>More {cat.name.toLowerCase()}.</h2>
                <Link className="label more-link" href={`/collection?cat=${cat.key}`}>All {cat.name.toLowerCase()}</Link>
              </div>
              <div className="grid-auto" style={{ ["--min" as string]: "240px", ["--gap" as string]: "32px 22px", marginTop: 36 }}>
                {related.map((p) => (
                  <ProductTile key={p.id} piece={p} kind={`${kind} · 22K`} detail={false} />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <SiteFooter tone={related.length ? "black" : "maroon"} />
    </>
  );
}
