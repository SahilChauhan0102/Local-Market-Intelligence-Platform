import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import FeaturedMarkets from '@/components/home/FeaturedMarkets';
import PopularCategories from '@/components/home/PopularCategories';
import CTASection from '@/components/home/CTASection';
import { getFeaturedMarkets } from '@/lib/markets';

export const metadata: Metadata = {
  title: 'Local Market Explorer — Best Markets in Delhi NCR',
  description: 'Discover and compare the best local markets in Delhi NCR. Check crowd levels, prices, shopkeeper ratings, food nearby and much more.',
};

export default async function HomePage() {
  const featuredMarkets = await getFeaturedMarkets();

  return (
    <>
      <HeroSection />
      <FeaturedMarkets markets={featuredMarkets} />
      <PopularCategories />
      <CTASection />
    </>
  );
}
