import type { Market } from '@/types/market';

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
