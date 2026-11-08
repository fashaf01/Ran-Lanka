import { CATS, FX, PIECE_BY_ID, type Piece } from "@/lib/data";

export function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 12h16M13 5l7 7-7 7" />
    </svg>
  );
}

export function ProductCard({ p }: { p: Piece }) {
  return (
    <a className="pc" href={`/product/${p.id}`} data-cursor="View" data-name={p.name} data-order={p.order}>
      <span className="pc-img">
        <img className="a" src={`/img/${p.id}a.webp`} alt={p.name} loading="lazy" />
        <img className="b" src={`/img/${p.id}b.webp`} alt="" loading="lazy" />
        <span className="pc-no">{p.no}</span>
      </span>
      <span className="pc-meta">
        <span className="c">{CATS[p.cat].kind}</span>
        <span className="h">{p.name}</span>
      </span>
    </a>
  );
}

/** A grid of product cards. `interlude` adds the bridal panel after the eighth card. */
export function Grid({ name, pieces, ids, interlude }: { name: string; pieces?: Piece[]; ids?: string[]; interlude?: boolean }) {
  const list = pieces ?? (ids ?? []).map((id) => PIECE_BY_ID[id]);
  const cards = list.map((p) => <ProductCard key={p.id} p={p} />);
  if (interlude && list.length > 8) {
    cards.splice(
      8,
      0,
      <div className="interlude" key="interlude">
        <img src="/img/hands-bangles.webp" alt="" loading="lazy" />
        <p className="kicker">Bridal</p>
        <p className="d3">
          Bangles sized on the wrist, <em>by the dozen</em> for a bride.
        </p>
        <a className="tlink" href="/bridal">Bridal viewings</a>
      </div>,
    );
  }
  return (
    <div className="grid" data-grid={name}>
      {cards}
    </div>
  );
}

/** Exchange table, LKR per unit. `rows` limits it to the first few currencies. */
export function FxTable({ rows }: { rows?: number }) {
  const list = rows ? FX.slice(0, rows) : FX;
  return (
    <table className="fx">
      <caption className="sr">Exchange rates in Sri Lankan rupees per unit, sample figures</caption>
      <thead>
        <tr>
          <th scope="col">Currency</th>
          <th scope="col">We buy</th>
          <th scope="col">We sell</th>
        </tr>
      </thead>
      <tbody>
        {list.map(([code, name, buy, sell]) => (
          <tr key={code}>
            <th scope="row">
              <b>{code}</b>
              <span>{name}</span>
            </th>
            <td>{buy.toFixed(2)}</td>
            <td>{sell.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
