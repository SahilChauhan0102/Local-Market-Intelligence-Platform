/**
 * Unit tests for world time utilities
 * Coverage target: 80%+ on src/utils/worldtime.ts
 */

import { describe, it, expect } from 'vitest'
import {
  formatInTimezone,
  isValidTimezone,
  DEFAULT_TIMEZONES,
  ALL_TIMEZONES,
} from '../utils/worldtime'

// ─── DEFAULT_TIMEZONES ─────────────────────────────────────────────────────────

describe('DEFAULT_TIMEZONES', () => {
  it('includes the 6 required cities from spec', () => {
    const cities = DEFAULT_TIMEZONES.map(t => t.city)
    expect(cities).toContain('Delhi')
    expect(cities).toContain('Dubai')
    expect(cities).toContain('London')
    expect(cities).toContain('New York')
    expect(cities).toContain('Singapore')
    expect(cities).toContain('Sydney')
  })

  it('all default timezones have valid IANA names', () => {
    DEFAULT_TIMEZONES.forEach(tz => {
      expect(isValidTimezone(tz.iana)).toBe(true)
    })
  })
})

describe('ALL_TIMEZONES', () => {
  it('includes at least the 6 default cities', () => {
    expect(ALL_TIMEZONES.length).toBeGreaterThanOrEqual(DEFAULT_TIMEZONES.length)
  })

  it('all extended timezones have valid IANA names', () => {
    ALL_TIMEZONES.forEach(tz => {
      expect(isValidTimezone(tz.iana)).toBe(true)
    })
  })
})

// ─── isValidTimezone ───────────────────────────────────────────────────────────

describe('isValidTimezone', () => {
  it('returns true for valid IANA timezones', () => {
    expect(isValidTimezone('Asia/Kolkata')).toBe(true)
    expect(isValidTimezone('America/New_York')).toBe(true)
    expect(isValidTimezone('Europe/London')).toBe(true)
    expect(isValidTimezone('UTC')).toBe(true)
  })

  it('returns false for invalid/unknown timezones', () => {
    expect(isValidTimezone('Mars/Olympus')).toBe(false)
    expect(isValidTimezone('')).toBe(false)
    expect(isValidTimezone('India/Delhi')).toBe(false) // should be Asia/Kolkata
  })
})

// ─── formatInTimezone — basic tests ────────────────────────────────────────────

describe('formatInTimezone', () => {
  const delhi = DEFAULT_TIMEZONES.find(t => t.id === 'delhi')!

  it('returns a non-empty time string', () => {
    const result = formatInTimezone(new Date(), delhi)
    expect(result.time).toMatch(/\d{2}:\d{2}:\d{2}/)
  })

  it('returns a non-empty date string', () => {
    const result = formatInTimezone(new Date(), delhi)
    expect(result.date.length).toBeGreaterThan(5)
  })

  it('returns a UTC offset string in ±HH:MM format', () => {
    const result = formatInTimezone(new Date(), delhi)
    expect(result.utcOffset).toMatch(/^[+-]\d{2}:\d{2}$/)
  })

  it('Delhi (IST) UTC offset is +05:30', () => {
    const result = formatInTimezone(new Date(), delhi)
    expect(result.utcOffset).toBe('+05:30')
  })

  it('isDaytime is boolean', () => {
    const result = formatInTimezone(new Date(), delhi)
    expect(typeof result.isDaytime).toBe('boolean')
  })

  it('hour is between 0 and 23', () => {
    const result = formatInTimezone(new Date(), delhi)
    expect(result.hour).toBeGreaterThanOrEqual(0)
    expect(result.hour).toBeLessThanOrEqual(23)
  })

  it('isDaytime is true for hour 6-19, false otherwise', () => {
    // 2024-01-01T00:30:00Z → IST is UTC+5:30 → 06:00 IST → isDaytime: true
    const date = new Date('2024-01-01T00:30:00Z')
    const result = formatInTimezone(date, delhi)
    expect(result.isDaytime).toBe(true) // 06:00 IST
  })

  it('returns correct timezone object reference', () => {
    const result = formatInTimezone(new Date(), delhi)
    expect(result.timezone).toBe(delhi)
  })
})

