'use client';

import { useCompare } from '@/context/CompareContext';
import type { Market } from '@/types/market';

export default function AddToCompareButton({ market }: { market: Market }) {
  const { addToCompare, removeFromCompare, isInCompare, canAdd } = useCompare();
  const inCompare = isInCompare(market.slug);

  return (
    <button
      id={`detail-compare-btn-${market.slug}`}
      onClick={() => inCompare ? removeFromCompare(market.slug) : addToCompare(market)}
      disabled={!inCompare && !canAdd}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
        inCompare
          ? 'bg-[#0F172A] text-white border-[#0F172A]'
          : canAdd
          ? 'bg-white text-[#0F172A] border-slate-200 hover:border-[#22C55E] hover:text-[#22C55E]'
          : 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
      }`}
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
      {inCompare ? 'Added to Compare' : !canAdd ? 'Compare Full (3/3)' : 'Add to Compare'}
    </button>
  );
}
