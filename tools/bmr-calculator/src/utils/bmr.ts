/**
 * BMR / TDEE calculation utilities
 *
 * Formula: Mifflin-St Jeor (1990) — more accurate than Harris-Benedict (1919/1984).
 * Source: Mifflin MD, St Jeor ST, et al. Am J Clin Nutr. 1990 Feb;51(2):241-7.
 *
 * Men:   BMR = 10×weight(kg) + 6.25×height(cm) − 5×age(years) + 5
 * Women: BMR = 10×weight(kg) + 6.25×height(cm) − 5×age(years) − 161
 *
 * TDEE = BMR × activity multiplier
 *
 * All functions are pure — no side effects, fully testable.
 */

export type Sex = 'male' | 'female'

export type ActivityLevel =
  | 'sedentary'
  | 'light'
  | 'moderate'
  | 'active'
  | 'very_active'

export interface ActivityOption {
  value: ActivityLevel
  label: string
  description: string
  /** PAL (Physical Activity Level) multiplier per Mifflin-St Jeor conventions */
  multiplier: number
}

/**
 * Standard activity multipliers.
 * These specific values are the widely-cited Mifflin-St Jeor PAL multipliers —
 * they are fixed constants, not arbitrary choices.
 */
export const ACTIVITY_OPTIONS: ActivityOption[] = [
  { value: 'sedentary',   label: 'Sedentary',   description: 'Little or no exercise, desk job', multiplier: 1.2 },
  { value: 'light',       label: 'Light',        description: 'Light exercise 1–3 days/week',    multiplier: 1.375 },
  { value: 'moderate',    label: 'Moderate',     description: 'Moderate exercise 3–5 days/week', multiplier: 1.55 },
  { value: 'active',      label: 'Active',       description: 'Hard exercise 6–7 days/week',     multiplier: 1.725 },
  { value: 'very_active', label: 'Very Active',  description: 'Very hard exercise + physical job',multiplier: 1.9 },
]

export interface BMRResult {
  bmr: number
  tdee: number
  maintenance: number   // = TDEE
  mildDeficit: number   // TDEE - 500 kcal (approx. 0.5 kg/week loss)
  mildSurplus: number   // TDEE + 500 kcal (approx. 0.5 kg/week gain)
}

export interface ValidationError {
  /** 'sex' is only set by the App layer (not validateInputs) because sex is a
   *  button toggle, not a numeric field with bounds — it's either present or not. */
  field: 'height' | 'weight' | 'age' | 'sex'
  message: string
}

// ─── Validation bounds ───────────────────────────────────────────────────────

const HEIGHT_MIN_CM = 50
const HEIGHT_MAX_CM = 300
const WEIGHT_MIN_KG = 1
const WEIGHT_MAX_KG = 500
const AGE_MIN = 15   // Mifflin-St Jeor is validated for adults; flag children
const AGE_MAX = 120

// ─── Unit conversions (same as BMI tool — duplicated intentionally to keep tools independent) ───

export function ftInToCm(feet: number, inches: number): number {
  return feet * 30.48 + inches * 2.54
}

export function lbsToKg(lbs: number): number {
  return lbs * 0.45359237
}

// ─── Validation ─────────────────────────────────────────────────────────────

export function validateInputs(params: {
  heightCm: number
  weightKg: number
  age: number
}): ValidationError[] {
  const errors: ValidationError[] = []

  if (!isFinite(params.heightCm) || params.heightCm <= HEIGHT_MIN_CM || params.heightCm > HEIGHT_MAX_CM) {
    errors.push({ field: 'height', message: `Height must be between ${HEIGHT_MIN_CM} cm and ${HEIGHT_MAX_CM} cm.` })
  }

  if (!isFinite(params.weightKg) || params.weightKg <= WEIGHT_MIN_KG || params.weightKg > WEIGHT_MAX_KG) {
    errors.push({ field: 'weight', message: `Weight must be between ${WEIGHT_MIN_KG} kg and ${WEIGHT_MAX_KG} kg.` })
  }

  if (!isFinite(params.age) || params.age < AGE_MIN || params.age > AGE_MAX) {
    errors.push({ field: 'age', message: `Age must be between ${AGE_MIN} and ${AGE_MAX}. BMR formulas are validated for adults.` })
  }

  return errors
}

// ─── Core BMR calculation (Mifflin-St Jeor) ──────────────────────────────────

/**
 * Calculate BMR using Mifflin-St Jeor equation.
 * Returns null if any input is invalid (prevents use of garbage values downstream).
 */
export function calculateBMR(params: {
  weightKg: number
  heightCm: number
  age: number
  sex: Sex
}): number | null {
  const { weightKg, heightCm, age, sex } = params

  if (weightKg <= 0 || heightCm <= 0 || age <= 0) return null

  // Mifflin-St Jeor, 1990
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age
  return sex === 'male' ? base + 5 : base - 161
}

/**
 * Calculate TDEE = BMR × activity multiplier.
 */
export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  const option = ACTIVITY_OPTIONS.find(o => o.value === activityLevel)
  // This should never be undefined because ActivityLevel is an enum type,
  // but we guard defensively:
  if (!option) throw new Error(`Unknown activity level: ${activityLevel}`)
  return bmr * option.multiplier
}

/**
 * Compose the full BMR result with TDEE and calorie band estimates.
 */
export function computeBMRResult(params: {
  weightKg: number
  heightCm: number
  age: number
  sex: Sex
  activityLevel: ActivityLevel
}): BMRResult | null {
  const bmr = calculateBMR(params)
  if (bmr === null) return null

  const tdee = calculateTDEE(bmr, params.activityLevel)

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    maintenance: Math.round(tdee),
    mildDeficit: Math.round(tdee - 500),
    mildSurplus: Math.round(tdee + 500),
  }
}
