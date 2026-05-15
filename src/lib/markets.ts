import marketsData from '@/data/markets.json';
import type { Market, City } from '@/types/market';

const markets: Market[] = marketsData as Market[];

export async function getAllMarkets(): Promise<Market[]> {
  return markets;
}

export async function getMarketBySlug(slug: string): Promise<Market | null> {
  return markets.find((m) => m.slug === slug) ?? null;
}

export async function getFeaturedMarkets(): Promise<Market[]> {
  return markets.filter((m) => m.featured);
}

export async function getMarketsByCity(city: City): Promise<Market[]> {
  return markets.filter((m) => m.city === city);
}

export async function getMarketsByCategory(category: string): Promise<Market[]> {
  return markets.filter((m) =>
    m.category.some((c) => c.toLowerCase() === category.toLowerCase())
  );
}

export function searchMarketsClient(query: string, marketList: Market[]): Market[] {
  const q = query.toLowerCase().trim();
  if (!q) return marketList;
  return marketList.filter(
    (m) =>
      m.name.toLowerCase().includes(q) ||
      m.famousFor.some((f) => f.toLowerCase().includes(q)) ||
      m.category.some((c) => c.toLowerCase().includes(q)) ||
      m.tagline.toLowerCase().includes(q) ||
      m.city.toLowerCase().includes(q) ||
      m.location.toLowerCase().includes(q)
  );
}

export async function getAllCategories(): Promise<string[]> {
  const cats = new Set<string>();
  markets.forEach((m) => m.category.forEach((c) => cats.add(c)));
  return Array.from(cats).sort();
}

export async function getAllCities(): Promise<City[]> {
  const cities = new Set<City>();
  markets.forEach((m) => cities.add(m.city));
  return Array.from(cities).sort() as City[];
}

export async function getAllSlugs(): Promise<string[]> {
  return markets.map((m) => m.slug);
}
