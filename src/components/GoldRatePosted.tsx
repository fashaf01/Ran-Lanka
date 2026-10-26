"use client";

import { postedDay, useColomboStatus } from "@/lib/colombo";

export function GoldRatePosted() {
  const status = useColomboStatus();
  return (
    <span className="label muted" style={{ fontSize: 10.5 }}>
      Posted 9.30 am · {postedDay(status)} · Sample figures
    </span>
  );
}
