import type { Metadata } from 'next';
import { getAllMarkets } from '@/lib/markets';
import MarketsPageWrapper from '@/components/markets/MarketsPageClient';

export const metadata: Metadata = {
  title: 'All Markets in Delhi NCR — Local Market Explorer',
  description: 'Browse and filter all local markets in Delhi NCR. Filter by category, crowd level, and price range to find your perfect market.',
};

export default async function MarketsPage() {
  try {
    const markets = await getAllMarkets();
    return <MarketsPageWrapper markets={markets} />;
  } catch (error) {
    console.error('Failed to load markets:', error);
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-2">Failed to load markets</h2>
        <p className="text-[#6B7280]">Please try again later or refresh the page.</p>
      </div>
    );
  }
}
