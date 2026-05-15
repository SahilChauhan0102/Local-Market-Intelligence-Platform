'use client';

import Link from 'next/link';
import { useCompare } from '@/context/CompareContext';

export default function CompareBar() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  if (compareList.length === 0) return null;

  return (
    <div
      id="compare-bar"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/10 text-white shadow-2xl border-t border-slate-700 animate-fade-up"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">

        {/* Mobile layout: compact single row */}
        <div className="flex items-center justify-between gap-3 sm:hidden">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs font-bold text-[#22C55E] whitespace-nowrap">⚖️ {compareList.length}/3</span>
            <div className="flex gap-1 flex-wrap">
              {compareList.map((m) => (
                <span key={m.slug} className="text-xs bg-slate-700 text-white px-2 py-0.5 rounded-full truncate max-w-[90px]">{m.name}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button id="clear-compare-btn-mobile" onClick={clearCompare} className="text-xs text-gray-400 hover:text-red-400 transition-colors">✕</button>
            <Link
              href="/compare"
              id="go-to-compare-btn-mobile"
              className={`text-xs font-bold bg-[#22C55E] text-white px-3 py-1.5 rounded-lg ${compareList.length < 2 ? 'opacity-50 pointer-events-none' : ''}`}
            >
              Compare →
            </Link>
          </div>
        </div>

        {/* Desktop layout: full row */}
        <div className="hidden sm:flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-semibold text-gray-400 whitespace-nowrap">
              Compare ({compareList.length}/3):
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {compareList.map((market) => (
                <div key={market.slug} className="flex items-center gap-1.5 bg-slate-800 rounded-lg px-3 py-1.5">
                  <span className="text-sm font-medium text-white">{market.name}</span>
                  <button
                    id={`remove-compare-${market.slug}`}
                    onClick={() => removeFromCompare(market.slug)}
                    className="text-gray-400 hover:text-red-400 transition-colors ml-1"
                    aria-label={`Remove ${market.name}`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                <div key={`empty-${i}`} className="flex items-center justify-center w-8 h-8 rounded-lg border-2 border-dashed border-slate-600">
                  <svg className="w-3.5 h-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button id="clear-compare-btn" onClick={clearCompare} className="text-xs text-gray-400 hover:text-white transition-colors px-2 py-1">Clear all</button>
            <Link href="/compare" id="go-to-compare-btn"
              className={`btn-primary py-2 px-4 text-sm ${compareList.length < 2 ? 'opacity-60 pointer-events-none' : ''}`}>
              Compare Now →
            </Link>
          </div>
        </div>

        {compareList.length < 2 && (
          <p className="text-xs text-gray-400 mt-1 hidden sm:block">Select at least 2 markets to compare</p>
        )}
      </div>
    </div>
  );
}
