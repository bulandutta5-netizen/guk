'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Link from 'next/link';
import { properties } from '@/data/properties';
import PropertyCard from '@/components/properties/PropertyCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FeaturedProperties() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const featuredProperties = properties.slice(0, 6);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <section className="bg-[#071527] py-24 px-4 md:px-8 lg:px-16 border-t border-[#D4AF37]/15 relative overflow-hidden" ref={ref}>
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#D4AF37]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
          <div>
            <div className="section-label mb-3">
              <Sparkles size={16} className="text-[#D4AF37]" />
              HANDPICKED LUXURY PORTFOLIO
            </div>
            <h2 className="text-4xl md:text-6xl font-heading text-white font-extrabold tracking-tight">
              Featured <span className="gold-gradient-text">Properties</span>
            </h2>
            <div className="gold-divider mt-4" />
          </div>

          <Link
            href="/properties"
            className="group flex items-center gap-3 text-[#F3E5AB] font-bold text-sm tracking-wider uppercase hover:text-[#D4AF37] transition-colors duration-300"
          >
            <span>View All 12 Properties</span>
            <div className="w-9 h-9 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-[#071527] transition-all">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredProperties.map((property) => (
            <motion.div key={property.id} variants={itemVariants}>
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 flex justify-center">
          <Link href="/properties">
            <button className="btn-gold flex items-center justify-center gap-3 px-10 py-4">
              Explore Complete Catalog <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
