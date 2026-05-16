import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getMarketBySlug, getAllSlugs } from '@/lib/markets';
import ImageGallery from '@/components/detail/ImageGallery';
import MarketOverview from '@/components/detail/MarketOverview';
import MarketStoryWidget from '@/components/detail/MarketStoryWidget';
import CrowdLevelWidget from '@/components/detail/CrowdLevelWidget';
import ExperienceWidget from '@/components/detail/ExperienceWidget';
import FoodNearbyWidget from '@/components/detail/FoodNearbyWidget';
import NearbyPlacesWidget from '@/components/detail/NearbyPlacesWidget';
import DirectionsWidget from '@/components/detail/DirectionsWidget';
import ReviewSection from '@/components/detail/ReviewSection';
import AddToCompareButton from '@/components/detail/AddToCompareButton';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const market = await getMarketBySlug(slug);
  if (!market) return { title: 'Market Not Found' };
  return {
    title: `${market.name} — ${market.famousFor.slice(0, 2).join(', ')} Market in ${market.city}`,
    description: `${market.tagline}. ${market.name} is known for ${market.famousFor.join(', ')}. Price: ${market.priceRange}. Best time: ${market.bestTimeToVisit}. ${market.directions.nearestMetro ? `Nearest Metro: ${market.directions.nearestMetro}.` : ''}`,
    openGraph: {
      title: market.name,
      description: market.tagline,
      images: market.images.slice(0, 1),
    },
  };
}

export default async function MarketDetailPage({ params }: Props) {
  const { slug } = await params;
  const market = await getMarketBySlug(slug);
  if (!market) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[#38BDF8] transition-colors">Home</Link>
        <span>›</span>
        <Link href="/markets" className="hover:text-[#38BDF8] transition-colors">Markets</Link>
        <span>›</span>
        <Link href={`/markets?city=${market.city}`} className="hover:text-[#38BDF8] transition-colors">{market.city}</Link>
        <span>›</span>
        <span className="text-gray-50 font-medium">{market.name}</span>
      </nav>

      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="badge bg-[#38BDF8] text-[#0F172A] text-xs font-bold">📍 {market.city}</span>
            {market.category.map((c) => (
              <span key={c} className="badge bg-white/10 text-gray-200 border border-white/20 text-xs">{c}</span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-md leading-tight">
            {market.name}
          </h1>
          <p className="text-gray-300 mt-1.5 text-sm max-w-xl">{market.tagline}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <AddToCompareButton market={market} />
        </div>
      </div>

      {/* Hero Section: Story & Gallery */}
      {market.story ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          <div className="lg:col-span-7">
            <MarketStoryWidget market={market} />
          </div>
          <div className="lg:col-span-5">
            <ImageGallery market={market} />
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <ImageGallery market={market} />
        </div>
      )}

      {/* Main 2-col layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Main widgets */}
        <div className="lg:col-span-2 space-y-6">
          <MarketOverview market={market} />
          <DirectionsWidget market={market} />
          <CrowdLevelWidget market={market} />
          <ExperienceWidget market={market} />
          <ReviewSection reviews={market.reviews} />
        </div>

        {/* Right: Sidebar */}
        <aside className="space-y-6">
          <FoodNearbyWidget market={market} />
          <NearbyPlacesWidget market={market} />

          {/* Quick info */}
          <div className="card p-5 bg-white/5 border border-white/10 text-white">
            <h2 className="font-bold text-sm mb-3 text-[#38BDF8]">Quick Info</h2>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><span>📍</span> {market.location}</li>
              <li className="flex items-center gap-2"><span>⏰</span> {market.bestTimeToVisit}</li>
              <li className="flex items-center gap-2">
                <span>💰</span> {market.priceRange} — {market.priceRange === '₹' ? 'Budget-friendly' : market.priceRange === '₹₹' ? 'Moderate' : 'Premium'}
              </li>
              <li className="flex items-center gap-2"><span>🅿️</span> Parking: {market.experience.parking}</li>
              <li className="flex items-center gap-2"><span>🤝</span> Bargaining: {market.experience.bargaining ? 'Yes' : 'No'}</li>
              {market.directions.nearestMetro && (
                <li className="flex items-center gap-2"><span>🚇</span> {market.directions.nearestMetro}</li>
              )}
              {market.directions.nearestRailway && (
                <li className="flex items-center gap-2"><span>🚂</span> {market.directions.nearestRailway}</li>
              )}
            </ul>
            <Link href="/compare" className="btn-primary w-full justify-center mt-4 text-xs py-2.5">
              Compare with other markets →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
