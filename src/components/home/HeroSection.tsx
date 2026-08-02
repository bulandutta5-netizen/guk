'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Star, Home, Users, Award, Search, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

const slides = [
  { id: 1, image: '/images/hero-1.png', tag: 'Architectural Triumph', title: 'Skyline Mansion' },
  { id: 2, image: '/images/hero-2.png', tag: 'Penthouse Haven', title: 'Worli Sea Front' },
  { id: 3, image: '/images/hero-3.png', tag: 'Private Estate', title: 'DLF Royal Villa' },
  { id: 4, image: '/images/hero-4.png', tag: 'Contemporary Living', title: 'Juhu Waterfront' },
  { id: 5, image: '/images/hero-5.png', tag: 'Gated Perfection', title: 'Emerald Enclave' },
];

const stats = [
  { icon: Home, label: 'Verified Listings', value: '500+' },
  { icon: Users, label: 'Happy Families', value: '1,200+' },
  { icon: Star, label: 'Years Experience', value: '15+' },
  { icon: Award, label: 'Industry Awards', value: '50+' },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchParams, setSearchParams] = useState({
    location: '',
    type: '',
    minPrice: '',
    maxPrice: ''
  });
  const router = useRouter();

  // Slide interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (searchParams.location) query.append('location', searchParams.location);
    if (searchParams.type) query.append('type', searchParams.type);
    if (searchParams.minPrice) query.append('minPrice', searchParams.minPrice);
    if (searchParams.maxPrice) query.append('maxPrice', searchParams.maxPrice);
    router.push(`/properties?${query.toString()}`);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="relative min-h-[92vh] md:min-h-screen flex flex-col justify-between items-center overflow-hidden w-full pt-28 pb-20 bg-[#071527]">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentSlide].image}
              alt={`Dream Homes property ${currentSlide + 1}`}
              fill
              priority
              className="object-cover"
            />
            {/* Rich multi-layer dark luxury gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#071527]/90 via-[#071527]/70 to-[#071527]" />
            <div className="absolute inset-0 bg-radial from-transparent via-[#071527]/40 to-[#071527]/90" />
          </motion.div>
        </AnimatePresence>

        {/* Pattern overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-15 pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(212,175,55,0.4) 1px, transparent 0)', backgroundSize: '36px 36px' }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:mt-12 my-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-5">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#D4AF37]/40 bg-[#071527]/80 text-[#F3E5AB] text-xs md:text-sm font-bold tracking-widest uppercase backdrop-blur-xl shadow-lg">
              <Sparkles size={14} className="text-[#D4AF37]" />
              INDIA'S PREMIER LUXURY REAL ESTATE AGENCY
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="font-heading text-5xl sm:text-7xl md:text-8xl font-extrabold text-white mb-6 leading-[1.08] tracking-tight">
            Find Your <br />
            <span className="gold-gradient-text">Dream Home</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg sm:text-2xl text-white/85 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            Discover extraordinary residences curated for extraordinary lives. From oceanfront penthouses to private sprawling estates across India.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto justify-center">
            <Link href="/properties">
              <button className="btn-gold flex items-center justify-center gap-3 w-full sm:w-auto">
                Explore 500+ Properties <ArrowRight size={18} />
              </button>
            </Link>
            <Link href="/contact">
              <button className="btn-outline-gold flex items-center justify-center gap-2 w-full sm:w-auto">
                <ShieldCheck size={18} className="text-[#D4AF37]" />
                Book Free Consultation
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Integrated Glass Search Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-14 md:mt-20 glass-dark rounded-2xl p-5 sm:p-7 w-full mx-auto max-w-5xl border border-[#D4AF37]/30 shadow-2xl"
        >
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-end">
            <div className="w-full md:w-1/4">
              <label className="block text-xs font-bold text-[#F3E5AB] uppercase tracking-wider mb-2">Location</label>
              <input 
                type="text" 
                placeholder="Mumbai, Gurgaon, Bangalore..."
                className="input-field"
                value={searchParams.location}
                onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
              />
            </div>
            <div className="w-full md:w-1/4">
              <label className="block text-xs font-bold text-[#F3E5AB] uppercase tracking-wider mb-2">Property Type</label>
              <select 
                className="input-field appearance-none cursor-pointer"
                value={searchParams.type}
                onChange={(e) => setSearchParams({...searchParams, type: e.target.value})}
              >
                <option value="" className="bg-[#071527]">All Property Types</option>
                <option value="Apartment" className="bg-[#071527]">Luxury Apartment</option>
                <option value="Villa" className="bg-[#071527]">Sprawling Villa</option>
                <option value="Penthouse" className="bg-[#071527]">Sea-View Penthouse</option>
                <option value="Row House" className="bg-[#071527]">Heritage Row House</option>
              </select>
            </div>
            <div className="w-full md:w-1/4 flex gap-2">
              <div className="w-1/2">
                <label className="block text-xs font-bold text-[#F3E5AB] uppercase tracking-wider mb-2">Min Price</label>
                <input 
                  type="number" 
                  placeholder="₹ Min"
                  className="input-field"
                  value={searchParams.minPrice}
                  onChange={(e) => setSearchParams({...searchParams, minPrice: e.target.value})}
                />
              </div>
              <div className="w-1/2">
                <label className="block text-xs font-bold text-[#F3E5AB] uppercase tracking-wider mb-2">Max Price</label>
                <input 
                  type="number" 
                  placeholder="₹ Max"
                  className="input-field"
                  value={searchParams.maxPrice}
                  onChange={(e) => setSearchParams({...searchParams, maxPrice: e.target.value})}
                />
              </div>
            </div>
            <div className="w-full md:w-1/4">
              <button type="submit" className="btn-gold w-full flex items-center justify-center gap-2">
                <Search size={18} />
                Search Properties
              </button>
            </div>
          </form>
        </motion.div>

        {/* Floating Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl mx-auto"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="glass-dark border border-[#D4AF37]/20 rounded-2xl p-5 flex flex-col items-center justify-center text-center group hover:border-[#D4AF37] transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center mb-3 group-hover:bg-[#D4AF37] transition-all duration-300">
                <stat.icon className="text-[#D4AF37] group-hover:text-[#071527] transition-colors" size={24} />
              </div>
              <div className="text-3xl font-heading font-extrabold text-white mb-0.5">{stat.value}</div>
              <div className="text-xs font-semibold text-[#F3E5AB] uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Carousel Controls */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 sm:px-10 z-20 pointer-events-none">
        <button 
          onClick={prevSlide}
          className="pointer-events-auto w-12 h-12 rounded-full glass-dark flex items-center justify-center text-white hover:text-[#D4AF37] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="pointer-events-auto w-12 h-12 rounded-full glass-dark flex items-center justify-center text-white hover:text-[#D4AF37] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Slide Dot Indicators */}
      <div className="relative z-20 flex justify-center gap-3 mt-8">
        {slides.map((slide, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === currentSlide 
                ? 'w-10 bg-[#D4AF37]' 
                : 'w-2.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
