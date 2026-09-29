/**
 * Unit tests for storage conversion utilities
 * Coverage target: 80%+ on src/utils/storage.ts
 */

import { describe, it, expect } from 'vitest'
import {
  convertStorageUnit,
  formatStorageValue,
  getFormulaExplanation,
  STORAGE_UNITS,
} from '../utils/storage'

// ─── STORAGE_UNITS sanity ────────────────────────────────────────────────────

describe('STORAGE_UNITS', () => {
  it('has 7 units', () => {
    expect(STORAGE_UNITS).toHaveLength(7)
  })

  it('bit has factor 1 in both modes', () => {
    const bit = STORAGE_UNITS.find(u => u.id === 'bit')!
    expect(bit.binaryFactor).toBe(1n)
    expect(bit.decimalFactor).toBe(1n)
  })

  it('byte has factor 8 in both modes', () => {
    const byte = STORAGE_UNITS.find(u => u.id === 'byte')!
    expect(byte.binaryFactor).toBe(8n)
    expect(byte.decimalFactor).toBe(8n)
  })
})

// ─── convertStorageUnit ──────────────────────────────────────────────────────

describe('convertStorageUnit — decimal mode', () => {
  it('1 GB (decimal) = 1,000 MB', () => {
    const results = convertStorageUnit(1, 'gigabyte', 'decimal')!
    const mb = results.find(r => r.unitId === 'megabyte')!
    expect(mb.numericValue).toBeCloseTo(1000, 0)
  })

  it('1 KB (decimal) = 8,000 bits', () => {
    const results = convertStorageUnit(1, 'kilobyte', 'decimal')!
    const bits = results.find(r => r.unitId === 'bit')!
    expect(bits.numericValue).toBeCloseTo(8000, 0)
  })

  it('1 TB (decimal) = 1,000 GB', () => {
    const results = convertStorageUnit(1, 'terabyte', 'decimal')!
    const gb = results.find(r => r.unitId === 'gigabyte')!
    expect(gb.numericValue).toBeCloseTo(1000, 0)
  })
})

describe('convertStorageUnit — binary mode', () => {
  it('1 GiB (binary) = 1,024 MiB', () => {
    const results = convertStorageUnit(1, 'gigabyte', 'binary')!
    const mb = results.find(r => r.unitId === 'megabyte')!
    expect(mb.numericValue).toBeCloseTo(1024, 0)
  })

  it('1 KiB (binary) = 8,192 bits', () => {
    const results = convertStorageUnit(1, 'kilobyte', 'binary')!
    const bits = results.find(r => r.unitId === 'bit')!
    expect(bits.numericValue).toBeCloseTo(8192, 0)
  })
})

describe('convertStorageUnit — edge cases', () => {
  it('returns null for negative value', () => {
    expect(convertStorageUnit(-1, 'gigabyte', 'decimal')).toBeNull()
  })

  it('returns null for NaN', () => {
    expect(convertStorageUnit(NaN, 'gigabyte', 'decimal')).toBeNull()
  })

  it('returns null for unknown unit', () => {
    expect(convertStorageUnit(1, 'zettabyte', 'decimal')).toBeNull()
  })

  it('returns null for value exceeding sanity cap', () => {
    expect(convertStorageUnit(2e15, 'petabyte', 'decimal')).toBeNull()
  })

  it('handles 0 value', () => {
    const results = convertStorageUnit(0, 'gigabyte', 'decimal')!
    expect(results).not.toBeNull()
    results.forEach(r => expect(r.numericValue).toBe(0))
  })
})

// ─── formatStorageValue ──────────────────────────────────────────────────────

describe('formatStorageValue', () => {
  it('returns "0" for 0', () => {
    expect(formatStorageValue(0)).toBe('0')
  })

  it('formats integer correctly', () => {
    expect(formatStorageValue(1000)).toBe('1000')
  })

  it('formats very small value in scientific notation', () => {
    const result = formatStorageValue(0.0000001)
    expect(result).toContain('e')
  })

  it('formats fractional value with precision', () => {
    const result = formatStorageValue(1.5)
    expect(parseFloat(result)).toBeCloseTo(1.5, 1)
  })
})

// ─── getFormulaExplanation ────────────────────────────────────────────────────

describe('getFormulaExplanation', () => {
  it('mentions 1024 for binary mode', () => {
    expect(getFormulaExplanation('binary')).toContain('1,024')
  })

  it('mentions 1000 for decimal mode', () => {
    expect(getFormulaExplanation('decimal')).toContain('1,000')
  })
})
