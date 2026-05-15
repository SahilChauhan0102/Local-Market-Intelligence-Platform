import Link from 'next/link';

const CATEGORIES = [
  { name: 'Clothes & Fashion', icon: '👗', query: 'Clothes', color: 'from-pink-500 to-rose-500', count: 8 },
  { name: 'Street Food', icon: '🍜', query: 'Street Food', color: 'from-orange-500 to-amber-500', count: 5 },
  { name: 'Electronics', icon: '📱', query: 'Electronics', color: 'from-blue-500 to-cyan-500', count: 5 },
  { name: 'Grocery & Spices', icon: '🌿', query: 'Grocery', color: 'from-green-500 to-emerald-500', count: 4 },
  { name: 'Jewelry & Gold', icon: '💍', query: 'Jewelry', color: 'from-yellow-500 to-amber-400', count: 2 },
  { name: 'IT & Gadgets', icon: '💻', query: 'IT', color: 'from-indigo-500 to-violet-500', count: 2 },
];

export default function PopularCategories() {
  return (
    <section className="bg-white/5 py-16" aria-labelledby="categories-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-[#22C55E] text-sm font-semibold uppercase tracking-wider mb-1">
            Browse by Type
          </p>
          <h2 id="categories-heading" className="section-heading">Popular Categories</h2>
          <p className="text-[#6B7280] mt-2 text-sm max-w-md mx-auto">
            Find exactly what you&apos;re looking for by browsing our curated market categories
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={`/markets?category=${encodeURIComponent(cat.query)}`}
              id={`category-${cat.query.toLowerCase().replace(/[^a-z]/g, '-')}`}
              className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/5 hover:bg-white/5 border border-transparent hover:border-white/10 hover:shadow-md transition-all duration-200"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-[#0F172A] leading-tight">{cat.name}</p>
                <p className="text-[10px] text-[#6B7280] mt-0.5">{cat.count} markets</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
