import { CATS, CAT_KEYS, PIECES, countIn, type CatKey } from "@/lib/data";
import { Grid } from "@/components/Cards";

/** The collection page, for all pieces or for one case. Sorting is wired up in SiteChrome. */
export default function CollectionView({ cat }: { cat?: CatKey }) {
  const c = cat ? CATS[cat] : null;
  const list = c ? PIECES.filter((p) => p.cat === cat) : PIECES;
  return (
    <div className="page" data-page="collection">
      <header className="wrap phead">
        <div className="phead-grid">
          <div className="phead-copy">
            <nav className="crumbs" aria-label="Breadcrumb">
              <a href="/">Home</a><span>/</span><a href="/collection">Collection</a>
              {c && (<><span>/</span><span>{c.name}</span></>)}
            </nav>
            <p className="kicker">{c ? c.kicker : "The collection"}</p>
            <h1 className="d1">{c ? c.name : (<>Gold <em>jewellery</em></>)}</h1>
            <p className="lead">{c ? c.text : "Every piece in the case, in 22 karat gold. Weighed in front of you and priced at the day’s rate."}</p>
            {c && <p className="fit-note">{c.fit}</p>}
          </div>
          <div className="plate ph-plate"><img src={`/img/${c ? c.img : "life-plain"}.webp`} alt={c ? c.name : "A gold necklace and earrings on a stand"} /></div>
        </div>
      </header>
      <div className="catbar">
        <div className="wrap catbar-in">
          <nav className="cats" id="cats" aria-label="Jewellery by kind">
            <a href="/collection" aria-current={!c ? "page" : undefined}>All <sup>{PIECES.length}</sup></a>
            {CAT_KEYS.map((k) => (
              <a key={k} href={`/collection/${CATS[k].slug}`} aria-current={k === cat ? "page" : undefined}>
                {CATS[k].name} <sup>{countIn(k)}</sup>
              </a>
            ))}
          </nav>
          <label className="sort">
            <span>Sort</span>
            <select id="sort" defaultValue="case">
              <option value="case">Case order</option>
              <option value="az">Name, A to Z</option>
              <option value="za">Name, Z to A</option>
            </select>
          </label>
        </div>
      </div>
      <section className="sec-s stone" aria-label="Pieces">
        <div className="wrap">
          <Grid name="collection" pieces={list} interlude={!c} />
          <div className="foot-row">
            <p>Every piece is 22 karat gold, weighed in front of you and priced at the day&apos;s rate. Quote a piece number when you call or visit and we will have it ready.</p>
            <a className="btn" href="/visit">Plan a visit</a>
          </div>
        </div>
      </section>
    </div>
  );
}
