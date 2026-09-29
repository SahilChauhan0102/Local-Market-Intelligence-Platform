import type { Metadata } from 'next';
import { getAllPlaces } from '@/lib/places';
import PlacesPageWrapper from '@/components/places/PlacesPageClient';

export const metadata: Metadata = {
  title: 'Temples, Mosques, Churches & Dargahs in Delhi NCR | LocalGali',
  description:
    'Find sacred places of worship in Delhi NCR — temples, mosques, churches, dargahs, gurudwaras. Check timings, entry fees, how to reach by metro, best time to visit.',
  keywords: [
    'temples in Delhi',
    'mosques in Delhi',
    'churches in Delhi NCR',
    'dargah Delhi',
    'gurudwara Delhi',
    'places of worship Delhi',
    'Akshardham',
    'Jama Masjid',
    'Bangla Sahib',
    'Nizamuddin Dargah',
  ],
  openGraph: {
    title: 'Places of Worship in Delhi NCR — LocalGali',
    description:
      'Discover temples, mosques, churches, dargahs & gurudwaras across Delhi NCR. Metro directions, timings, crowd levels & more.',
    images: [{ url: 'https://localgali-alpha.vercel.app/og-places.jpg' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Places of Worship in Delhi NCR — LocalGali',
    description: 'Temples, mosques, churches, dargahs & gurudwaras — timings, metro directions, best time to visit.',
  },
};

export default function PlacesPage() {
  const places = getAllPlaces();
  return <PlacesPageWrapper places={places} />;
}
