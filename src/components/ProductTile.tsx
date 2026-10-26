import Link from "next/link";
import type { Piece } from "@/lib/catalogue";

type Props = {
  piece: Piece;
  /** The small line above the name. */
  kind: string;
  /** Show the 22K · 916 mark and the "priced by weight" line, as in the grid. */
  detail?: boolean;
};

/** A piece on the cream: the second photograph fades in on hover. */
export function ProductTile({ piece, kind, detail = true }: Props) {
  return (
    <Link className="pc" href={`/product/${piece.id}`}>
      <span className="pc-img">
        <img className="pc-a" src={piece.a} alt={piece.name} loading="lazy" />
        <img className="pc-b" src={piece.b} alt="" loading="lazy" />
        {detail ? <span className="label pc-hm">22K · 916</span> : null}
      </span>
      <span className="pc-meta">
        <span className="label">{kind}</span>
        <span className="piece-name pc-name" style={{ fontSize: 19 }}>
          {piece.name}
        </span>
        {detail ? <span className="small muted">Priced by weight at the counter</span> : null}
      </span>
    </Link>
  );
}
