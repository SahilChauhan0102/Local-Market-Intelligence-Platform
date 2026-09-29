/**
 * World Time Comparison — main application component
 *
 * Palette rationale: Deep purple (#7c3aed) + violet accents on near-black (#08040f).
 * Association: cosmos, time, global connectedness — evokes the passage of time across time zones.
 * Distinctly different from all other tools in this suite.
 *
 * setInterval for live clock — properly cleaned up on unmount to prevent memory leaks.
 * DST handled by Intl.DateTimeFormat, not hand-rolled offset math.
 */

import { useState, useEffect, useRef } from 'react'
import {
  formatInTimezone,
  DEFAULT_TIMEZONES,
  ALL_TIMEZONES,
  type FormattedTime,
} from './utils/worldtime'
import { CookieConsent } from './components/CookieConsent'
import { DonationButton } from './components/DonationButton'
import './index.css'

type DisplayMode = 'live' | 'custom'

function App() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(DEFAULT_TIMEZONES.map(t => t.id))
  )
  const [times, setTimes] = useState<FormattedTime[]>([])
  const [displayMode, setDisplayMode] = useState<DisplayMode>('live')
  const [customDatetime, setCustomDatetime] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const selectedTimezones = ALL_TIMEZONES.filter(t => selectedIds.has(t.id))

  function computeTimes(date: Date) {
    setTimes(selectedTimezones.map(tz => formatInTimezone(date, tz)))
  }

  // Live clock — updates every second
  useEffect(() => {
    if (displayMode !== 'live') return

    function tick() {
      computeTimes(new Date())
    }

    tick() // Immediate first tick
    intervalRef.current = setInterval(tick, 1000)

    // Cleanup on unmount or when mode/selection changes — prevents memory leaks
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayMode, selectedIds])

  // Custom datetime mode
  useEffect(() => {
    if (displayMode !== 'custom' || !customDatetime) return
    const date = new Date(customDatetime)
    if (!isNaN(date.getTime())) {
      computeTimes(date)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayMode, customDatetime, selectedIds])

  function toggleTimezone(id: string) {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        if (next.size <= 1) return prev // Always keep at least 1
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const filteredTimezones = ALL_TIMEZONES.filter(t =>
    t.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.country.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#08040f] font-sans text-white selection:bg-purple-700/30">
      <header className="border-b border-purple-900/40 bg-[#0e0818]/80 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-800/30 ring-1 ring-purple-700/40">
              <span className="text-lg leading-none" aria-hidden="true">🌍</span>
            </div>
            <div>
              <span className="text-sm font-semibold tracking-wide text-purple-400">LocalGali Tools</span>
              <p className="text-xs text-gray-600">worldtime.localgali.in</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12" id="main-content">
        <section className="mb-10 text-center" aria-labelledby="page-title">
          <h1 id="page-title" className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            World Time Comparison
          </h1>
          <p className="mx-auto max-w-xl text-base text-gray-400 sm:text-lg">
            Compare current times across multiple cities simultaneously. DST-correct, updates live.
            Perfect for scheduling across Delhi, Dubai, London, and beyond.
          </p>
        </section>

        {/* Mode toggle */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex rounded-xl border border-white/10 p-1" role="group" aria-label="Time mode">
            {(['live', 'custom'] as const).map(m => (
              <button key={m} type="button" id={`mode-${m}`} onClick={() => setDisplayMode(m)} aria-pressed={displayMode === m}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${displayMode === m ? 'bg-purple-700 text-white shadow' : 'text-gray-400 hover:text-white'}`}>
                {m === 'live' ? '🔴 Live' : '📅 Custom date/time'}
              </button>
            ))}
          </div>
          {displayMode === 'custom' && (
            <div className="flex-1">
              <label htmlFor="custom-datetime" className="sr-only">Custom date and time</label>
              <input
                id="custom-datetime"
                type="datetime-local"
                value={customDatetime}
                onChange={e => setCustomDatetime(e.target.value)}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
              />
            </div>
          )}
        </div>

        {/* Time cards grid */}
        {times.length > 0 && (
          <section aria-labelledby="times-heading" aria-live={displayMode === 'live' ? 'off' : 'polite'}>
            <h2 id="times-heading" className="sr-only">Current times by city</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {times.map(t => (
                <div
                  key={t.timezone.id}
                  className={`relative overflow-hidden rounded-2xl border p-5 transition ${
                    t.isDaytime
                      ? 'border-purple-800/40 bg-gradient-to-br from-purple-950/60 to-indigo-950/40'
                      : 'border-slate-800/40 bg-gradient-to-br from-slate-950/60 to-gray-950/40'
                  }`}
                >
                  {/* Day/night indicator */}
                  <span className="absolute right-4 top-4 text-xl" aria-hidden="true">
                    {t.isDaytime ? '☀️' : '🌙'}
                  </span>

                  {/* City info */}
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-xl" aria-hidden="true">{t.timezone.emoji}</span>
                    <div>
                      <p className="font-semibold text-white">{t.timezone.city}</p>
                      <p className="text-xs text-gray-500">{t.timezone.country}</p>
                    </div>
                  </div>

                  {/* Time */}
                  <p className="mb-1 font-mono text-3xl font-bold tabular-nums text-purple-200">
                    {t.time}
                  </p>
                  <p className="text-sm text-gray-400">{t.date}</p>

                  {/* Timezone info */}
                  <div className="mt-3 flex items-center gap-3 text-xs text-gray-600">
                    <span className="rounded bg-white/5 px-1.5 py-0.5 font-mono">{t.timezone_abbr}</span>
                    <span>UTC {t.utcOffset}</span>
                  </div>

                  {/* Remove button */}
                  {selectedIds.size > 1 && (
                    <button
                      type="button"
                      onClick={() => toggleTimezone(t.timezone.id)}
                      aria-label={`Remove ${t.timezone.city}`}
                      className="absolute bottom-3 right-3 rounded-lg border border-white/10 px-2 py-1 text-xs text-gray-600 transition hover:border-red-700/40 hover:text-red-400"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Add city */}
        <section aria-labelledby="add-city-heading" className="mt-8">
          <h2 id="add-city-heading" className="mb-3 text-sm font-medium uppercase tracking-widest text-gray-500">
            Add a city
          </h2>
          <div className="mb-3">
            <label htmlFor="city-search" className="sr-only">Search for a city</label>
            <input
              id="city-search"
              type="search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by city or country..."
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-600 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {filteredTimezones.map(tz => {
              const isSelected = selectedIds.has(tz.id)
              return (
                <button
                  key={tz.id}
                  type="button"
                  id={`city-btn-${tz.id}`}
                  onClick={() => toggleTimezone(tz.id)}
                  aria-pressed={isSelected}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition ${
                    isSelected
                      ? 'border-purple-700/60 bg-purple-900/20 text-purple-300'
                      : 'border-white/5 bg-white/[0.02] text-gray-400 hover:border-white/10 hover:text-white'
                  }`}
                >
                  <span aria-hidden="true">{tz.emoji}</span>
                  <span className="truncate">{tz.city}</span>
                </button>
              )
            })}
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-heading" className="mt-16 border-t border-white/5 pt-12">
          <h2 id="faq-heading" className="mb-8 text-2xl font-bold">About world time comparison</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { q: 'How does DST work?', a: "Daylight Saving Time shifts clocks forward (usually 1 hour) in spring and back in autumn in many countries. India (IST), UAE, Singapore, and China don't observe DST. We use your browser's Intl API with IANA timezone data, which knows all DST rules — including historical rule changes." },
              { q: 'What is the IANA timezone database?', a: "The Internet Assigned Numbers Authority (IANA) maintains the tz database — a standardised list of all world timezones with their historical and current UTC offsets and DST rules. Examples: 'Asia/Kolkata', 'America/New_York'. This is the gold standard for timezone handling." },
              { q: 'What does UTC offset mean?', a: "UTC (Coordinated Universal Time) is the world's primary time standard. UTC offsets like +05:30 (IST) or -05:00 (EST) show how many hours ahead/behind UTC a timezone is. Unlike GMT, UTC doesn't change with seasons — it's the fixed reference point." },
              { q: 'Is my data stored?', a: 'No. All time calculations happen entirely in your browser. No timezone selections, search queries, or usage data is sent to any server.' },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                <h3 className="mb-2 font-semibold text-purple-300">{q}</h3>
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
      <DonationButton accentClass="bg-purple-800 hover:bg-purple-700" />
    </div>
  )
}

export default App
