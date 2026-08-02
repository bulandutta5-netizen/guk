'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, UserCheck, MapPin, Key, Sparkles } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Search,
    title: 'Search & Shortlist',
    description: 'Browse our hand-picked collection of 500+ verified luxury properties using smart filters.',
  },
  {
    step: '02',
    icon: UserCheck,
    title: 'Personalized Advisory',
    description: 'Connect with a senior property advisor who aligns options directly to your lifestyle.',
  },
  {
    step: '03',
    icon: MapPin,
    title: 'Private Site Visits',
    description: 'Enjoy guided private site tours with full chauffeur coordination and legal briefs.',
  },
  {
    step: '04',
    icon: Key,
    title: 'Seamless Ownership',
    description: 'Complete paperwork, loan processing, and key handover with full white-glove service.',
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-24 px-4 bg-[#0F2540] relative border-t border-[#D4AF37]/15">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="section-label justify-center mb-3">
            <Sparkles size={16} className="text-[#D4AF37]" />
            OUR EFFORTLESS PROCESS
          </div>
          <h2 className="font-heading text-4xl md:text-6xl font-extrabold mb-4 text-white">
            Your Journey to the <span className="gold-gradient-text">Perfect Home</span>
          </h2>
          <div className="gold-divider mx-auto mt-4 mb-4" />
          <p className="text-lg max-w-2xl mx-auto text-white/70 font-light">
            Our white-glove 4-step concierge process makes finding and securing your dream home completely stress-free.
          </p>
        </motion.div>

        <div className="relative">
          {/* Gold connecting line */}
          <div 
            className="hidden lg:block absolute top-1/3 left-10 right-10 h-0.5 -translate-y-1/2 z-0" 
            style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), rgba(212,175,55,0.4), transparent)' }} 
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="glass-dark rounded-2xl p-8 border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-300 flex flex-col items-center text-center group"
                >
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-[#071527] border border-[#D4AF37]/40 flex items-center justify-center transition-all duration-300 group-hover:bg-[#D4AF37] group-hover:scale-110 shadow-lg">
                      <Icon size={32} className="text-[#D4AF37] group-hover:text-[#071527] transition-colors" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#071527] flex items-center justify-center text-xs font-extrabold shadow-md">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-xs text-white/60 leading-relaxed font-light">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
