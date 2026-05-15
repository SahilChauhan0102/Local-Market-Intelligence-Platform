import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">🏪</div>
        <h1 className="text-2xl font-extrabold text-[#0F172A] mb-2">Market Not Found</h1>
        <p className="text-[#6B7280] text-sm mb-6">
          This market doesn&apos;t exist yet or may have moved. Explore all available markets in Sirsa.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/markets" className="btn-primary justify-center">Browse All Markets</Link>
          <Link href="/" className="btn-outline justify-center">Go Home</Link>
        </div>
      </div>
    </div>
  );
}
