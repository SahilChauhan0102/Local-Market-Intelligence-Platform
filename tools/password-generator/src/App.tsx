/**
 * Password Generator — main application component
 *
 * Palette rationale: Dark slate (#0d1117) + terminal green (#22c55e) accents.
 * Association: security, hacking, terminal — the archetypal aesthetic for a security tool.
 * Intentionally monochromatic with green highlights — conveys seriousness without alarm.
 *
 * SECURITY NOTE: This component:
 * - Makes ZERO network requests
 * - Sends NO analytics events containing any password content
 * - Uses ONLY crypto.getRandomValues() via the utility layer
 * - Has no <form> that could trigger browser autofill/save of passwords
 */

import { useState, useCallback } from 'react'
import {
  generatePassword,
  strengthColour,
  type PasswordOptions,
  type PasswordResult,
} from './utils/password'
import { CookieConsent } from './components/CookieConsent'
import { DonationButton } from './components/DonationButton'
import './index.css'

const DEFAULT_OPTIONS: PasswordOptions = {
  length: 16,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: false,
  excludeAmbiguous: false,
}

function App() {
  const [options, setOptions] = useState<PasswordOptions>(DEFAULT_OPTIONS)
  const [result, setResult] = useState<PasswordResult | null>(null)
  const [copied, setCopied] = useState(false)
  const [noCharsError, setNoCharsError] = useState(false)

  const generate = useCallback(() => {
    const generated = generatePassword(options)
    if (!generated) {
      setNoCharsError(true)
      setResult(null)
      return
    }
    setNoCharsError(false)
    setResult(generated)
    setCopied(false)
  }, [options])

  async function handleCopy() {
    if (!result) return
    try {
      await navigator.clipboard.writeText(result.password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard API unavailable (e.g., non-HTTPS dev) — fail gracefully
      // We do NOT fall back to document.execCommand (deprecated, XSS risk)
    }
  }

  function handleOptionChange<K extends keyof PasswordOptions>(key: K, value: PasswordOptions[K]) {
    setOptions(prev => ({ ...prev, [key]: value }))
    // Auto-regenerate when options change if a password already exists
    if (result) {
      const newOpts = { ...options, [key]: value }
      const generated = generatePassword(newOpts)
      if (generated) {
        setNoCharsError(false)
        setResult(generated)
        setCopied(false)
      } else {
        setNoCharsError(true)
        setResult(null)
      }
    }
  }

  const strength = result ? strengthColour(result.strengthLabel) : null

  return (
    <div className="min-h-screen bg-[#0d1117] font-mono text-white selection:bg-green-800/40">
      <header className="border-b border-green-900/30 bg-[#0d1117]/90 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-900/30 ring-1 ring-green-700/40">
              <span className="text-lg leading-none" aria-hidden="true">🔐</span>
            </div>
            <div>
              <span className="text-sm font-semibold tracking-wide text-green-400">LocalGali Tools</span>
              <p className="text-xs text-gray-600">password.localgali.in</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12" id="main-content">
        <section className="mb-10 text-center" aria-labelledby="page-title">
          <h1 id="page-title" className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-green-400">$</span> Password Generator
          </h1>
          <p className="mx-auto max-w-xl text-base text-gray-500 sm:text-lg">
            Generate cryptographically secure passwords using your browser's built-in
            <code className="mx-1 rounded bg-white/5 px-1.5 py-0.5 text-green-400">crypto.getRandomValues()</code>.
            Nothing leaves your browser.
          </p>
        </section>

        {/* Main tool card */}
        <div className="rounded-2xl border border-green-900/30 bg-[#161b22] p-6 shadow-2xl">
          {/* Password output */}
          <div className="mb-6">
            <label htmlFor="password-output" className="mb-2 block text-xs font-medium uppercase tracking-widest text-gray-500">
              Generated Password
            </label>
            {/* Not using <input type="password"> — we want the password visible and no browser autosave */}
            <div
              id="password-output"
              role="textbox"
              aria-readonly="true"
              aria-label="Generated password"
              aria-live="polite"
              className="min-h-[56px] rounded-xl border border-white/10 bg-black/40 px-4 py-4 font-mono text-lg tracking-wider text-green-300 break-all"
            >
              {result ? result.password : <span className="text-gray-700 text-sm font-sans">Click &quot;Generate&quot; to create a password</span>}
            </div>

            {/* Strength indicator */}
            {result && strength && (
              <div className="mt-3">
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-gray-500">Strength</span>
                  <span className={`font-semibold ${strength.text}`}>{result.strengthLabel}</span>
                  <span className="text-gray-600">{result.entropy} bits entropy</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/5" role="progressbar" aria-valuenow={strength.percent} aria-valuemin={0} aria-valuemax={100} aria-label={`Password strength: ${result.strengthLabel}`}>
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${strength.bar}`}
                    style={{ width: `${strength.percent}%` }}
                  />
                </div>
              </div>
            )}

            {/* Copy button */}
            <div className="mt-3 flex gap-3">
              <button
                id="generate-password-btn"
                type="button"
                onClick={generate}
                className="flex-1 rounded-xl bg-green-700 py-3 font-semibold text-white transition hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 active:scale-[0.98]"
              >
                {result ? '↻ Regenerate' : '⚡ Generate'}
              </button>
              {result && (
                <button
                  id="copy-password-btn"
                  type="button"
                  onClick={handleCopy}
                  aria-live="polite"
                  className={`rounded-xl border px-5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 ${
                    copied
                      ? 'border-green-600 bg-green-900/30 text-green-400'
                      : 'border-white/10 text-gray-300 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {copied ? '✓ Copied!' : 'Copy'}
                </button>
              )}
            </div>

            {noCharsError && (
              <p role="alert" className="mt-2 text-sm text-red-400">
                Select at least one character type to generate a password.
              </p>
            )}
          </div>

          {/* Options */}
          <div className="border-t border-white/5 pt-6">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-gray-500">Options</h2>

            {/* Length slider */}
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="length-slider" className="text-sm font-medium text-gray-300">Length</label>
                <span className="rounded-lg bg-white/5 px-2.5 py-0.5 text-sm font-mono font-semibold text-green-400">
                  {options.length}
                </span>
              </div>
              <input
                id="length-slider"
                type="range"
                min="8"
                max="64"
                step="1"
                value={options.length}
                onChange={e => handleOptionChange('length', parseInt(e.target.value, 10))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-green-500"
                aria-label={`Password length: ${options.length} characters`}
              />
              <div className="mt-1 flex justify-between text-xs text-gray-700">
                <span>8</span>
                <span>64</span>
              </div>
            </div>

            {/* Character type toggles */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { key: 'includeUppercase' as const, label: 'Uppercase', example: 'A–Z' },
                { key: 'includeLowercase' as const, label: 'Lowercase', example: 'a–z' },
                { key: 'includeNumbers'  as const, label: 'Numbers',   example: '0–9' },
                { key: 'includeSymbols'  as const, label: 'Symbols',   example: '!@#$%^&*' },
              ].map(({ key, label, example }) => (
                <label
                  key={key}
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-3.5 transition ${
                    options[key]
                      ? 'border-green-700/60 bg-green-900/20'
                      : 'border-white/5 bg-white/[0.02] hover:border-white/10'
                  }`}
                >
                  <div>
                    <span className="text-sm font-medium text-gray-200">{label}</span>
                    <span className="ml-2 text-xs text-gray-600 font-mono">{example}</span>
                  </div>
                  <input
                    type="checkbox"
                    id={`toggle-${key}`}
                    checked={options[key] as boolean}
                    onChange={e => handleOptionChange(key, e.target.checked)}
                    className="h-4 w-4 rounded accent-green-500"
                    aria-label={`Include ${label}`}
                  />
                </label>
              ))}
            </div>

            {/* Exclude ambiguous */}
            <label className={`mt-3 flex cursor-pointer items-center justify-between rounded-xl border p-3.5 transition ${
              options.excludeAmbiguous ? 'border-green-700/60 bg-green-900/20' : 'border-white/5 bg-white/[0.02] hover:border-white/10'
            }`}>
              <div>
                <span className="text-sm font-medium text-gray-200">Exclude ambiguous characters</span>
                <span className="ml-2 text-xs text-gray-600 font-mono">l, 1, I, O, 0, o</span>
              </div>
              <input
                type="checkbox"
                id="toggle-exclude-ambiguous"
                checked={options.excludeAmbiguous}
                onChange={e => handleOptionChange('excludeAmbiguous', e.target.checked)}
                className="h-4 w-4 rounded accent-green-500"
                aria-label="Exclude ambiguous characters"
              />
            </label>
          </div>
        </div>

        {/* Privacy assurance */}
        <div className="mt-4 rounded-xl border border-green-900/20 bg-green-950/10 px-4 py-3 text-xs leading-relaxed text-green-400/60">
          🔒 All password generation happens entirely in your browser using <code>crypto.getRandomValues()</code>. No passwords are sent to any server, stored in any database, or included in any analytics event.
        </div>

        {/* FAQ */}
        <section aria-labelledby="faq-heading" className="mt-16 border-t border-white/5 pt-12">
          <h2 id="faq-heading" className="mb-8 text-2xl font-bold font-sans">How it works</h2>
          <div className="grid gap-6 sm:grid-cols-2 font-sans">
            {[
              { q: 'Why is this more secure than other generators?', a: 'We use the browser\'s built-in crypto.getRandomValues() — a Cryptographically Secure Pseudo-Random Number Generator (CSPRNG). Math.random(), used by many amateur tools, is predictable and unsafe for passwords.' },
              { q: 'What is password entropy?', a: 'Entropy (in bits) = log₂(charset size) × password length. Higher entropy means more possible combinations, making brute-force attacks harder. 128+ bits is considered very strong against current computing power.' },
              { q: 'Why exclude ambiguous characters?', a: 'Characters like l, 1, I, O, 0 look very similar in many fonts, which causes transcription errors when typing a password manually. Excluding them reduces mistakes without significantly reducing security.' },
              { q: 'Is my password stored anywhere?', a: 'No. The password is generated and displayed entirely in your browser\'s JavaScript runtime. There are no network calls in this tool, and we deliberately exclude any analytics events that might accidentally capture password values.' },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                <h3 className="mb-2 font-semibold text-green-400">{q}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-16 border-t border-white/5 py-8 text-center text-xs text-gray-600 font-sans">
        <p>
          © {new Date().getFullYear()} LocalGali Tools &nbsp;·&nbsp; Free, private, client-side only &nbsp;·&nbsp;{' '}
          <a href="https://localgali.in/privacy" className="underline decoration-dotted hover:text-gray-400">Privacy Policy</a>
        </p>
      </footer>

      <CookieConsent />
      {/* Note: donation button deliberately uses green to match this tool's palette */}
      <DonationButton accentClass="bg-green-800 hover:bg-green-700" />
    </div>
  )
}

export default App
