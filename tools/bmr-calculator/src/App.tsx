/**
 * BMR Calculator — main application component
 *
 * Palette rationale: Warm amber/orange (#d97706 → #b45309) on deep charcoal (#0f0a00).
 * Association: energy, metabolism, calories, warmth — appropriate for a caloric expenditure tool.
 * Distinct from the teal BMI palette — per spec, each tool must feel purpose-built, not cloned.
 */

import { useState, useId } from 'react'
import {
  computeBMRResult,
  validateInputs,
  ftInToCm,
  lbsToKg,
  ACTIVITY_OPTIONS,
  type Sex,
  type ActivityLevel,
  type BMRResult,
  type ValidationError,
} from './utils/bmr'
import { CookieConsent } from './components/CookieConsent'
import { DonationButton } from './components/DonationButton'
import './index.css'

type Unit = 'metric' | 'imperial'

interface FormState {
  heightCm: string
  heightFt: string
  heightIn: string
  weightKg: string
  weightLbs: string
  age: string
  sex: Sex | ''
  activityLevel: ActivityLevel
  unit: Unit
}

const INITIAL_FORM: FormState = {
  heightCm: '', heightFt: '', heightIn: '',
  weightKg: '', weightLbs: '',
  age: '', sex: '',
  activityLevel: 'sedentary',
  unit: 'metric',
}

