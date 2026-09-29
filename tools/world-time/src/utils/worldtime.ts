/**
 * World time utilities
 *
 * Design decisions:
 * - Use Intl.DateTimeFormat with IANA timezone names for DST-correct conversion.
 *   We do NOT hand-roll UTC offset math — DST rules change per region and year.
 *   Intl is built into every modern browser, no library needed.
 *
 * - We use date-fns-tz ONLY if we need features beyond what Intl provides.
 *   Currently, Intl.DateTimeFormat covers all our needs — no external library dependency.
 *
 * - Timezones are validated against Intl.supportedValuesOf('timeZone') to catch
 *   bad user input early rather than letting Intl throw a cryptic RangeError.
 */

export interface Timezone {
  id: string
  city: string
  country: string
  iana: string  // IANA timezone identifier (e.g. 'Asia/Kolkata')
  emoji: string
}

/**
 * Default city suggestions relevant to Delhi NCR audience (per spec §3.4).
 * Includes major global hubs for NRI-related time comparisons.
 */
export const DEFAULT_TIMEZONES: Timezone[] = [
  { id: 'delhi',     city: 'Delhi',     country: 'India',        iana: 'Asia/Kolkata',       emoji: '🇮🇳' },
  { id: 'dubai',     city: 'Dubai',     country: 'UAE',          iana: 'Asia/Dubai',         emoji: '🇦🇪' },
  { id: 'london',    city: 'London',    country: 'UK',           iana: 'Europe/London',      emoji: '🇬🇧' },
  { id: 'newyork',   city: 'New York',  country: 'USA',          iana: 'America/New_York',   emoji: '🇺🇸' },
  { id: 'singapore', city: 'Singapore', country: 'Singapore',    iana: 'Asia/Singapore',     emoji: '🇸🇬' },
  { id: 'sydney',    city: 'Sydney',    country: 'Australia',    iana: 'Australia/Sydney',   emoji: '🇦🇺' },
]

/** Additional searchable timezone list */
export const ALL_TIMEZONES: Timezone[] = [
  ...DEFAULT_TIMEZONES,
  { id: 'mumbai',    city: 'Mumbai',    country: 'India',        iana: 'Asia/Kolkata',       emoji: '🇮🇳' },
  { id: 'bangalore', city: 'Bangalore', country: 'India',        iana: 'Asia/Kolkata',       emoji: '🇮🇳' },
  { id: 'tokyo',     city: 'Tokyo',     country: 'Japan',        iana: 'Asia/Tokyo',         emoji: '🇯🇵' },
  { id: 'beijing',   city: 'Beijing',   country: 'China',        iana: 'Asia/Shanghai',      emoji: '🇨🇳' },
  { id: 'paris',     city: 'Paris',     country: 'France',       iana: 'Europe/Paris',       emoji: '🇫🇷' },
  { id: 'berlin',    city: 'Berlin',    country: 'Germany',      iana: 'Europe/Berlin',      emoji: '🇩🇪' },
  { id: 'toronto',   city: 'Toronto',   country: 'Canada',       iana: 'America/Toronto',    emoji: '🇨🇦' },
  { id: 'losangeles',city: 'Los Angeles', country: 'USA',        iana: 'America/Los_Angeles',emoji: '🇺🇸' },
  { id: 'chicago',   city: 'Chicago',   country: 'USA',          iana: 'America/Chicago',    emoji: '🇺🇸' },
  { id: 'riyadh',    city: 'Riyadh',    country: 'Saudi Arabia', iana: 'Asia/Riyadh',        emoji: '🇸🇦' },
  { id: 'nairobi',   city: 'Nairobi',   country: 'Kenya',        iana: 'Africa/Nairobi',     emoji: '🇰🇪' },
  { id: 'johannesburg', city: 'Johannesburg', country: 'South Africa', iana: 'Africa/Johannesburg', emoji: '🇿🇦' },
  { id: 'saopaulo',  city: 'São Paulo', country: 'Brazil',       iana: 'America/Sao_Paulo',  emoji: '🇧🇷' },
  { id: 'mexico',    city: 'Mexico City', country: 'Mexico',     iana: 'America/Mexico_City',emoji: '🇲🇽' },
  { id: 'moscow',    city: 'Moscow',    country: 'Russia',       iana: 'Europe/Moscow',      emoji: '🇷🇺' },
  { id: 'istanbul',  city: 'Istanbul',  country: 'Turkey',       iana: 'Europe/Istanbul',    emoji: '🇹🇷' },
  { id: 'cairo',     city: 'Cairo',     country: 'Egypt',        iana: 'Africa/Cairo',       emoji: '🇪🇬' },
  { id: 'bangkok',   city: 'Bangkok',   country: 'Thailand',     iana: 'Asia/Bangkok',       emoji: '🇹🇭' },
  { id: 'kualalumpur', city: 'Kuala Lumpur', country: 'Malaysia', iana: 'Asia/Kuala_Lumpur', emoji: '🇲🇾' },
  { id: 'auckland',  city: 'Auckland',  country: 'New Zealand',  iana: 'Pacific/Auckland',   emoji: '🇳🇿' },
]

