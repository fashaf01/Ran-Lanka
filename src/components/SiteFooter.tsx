import Link from "next/link";
import { Zari } from "./Zari";
import { PHONE_2, PHONE, PHONE_HREF } from "@/lib/site";

const COLLECTION_LINKS = [
  { label: "Necklaces", cat: "nk" },
  { label: "Bangles", cat: "bg" },
  { label: "Earrings", cat: "er" },
  { label: "Rings and pendants", cat: "rg" },
  { label: "Chains and bracelets", cat: "ch" },
  { label: "Thali and mangalsutra", cat: "ms" },
];

type Props = {
  /** maroon: the velvet band; black: for pages that already end on a maroon band. */
  tone?: "maroon" | "black";
};

export function SiteFooter({ tone = "maroon" }: Props) {
  const maroon = tone === "maroon";
  return (
    <footer
      className={maroon ? "rl-tray rl-tray--plain velvet" : "lampbg"}
      data-theme={maroon ? "maroon" : "lamp"}
      style={{ overflow: "hidden", borderTop: maroon ? undefined : "1px solid var(--line)" }}
    >
      {maroon ? <Zari edge="top" /> : null}
      <div className="wrap" style={{ paddingTop: 56, paddingBottom: 0 }}>
        <div className="foot-cols small">
          <div>
            <img src="/img/logo.png" alt="Ranlanka" style={{ height: 22, width: "auto", display: "block" }} />
            <p style={{ margin: 0, color: "var(--ink-muted)", maxWidth: "28ch" }}>916 gold, weighed in front of you, on Main Street since 2008.</p>
          </div>
          <nav aria-label="Collection">
            <span className="label">Collection</span>
            {COLLECTION_LINKS.map((l) => (
              <Link key={l.cat} href={`/collection?cat=${l.cat}`}>
                {l.label}
              </Link>
            ))}
          </nav>
          <nav aria-label="Ranlanka">
            <span className="label">Ranlanka</span>
            <Link href="/bridal">The bridal edit</Link>
            <Link href="/bespoke">Design your own</Link>
            <Link href="/gold-rate">Gold rate and exchange</Link>
            <Link href="/about">Our story</Link>
          </nav>
          <div>
            <span className="label">Visit</span>
            <span>192 Main Street, Negombo</span>
            <span style={{ color: "var(--ink-muted)" }}>
              Monday to Saturday, 10 am to 7.30 pm
              <br />
              Closed Sundays and Poya days
            </span>
            <a href={PHONE_HREF}>
              {PHONE} · {PHONE_2}
            </a>
          </div>
        </div>
        <p aria-hidden="true" className="foot-word metal">
          Ranlanka
        </p>
        <div className="foot-legal">
          <span>© 2026 Ranlanka · 192 Main Street, Negombo</span>
          <span>Gold rates on this site are sample figures</span>
        </div>
      </div>
    </footer>
  );
}
