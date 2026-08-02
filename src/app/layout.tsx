import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { CurrencyProvider } from '@/context/CurrencyContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AIChatbot from '@/components/ai/AIChatbot';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Demo Real Estate — Find Your Perfect Property',
    template: '%s | Demo Real Estate',
  },
  description: 'Discover premium properties across India. Browse 500+ verified luxury apartments, villas, and penthouses in Mumbai, Delhi, Bangalore, Hyderabad, and more.',
  keywords: ['real estate', 'luxury properties', 'apartments', 'villas', 'buy property India', 'Demo'],
  authors: [{ name: 'Demo Real Estate' }],
  creator: 'Demo Real Estate',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://demo.in',
    siteName: 'Demo Real Estate',
    title: 'Demo Real Estate — Find Your Dream Home',
    description: 'Discover premium properties across India. Luxury apartments, villas & penthouses.',
    images: [{ url: '/images/hero-1.png', width: 1200, height: 630, alt: 'Demo Real Estate' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Demo Real Estate',
    description: 'Find your perfect luxury property in India.',
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body>
        <CurrencyProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <AIChatbot />
          <WhatsAppButton phoneNumber="919876543210" />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#0B1F3A',
                color: '#fff',
                borderLeft: '4px solid #C9A84C',
                borderRadius: '8px',
                fontFamily: 'Inter, sans-serif',
              },
              success: { iconTheme: { primary: '#C9A84C', secondary: '#fff' } },
            }}
          />
        </CurrencyProvider>
      </body>
    </html>
  );
}
