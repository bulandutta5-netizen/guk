'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Heart,
  Share2,
  Eye,
  Bed,
  Bath,
  Car,
  Maximize2,
  MapPin,
  Star,
  CheckCircle,
  ArrowUpRight
} from 'lucide-react';
import { formatPrice, formatArea } from '@/lib/utils';
import { useCurrency } from '@/context/CurrencyContext';
import { Property } from '@/types/property';

interface PropertyCardProps {
  property: Property;
  showDetails?: boolean;
  className?: string;
}

export default function PropertyCard({
  property,
  showDetails = true,
  className = '',
}: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { currency } = useCurrency();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Ready to Move':
        return 'bg-emerald-600/90 text-emerald-100 border-emerald-500/40';
      case 'Under Construction':
        return 'bg-amber-600/90 text-amber-100 border-amber-500/40';
      case 'New Launch':
        return 'bg-blue-600/90 text-blue-100 border-blue-500/40';
      default:
        return 'bg-[#1C3B63] text-white border-white/20';
    }
  };

  const priceValue = currency === 'INR' ? property.price.inr : property.price.usd;
  const priceDisplay = formatPrice(priceValue, currency);

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`property-card flex flex-col group ${className}`}
    >
      {/* Image Section */}
      <div className="relative h-[270px] w-full overflow-hidden">
        <Link href={`/properties/${property.id}`} className="relative block h-full w-full">
          <Image
            src={property.images[0] || '/images/hero-1.png'}
            alt={property.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>

        {/* Dark image gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F2540] via-transparent to-[#071527]/60 opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {property.status && (
            <span
              className={`px-3 py-1 text-xs font-bold rounded-full backdrop-blur-md border shadow-md ${getStatusBadge(
                property.status
              )}`}
            >
              {property.status}
            </span>
          )}
          <div className="flex gap-2">
            {property.isHot && (
              <span className="px-3 py-1 text-xs font-bold text-white bg-red-600/90 border border-red-400/40 rounded-full flex items-center gap-1 shadow-md backdrop-blur-md">
                <Star className="w-3 h-3 fill-white" /> HOT
              </span>
            )}
            {property.isNew && (
              <span className="px-3 py-1 text-xs font-bold text-white bg-purple-600/90 border border-purple-400/40 rounded-full shadow-md backdrop-blur-md">
                NEW
              </span>
            )}
          </div>
        </div>

        {/* Top-Right Favorite & Share */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleFavoriteClick}
            className="p-2.5 glass-dark rounded-full text-white hover:text-red-400 transition-colors shadow-lg"
          >
            <Heart
              className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`}
            />
          </motion.button>
          <button className="p-2.5 glass-dark rounded-full text-white hover:text-[#D4AF37] transition-colors shadow-lg">
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Property Type Badge Overlay */}
        <div className="absolute bottom-4 left-4 z-10">
          <span className="px-3.5 py-1 text-xs font-bold text-[#F3E5AB] bg-[#071527]/90 border border-[#D4AF37]/40 backdrop-blur-md rounded-full shadow-md">
            {property.type}
          </span>
        </div>
      </div>

      {/* Body Section */}
      <div className="p-6 flex flex-col flex-grow bg-[#0F2540]">
        {/* Price Tag */}
        <div className="mb-3 flex items-baseline justify-between">
          <div>
            <div className="text-3xl font-extrabold font-heading text-[#D4AF37] tracking-tight">
              {priceDisplay}
            </div>
            {property.pricePerSqft && (
              <p className="text-xs text-white/60 mt-0.5 font-medium">
                {formatPrice(
                  currency === 'INR'
                    ? property.pricePerSqft.inr
                    : property.pricePerSqft.usd,
                  currency
                )}
                /sq.ft
              </p>
            )}
          </div>
        </div>

        {/* Property Title */}
        <Link href={`/properties/${property.id}`} className="block mb-2 group/link">
          <h3 className="font-heading text-xl font-bold text-white line-clamp-1 group-hover/link:text-[#F3E5AB] transition-colors flex items-center justify-between">
            <span>{property.name}</span>
            <ArrowUpRight size={18} className="text-[#D4AF37] opacity-0 group-hover/link:opacity-100 transition-opacity" />
          </h3>
        </Link>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-white/70 mb-5 text-xs font-medium">
          <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
          <span className="truncate">{property.location || property.address}</span>
        </div>

        {showDetails && (
          <>
            {/* Quick Specs Grid */}
            <div className="grid grid-cols-4 gap-2 py-3 border-y border-[#D4AF37]/15 my-auto mb-5 bg-[#071527]/50 rounded-xl px-2">
              <div className="flex flex-col items-center justify-center gap-1">
                <Bed className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xs font-bold text-white">
                  {property.bedrooms} Beds
                </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-l border-white/10">
                <Bath className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xs font-bold text-white">
                  {property.bathrooms} Baths
                </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-l border-white/10">
                <Maximize2 className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xs font-bold text-white truncate max-w-full px-1">
                  {property.area} sqft
                </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-l border-white/10">
                <Car className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xs font-bold text-white">
                  {property.parking} Park
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between mt-auto gap-3">
              {property.isReraApproved ? (
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-500/30">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  RERA
                </span>
              ) : (
                <span />
              )}
              <Link href={`/properties/${property.id}`} className="flex-1 max-w-[150px]">
                <button className="btn-navy w-full py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2">
                  <Eye size={14} />
                  View Details
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
