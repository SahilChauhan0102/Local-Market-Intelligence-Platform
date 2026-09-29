'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PlaceCard from '@/components/places/PlaceCard';
import PlaceFilterBar from '@/components/places/PlaceFilterBar';
import type { Place } from '@/types/place';
import { searchPlaces, isOpenToday } from '@/lib/places';

function PlacesContent({ places }: { places: Place[] }) {
  const searchParams = useSearchParams();

  const initialSearch   = searchParams.get('search') || '';
  const initialType     = searchParams.get('type')   || 'All';
  const initialCity     = searchParams.get('city')   || 'All';
  const initialEntry    = searchParams.get('entry')  || 'All';
  const initialOpen     = searchParams.get('open')   === '1';
  const initialSort     = searchParams.get('sort')   || 'Featured';

  const [search,   setSearch]   = useState(initialSearch);
  const [filtered, setFiltered] = useState<Place[]>(places);
  const [showFilters, setShowFilters] = useState(false);

  const applyFilters = (
    q: string,
    type: string,
    city: string,
    entry: string,
    openToday: boolean,
    sort: string
  ) => {
    let result = searchPlaces(q, places);

    if (type !== 'All')  result = result.filter((p) => p.type === type);
    if (city !== 'All')  result = result.filter((p) => p.city === city);
    if (entry === 'Free') result = result.filter((p) => p.entryFee.indian === 'Free');
    if (entry === 'Paid') result = result.filter((p) => p.entryFee.indian !== 'Free');
    if (openToday)        result = result.filter((p) => isOpenToday(p));

    if (sort === 'Rating')       result = [...result].sort((a, b) => b.rating - a.rating);
    else if (sort === 'Alphabetical') result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    else result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

    setFiltered(result);
    setShowFilters(false);
  };

  // Handle search bar input — update URL param
  const handleSearchChange = (q: string) => {
    setSearch(q);
    const params = new URLSearchParams(window.location.search);
    if (q) params.set('search', q);
    else params.delete('search');
    window.history.replaceState(null, '', `/places${params.toString() ? `?${params.toString()}` : ''}`);
    applyFilters(q, initialType, initialCity, initialEntry, initialOpen, initialSort);
  };

  useEffect(() => {
    applyFilters(initialSearch, initialType, initialCity, initialEntry, initialOpen, initialSort);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="section-heading text-white">Sacred Spaces of Delhi NCR</h1>
          <p className="text-gray-400 mt-1 text-sm">
            Showing <span className="text-white font-semibold">{filtered.length}</span> of {places.length} places
          </p>
        </div>

        {/* Mobile filter toggle */}
        <button
          id="mobile-places-filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden flex items-center gap-2 bg-white/5 border border-white/10 text-sm font-semibold text-gray-200 px-3 py-2 rounded-xl shadow-md flex-shrink-0"
          aria-expanded={showFilters}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
          Filters
        </button>
      </div>

      {/* Real-time search bar */}
      <div className="mb-6 flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2.5 border border-white/10 focus-within:border-[#38BDF8] transition-all">
        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          id="places-search-input"
          type="text"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search temples, mosques, churches, dargahs, gurudwaras..."
          className="flex-1 text-sm text-white placeholder-gray-400 bg-transparent focus:outline-none"
          aria-label="Search places of worship"
        />
        {search && (
          <button onClick={() => handleSearchChange('')} className="text-gray-400 hover:text-red-400">✕</button>
        )}
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="lg:hidden mb-6 animate-fade-up">
          <PlaceFilterBar
            initialType={initialType}
            initialCity={initialCity}
            initialEntry={initialEntry}
            initialOpenToday={initialOpen}
            initialSort={initialSort}
            onFilter={(t, ci, en, ot, so) => applyFilters(search, t, ci, en, ot, so)}
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-20">
            <PlaceFilterBar
              initialType={initialType}
              initialCity={initialCity}
              initialEntry={initialEntry}
              initialOpenToday={initialOpen}
              initialSort={initialSort}
              onFilter={(t, ci, en, ot, so) => applyFilters(search, t, ci, en, ot, so)}
            />
          </div>
        </aside>

        {/* Grid */}
        <section className="lg:col-span-3" aria-label="Places of worship listings">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((place) => (
                <PlaceCard key={place.slug} place={place} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="text-5xl mb-4">🙏</div>
              <h3 className="text-lg font-bold text-white mb-2">No places found</h3>
              <p className="text-sm text-gray-400 max-w-xs">Try a different search term or remove some filters.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default function PlacesPageWrapper({ places }: { places: Place[] }) {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-10 text-center text-gray-400">Loading places...</div>}>
      <PlacesContent places={places} />
    </Suspense>
  );
}
