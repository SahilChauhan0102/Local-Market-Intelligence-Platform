import type { MetadataRoute } from 'next';
import { getAllPlaceSlugs } from '@/lib/places';
import { getAllSlugs } from '@/lib/markets';

const BASE_URL = 'https://localgali-alpha.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,              lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/markets`, lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/places`,  lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/compare`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    // Category shortcut pages
    { url: `${BASE_URL}/temples`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/mosques`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/churches`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/dargahs`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/gurudwaras`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  // Dynamic market pages
  let marketSlugs: string[] = [];
  try {
    marketSlugs = await getAllSlugs();
  } catch {
    // Database may be unavailable during static generation
    marketSlugs = [];
  }

  const marketUrls: MetadataRoute.Sitemap = marketSlugs.map((slug) => ({
    url: `${BASE_URL}/market/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Dynamic place pages
  const placeSlugs = getAllPlaceSlugs();
  const placeUrls: MetadataRoute.Sitemap = placeSlugs.map((slug) => ({
    url: `${BASE_URL}/places/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...marketUrls, ...placeUrls];
}