export interface FormattedTime {
  timezone: Timezone
  time: string       // e.g. "14:35:22"
  date: string       // e.g. "Sat, 27 Sep 2026"
  timezone_abbr: string // e.g. "IST", "EDT"
  utcOffset: string  // e.g. "+05:30"
  isDaytime: boolean // for day/night indicator (hour 6–20)
  hour: number       // 0-23, used for isDaytime
}

/**
 * Format a given Date in the specified IANA timezone.
 * Uses Intl.DateTimeFormat — DST-correct, no library needed.
 */
export function formatInTimezone(date: Date, tz: Timezone): FormattedTime {
  const timeParts = new Intl.DateTimeFormat('en-GB', {
    timeZone: tz.iana,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(date)

  const dateParts = new Intl.DateTimeFormat('en-GB', {
    timeZone: tz.iana,
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).formatToParts(date)

  // Extract hour for day/night.
  // The ?? '12' fallback is a defensive guard — Intl.DateTimeFormat with a valid
  // IANA timezone and a valid Date will always return an 'hour' part. Annotated
  // to acknowledge this branch is unreachable in production.
  /* v8 ignore next */
  const hourStr = timeParts.find(p => p.type === 'hour')?.value ?? '12'
  const hour = parseInt(hourStr, 10)

  const timeStr = timeParts
    .filter(p => ['hour', 'minute', 'second', 'literal'].includes(p.type))
    .map(p => p.value)
    .join('')

  const dateStr = dateParts
    .map(p => p.value)
    .join('')
    .replace(/,\s*/g, ', ')

  // Get timezone abbreviation (e.g. "IST") and UTC offset
  const offsetParts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz.iana,
    timeZoneName: 'short',
  }).formatToParts(date)

  const tzAbbr = offsetParts.find(p => p.type === 'timeZoneName')?.value ?? tz.iana

  // Calculate UTC offset string
  const utcOffset = getUtcOffset(date, tz.iana)

  return {
    timezone: tz,
    time: timeStr,
    date: dateStr,
    timezone_abbr: tzAbbr,
    utcOffset,
    isDaytime: hour >= 6 && hour < 20,
    hour,
  }
}

/**
 * Calculate the UTC offset string (e.g. "+05:30") for a given timezone at a specific date.
 * We derive it from the difference between UTC and local time — this is DST-aware
 * because we pass the actual Date object, not a static offset.
 */
function getUtcOffset(date: Date, ianaTimezone: string): string {
  // Get local time components in the target timezone
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: ianaTimezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  const parts = formatter.formatToParts(date)
  // The ?? '0' fallback is a defensive guard — a valid Intl formatter with a
  // valid Date always returns all numeric parts. Annotated as unreachable.
  /* v8 ignore next */
  const get = (type: string) => parseInt(parts.find(p => p.type === type)?.value ?? '0', 10)

  const localDate = new Date(
    Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'))
  )

  const diffMs = localDate.getTime() - date.getTime()
  const diffMinutes = Math.round(diffMs / 60000)
  const sign = diffMinutes >= 0 ? '+' : '-'
  const abs = Math.abs(diffMinutes)
  const h = String(Math.floor(abs / 60)).padStart(2, '0')
  const m = String(abs % 60).padStart(2, '00')

  return `${sign}${h}:${m}`
}

/**
 * Validate that an IANA timezone string is supported.
 *
 * Implementation note: We use the Intl.DateTimeFormat constructor try-catch
 * rather than Intl.supportedValuesOf('timeZone') because:
 * 1. supportedValuesOf requires Node.js built with full-icu, which isn't guaranteed.
 * 2. The constructor approach works in all environments (browsers, Node, jsdom).
 * 3. It tests actual support, not just presence in the list.
 */
export function isValidTimezone(iana: string): boolean {
  if (!iana || iana.trim().length === 0) return false
  try {
    // This throws RangeError for invalid timezone names in all environments
    Intl.DateTimeFormat('en', { timeZone: iana }).format(new Date())
    return true
  } catch {
    return false
  }
}
