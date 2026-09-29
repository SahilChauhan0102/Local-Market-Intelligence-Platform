'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Place, PlaceType } from '@/types/place';
import { isOpenToday, getTodayTimings } from '@/lib/places';

// ── Type config ───────────────────────────────────────────────────────────────
const TYPE_CONFIG: Record<PlaceType, { emoji: string; color: string; bg: string }> = {
  Temple:    { emoji: '🛕', color: '#FF6B35', bg: 'rgba(255,107,53,0.15)' },
  Mosque:    { emoji: '🕌', color: '#2D6A4F', bg: 'rgba(45,106,79,0.15)'  },
  Church:    { emoji: '⛪', color: '#4A90D9', bg: 'rgba(74,144,217,0.15)' },
  Dargah:    { emoji: '☪️', color: '#9B5DE5', bg: 'rgba(155,93,229,0.15)' },
  Gurudwara: { emoji: '🟠', color: '#F4A261', bg: 'rgba(244,162,97,0.15)' },
  Monastery: { emoji: '🏯', color: '#606C38', bg: 'rgba(96,108,56,0.15)'  },
  Synagogue: { emoji: '✡️', color: '#E8C84A', bg: 'rgba(232,200,74,0.15)' },
};

const CROWD_COLOR: Record<string, string> = {
  Low:    'text-emerald-400 bg-emerald-400/10',
  Medium: 'text-amber-400 bg-amber-400/10',
  High:   'text-red-400 bg-red-400/10',
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <svg className="w-3.5 h-3.5 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <span className="text-xs font-semibold text-gray-200">{rating.toFixed(1)}</span>
    </div>
  );
}

interface PlaceCardProps {
  place: Place;
}

export default function PlaceCard({ place }: PlaceCardProps) {
  const cfg   = TYPE_CONFIG[place.type] ?? TYPE_CONFIG.Temple;
  const open  = isOpenToday(place);
  const todayTime = getTodayTimings(place);

  return (
    <article className="card group overflow-hidden relative flex flex-col">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden flex-shrink-0">
        <Image
          src={place.images[0]}
          alt={`${place.name} — ${place.type} in ${place.city}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <span
            className="badge text-xs font-bold backdrop-blur-md shadow-md"
            style={{ color: cfg.color, backgroundColor: cfg.bg, border: `1px solid ${cfg.color}40` }}
          >
            {cfg.emoji} {place.type}
          </span>
        </div>

        {/* Open / Closed badge */}
        <div className="absolute top-3 right-3">
          {open ? (
            <span className="badge bg-green-600/90 text-white text-xs font-bold backdrop-blur-sm">Open Today</span>
          ) : (
            <span className="badge bg-red-600/90 text-white text-xs font-bold backdrop-blur-sm">Closed Today</span>
          )}
        </div>

        {/* Entry fee badge */}
        <div className="absolute bottom-3 left-3">
          <span className="badge bg-black/50 text-white text-xs backdrop-blur-sm shadow-md">
            💰 {place.entryFee.indian === 'Free' ? 'Free Entry' : place.entryFee.indian}
          </span>
        </div>

        {/* Crowd indicator */}
        <div className="absolute bottom-3 right-3">
          <span className={`badge text-xs font-semibold ${CROWD_COLOR[place.crowdLevel]}`}>
            👥 {place.crowdLevel} crowd
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-1.5">
          <h2 className="font-bold text-white text-base leading-tight group-hover:text-[#38BDF8] transition-colors pr-2 drop-shadow-sm">
            {place.name}
          </h2>
          <StarRating rating={place.rating} />
        </div>

        {/* City + address */}
        <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
          <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          <span className="truncate">{place.city} · {place.address.split(',').slice(-3, -1).join(',').trim()}</span>
        </p>

        {/* Short description */}
        <p className="text-xs text-gray-300 mb-3 leading-relaxed line-clamp-2">
          {place.shortDescription}
        </p>

        {/* Metro + timings chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="badge badge-muted text-[10px]">
            🚇 {place.metroAccess.station.replace(' Metro Station', '')} · {place.metroAccess.walkingMinutes} min
          </span>
          <span className="badge badge-muted text-[10px] truncate max-w-[160px]" title={todayTime}>
            🕐 {todayTime.split(',')[0]}
          </span>
        </div>

        {/* Footer CTA */}
        <div className="mt-auto pt-3 border-t border-white/5">
          <Link
            href={`/places/${place.slug}`}
            id={`place-card-link-${place.slug}`}
            className="text-sm font-semibold hover:underline transition-colors"
            style={{ color: cfg.color }}
          >
            View Details →
          </Link>
        </div>
      </div>
    </article>
  );
}
