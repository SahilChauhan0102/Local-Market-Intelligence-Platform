/**
 * BMI calculation utilities
 *
 * Approach: Pure functions with no side effects — easy to test, no hidden state.
 * All calculations use WHO standard BMI categories.
 * Formula: BMI = weight(kg) / height(m)²
 *
 * Why pure functions here instead of a class? These are stateless transformations
 * on plain data — classes would add boilerplate with no benefit.
 */

export type BMICategory =
  | 'Severe Thinness'
  | 'Moderate Thinness'
  | 'Mild Thinness'
  | 'Normal'
  | 'Overweight'
  | 'Obese Class I'
  | 'Obese Class II'
  | 'Obese Class III'

export interface BMIResult {
  bmi: number
  category: BMICategory
  /** 0–100 gauge position for the visual meter */
  gaugePercent: number
}

export interface ValidationError {
  field: 'height' | 'weight' | 'age'
  message: string
}

// ─── Input validation bounds (per spec: reject absurd values with inline errors) ───

/** Accepted height range in cm */
const HEIGHT_MIN_CM = 50 // No human shorter than 50cm
const HEIGHT_MAX_CM = 300 // Spec: reject > 300cm

/** Accepted weight range in kg */
const WEIGHT_MIN_KG = 1 // Pathological minimum for any living person
const WEIGHT_MAX_KG = 500 // Spec: reject > 500kg

const AGE_MIN = 2  // BMI categories differ for children; we note this but still compute
const AGE_MAX = 120 // Spec: reject > 120

// ─── Unit conversion helpers ───

/** Convert feet + inches to centimetres */
export function ftInToCm(feet: number, inches: number): number {
  // 1 foot = 30.48 cm, 1 inch = 2.54 cm
  return feet * 30.48 + inches * 2.54
}

/** Convert pounds to kilograms */
export function lbsToKg(lbs: number): number {
  // 1 lb = 0.45359237 kg (exact per NIST)
  return lbs * 0.45359237
}

/** Convert centimetres to feet and inches */
export function cmToFtIn(cm: number): { feet: number; inches: number } {
  const totalInches = cm / 2.54
  const feet = Math.floor(totalInches / 12)
  const inches = Math.round(totalInches % 12)
  return { feet, inches }
}

/** Convert kilograms to pounds */
export function kgToLbs(kg: number): number {
  return kg / 0.45359237
}

// ─── Validation ───

export function validateInputs(params: {
  heightCm: number
  weightKg: number
  age?: number
}): ValidationError[] {
  const errors: ValidationError[] = []

  if (!isFinite(params.heightCm) || params.heightCm <= HEIGHT_MIN_CM || params.heightCm > HEIGHT_MAX_CM) {
    errors.push({
      field: 'height',
      message: `Height must be between ${HEIGHT_MIN_CM} cm and ${HEIGHT_MAX_CM} cm.`,
    })
  }

  if (!isFinite(params.weightKg) || params.weightKg <= WEIGHT_MIN_KG || params.weightKg > WEIGHT_MAX_KG) {
    errors.push({
      field: 'weight',
      message: `Weight must be between ${WEIGHT_MIN_KG} kg and ${WEIGHT_MAX_KG} kg.`,
    })
  }

  if (params.age !== undefined) {
    if (!isFinite(params.age) || params.age < AGE_MIN || params.age > AGE_MAX) {
      errors.push({
        field: 'age',
        message: `Age must be between ${AGE_MIN} and ${AGE_MAX}.`,
      })
    }
  }

  return errors
}

// ─── Core BMI calculation ───

/**
 * Calculate BMI from height (cm) and weight (kg).
 *
 * BMI = weight(kg) / (height(m))²
 *
 * Returns null if inputs are invalid to prevent downstream use of garbage values.
 */
export function calculateBMI(heightCm: number, weightKg: number): number | null {
  if (heightCm <= 0 || weightKg <= 0) return null
  const heightM = heightCm / 100
  return weightKg / (heightM * heightM)
}

/**
 * WHO BMI categories (adults 18+).
 * Source: https://www.who.int/europe/news-room/fact-sheets/item/a-healthy-lifestyle---who-recommendations
 */
export function getBMICategory(bmi: number): BMICategory {
  if (bmi < 16) return 'Severe Thinness'
  if (bmi < 17) return 'Moderate Thinness'
  if (bmi < 18.5) return 'Mild Thinness'
  if (bmi < 25) return 'Normal'
  if (bmi < 30) return 'Overweight'
  if (bmi < 35) return 'Obese Class I'
  if (bmi < 40) return 'Obese Class II'
  return 'Obese Class III'
}

/**
 * Map BMI value to a 0–100 percentage for the visual gauge.
 *
 * Scale: 10 (min rendered) → 45+ (max rendered).
 * This gives a natural, non-linear spread that makes the normal range
 * clearly visible in the centre of the gauge without compressing extremes
 * into invisible slivers.
 */
export function bmiToGaugePercent(bmi: number): number {
  const MIN_BMI = 10
  const MAX_BMI = 45
  const clamped = Math.max(MIN_BMI, Math.min(MAX_BMI, bmi))
  return ((clamped - MIN_BMI) / (MAX_BMI - MIN_BMI)) * 100
}

/** Compose the full result object from raw inputs */
export function computeBMIResult(heightCm: number, weightKg: number): BMIResult | null {
  const bmi = calculateBMI(heightCm, weightKg)
  if (bmi === null) return null
  return {
    bmi: Math.round(bmi * 10) / 10, // 1 decimal place
    category: getBMICategory(bmi),
    gaugePercent: bmiToGaugePercent(bmi),
  }
}

/** Colour class names for each category — drives the result card styling */
export function categoryColour(category: BMICategory): {
  text: string
  bg: string
  border: string
} {
  const map: Record<BMICategory, { text: string; bg: string; border: string }> = {
    'Severe Thinness':   { text: 'text-blue-300',   bg: 'bg-blue-900/40',   border: 'border-blue-500' },
    'Moderate Thinness': { text: 'text-blue-300',   bg: 'bg-blue-900/40',   border: 'border-blue-500' },
    'Mild Thinness':     { text: 'text-sky-300',    bg: 'bg-sky-900/40',    border: 'border-sky-500' },
    'Normal':            { text: 'text-emerald-300', bg: 'bg-emerald-900/40', border: 'border-emerald-500' },
    'Overweight':        { text: 'text-yellow-300', bg: 'bg-yellow-900/40', border: 'border-yellow-500' },
    'Obese Class I':     { text: 'text-orange-300', bg: 'bg-orange-900/40', border: 'border-orange-500' },
    'Obese Class II':    { text: 'text-red-300',    bg: 'bg-red-900/40',    border: 'border-red-500' },
    'Obese Class III':   { text: 'text-red-400',    bg: 'bg-red-950/60',    border: 'border-red-600' },
  }
  return map[category]
}
