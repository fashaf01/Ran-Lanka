export type IconName = "arrow" | "scale" | "sketch" | "exchange" | "pin" | "phone" | "clock" | "mail";

const ICONS: Record<IconName, string[]> = {
  arrow: ["M3 12h17M15 7l5 5-5 5"],
  scale: ["M12 3.5v16.5M8 20h8M4.5 7h15", "M4.5 7 2 13h5L4.5 7ZM19.5 7 17 13h5l-2.5-6Z", "M2 13a2.5 2.5 0 0 0 5 0M17 13a2.5 2.5 0 0 0 5 0"],
  sketch: ["M4 20l1.2-4.3L15.8 5.1a1.8 1.8 0 0 1 2.6 0l.5.5a1.8 1.8 0 0 1 0 2.6L8.3 18.8 4 20Z", "M14 7l3 3"],
  exchange: ["M4 8.5h15l-3.5-3.5M20 15.5H5l3.5 3.5"],
  pin: ["M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z", "M9.8 10a2.2 2.2 0 1 0 4.4 0a2.2 2.2 0 1 0-4.4 0"],
  phone: ["M6.5 3.5h2.6l1.4 4-2 1.3a10.5 10.5 0 0 0 6.7 6.7l1.3-2 4 1.4v2.6a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z"],
  clock: ["M3.5 12a8.5 8.5 0 1 0 17 0a8.5 8.5 0 1 0-17 0", "M12 7.5V12l3 2"],
  mail: ["M4 5.5h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1Z", "m3.5 6.5 8.5 6.5 8.5-6.5"],
};

type IconProps = { name: IconName; size?: number; strokeWidth?: number; title?: string; className?: string };

export function Icon({ name, size = 20, strokeWidth = 1.3, title, className }: IconProps) {
  return (
    <svg
      className={["rl-icon", className].filter(Boolean).join(" ")}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      aria-label={title}
    >
      {ICONS[name].map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
