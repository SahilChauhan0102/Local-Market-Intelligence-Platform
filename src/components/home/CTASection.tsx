import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-labelledby="cta-heading">
      <div className="relative overflow-hidden rounded-3xl bg-[#0F172A] px-8 py-14 text-center">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #22C55E 1px, transparent 0)`, backgroundSize: '32px 32px' }} />
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#22C55E] rounded-full opacity-10 blur-3xl" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#22C55E] rounded-full opacity-10 blur-3xl" />

        <div className="relative z-10">
          <p className="text-[#22C55E] text-sm font-semibold uppercase tracking-wider mb-3">
            Know Before You Go
          </p>
          <h2 id="cta-heading" className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to explore Sirsa&apos;s best markets?
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto text-sm leading-relaxed">
            Compare markets side-by-side, check real crowd levels, and discover hidden gems across Sirsa, Haryana.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/markets" id="cta-explore-btn" className="btn-primary px-8 py-3.5">
              Explore All Markets →
            </Link>
            <Link href="/compare" id="cta-compare-btn"
              className="px-8 py-3.5 rounded-xl border-2 border-white/20 text-white font-semibold text-sm hover:border-[#22C55E] hover:text-[#22C55E] transition-all">
              Compare Markets
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
