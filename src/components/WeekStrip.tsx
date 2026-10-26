"use client";

import { useColomboStatus } from "@/lib/colombo";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/** The week at a glance, with today marked and Sunday struck through. */
export function WeekStrip() {
  const status = useColomboStatus();
  const today = status?.day ?? -1;
  return (
    <div aria-hidden="true" className="week">
      {DAYS.map((d, i) => (
        <span key={d} className={["label", i === today && "is-today", i === 6 && "is-off"].filter(Boolean).join(" ")}>
          {d}
        </span>
      ))}
    </div>
  );
}
