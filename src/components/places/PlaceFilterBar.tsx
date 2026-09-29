'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { PlaceType, City } from '@/types/place';

const TYPES: Array<{ label: string; value: PlaceType | 'All'; emoji: string }> = [
  { label: 'All',        value: 'All',       emoji: '🙏' },
  { label: 'Temples',    value: 'Temple',    emoji: '🛕' },
  { label: 'Mosques',    value: 'Mosque',    emoji: '🕌' },
  { label: 'Churches',   value: 'Church',    emoji: '⛪' },
  { label: 'Dargahs',    value: 'Dargah',    emoji: '☪️' },
  { label: 'Gurudwaras', value: 'Gurudwara', emoji: '🟠' },
  { label: 'Monasteries',value: 'Monastery', emoji: '🏯' },
];

const CITIES: Array<City | 'All'> = ['All', 'Delhi', 'Noida', 'Gurgaon', 'Ghaziabad', 'Faridabad'];
const ENTRY_OPTIONS = ['All', 'Free', 'Paid'] as const;
const SORT_OPTIONS   = ['Featured', 'Rating', 'Alphabetical'] as const;

interface PlaceFilterBarProps {
  initialType?:     string;
  initialCity?:     string;
  initialEntry?:    string;
  initialOpenToday?: boolean;
  initialSort?:     string;
  onFilter: (type: string, city: string, entry: string, openToday: boolean, sort: string) => void;
}

export default function PlaceFilterBar({
  initialType      = 'All',
  initialCity      = 'All',
  initialEntry     = 'All',
  initialOpenToday = false,
  initialSort      = 'Featured',
  onFilter,
}: PlaceFilterBarProps) {
  const [type,      setType]      = useState(initialType);
  const [city,      setCity]      = useState(initialCity);
  const [entry,     setEntry]     = useState(initialEntry);
  const [openToday, setOpenToday] = useState(initialOpenToday);
  const [sort,      setSort]      = useState(initialSort);
  const router = useRouter();

  const apply = (t: string, ci: string, en: string, ot: boolean, so: string) => {
    onFilter(t, ci, en, ot, so);
    const params = new URLSearchParams();
    if (t  !== 'All')      params.set('type',  t);
    if (ci !== 'All')      params.set('city',  ci);
    if (en !== 'All')      params.set('entry', en);
    if (ot)                params.set('open',  '1');
    if (so !== 'Featured') params.set('sort',  so);
    router.replace(`/places${params.toString() ? `?${params.toString()}` : ''}`, { scroll: false });
  };

  const handleType     = (v: string) => { setType(v);      apply(v, city, entry, openToday, sort); };
  const handleCity     = (v: string) => { setCity(v);      apply(type, v, entry, openToday, sort); };
  const handleEntry    = (v: string) => { setEntry(v);     apply(type, city, v, openToday, sort); };
  const handleOpen     = (v: boolean)=> { setOpenToday(v); apply(type, city, entry, v, sort); };
  const handleSort     = (v: string) => { setSort(v);      apply(type, city, entry, openToday, v); };

  const hasFilters = type !== 'All' || city !== 'All' || entry !== 'All' || openToday || sort !== 'Featured';

  const reset = () => {
    setType('All'); setCity('All'); setEntry('All'); setOpenToday(false); setSort('Featured');
    onFilter('All', 'All', 'All', false, 'Featured');
    router.replace('/places', { scroll: false });
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-4 shadow-md">
      {/* Place Type */}
      <div>
        <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">🙏 Type</p>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <button
              key={t.value}
              id={`filter-type-${t.value.toLowerCase()}`}
              onClick={() => handleType(t.value)}
              className={`badge text-xs transition-all ${type === t.value ? 'badge-primary' : 'badge-muted hover:bg-white/20'}`}
            >
              {t.emoji} {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* City */}
      <div>
        <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">🏙️ City</p>
        <div className="flex flex-wrap gap-2">
          {CITIES.map((c) => (
            <button
              key={c}
              id={`filter-place-city-${c.toLowerCase()}`}
              onClick={() => handleCity(c)}
              className={`badge text-xs transition-all ${city === c ? 'badge-primary' : 'badge-muted hover:bg-white/20'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Entry + Open Today row */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-28">
          <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">💰 Entry</p>
          <div className="flex gap-1.5 flex-wrap">
            {ENTRY_OPTIONS.map((e) => (
              <button
                key={e}
                id={`filter-entry-${e.toLowerCase()}`}
                onClick={() => handleEntry(e)}
                className={`badge text-xs transition-all ${entry === e ? 'badge-primary' : 'badge-muted hover:bg-white/20'}`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 min-w-28">
          <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">📅 Open Today</p>
          <button
            id="filter-open-today"
            onClick={() => handleOpen(!openToday)}
            className={`badge text-xs transition-all ${openToday ? 'badge-primary' : 'badge-muted hover:bg-white/20'}`}
          >
            {openToday ? '✅ Open Today' : 'Show Open Only'}
          </button>
        </div>
      </div>

      {/* Sort */}
      <div>
        <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Sort By</p>
        <select
          value={sort}
          onChange={(e) => handleSort(e.target.value)}
          className="w-full bg-white/5 border border-white/10 text-sm text-white rounded-xl px-3 py-2 outline-none focus:border-[#38BDF8]"
        >
          {SORT_OPTIONS.map((s) => (
            <option key={s} value={s} className="text-black">{s}</option>
          ))}
        </select>
      </div>

      {hasFilters && (
        <button id="place-filter-reset" onClick={reset} className="text-xs text-[#EF4444] hover:underline font-medium">
          Clear all filters
        </button>
      )}
    </div>
  );
}
