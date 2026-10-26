"use client";

import { statusHeadline, useColomboStatus } from "@/lib/colombo";

/** "Open now. Until 7.30 pm today." Reads the shop's clock in the browser. */
export function StatusHeading({ as: Tag = "h2", poyaNote = false, style, dotSize = "0.2em" }: { as?: "h1" | "h2"; poyaNote?: boolean; style?: React.CSSProperties; dotSize?: string }) {
  const status = useColomboStatus();
  const { a, b, open } = statusHeadline(status, poyaNote);
  return (
    <Tag style={style}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3em" }}>
        <span aria-hidden="true" className={open ? "status-dot" : "status-dot status-dot--shut"} style={{ width: dotSize, height: dotSize }} />
        {a}
      </span>{" "}
      <span style={{ color: "var(--gold-ink)" }}>{b}</span>
    </Tag>
  );
}
