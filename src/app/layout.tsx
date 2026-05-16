import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CompareProvider } from '@/context/CompareContext';
import CompareBar from '@/components/compare/CompareBar';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Local Market Explorer — Discover Markets in Delhi NCR',
    template: '%s | Local Market Explorer',
  },
  description:
    'Discover and compare local markets in Delhi NCR. Get metro directions, crowd levels, price ranges, shopkeeper ratings, nearby food, and much more.',
  keywords: ['Delhi markets', 'Chandni Chowk', 'Sarojini Nagar', 'best markets Delhi NCR', 'Noida markets', 'Gurgaon bazaars', 'local bazaar guide', 'metro directions markets'],
  authors: [{ name: 'Local Market Explorer' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Local Market Explorer',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <CompareProvider>
          <Navbar />
          <main id="main-content">{children}</main>
          <CompareBar />
          <Footer />
        </CompareProvider>
      </body>
    </html>
  );
}
