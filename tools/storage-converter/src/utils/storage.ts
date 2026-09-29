/**
 * Data storage unit conversion utilities
 *
 * Design decision: Two separate conversion chains — binary (base-1024) and decimal (base-1000/SI).
 * This distinction matters practically:
 *   - Hard drives, SSDs, USB drives → marketed in SI (1 GB = 10^9 bytes)
 *   - RAM, OS file sizes → binary (1 GiB = 2^30 bytes)
 * Many tools get this wrong by conflating the two. We expose it explicitly.
 *
 * Unit ordering: bits → bytes → KB/KiB → MB/MiB → GB/GiB → TB/TiB → PB/PiB
 */

export type BaseMode = 'binary' | 'decimal'

export interface StorageUnit {
  id: string
  label: string
  labelBinary: string   // e.g. "GiB" in binary mode
  labelDecimal: string  // e.g. "GB"  in decimal mode
  /** Factor relative to BITS in the respective mode */
  binaryFactor: bigint  // Using BigInt to avoid floating-point precision issues at PB scale
  decimalFactor: bigint
}

/**
 * All storage units with exact factors.
 * Using BigInt for precision — 1 PB = 8 × 10^15 bits, which exceeds Number.MAX_SAFE_INTEGER (2^53).
 *
 * binaryFactor: how many bits is 1 of this unit, base-1024
 * decimalFactor: how many bits is 1 of this unit, base-1000
 */
export const STORAGE_UNITS: StorageUnit[] = [
  {
    id: 'bit',
    label: 'Bit',
    labelBinary: 'bit',
    labelDecimal: 'bit',
    binaryFactor: 1n,
    decimalFactor: 1n,
  },
  {
    id: 'byte',
    label: 'Byte',
    labelBinary: 'B',
    labelDecimal: 'B',
    binaryFactor: 8n,
    decimalFactor: 8n,
  },
  {
    id: 'kilobyte',
    label: 'Kilobyte',
    labelBinary: 'KiB',
    labelDecimal: 'KB',
    binaryFactor: 8n * 1024n,                        // 8192 bits
    decimalFactor: 8n * 1000n,                        // 8000 bits
  },
  {
    id: 'megabyte',
    label: 'Megabyte',
    labelBinary: 'MiB',
    labelDecimal: 'MB',
    binaryFactor: 8n * 1024n * 1024n,                // ~8.4M bits
    decimalFactor: 8n * 1000n * 1000n,               // 8M bits
  },
  {
    id: 'gigabyte',
    label: 'Gigabyte',
    labelBinary: 'GiB',
    labelDecimal: 'GB',
    binaryFactor: 8n * 1024n * 1024n * 1024n,
    decimalFactor: 8n * 1000n * 1000n * 1000n,
  },
  {
    id: 'terabyte',
    label: 'Terabyte',
    labelBinary: 'TiB',
    labelDecimal: 'TB',
    binaryFactor: 8n * 1024n * 1024n * 1024n * 1024n,
    decimalFactor: 8n * 1000n * 1000n * 1000n * 1000n,
  },
  {
    id: 'petabyte',
    label: 'Petabyte',
    labelBinary: 'PiB',
    labelDecimal: 'PB',
    binaryFactor: 8n * 1024n * 1024n * 1024n * 1024n * 1024n,
    decimalFactor: 8n * 1000n * 1000n * 1000n * 1000n * 1000n,
  },
]

export interface ConversionResult {
  unitId: string
  label: string
  /** Formatted human-readable value string */
  value: string
  /** Raw numeric value (may be fractional for display) */
  numericValue: number
}

/**
 * Convert a value from one unit to all other units.
 *
 * Implementation approach:
 * 1. Convert input to bits using BigInt arithmetic (exact, avoids floating-point drift).
 * 2. Convert from bits to each target unit using Number division (acceptable precision for display).
 * 3. We use BigInt for the intermediate step because values at PB scale (10^15 bits)
 *    exceed Number.MAX_SAFE_INTEGER, causing silent precision loss with plain numbers.
 *
 * @param value - The numeric value to convert
 * @param fromUnitId - Source unit ID
 * @param mode - 'binary' (1024) or 'decimal' (1000/SI)
 * @returns Array of conversions for all units, or null if value is invalid
 */
export function convertStorageUnit(
  value: number,
  fromUnitId: string,
  mode: BaseMode
): ConversionResult[] | null {
  if (!isFinite(value) || value < 0) return null
  if (value > 1e15) return null // Sanity cap: > 1 quadrillion of any unit is unreasonable input

  const fromUnit = STORAGE_UNITS.find(u => u.id === fromUnitId)
  if (!fromUnit) return null

  const factor = mode === 'binary' ? fromUnit.binaryFactor : fromUnit.decimalFactor

  // Convert to bits using exact integer math.
  // We parse to BigInt via string to avoid floating-point issues with fractional inputs.
  // For fractional values, we scale by 1e9 to preserve precision through integer math.
  const SCALE = 1_000_000_000n
  const valueBigInt = BigInt(Math.round(value * 1_000_000_000))
  const totalBitsScaled = valueBigInt * factor // bits × SCALE

  return STORAGE_UNITS.map(unit => {
    const targetFactor = mode === 'binary' ? unit.binaryFactor : unit.decimalFactor
    // result = totalBitsScaled / (targetFactor × SCALE)
    const numerator = totalBitsScaled
    const denominator = targetFactor * SCALE

    // Use Number for final division (display precision is sufficient here)
    const result = Number(numerator) / Number(denominator)

    return {
      unitId: unit.id,
      label: mode === 'binary' ? unit.labelBinary : unit.labelDecimal,
      numericValue: result,
      value: formatStorageValue(result),
    }
  })
}

/**
 * Format a storage value for display.
 * - Values ≥ 1: show up to 6 significant figures
 * - Very small values: show in scientific notation
 * - Integers: show without decimal
 */
export function formatStorageValue(value: number): string {
  if (value === 0) return '0'
  if (value >= 1) {
    // Use toPrecision(7) for enough significant figures, then strip trailing zeros
    return parseFloat(value.toPrecision(7)).toString()
  }
  if (value < 0.000001) {
    return value.toExponential(4)
  }
  return parseFloat(value.toPrecision(4)).toString()
}

/** Human-readable explanation of the conversion formula */
export function getFormulaExplanation(mode: BaseMode): string {
  if (mode === 'binary') {
    return 'Binary (IEC standard): 1 KiB = 1,024 bytes, 1 MiB = 1,024 KiB, 1 GiB = 1,024 MiB, etc. Used by operating systems for RAM and file sizes.'
  }
  return 'Decimal (SI standard): 1 KB = 1,000 bytes, 1 MB = 1,000 KB, 1 GB = 1,000 MB, etc. Used by hard drive manufacturers and network speeds.'
}
