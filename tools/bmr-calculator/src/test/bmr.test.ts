/**
 * Unit tests for BMR/TDEE calculation utilities
 * Coverage target: 80%+ on src/utils/bmr.ts
 */

import { describe, it, expect } from 'vitest'
import {
  calculateBMR,
  calculateTDEE,
  computeBMRResult,
  validateInputs,
  ftInToCm,
  lbsToKg,
  ACTIVITY_OPTIONS,
} from '../utils/bmr'

// ─── Unit conversions ────────────────────────────────────────────────────────

describe('ftInToCm', () => {
  it('converts 5ft 9in correctly', () => {
    expect(ftInToCm(5, 9)).toBeCloseTo(175.26, 1)
  })
  it('handles 0ft 0in', () => {
    expect(ftInToCm(0, 0)).toBe(0)
  })
})

describe('lbsToKg', () => {
  it('converts 176lbs to ~79.8kg', () => {
    expect(lbsToKg(176)).toBeCloseTo(79.83, 1)
  })
})

// ─── Validation tests ────────────────────────────────────────────────────────

describe('validateInputs', () => {
  it('returns no errors for valid adult inputs', () => {
    const errors = validateInputs({ heightCm: 175, weightKg: 70, age: 30 })
    expect(errors).toHaveLength(0)
  })

  it('flags height > 300cm', () => {
    const errors = validateInputs({ heightCm: 310, weightKg: 70, age: 30 })
    expect(errors.some(e => e.field === 'height')).toBe(true)
  })

  it('flags weight > 500kg', () => {
    const errors = validateInputs({ heightCm: 175, weightKg: 510, age: 30 })
    expect(errors.some(e => e.field === 'weight')).toBe(true)
  })

  it('flags age below minimum (< 15)', () => {
    const errors = validateInputs({ heightCm: 175, weightKg: 50, age: 12 })
    expect(errors.some(e => e.field === 'age')).toBe(true)
  })

  it('flags age above maximum (> 120)', () => {
    const errors = validateInputs({ heightCm: 175, weightKg: 70, age: 125 })
    expect(errors.some(e => e.field === 'age')).toBe(true)
  })

  it('returns multiple errors simultaneously', () => {
    const errors = validateInputs({ heightCm: 0, weightKg: 0, age: 200 })
    expect(errors.length).toBeGreaterThanOrEqual(2)
  })
})

// ─── BMR calculation tests ────────────────────────────────────────────────────

describe('calculateBMR (Mifflin-St Jeor)', () => {
  it('calculates male BMR correctly', () => {
    // 10×80 + 6.25×180 − 5×30 + 5 = 800 + 1125 − 150 + 5 = 1780
    expect(calculateBMR({ weightKg: 80, heightCm: 180, age: 30, sex: 'male' })).toBeCloseTo(1780, 0)
  })

  it('calculates female BMR correctly', () => {
    // 10×60 + 6.25×165 − 5×25 − 161 = 600 + 1031.25 − 125 − 161 = 1345.25
    expect(calculateBMR({ weightKg: 60, heightCm: 165, age: 25, sex: 'female' })).toBeCloseTo(1345, 0)
  })

  it('returns null for zero weight', () => {
    expect(calculateBMR({ weightKg: 0, heightCm: 175, age: 30, sex: 'male' })).toBeNull()
  })

  it('returns null for zero height', () => {
    expect(calculateBMR({ weightKg: 70, heightCm: 0, age: 30, sex: 'male' })).toBeNull()
  })

  it('returns null for zero age', () => {
    expect(calculateBMR({ weightKg: 70, heightCm: 175, age: 0, sex: 'female' })).toBeNull()
  })
})

// ─── TDEE calculation tests ───────────────────────────────────────────────────

describe('calculateTDEE', () => {
  it('applies sedentary multiplier (1.2)', () => {
    expect(calculateTDEE(1780, 'sedentary')).toBeCloseTo(1780 * 1.2, 0)
  })

  it('applies active multiplier (1.725)', () => {
    expect(calculateTDEE(1780, 'active')).toBeCloseTo(1780 * 1.725, 0)
  })

  it('applies very_active multiplier (1.9)', () => {
    expect(calculateTDEE(1780, 'very_active')).toBeCloseTo(1780 * 1.9, 0)
  })

  it('throws for unknown activity level', () => {
    // Cast to bypass TypeScript — testing runtime guard
    expect(() => calculateTDEE(1780, 'unknown' as never)).toThrow()
  })
})

// ─── ACTIVITY_OPTIONS constant tests ─────────────────────────────────────────

describe('ACTIVITY_OPTIONS', () => {
  it('has exactly 5 levels', () => {
    expect(ACTIVITY_OPTIONS).toHaveLength(5)
  })

  it('all multipliers are between 1.0 and 2.5', () => {
    ACTIVITY_OPTIONS.forEach(o => {
      expect(o.multiplier).toBeGreaterThanOrEqual(1.0)
      expect(o.multiplier).toBeLessThanOrEqual(2.5)
    })
  })
})

// ─── Integration: computeBMRResult ───────────────────────────────────────────

describe('computeBMRResult', () => {
  it('returns correct result for a valid male input', () => {
    const result = computeBMRResult({ weightKg: 80, heightCm: 180, age: 30, sex: 'male', activityLevel: 'moderate' })
    expect(result).not.toBeNull()
    expect(result!.bmr).toBe(1780)
    expect(result!.tdee).toBe(Math.round(1780 * 1.55))
    expect(result!.mildDeficit).toBe(result!.tdee - 500)
    expect(result!.mildSurplus).toBe(result!.tdee + 500)
  })

  it('returns null for invalid inputs', () => {
    expect(computeBMRResult({ weightKg: 0, heightCm: 180, age: 30, sex: 'male', activityLevel: 'sedentary' })).toBeNull()
  })
})
