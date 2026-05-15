'use client';

import Link from 'next/link';
import { useCompare } from '@/context/CompareContext';
import CompareTable from '@/components/compare/CompareTable';
import Image from 'next/image';

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-4" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#22C55E] transition-colors">Home</Link>
          <span>›</span>
          <span className="text-white font-medium">Compare Markets</span>
        </nav>
        <h1 className="section-heading mb-1">Compare Markets</h1>
        <p className="text-gray-400 text-sm">
          Side-by-side comparison of up to 3 markets. Select markets using the &ldquo;Compare&rdquo; button on any market card.
        </p>
      </div>

      {compareList.length === 0 ? (
        /* Empty state */
        <div className="card p-12 text-center max-w-lg mx-auto">
          <div className="text-5xl mb-4">⚖️</div>
          <h2 className="text-lg font-bold text-white mb-2">No markets selected</h2>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            Browse markets and click the &ldquo;Compare&rdquo; button on any market card to add it here. You can compare up to 3 markets at once.
          </p>
          <Link href="/markets" className="btn-primary justify-center">
            Browse Markets →
          </Link>
        </div>
      ) : compareList.length === 1 ? (
        /* Need more markets */
        <div className="space-y-6">
          <div className="card p-6 bg-amber-50 border border-amber-200 flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <p className="text-sm font-semibold text-amber-800">Add at least one more market</p>
              <p className="text-xs text-amber-700 mt-1">
                You&apos;ve selected <strong>{compareList[0].name}</strong>. Go back and add 1–2 more markets to compare.
              </p>
              <Link href="/markets" className="inline-block mt-3 text-xs font-semibold text-[#22C55E] hover:underline">
                ← Browse and add more markets
              </Link>
            </div>
          </div>

          {/* Show the single selected market */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {compareList.map((m) => (
              <div key={m.slug} className="card overflow-hidden">
                <div className="relative h-36 bg-gradient-to-br from-slate-200 to-slate-300">
                  <Image src={m.images[0]} alt={m.name} fill className="object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    sizes="300px" />
                </div>
                <div className="p-4">
                  <p className="font-bold text-white text-sm">{m.name}</p>
                  <p className="text-xs text-gray-400">{m.priceRange} · {m.location}</p>
                  <button onClick={() => removeFromCompare(m.slug)}
                    className="mt-2 text-xs text-red-500 hover:underline">Remove</button>
                </div>
              </div>
            ))}
            {/* Empty slots */}
            {Array.from({ length: 3 - compareList.length }).map((_, i) => (
              <Link key={i} href="/markets"
                className="card border-2 border-dashed border-white/10 flex flex-col items-center justify-center h-48 text-center p-4 hover:border-[#22C55E] transition-colors group">
                <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-[#38BDF8]/10 flex items-center justify-center mb-2 transition-colors">
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                </div>
                <p className="text-xs text-gray-400 group-hover:text-[#22C55E] transition-colors">Add a market</p>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        /* Full compare view */
        <div className="space-y-6">
          {/* Selected markets header */}
          <div className="flex items-center justify-between">
            <div className="flex gap-3 flex-wrap">
              {compareList.map((m) => (
                <div key={m.slug} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 shadow-sm">
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                    <Image src={m.images[0]} alt={m.name} fill className="object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      sizes="32px" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">{m.name}</p>
                    <p className="text-[10px] text-gray-400">{m.priceRange}</p>
                  </div>
                  <button onClick={() => removeFromCompare(m.slug)}
                    className="text-slate-400 hover:text-red-500 transition-colors ml-1" aria-label={`Remove ${m.name}`}>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              {compareList.length < 3 && (
                <Link href="/markets"
                  className="flex items-center gap-2 border-2 border-dashed border-white/10 rounded-xl px-3 py-2 hover:border-[#22C55E] transition-colors text-xs text-gray-400 hover:text-[#22C55E]">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  Add market
                </Link>
              )}
            </div>
            <button id="clear-all-compare" onClick={clearCompare}
              className="text-xs text-red-500 hover:underline font-medium">
              Clear all
            </button>
          </div>

          {/* Compare table */}
          <CompareTable markets={compareList} />

          {/* CTA */}
          <div className="flex flex-wrap gap-3 justify-center pt-4">
            {compareList.map((m) => (
              <Link key={m.slug} href={`/market/${m.slug}`}
                className="btn-outline text-sm py-2 px-4">
                View {m.name} →
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
