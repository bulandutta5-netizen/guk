import { Metadata } from 'next';
import Link from 'next/link';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us | Dream Homes',
  description: 'Learn more about Dream Homes, our mission, values, and our expert team.',
};

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-off-white">
      {/* Hero Banner */}
      <section className="bg-navy py-24 px-4 relative overflow-hidden bg-navy-gradient">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white">About Dream Homes</h1>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gold">About Us</span>
          </div>
        </div>
      </section>

      {/* Client Components for Animations */}
      <AboutClient />
    </main>
  );
}
