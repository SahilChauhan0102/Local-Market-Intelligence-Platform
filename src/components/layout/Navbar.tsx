'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCompare } from '@/context/CompareContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { compareList } = useCompare();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-[#0F172A] rounded-lg flex items-center justify-center group-hover:bg-[#22C55E] transition-colors">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div className="leading-tight">
            <p className="text-sm font-800 text-[#0F172A] font-extrabold">Local Market Explorer</p>
            <p className="text-xs text-[#6B7280]">Delhi NCR &amp; Sirsa</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {[
            { href: '/', label: 'Home' },
            { href: '/markets', label: 'All Markets' },
            { href: '/compare', label: 'Compare', badge: compareList.length > 0 ? compareList.length : undefined },
          ].map(({ href, label, badge }) => (
            <Link
              key={href}
              href={href}
              className="relative px-3 py-2 text-sm font-medium text-[#374151] hover:text-[#22C55E] transition-colors rounded-lg hover:bg-slate-50"
            >
              {label}
              {badge !== undefined && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#22C55E] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {badge}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/markets" className="btn-primary text-sm py-2 px-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            Explore
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          id="mobile-menu-button"
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <div className="w-5 flex flex-col gap-1">
            <span className={`block h-0.5 bg-[#0F172A] transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block h-0.5 bg-[#0F172A] transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-[#0F172A] transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 flex flex-col gap-1 animate-fade-up">
          {[
            { href: '/', label: 'Home' },
            { href: '/markets', label: 'All Markets' },
            { href: '/compare', label: `Compare${compareList.length > 0 ? ` (${compareList.length})` : ''}` },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-3 py-2.5 text-sm font-medium text-[#374151] hover:text-[#22C55E] hover:bg-slate-50 rounded-lg transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link href="/markets" className="btn-primary text-sm py-2.5 mt-2" onClick={() => setMenuOpen(false)}>
            Explore Markets
          </Link>
        </div>
      )}
    </header>
  );
}
