import Link from "next/link";
import { money } from "@/lib/site";

export function RateChip({ label = "22K pawn", value, href }: { label?: string; value: number; href?: string }) {
  const body = (
    <>
      <i className="rl-chip__dot" aria-hidden="true" />
      <span>{label}</span>
      <b className="rl-chip__v">LKR {money(value)}</b>
    </>
  );
  return href ? (
    <Link href={href} className="rl-chip" style={{ textDecoration: "none" }}>
      {body}
    </Link>
  ) : (
    <span className="rl-chip">{body}</span>
  );
}
