'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Aditya Bansal',
    designation: 'Tech Entrepreneur, Bangalore',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya',
    rating: 5,
    property: 'Prestige Heights, Whitefield',
    text: 'Dream Homes completely transformed my property search experience. Their team was incredibly professional, knowledgeable, and patient. They found me a perfect 3BHK in Whitefield that matched every item on my wishlist — within my budget and even better than I imagined.',
  },
  {
    id: 2,
    name: 'Sunita Patel',
    designation: 'Investment Banker, Mumbai',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sunita',
    rating: 5,
    property: 'Worli Sea Face Penthouse',
    text: 'I\'ve worked with many real estate agencies, but Dream Homes is in a completely different league. Their curated portfolio of luxury properties is unmatched, and their market knowledge is encyclopedic. I now own my dream Worli penthouse with sea views!',
  },
  {
    id: 3,
    name: 'Dr. Ramesh Nair',
    designation: 'Consultant Surgeon, Hyderabad',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ramesh',
    rating: 5,
    property: 'Azure Greens Villa, HITEC City',
    text: 'The team at Dream Homes understood our family\'s needs perfectly. We wanted a villa with a pool for our kids, near quality schools. They found us the Azure Greens villa within a week and handled all legal documentation seamlessly.',
  },
  {
    id: 4,
    name: 'Kaveri Krishnamurthy',
    designation: 'IIT Professor, Chennai',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kaveri',
    rating: 5,
    property: 'ECR Penthouse, Chennai',
    text: 'After years of searching for a sea-facing property in Chennai, Dream Homes found me the Crest View penthouse on ECR in just two weeks. Their attention to detail, transparency in pricing, and post-sale support have been exceptional.',
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 px-4 bg-[#071527] relative border-t border-[#D4AF37]/15 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-label justify-center mb-3">
            <Sparkles size={16} className="text-[#D4AF37]" />
            CLIENT SUCCESS STORIES
          </div>
          <h2 className="font-heading text-4xl md:text-6xl font-extrabold mb-4 text-white">
            What Our <span className="gold-gradient-text">Clients Say</span>
          </h2>
          <div className="gold-divider mx-auto mt-4 mb-4" />
          <p className="text-lg max-w-2xl mx-auto text-white/70 font-light">
            Real experiences from homebuyers who discovered their dream residence with us.
          </p>
        </motion.div>

        {/* Desktop 3-column grid */}
        <div className="hidden md:grid grid-cols-3 gap-7">
          {testimonials.slice(0, 3).map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="glass-dark rounded-2xl p-8 border border-[#D4AF37]/20 flex flex-col hover:border-[#D4AF37] transition-all duration-300 shadow-xl"
            >
              <Quote size={36} className="text-[#D4AF37] mb-5 opacity-80" />
              <p className="text-sm leading-relaxed mb-6 flex-1 text-white/80 font-light">{t.text}</p>
              <div className="flex items-center gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={15} className="fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border border-[#D4AF37]/40 bg-[#0F2540]" />
                <div>
                  <div className="font-bold text-sm text-white">{t.name}</div>
                  <div className="text-xs text-white/60">{t.designation}</div>
                  <div className="text-xs font-semibold text-[#F3E5AB] mt-0.5">{t.property}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.35 }}
              className="glass-dark rounded-2xl p-7 border border-[#D4AF37]/20"
            >
              <Quote size={32} className="text-[#D4AF37] mb-4 opacity-80" />
              <p className="text-sm leading-relaxed mb-6 text-white/80">{testimonials[current].text}</p>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                <img src={testimonials[current].avatar} alt={testimonials[current].name} className="w-11 h-11 rounded-full border border-[#D4AF37]/40" />
                <div>
                  <div className="font-bold text-sm text-white">{testimonials[current].name}</div>
                  <div className="text-xs text-white/60">{testimonials[current].designation}</div>
                  <div className="text-xs font-semibold text-[#F3E5AB]">{testimonials[current].property}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#F3E5AB]">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className="h-2 rounded-full transition-all"
                  style={{ width: i === current ? '24px' : '8px', background: i === current ? '#D4AF37' : 'rgba(255,255,255,0.3)' }} />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#F3E5AB]">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
