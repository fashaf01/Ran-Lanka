"use client";

import { useState } from "react";

/** Drag across the sketch to reveal the finished piece in gold. */
export function WipeCompare({ sketch, gold, sketchAlt, goldAlt }: { sketch: string; gold: string; sketchAlt: string; goldAlt: string }) {
  const [wipe, setWipe] = useState(50);
  return (
    <div className="wipe">
      <img className="wipe__img" src={sketch} alt={sketchAlt} />
      <div className="wipe__gold" style={{ clipPath: `inset(0 0 0 ${wipe}%)` }}>
        <img className="wipe__img" src={gold} alt={goldAlt} />
      </div>
      <span className="cm tl" />
      <span className="cm tr" />
      <span className="cm bl" />
      <span className="cm br" />
      <span className="wipe__bar" aria-hidden="true" style={{ left: `${wipe}%` }}>
        <span className="wipe__knob">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </span>
      </span>
      <span className="label wipe__tag" aria-hidden="true" style={{ left: 32, color: "#3c5e53" }}>
        Sketch
      </span>
      <span className="label wipe__tag" aria-hidden="true" style={{ right: 32, color: "#7c5a1c" }}>
        In gold
      </span>
      <input
        className="wipe-range"
        type="range"
        min={0}
        max={100}
        step={1}
        value={wipe}
        onChange={(e) => setWipe(Number(e.target.value))}
        aria-label="Slide between the sketch and the finished pendant"
      />
    </div>
  );
}
