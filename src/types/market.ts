export type CrowdLevel = 'Low' | 'Medium' | 'High';
export type PriceRange = '₹' | '₹₹' | '₹₹₹';
export type BehaviourType = 'Friendly' | 'Average' | 'Rude';
export type ParkingType = 'Available' | 'Limited' | 'None';
export type City = 'Sirsa' | 'Delhi' | 'Noida' | 'Gurgaon' | 'Faridabad' | 'Ghaziabad';

export interface CrowdData {
  morning: CrowdLevel;
  afternoon: CrowdLevel;
  evening: CrowdLevel;
}

export interface ExperienceData {
  behaviour: BehaviourType;
  bargaining: boolean;
  familyFriendly: boolean;
  parking: ParkingType;
}

export interface FoodPlace {
  name: string;
  rating: number;
  type?: string;
}

export interface Directions {
  nearestMetro?: string;         // Metro station name + line, e.g. "Chandni Chowk — Yellow Line"
  metroWalkTime?: string;        // e.g. "5 min walk"
  nearestRailway?: string;       // Railway station name, e.g. "Old Delhi Railway Station"
  railwayDistance?: string;      // e.g. "1.2 km, 10 min auto"
  nearestBusStop?: string;       // Bus stop name
  busRoutes?: string[];          // e.g. ["DTC 908", "DTC 780A"]
  autoRickshaw: boolean;
  tips?: string;                 // Extra navigation tip
}

export interface MarketStory {
  established?: string;          // e.g. "1650 AD" or "Early 1900s"
  famousShops?: string[];        // Notable shops/vendors
  funFacts?: string[];           // Interesting trivia
  body: string;                  // 200-250 word blog content
}

export interface Market {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  city: City;
  category: string[];
  famousFor: string[];
  priceRange: PriceRange;
  bestTimeToVisit: string;
  location: string;
  directions: Directions;
  crowd: CrowdData;
  experience: ExperienceData;
  foodNearby: FoodPlace[];
  nearbyPlaces: string[];
  images: string[];
  featured: boolean;
  rating: number;
  reviewCount: number;
  story?: MarketStory;
}