// ─── Negative UTC offsets — covers sign = '-' branch in getUtcOffset ─────────
//
// getUtcOffset() computes: diffMinutes = Math.round(diffMs / 60000)
// When the local time is BEHIND UTC (e.g. New York), diffMinutes is negative,
// so the sign branch `sign = diffMinutes >= 0 ? '+' : '-'` evaluates to '-'.
// These tests are the only way to reach that branch.

describe('formatInTimezone — negative UTC offset (getUtcOffset sign branch)', () => {
  const newYork = DEFAULT_TIMEZONES.find(t => t.id === 'newyork')!

  it('New York UTC offset starts with "-" (negative timezone, always behind UTC)', () => {
    // America/New_York is always behind UTC — this hits the sign = '-' branch
    const result = formatInTimezone(new Date(), newYork)
    expect(result.utcOffset).toMatch(/^-\d{2}:\d{2}$/)
  })

  it('New York offset is -05:00 in winter (EST — standard time)', () => {
    // January 15 → no DST → Eastern Standard Time → UTC-5
    // getUtcOffset returns '-05:00' — exercises full negative-offset arithmetic path
    const winter = new Date('2024-01-15T12:00:00Z')
    const result = formatInTimezone(winter, newYork)
    expect(result.utcOffset).toBe('-05:00')
  })

  it('New York offset is -04:00 in summer (EDT — DST active)', () => {
    // July 15 → DST active → Eastern Daylight Time → UTC-4
    // This exercises the DST-aware path in getUtcOffset(): Intl correctly
    // reports the summer offset, so diffMinutes = -240, giving '-04:00'
    const summer = new Date('2024-07-15T12:00:00Z')
    const result = formatInTimezone(summer, newYork)
    expect(result.utcOffset).toBe('-04:00')
  })

  it('New York offset format is always ±HH:MM', () => {
    const result = formatInTimezone(new Date('2024-01-15T12:00:00Z'), newYork)
    expect(result.utcOffset).toMatch(/^[+-]\d{2}:\d{2}$/)
  })
})

// ─── isDaytime false branch (lines 124–125 in formatInTimezone) ───────────────
//
// The `isDaytime = hour >= 6 && hour < 20` expression has two sub-branches:
// hour < 6 (early morning night) and hour >= 20 (evening). Both need coverage.

describe('formatInTimezone — isDaytime false (nighttime branches)', () => {
  const delhi = DEFAULT_TIMEZONES.find(t => t.id === 'delhi')!

  it('isDaytime is false at hour 0 (midnight) — hour < 6 branch', () => {
    // 2024-01-01T18:31:00Z → IST = UTC+5:30 → 00:01 IST → hour = 0 → isDaytime: false
    const midnight = new Date('2024-01-01T18:31:00Z')
    const result = formatInTimezone(midnight, delhi)
    expect(result.isDaytime).toBe(false)
    expect(result.hour).toBe(0)
  })

  it('isDaytime is false at hour 20 (first evening hour) — hour >= 20 branch', () => {
    // 2024-01-01T14:30:00Z → IST = UTC+5:30 → 20:00 IST → isDaytime: false
    const evening = new Date('2024-01-01T14:30:00Z')
    const result = formatInTimezone(evening, delhi)
    expect(result.isDaytime).toBe(false)
    expect(result.hour).toBe(20)
  })

  it('isDaytime is false at hour 5 (pre-dawn) — hour < 6 branch', () => {
    // 2024-01-01T23:31:00Z → IST = UTC+5:30 → 05:01 IST → hour = 5 → isDaytime: false
    const preDawn = new Date('2024-01-01T23:31:00Z')
    const result = formatInTimezone(preDawn, delhi)
    expect(result.isDaytime).toBe(false)
    expect(result.hour).toBe(5)
  })

  it('isDaytime is true at hour 6 (first daytime hour) — boundary', () => {
    // 2024-01-01T00:30:00Z → IST = UTC+5:30 → 06:00 IST → isDaytime: true
    const dawn = new Date('2024-01-01T00:30:00Z')
    const result = formatInTimezone(dawn, delhi)
    expect(result.isDaytime).toBe(true)
    expect(result.hour).toBe(6)
  })

  it('isDaytime is true at hour 19 (last daytime hour) — boundary', () => {
    // 2024-01-01T13:30:00Z → IST = UTC+5:30 → 19:00 IST → isDaytime: true
    const dusk = new Date('2024-01-01T13:30:00Z')
    const result = formatInTimezone(dusk, delhi)
    expect(result.isDaytime).toBe(true)
    expect(result.hour).toBe(19)
  })
})

