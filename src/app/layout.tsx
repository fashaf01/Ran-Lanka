import type { Metadata, Viewport } from "next";
import "@fontsource/bodoni-moda/400.css";
import "@fontsource/bodoni-moda/400-italic.css";
import "@fontsource/bodoni-moda/500.css";
import "@fontsource/jost/300.css";
import "@fontsource/jost/400.css";
import "@fontsource/jost/500.css";
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
  themeColor: "#062A24",
  colorScheme: "light",
};

// Runs before paint: marks that scripts run.
const BOOT = `document.documentElement.classList.add('js');`;

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
