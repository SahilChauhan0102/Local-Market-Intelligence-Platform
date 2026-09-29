/**
 * BMI Gauge — visual semi-circular meter showing BMI position on the WHO scale.
 *
 * Implementation: SVG arc paths — no canvas, no third-party library.
 * The gauge shows 8 colour bands matching WHO BMI categories.
 * A pointer needle rotates to the user's BMI position.
 *
 * Why SVG over canvas? SVG is accessible (screenreader-friendly with ARIA),
 * resolution-independent, and trivially animatable with CSS transitions.
 */

import type { BMICategory } from '../utils/bmi'

interface BMIGaugeProps {
  bmi: number
  gaugePercent: number
  category: BMICategory
}

// The gauge spans 180° (π radians) — a classic half-circle meter
const CX = 120  // centre x
const CY = 110  // centre y (slightly above bottom to give needle room)
const R = 90    // radius

function polarToCartesian(angleDeg: number): { x: number; y: number } {
  // 0° = far left, 180° = far right (left-to-right sweep)
  const rad = ((angleDeg - 180) * Math.PI) / 180
  return {
    x: CX + R * Math.cos(rad),
    y: CY + R * Math.sin(rad),
  }
}

function arcPath(startDeg: number, endDeg: number): string {
  const start = polarToCartesian(startDeg)
  const end = polarToCartesian(endDeg)
  const largeArc = endDeg - startDeg > 180 ? 1 : 0
  return `M ${start.x} ${start.y} A ${R} ${R} 0 ${largeArc} 1 ${end.x} ${end.y}`
}

// Category bands: [start%, end%, colour]
const BANDS: [number, number, string][] = [
  [0,   6,  '#3b82f6'],  // Severe Thinness       — blue-500
  [6,   10, '#60a5fa'],  // Moderate Thinness      — blue-400
  [10,  22, '#7dd3fc'],  // Mild Thinness           — sky-300
  [22,  57, '#10b981'],  // Normal                  — emerald-500
  [57,  74, '#fbbf24'],  // Overweight              — amber-400
  [74,  83, '#f97316'],  // Obese Class I           — orange-500
  [83,  92, '#ef4444'],  // Obese Class II          — red-500
  [92, 100, '#991b1b'],  // Obese Class III         — red-800
]

export function BMIGauge({ bmi, gaugePercent, category }: BMIGaugeProps) {
  const needleAngle = gaugePercent * 1.8 // 0–100% → 0–180°
  const needleEnd = polarToCartesian(needleAngle)

  return (
    <div role="img" aria-label={`BMI gauge showing ${bmi}, category: ${category}`}>
      <svg
        viewBox="0 0 240 130"
        className="w-full max-w-xs mx-auto"
        aria-hidden="true"
        focusable="false"
      >
        {/* Background track */}
        <path
          d={arcPath(0, 180)}
          fill="none"
          stroke="#1f2937"
          strokeWidth="18"
          strokeLinecap="round"
        />

        {/* Coloured category bands */}
        {BANDS.map(([start, end, colour]) => (
          <path
            key={`${start}-${end}`}
            d={arcPath(start * 1.8, end * 1.8)}
            fill="none"
            stroke={colour}
            strokeWidth="18"
            strokeLinecap="butt"
            opacity="0.85"
          />
        ))}

        {/* Needle */}
        <line
          x1={CX}
          y1={CY}
          x2={needleEnd.x}
          y2={needleEnd.y}
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ transition: 'x2 0.6s ease, y2 0.6s ease' }}
        />
        {/* Needle pivot */}
        <circle cx={CX} cy={CY} r="5" fill="white" />

        {/* BMI value label */}
        <text
          x={CX}
          y={CY + 22}
          textAnchor="middle"
          fill="white"
          fontSize="20"
          fontWeight="700"
          fontFamily="system-ui, sans-serif"
        >
          {bmi}
        </text>

        {/* Scale labels */}
        <text x="12" y="115" fill="#9ca3af" fontSize="9" fontFamily="system-ui, sans-serif">10</text>
        <text x="108" y="22" fill="#9ca3af" fontSize="9" textAnchor="middle" fontFamily="system-ui, sans-serif">27.5</text>
        <text x="218" y="115" fill="#9ca3af" fontSize="9" textAnchor="end" fontFamily="system-ui, sans-serif">45</text>
      </svg>
    </div>
  )
}
