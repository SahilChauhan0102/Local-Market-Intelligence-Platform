/**
 * Data Storage Unit Converter — main application component
 *
 * Palette rationale: Electric blue (#2563eb) + indigo on deep navy (#050a14).
 * Association: data, digital, technology — distinct from the health tools' teal/amber.
 * The blue-on-navy palette evokes storage media, servers, and data visualisation.
 */

import { useState } from 'react'
import {
  convertStorageUnit,
  getFormulaExplanation,
  STORAGE_UNITS,
  type BaseMode,
  type ConversionResult,
} from './utils/storage'
import { CookieConsent } from './components/CookieConsent'
import { DonationButton } from './components/DonationButton'
import './index.css'

function App() {
  const [value, setValue] = useState<string>('')
  const [fromUnit, setFromUnit] = useState<string>('gigabyte')
  const [mode, setMode] = useState<BaseMode>('decimal')
  const [results, setResults] = useState<ConversionResult[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  function handleConvert() {
    const num = parseFloat(value)
    if (!value || !isFinite(num) || num < 0) {
      setError('Please enter a valid, non-negative number.')
      setResults(null)
      return
    }
    const converted = convertStorageUnit(num, fromUnit, mode)
    if (!converted) {
      setError('Value is too large or the unit is invalid.')
      setResults(null)
      return
    }
    setError(null)
    setResults(converted)
  }

  function handleModeChange(newMode: BaseMode) {
    setMode(newMode)
    setResults(null)
  }


  return (
    <div className="min-h-screen bg-[#050a14] font-sans text-white selection:bg-blue-600/30">
      <header className="border-b border-blue-900/40 bg-[#050e1f]/80 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-700/20 ring-1 ring-blue-600/30">
              <span className="text-lg leading-none" aria-hidden="true">💾</span>
            </div>
            <div>
              <span className="text-sm font-semibold tracking-wide text-blue-400">LocalGali Tools</span>
              <p className="text-xs text-gray-600">storage.localgali.in</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12" id="main-content">
        <section className="mb-10 text-center" aria-labelledby="page-title">
          <h1 id="page-title" className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Storage Unit Converter
          </h1>
          <p className="mx-auto max-w-xl text-base text-gray-400 sm:text-lg">
            Convert between bits, bytes, KB, MB, GB, TB, and PB. Supports both binary (1024-based)
            and decimal (1000-based SI) standards.
          </p>
        </section>

        {/* Tool */}
        <div className="rounded-2xl border border-blue-900/30 bg-[#0a1628] p-6 shadow-2xl">
          {/* Mode toggle */}
          <div className="mb-6">
            <p className="mb-2 text-sm font-medium text-gray-400">Base</p>
            <div className="flex rounded-xl border border-white/10 p-1" role="group" aria-label="Conversion base">
              {(['decimal', 'binary'] as const).map(m => (
                <button key={m} type="button" id={`mode-${m}`} onClick={() => handleModeChange(m)} aria-pressed={mode === m}
                  className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition ${mode === m ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}>
                  {m === 'decimal' ? '× 1,000 (SI / Decimal)' : '× 1,024 (Binary / IEC)'}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-600">{getFormulaExplanation(mode)}</p>
          </div>

          {/* Input row */}
          <div className="mb-6 flex gap-3">
            <div className="flex-1">
              <label htmlFor="storage-value" className="mb-1.5 block text-sm font-medium text-gray-300">Value</label>
              <input
                id="storage-value"
                type="number"
                value={value}
                onChange={e => setValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleConvert()}
                placeholder="e.g. 1.5"
                min="0"
                step="any"
                aria-describedby={error ? 'storage-error' : undefined}
                aria-invalid={!!error}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-600 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 aria-[invalid=true]:border-red-500"
              />
            </div>
            <div className="w-44">
              <label htmlFor="unit-select" className="mb-1.5 block text-sm font-medium text-gray-300">Unit</label>
              <select
                id="unit-select"
                value={fromUnit}
                onChange={e => setFromUnit(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#0a1628] px-3 py-3 text-white transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              >
                {STORAGE_UNITS.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.label} ({mode === 'binary' ? u.labelBinary : u.labelDecimal})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <p id="storage-error" role="alert" className="mb-4 text-sm text-red-400">{error}</p>
          )}

          <button
            id="convert-storage-btn"
            type="button"
            onClick={handleConvert}
            disabled={!value}
            className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 active:scale-[0.99]"
          >
            Convert
          </button>

          {/* Results table */}
          {results && (
            <div className="mt-6 overflow-hidden rounded-xl border border-white/10" role="region" aria-label="Conversion results" aria-live="polite">
              <table className="w-full">
                <caption className="sr-only">Storage unit conversion results</caption>
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-gray-400">Unit</th>
                    <th scope="col" className="px-4 py-3 text-right text-xs font-medium uppercase tracking-widest text-gray-400">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map(r => {
                    const isSource = r.unitId === fromUnit
                    return (
                      <tr key={r.unitId} className={`border-b border-white/5 last:border-0 ${isSource ? 'bg-blue-900/20' : ''}`}>
                        <td className={`px-4 py-3 text-sm ${isSource ? 'font-semibold text-blue-300' : 'text-gray-300'}`}>
                          {r.label} {isSource && <span className="ml-1 text-xs text-blue-500/60">(input)</span>}
                        </td>
                        <td className={`px-4 py-3 text-right font-mono text-sm tabular-nums ${isSource ? 'font-semibold text-blue-300' : 'text-gray-300'}`}>
                          {r.value}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick reference */}
        <section aria-labelledby="ref-heading" className="mt-12">
          <h2 id="ref-heading" className="mb-6 text-xl font-bold text-white">Quick Reference</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <h3 className="mb-3 font-semibold text-blue-300">Decimal (SI)</h3>
              <ul className="space-y-1 text-sm text-gray-400 font-mono">
                <li>1 KB = 1,000 B</li>
                <li>1 MB = 1,000 KB = 10⁶ B</li>
                <li>1 GB = 1,000 MB = 10⁹ B</li>
                <li>1 TB = 1,000 GB = 10¹² B</li>
                <li>1 PB = 1,000 TB = 10¹⁵ B</li>
              </ul>
              <p className="mt-3 text-xs text-gray-600">Used by: hard drives, SSDs, network speeds</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <h3 className="mb-3 font-semibold text-indigo-300">Binary (IEC)</h3>
              <ul className="space-y-1 text-sm text-gray-400 font-mono">
                <li>1 KiB = 1,024 B</li>
                <li>1 MiB = 1,024 KiB = 2²⁰ B</li>
                <li>1 GiB = 1,024 MiB = 2³⁰ B</li>
                <li>1 TiB = 1,024 GiB = 2⁴⁰ B</li>
                <li>1 PiB = 1,024 TiB = 2⁵⁰ B</li>
              </ul>
              <p className="mt-3 text-xs text-gray-600">Used by: RAM, OS file sizes, memory addresses</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-heading" className="mt-12 border-t border-white/5 pt-12">
          <h2 id="faq-heading" className="mb-8 text-2xl font-bold">Why are 1 GB and 1 GiB different?</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { q: 'Why do my storage devices show less space than advertised?', a: "Hard drives are marketed using SI (decimal) GB where 1 GB = 10⁹ bytes. Your OS measures in binary GiB where 1 GiB = 2³⁰ bytes ≈ 1.07 billion bytes. A 1 TB hard drive shows as ~931 GiB in Windows/macOS because the same bytes are measured differently — no storage is 'missing'." },
              { q: 'When should I use binary vs decimal?', a: 'Use decimal (GB/MB) when comparing storage device specs, file download sizes, or network transfer rates. Use binary (GiB/MiB) when looking at RAM, programming, or OS-reported file sizes. The IEC introduced KiB/MiB/GiB notation in 1998 to eliminate this ambiguity.' },
              { q: 'What about bits vs bytes?', a: '1 byte = 8 bits. Network speeds are usually advertised in bits (Mbps/Gbps), while storage sizes are in bytes (MB/GB). A 100 Mbps connection transfers 100 million bits — or 12.5 million bytes — per second.' },
              { q: 'Is my data stored or tracked?', a: 'No. All conversions happen in your browser using simple arithmetic. No data is sent to any server.' },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                <h3 className="mb-2 font-semibold text-blue-300">{q}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-16 border-t border-white/5 py-8 text-center text-xs text-gray-600">
        <p>
          © {new Date().getFullYear()} LocalGali Tools &nbsp;·&nbsp; Free, private, client-side only &nbsp;·&nbsp;{' '}
          <a href="https://localgali.in/privacy" className="underline decoration-dotted hover:text-gray-400">Privacy Policy</a>
        </p>
      </footer>

      <CookieConsent />
      <DonationButton accentClass="bg-blue-700 hover:bg-blue-600" />
    </div>
  )
}

export default App
