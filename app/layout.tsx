import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Manrope, Noto_Sans_Sinhala } from 'next/font/google';
import { StoreProvider } from '@/lib/store';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BagDrawer } from '@/components/BagDrawer';
import { Reveal } from '@/components/Reveal';
import './globals.css';

// Vonca is the display face: headlines, titles and the wordmark only.
const vonca = localFont({
  src: [
    { path: './fonts/vonca-extralight.woff2', weight: '200' },
    { path: './fonts/vonca-light.woff2', weight: '300' },
    { path: './fonts/vonca-regular.woff2', weight: '400' },
    { path: './fonts/vonca-medium.woff2', weight: '500' }
  ],
  variable: '--font-vonca',
  display: 'swap'
});
// Manrope carries everything people need to read: body, prices, labels, forms.
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' });
const sinhala = Noto_Sans_Sinhala({ subsets: ['sinhala'], weight: ['300', '400'], variable: '--font-sinhala', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://ranlanka.vercel.app'),
  title: { default: 'Ranlanka · The gold of Lanka', template: '%s · Ranlanka' },
  description: 'Ranlanka, twenty-two karat gold jewellery at 192 Main Street, Negombo. Bridal sets, fine jewellery made to your design, and money exchange. Since 2008.',
  openGraph: { images: ['/images/hero-saree.webp'] }
};

export const viewport: Viewport = { themeColor: '#ffffff' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${vonca.variable} ${manrope.variable} ${sinhala.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <StoreProvider>
          <a className="skip" href="#main">Skip to content</a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <BagDrawer />
          <Reveal />
        </StoreProvider>
      </body>
    </html>
  );
}
