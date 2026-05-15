import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-[#22C55E] rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="font-extrabold text-lg">Local Market Explorer</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Your smart local guide to discover, explore, and compare markets across Sirsa, Haryana. Know before you go.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="badge badge-accent text-xs">🌿 Sirsa, Haryana</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">Explore</h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/markets', label: 'All Markets' },
                { href: '/compare', label: 'Compare Markets' },
                { href: '/markets?category=Street Food', label: 'Street Food' },
                { href: '/markets?category=Clothes', label: 'Fashion Markets' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-gray-400 hover:text-[#22C55E] text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">Categories</h3>
            <ul className="space-y-2">
              {['Electronics', 'Grocery', 'Jewelry', 'Hardware', 'Fashion', 'Wholesale'].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/markets?category=${cat}`}
                    className="text-gray-400 hover:text-[#22C55E] text-sm transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Local Market Explorer. Made with ❤️ for Sirsa.
          </p>
          <p className="text-gray-300 text-xs">
            Data is for informational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
