/**
 * Password generation utilities
 *
 * SECURITY CRITICAL — read before modifying:
 *
 * 1. ALL randomness comes from crypto.getRandomValues() — NEVER Math.random().
 *    Math.random() is a PRNG, not a CSPRNG. It is predictable and MUST NOT be used
 *    for security-sensitive generation.
 *
 * 2. Generated passwords are never stored, never logged, never sent over the network.
 *    This module has no network calls whatsoever.
 *
 * 3. The entropy calculation is real (bits = log2(charsetSize) × length), not cosmetic.
 *    This gives the user accurate information about actual password strength.
 *
 * 4. Character selection uses rejection sampling to ensure uniform distribution.
 *    Naive modulo (index = random % charsetSize) introduces modulo bias when charsetSize
 *    doesn't evenly divide 256. We reject samples above the largest multiple of charsetSize
 *    that fits in a byte, and re-sample. This gives a statistically uniform distribution.
 */

export interface PasswordOptions {
  length: number
  includeUppercase: boolean
  includeLowercase: boolean
  includeNumbers: boolean
  includeSymbols: boolean
  excludeAmbiguous: boolean
}

// Character sets — ambiguous chars excluded when the option is on.
// Rationale for 'ambiguous': l, 1, I (look the same in many fonts),
// O, 0 (easily confused), and o (ambiguous in some fonts).
const CHARS_UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const CHARS_UPPERCASE_NO_AMBIGUOUS = 'ABCDEFGHJKMNPQRSTUVWXYZ' // removed I, O
const CHARS_LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const CHARS_LOWERCASE_NO_AMBIGUOUS = 'abcdefghjkmnpqrstuvwxyz' // removed i, l, o
const CHARS_NUMBERS = '0123456789'
const CHARS_NUMBERS_NO_AMBIGUOUS = '23456789' // removed 0, 1
const CHARS_SYMBOLS = '!@#$%^&*()-_=+[]{}|;:,.<>?'

export interface PasswordResult {
  password: string
  entropy: number   // bits of entropy
  strengthLabel: 'Very Weak' | 'Weak' | 'Fair' | 'Strong' | 'Very Strong'
  charsetSize: number
}

/**
 * Build the character set from the given options.
 * Returns null if no character class is selected (can't generate a password).
 */
export function buildCharset(options: PasswordOptions): string | null {
  const parts: string[] = []

  if (options.includeUppercase) {
    parts.push(options.excludeAmbiguous ? CHARS_UPPERCASE_NO_AMBIGUOUS : CHARS_UPPERCASE)
  }
  if (options.includeLowercase) {
    parts.push(options.excludeAmbiguous ? CHARS_LOWERCASE_NO_AMBIGUOUS : CHARS_LOWERCASE)
  }
  if (options.includeNumbers) {
    parts.push(options.excludeAmbiguous ? CHARS_NUMBERS_NO_AMBIGUOUS : CHARS_NUMBERS)
  }
  if (options.includeSymbols) {
    parts.push(CHARS_SYMBOLS)
  }

  const charset = parts.join('')
  return charset.length > 0 ? charset : null
}

/**
 * Calculate the entropy of a password in bits.
 * entropy = log2(charsetSize) × length
 *
 * This is the theoretical maximum entropy assuming uniform random sampling,
 * which is what crypto.getRandomValues() provides when used with rejection sampling.
 */
export function calculateEntropy(charsetSize: number, length: number): number {
  if (charsetSize <= 0 || length <= 0) return 0
  return Math.log2(charsetSize) * length
}

/**
 * Map entropy bits to a human-readable strength label.
 * These thresholds are based on common security recommendations:
 * - < 28 bits: trivially brute-forceable
 * - 28-35 bits: weak but takes some effort
 * - 36-59 bits: reasonable for low-value accounts
 * - 60-127 bits: strong
 * - ≥ 128 bits: very strong (brute force infeasible with current hardware)
 */
export function entropyToStrength(
  entropy: number
): PasswordResult['strengthLabel'] {
  if (entropy < 28) return 'Very Weak'
  if (entropy < 36) return 'Weak'
  if (entropy < 60) return 'Fair'
  if (entropy < 128) return 'Strong'
  return 'Very Strong'
}

/**
 * Generate a cryptographically secure random password.
 *
 * Algorithm: rejection sampling (Fisher-Yates variant over crypto random bytes).
 *   - We request a batch of random bytes from crypto.getRandomValues().
 *   - For each byte, if the value is within the largest multiple of charsetSize
 *     that fits in 256 (i.e., < floor(256/charsetSize) × charsetSize), we use it.
 *   - Otherwise, we discard it and move to the next byte.
 *   - If we run out of the batch, we fetch another batch.
 *
 * This avoids modulo bias: a naïve `randomByte % charsetSize` gives chars at
 * the start of the charset a slightly higher probability when 256 % charsetSize ≠ 0.
 */
export function generatePassword(options: PasswordOptions): PasswordResult | null {
  const charset = buildCharset(options)
  if (!charset) return null

  const { length } = options
  if (length < 1 || length > 512) return null // Sanity bound

  const charsetSize = charset.length
  // Largest multiple of charsetSize ≤ 256 — used for rejection sampling
  const maxUsable = Math.floor(256 / charsetSize) * charsetSize

  const password: string[] = []

  // Fetch bytes in batches of 256 to minimise crypto.getRandomValues calls
  const BATCH_SIZE = 256
  let buffer = new Uint8Array(BATCH_SIZE)
  let bufferIndex = 0
  let samplesUsed = 0

  // Refill the buffer with fresh random bytes
  function refillBuffer() {
    crypto.getRandomValues(buffer)
    bufferIndex = 0
  }

  refillBuffer()

  while (password.length < length) {
    if (bufferIndex >= BATCH_SIZE) {
      refillBuffer()
    }

    const byte = buffer[bufferIndex++]
    samplesUsed++

    // Reject samples that would introduce bias
    if (byte >= maxUsable) continue

    password.push(charset[byte % charsetSize])
  }

  // Clear the buffer after use (belt-and-suspenders — browser GC will clear eventually,
  // but explicit zeroing reduces the window of exposure in memory)
  buffer.fill(0)

  const entropy = calculateEntropy(charsetSize, length)

  return {
    password: password.join(''),
    entropy: Math.round(entropy * 10) / 10,
    strengthLabel: entropyToStrength(entropy),
    charsetSize,
  }
}

/**
 * Map strength label to colour classes for the UI indicator.
 */
export function strengthColour(label: PasswordResult['strengthLabel']): {
  bar: string
  text: string
  percent: number
} {
  const map: Record<PasswordResult['strengthLabel'], { bar: string; text: string; percent: number }> = {
    'Very Weak':   { bar: 'bg-red-600',     text: 'text-red-400',    percent: 10 },
    'Weak':        { bar: 'bg-orange-500',  text: 'text-orange-400', percent: 30 },
    'Fair':        { bar: 'bg-yellow-500',  text: 'text-yellow-400', percent: 55 },
    'Strong':      { bar: 'bg-green-500',   text: 'text-green-400',  percent: 80 },
    'Very Strong': { bar: 'bg-emerald-400', text: 'text-emerald-300',percent: 100 },
  }
  return map[label]
}
