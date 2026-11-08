import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Grid } from "@/components/Cards";
import { CATS, NOTES, PHONE, PIECES, PIECE_BY_ID } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return PIECES.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = PIECE_BY_ID[id];
  return p ? { title: p.name, description: `${p.name} (${p.no}), 22 karat gold, priced by weight at the day's rate. Ranlanka, Negombo.` } : {};
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = PIECE_BY_ID[id];
  if (!p) notFound();
  const c = CATS[p.cat];
  const i = PIECES.indexOf(p);
  const pv = PIECES[(i - 1 + PIECES.length) % PIECES.length];
  const nx = PIECES[(i + 1) % PIECES.length];
  const same = PIECES.filter((q) => q.cat === p.cat && q !== p);
  const fill = PIECES.filter((q) => q.cat !== p.cat);
  const o = (i * 5) % (fill.length - 4);
  const related = same.concat(fill.slice(o, o + 4)).slice(0, 4);
  const ask = `/visit?about=${encodeURIComponent(`${p.name} (${p.no})`)}`;

  return (
    <div className="page" data-page="piece">
      <section className="wrap pd" aria-label="Piece">
        <nav className="crumbs" aria-label="Breadcrumb">
          <a href="/">Home</a><span>/</span><a href="/collection">Collection</a><span>/</span>
          <a href={`/collection/${c.slug}`}>{c.name}</a><span>/</span><span>{p.name}</span>
        </nav>
        <div className="pd-grid">
          <div className="pd-gal">
            <div className="pd-thumbs" id="pd-thumbs">
              {(["a", "b"] as const).map((s, k) => (
                <button key={s} type="button" aria-pressed={k === 0} aria-label={`Show photo ${k + 1}`} data-src={`/img/${p.id}${s}.webp`}>
                  <img src={`/img/${p.id}${s}.webp`} alt="" />
                </button>
              ))}
            </div>
            <div className="pd-main" id="pd-main" data-cursor="Zoom">
              <img id="pd-img" src={`/img/${p.id}a.webp`} alt={p.name} />
              <span className="pc-no">{p.no}</span>
            </div>
          </div>
          <div className="pd-info">
            <p className="kicker">{c.kind}</p>
            <h1 className="d2">{p.name}</h1>
            <p className="lead">{NOTES[p.id] || c.text}</p>
            <dl>
              <dt>Piece no.</dt><dd>{p.no}</dd>
              <dt>Gold</dt><dd>22 karat, 916 parts in every 1,000</dd>
              <dt>Fitting</dt><dd>{c.fit}</dd>
              <dt>Price</dt><dd>By weight, at the day&apos;s gold rate</dd>
            </dl>
            <div className="pd-buy">
              <p>To ask about this piece, quote its number at the counter or when you call.</p>
              <div className="row">
                <b>{p.no}</b>
                <button className="copy" type="button" data-copy={p.no}>Copy number</button>
                <a href="tel:0312222202" style={{ color: "var(--bone-2)", fontSize: "14.5px" }}>{PHONE}</a>
              </div>
            </div>
            <div className="acts">
              <a className="btn solid" href={ask}>Ask about this piece</a>
              <a className="btn" href={`/collection/${c.slug}`}>More {c.name.toLowerCase()}</a>
            </div>
            <ul className="assure">
              <li><b>916</b>Every piece 22 karat</li>
              <li><b>Weighed</b>In front of you</li>
              <li><b>Priced</b>At the day&apos;s rate</li>
            </ul>
          </div>
        </div>
        <nav className="pd-pn" aria-label="Previous and next piece">
          <a href={`/product/${pv.id}`}><small>Previous</small><span>{pv.name}</span></a>
          <a href={`/product/${nx.id}`}><small>Next</small><span>{nx.name}</span></a>
        </nav>
      </section>
      <section className="sec-s stone" aria-label="Related pieces">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="kicker">From the case</p>
              <h2 className="d3">{same.length >= 4 ? `More ${c.name.toLowerCase()}` : (<>More from the <em>case</em></>)}</h2>
            </div>
          </div>
          <Grid name="related" pieces={related} />
        </div>
      </section>
    </div>
  );
}
