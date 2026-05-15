import type { Market } from '@/types/market';

export default function MarketStoryWidget({ market }: { market: Market }) {
  const { story } = market;
  if (!story) return null;

  return (
    <section className="card overflow-hidden" aria-label="Market Story">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white/10 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#10B981]/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-base">📖</span>
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Market Chronicle</h2>
            <p className="text-[10px] text-gray-400">History, stories &amp; secrets</p>
          </div>
        </div>
        {story.established && (
          <span className="text-[10px] font-bold bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30 px-2.5 py-1 rounded-full whitespace-nowrap">
            Est. {story.established}
          </span>
        )}
      </div>

      {/* Scrollable body — fixed height */}
      <div
        className="h-68 sm:h-[390px] overflow-y-auto px-6 py-5 space-y-5"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#10B981 #1F2937' }}
      >
        {/* Story body */}
        <p className="text-sm text-gray-200 leading-relaxed drop-shadow-sm">{story.body}</p>

        {/* Famous shops */}
        {story.famousShops && story.famousShops.length > 0 && (
          <div>
            <p className="text-[10px] font-bold text-[#10B981] uppercase tracking-widest mb-2">🏪 Famous Shops &amp; Vendors</p>
            <ul className="space-y-1">
              {story.famousShops.map((shop) => (
                <li key={shop} className="flex items-start gap-2 text-xs text-gray-200">
                  <span className="text-[#38BDF8] flex-shrink-0 mt-0.5">›</span>
                  {shop}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Fun facts */}
        {story.funFacts && story.funFacts.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md">
            <p className="text-[10px] font-bold text-[#38BDF8] uppercase tracking-widest mb-2">⚡ Fun Facts</p>
            <ul className="space-y-1.5">
              {story.funFacts.map((fact) => (
                <li key={fact} className="text-xs text-gray-300 flex items-start gap-2">
                  <span className="flex-shrink-0">•</span>
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Scroll hint */}
      <div className="px-6 py-2 border-t border-white/5 flex items-center gap-1.5 bg-white/5">
        <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        <p className="text-[10px] text-gray-400">Scroll to read more</p>
      </div>
    </section>
  );
}
