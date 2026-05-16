'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import MarketCard from '@/components/markets/MarketCard';
import FilterBar from '@/components/markets/FilterBar';
import type { Market } from '@/types/market';
import { searchMarketsClient } from '@/lib/markets-search';

const CITY_FLAGS: Record<string, string> = {
  Delhi: '🏛️', Noida: '🏙️', Gurgaon: '🌆', Ghaziabad: '🏗️', Faridabad: '🏭',
};

function MarketsContent({ markets }: { markets: Market[] }) {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const initialCat = searchParams.get('category') || 'All';
  const initialCrowd = searchParams.get('crowd') || 'Any';
  const initialPrice = searchParams.get('price') || 'Any';
  const initialCity = searchParams.get('city') || 'All Cities';

  const [filtered, setFiltered] = useState<Market[]>(markets);
  const [showFilters, setShowFilters] = useState(false);

  const applyFilters = (q: string, category: string, crowd: string, price: string, city: string) => {
    let result = searchMarketsClient(q, markets);
    if (city !== 'All Cities') result = result.filter((m) => m.city === city);
    if (category !== 'All') result = result.filter((m) =>
      m.category.some((c) => c.toLowerCase() === category.toLowerCase())
    );
    if (crowd !== 'Any') result = result.filter(
      (m) => m.crowd.morning === crowd || m.crowd.afternoon === crowd || m.crowd.evening === crowd
    );
    if (price !== 'Any') result = result.filter((m) => m.priceRange === price);
    setFiltered(result);
    setShowFilters(false); // close drawer after applying on mobile
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    applyFilters(initialQ, initialCat, initialCrowd, initialPrice, initialCity);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cities = Array.from(new Set(filtered.map((m) => m.city)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header row */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="section-heading text-white">Markets in Delhi NCR</h1>
          <p className="text-[#6B7280] mt-1 text-sm">
            {filtered.length} market{filtered.length !== 1 ? 's' : ''} found
            {initialQ && <span> for &ldquo;<strong className="text-[#0F172A]">{initialQ}</strong>&rdquo;</span>}
          </p>
        </div>

        {/* Mobile filter toggle */}
        <button
          id="mobile-filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden flex items-center gap-2 bg-white/5 border border-white/10 text-sm font-semibold text-[#0F172A] px-3 py-2 rounded-xl shadow-md flex-shrink-0"
          aria-expanded={showFilters}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
          Filters
        </button>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="lg:hidden mb-6 animate-fade-up">
          <FilterBar
            initialQuery={initialQ}
            initialCategory={initialCat}
            initialCrowd={initialCrowd}
            initialPrice={initialPrice}
            initialCity={initialCity}
            onFilter={applyFilters}
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Desktop sidebar filters */}
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-20">
            <FilterBar
              initialQuery={initialQ}
              initialCategory={initialCat}
              initialCrowd={initialCrowd}
              initialPrice={initialPrice}
              initialCity={initialCity}
              onFilter={applyFilters}
            />
          </div>
        </aside>

        {/* Market grid */}
        <section className="lg:col-span-3" aria-label="Market listings">
          {filtered.length > 0 ? (
            initialCity !== 'All Cities' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((market) => <MarketCard key={market.slug} market={market} />)}
              </div>
            ) : (
              <div className="space-y-10">
                {cities.map((city) => {
                  const cityMarkets = filtered.filter((m) => m.city === city);
                  return (
                    <div key={city}>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl">{CITY_FLAGS[city] || '📍'}</span>
                        <h2 className="text-lg font-bold text-[#0F172A]">{city}</h2>
                        <span className="badge badge-muted text-xs">{cityMarkets.length} markets</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                        {cityMarkets.map((market) => <MarketCard key={market.slug} market={market} />)}
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">No markets found</h3>
              <p className="text-sm text-[#6B7280] max-w-xs">Try a different search term or remove some filters.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default function MarketsPageWrapper({ markets }: { markets: Market[] }) {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-10 text-center text-[#6B7280]">Loading markets...</div>}>
      <MarketsContent markets={markets} />
    </Suspense>
  );
}
