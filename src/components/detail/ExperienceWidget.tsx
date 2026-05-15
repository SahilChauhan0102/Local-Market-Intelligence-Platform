import type { Market } from '@/types/market';

const behaviourConfig = {
  Friendly: { icon: '😊', color: 'text-[#38BDF8]', bg: 'bg-[#38BDF8]/10 border border-[#38BDF8]/20' },
  Average:  { icon: '😐', color: 'text-amber-400', bg: 'bg-amber-500/10 border border-amber-500/20' },
  Rude:     { icon: '😠', color: 'text-red-400', bg: 'bg-red-500/10 border border-red-500/20' },
};

const parkingConfig = {
  Available: { icon: '🅿️', color: 'text-[#38BDF8]', bg: 'bg-[#38BDF8]/10 border border-[#38BDF8]/20' },
  Limited:   { icon: '⚠️', color: 'text-amber-400', bg: 'bg-amber-500/10 border border-amber-500/20' },
  None:      { icon: '🚫', color: 'text-red-400', bg: 'bg-red-500/10 border border-red-500/20' },
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
      <span className="text-sm font-medium text-gray-200">{label}</span>
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
      <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2 drop-shadow-md">
        <span className="w-6 h-6 bg-white/10 border border-white/10 rounded-md flex items-center justify-center backdrop-blur-sm">🛍️</span>
        Shopping Experience
      </h2>
      <p className="text-xs text-gray-400 mb-4">What to expect when you visit</p>

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
          colorClass={market.experience.bargaining ? 'text-[#38BDF8]' : 'text-gray-400'}
          bgClass={market.experience.bargaining ? 'bg-[#38BDF8]/10 border border-[#38BDF8]/20' : 'bg-white/5 border border-white/10'}
        />
        <ExperiencePill
          label="Family Friendly"
          value={market.experience.familyFriendly ? 'Yes, great for families' : 'More of a solo trip'}
          icon={market.experience.familyFriendly ? '👨‍👩‍👧' : '👤'}
          colorClass={market.experience.familyFriendly ? 'text-[#38BDF8]' : 'text-gray-400'}
          bgClass={market.experience.familyFriendly ? 'bg-[#38BDF8]/10 border border-[#38BDF8]/20' : 'bg-white/5 border border-white/10'}
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
