import { Metadata } from 'next';
import Link from 'next/link';
import { PhoneCall, Mail, MapPin } from 'lucide-react';
import ContactForm from './ContactForm';
import MapSection from '@/components/properties/PropertyDetail/MapSection';

export const metadata: Metadata = {
  title: 'Contact Us | Dream Homes',
  description: 'Get in touch with Dream Homes for your real estate needs.',
};

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col bg-off-white">
      {/* Hero Banner */}
      <section className="bg-navy py-24 px-4 relative overflow-hidden bg-navy-gradient">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white">Contact Us</h1>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gold">Contact</span>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-4 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-navy/5 text-center flex flex-col items-center">
            <div className="w-14 h-14 bg-navy rounded-full flex items-center justify-center mb-4">
              <PhoneCall className="w-6 h-6 text-gold" />
            </div>
            <h3 className="text-xl font-bold text-navy mb-2">Phone</h3>
            <p className="text-gray-600 mb-1">+1 (800) 123-4567</p>
            <p className="text-gray-600">+1 (800) 987-6543</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-navy/5 text-center flex flex-col items-center">
            <div className="w-14 h-14 bg-navy rounded-full flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-gold" />
            </div>
            <h3 className="text-xl font-bold text-navy mb-2">Email</h3>
            <p className="text-gray-600 mb-1">info@dreamhomes.com</p>
            <p className="text-gray-600">support@dreamhomes.com</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-navy/5 text-center flex flex-col items-center">
            <div className="w-14 h-14 bg-navy rounded-full flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-gold" />
            </div>
            <h3 className="text-xl font-bold text-navy mb-2">Address</h3>
            <p className="text-gray-600 mb-1">123 Luxury Lane</p>
            <p className="text-gray-600">Beverly Hills, CA 90210</p>
          </div>
        </div>
      </section>

      {/* Map & Form Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <MapSection 
              lat={28.6139} 
              lng={77.2090} 
              address="Connaught Place, New Delhi, Delhi 110001" 
              propertyName="Dream Homes HQ" 
            />
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-navy/5">
            <h2 className="text-2xl font-heading font-bold text-navy mb-6">Send a Message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
