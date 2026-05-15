import Link from 'next/link';
import MarketCard from '@/components/markets/MarketCard';
import type { Market } from '@/types/market';

export default function FeaturedMarkets({ markets }: { markets: Market[] }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-labelledby="featured-heading">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-[#22C55E] text-sm font-semibold uppercase tracking-wider mb-1">
            ⭐ Editor&apos;s Pick
          </p>
          <h2 id="featured-heading" className="section-heading">Featured Markets</h2>
          <p className="text-[#6B7280] mt-2 text-sm">
            The most loved markets in Sirsa, hand-picked for you
          </p>
        </div>
        <Link href="/markets" className="btn-outline text-sm hidden sm:flex">
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {markets.map((market) => (
          <MarketCard key={market.slug} market={market} />
        ))}
      </div>

      <div className="mt-8 sm:hidden">
        <Link href="/markets" className="btn-outline w-full justify-center">
          View All Markets →
        </Link>
      </div>
    </section>
  );
}
