'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, Home, Search } from 'lucide-react';
import { properties } from '@/data/properties';
import PropertyCard from '@/components/properties/PropertyCard';
import PropertyFilters from '@/components/properties/PropertyFilters';
import type { SearchFilters } from '@/types/property';

export default function PropertiesClient() {
  const [filters, setFilters] = useState<Partial<SearchFilters>>({
    location: '',
    type: '',
    minPrice: 0,
    maxPrice: 100000000,
    bedrooms: 0,
    bathrooms: 0,
    minArea: 0,
    maxArea: 0,
    status: '',
    parking: 0,
  });

  const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const filteredProperties = useMemo(() => {
    let result = [...properties];

    if (filters.location) {
      const q = filters.location.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q)
      );
    }
    if (filters.type && filters.type !== 'All') {
      result = result.filter(p => p.type === filters.type);
    }
    if (filters.minPrice && filters.minPrice > 0) {
      result = result.filter(p => p.price.inr >= filters.minPrice!);
    }
    if (filters.maxPrice && filters.maxPrice < 100000000) {
      result = result.filter(p => p.price.inr <= filters.maxPrice!);
    }
    if (filters.bedrooms && filters.bedrooms > 0) {
      result = result.filter(p => p.bedrooms >= filters.bedrooms!);
    }
    if (filters.bathrooms && filters.bathrooms > 0) {
      result = result.filter(p => p.bathrooms >= filters.bathrooms!);
    }
    if (filters.status && filters.status !== 'All') {
      result = result.filter(p => p.status === filters.status);
    }
    return result;
  }, [filters]);

  return (
    <main className="min-h-screen" style={{ background: '#F8F7F4' }}>
      {/* Hero Banner */}
      <section className="py-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #1A3A5C 100%)' }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #C9A84C 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 text-sm mb-5" style={{ color: '#94a3b8' }}>
            <Link href="/" className="flex items-center gap-1 hover:text-gold transition-colors" style={{ color: '#94a3b8' }}>
              <Home size={14} /> Home
            </Link>
            <ChevronRight size={14} />
            <span style={{ color: '#C9A84C' }}>Properties</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-3">
            Premium Properties
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: '#94a3b8' }}>
            Discover our exclusive collection of luxury homes, modern apartments, and premium villas across India.
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <PropertyFilters onFilterChange={handleFilterChange} />

          <div className="mt-6 flex items-center justify-between mb-6">
            <p className="font-medium" style={{ color: '#475569' }}>
              Showing <span className="font-bold" style={{ color: '#0B1F3A' }}>{filteredProperties.length}</span> properties
            </p>
          </div>

          {filteredProperties.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              <AnimatePresence>
                {filteredProperties.map((property, i) => (
                  <motion.div
                    key={property.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                  >
                    <PropertyCard property={property} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-14 text-center shadow-sm border"
              style={{ borderColor: '#e2e8f0' }}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: '#F8F7F4' }}>
                <Search size={28} style={{ color: '#94a3b8' }} />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-2" style={{ color: '#0B1F3A' }}>No properties found</h3>
              <p className="mb-6" style={{ color: '#64748b' }}>
                Try adjusting your filters or clearing them to see all properties.
              </p>
              <button
                onClick={() => handleFilterChange({ location: '', type: '', minPrice: 0, maxPrice: 100000000, bedrooms: 0, bathrooms: 0, status: '' })}
                className="btn-navy px-7 py-3"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
