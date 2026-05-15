import type { Market } from '@/types/market';

type CrowdLevel = 'Low' | 'Medium' | 'High';

const crowdConfig: Record<CrowdLevel, { width: string; color: string; label: string; emoji: string }> = {
  Low:    { width: 'w-1/4',  color: 'bg-green-400',  label: 'Low',    emoji: '🟢' },
  Medium: { width: 'w-1/2',  color: 'bg-yellow-400', label: 'Medium', emoji: '🟡' },
  High:   { width: 'w-full', color: 'bg-red-400',    label: 'High',   emoji: '🔴' },
};

function CrowdRow({ label, level, icon }: { label: string; level: CrowdLevel; icon: string }) {
  const cfg = crowdConfig[level];
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-1.5 font-medium text-[#374151]">
          <span>{icon}</span> {label}
        </span>
        <span className="flex items-center gap-1 text-xs font-semibold">
          <span>{cfg.emoji}</span>
          <span className="text-[#6B7280]">{cfg.label} Crowd</span>
        </span>
      </div>
      <div className="crowd-bar">
        <div className={`crowd-bar-fill ${cfg.width} ${cfg.color}`} />
      </div>
    </div>
  );
}

export default function CrowdLevelWidget({ market }: { market: Market }) {
  return (
    <section className="card p-6" aria-label="Crowd Level Analysis">
      <h2 className="text-lg font-bold text-[#0F172A] mb-1 flex items-center gap-2">
        <span className="w-6 h-6 bg-orange-100 rounded-md flex items-center justify-center">👥</span>
        Crowd Analysis
      </h2>
      <p className="text-xs text-[#6B7280] mb-5">Typical crowd levels throughout the day</p>

      <div className="space-y-5">
        <CrowdRow label="Morning"   level={market.crowd.morning}   icon="🌅" />
        <CrowdRow label="Afternoon" level={market.crowd.afternoon} icon="☀️" />
        <CrowdRow label="Evening"   level={market.crowd.evening}   icon="🌆" />
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100">
        <p className="text-xs text-[#6B7280]">
          💡 <strong>Pro tip:</strong> Best time to visit with least crowd is{' '}
          <span className="text-[#22C55E] font-semibold">
            {market.crowd.morning === 'Low'
              ? 'Morning'
              : market.crowd.afternoon === 'Low'
              ? 'Afternoon'
              : 'Early morning before peak hours'}
          </span>.
        </p>
      </div>
    </section>
  );
}
