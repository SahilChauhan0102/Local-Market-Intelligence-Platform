import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPlaceBySlug, getAllPlaceSlugs, isOpenToday, getTodayTimings, getNearbyPlacesForMarket } from '@/lib/places';
import { getMarketBySlug } from '@/lib/markets';
import PlaceImageGallery from '@/components/places/PlaceImageGallery';
import PlaceJsonLd from '@/components/seo/PlaceJsonLd';
import ReviewSection from '@/components/detail/ReviewSection';
import type { PlaceType } from '@/types/place';

interface Props {
  params: Promise<{ slug: string }>;
}

const TYPE_CONFIG: Record<PlaceType, { emoji: string; color: string }> = {
  Temple:    { emoji: '🛕', color: '#FF6B35' },
  Mosque:    { emoji: '🕌', color: '#2D6A4F' },
  Church:    { emoji: '⛪', color: '#4A90D9' },
  Dargah:    { emoji: '☪️', color: '#9B5DE5' },
  Gurudwara: { emoji: '🟠', color: '#F4A261' },
  Monastery: { emoji: '🏯', color: '#606C38' },
  Synagogue: { emoji: '✡️', color: '#E8C84A' },
};

const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

export async function generateStaticParams() {
  const slugs = getAllPlaceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const place = getPlaceBySlug(slug);
  if (!place) return { title: 'Place Not Found' };
  return {
    title: `${place.name} — Timings, Entry Fee, How to Reach | LocalGali`,
    description: `${place.name} in ${place.city}: timings, entry fee (${place.entryFee.indian}), how to reach by metro (${place.metroAccess.station}), best time to visit, dress code & more.`,
    keywords: [
      place.name,
      `${place.type} in ${place.city}`,
      `${place.name} timings`,
      `${place.name} entry fee`,
      `${place.name} metro`,
      `places of worship ${place.city}`,
      ...place.tags,
    ],
    openGraph: {
      title: `${place.name} — ${place.type} in ${place.city}`,
      description: place.shortDescription,
      images: [{ url: place.images[0] }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${place.name} | LocalGali`,
      description: place.shortDescription,
      images: [place.images[0]],
    },
  };
}



export default async function PlaceDetailPage({ params }: Props) {
  const { slug } = await params;
  const place = getPlaceBySlug(slug);
  if (!place) notFound();

  const cfg        = TYPE_CONFIG[place.type] ?? TYPE_CONFIG.Temple;
  const open       = isOpenToday(place);
  const todayTime  = getTodayTimings(place);
  const todayName  = DAY_NAMES[new Date().getDay()];
  const mapsUrl    = `https://maps.google.com/?q=${place.coordinates.lat},${place.coordinates.lng}`;

  // Fetch nearby markets
  const nearbyMarkets = await Promise.all(
    place.nearbyMarkets.map((mSlug) => getMarketBySlug(mSlug))
  );
  const validMarkets = nearbyMarkets.filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PlaceJsonLd place={place} />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6 flex-wrap" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[#38BDF8] transition-colors">Home</Link>
        <span>›</span>
        <Link href="/places" className="hover:text-[#38BDF8] transition-colors">Places of Worship</Link>
        <span>›</span>
        <Link href={`/places?type=${place.type}`} className="hover:text-[#38BDF8] transition-colors">{place.type}s</Link>
        <span>›</span>
        <span className="text-gray-50 font-medium">{place.name}</span>
      </nav>

      {/* Open today badge + rating row */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {open ? (
          <span className="badge bg-green-600/90 text-white text-sm font-bold px-3 py-1.5">✅ Open Today · {todayTime.split(',')[0]}</span>
        ) : (
          <span className="badge bg-red-600/90 text-white text-sm font-bold px-3 py-1.5">🔒 Closed Today</span>
        )}
        {place.prayerTimeClosures && (
          <span className="badge bg-amber-500/20 text-amber-300 text-xs border border-amber-500/30">⚠️ Closed during prayer times</span>
        )}
        <div className="flex items-center gap-1.5 ml-auto">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} className={`w-4 h-4 ${i < Math.round(place.rating) ? 'text-amber-400 fill-amber-400' : 'text-white/20 fill-white/20'}`} viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-white font-bold">{place.rating.toFixed(1)}</span>
          <span className="text-gray-400 text-sm">({place.totalRatings.toLocaleString()} ratings)</span>
        </div>
      </div>

      {/* 1. Hero Image Gallery */}
      <div className="mb-6">
        <PlaceImageGallery place={place} />
      </div>

      {/* 2. Quick Info Bar */}
      <div className="card p-4 mb-6 overflow-x-auto">
        <div className="flex gap-4 sm:gap-6 min-w-max sm:min-w-0 sm:flex-wrap">
          {[
            { icon: '🕐', label: 'Today', value: todayTime.split(',')[0] },
            { icon: '💰', label: 'Entry', value: place.entryFee.indian },
            { icon: '📸', label: 'Photography', value: place.photographyAllowed },
            { icon: '👥', label: 'Crowd', value: place.crowdLevel },
            { icon: '🅿️', label: 'Parking', value: place.parking },
          ].map(({ icon, label, value }) => (
            <div key={label} className="flex flex-col items-center text-center min-w-[80px]">
              <span className="text-2xl mb-1">{icon}</span>
              <span className="text-xs text-gray-400 uppercase tracking-wide">{label}</span>
              <span className="text-sm font-semibold text-white mt-0.5">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main 2-col layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ─── Left main column ─────────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">

          {/* 3. About */}
          <section className="card p-6" aria-label="About">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-white/10 border border-white/10 rounded-md flex items-center justify-center">ℹ️</span>
              About {place.name}
            </h2>
            <p className="text-gray-200 text-sm leading-relaxed mb-4">{place.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {place.tags.map((tag) => (
                <span key={tag} className="badge badge-muted text-xs">{tag}</span>
              ))}
            </div>

            {/* Dress code callout */}
            <div className="mt-4 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
              <p className="text-amber-300 text-xs font-bold uppercase tracking-wide mb-1.5">👗 Dress Code</p>
              <p className="text-amber-100 text-sm leading-relaxed">{place.dresscode}</p>
            </div>
          </section>

          {/* 4. Timings */}
          <section className="card p-6" aria-label="Timings">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-white/10 border border-white/10 rounded-md flex items-center justify-center">⏰</span>
              Timings
            </h2>
            {place.prayerTimeClosures && (
              <div className="mb-4 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                <p className="text-amber-300 text-xs">⚠️ Closed to visitors during prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha)</p>
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 text-gray-400 font-medium text-xs uppercase tracking-wide">Day</th>
                    <th className="text-left py-2 text-gray-400 font-medium text-xs uppercase tracking-wide">Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {DAY_NAMES.map((day) => {
                    const time    = place.timings[day] ?? '—';
                    const isClosed = time === 'Closed' || place.closedOn.includes(day);
                    const isToday  = day === todayName;
                    return (
                      <tr
                        key={day}
                        className={`border-b border-white/5 ${isToday ? 'bg-[#38BDF8]/10' : ''}`}
                      >
                        <td className={`py-2.5 pr-4 font-medium ${isToday ? 'text-[#38BDF8]' : 'text-gray-200'}`}>
                          {day} {isToday && <span className="text-[10px] bg-[#38BDF8]/20 text-[#38BDF8] px-1.5 py-0.5 rounded-full ml-1">Today</span>}
                        </td>
                        <td className={`py-2.5 ${isClosed ? 'text-red-400 font-semibold' : isToday ? 'text-white font-semibold' : 'text-gray-300'}`}>
                          {isClosed ? '🔒 Closed' : time}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* 5. How to Reach */}
          <section className="card p-6" aria-label="How to reach">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-white/10 border border-white/10 rounded-md flex items-center justify-center">🗺️</span>
              How to Reach
            </h2>

            {/* Metro */}
            <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl mb-3">
              <span className="text-2xl flex-shrink-0">🚇</span>
              <div>
                <p className="text-white font-semibold text-sm">{place.metroAccess.station}</p>
                <p className="text-gray-400 text-xs mt-0.5">
                  {place.metroAccess.line} · {place.metroAccess.walkingMinutes} min walk
                  {place.metroAccess.exit && ` · ${place.metroAccess.exit}`}
                </p>
              </div>
            </div>

            {/* Bus */}
            {place.busRoutes && place.busRoutes.length > 0 && (
              <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl mb-3">
                <span className="text-2xl flex-shrink-0">🚌</span>
                <div>
                  <p className="text-white font-semibold text-sm mb-1">Bus Routes</p>
                  <div className="flex flex-wrap gap-1.5">
                    {place.busRoutes.map((r) => (
                      <span key={r} className="badge badge-muted text-xs">{r}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Parking */}
            <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl mb-4">
              <span className="text-2xl flex-shrink-0">🅿️</span>
              <div>
                <p className="text-white font-semibold text-sm">Parking</p>
                <p className={`text-xs mt-0.5 ${place.parking === 'Available' ? 'text-green-400' : place.parking === 'Limited' ? 'text-amber-400' : 'text-red-400'}`}>
                  {place.parking}
                </p>
              </div>
            </div>

            {/* Google Maps CTA */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              id={`maps-link-${place.slug}`}
              className="btn-primary w-full justify-center text-sm py-2.5"
            >
              📍 Open in Google Maps
            </a>
          </section>

          {/* 6. Best Time to Visit */}
          <section className="card p-6" aria-label="Best time to visit">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-white/10 border border-white/10 rounded-md flex items-center justify-center">🌤️</span>
              Best Time to Visit
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[
                { icon: '📅', label: 'Season', value: place.bestTimeToVisit.season },
                { icon: '🕐', label: 'Time of Day', value: place.bestTimeToVisit.timeOfDay },
                { icon: '⚠️', label: 'Avoid', value: place.bestTimeToVisit.avoid },
              ].map(({ icon, label, value }) => (
                <div key={label} className="bg-white/5 rounded-xl p-4">
                  <p className="text-2xl mb-1.5">{icon}</p>
                  <p className="text-gray-400 text-xs uppercase tracking-wide font-semibold mb-1">{label}</p>
                  <p className="text-white text-sm leading-relaxed">{value}</p>
                </div>
              ))}
            </div>

            {/* Special Events */}
            {place.specialEvents.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-300 mb-3">📆 Special Events & Festivals</p>
                <div className="space-y-2">
                  {place.specialEvents.map((ev, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <span className="text-white text-sm">{ev.name}</span>
                      <span className="badge badge-muted text-xs">{ev.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* 7. Visitor Information */}
          <section className="card p-6" aria-label="Visitor information">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-white/10 border border-white/10 rounded-md flex items-center justify-center">📋</span>
              Visitor Information
            </h2>

            {/* Entry fee table */}
            <div className="bg-white/5 rounded-xl overflow-hidden mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2.5 px-4 text-gray-400 font-medium text-xs uppercase">Visitor</th>
                    <th className="text-left py-2.5 px-4 text-gray-400 font-medium text-xs uppercase">Entry Fee</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-2.5 px-4 text-gray-200">🇮🇳 Indian</td>
                    <td className="py-2.5 px-4 text-white font-semibold">{place.entryFee.indian}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 text-gray-200">🌍 Foreign</td>
                    <td className="py-2.5 px-4 text-white font-semibold">{place.entryFee.foreign}</td>
                  </tr>
                </tbody>
              </table>
              {place.entryFee.notes && (
                <div className="px-4 py-2.5 bg-blue-500/10 border-t border-white/5">
                  <p className="text-blue-300 text-xs">📝 {place.entryFee.notes}</p>
                </div>
              )}
            </div>

            {/* Dress code visual */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-300 mb-2">👗 Dress Code Rules</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {place.dresscode.split('. ').filter(Boolean).map((rule, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-200">
                    <span>{i === place.dresscode.split('. ').length - 1 ? '✅' : '✅'}</span>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Photography */}
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl mb-4">
              <span className="text-xl">📸</span>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Photography</p>
                <p className={`text-sm font-semibold mt-0.5 ${place.photographyAllowed === 'Yes' ? 'text-green-400' : place.photographyAllowed === 'Outside Only' ? 'text-amber-400' : 'text-red-400'}`}>
                  {place.photographyAllowed === 'Yes' ? '✅ Allowed' : place.photographyAllowed === 'Outside Only' ? '⚠️ Outside Only' : '❌ Not Allowed'}
                </p>
              </div>
            </div>

            {/* Accessibility */}
            {place.accessibilityFeatures.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-300 mb-2">♿ Accessibility</p>
                <div className="flex flex-wrap gap-2">
                  {place.accessibilityFeatures.map((f) => (
                    <span key={f} className="badge badge-muted text-xs">♿ {f}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Languages of Prayer */}
            <div>
              <p className="text-sm font-semibold text-gray-300 mb-2">🗣️ Languages of Prayer</p>
              <div className="flex flex-wrap gap-2">
                {place.languagesOfPrayer.map((l) => (
                  <span key={l} className="badge badge-accent text-xs">{l}</span>
                ))}
              </div>
            </div>
          </section>

          {/* 10. Community Ratings */}
          <ReviewSection reviews={[]} />
        </div>

        {/* ─── Right sidebar ─────────────────────────────────── */}
        <aside className="space-y-6">

          {/* Quick Info card */}
          <div className="card p-5 bg-white/5 border border-white/10 text-white">
            <h2 className="font-bold text-sm mb-3" style={{ color: cfg.color }}>
              {cfg.emoji} {place.type} Quick Facts
            </h2>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2"><span>📍</span><span className="leading-relaxed">{place.address}</span></li>
              <li className="flex items-center gap-2"><span>🕐</span><span>Today: {todayTime.split(',')[0]}</span></li>
              <li className="flex items-center gap-2"><span>💰</span><span>Entry: {place.entryFee.indian}</span></li>
              <li className="flex items-center gap-2"><span>🚇</span><span>{place.metroAccess.station}</span></li>
              <li className="flex items-center gap-2"><span>👥</span><span>Crowd: {place.crowdLevel}</span></li>
              <li className="flex items-center gap-2"><span>🅿️</span><span>Parking: {place.parking}</span></li>
              <li className="flex items-center gap-2"><span>📸</span><span>Photos: {place.photographyAllowed}</span></li>
            </ul>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline w-full justify-center mt-4 text-xs py-2">
              📍 Get Directions
            </a>
          </div>

          {/* 8. Nearby Food */}
          {place.nearbyFood.length > 0 && (
            <section className="card p-5" aria-label="Nearby food">
              <h2 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                <span className="w-6 h-6 bg-white/10 rounded-md flex items-center justify-center">🍽️</span>
                Nearby Food
              </h2>
              <p className="text-xs text-gray-400 mb-4">Places to eat around this {place.type.toLowerCase()}</p>
              <ul className="space-y-2">
                {place.nearbyFood.map((food, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-200 py-1.5 border-b border-white/5 last:border-0">
                    <span className="flex-shrink-0">🍴</span>
                    <span>{food}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 9. Nearby Markets */}
          {validMarkets.length > 0 && (
            <section className="card p-5" aria-label="Nearby markets">
              <h2 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                <span className="w-6 h-6 bg-white/10 rounded-md flex items-center justify-center">🛍️</span>
                Nearby Markets
              </h2>
              <p className="text-xs text-gray-400 mb-4">Shopping near this {place.type.toLowerCase()}</p>
              <div className="space-y-3">
                {validMarkets.map((market) => market && (
                  <Link
                    key={market.slug}
                    href={`/market/${market.slug}`}
                    className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors group"
                  >
                    <div className="w-10 h-10 bg-[#22C55E]/20 rounded-lg flex items-center justify-center flex-shrink-0 text-xl">🏪</div>
                    <div>
                      <p className="text-white text-sm font-semibold group-hover:text-[#22C55E] transition-colors">{market.name}</p>
                      <p className="text-gray-400 text-xs">{market.city} · {market.priceRange}</p>
                    </div>
                    <span className="ml-auto text-gray-400 text-xs">→</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}

