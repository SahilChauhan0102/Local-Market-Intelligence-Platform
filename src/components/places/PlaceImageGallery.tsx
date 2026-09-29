'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Place, PlaceType } from '@/types/place';

const TYPE_CONFIG: Record<PlaceType, { emoji: string; color: string }> = {
  Temple:    { emoji: '🛕', color: '#FF6B35' },
  Mosque:    { emoji: '🕌', color: '#2D6A4F' },
  Church:    { emoji: '⛪', color: '#4A90D9' },
  Dargah:    { emoji: '☪️', color: '#9B5DE5' },
  Gurudwara: { emoji: '🟠', color: '#F4A261' },
  Monastery: { emoji: '🏯', color: '#606C38' },
  Synagogue: { emoji: '✡️', color: '#E8C84A' },
};

export default function PlaceImageGallery({ place }: { place: Place }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const cfg = TYPE_CONFIG[place.type] ?? TYPE_CONFIG.Temple;

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove  = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.targetTouches[0].clientX;
    if (diff > 50)  { setActiveIdx((p) => Math.min(place.images.length - 1, p + 1)); setTouchStart(null); }
    if (diff < -50) { setActiveIdx((p) => Math.max(0, p - 1));                        setTouchStart(null); }
  };
  const handleTouchEnd = () => setTouchStart(null);

  if (!place.images?.length) return null;

  return (
    <>
      <section className="card overflow-hidden" aria-label={`${place.name} image gallery`}>
        {/* Main image */}
        <div
          className="relative h-72 sm:h-[420px] cursor-pointer bg-gradient-to-br from-slate-700 to-slate-800"
          onClick={() => setLightboxOpen(true)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={place.images[activeIdx]}
            alt={`${place.name} — photo ${activeIdx + 1}`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1200px) 100vw, 900px"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Name + badges */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex flex-wrap gap-2 mb-2">
              <span
                className="badge text-xs font-bold backdrop-blur-md"
                style={{ color: cfg.color, backgroundColor: `${cfg.color}25`, border: `1px solid ${cfg.color}50` }}
              >
                {cfg.emoji} {place.type}
              </span>
              <span className="badge bg-black/50 text-white text-xs backdrop-blur-sm">📍 {place.city}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white drop-shadow-lg leading-tight">
              {place.name}
            </h1>
          </div>

          {/* Image counter */}
          {place.images.length > 1 && (
            <div className="absolute top-4 right-4">
              <span className="badge bg-black/60 text-white text-xs backdrop-blur-sm">
                📷 {activeIdx + 1}/{place.images.length}
              </span>
            </div>
          )}

          {/* Nav arrows */}
          {place.images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setActiveIdx((p) => Math.max(0, p - 1)); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors text-xl"
                aria-label="Previous image"
              >‹</button>
              <button
                onClick={(e) => { e.stopPropagation(); setActiveIdx((p) => Math.min(place.images.length - 1, p + 1)); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors text-xl"
                aria-label="Next image"
              >›</button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {place.images.length > 1 && (
          <div className="flex gap-2 p-3 overflow-x-auto bg-black/20">
            {place.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  i === activeIdx ? 'border-[#38BDF8]' : 'border-transparent opacity-50 hover:opacity-100'
                }`}
                aria-label={`View photo ${i + 1}`}
              >
                <Image src={img} alt={`Thumbnail ${i + 1}`} fill className="object-cover" sizes="64px"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setLightboxOpen(false)}>
          <button className="absolute top-4 right-4 text-white text-3xl hover:text-[#38BDF8] transition-colors" onClick={() => setLightboxOpen(false)} aria-label="Close lightbox">✕</button>
          <div className="relative w-full max-w-5xl h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image src={place.images[activeIdx]} alt={`${place.name} fullscreen`} fill className="object-contain" sizes="100vw" />
          </div>
        </div>
      )}
    </>
  );
}
