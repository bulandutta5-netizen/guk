import type { Metadata } from 'next';
import PropertiesClient from './PropertiesClient';

export const metadata: Metadata = {
  title: 'Properties | Dream Homes Real Estate',
  description: 'Browse our exclusive collection of premium properties, luxury villas, and apartments across India.',
};

export default function PropertiesPage() {
  return <PropertiesClient />;
}
