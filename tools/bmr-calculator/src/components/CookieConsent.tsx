/**
 * Cookie Consent Banner — GDPR-compliant implementation
 *
 * Design decisions:
 * - Uses localStorage (not cookies) to store consent choice — ironic but acceptable
 *   because we're using it only to remember the user's OWN consent preference,
 *   not to track them. This is standard practice per WP29/EDPB guidance.
 * - Blocks no non-essential scripts by default (these tools use no ads/tracking cookies).
 *   If analytics is added, the analytics script must check window.__analyticsConsented
 *   before initialising.
 * - Provides Accept / Reject / Learn More — not just a cosmetic dismiss.
 *
 * Palette: inherits each tool's CSS custom properties (--accent-*) for visual consistency.
 */

import { useEffect, useState } from 'react'

const CONSENT_KEY = 'cookie_consent_v1'

type ConsentState = 'accepted' | 'rejected' | null

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as ConsentState | null
    if (stored === 'accepted' || stored === 'rejected') {
      setConsent(stored)
      // Inform analytics layer of existing consent
      window.__analyticsConsented = stored === 'accepted'
    } else {
      // No prior choice — show banner after short delay for UX
      const t = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(t)
    }
  }, [])

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    window.__analyticsConsented = true
    setConsent('accepted')
    setVisible(false)
  }

  function handleReject() {
    localStorage.setItem(CONSENT_KEY, 'rejected')
    window.__analyticsConsented = false
    setConsent('rejected')
    setVisible(false)
  }

  // Consent already given — nothing to render
  if (consent !== null || !visible) return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      aria-describedby="cookie-desc"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-gray-900/95 p-5 shadow-2xl backdrop-blur-sm sm:flex sm:items-center sm:gap-6">
        <p id="cookie-desc" className="mb-4 text-sm leading-relaxed text-gray-300 sm:mb-0 sm:flex-1">
          We use cookies only to remember your consent preference. No advertising or tracking
          cookies are used on this tool.{' '}
          <a
            href="https://localgali.in/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-dotted hover:text-white"
          >
            Privacy policy
          </a>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            id="cookie-reject-btn"
            onClick={handleReject}
            className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-gray-300 transition hover:border-white/40 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Reject
          </button>
          <button
            id="cookie-accept-btn"
            onClick={handleAccept}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}

// Augment window type for the consent flag
declare global {
  interface Window {
    __analyticsConsented?: boolean
  }
}
