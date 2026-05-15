import type { Market } from '@/types/market';

const behaviourConfig = {
  Friendly: { icon: '😊', color: 'text-green-600', bg: 'bg-green-50' },
  Average:  { icon: '😐', color: 'text-yellow-600', bg: 'bg-yellow-50' },
  Rude:     { icon: '😠', color: 'text-red-600', bg: 'bg-red-50' },
};

const parkingConfig = {
  Available: { icon: '🅿️', color: 'text-green-600', bg: 'bg-green-50' },
  Limited:   { icon: '⚠️', color: 'text-yellow-600', bg: 'bg-yellow-50' },
  None:      { icon: '🚫', color: 'text-red-600', bg: 'bg-red-50' },
};

function ExperiencePill({
  label,
  value,
  icon,
  colorClass,
  bgClass,
}: {
  label: string;
  value: string;
  icon: string;
  colorClass: string;
  bgClass: string;
}) {
  return (
    <div className={`flex items-center justify-between p-3.5 rounded-xl ${bgClass}`}>
      <span className="text-sm font-medium text-[#374151]">{label}</span>
      <span className={`flex items-center gap-1.5 text-sm font-semibold ${colorClass}`}>
        <span>{icon}</span> {value}
      </span>
    </div>
  );
}

export default function ExperienceWidget({ market }: { market: Market }) {
  const bCfg = behaviourConfig[market.experience.behaviour];
  const pCfg = parkingConfig[market.experience.parking];

  return (
    <section className="card p-6" aria-label="Shopping Experience">
      <h2 className="text-lg font-bold text-[#0F172A] mb-1 flex items-center gap-2">
        <span className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center">🛍️</span>
        Shopping Experience
      </h2>
      <p className="text-xs text-[#6B7280] mb-4">What to expect when you visit</p>

      <div className="space-y-2.5">
        <ExperiencePill
          label="Shopkeeper Behaviour"
          value={market.experience.behaviour}
          icon={bCfg.icon}
          colorClass={bCfg.color}
          bgClass={bCfg.bg}
        />
        <ExperiencePill
          label="Bargaining Possible"
          value={market.experience.bargaining ? 'Yes, bargain away!' : 'Fixed prices'}
          icon={market.experience.bargaining ? '🤝' : '🏷️'}
          colorClass={market.experience.bargaining ? 'text-green-600' : 'text-slate-600'}
          bgClass={market.experience.bargaining ? 'bg-green-50' : 'bg-slate-50'}
        />
        <ExperiencePill
          label="Family Friendly"
          value={market.experience.familyFriendly ? 'Yes, great for families' : 'More of a solo trip'}
          icon={market.experience.familyFriendly ? '👨‍👩‍👧' : '👤'}
          colorClass={market.experience.familyFriendly ? 'text-green-600' : 'text-slate-500'}
          bgClass={market.experience.familyFriendly ? 'bg-green-50' : 'bg-slate-50'}
        />
        <ExperiencePill
          label="Parking"
          value={market.experience.parking}
          icon={pCfg.icon}
          colorClass={pCfg.color}
          bgClass={pCfg.bg}
        />
      </div>
    </section>
  );
}
