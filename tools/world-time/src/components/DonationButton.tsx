/**
 * Donation button — persistent footer element.
 *
 * Uses UPI deep link as chosen by the project owner.
 * UPI ID is read from the VITE_UPI_ID env var — never hardcoded in source.
 *
 * IMPORTANT: To configure, add to your .env.local (NOT committed to git):
 *   VITE_UPI_ID=yourname@upi
 *   VITE_UPI_NAME=Your Name
 *
 * The button is visible but non-intrusive — fixed bottom-right, does not
 * obstruct the main tool content.
 */

const UPI_ID = import.meta.env.VITE_UPI_ID as string | undefined
const UPI_NAME = import.meta.env.VITE_UPI_NAME as string | undefined

interface DonationButtonProps {
  /** Accent colour class for the button — follows per-tool palette */
  accentClass?: string
}

export function DonationButton({ accentClass = 'bg-emerald-600 hover:bg-emerald-500' }: DonationButtonProps) {
  if (!UPI_ID) {
    // In dev, warn so the developer knows to set the env var.
    // In production, silently hide the button rather than showing a broken link.
    if (import.meta.env.DEV) {
      console.warn('[DonationButton] VITE_UPI_ID is not set. Add it to .env.local.')
    }
    return null
  }

  // UPI deep link format: upi://pay?pa=<upi-id>&pn=<name>&cu=INR
  const upiUrl = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(UPI_NAME ?? 'LocalGali')}&cu=INR`

  return (
    <a
      id="donation-upi-btn"
      href={upiUrl}
      aria-label="Support this tool with a UPI donation"
      title="Buy us a chai ☕ — support via UPI"
      className={`fixed bottom-20 right-4 z-40 flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:bottom-6 ${accentClass}`}
    >
      {/* Rupee symbol — unambiguous for Indian audience */}
      <span aria-hidden="true" className="text-base">₹</span>
      <span>Support us</span>
    </a>
  )
}