function App() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [result, setResult] = useState<BMRResult | null>(null)
  const [errors, setErrors] = useState<ValidationError[]>([])

  const heightId = useId()
  const weightId = useId()
  const ageId = useId()

  function fieldError(field: ValidationError['field']): string | undefined {
    return errors.find(e => e.field === field)?.message
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleUnitToggle(unit: Unit) {
    setForm(prev => ({ ...prev, unit }))
    setResult(null)
    setErrors([])
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Sex is a required toggle (not a numeric field) — validate it separately
    // and surface an inline error rather than using alert(), per spec §1.
    if (!form.sex) {
      setErrors([{ field: 'sex', message: 'Please select a biological sex. The Mifflin-St Jeor formula requires it for accuracy.' }])
      setResult(null)
      return
    }

    let heightCm: number
    let weightKg: number

    if (form.unit === 'metric') {
      heightCm = parseFloat(form.heightCm)
      weightKg = parseFloat(form.weightKg)
    } else {
      const ft = parseFloat(form.heightFt) || 0
      const inches = parseFloat(form.heightIn) || 0
      heightCm = ftInToCm(ft, inches)
      weightKg = lbsToKg(parseFloat(form.weightLbs))
    }

    const age = parseFloat(form.age)
    const validationErrors = validateInputs({ heightCm, weightKg, age })
    setErrors(validationErrors)

    if (validationErrors.length > 0) {
      setResult(null)
      return
    }

    const computed = computeBMRResult({
      heightCm,
      weightKg,
      age,
      sex: form.sex as Sex,
      activityLevel: form.activityLevel,
    })
    setResult(computed)
  }

  function handleReset() {
    setForm(INITIAL_FORM)
    setResult(null)
    setErrors([])
  }

  const selectedActivity = ACTIVITY_OPTIONS.find(o => o.value === form.activityLevel)

  return (
    <div className="min-h-screen bg-[#0f0a00] font-sans text-white selection:bg-amber-600/30">
      <header className="border-b border-amber-900/40 bg-[#1a1000]/80 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-600/20 ring-1 ring-amber-500/30">
              <span className="text-lg leading-none" aria-hidden="true">🔥</span>
            </div>
            <div>
              <span className="text-sm font-semibold tracking-wide text-amber-400">LocalGali Tools</span>
              <p className="text-xs text-gray-500">bmr.localgali.in</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12" id="main-content">
        <section className="mb-10 text-center" aria-labelledby="page-title">
          <h1 id="page-title" className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            BMR Calculator
          </h1>
          <p className="mx-auto max-w-xl text-base text-gray-400 sm:text-lg">
            Calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE)
            using the Mifflin-St Jeor equation — the most accurate standard formula.
          </p>
        </section>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <section aria-labelledby="form-heading" className="rounded-2xl border border-amber-900/30 bg-[#1a1000] p-6 shadow-xl">
            <h2 id="form-heading" className="mb-6 text-lg font-semibold text-amber-300">Your measurements</h2>

            {/* Unit toggle */}
            <div className="mb-6 flex rounded-xl border border-white/10 p-1" role="group" aria-label="Measurement unit">
              {(['metric', 'imperial'] as const).map(u => (
                <button key={u} type="button" id={`unit-toggle-${u}`} onClick={() => handleUnitToggle(u)} aria-pressed={form.unit === u}
                  className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${form.unit === u ? 'bg-amber-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}>
                  {u === 'metric' ? 'Metric (cm / kg)' : 'Imperial (ft / lbs)'}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {/* Sex — required */}
              <fieldset className="mb-5">
                <legend className="mb-2 block text-sm font-medium text-gray-300">
                  Biological sex <span aria-hidden="true" className="text-amber-500">*</span>
                  <span className="ml-1 text-xs text-gray-500">(required for formula accuracy)</span>
                </legend>
                <div className="flex gap-3">
                  {([['male', '♂ Male'], ['female', '♀ Female']] as const).map(([val, label]) => (
                    <button key={val} type="button" id={`sex-toggle-${val}`}
                      onClick={() => {
                        setForm(prev => ({ ...prev, sex: prev.sex === val ? '' : val }))
                        // Clear the sex error as soon as user makes a selection
                        setErrors(prev => prev.filter(e => e.field !== 'sex'))
                      }}
                      aria-pressed={form.sex === val}
                      className={`flex-1 rounded-xl border py-3 text-sm font-medium transition ${form.sex === val ? 'border-amber-500 bg-amber-600/20 text-amber-300' : 'border-white/10 text-gray-400 hover:border-white/20 hover:text-white'}`}>
                      {label}
                    </button>
                  ))}
                </div>
                {fieldError('sex') && (
                  <p id="sex-error" role="alert" className="mt-1.5 text-xs text-red-400">{fieldError('sex')}</p>
                )}
              </fieldset>

              {/* Age */}
              <fieldset className="mb-5">
                <legend className="mb-2 block text-sm font-medium text-gray-300">
                  Age <span aria-hidden="true" className="text-amber-500">*</span>
                </legend>
                <label htmlFor={ageId} className="sr-only">Age in years</label>
                <input id={ageId} name="age" type="number" value={form.age} onChange={handleChange}
                  placeholder="e.g. 30" min="15" max="120" step="1" required
                  aria-describedby={fieldError('age') ? `${ageId}-error` : undefined} aria-invalid={!!fieldError('age')}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-600 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 aria-[invalid=true]:border-red-500" />
                <span className="mt-1 block text-xs text-gray-500">years</span>
                {fieldError('age') && <p id={`${ageId}-error`} role="alert" className="mt-1.5 text-xs text-red-400">{fieldError('age')}</p>}
              </fieldset>

              {/* Height */}
              <fieldset className="mb-5">
                <legend className="mb-2 block text-sm font-medium text-gray-300">
                  Height <span aria-hidden="true" className="text-amber-500">*</span>
                </legend>
                {form.unit === 'metric' ? (
                  <div>
                    <label htmlFor={heightId} className="sr-only">Height in centimetres</label>
                    <input id={heightId} name="heightCm" type="number" value={form.heightCm} onChange={handleChange}
                      placeholder="e.g. 175" min="50" max="300" step="0.1" required
                      aria-describedby={fieldError('height') ? `${heightId}-error` : undefined} aria-invalid={!!fieldError('height')}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-600 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 aria-[invalid=true]:border-red-500" />
                    <span className="mt-1 block text-xs text-gray-500">cm</span>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label htmlFor={`${heightId}-ft`} className="sr-only">Feet</label>
                      <input id={`${heightId}-ft`} name="heightFt" type="number" value={form.heightFt} onChange={handleChange}
                        placeholder="5" min="1" max="9" step="1" aria-label="Height feet"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-600 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40" />
                      <span className="mt-1 block text-xs text-gray-500">ft</span>
                    </div>
                    <div className="flex-1">
                      <label htmlFor={`${heightId}-in`} className="sr-only">Inches</label>
                      <input id={`${heightId}-in`} name="heightIn" type="number" value={form.heightIn} onChange={handleChange}
                        placeholder="9" min="0" max="11" step="1" aria-label="Height inches"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-600 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40" />
                      <span className="mt-1 block text-xs text-gray-500">in</span>
                    </div>
                  </div>
                )}
                {fieldError('height') && <p id={`${heightId}-error`} role="alert" className="mt-1.5 text-xs text-red-400">{fieldError('height')}</p>}
              </fieldset>

              {/* Weight */}
              <fieldset className="mb-5">
                <legend className="mb-2 block text-sm font-medium text-gray-300">
                  Weight <span aria-hidden="true" className="text-amber-500">*</span>
                </legend>
                <label htmlFor={weightId} className="sr-only">{form.unit === 'metric' ? 'Weight in kilograms' : 'Weight in pounds'}</label>
                <input id={weightId} name={form.unit === 'metric' ? 'weightKg' : 'weightLbs'}
                  type="number" value={form.unit === 'metric' ? form.weightKg : form.weightLbs} onChange={handleChange}
                  placeholder={form.unit === 'metric' ? 'e.g. 70' : 'e.g. 154'}
                  min="1" max={form.unit === 'metric' ? '500' : '1100'} step="0.1" required
                  aria-describedby={fieldError('weight') ? `${weightId}-error` : undefined} aria-invalid={!!fieldError('weight')}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-600 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 aria-[invalid=true]:border-red-500" />
                <span className="mt-1 block text-xs text-gray-500">{form.unit === 'metric' ? 'kg' : 'lbs'}</span>
                {fieldError('weight') && <p id={`${weightId}-error`} role="alert" className="mt-1.5 text-xs text-red-400">{fieldError('weight')}</p>}
              </fieldset>

              {/* Activity level */}
              <fieldset className="mb-6">
                <legend className="mb-2 block text-sm font-medium text-gray-300">Activity level</legend>
                <label htmlFor="activity-select" className="sr-only">Select activity level</label>
                <select id="activity-select" name="activityLevel" value={form.activityLevel} onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-[#1a1000] px-4 py-3 text-white transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40">
                  {ACTIVITY_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label} — {o.description}</option>
                  ))}
                </select>
                {selectedActivity && (
                  <p className="mt-1.5 text-xs text-gray-500">Multiplier: ×{selectedActivity.multiplier}</p>
                )}
              </fieldset>

              <div className="flex gap-3">
                <button id="calculate-bmr-btn" type="submit"
                  className="flex-1 rounded-xl bg-amber-600 py-3.5 font-semibold text-white shadow-lg shadow-amber-900/40 transition hover:bg-amber-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 active:scale-[0.98]">
                  Calculate BMR & TDEE
                </button>
                {result && (
                  <button id="reset-bmr-btn" type="button" onClick={handleReset}
                    className="rounded-xl border border-white/10 px-5 text-sm text-gray-400 transition hover:border-white/20 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                    Reset
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* Result */}
          <section aria-labelledby="result-heading" aria-live="polite" aria-atomic="true">
            {result ? (
              <div className="rounded-2xl border border-amber-900/40 bg-amber-950/20 p-6 shadow-xl">
                <h2 id="result-heading" className="mb-6 text-sm font-medium uppercase tracking-widest text-gray-400">Your Results</h2>

                {/* BMR */}
                <div className="mb-4 rounded-xl border border-amber-700/30 bg-amber-900/20 p-4">
                  <p className="mb-0.5 text-xs font-medium uppercase tracking-widest text-amber-400/60">Basal Metabolic Rate</p>
                  <p className="text-4xl font-bold text-amber-300">
                    {result.bmr.toLocaleString()}
                    <span className="ml-2 text-lg font-normal text-gray-400">kcal/day</span>
                  </p>
                  <p className="mt-1 text-xs text-gray-500">Calories burned at complete rest — breathing, heartbeat, organ function only.</p>
                </div>

                {/* TDEE */}
                <div className="mb-6 rounded-xl border border-orange-700/30 bg-orange-900/20 p-4">
                  <p className="mb-0.5 text-xs font-medium uppercase tracking-widest text-orange-400/60">Total Daily Energy Expenditure</p>
                  <p className="text-4xl font-bold text-orange-300">
                    {result.tdee.toLocaleString()}
                    <span className="ml-2 text-lg font-normal text-gray-400">kcal/day</span>
                  </p>
                  <p className="mt-1 text-xs text-gray-500">Estimated total daily calories including your activity level ({selectedActivity?.label}).</p>
                </div>

                {/* Calorie band estimates */}
                <div className="mb-6 overflow-hidden rounded-xl border border-white/10">
                  <table className="w-full text-sm">
                    <caption className="sr-only">Daily calorie targets for different goals</caption>
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5">
                        <th scope="col" className="px-4 py-2.5 text-left font-medium text-gray-400">Goal</th>
                        <th scope="col" className="px-4 py-2.5 text-right font-medium text-gray-400">kcal/day</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5">
                        <td className="px-4 py-2.5 text-red-300">Mild deficit (−0.5 kg/week)</td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-red-300">{result.mildDeficit.toLocaleString()}</td>
                      </tr>
                      <tr className="border-b border-white/5 bg-white/5">
                        <td className="px-4 py-2.5 font-semibold text-white">Maintenance</td>
                        <td className="px-4 py-2.5 text-right tabular-nums font-semibold text-white">{result.maintenance.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 text-green-300">Mild surplus (+0.5 kg/week)</td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-green-300">{result.mildSurplus.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Disclaimer */}
                <p className="rounded-xl border border-amber-900/40 bg-amber-950/30 px-4 py-3 text-xs leading-relaxed text-amber-200/70">
                  ⚠️ This is an estimate based on standard formulas and does not account for individual medical conditions. Consult a doctor or nutritionist for personalised advice.
                </p>
              </div>
            ) : (
              <div className="flex h-full min-h-64 flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/[0.02] text-center">
                <div className="mb-3 text-4xl opacity-30">🔥</div>
                <p className="text-sm text-gray-600">Fill in your details to calculate your BMR and daily calorie needs</p>
              </div>
            )}
          </section>
        </div>

        {/* FAQ */}
        <section aria-labelledby="faq-heading" className="mt-16 border-t border-white/5 pt-12">
          <h2 id="faq-heading" className="mb-8 text-2xl font-bold">How BMR is calculated</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { q: 'What is BMR?', a: 'Basal Metabolic Rate (BMR) is the minimum number of calories your body needs to function at complete rest — maintaining breathing, circulation, and organ function. Even if you stayed in bed all day, you would burn at least this many calories.' },
              { q: 'What is the Mifflin-St Jeor equation?', a: 'Published in 1990, Mifflin-St Jeor is the most widely validated BMR formula for adults. It accounts for weight, height, age, and biological sex. Men: BMR = 10×kg + 6.25×cm − 5×age + 5. Women: BMR = 10×kg + 6.25×cm − 5×age − 161.' },
              { q: 'What is TDEE?', a: 'Total Daily Energy Expenditure (TDEE) = BMR × your Physical Activity Level (PAL) multiplier. It estimates total calories burned in a full day including exercise and daily movement. To maintain weight, eat at TDEE. To lose weight, eat below TDEE.' },
              { q: 'Is my data stored?', a: 'No. All calculations happen entirely in your browser. Nothing is sent to any server, stored in a database, or tracked in analytics. Your health data stays on your device.' },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                <h3 className="mb-2 font-semibold text-amber-300">{q}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-16 border-t border-white/5 py-8 text-center text-xs text-gray-600">
        <p>
          © {new Date().getFullYear()} LocalGali Tools &nbsp;·&nbsp; Free, private, no data stored &nbsp;·&nbsp;{' '}
          <a href="https://localgali.in/privacy" className="underline decoration-dotted hover:text-gray-400">Privacy Policy</a>
        </p>
      </footer>

      <CookieConsent />
      <DonationButton accentClass="bg-amber-700 hover:bg-amber-600" />
    </div>
  )
}

export default App
