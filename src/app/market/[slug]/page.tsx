import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getMarketBySlug, getAllSlugs } from '@/lib/markets';
import ImageGallery from '@/components/detail/ImageGallery';
import MarketOverview from '@/components/detail/MarketOverview';
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
      <nav className="flex items-center gap-2 text-xs text-[#6B7280] mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[#22C55E] transition-colors">Home</Link>
        <span>›</span>
        <Link href="/markets" className="hover:text-[#22C55E] transition-colors">Markets</Link>
        <span>›</span>
        <Link href={`/markets?city=${market.city}`} className="hover:text-[#22C55E] transition-colors">{market.city}</Link>
        <span>›</span>
        <span className="text-[#0F172A] font-medium">{market.name}</span>
      </nav>

      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="badge bg-[#0F172A] text-white text-xs">📍 {market.city}</span>
            {market.category.map((c) => (
              <span key={c} className="badge badge-muted text-xs">{c}</span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] leading-tight">
            {market.name}
          </h1>
          <p className="text-[#6B7280] mt-1.5 text-sm max-w-xl">{market.tagline}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <AddToCompareButton market={market} />
        </div>
      </div>

      {/* Image Gallery */}
      <div className="mb-6">
        <ImageGallery market={market} />
      </div>

      {/* Main 2-col layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Main widgets */}
        <div className="lg:col-span-2 space-y-6">
          <MarketOverview market={market} />
          <DirectionsWidget market={market} />
          <CrowdLevelWidget market={market} />
          <ExperienceWidget market={market} />
          <ReviewSection />
        </div>

        {/* Right: Sidebar */}
        <aside className="space-y-6">
          <FoodNearbyWidget market={market} />
          <NearbyPlacesWidget market={market} />

          {/* Quick info */}
          <div className="card p-5 bg-[#0F172A] text-white">
            <h2 className="font-bold text-sm mb-3 text-[#22C55E]">Quick Info</h2>
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
