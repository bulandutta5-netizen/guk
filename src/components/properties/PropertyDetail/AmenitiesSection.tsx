'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Waves, Dumbbell, Car, Shield, Wifi, Zap, Trees, Coffee,
  School, ShoppingBag, Film, Music, Heart, Baby, Dog,
  CheckCircle2, Sparkles, Sun, Wind, Droplets, Lock,
} from 'lucide-react';

const AMENITY_ICONS: Record<string, React.ElementType> = {
  'swimming pool': Waves, 'infinity pool': Waves, 'wave pool': Waves,
  'gym': Dumbbell, 'fitness center': Dumbbell, 'fitness studio': Dumbbell,
  'parking': Car, 'valet parking': Car, 'covered parking': Car, 'car porch': Car,
  'security': Shield, '24/7 security': Shield, 'security system': Shield, 'cctv': Lock,
  'wifi': Wifi, 'smart home': Wifi, 'smart lighting': Zap, 'smart automation': Zap,
  'garden': Trees, 'landscaped garden': Trees, 'terrace garden': Trees,
  'clubhouse': Coffee, 'business lounge': Coffee, 'multipurpose hall': Coffee,
  'school': School, 'kids zone': Baby, 'children\'s zone': Baby,
  'supermarket': ShoppingBag, 'retail zone': ShoppingBag,
  'home theatre': Film, 'multiplex': Film,
  'spa': Heart, 'spa & salon': Heart,
  'solar panels': Sun, 'solar power': Sun,
  'rainwater harvesting': Droplets, 'water softener': Droplets,
  'generator': Zap, 'generator backup': Zap, 'power backup': Zap,
  'pet zone': Dog,
  'amphitheatre': Music,
};

function getAmenityIcon(amenity: string): React.ElementType {
  const lower = amenity.toLowerCase();
  for (const [key, Icon] of Object.entries(AMENITY_ICONS)) {
    if (lower.includes(key)) return Icon;
  }
  return CheckCircle2;
}

interface AmenitiesSectionProps {
  amenities: string[];
}

export default function AmenitiesSection({ amenities }: AmenitiesSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div className="py-8" ref={ref}>
      <div className="flex items-center gap-3 mb-6">
        <Sparkles size={22} style={{ color: '#C9A84C' }} />
        <h3 className="font-heading text-2xl font-bold" style={{ color: '#0B1F3A' }}>
          Amenities & Features
        </h3>
      </div>
      <div className="gold-divider mb-8" />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {amenities.map((amenity, index) => {
          const Icon = getAmenityIcon(amenity);
          return (
            <motion.div
              key={amenity}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 hover:border-gold hover:bg-cream"
              style={{ borderColor: '#e2e8f0', background: '#FAFAFA' }}
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #0B1F3A, #1A3A5C)' }}>
                <Icon size={16} style={{ color: '#C9A84C' }} />
              </div>
              <span className="text-sm font-medium leading-tight" style={{ color: '#334155' }}>
                {amenity}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
