export type PropertyType = 'Apartment' | 'Villa' | 'Penthouse' | 'Row House' | 'Township' | 'Studio';
export type PropertyStatus = 'Ready to Move' | 'Under Construction' | 'New Launch';
export type Currency = 'INR' | 'USD';

export interface PropertyPrice {
  inr: number;
  usd: number;
}

export interface NearbyPlace {
  name: string;
  distance: string;
  type: string;
}

export interface Agent {
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  image: string;
  designation: string;
}

export interface Property {
  id: string;
  name: string;
  price: PropertyPrice;
  pricePerSqft: PropertyPrice;
  location: string;
  address: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  parking: number;
  type: PropertyType;
  status: PropertyStatus;
  isFeatured: boolean;
  isReraApproved: boolean;
  isHot: boolean;
  isNew: boolean;
  description: string;
  shortDescription: string;
  images: string[];
  amenities: string[];
  highlights: string[];
  floorPlan?: string;
  nearbySchools: NearbyPlace[];
  nearbyHospitals: NearbyPlace[];
  nearbyMetro: NearbyPlace[];
  postedDate: string;
  possession: string;
  totalFloors: number;
  floor?: number;
  society?: string;
  rera?: string;
  agent: Agent;
}

export interface SearchFilters {
  location: string;
  type: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number;
  bathrooms: number;
  minArea: number;
  maxArea: number;
  status: string;
  parking: number;
  search?: string;
  city?: string;
  sortBy?: string;
}

export interface EMIParams {
  propertyPrice: number;
  downPayment: number;
  interestRate: number;
  tenureYears: number;
}

export interface AffordabilityParams {
  monthlyIncome: number;
  existingEMI: number;
  downPayment: number;
  interestRate: number;
  loanYears: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  propertyInterest: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}
