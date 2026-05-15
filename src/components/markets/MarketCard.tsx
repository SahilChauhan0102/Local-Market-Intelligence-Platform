'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCompare } from '@/context/CompareContext';
import type { Market } from '@/types/market';

const crowdColor: Record<string, string> = {
  Low: 'bg-green-100 text-green-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  High: 'bg-red-100 text-red-700',
};

const priceLabel: Record<string, string> = {
  '₹': 'Budget-friendly',
  '₹₹': 'Moderate',
  '₹₹₹': 'Premium',
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <svg className="w-3.5 h-3.5 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <span className="text-xs font-semibold text-gray-200">{rating.toFixed(1)}</span>
    </div>
  );
}

interface MarketCardProps {
  market: Market;
  showCompare?: boolean;
}

export default function MarketCard({ market, showCompare = true }: MarketCardProps) {
  const { addToCompare, removeFromCompare, isInCompare, canAdd } = useCompare();
  const inCompare = isInCompare(market.slug);

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(market.slug);
    } else if (canAdd) {
      addToCompare(market);
    }
  };

  const eveningCrowd = market.crowd.evening;

  return (
    <article className="card group overflow-hidden relative flex flex-col">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden">
        <Image
          src={market.images[0]}
          alt={`${market.name} — local market in ${market.city}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Price range badge */}
        <div className="absolute top-3 left-3">
          <span className="badge bg-white/10 text-white text-xs font-bold shadow-md backdrop-blur-md">
            {market.priceRange} · {priceLabel[market.priceRange]}
          </span>
        </div>

        {/* Featured */}
        {market.featured && (
          <div className="absolute top-3 right-3">
            <span className="badge bg-[#10B981] text-white text-xs shadow-md">⭐ Featured</span>
          </div>
        )}

        {/* Crowd level */}
        <div className="absolute bottom-3 left-3">
          <span className={`badge text-xs shadow-md ${crowdColor[eveningCrowd]}`}>
            🌆 {eveningCrowd} crowd evenings
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
          <h2 className="font-bold text-white text-base leading-tight group-hover:text-[#38BDF8] transition-colors drop-shadow-sm">
            {market.name}
          </h2>
          <StarRating rating={market.rating} />
        </div>

        <p className="text-xs text-gray-400 mb-3 flex items-center gap-1">
          <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          {market.location}
        </p>

        {/* Famous for tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {market.famousFor.slice(0, 3).map((item) => (
            <span key={item} className="badge badge-muted text-[11px]">
              {item}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
          <Link
            href={`/market/${market.slug}`}
            id={`market-card-link-${market.slug}`}
            className="text-sm font-semibold text-[#38BDF8] hover:underline"
          >
            View Details →
          </Link>

          {showCompare && (
            <button
              id={`compare-toggle-${market.slug}`}
              onClick={handleCompareToggle}
              disabled={!inCompare && !canAdd}
              className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition-all border ${
                inCompare
                  ? 'bg-[#38BDF8] text-[#0F172A] border-[#38BDF8]'
                  : canAdd
                  ? 'bg-white/5 text-gray-300 border-white/10 hover:border-[#38BDF8] hover:text-[#38BDF8]'
                  : 'bg-white/5 text-gray-400 border-white/5 cursor-not-allowed'
              }`}
            >
              {inCompare ? '✓ Comparing' : 'Compare'}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
