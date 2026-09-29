import places from '@/data/places';
import type { Place, PlaceType, City } from '@/types/place';

export type { PlaceType, City };

// ── Haversine distance in km ────────────────────────────────────────────────
function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ── Core accessors ──────────────────────────────────────────────────────────

/** Return all places */
export function getAllPlaces(): Place[] {
  return places;
}

/** Return a single place by slug, or undefined */
export function getPlaceBySlug(slug: string): Place | undefined {
  return places.find((p) => p.slug === slug);
}

/** Return all places of a given type */
export function getPlacesByType(type: PlaceType): Place[] {
  return places.filter((p) => p.type === type);
}

/** Return all places in a given city */
export function getPlacesByCity(city: City): Place[] {
  return places.filter((p) => p.city === city);
}

/** Return featured places, optionally limited to `limit` entries */
export function getFeaturedPlaces(limit?: number): Place[] {
  const featured = places.filter((p) => p.featured);
  return limit ? featured.slice(0, limit) : featured;
}

/** Return all place slugs (for generateStaticParams) */
export function getAllPlaceSlugs(): string[] {
  return places.map((p) => p.slug);
}

// ── Proximity helpers ────────────────────────────────────────────────────────

/** Return places within `radiusKm` km of a given lat/lng */
export function getNearbyPlaces(lat: number, lng: number, radiusKm: number): Place[] {
  return places
    .filter((p) => haversineKm(lat, lng, p.coordinates.lat, p.coordinates.lng) <= radiusKm)
    .sort(
      (a, b) =>
        haversineKm(lat, lng, a.coordinates.lat, a.coordinates.lng) -
        haversineKm(lat, lng, b.coordinates.lat, b.coordinates.lng)
    );
}

/** Return nearby places for a market (uses market slug, looked up from place.nearbyMarkets) */
export function getNearbyPlacesForMarket(marketSlug: string): Place[] {
  return places.filter((p) => p.nearbyMarkets.includes(marketSlug));
}

// ── "Open Today" logic ───────────────────────────────────────────────────────

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** Returns true if the place is open today (not in closedOn array) */
export function isOpenToday(place: Place): boolean {
  const today = DAY_NAMES[new Date().getDay()];
  return !place.closedOn.includes(today);
}

/** Returns today's timing string for a place */
export function getTodayTimings(place: Place): string {
  const today = DAY_NAMES[new Date().getDay()];
  return place.timings[today] ?? 'Hours not listed';
}

// ── Search helper ────────────────────────────────────────────────────────────

/** Client-side text search across name, description, shortDescription, tags, city */
export function searchPlaces(query: string, source: Place[] = places): Place[] {
  if (!query.trim()) return source;
  const q = query.toLowerCase();
  return source.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.city.toLowerCase().includes(q) ||
      p.type.toLowerCase().includes(q) ||
      p.address.toLowerCase().includes(q)
  );
}
