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
      {/* Looping Graphic/GIF Background */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-20 flex items-center justify-center mix-blend-multiply">
        {/* We use an img tag for a GIF, or a video tag for mp4. Placeholder used here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="https://media2.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif" 
          alt="Market Crowd Moving"
          className="w-full h-full object-cover blur-[2px] opacity-60"
        />
      </div>

      {/* Amber/Orange subtle glow overlay to blend with the theme */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-full opacity-20 blur-[100px] z-0" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-slate-100/80 border border-slate-200 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full mb-6 backdrop-blur-sm shadow-sm">
          <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse" />
          Covering Delhi NCR & Sirsa, Haryana
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
          Find the{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] to-[#F97316]">perfect bazaar</span>
          <br className="hidden sm:block" />
          {' '}in Delhi NCR.
        </h1>

        {/* Subtext */}
        <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          From Chandni Chowk&apos;s 400-year-old lanes to Cyber Hub&apos;s rooftop bars — a smart guide to discover &amp; compare markets across Delhi, Noida, Gurgaon, Ghaziabad &amp; Sirsa. Metro info, crowd levels, prices, shopkeeper vibes — all in one place.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden max-w-xl mx-auto mb-8" role="search">
          <div className="flex items-center gap-2 px-4 flex-1 min-w-0">
            <svg className="w-4 h-4 text-[#6B7280] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              id="hero-search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try 'Chhole Bhature', 'Electronics', 'Clothes'..."
              className="w-full py-4 text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none bg-transparent"
              aria-label="Search markets"
            />
          </div>
          <button
            type="submit"
            id="hero-search-btn"
            className="btn-primary rounded-none rounded-r-2xl py-4 px-6 text-sm font-semibold flex-shrink-0"
          >
            Explore →
          </button>
        </form>

        {/* Quick suggestions */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-slate-500 text-xs font-medium">Popular:</span>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              id={`hero-suggest-${s.toLowerCase()}`}
              onClick={() => router.push(`/markets?q=${encodeURIComponent(s)}`)}
              className="text-xs text-slate-600 hover:text-[#F59E0B] border border-slate-200 hover:border-[#F59E0B]/50 px-2.5 py-1 rounded-full transition-colors bg-white/50"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-center gap-6 sm:gap-8 mt-12 pt-8 border-t border-slate-200">
          {[
            { value: '28+', label: 'Markets Covered' },
            { value: '6', label: 'NCR Cities' },
            { value: '12+', label: 'Categories' },
            { value: '1,00,000+', label: 'Reviews' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-xl font-extrabold text-slate-900">{value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
