import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

type Props = {
  /** gold: the one action of a section; line: the alternative; quiet: a link onward. */
  variant?: "gold" | "line" | "quiet";
  /** sm is for the header only. */
  size?: "md" | "sm";
  /** true for the arrow, or an icon name. Follows the label. */
  icon?: boolean | IconName;
  href?: string;
  external?: boolean;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export function Button({ variant = "gold", size = "md", icon, href, external, children, className, ...rest }: Props) {
  const cls = ["rl-btn", `rl-btn--${variant}`, size === "sm" && "rl-btn--sm", className].filter(Boolean).join(" ");
  const iconName: IconName | null = icon === true ? "arrow" : icon || null;
  const inner = (
    <>
      <span>{children}</span>
      {iconName ? <Icon name={iconName} size={16} /> : null}
    </>
  );

  if (href) {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal && !external) {
      return (
        <Link href={href} className={cls}>
          {inner}
        </Link>
      );
    }
    return (
      <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {inner}
    </button>
  );
}
