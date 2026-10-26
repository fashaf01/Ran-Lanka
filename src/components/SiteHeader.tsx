import Link from "next/link";
import { Button } from "./Button";
import { TopBar } from "./TopBar";
import { NAV_MAIN, NAV_MORE } from "@/lib/site";

type Props = { current?: string };

export function SiteHeader({ current }: Props) {
  const link = (l: { label: string; href: string }) => (
    <Link key={l.href} className="label" href={l.href} aria-current={current === l.href ? "page" : undefined}>
      {l.label}
    </Link>
  );
  return (
    <header className="site-top">
      <div className="rl-tray rl-tray--plain velvet" data-theme="maroon">
        <TopBar />
      </div>
      <div data-theme="lamp" className="site-bar">
        <div className="site-bar__in">
          <nav className="nav" aria-label="Main">
            {NAV_MAIN.map(link)}
          </nav>
          <Link href="/" aria-label="Ranlanka, home" className="site-bar__logo">
            <img src="/img/logo.png" alt="Ranlanka" />
          </Link>
          <div className="site-bar__end">
            <nav className="nav" aria-label="More">
              {NAV_MORE.map(link)}
            </nav>
            <Button variant="gold" size="sm" href="/visit">
              Book a viewing
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
