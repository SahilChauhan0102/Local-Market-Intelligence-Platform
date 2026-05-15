import type { Market } from '@/types/market';

const placeIcons = ['🏛️', '🌳', '⛪', '🕌', '🎭', '🏪', '🌉', '🎡'];

export default function NearbyPlacesWidget({ market }: { market: Market }) {
  return (
    <section className="card p-6" aria-label="Nearby Attractions">
      <h2 className="text-lg font-bold text-[#0F172A] mb-1 flex items-center gap-2">
        <span className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center">🗺️</span>
        Nearby Attractions
      </h2>
      <p className="text-xs text-[#6B7280] mb-4">Places to visit around this market</p>

      <ul className="space-y-2">
        {market.nearbyPlaces.map((place, i) => (
          <li
            key={place}
            className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <span className="text-lg flex-shrink-0">{placeIcons[i % placeIcons.length]}</span>
            <span className="text-sm font-medium text-[#374151]">{place}</span>
          </li>
        ))}
      </ul>

      {market.nearbyPlaces.length === 0 && (
        <p className="text-sm text-[#6B7280] text-center py-4">
          No nearby attractions listed yet.
        </p>
      )}
    </section>
  );
}
