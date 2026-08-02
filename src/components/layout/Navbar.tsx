'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurrency } from '@/context/CurrencyContext';
import { Home, Menu, X, ChevronDown, Phone, ShieldCheck, DollarSign } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [propertiesDropdownOpen, setPropertiesDropdownOpen] = useState(false);
  const { currency, toggleCurrency } = useCurrency();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#071527]/95 backdrop-blur-xl border-b border-[#D4AF37]/25 shadow-2xl py-3'
          : 'bg-gradient-to-b from-[#071527]/90 via-[#071527]/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#AA820A] p-0.5 shadow-lg group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#071527] rounded-[10px] flex items-center justify-center">
                <Home className="w-5 h-5 text-[#D4AF37]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-xl font-extrabold gold-gradient-text tracking-wider leading-none">
                DEMO
              </span>
              <span className="text-[10px] font-bold text-white/70 tracking-[0.25em] uppercase mt-1">
                REAL ESTATE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-semibold text-white/90 hover:text-[#D4AF37] transition-colors"
            >
              Home
            </Link>

            {/* Properties Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setPropertiesDropdownOpen(true)}
              onMouseLeave={() => setPropertiesDropdownOpen(false)}
            >
              <Link
                href="/properties"
                className="text-sm font-semibold text-white/90 hover:text-[#D4AF37] transition-colors flex items-center gap-1 py-2"
              >
                Properties
                <ChevronDown className={`w-4 h-4 transition-transform ${propertiesDropdownOpen ? 'rotate-180 text-[#D4AF37]' : ''}`} />
              </Link>

              <AnimatePresence>
                {propertiesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 w-48 bg-[#0F2540] border border-[#D4AF37]/30 rounded-xl shadow-2xl py-2 overflow-hidden backdrop-blur-xl"
                  >
                    <Link
                      href="/properties?type=Apartment"
                      className="block px-4 py-2.5 text-sm font-medium text-white/80 hover:text-[#D4AF37] hover:bg-[#071527] transition-colors"
                    >
                      Luxury Apartments
                    </Link>
                    <Link
                      href="/properties?type=Villa"
                      className="block px-4 py-2.5 text-sm font-medium text-white/80 hover:text-[#D4AF37] hover:bg-[#071527] transition-colors"
                    >
                      Private Villas
                    </Link>
                    <Link
                      href="/properties?type=Penthouse"
                      className="block px-4 py-2.5 text-sm font-medium text-white/80 hover:text-[#D4AF37] hover:bg-[#071527] transition-colors"
                    >
                      Sea Penthouses
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/about"
              className="text-sm font-semibold text-white/90 hover:text-[#D4AF37] transition-colors"
            >
              About Us
            </Link>

            <Link
              href="/contact"
              className="text-sm font-semibold text-white/90 hover:text-[#D4AF37] transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Right Controls: Currency Toggle & CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Currency Toggle Button */}
            <button
              onClick={toggleCurrency}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#0F2540] text-xs font-bold text-[#F3E5AB] hover:border-[#D4AF37] transition-all shadow-md"
              title="Toggle Currency (INR / USD)"
            >
              <span>{currency === 'INR' ? '₹ INR' : '$ USD'}</span>
            </button>

            {/* CTA Button */}
            <Link href="/contact">
              <button className="btn-gold py-2.5 px-5 text-xs font-bold flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" />
                Book Consultation
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={toggleCurrency}
              className="px-2.5 py-1 rounded-full border border-[#D4AF37]/40 bg-[#0F2540] text-xs font-bold text-[#F3E5AB]"
            >
              {currency === 'INR' ? '₹' : '$'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[#D4AF37]"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#071527] border-b border-[#D4AF37]/30 px-4 py-6"
          >
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-white hover:text-[#D4AF37]"
              >
                Home
              </Link>
              <Link
                href="/properties"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-white hover:text-[#D4AF37]"
              >
                Properties
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-white hover:text-[#D4AF37]"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-white hover:text-[#D4AF37]"
              >
                Contact
              </Link>

              <div className="pt-4 border-t border-[#D4AF37]/20">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <button className="btn-gold w-full py-3 text-xs font-bold">
                    Book Consultation
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
