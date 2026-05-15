'use client';

import { useState } from 'react';
import type { Market } from '@/types/market';

const crowdWidth: Record<string, string> = {
  Low: '25%', Medium: '55%', High: '100%',
};
const crowdColor: Record<string, string> = {
  Low: '#22C55E', Medium: '#F59E0B', High: '#EF4444',
};

interface CompareTableProps { markets: Market[]; }

function CompareCell({ children, highlight = false }: { children: React.ReactNode; highlight?: boolean }) {
  return <td className={`px-4 py-3 text-center text-sm ${highlight ? 'bg-[#38BDF8]/10' : ''}`}>{children}</td>;
}

function CrowdBar({ level }: { level: string }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="w-16 h-1.5 bg-white/20 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: crowdWidth[level] || '0%', backgroundColor: crowdColor[level] || '#94A3B8' }} />
      </div>
      <span className="text-xs text-gray-400 w-12">{level}</span>
    </div>
  );
}

export default function CompareTable({ markets }: CompareTableProps) {
  const [tab, setTab] = useState('overview');

  return (
    <div className="space-y-4">
      <div className="flex gap-2 bg-white/10 p-1 rounded-xl w-fit">
        {['overview', 'crowd', 'experience'].map((s) => (
          <button key={s} id={`compare-tab-${s}`} onClick={() => setTab(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${tab === s ? 'bg-white/5 text-white shadow-md font-semibold' : 'text-gray-400 hover:text-white'}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white/10 text-white">
                <th className="px-4 py-3 text-left text-sm font-semibold w-36">Attribute</th>
                {markets.map((m) => (
                  <th key={m.slug} className="px-4 py-3 text-center text-sm font-semibold">
                    <div className="flex flex-col items-center gap-1">
                      <span>{m.name}</span>
                      <span className="text-xs text-gray-400 font-normal">{m.priceRange}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tab === 'overview' && (
                <>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-200 bg-white/5">Famous For</td>
                    {markets.map((m) => (
                      <CompareCell key={m.slug}>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {m.famousFor.slice(0, 2).map((f) => <span key={f} className="badge badge-accent text-[10px]">{f}</span>)}
                        </div>
                      </CompareCell>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-200 bg-white/5">Price Range</td>
                    {markets.map((m) => <CompareCell key={m.slug}><span className="text-xl font-bold text-white">{m.priceRange}</span></CompareCell>)}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-200 bg-white/5">Rating</td>
                    {markets.map((m) => {
                      const best = Math.max(...markets.map((x) => x.rating));
                      return (
                        <CompareCell key={m.slug} highlight={m.rating === best}>
                          <div className="flex items-center justify-center gap-1">
                            <svg className="w-3.5 h-3.5 text-amber-400 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                            <span className="font-bold">{m.rating}</span>
                            {m.rating === best && <span className="text-[10px] text-[#38BDF8] font-semibold ml-1">Best</span>}
                          </div>
                        </CompareCell>
                      );
                    })}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-200 bg-white/5">Best Visit Time</td>
                    {markets.map((m) => <CompareCell key={m.slug}><span className="text-xs">{m.bestTimeToVisit.split('(')[0].trim()}</span></CompareCell>)}
                  </tr>
                </>
              )}
              {tab === 'crowd' && (
                <>
                  {(['morning', 'afternoon', 'evening'] as const).map((t) => (
                    <tr key={t}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-200 bg-white/5 capitalize">
                        {t === 'morning' ? '🌅' : t === 'afternoon' ? '☀️' : '🌆'} {t}
                      </td>
                      {markets.map((m) => <CompareCell key={m.slug}><CrowdBar level={m.crowd[t]} /></CompareCell>)}
                    </tr>
                  ))}
                </>
              )}
              {tab === 'experience' && (
                <>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-200 bg-white/5">Behaviour</td>
                    {markets.map((m) => (
                      <CompareCell key={m.slug}>
                        <span className={`badge text-xs ${m.experience.behaviour === 'Friendly' ? 'badge-accent' : 'badge-muted'}`}>
                          {m.experience.behaviour === 'Friendly' ? '😊' : m.experience.behaviour === 'Average' ? '😐' : '😠'} {m.experience.behaviour}
                        </span>
                      </CompareCell>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-200 bg-white/5">Bargaining</td>
                    {markets.map((m) => <CompareCell key={m.slug} highlight={m.experience.bargaining}><span className={m.experience.bargaining ? 'text-[#38BDF8] font-semibold' : 'text-gray-400'}>{m.experience.bargaining ? '✓ Yes' : '✗ No'}</span></CompareCell>)}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-200 bg-white/5">Family Friendly</td>
                    {markets.map((m) => <CompareCell key={m.slug} highlight={m.experience.familyFriendly}><span className={m.experience.familyFriendly ? 'text-[#38BDF8] font-semibold' : 'text-gray-400'}>{m.experience.familyFriendly ? '✓ Yes' : '✗ No'}</span></CompareCell>)}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-200 bg-white/5">Parking</td>
                    {markets.map((m) => (
                      <CompareCell key={m.slug}>
                        <span className={`badge text-xs ${m.experience.parking === 'Available' ? 'badge-accent' : m.experience.parking === 'Limited' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'}`}>
                          {m.experience.parking}
                        </span>
                      </CompareCell>
                    ))}
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
