'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SUGGESTIONS = ['Chandni Chowk', 'Sarojini Nagar', 'Electronics', 'Street Food', 'Wholesale', 'Gold'];

export default function HeroSection() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (q) router.push(`/markets?q=${encodeURIComponent(q)}`);
    else router.push('/markets');
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-transparent" aria-label="Hero">
      {/* Background decoration matching CTA section */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #22C55E 1px, transparent 0)`, backgroundSize: '32px 32px' }} />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#22C55E] rounded-full opacity-10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#38BDF8] rounded-full opacity-10 blur-3xl animate-pulse" />
      </div>


      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 animate-fade-in-up">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38BDF8] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38BDF8]"></span>
          </span>
          <span className="text-xs font-semibold tracking-wide text-gray-300 uppercase">Covering Delhi NCR</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-50 leading-[1.1] tracking-tight mb-6 drop-shadow-sm">
          Find the{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9]">perfect bazaar</span>
          <br className="hidden sm:block" />
          {' '}in Delhi NCR.
        </h1>

        {/* Subtext */}
        <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          From Chandni Chowk&apos;s 400-year-old lanes to Cyber Hub&apos;s rooftop bars — a smart guide to discover &amp; compare markets across Delhi, Noida, Gurgaon, Ghaziabad &amp; more. Metro info, crowd levels, prices, shopkeeper vibes — all in one place.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] overflow-hidden max-w-xl mx-auto mb-8 transition-all hover:bg-white-[0.15]" role="search">
          <div className="flex items-center gap-2 px-4 flex-1 min-w-0">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              id="hero-search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try 'Chhole Bhature', 'Electronics', 'Clothes'..."
              className="w-full py-4 text-sm text-white placeholder-gray-400 focus:outline-none bg-transparent"
              aria-label="Search markets"
            />
          </div>
          <button
            type="submit"
            id="hero-search-btn"
            className="btn-primary rounded-none rounded-r-2xl py-4 px-6 text-sm flex-shrink-0"
          >
            Explore →
          </button>
        </form>

        {/* Quick suggestions */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-gray-400 text-xs font-medium">Popular:</span>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              id={`hero-suggest-${s.toLowerCase()}`}
              onClick={() => router.push(`/markets?q=${encodeURIComponent(s)}`)}
              className="text-xs text-gray-300 hover:text-white border border-white/10 hover:border-[#38BDF8]/50 px-2.5 py-1 rounded-full transition-all bg-white/5 backdrop-blur-sm hover:bg-white/10"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-center gap-6 sm:gap-8 mt-12 pt-8 border-t border-white/10">
          {[
            { value: '28+', label: 'Markets Covered' },
            { value: '6', label: 'NCR Cities' },
            { value: '12+', label: 'Categories' },
            { value: '1,00,000+', label: 'Reviews' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-xl font-extrabold text-gray-50 drop-shadow-sm">{value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
