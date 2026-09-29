/**
 * Unit tests for password generation utilities
 * Coverage target: 80%+ on src/utils/password.ts
 *
 * SECURITY NOTE: Tests MUST NOT log or store any generated password strings.
 * We test statistical properties and structure, not specific password values.
 */

import { describe, it, expect } from 'vitest'
import {
  buildCharset,
  calculateEntropy,
  entropyToStrength,
  generatePassword,
  strengthColour,
} from '../utils/password'

// ─── buildCharset ────────────────────────────────────────────────────────────

describe('buildCharset', () => {
  const baseOptions = {
    length: 16,
    includeUppercase: false,
    includeLowercase: false,
    includeNumbers: false,
    includeSymbols: false,
    excludeAmbiguous: false,
  }

  it('returns null when no character classes selected', () => {
    expect(buildCharset(baseOptions)).toBeNull()
  })

  it('includes uppercase chars when option is set', () => {
    const charset = buildCharset({ ...baseOptions, includeUppercase: true })!
    expect(charset).toMatch(/[A-Z]/)
  })

  it('includes lowercase chars when option is set', () => {
    const charset = buildCharset({ ...baseOptions, includeLowercase: true })!
    expect(charset).toMatch(/[a-z]/)
  })

  it('includes numbers when option is set', () => {
    const charset = buildCharset({ ...baseOptions, includeNumbers: true })!
    expect(charset).toMatch(/[0-9]/)
  })

  it('excludes ambiguous chars (l, 1, O, 0) when excludeAmbiguous is true', () => {
    const charset = buildCharset({
      ...baseOptions,
      includeLowercase: true,
      includeNumbers: true,
      excludeAmbiguous: true,
    })!
    expect(charset).not.toContain('l')
    expect(charset).not.toContain('1')
    expect(charset).not.toContain('O')
    expect(charset).not.toContain('0')
  })

  it('includes ambiguous chars when excludeAmbiguous is false', () => {
    const charset = buildCharset({
      ...baseOptions,
      includeLowercase: true,
      includeNumbers: true,
      excludeAmbiguous: false,
    })!
    expect(charset).toContain('l')
    expect(charset).toContain('0')
  })

  it('includes symbols when option is set', () => {
    const charset = buildCharset({ ...baseOptions, includeSymbols: true })!
    expect(charset.length).toBeGreaterThan(0)
  })
})

// ─── calculateEntropy ────────────────────────────────────────────────────────

describe('calculateEntropy', () => {
  it('returns 0 for empty charset', () => {
    expect(calculateEntropy(0, 16)).toBe(0)
  })

  it('returns 0 for length 0', () => {
    expect(calculateEntropy(72, 0)).toBe(0)
  })

  it('calculates correctly for charset=72, length=16', () => {
    // log2(72) × 16 ≈ 6.17 × 16 ≈ 98.7 bits
    expect(calculateEntropy(72, 16)).toBeCloseTo(98.7, 0)
  })

  it('calculates correctly for charset=26, length=8 (lowercase only)', () => {
    // log2(26) × 8 ≈ 4.7 × 8 ≈ 37.6 bits
    expect(calculateEntropy(26, 8)).toBeCloseTo(37.6, 0)
  })
})

// ─── entropyToStrength ────────────────────────────────────────────────────────

describe('entropyToStrength', () => {
  it('labels < 28 bits as Very Weak', () => {
    expect(entropyToStrength(20)).toBe('Very Weak')
    expect(entropyToStrength(0)).toBe('Very Weak')
  })

  it('labels 28-35 bits as Weak', () => {
    expect(entropyToStrength(28)).toBe('Weak')
    expect(entropyToStrength(35)).toBe('Weak')
  })

  it('labels 36-59 bits as Fair', () => {
    expect(entropyToStrength(36)).toBe('Fair')
    expect(entropyToStrength(59)).toBe('Fair')
  })

  it('labels 60-127 bits as Strong', () => {
    expect(entropyToStrength(60)).toBe('Strong')
    expect(entropyToStrength(127)).toBe('Strong')
  })

  it('labels ≥ 128 bits as Very Strong', () => {
    expect(entropyToStrength(128)).toBe('Very Strong')
    expect(entropyToStrength(256)).toBe('Very Strong')
  })
})

// ─── generatePassword ────────────────────────────────────────────────────────

describe('generatePassword', () => {
  const validOptions = {
    length: 20,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: false,
    excludeAmbiguous: false,
  }

  it('generates a password of the correct length', () => {
    const result = generatePassword(validOptions)!
    expect(result.password).toHaveLength(20)
  })

  it('returns null when no character class is selected', () => {
    const result = generatePassword({
      ...validOptions,
      includeUppercase: false,
      includeLowercase: false,
      includeNumbers: false,
      includeSymbols: false,
    })
    expect(result).toBeNull()
  })

  it('generates different passwords on successive calls (non-deterministic)', () => {
    const r1 = generatePassword(validOptions)!.password
    const r2 = generatePassword(validOptions)!.password
    // There is a 1-in-charsetSize^length chance of collision — effectively impossible at length 20
    expect(r1).not.toBe(r2)
  })

  it('only uses chars from the selected charset', () => {
    const result = generatePassword({
      ...validOptions,
      includeUppercase: false,
      includeSymbols: false,
    })!
    // Should only contain lowercase and numbers
    expect(result.password).toMatch(/^[a-z0-9]+$/)
  })

  it('returns correct entropy and strength label', () => {
    const result = generatePassword(validOptions)!
    expect(result.entropy).toBeGreaterThan(0)
    expect(['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong']).toContain(result.strengthLabel)
  })

  it('returns null for length > 512 (sanity cap)', () => {
    expect(generatePassword({ ...validOptions, length: 600 })).toBeNull()
  })

  it('returns null for length 0', () => {
    expect(generatePassword({ ...validOptions, length: 0 })).toBeNull()
  })

  it('respects excludeAmbiguous — no ambiguous chars in output', () => {
    // Run 20 times to get statistical confidence
    const ambiguous = new Set(['l', '1', 'I', 'O', '0', 'o'])
    for (let i = 0; i < 20; i++) {
      const result = generatePassword({
        length: 64,
        includeUppercase: true,
        includeLowercase: true,
        includeNumbers: true,
        includeSymbols: false,
        excludeAmbiguous: true,
      })!
      for (const char of result.password) {
        expect(ambiguous.has(char)).toBe(false)
      }
    }
  })
})

// ─── strengthColour ──────────────────────────────────────────────────────────

describe('strengthColour', () => {
  it('returns an object with bar, text, and percent for each strength level', () => {
    const levels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'] as const
    levels.forEach(level => {
      const colour = strengthColour(level)
      expect(colour.bar).toBeTruthy()
      expect(colour.text).toBeTruthy()
      expect(colour.percent).toBeGreaterThan(0)
    })
  })

  it('Very Weak has lowest percent, Very Strong has 100', () => {
    expect(strengthColour('Very Weak').percent).toBeLessThan(strengthColour('Strong').percent)
    expect(strengthColour('Very Strong').percent).toBe(100)
  })
})
