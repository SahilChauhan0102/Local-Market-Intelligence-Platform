'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { CATEGORIES } from '@/constants/categories';

const CITIES = ['All Cities', 'Delhi', 'Noida', 'Gurgaon', 'Ghaziabad', 'Faridabad'];
const CROWD_LEVELS = ['Any', 'Low', 'Medium', 'High'];
const PRICE_RANGES = ['Any', '₹', '₹₹', '₹₹₹'];

interface FilterBarProps {
  initialQuery?: string;
  initialCategory?: string;
  initialCrowd?: string;
  initialPrice?: string;
  initialCity?: string;
  initialSort?: string;
  onFilter: (q: string, category: string, crowd: string, price: string, city: string, sort: string) => void;
}

export default function FilterBar({
  initialQuery = '',
  initialCategory = 'All',
  initialCrowd = 'Any',
  initialPrice = 'Any',
  initialCity = 'All Cities',
  initialSort = 'Featured',
  onFilter,
}: FilterBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [crowd, setCrowd] = useState(initialCrowd);
  const [price, setPrice] = useState(initialPrice);
  const [city, setCity] = useState(initialCity);
  const [sort, setSort] = useState(initialSort);
  const router = useRouter();

  const apply = (q: string, cat: string, cr: string, pr: string, ci: string, so: string) => {
    onFilter(q, cat, cr, pr, ci, so);
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (cat !== 'All') params.set('category', cat);
    if (cr !== 'Any') params.set('crowd', cr);
    if (pr !== 'Any') params.set('price', pr);
    if (ci !== 'All Cities') params.set('city', ci);
    if (so !== 'Featured') params.set('sort', so);
    router.replace(`/markets${params.toString() ? `?${params.toString()}` : ''}`, { scroll: false });
  };

  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); apply(query, category, crowd, price, city, sort); };
  const handleCity = (c: string) => { setCity(c); apply(query, category, crowd, price, c, sort); };
  const handleCat = (c: string) => { setCategory(c); apply(query, c, crowd, price, city, sort); };
  const handleCrowd = (c: string) => { setCrowd(c); apply(query, category, c, price, city, sort); };
  const handlePrice = (p: string) => { setPrice(p); apply(query, category, crowd, p, city, sort); };
  const handleSort = (s: string) => { setSort(s); apply(query, category, crowd, price, city, s); };

  const reset = () => {
    setQuery(''); setCategory('All'); setCrowd('Any'); setPrice('Any'); setCity('All Cities'); setSort('Featured');
    onFilter('', 'All', 'Any', 'Any', 'All Cities', 'Featured');
    router.replace('/markets', { scroll: false });
  };

  const hasFilters = query || category !== 'All' || crowd !== 'Any' || price !== 'Any' || city !== 'All Cities' || sort !== 'Featured';

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-4 shadow-md">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2.5 border border-white/10 focus-within:border-[#22C55E] focus-within:ring-1 focus-within:ring-[#22C55E] transition-all">
        <svg className="w-4 h-4 text-[#6B7280] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          id="markets-search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search markets, items, categories..."
          className="flex-1 text-sm text-white placeholder-[#9CA3AF] bg-transparent focus:outline-none"
          aria-label="Search markets"
        />
        {query && (
          <button type="button" onClick={() => { setQuery(''); apply('', category, crowd, price, city, sort); }} className="text-[#6B7280] hover:text-[#EF4444]">✕</button>
        )}
      </form>

      {/* City filter */}
      <div>
        <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">🏙️ City</p>
        <div className="flex flex-wrap gap-2">
          {CITIES.map((c) => (
            <button key={c} id={`filter-city-${c.toLowerCase().replace(' ', '-')}`} onClick={() => handleCity(c)}
              className={`badge text-xs transition-all ${city === c ? 'badge-primary' : 'badge-muted hover:bg-white/20'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Category</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button key={c} id={`filter-cat-${c.toLowerCase()}`} onClick={() => handleCat(c)}
              className={`badge text-xs transition-all ${category === c ? 'badge-primary' : 'badge-muted hover:bg-white/20'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Crowd & Price */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-32">
          <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Crowd Level</p>
          <div className="flex gap-1.5 flex-wrap">
            {CROWD_LEVELS.map((c) => (
              <button key={c} id={`filter-crowd-${c.toLowerCase()}`} onClick={() => handleCrowd(c)}
                className={`badge text-xs transition-all ${crowd === c ? 'badge-primary' : 'badge-muted hover:bg-white/20'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 min-w-32">
          <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Price Range</p>
          <div className="flex gap-1.5 flex-wrap">
            {PRICE_RANGES.map((p) => (
              <button key={p} id={`filter-price-${p.replace(/₹/g, 'rs')}`} onClick={() => handlePrice(p)}
                className={`badge text-xs transition-all ${price === p ? 'badge-primary' : 'badge-muted hover:bg-white/20'}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sort By */}
      <div>
        <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Sort By</p>
        <select
          value={sort}
          onChange={(e) => handleSort(e.target.value)}
          className="w-full bg-white/5 border border-white/10 text-sm text-white rounded-xl px-3 py-2 outline-none focus:border-[#22C55E]"
        >
          <option value="Featured" className="text-black">Featured</option>
          <option value="Rating" className="text-black">Rating (High to Low)</option>
          <option value="Alphabetical" className="text-black">Alphabetical (A-Z)</option>
        </select>
      </div>

      {hasFilters && (
        <button id="filter-reset-btn" onClick={reset} className="text-xs text-[#EF4444] hover:underline font-medium">
          Clear all filters
        </button>
      )}
    </div>
  );
}
