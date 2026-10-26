import type { Metadata, Viewport } from "next";
import "./ranlanka.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ranlanka.example"),
  title: { default: "Ranlanka · 22 karat gold, Negombo", template: "%s · Ranlanka" },
  description:
    "Ranlanka, 22 karat gold jewellery, made-to-order pieces and money exchange at 192 Main Street, Negombo. Weighed in front of you since 2008.",
  icons: { icon: "/img/logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="lamp">
      <body>{children}</body>
    </html>
  );
}
