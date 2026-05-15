import type { Market } from '@/types/market';

function RatingDots({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3 h-3 ${
            i < full
              ? 'text-amber-400 fill-amber-400'
              : i === full && half
              ? 'text-amber-300 fill-amber-300'
              : 'text-slate-200 fill-slate-200'
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-gray-400 ml-1">{rating}</span>
    </div>
  );
}

export default function FoodNearbyWidget({ market }: { market: Market }) {
  return (
    <section className="card p-6" aria-label="Nearby Food Places">
      <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
        <span className="w-6 h-6 bg-red-100 rounded-md flex items-center justify-center">🍽️</span>
        Food Nearby
      </h2>
      <p className="text-xs text-gray-400 mb-4">Popular eateries near this market</p>

      <div className="space-y-3">
        {market.foodNearby.map((place, i) => (
          <div
            key={place.name}
            className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center shadow-md text-base">
                {i === 0 ? '🥇' : i === 1 ? '🥈' : '🍴'}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{place.name}</p>
                {place.type && (
                  <p className="text-xs text-gray-400">{place.type}</p>
                )}
              </div>
            </div>
            <RatingDots rating={place.rating} />
          </div>
        ))}
      </div>

      {market.foodNearby.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-4">
          No nearby food data yet.
        </p>
      )}
    </section>
  );
}
