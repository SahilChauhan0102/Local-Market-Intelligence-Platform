'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Market } from '@/types/market';

export default function ImageGallery({ market }: { market: Market }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const currentX = e.targetTouches[0].clientX;
    const diff = touchStart - currentX;

    if (diff > 50) {
      setActiveIdx((p) => Math.min(market.images.length - 1, p + 1));
      setTouchStart(null);
    } else if (diff < -50) {
      setActiveIdx((p) => Math.max(0, p - 1));
      setTouchStart(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  if (!market.images || market.images.length === 0) return null;

  return (
    <section className="card overflow-hidden" aria-label="Market Image Gallery">
      {/* Main Image */}
      <div
        className="relative h-72 sm:h-96 bg-gradient-to-br from-slate-200 to-slate-300 cursor-pointer"
        onClick={() => setLightboxOpen(true)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={market.images[activeIdx]}
          alt={`${market.name} — photo ${activeIdx + 1}`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1200px) 100vw, 800px"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-4 right-4">
          <span className="badge bg-black/60 text-white text-xs backdrop-blur-sm">
            📷 {activeIdx + 1} / {market.images.length}
          </span>
        </div>
        {market.images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); setActiveIdx((p) => Math.max(0, p - 1)); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setActiveIdx((p) => Math.min(market.images.length - 1, p + 1)); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {market.images.length > 1 && (
        <div className="flex gap-2 p-3 overflow-x-auto">
          {market.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                i === activeIdx ? 'border-[#F59E0B]' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
              aria-label={`View photo ${i + 1}`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white text-2xl hover:text-[#F59E0B] transition-colors"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close lightbox"
          >
            ✕
          </button>
          <div className="relative w-full max-w-4xl h-[70vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={market.images[activeIdx]}
              alt={`${market.name} fullscreen`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </section>
  );
}
