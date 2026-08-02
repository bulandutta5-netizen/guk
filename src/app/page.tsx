import React from 'react';
import { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import FeaturedProperties from '@/components/home/FeaturedProperties';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';
import EMICalculator from '@/components/calculators/EMICalculator';
import AffordabilityCalculator from '@/components/calculators/AffordabilityCalculator';
import { Sparkles } from 'lucide-react';

import FinancialToolsSection from '@/components/home/FinancialToolsSection';

export const metadata: Metadata = {
  title: 'Dream Homes Real Estate — India\'s Premier Luxury Real Estate Agency',
  description: 'Discover extraordinary properties, luxury penthouses, and sprawling villas across India with Dream Homes Real Estate.',
};

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-[#071527]">
      <HeroSection />
      
      <StatsSection />
      
      <FeaturedProperties />
      
      <HowItWorks />
      
      <Testimonials />

      <FinancialToolsSection />
      
      <CTASection />
    </main>
  );
}
