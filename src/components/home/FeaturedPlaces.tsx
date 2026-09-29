import Link from 'next/link';
import PlaceCard from '@/components/places/PlaceCard';
import type { Place } from '@/types/place';

export default function FeaturedPlaces({ places }: { places: Place[] }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-labelledby="sacred-spaces-heading">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-[#F4A261] text-sm font-semibold uppercase tracking-wider mb-1">
            🙏 Discover
          </p>
          <h2 id="sacred-spaces-heading" className="section-heading">Sacred Spaces</h2>
          <p className="text-[#6B7280] mt-2 text-sm">
            Temples, mosques, churches, dargahs &amp; gurudwaras across Delhi NCR
          </p>
        </div>
        <Link href="/places" className="btn-outline text-sm hidden sm:flex">
          Explore All Places →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {places.map((place) => (
          <PlaceCard key={place.slug} place={place} />
        ))}
      </div>

      <div className="mt-8 sm:hidden">
        <Link href="/places" className="btn-outline w-full justify-center">
          Explore All Places of Worship →
        </Link>
      </div>
    </section>
  );
}
