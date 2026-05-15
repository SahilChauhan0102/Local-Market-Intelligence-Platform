import type { Market } from '@/types/market';

export default function DirectionsWidget({ market }: { market: Market }) {
  const { directions } = market;

  return (
    <section className="card p-6" aria-label="How to Reach">
      <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
        <span className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center">🧭</span>
        How to Reach
      </h2>
      <p className="text-xs text-gray-400 mb-5">Best ways to get to {market.name}</p>

      <div className="space-y-3">
        {/* Metro */}
        {directions.nearestMetro && (
          <div className="flex gap-3 p-3.5 rounded-xl bg-blue-50 border border-blue-100">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
              <span className="text-white text-base">🚇</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-blue-800 uppercase tracking-wide mb-0.5">Nearest Metro</p>
              <p className="text-sm font-semibold text-white">{directions.nearestMetro}</p>
              {directions.metroWalkTime && (
                <p className="text-xs text-blue-600 mt-0.5 flex items-center gap-1">
                  <span>🚶</span> {directions.metroWalkTime}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Railway */}
        {directions.nearestRailway && (
          <div className="flex gap-3 p-3.5 rounded-xl bg-orange-50 border border-orange-100">
            <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
              <span className="text-white text-base">🚂</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-orange-800 uppercase tracking-wide mb-0.5">Nearest Railway Station</p>
              <p className="text-sm font-semibold text-white">{directions.nearestRailway}</p>
              {directions.railwayDistance && (
                <p className="text-xs text-orange-600 mt-0.5 flex items-center gap-1">
                  <span>📏</span> {directions.railwayDistance}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Bus Stop */}
        {directions.nearestBusStop && (
          <div className="flex gap-3 p-3.5 rounded-xl bg-green-50 border border-green-100">
            <div className="w-9 h-9 bg-[#10B981] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
              <span className="text-white text-base">🚌</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-green-800 uppercase tracking-wide mb-0.5">Nearest Bus Stop</p>
              <p className="text-sm font-semibold text-white">{directions.nearestBusStop}</p>
              {directions.busRoutes && directions.busRoutes.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {directions.busRoutes.map((r) => (
                    <span key={r} className="badge bg-green-100 text-green-700 text-[10px]">{r}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Auto-rickshaw */}
        <div className="flex gap-3 p-3.5 rounded-xl bg-yellow-50 border border-yellow-100">
          <div className="w-9 h-9 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
            <span className="text-white text-base">🛺</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-yellow-800 uppercase tracking-wide mb-0.5">Auto-Rickshaw</p>
            <p className="text-sm font-semibold text-white">
              {directions.autoRickshaw ? 'Readily available nearby' : 'Limited availability'}
            </p>
            <p className="text-xs text-yellow-700 mt-0.5">
              {directions.autoRickshaw ? 'Autos ply to this market from nearby areas' : 'Plan alternate transport'}
            </p>
          </div>
        </div>
      </div>

      {/* Pro tip */}
      {directions.tips && (
        <div className="mt-4 p-3.5 bg-[#0F172A] rounded-xl">
          <p className="text-xs font-bold text-[#F59E0B] mb-1 uppercase tracking-wide">💡 Local Tip</p>
          <p className="text-xs text-gray-400 leading-relaxed">{directions.tips}</p>
        </div>
      )}
    </section>
  );
}
