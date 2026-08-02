import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { properties, getPropertyById } from '@/data/properties';
import ImageGallery from '@/components/properties/PropertyDetail/ImageGallery';
import AmenitiesSection from '@/components/properties/PropertyDetail/AmenitiesSection';
import NearbyPlaces from '@/components/properties/PropertyDetail/NearbyPlaces';
import BookingForm from '@/components/properties/PropertyDetail/BookingForm';
import MapSection from '@/components/properties/PropertyDetail/MapSection';
import PropertyDetailClient from '@/components/properties/PropertyDetail/PropertyDetailClient';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const property = getPropertyById(resolvedParams.id);
  if (!property) return { title: 'Property Not Found' };
  return {
    title: `${property.name} | Dream Homes Real Estate`,
    description: property.shortDescription,
    openGraph: {
      title: property.name,
      description: property.shortDescription,
      images: [{ url: property.images[0] }],
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const property = getPropertyById(resolvedParams.id);
  if (!property) notFound();

  return (
    <div className="min-h-screen" style={{ background: '#F8F7F4' }}>
      {/* Full-width image gallery */}
      <ImageGallery images={property.images} propertyName={property.name} />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <PropertyDetailClient property={property} />
      </div>

      {/* Full-width map */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <MapSection
          lat={property.lat}
          lng={property.lng}
          address={property.address}
          propertyName={property.name}
        />
      </div>
    </div>
  );
}
