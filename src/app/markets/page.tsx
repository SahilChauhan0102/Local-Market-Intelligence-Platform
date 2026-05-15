import type { Metadata } from 'next';
import { getAllMarkets } from '@/lib/markets';
import MarketsPageWrapper from '@/components/markets/MarketsPageClient';

export const metadata: Metadata = {
  title: 'All Markets in Sirsa — Local Market Explorer',
  description: 'Browse and filter all local markets in Sirsa, Haryana. Filter by category, crowd level, and price range to find your perfect market.',
};

export default async function MarketsPage() {
  const markets = await getAllMarkets();
  return <MarketsPageWrapper markets={markets} />;
}
