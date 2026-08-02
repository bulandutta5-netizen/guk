'use client';

import dynamic from 'next/dynamic';

const LeafletMapInner = dynamic(() => import('./LeafletMapInner'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] rounded-[16px] bg-navy/5 animate-pulse flex items-center justify-center">
      <p className="text-navy-mid font-medium">Loading map...</p>
    </div>
  ),
});

export default function MapSection({
  lat,
  lng,
  address,
  propertyName,
}: {
  lat: number;
  lng: number;
  address: string;
  propertyName: string;
}) {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-heading text-navy font-bold mb-2">Location & Map</h2>
      <div className="w-16 h-1 bg-gold mb-6 gold-divider"></div>
      <div className="rounded-[16px] overflow-hidden shadow-lg border border-navy/10 relative z-0">
        <LeafletMapInner lat={lat} lng={lng} address={address} propertyName={propertyName} />
      </div>
    </section>
  );
}
