import type { ReactNode } from "react";

// Line icons, drawn on a 24 grid and coloured by the text around them.
const PATHS: Record<string, ReactNode> = {
  phone: <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3A2.5 2.5 0 0 1 18.5 20 15.5 15.5 0 0 1 4 5.5 2.5 2.5 0 0 1 6.5 3Z" />,
  pin: <><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" /><circle cx="12" cy="10" r="2.6" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.500V12l3 2" /></>,
  check: <path d="m5 12.5 4.5 4.500L19 7" />,
  shield: <><path d="M12 3 5 6v5.500c0 4.4 3 8.1 7 9.5 4-1.4 7-5.1 7-9.500V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></>,
  right: <path d="M4 12h16m-6-6 6 6-6 6" />,
  left: <path d="M20 12H4m6-6-6 6 6 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  mail: <><rect x="3" y="5.5" width="18" height="13" rx="1.5" /><path d="m3.5 7 8.5 6 8.5-6" /></>,
  cal: <><rect x="3.5" y="5" width="17" height="15" rx="1.5" /><path d="M3.5 9.500h17M8 3v4M16 3v4" /></>,
  sparkle: <><path d="M12 3.5 13.9 9 19.5 11l-5.6 2L12 18.5 10.1 13 4.5 11 10.1 9 12 3.500Z" /><path d="M18.5 16.5 19.3 18.7 21.5 19.5 19.3 20.3 18.5 22.5 17.7 20.3 15.5 19.5 17.7 18.700Z" /></>,
  gem: <><path d="M7 3h10l4 6-9 12L3 9l4-6Z" /><path d="M3 9h18M9.5 3 7.5 9l4.5 12L16.5 9 14.5 3" /></>,
  exchange: <path d="M4 8h13m-4-4 4 4-4 4M20 16H7m4 4-4-4 4-4" />,
  scale: <><path d="M12 4v16M7 20h10M5 7h14" /><path d="M5 7 2.5 13.500a2.7 2.7 0 0 0 5 0L5 7ZM19 7l-2.5 6.500a2.7 2.7 0 0 0 5 0L19 7Z" /></>,
  ring: <><circle cx="12" cy="14.5" r="6" /><path d="m9.5 5 2.5 3.500L14.5 5 13 3h-2L9.5 5Z" /></>,
  pencil: <><path d="M4 20l1-4.500L16.5 4l3.5 3.500L8.5 19 4 20Z" /><path d="m14 6.5 3.5 3.5" /></>,
  coins: <><ellipse cx="9" cy="8" rx="5.5" ry="2.8" /><path d="M3.5 8v4c0 1.5 2.5 2.8 5.5 2.800M3.5 12v4c0 1.5 2.5 2.8 5.5 2.8 1 0 2-.1 2.8-.4" /><ellipse cx="15.5" cy="13" rx="5" ry="2.6" /><path d="M10.5 13v4c0 1.4 2.2 2.6 5 2.600s5-1.2 5-2.600v-4" /></>,
  ig: <><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="16.9" cy="7.1" r=".6" /></>,
};

export type IconName = keyof typeof PATHS;

export function Icon({ n }: { n: string }) {
  return (
    <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
      {PATHS[n]}
    </svg>
  );
}

/** The lotus mark, the flourish and the arcade sketch come from the sprite mounted in the layout. */
export function Lotus({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="-50 -50 100 100" aria-hidden="true">
      <use href="#rl-lotus" x="-50" y="-50" width="100" height="100" />
    </svg>
  );
}

export function Flourish({ pale }: { pale?: boolean }) {
  return (
    <div className={"ornament" + (pale ? " pale" : "")} role="separator">
      <svg viewBox="0 0 320 28" aria-hidden="true">
        <use href="#rl-flourish" />
      </svg>
    </div>
  );
}

export function Logo({ href = "/", label = "Ranlanka home" }: { href?: string; label?: string }) {
  return (
    <a className="logo" href={href} aria-label={label}>
      <Lotus className="logo-mark" />
      <span className="logo-type">
        <span className="logo-name">Ranlanka</span>
        <span className="logo-tag"><span lang="si">රන්ලංකා</span> · Est. 2008</span>
      </span>
    </a>
  );
}

/** The hallmark seal: the shop's name set round a lotus. */
export function Seal() {
  return (
    <svg className="seal" viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <path id="sealRing" d="M100 100m-73 0a73 73 0 1 1 146 0a73 73 0 1 1-146 0" />
      </defs>
      <circle className="seal-ground" cx="100" cy="100" r="98" />
      <circle className="orn-stroke" cx="100" cy="100" r="96" />
      <circle className="orn-stroke" cx="100" cy="100" r="91" />
      <circle className="orn-stroke" cx="100" cy="100" r="62" />
      <text className="seal-text">
        <textPath href="#sealRing" textLength="452" lengthAdjust="spacing">RANLANKA · MAIN STREET · NEGOMBO · EST. 2008 · 22KT 916 ·</textPath>
      </text>
      <use href="#rl-lotus" x="46" y="46" width="108" height="108" />
    </svg>
  );
}
