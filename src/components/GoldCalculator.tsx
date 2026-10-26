"use client";

import { useState } from "react";
import { GRAM22, GRAM24, PAWN_GRAMS, money } from "@/lib/site";

const QUICK = [
  { name: "1 pawn · 8 g", g: 8 },
  { name: "2 pawns · 16 g", g: 16 },
  { name: "5 pawns · 40 g", g: 40 },
  { name: "10 pawns · 80 g", g: 80 },
  { name: "Bridal set · 120 g", g: 120 },
];

/** What a weight of gold costs at today's sample rate. The gold alone; the counter weighs the piece itself. */
export function GoldCalculator() {
  const [grams, setGrams] = useState("8");
  const [karat, setKarat] = useState<22 | 24>(22);

  const g = Math.max(0, Number(grams) || 0);
  const rate = karat === 24 ? GRAM24 : GRAM22;
  const pawns = g / PAWN_GRAMS;
  const pawnText = pawns === 1 ? "one pawn" : `${Math.round(pawns * 100) / 100} pawns`;

  return (
    <div style={{ flex: "1.2 1 520px", minWidth: 0, display: "grid", gap: 28, padding: "clamp(28px, 3vw, 40px)", background: "var(--paper-raised)", boxShadow: "inset 0 0 0 1px var(--line)" }}>
      <div className="grid-auto" style={{ ["--min" as string]: "220px", ["--gap" as string]: "24px 32px", alignItems: "end" }}>
        <label style={{ display: "grid", gap: 8 }}>
          <span className="label" style={{ color: "var(--gold-ink)", fontSize: 10 }}>Weight in grams</span>
          <input className="num" type="number" min={0} step={0.1} inputMode="decimal" value={grams} onChange={(e) => setGrams(e.target.value)} />
        </label>
        <div style={{ display: "grid", gap: 10 }}>
          <span className="label" style={{ color: "var(--gold-ink)", fontSize: 10 }}>Karat</span>
          <div role="group" aria-label="Karat" style={{ display: "flex", gap: 10 }}>
            {([22, 24] as const).map((k) => (
              <button key={k} type="button" className="rl-reset label chip-btn" aria-pressed={karat === k} onClick={() => setKarat(k)} style={{ flex: 1, padding: "14px 16px", fontSize: 11 }}>
                {k} karat
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        <span className="label" style={{ color: "var(--ink-muted)", fontSize: 10 }}>Quick weights</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {QUICK.map((q) => (
            <button key={q.name} type="button" className="rl-reset small quick-btn" onClick={() => setGrams(String(q.g))}>
              {q.name}
            </button>
          ))}
        </div>
      </div>
      <div style={{ paddingTop: 22, borderTop: "1px solid var(--line)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", gap: "12px 24px" }}>
        <span className="small muted" aria-live="polite">
          {g} g · {pawnText} of {karat} karat at LKR {money(rate)} a gram
        </span>
        <span style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <span className="metal" style={{ fontFamily: "var(--font-display)", fontWeight: 250, fontSize: "clamp(44px, 5vw, 72px)", lineHeight: 1, fontVariantNumeric: "tabular-nums lining-nums" }}>
            {money(g * rate)}
          </span>
          <span className="label goldink">LKR</span>
        </span>
      </div>
    </div>
  );
}
