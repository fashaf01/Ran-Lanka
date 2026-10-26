"use client";

import { openLine, postedDay, useColomboStatus } from "@/lib/colombo";
import { GRAM22, PAWN_GRAMS, PHONE, PHONE_HREF, money } from "@/lib/site";

/** The maroon strip above the header: today's pawn rate and whether the showroom is open. */
export function TopBar() {
  const status = useColomboStatus();
  return (
    <div className="site-info">
      <span className="label">
        Today · 22K pawn <span className="goldink">LKR {money(GRAM22 * PAWN_GRAMS)}</span> · Posted 9.30 am {postedDay(status)}
      </span>
      <span className="label hide-sm">
        {openLine(status)} ·{" "}
        <a href={PHONE_HREF} style={{ color: "var(--ink)", textDecoration: "none" }}>
          {PHONE}
        </a>
      </span>
    </div>
  );
}
