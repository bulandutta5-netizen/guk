'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, Users, Award, ThumbsUp, Sparkles } from 'lucide-react';

const stats = [
  { icon: Building2, value: '500+', label: 'Premium Properties', description: 'Verified luxury listings across 12 tier-1 cities' },
  { icon: Users, value: '1,200+', label: 'Happy Families', description: 'Placed in high-value dream residences' },
  { icon: Award, value: '15+', label: 'Years of Excellence', description: 'Trusted luxury real estate advisors since 2008' },
  { icon: ThumbsUp, value: '50+', label: 'Industry Awards', description: 'Recognized for innovation and transparency' },
];

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="glass-dark p-8 rounded-2xl border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-300 group flex flex-col items-center text-center relative overflow-hidden"
    >
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 bg-[#D4AF37]/15 border border-[#D4AF37]/30 transition-all duration-300 group-hover:bg-[#D4AF37] group-hover:scale-110">
        <Icon size={28} className="text-[#D4AF37] group-hover:text-[#071527] transition-colors" />
      </div>
      <div className="text-4xl font-extrabold mb-1 font-heading gold-gradient-text">
        {stat.value}
      </div>
      <div className="text-lg font-bold mb-2 text-white">{stat.label}</div>
      <div className="text-xs text-white/60 leading-relaxed max-w-[200px]">{stat.description}</div>
    </motion.div>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="py-24 px-4 bg-[#071527] relative border-t border-[#D4AF37]/10">
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
            EXCELLENCE IN NUMBERS
          </div>
          <h2 className="font-heading text-4xl md:text-6xl font-extrabold mb-4 text-white">
            Trusted by Industry Leaders & Families
          </h2>
          <div className="gold-divider mx-auto mt-4 mb-4" />
          <p className="text-lg text-white/70 max-w-2xl mx-auto font-light">
            Over 15 years of industry leadership in high-end residential and investment properties across India.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
