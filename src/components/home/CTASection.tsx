'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, PhoneCall, Sparkles, ShieldCheck } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-28 px-4 relative overflow-hidden bg-[#071527] border-t border-[#D4AF37]/20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#071527] via-[#0F2540] to-[#071527]" />
      
      {/* Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)', backgroundSize: '32px 32px' }} 
      />

      {/* Gold Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/10 blur-[130px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-dark p-12 md:p-16 rounded-3xl border border-[#D4AF37]/30 shadow-2xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#F3E5AB] text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles size={14} className="text-[#D4AF37]" />
            START YOUR LUXURY JOURNEY TODAY
          </div>

          <h2 className="font-heading text-4xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Ready to Find Your <br />
            <span className="gold-gradient-text">Dream Residence?</span>
          </h2>

          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            Join over 1,200 discerning families who secured their luxury property with Dream Homes Real Estate. Let our senior advisors guide you home.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/properties">
              <button className="btn-gold flex items-center justify-center gap-3 w-full sm:w-auto px-9 py-4">
                Explore Properties Catalog <ArrowRight size={18} />
              </button>
            </Link>
            <Link href="/contact">
              <button className="btn-outline-gold flex items-center justify-center gap-3 w-full sm:w-auto px-9 py-4">
                <PhoneCall size={18} className="text-[#D4AF37]" /> Talk to Senior Advisor
              </button>
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-xs font-semibold text-white/60 pt-8 border-t border-white/10">
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#D4AF37]" /> 100% RERA Verified Listings
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#D4AF37]" /> Zero Brokerage on Select Villas
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#D4AF37]" /> Free Legal Documentation Support
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
