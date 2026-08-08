export type Language = 'th' | 'en';

export type QuoteStatus = 'new' | 'contacted' | 'quoted' | 'confirmed' | 'completed' | 'cancelled' | 'no_response';

export type TripType = 
  | 'airport_transfer'
  | 'day_trip_chiangmai'
  | 'inter_province'
  | 'one_way'
  | 'round_trip'
  | 'multi_day'
  | 'other';

export type VehicleCategory = 'sedan' | 'suv' | 'van' | 'recommend';

export interface QuoteRequest {
  id: string;
  quote_code: string;
  travel_date: string;
  travel_time: string;
  pickup_location: string;
  destination: string;
  trip_type: TripType;
  passengers: number;
  luggage: number;
  vehicle_type: VehicleCategory;
  vehicle_id?: string;
  package_id?: string;
  customer_name: string;
  phone: string;
  line_id?: string;
  email?: string;
  note?: string;
  language: Language;
  status: QuoteStatus;
  source: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landing_page?: string;
  referrer?: string;
  ip_hash?: string;
  user_agent?: string;
  created_at: string;
  updated_at: string;
}

export interface Vehicle {
  id: string;
  name_th: string;
  name_en: string;
  type: VehicleCategory;
  capacity_passengers: string;
  capacity_luggage: string;
  price_start: number;
  image: string;
  amenities_th: string[];
  amenities_en: string[];
  description_th: string;
  description_en: string;
  suitable_for_th: string;
  suitable_for_en: string;
  includes_th: string[];
  includes_en: string[];
}

export interface TourPackage {
  id: string;
  slug: string;
  title_th: string;
  title_en: string;
  image: string;
  key_spots_th: string[];
  key_spots_en: string[];
  duration_th: string;
  duration_en: string;
  price_start: number;
  capacity_th: string;
  capacity_en: string;
  includes_th: string[];
  includes_en: string[];
  excludes_th: string[];
  excludes_en: string[];
  tags: string[];
  category: 'half_day' | 'full_day' | 'multi_day' | 'nature' | 'cafe' | 'temple' | 'culture' | 'family' | 'upcountry';
  description_th?: string;
  description_en?: string;
}

export interface Review {
  id: string;
  author: string;
  location_th: string;
  location_en: string;
  route_th: string;
  route_en: string;
  vehicle_type: string;
  rating: number;
  comment_th: string;
  comment_en: string;
  date: string;
  source: 'Google' | 'Facebook' | 'LINE';
  avatar?: string;
}

export interface FAQItem {
  id: string;
  question_th: string;
  question_en: string;
  answer_th: string;
  answer_en: string;
  category: 'price' | 'booking' | 'service' | 'payment';
}

export interface ServiceDetail {
  slug: string;
  title_th: string;
  title_en: string;
  hero_image: string;
  description_th: string;
  description_en: string;
  price_start: number;
  duration_th: string;
  duration_en: string;
  highlights_th: string[];
  highlights_en: string[];
  itinerary_th?: { time: string; activity: string }[];
  itinerary_en?: { time: string; activity: string }[];
  includes_th: string[];
  includes_en: string[];
  excludes_th: string[];
  excludes_en: string[];
  faqs: { q_th: string; q_en: string; a_th: string; a_en: string }[];
}

export interface SiteSettings {
  phone: string;
  line_id: string;
  line_url: string;
  facebook_url: string;
  email: string;
  address_th: string;
  address_en: string;
  operating_hours_th: string;
  operating_hours_en: string;
  price_start_sedan: number;
  price_start_suv: number;
  price_start_van: number;
}