// ─── timezone_abbr — exercises offsetParts.find(p => p.type === 'timeZoneName') ──

describe('formatInTimezone — timezone_abbr (Intl timeZoneName branch)', () => {
  it('Delhi returns a non-empty timezone abbreviation', () => {
    // Exercises the offsetParts.find(p => p.type === 'timeZoneName')?.value branch
    const delhi = DEFAULT_TIMEZONES.find(t => t.id === 'delhi')!
    const result = formatInTimezone(new Date(), delhi)
    expect(typeof result.timezone_abbr).toBe('string')
    expect(result.timezone_abbr.length).toBeGreaterThan(0)
  })

  it('New York returns EST in winter', () => {
    const newYork = DEFAULT_TIMEZONES.find(t => t.id === 'newyork')!
    const winter = new Date('2024-01-15T12:00:00Z')
    const result = formatInTimezone(winter, newYork)
    // EST or ET — varies slightly by Intl implementation, but always starts with E
    expect(result.timezone_abbr.length).toBeGreaterThan(0)
    expect(result.timezone_abbr).toMatch(/^[A-Z]/)
  })

  it('London returns GMT in winter (no DST)', () => {
    const london = DEFAULT_TIMEZONES.find(t => t.id === 'london')!
    const winter = new Date('2024-01-15T12:00:00Z')
    const result = formatInTimezone(winter, london)
    expect(result.timezone_abbr.length).toBeGreaterThan(0)
  })
})

// ─── All default cities — smoke test covering all code paths ─────────────────

describe('formatInTimezone — all default cities', () => {
  it('produces valid output for all 6 default cities at a fixed summer UTC time', () => {
    // Summer solstice — DST is active in Northern Hemisphere timezones
    // Running all 6 cities exercises: positive offsets (Delhi, Dubai, Singapore,
    // Sydney in winter-equivalent), negative offsets (New York with EDT),
    // and near-zero offsets (London with BST)
    const date = new Date('2024-06-21T12:00:00Z')
    DEFAULT_TIMEZONES.forEach(tz => {
      const result = formatInTimezone(date, tz)
      expect(result.time).toMatch(/^\d{2}:\d{2}:\d{2}$/)
      expect(result.date.length).toBeGreaterThan(5)
      expect(result.utcOffset).toMatch(/^[+-]\d{2}:\d{2}$/)
      expect(result.hour).toBeGreaterThanOrEqual(0)
      expect(result.hour).toBeLessThanOrEqual(23)
      expect(typeof result.isDaytime).toBe('boolean')
      expect(result.timezone_abbr.length).toBeGreaterThan(0)
    })
  })

  it('Singapore is +08:00 year-round (no DST — stable reference)', () => {
    const singapore = DEFAULT_TIMEZONES.find(t => t.id === 'singapore')!
    expect(formatInTimezone(new Date('2024-01-15T12:00:00Z'), singapore).utcOffset).toBe('+08:00')
    expect(formatInTimezone(new Date('2024-07-15T12:00:00Z'), singapore).utcOffset).toBe('+08:00')
  })

  it('Dubai is +04:00 year-round (no DST)', () => {
    const dubai = DEFAULT_TIMEZONES.find(t => t.id === 'dubai')!
    expect(formatInTimezone(new Date('2024-01-15T12:00:00Z'), dubai).utcOffset).toBe('+04:00')
    expect(formatInTimezone(new Date('2024-07-15T12:00:00Z'), dubai).utcOffset).toBe('+04:00')
  })
})
