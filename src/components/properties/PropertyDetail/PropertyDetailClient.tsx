'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Bed, Bath, Car, Maximize2, MapPin, CheckCircle, Share2, Heart,
  Phone, MessageCircle, Home, ChevronRight, Calendar, Award, Building
} from 'lucide-react';
import type { Property } from '@/types/property';
import { formatPrice, formatArea } from '@/lib/utils';
import { useCurrency } from '@/context/CurrencyContext';
import AmenitiesSection from './AmenitiesSection';
import NearbyPlaces from './NearbyPlaces';
import BookingForm from './BookingForm';
import EMICalculator from '@/components/calculators/EMICalculator';

interface PropertyDetailClientProps {
  property: Property;
}

export default function PropertyDetailClient({ property }: PropertyDetailClientProps) {
  const { currency } = useCurrency();
  const [isFavorited, setIsFavorited] = useState(false);

  const price = currency === 'INR' ? property.price.inr : property.price.usd;

  const statusColor = {
    'Ready to Move': '#16a34a',
    'Under Construction': '#d97706',
    'New Launch': '#2563eb',
  }[property.status] ?? '#64748b';

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6" style={{ color: '#64748b' }}>
        <Link href="/" className="flex items-center gap-1 hover:text-gold transition-colors">
          <Home size={13} /> Home
        </Link>
        <ChevronRight size={13} />
        <Link href="/properties" className="hover:text-gold transition-colors">Properties</Link>
        <ChevronRight size={13} />
        <span style={{ color: '#0B1F3A', fontWeight: 600 }} className="truncate max-w-xs">{property.name}</span>
      </div>

      {/* Property Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8 pb-8"
        style={{ borderBottom: '1px solid #e2e8f0' }}>
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: statusColor }}>
              {property.status}
            </span>
            {property.isReraApproved && (
              <span className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                style={{ background: '#FDF9EE', color: '#C9A84C', border: '1px solid #C9A84C' }}>
                <CheckCircle size={11} /> RERA Approved
              </span>
            )}
            {property.isHot && (
              <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: '#ef4444' }}>🔥 HOT</span>
            )}
            {property.isNew && (
              <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: '#8b5cf6' }}>NEW</span>
            )}
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2" style={{ color: '#0B1F3A' }}>
            {property.name}
          </h1>
          <div className="flex items-center gap-2 mb-4" style={{ color: '#64748b' }}>
            <MapPin size={15} style={{ color: '#C9A84C' }} />
            <span className="text-sm">{property.address}</span>
          </div>
          {/* Quick stats */}
          <div className="flex flex-wrap gap-5">
            {[
              { icon: Bed, label: `${property.bedrooms} Beds` },
              { icon: Bath, label: `${property.bathrooms} Baths` },
              { icon: Maximize2, label: formatArea(property.area) },
              { icon: Car, label: `${property.parking} Parking` },
              { icon: Building, label: property.type },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-sm font-medium" style={{ color: '#334155' }}>
                <Icon size={15} style={{ color: '#C9A84C' }} /> {label}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-3">
          <div className="text-3xl font-bold font-heading" style={{ color: '#C9A84C' }}>
            {formatPrice(price, currency)}
          </div>
          <div className="text-sm" style={{ color: '#64748b' }}>
            {formatPrice(currency === 'INR' ? property.pricePerSqft.inr : property.pricePerSqft.usd, currency)} / sq.ft
          </div>
          {property.rera && (
            <div className="text-xs flex items-center gap-1" style={{ color: '#64748b' }}>
              <Award size={12} /> RERA: {property.rera}
            </div>
          )}
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={() => setIsFavorited(f => !f)}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors"
              style={{
                borderColor: isFavorited ? '#ef4444' : '#e2e8f0',
                background: isFavorited ? '#fef2f2' : '#fff'
              }}
            >
              <Heart size={16} fill={isFavorited ? '#ef4444' : 'none'} style={{ color: isFavorited ? '#ef4444' : '#64748b' }} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={() => navigator.share?.({ title: property.name, url: window.location.href })}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors"
              style={{ borderColor: '#e2e8f0', background: '#fff' }}
            >
              <Share2 size={16} style={{ color: '#64748b' }} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main 2-column layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left column */}
        <div className="flex-1 min-w-0">
          {/* Description */}
          <div className="bg-white rounded-2xl p-7 shadow-sm mb-6" style={{ border: '1px solid #e2e8f0' }}>
            <h2 className="font-heading text-xl font-bold mb-3" style={{ color: '#0B1F3A' }}>About This Property</h2>
            <div className="gold-divider mb-5" />
            <p className="leading-relaxed text-sm" style={{ color: '#475569' }}>{property.description}</p>

            {property.highlights.length > 0 && (
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {property.highlights.map(h => (
                  <div key={h} className="flex items-center gap-2 text-sm" style={{ color: '#334155' }}>
                    <CheckCircle size={14} style={{ color: '#C9A84C' }} /> {h}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-2xl p-7 shadow-sm mb-6" style={{ border: '1px solid #e2e8f0' }}>
            <AmenitiesSection amenities={property.amenities} />
          </div>

          {/* Nearby Places */}
          <div className="bg-white rounded-2xl p-7 shadow-sm mb-6" style={{ border: '1px solid #e2e8f0' }}>
            <NearbyPlaces
              schools={property.nearbySchools}
              hospitals={property.nearbyHospitals}
              metro={property.nearbyMetro}
            />
          </div>
        </div>

        {/* Right sidebar */}
        <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 flex flex-col gap-6">
          {/* Booking Form */}
          <BookingForm propertyName={property.name} />

          {/* Agent Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm" style={{ border: '1px solid #e2e8f0' }}>
            <h3 className="font-heading text-lg font-bold mb-4" style={{ color: '#0B1F3A' }}>Your Agent</h3>
            <div className="flex items-center gap-3 mb-4">
              <img src={property.agent.image} alt={property.agent.name}
                className="w-14 h-14 rounded-full" />
              <div>
                <div className="font-semibold" style={{ color: '#0B1F3A' }}>{property.agent.name}</div>
                <div className="text-xs" style={{ color: '#64748b' }}>{property.agent.designation}</div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <a href={`tel:${property.agent.phone}`}
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-sm transition-all"
                style={{ background: '#0B1F3A', color: '#fff' }}>
                <Phone size={15} /> Call Agent
              </a>
              <a href={`https://wa.me/${property.agent.whatsapp}?text=Hi, I'm interested in ${encodeURIComponent(property.name)}`}
                target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-sm transition-all border"
                style={{ background: '#25D366', color: '#fff', borderColor: '#25D366' }}>
                <MessageCircle size={15} /> WhatsApp
              </a>
            </div>
          </div>

          {/* Inline EMI Calc */}
          <div className="bg-white rounded-2xl p-6 shadow-sm" style={{ border: '1px solid #e2e8f0' }}>
            <h3 className="font-heading text-lg font-bold mb-1" style={{ color: '#0B1F3A' }}>EMI Calculator</h3>
            <div className="gold-divider mb-4" />
            <p className="text-xs mb-3" style={{ color: '#64748b' }}>
              Based on property price: <strong>{formatPrice(property.price.inr, 'INR')}</strong>
            </p>
            <Link href="#emi-calculator" className="btn-gold w-full text-center block py-2.5 rounded-lg text-sm">
              Calculate EMI ↓
            </Link>
          </div>

          {/* Possession info */}
          <div className="rounded-xl p-4 flex items-center gap-3"
            style={{ background: '#F8F7F4', border: '1px solid #e2e8f0' }}>
            <Calendar size={20} style={{ color: '#C9A84C' }} />
            <div>
              <div className="text-xs font-medium" style={{ color: '#64748b' }}>Possession</div>
              <div className="font-semibold text-sm" style={{ color: '#0B1F3A' }}>{property.possession}</div>
            </div>
          </div>
        </div>
      </div>

      {/* EMI Calculator section */}
      <div id="emi-calculator" className="mt-10">
        <EMICalculator defaultPrice={property.price.inr} />
      </div>
    </div>
  );
}
