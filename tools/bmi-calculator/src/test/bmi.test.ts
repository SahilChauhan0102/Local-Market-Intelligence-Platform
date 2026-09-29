/**
 * Unit tests for BMI calculation utilities
 *
 * Coverage target: 80%+ on all functions in src/utils/bmi.ts
 * Testing framework: Vitest
 */

import { describe, it, expect } from 'vitest'
import {
  calculateBMI,
  getBMICategory,
  bmiToGaugePercent,
  computeBMIResult,
  ftInToCm,
  lbsToKg,
  cmToFtIn,
  kgToLbs,
  validateInputs,
} from '../utils/bmi'

// ─── Unit conversion tests ───────────────────────────────────────────────────

describe('ftInToCm', () => {
  it('converts 5ft 0in correctly', () => {
    expect(ftInToCm(5, 0)).toBeCloseTo(152.4, 1)
  })

  it('converts 6ft 2in correctly', () => {
    expect(ftInToCm(6, 2)).toBeCloseTo(187.96, 1)
  })

  it('returns 0 for 0ft 0in', () => {
    expect(ftInToCm(0, 0)).toBe(0)
  })
})

describe('lbsToKg', () => {
  it('converts 154lbs to ~70kg', () => {
    expect(lbsToKg(154)).toBeCloseTo(69.85, 1)
  })

  it('converts 0lbs to 0kg', () => {
    expect(lbsToKg(0)).toBe(0)
  })
})

describe('cmToFtIn', () => {
  it('converts 180cm to 5ft 11in', () => {
    const { feet, inches } = cmToFtIn(180)
    expect(feet).toBe(5)
    expect(inches).toBe(11)
  })
})

describe('kgToLbs', () => {
  it('converts 70kg to ~154.3 lbs', () => {
    expect(kgToLbs(70)).toBeCloseTo(154.3, 0)
  })
})

// ─── Core calculation tests ───────────────────────────────────────────────────

describe('calculateBMI', () => {
  it('calculates BMI correctly for 70kg at 175cm', () => {
    // 70 / (1.75)^2 = 70 / 3.0625 ≈ 22.86
    expect(calculateBMI(175, 70)).toBeCloseTo(22.86, 1)
  })

  it('returns null for zero height', () => {
    expect(calculateBMI(0, 70)).toBeNull()
  })

  it('returns null for zero weight', () => {
    expect(calculateBMI(175, 0)).toBeNull()
  })

  it('returns null for negative height', () => {
    expect(calculateBMI(-175, 70)).toBeNull()
  })
})

// ─── Category boundary tests ─────────────────────────────────────────────────

describe('getBMICategory', () => {
  it('classifies < 16 as Severe Thinness', () => {
    expect(getBMICategory(15)).toBe('Severe Thinness')
    expect(getBMICategory(15.9)).toBe('Severe Thinness')
  })

  it('classifies 16–16.9 as Moderate Thinness', () => {
    expect(getBMICategory(16)).toBe('Moderate Thinness')
    expect(getBMICategory(16.9)).toBe('Moderate Thinness')
  })

  it('classifies 17–18.4 as Mild Thinness', () => {
    expect(getBMICategory(17)).toBe('Mild Thinness')
    expect(getBMICategory(18.4)).toBe('Mild Thinness')
  })

  it('classifies 18.5–24.9 as Normal', () => {
    expect(getBMICategory(18.5)).toBe('Normal')
    expect(getBMICategory(24.9)).toBe('Normal')
    expect(getBMICategory(22)).toBe('Normal')
  })

  it('classifies 25–29.9 as Overweight', () => {
    expect(getBMICategory(25)).toBe('Overweight')
    expect(getBMICategory(29.9)).toBe('Overweight')
  })

  it('classifies 30–34.9 as Obese Class I', () => {
    expect(getBMICategory(30)).toBe('Obese Class I')
    expect(getBMICategory(34.9)).toBe('Obese Class I')
  })

  it('classifies 35–39.9 as Obese Class II', () => {
    expect(getBMICategory(35)).toBe('Obese Class II')
    expect(getBMICategory(39.9)).toBe('Obese Class II')
  })

  it('classifies ≥ 40 as Obese Class III', () => {
    expect(getBMICategory(40)).toBe('Obese Class III')
    expect(getBMICategory(60)).toBe('Obese Class III')
  })
})

// ─── Gauge percent tests ─────────────────────────────────────────────────────

describe('bmiToGaugePercent', () => {
  it('returns 0 for BMI at or below minimum (10)', () => {
    expect(bmiToGaugePercent(10)).toBe(0)
    expect(bmiToGaugePercent(5)).toBe(0)
  })

  it('returns 100 for BMI at or above maximum (45)', () => {
    expect(bmiToGaugePercent(45)).toBe(100)
    expect(bmiToGaugePercent(60)).toBe(100)
  })

  it('returns ~37% for BMI 22 (midpoint of Normal range)', () => {
    // (22 - 10) / (45 - 10) * 100 = 12/35 * 100 ≈ 34.3
    expect(bmiToGaugePercent(22)).toBeCloseTo(34.3, 0)
  })
})

// ─── Integration: computeBMIResult ──────────────────────────────────────────

describe('computeBMIResult', () => {
  it('returns a valid result for typical inputs', () => {
    const result = computeBMIResult(175, 70)
    expect(result).not.toBeNull()
    expect(result!.bmi).toBe(22.9) // 70 / 1.75^2 = 22.857 → rounded to 22.9
    expect(result!.category).toBe('Normal')
    expect(result!.gaugePercent).toBeGreaterThan(0)
    expect(result!.gaugePercent).toBeLessThan(100)
  })

  it('returns null for invalid inputs', () => {
    expect(computeBMIResult(0, 70)).toBeNull()
    expect(computeBMIResult(175, 0)).toBeNull()
  })
})

// ─── Validation tests ────────────────────────────────────────────────────────

describe('validateInputs', () => {
  it('returns no errors for valid inputs', () => {
    const errors = validateInputs({ heightCm: 175, weightKg: 70, age: 30 })
    expect(errors).toHaveLength(0)
  })

  it('flags height > 300cm', () => {
    const errors = validateInputs({ heightCm: 301, weightKg: 70 })
    expect(errors.some(e => e.field === 'height')).toBe(true)
  })

  it('flags weight > 500kg', () => {
    const errors = validateInputs({ heightCm: 175, weightKg: 501 })
    expect(errors.some(e => e.field === 'weight')).toBe(true)
  })

  it('flags zero height', () => {
    const errors = validateInputs({ heightCm: 0, weightKg: 70 })
    expect(errors.some(e => e.field === 'height')).toBe(true)
  })

  it('flags negative weight', () => {
    const errors = validateInputs({ heightCm: 175, weightKg: -5 })
    expect(errors.some(e => e.field === 'weight')).toBe(true)
  })

  it('flags age > 120', () => {
    const errors = validateInputs({ heightCm: 175, weightKg: 70, age: 121 })
    expect(errors.some(e => e.field === 'age')).toBe(true)
  })

  it('returns multiple errors simultaneously', () => {
    const errors = validateInputs({ heightCm: 0, weightKg: 600 })
    expect(errors).toHaveLength(2)
  })
})
