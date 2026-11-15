import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/archivo/400.css";
import "@fontsource/archivo/500.css";
import "@fontsource/archivo/600.css";
import "@fontsource/pinyon-script/400.css";
import "@fontsource/abhaya-libre/600.css";
import "@fontsource/abhaya-libre/700.css";
import "@fontsource/abhaya-libre/800.css";
import "./site.css";
import SiteChrome from "@/components/SiteChrome";
import Footer from "@/components/Footer";
import { ORNAMENT_SPRITE } from "@/components/ornaments";

export const metadata: Metadata = {
  title: { default: "Ranlanka · 22 karat gold, Negombo", template: "%s · Ranlanka" },
  description:
    "Ranlanka, 22 karat gold jewellery, bespoke pieces and money exchange at 192 Main Street, Negombo. Weighed in front of you since 2008.",
  icons: { icon: "/img/logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#FAF3E3",
  colorScheme: "light",
};

// Runs before paint: marks that scripts run, and skips the loader except on a first visit to the home page.
const BOOT = `(function(){var d=document.documentElement;d.classList.add('js');try{if(location.pathname!=='/'||sessionStorage.getItem('rl-site3')||matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('no-loader');}catch(e){d.classList.add('no-loader');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>
        <div dangerouslySetInnerHTML={{ __html: ORNAMENT_SPRITE }} />
        <SiteChrome />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
