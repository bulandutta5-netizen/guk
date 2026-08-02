'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { SearchFilters } from '@/types/property';
import { allCities, allTypes } from '@/data/properties';
import { motion, AnimatePresence } from 'framer-motion';

interface PropertyFiltersProps {
  onFilterChange: (filters: Partial<SearchFilters>) => void;
  initialFilters?: Partial<SearchFilters>;
}

export default function PropertyFilters({ onFilterChange, initialFilters = {} }: PropertyFiltersProps) {
  const [filters, setFilters] = useState<Partial<SearchFilters>>({
    search: '',
    city: 'All',
    type: 'All',
    minPrice: 0,
    maxPrice: 100000000,
    bedrooms: 0,
    bathrooms: 0,
    status: 'All',
    sortBy: 'Newest',
    ...initialFilters,
  });

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const updateFilter = useCallback((key: keyof SearchFilters, value: any) => {
    setFilters((prev) => {
      const updated = { ...prev, [key]: value };
      onFilterChange(updated);
      return updated;
    });
  }, [onFilterChange]);

  const clearFilters = () => {
    const cleared: Partial<SearchFilters> = {
      search: '',
      city: 'All',
      type: 'All',
      minPrice: 0,
      maxPrice: 100000000,
      bedrooms: 0,
      bathrooms: 0,
      status: 'All',
      sortBy: 'Newest',
    };
    setFilters(cleared);
    onFilterChange(cleared);
  };

  const activeCount = Object.entries(filters).filter(([key, val]) => {
    if (key === 'search' && val) return true;
    if (key === 'city' && val !== 'All') return true;
    if (key === 'type' && val !== 'All') return true;
    if (key === 'minPrice' && typeof val === 'number' && val > 0) return true;
    if (key === 'maxPrice' && typeof val === 'number' && val < 100000000) return true;
    if (key === 'bedrooms' && typeof val === 'number' && val > 0) return true;
    if (key === 'bathrooms' && typeof val === 'number' && val > 0) return true;
    if (key === 'status' && val !== 'All') return true;
    if (key === 'sortBy' && val !== 'Newest') return true;
    return false;
  }).length;

  const bedroomOptions = [1, 2, 3, 4, 5];
  const bathroomOptions = [1, 2, 3, 4];
  const statusOptions = ['Ready to Move', 'Under Construction', 'New Launch'];
  const sortOptions = ['Newest', 'Price Low-High', 'Price High-Low', 'Area'];

  return (
    <div className="glass-dark rounded-2xl shadow-2xl border border-[#D4AF37]/30 overflow-hidden text-white">
      {/* Mobile Header Toggle */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-100 bg-off-white">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="flex items-center gap-2 text-navy font-medium"
        >
          <SlidersHorizontal size={20} />
          Filters
          {activeCount > 0 && (
            <span className="bg-gold text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {activeCount}
            </span>
          )}
        </button>
        <button onClick={clearFilters} className="text-sm text-gray-500 hover:text-navy">
          Clear
        </button>
      </div>

      {/* Filter Panel */}
      <div className={`p-6 lg:block ${isMobileOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col gap-6">
          
          {/* Header & Clear (Desktop) */}
          <div className="hidden lg:flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2 text-navy font-bold font-heading">
              <SlidersHorizontal size={20} className="text-gold" />
              Search Filters
              {activeCount > 0 && (
                <span className="bg-gold text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {activeCount}
                </span>
              )}
            </div>
            {activeCount > 0 && (
              <button onClick={clearFilters} className="text-sm text-gray-500 hover:text-navy transition-colors flex items-center gap-1">
                <X size={14} /> Clear All
              </button>
            )}
          </div>

          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search properties, locations..."
              className="input-field w-full pl-10 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
              value={filters.search || ''}
              onChange={(e) => updateFilter('search', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            {/* City & Type */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy-mid mb-2">City</label>
                <select
                  className="w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:border-gold"
                  value={filters.city}
                  onChange={(e) => updateFilter('city', e.target.value)}
                >
                  <option value="All">All Cities</option>
                  {allCities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-mid mb-2">Property Type</label>
                <select
                  className="w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:border-gold"
                  value={filters.type}
                  onChange={(e) => updateFilter('type', e.target.value)}
                >
                  <option value="All">All Types</option>
                  {allTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-navy-mid mb-2">Budget Range ($)</label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full rounded-lg border border-gray-200 p-2 focus:outline-none focus:border-gold"
                  value={filters.minPrice || ''}
                  onChange={(e) => updateFilter('minPrice', Number(e.target.value))}
                />
                <span className="text-gray-400">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full rounded-lg border border-gray-200 p-2 focus:outline-none focus:border-gold"
                  value={filters.maxPrice === 100000000 ? '' : filters.maxPrice}
                  onChange={(e) => updateFilter('maxPrice', e.target.value ? Number(e.target.value) : 100000000)}
                />
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-sm font-medium text-navy-mid mb-2">Bedrooms</label>
              <div className="flex flex-wrap gap-2">
                {bedroomOptions.map((bed) => (
                  <button
                    key={bed}
                    onClick={() => updateFilter('bedrooms', filters.bedrooms === bed ? 0 : bed)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      filters.bedrooms === bed
                        ? 'bg-gold text-white shadow-md'
                        : 'bg-off-white text-navy-mid hover:bg-gold-light hover:text-navy border border-gray-200'
                    }`}
                  >
                    {bed} BHK
                  </button>
                ))}
              </div>
            </div>

            {/* Bathrooms */}
            <div>
              <label className="block text-sm font-medium text-navy-mid mb-2">Bathrooms</label>
              <div className="flex flex-wrap gap-2">
                {bathroomOptions.map((bath) => (
                  <button
                    key={bath}
                    onClick={() => updateFilter('bathrooms', filters.bathrooms === bath ? 0 : bath)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      filters.bathrooms === bath
                        ? 'bg-gold text-white shadow-md'
                        : 'bg-off-white text-navy-mid hover:bg-gold-light hover:text-navy border border-gray-200'
                    }`}
                  >
                    {bath} Bath
                  </button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-navy-mid mb-2">Status</label>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    onClick={() => updateFilter('status', filters.status === status ? 'All' : status)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      filters.status === status
                        ? 'bg-navy text-white shadow-md'
                        : 'bg-off-white text-navy-mid hover:bg-gray-200 border border-gray-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-navy-mid mb-2">Sort By</label>
              <select
                className="w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:border-gold bg-off-white"
                value={filters.sortBy}
                onChange={(e) => updateFilter('sortBy', e.target.value)}
              >
                {sortOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
