import type { Market } from '@/types/market';

const priceLabel: Record<string, string> = {
  '₹': 'Budget-friendly',
  '₹₹': 'Moderate',
  '₹₹₹': 'Premium',
};

export default function MarketOverview({ market }: { market: Market }) {
  return (
    <section className="card p-6" aria-label="Market Overview">
      <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <span className="w-6 h-6 bg-[#F59E0B]/10 rounded-md flex items-center justify-center text-[#F59E0B]">✦</span>
        Market Overview
      </h2>

      <div className="space-y-4">
        {/* Famous for */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Famous For</p>
          <div className="flex flex-wrap gap-2">
            {market.famousFor.map((item) => (
              <span key={item} className="badge badge-accent">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Price range */}
        <div className="flex items-center justify-between py-3 border-t border-white/5">
          <p className="text-sm font-medium text-gray-200">Price Range</p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold text-white">{market.priceRange}</span>
            <span className="text-sm text-gray-400">{priceLabel[market.priceRange]}</span>
          </div>
        </div>

        {/* Best time */}
        <div className="flex items-start gap-3 py-3 border-t border-white/5">
          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Best Time to Visit</p>
            <p className="text-sm font-medium text-white mt-0.5">{market.bestTimeToVisit}</p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-3 py-3 border-t border-white/5">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Location</p>
            <p className="text-sm font-medium text-white mt-0.5">{market.location}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between py-3 border-t border-white/5">
          <p className="text-sm font-medium text-gray-200">Community Rating</p>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-bold text-white">{market.rating}</span>
            <span className="text-sm text-gray-400">({market.reviewCount} reviews)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
