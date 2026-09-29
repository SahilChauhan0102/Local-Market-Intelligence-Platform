import Link from 'next/link';
import Image from 'next/image';
import { getNearbyPlacesForMarket } from '@/lib/places';
import type { PlaceType } from '@/types/place';

const TYPE_CONFIG: Record<PlaceType, { emoji: string; color: string }> = {
  Temple:    { emoji: '🛕', color: '#FF6B35' },
  Mosque:    { emoji: '🕌', color: '#2D6A4F' },
  Church:    { emoji: '⛪', color: '#4A90D9' },
  Dargah:    { emoji: '☪️', color: '#9B5DE5' },
  Gurudwara: { emoji: '🟠', color: '#F4A261' },
  Monastery: { emoji: '🏯', color: '#606C38' },
  Synagogue: { emoji: '✡️', color: '#E8C84A' },
};

interface Props {
  marketSlug: string;
}

export default function NearbyWorshipPlacesWidget({ marketSlug }: Props) {
  const nearbyPlaces = getNearbyPlacesForMarket(marketSlug);

  if (!nearbyPlaces.length) return null;

  return (
    <section className="card p-6" aria-label="Nearby Places of Worship">
      <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
        <span className="w-6 h-6 bg-white/10 border border-white/10 rounded-md flex items-center justify-center">🙏</span>
        Nearby Places of Worship
      </h2>
      <p className="text-xs text-gray-400 mb-4">Sacred spaces close to this market</p>

      <div className="space-y-3">
        {nearbyPlaces.slice(0, 5).map((place) => {
          const cfg = TYPE_CONFIG[place.type] ?? TYPE_CONFIG.Temple;
          return (
            <Link
              key={place.slug}
              href={`/places/${place.slug}`}
              id={`nearby-worship-${place.slug}`}
              className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors group"
            >
              {/* Image */}
              <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-700">
                <Image
                  src={place.images[0]}
                  alt={place.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className="text-white text-sm font-semibold truncate group-hover:transition-colors"
                  style={{ color: 'white' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = cfg.color)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'white')}
                >
                  {place.name}
                </p>
                <p className="text-gray-400 text-xs mt-0.5">
                  <span className="mr-1">{cfg.emoji}</span>
                  {place.type} · {place.entryFee.indian === 'Free' ? 'Free Entry' : place.entryFee.indian}
                </p>
              </div>

              <span className="text-gray-400 text-xs flex-shrink-0">→</span>
            </Link>
          );
        })}
      </div>

      <Link
        href={`/places`}
        className="mt-4 flex items-center justify-center gap-1 text-xs text-gray-400 hover:text-[#F4A261] transition-colors py-2"
      >
        Explore all sacred places →
      </Link>
    </section>
  );
}
