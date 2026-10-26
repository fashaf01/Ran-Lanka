"use client";

import { useState } from "react";

type View = { img: string; alt: string; label: string };

export function ProductGallery({ views }: { views: View[] }) {
  const [i, setI] = useState(0);
  const cur = views[i] ?? views[0];
  return (
    <div style={{ flex: "1.2 1 520px", minWidth: 0, display: "grid", gap: 14 }}>
      <div className="zoom">
        <img src={cur.img} alt={cur.alt} />
        <span className="label" style={{ position: "absolute", top: 18, left: 18, color: "#7c5a1c", fontSize: 10 }}>22K · 916</span>
        <span className="small" style={{ position: "absolute", right: 18, bottom: 16, color: "#6b5644" }}>Hover to look closer</span>
      </div>
      <div style={{ display: "flex", gap: 14 }}>
        {views.map((v, n) => (
          <button key={v.img} type="button" className="rl-reset thumb" onClick={() => setI(n)} aria-label={v.label} aria-pressed={i === n}>
            <img src={v.img} alt="" />
          </button>
        ))}
      </div>
    </div>
  );
}
