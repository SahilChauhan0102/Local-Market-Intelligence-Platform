import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import FeaturedMarkets from '@/components/home/FeaturedMarkets';
import FeaturedPlaces from '@/components/home/FeaturedPlaces';
import PopularCategories from '@/components/home/PopularCategories';
import CTASection from '@/components/home/CTASection';
import { getFeaturedMarkets } from '@/lib/markets';
import { getFeaturedPlaces } from '@/lib/places';

export const metadata: Metadata = {
  title: 'LocalGali — Markets & Sacred Places in Delhi NCR',
  description: 'Discover and compare the best local markets and sacred places of worship in Delhi NCR. Check crowd levels, metro directions, timings, entry fees and much more.',
};

export default async function HomePage() {
  const featuredMarkets = await getFeaturedMarkets();
  const featuredPlaces  = getFeaturedPlaces(6);

  return (
    <>
      <HeroSection />
      <FeaturedMarkets markets={featuredMarkets} />
      <FeaturedPlaces places={featuredPlaces} />
      <PopularCategories />
      <CTASection />
    </>
  );
}

