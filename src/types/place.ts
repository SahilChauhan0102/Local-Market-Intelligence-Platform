export type PlaceType =
  | 'Temple'
  | 'Mosque'
  | 'Church'
  | 'Dargah'
  | 'Gurudwara'
  | 'Monastery'
  | 'Synagogue';

export type City = 'Delhi' | 'Noida' | 'Gurgaon' | 'Ghaziabad' | 'Faridabad';

export interface Place {
  id: string;
  slug: string;
  name: string;
  type: PlaceType;
  city: City;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
  shortDescription: string;
  images: string[];
  timings: {
    [day: string]: string;
  };
  closedOn: string[];
  prayerTimeClosures: boolean;
  bestTimeToVisit: {
    season: string;
    timeOfDay: string;
    avoid: string;
  };
  entryFee: {
    indian: string;
    foreign: string;
    notes?: string;
  };
  crowdLevel: 'Low' | 'Medium' | 'High';
  metroAccess: {
    line: string;
    station: string;
    walkingMinutes: number;
    exit?: string;
  };
  busRoutes?: string[];
  parking: 'Available' | 'Limited' | 'Not Available';
  dresscode: string;
  photographyAllowed: 'Yes' | 'No' | 'Outside Only';
  accessibilityFeatures: string[];
  languagesOfPrayer: string[];
  specialEvents: {
    name: string;
    month: string;
  }[];
  nearbyFood: string[];
  nearbyMarkets: string[];
  rating: number;
  totalRatings: number;
  tags: string[];
  featured: boolean;
  verified: boolean;
}
