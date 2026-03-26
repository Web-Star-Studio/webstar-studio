import type { Metadata } from 'next';
import { Inter, Syne, Cormorant_Garamond, Oswald, Bebas_Neue } from 'next/font/google';
import localFont from 'next/font/local';
import SmoothScrollProvider from '@/providers/SmoothScrollProvider';
import I18nInit from '@/components/I18nInit';
import LiquidGlassFilter from '@/components/LiquidGlassFilter';
import './globals.css';

const roobert = localFont({
  src: [
    {
      path: '../../public/fonts/Roobert-Light-BmXn8GWP.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Roobert-Regular-CznfJWXD.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Roobert-Medium-BWz8uOPc.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-roobert',
  display: 'swap',
});

const geistMono = localFont({
  src: [
    {
      path: '../../public/fonts/GeistMono-Regular-Cgn4a1uh.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/GeistMono-SemiBold-iuRsyzQv.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-geist-mono',
  display: 'swap',
});

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'WEBSTAR',
  description: 'Web Star Studio is an international software house focused on digital ecosystems, applied AI, and design with purpose.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} ${cormorant.variable} ${oswald.variable} ${bebasNeue.variable} ${roobert.variable} ${geistMono.variable}`}
    >
      <body className="font-sans">
        <I18nInit />
        <LiquidGlassFilter />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
