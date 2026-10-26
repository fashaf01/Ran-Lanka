import { useId } from "react";

/** The woven gold border that sits on the edge of a velvet band. */
export function Zari({ edge }: { edge: "top" | "bottom" }) {
  const id = "zari" + useId().replace(/[^a-zA-Z0-9_-]/g, "");
  return (
    <div aria-hidden="true" className={`zari zari--${edge}`}>
      <span />
      <svg width="100%" height="14">
        <defs>
          <pattern id={id} width="18" height="14" patternUnits="userSpaceOnUse">
            <path d="M0 14 L9 4.5 L18 14" fill="none" stroke="#c9a15a" strokeWidth="1" />
            <circle cx="9" cy="1.8" r="1.1" fill="#c9a15a" />
          </pattern>
        </defs>
        <rect width="100%" height="14" fill={`url(#${id})`} />
      </svg>
      <span />
    </div>
  );
}
