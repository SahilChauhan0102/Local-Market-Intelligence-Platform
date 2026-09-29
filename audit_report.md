# Tools Audit Report — LocalGali Subdomain Suite
*Audited: 2026-09-27 | Methodology: full code read + test execution + npm audit*

---

## File Inventory

| Tool | Key Files |
|:-----|:----------|
| **BMI Calculator** | `src/App.tsx` (421 lines), `src/utils/bmi.ts`, `src/test/bmi.test.ts`, `src/components/BMIGauge.tsx`, `src/components/CookieConsent.tsx`, `src/components/DonationButton.tsx`, `public/robots.txt`, `public/sitemap.xml`, `public/_headers`, `public/favicon.svg`, `index.html`, `README.md` |
| **BMR Calculator** | `src/App.tsx` (378 lines), `src/utils/bmr.ts`, `src/test/bmr.test.ts`, `src/components/CookieConsent.tsx`, `src/components/DonationButton.tsx`, `public/_headers`, `public/favicon.svg` ← **NO robots.txt, NO sitemap.xml**, `index.html`, `README.md` ← **template README** |
| **Storage Converter** | `src/App.tsx` (236 lines), `src/utils/storage.ts`, `src/test/storage.test.ts`, `src/components/CookieConsent.tsx`, `src/components/DonationButton.tsx`, `public/robots.txt`, `public/sitemap.xml`, `public/_headers`, `public/favicon.svg`, `index.html`, `README.md` ← **template README** |
| **World Time** | `src/App.tsx` (272 lines), `src/utils/worldtime.ts`, `src/test/worldtime.test.ts`, `src/components/CookieConsent.tsx`, `src/components/DonationButton.tsx`, `public/robots.txt`, `public/sitemap.xml`, `public/_headers`, `public/favicon.svg`, `index.html`, `README.md` ← **template README** |
| **Password Generator** | `src/App.tsx` (302 lines), `src/utils/password.ts`, `src/test/password.test.ts`, `src/components/CookieConsent.tsx`, `src/components/DonationButton.tsx`, `public/robots.txt`, `public/sitemap.xml`, `public/_headers`, `public/favicon.svg`, `index.html`, `README.md` ← **template README** |

> **App.css** in all 5 tools is the raw Vite template CSS (hero, counter, ticks classes) — dead code, not referenced by any component. It ships to prod via build but does not affect runtime. Technically harmless but should be cleaned up.

---

## Per-Tool Definition of Done Audit

### Legend
- ✅ Done — verified in code/run output
- ⚠️ Partially done — present but has a defect or incompleteness
- ❌ Not started / missing

---

### 1. BMI Calculator (`bmi.localgali.in`)

| Checklist Item | Status | Evidence / Notes |
|:---------------|:------:|:-----------------|
| Functionality correct, edge cases handled | ✅ | All 31 unit tests pass. WHO categories, gauge percent, validation all correct. |
| Input validation with inline errors | ✅ | `validateInputs()` covers all fields; errors rendered with `role="alert"`, no alert() calls |
| No absurd values accepted | ✅ | Height 50–300cm, weight 1–500kg, age 2–120 enforced |
| Security: no eval/innerHTML | ✅ | Not present anywhere |
| Security: no secrets in bundle | ✅ | UPI_ID via env var, guarded with `if (!UPI_ID)` |
| Security: _headers CSP | ✅ | `public/_headers` present |
| No hardcoded magic numbers | ✅ | All bounds are named constants with comments explaining origin |
| No console.log in prod | ✅ | Only `console.warn` in DonationButton (DEV only, gated by `import.meta.env.DEV`) |
| No TODOs in code | ✅ | Zero TODOs found |
| Test suite passing | ✅ | 31/31 tests pass |
| Coverage ≥ 80% | ✅ | Stmts 96%, Branch 100%, Funcs 90%, Lines 95% |
| npm audit clean | ✅ | `found 0 vulnerabilities` |
| Cookie consent (GDPR: accept/reject, blocks non-essential) | ✅ | Full Accept/Reject with `window.__analyticsConsented` flag |
| Donation button (non-intrusive, UPI) | ✅ | Fixed bottom-right, accent follows tool palette |
| Palette intentional (not generic AI template) | ✅ | Teal on near-black (#030f0e). Comment justifies choice |
| Typography (not system-ui default) | ⚠️ | Uses `font-sans` (Tailwind default = system-ui). No Google Font loaded via index.html or CSS |
| H1 present | ✅ | `<h1 id="page-title">BMI Calculator</h1>` |
| One-line description | ✅ | Present below H1 |
| FAQ / "how it works" section | ✅ | 4-question FAQ with SEO-relevant content |
| Unique title + meta description + OG tags | ✅ | All present in index.html |
| robots.txt | ✅ | Present with sitemap reference |
| sitemap.xml | ✅ | Present |
| Footer does NOT link to main domain | ✅ | Only privacy policy link (localgali.in/privacy, not main navigation) |
| Disclaimer for health advice | ✅ | Amber warning box on result |
| No data persistence | ✅ | Confirmed in code — no localStorage for health data |
| README with setup/deploy/env docs | ✅ | 2703 bytes — tool-specific README |
| Dead code cleanup | ❌ | `App.css` is the raw Vite template (185 lines of unused hero/counter CSS). Imported in `index.css` chain? Actually imported nowhere — but file is present and could confuse |

**BMI Overall: ~90% complete. Critical issues: none. Minor issues: typography (system-ui), App.css dead code.**

---

### 2. BMR Calculator (`bmr.localgali.in`)

| Checklist Item | Status | Evidence / Notes |
|:---------------|:------:|:-----------------|
| Functionality correct, edge cases handled | ✅ | All 22 unit tests pass. Mifflin-St Jeor formula correct for both sexes |
| Input validation with inline errors | ⚠️ | **BUG**: When sex is not selected, `alert()` is called (App.tsx line 78). Spec §3 says "inline error messages, not alerts." This is a spec violation |
| No absurd values accepted | ✅ | Bounds enforced in `validateInputs()` |
| Security: no eval/innerHTML | ✅ | Not present |
| Security: no secrets in bundle | ✅ | UPI_ID via env var |
| Security: _headers CSP | ✅ | Present |
| No hardcoded magic numbers | ✅ | All bounds named |
| No console.log in prod | ✅ | Confirmed |
| No TODOs | ✅ | Zero found |
| Test suite passing | ✅ | 22/22 pass |
| Coverage ≥ 80% | ✅ | 100% across all metrics |
| npm audit clean | ✅ | 0 vulnerabilities |
| Cookie consent | ✅ | Present and functional |
| Donation button | ✅ | Present with amber palette |
| Palette intentional | ✅ | Amber/orange on charcoal (#0f0a00). Comment justifies choice |
| Typography | ⚠️ | Same as BMI — `font-sans` = system-ui. No web font |
| H1 present | ✅ | `<h1>BMR Calculator</h1>` |
| FAQ section | ✅ | 4-question FAQ with TDEE/Mifflin-St Jeor explanation |
| Unique title + meta + OG | ✅ | All present in index.html |
| **robots.txt** | ❌ | **MISSING** — not in `public/` folder |
| **sitemap.xml** | ❌ | **MISSING** — not in `public/` folder |
| Footer doesn't link to main | ✅ | Only privacy link |
| Disclaimer | ✅ | Amber box: "estimate, consult doctor" |
| No data persistence | ✅ | Confirmed |
| **README with actual docs** | ❌ | README is the raw Vite template boilerplate — not tool-specific setup/env/deploy docs |
| Dead code | ❌ | `App.css` is the raw Vite template. `src/App.css` exists but is unused |

**BMR Overall: ~75% complete. Critical issues: `alert()` for sex validation, missing robots.txt + sitemap.xml, template README.**

---

### 3. Storage Converter (`storage.localgali.in`)

| Checklist Item | Status | Evidence / Notes |
|:---------------|:------:|:-----------------|
| Functionality correct | ✅ | Decimal + binary conversion table correct. All 19 tests pass |
| Input validation | ✅ | Inline error via `role="alert"`. Negative, non-finite, empty values all rejected |
| Security | ✅ | No eval/innerHTML. No secrets |
| CSP headers | ✅ | `public/_headers` present |
| No magic numbers | ✅ | Storage unit definitions in config-like `STORAGE_UNITS` array |
| No console.log in prod | ✅ | Confirmed |
| No TODOs | ✅ | Zero found |
| Tests pass | ✅ | 19/19 pass |
| Coverage ≥ 80% | ✅ | 100% across all metrics |
| npm audit | ✅ | 0 vulnerabilities |
| Cookie consent | ✅ | Present |
| Donation button | ✅ | Present with blue palette |
| Palette intentional | ✅ | Electric blue on deep navy (#050a14). Intentional for "data/tech" feel |
| Typography | ⚠️ | `font-sans` = system-ui. No web font loaded |
| H1 + description | ✅ | Present |
| Quick reference + FAQ | ✅ | Decimal/binary quick ref tables and 4-question FAQ |
| Unique title + meta + OG | ✅ | All present |
| robots.txt | ✅ | Present |
| sitemap.xml | ✅ | Present |
| Footer clean | ✅ | No main domain link |
| **README** | ❌ | **Template boilerplate** — not tool-specific |
| Dead code | ❌ | `App.css` is raw Vite template, unused |

**Storage Overall: ~88% complete. Critical issues: none. Missing: proper README.**

---

### 4. World Time (`worldtime.localgali.in`)

| Checklist Item | Status | Evidence / Notes |
|:---------------|:------:|:-----------------|
| Functionality correct | ✅ | DST-correct via Intl, live clock, custom datetime, city search, add/remove cities all work |
| Edge cases handled | ✅ | Min 1 city enforced, invalid timezone guard, setInterval cleanup on unmount |
| Input validation | ✅ | Custom datetime parsed with `isNaN` guard. Invalid inputs don't crash |
| Security | ✅ | No eval/innerHTML. No secrets |
| CSP headers | ✅ | Present |
| No magic numbers | ✅ | All timezone data in typed config |
| No console.log | ✅ | Confirmed |
| No TODOs | ✅ | Zero found |
| Tests pass | ✅ | 14/14 pass |
| **Coverage ≥ 80%** | ❌ | **FAILS threshold**: Branch coverage is **71.42%** (threshold is 80%). Uncovered: lines 94–113, 148–156. Specifically the `getUtcOffset()` internal function's error branches and the DST-aware path through `formatToParts` aren't being tested |
| npm audit | ✅ | 0 vulnerabilities |
| Cookie consent | ✅ | Present |
| Donation button | ✅ | Present with purple palette |
| Palette intentional | ✅ | Deep purple on near-black (#08040f). Cosmos/time association documented |
| Typography | ⚠️ | `font-sans` = system-ui. No web font |
| H1 + description | ✅ | Present |
| FAQ | ✅ | 4-question FAQ with DST, IANA, UTC offset explanations |
| Unique title + meta + OG | ✅ | Present |
| robots.txt | ✅ | Present |
| sitemap.xml | ✅ | Present |
| Footer clean | ✅ | No main domain link |
| **README** | ❌ | **Template boilerplate** |
| Dead code | ❌ | `App.css` Vite template, unused |

**World Time Overall: ~83% complete. Critical issues: branch coverage below threshold (71.42% vs 80% required).**

---

### 5. Password Generator (`password.localgali.in`)

| Checklist Item | Status | Evidence / Notes |
|:---------------|:------:|:-----------------|
| Functionality correct | ✅ | crypto.getRandomValues() confirmed in utils. All character types, length slider, ambiguous exclude, strength meter all work |
| Math.random() not used | ✅ | Confirmed — only in comments/FAQ text, never in logic |
| Passwords never logged/sent | ✅ | No network calls. No localStorage of passwords. Copy uses clipboard API only |
| Input validation | ✅ | "No chars selected" error shown inline |
| Security | ✅ | No eval/innerHTML. Uses `<div role="textbox">` not `<input type="password">` to avoid browser autosave |
| CSP headers | ✅ | Present |
| No magic numbers | ✅ | Length bounds (8, 64) are in the range input attrs — acceptable, well-documented |
| No console.log in prod | ✅ | Confirmed |
| No TODOs | ✅ | Zero found |
| Tests pass | ✅ | 26/26 pass |
| Coverage ≥ 80% | ✅ | Stmts 98.3%, Branch 97.36%, Funcs 100%, Lines 98.03% |
| npm audit | ✅ | 0 vulnerabilities |
| Cookie consent | ✅ | Present |
| Donation button | ✅ | Green palette matching tool theme |
| Palette intentional | ✅ | Terminal green on dark slate (#0d1117). Security/terminal aesthetic justified |
| Typography | ⚠️ | `font-mono` for main content (intentional for terminal feel ✅) but `font-sans` in FAQ is still system-ui ⚠️ |
| H1 + description | ✅ | Present. `$ Password Generator` with terminal `$` prefix is intentional |
| Privacy assurance box | ✅ | Prominent green privacy notice |
| FAQ | ✅ | 4-question FAQ: CSPRNG, entropy, ambiguous chars, storage |
| Unique title + meta + OG | ✅ | Present |
| robots.txt | ✅ | Present |
| sitemap.xml | ✅ | Present |
| Footer clean | ✅ | No main domain link |
| **README** | ❌ | **Template boilerplate** |
| Dead code | ❌ | `App.css` Vite template, unused |

**Password Overall: ~90% complete. Critical issues: none. Missing: proper README.**

---

## Summary Table

| Tool | Tests | Coverage | Audit | Cookie | Donate | robots.txt | sitemap | README | Bug |
|:-----|:-----:|:--------:|:-----:|:------:|:------:|:----------:|:-------:|:------:|:----|
| **BMI Calculator** | ✅ 31/31 | ✅ 96% | ✅ 0 vulns | ✅ | ✅ | ✅ | ✅ | ✅ | None |
| **BMR Calculator** | ✅ 22/22 | ✅ 100% | ✅ 0 vulns | ✅ | ✅ | ❌ | ❌ | ❌ | `alert()` on sex field |
| **Storage Converter** | ✅ 19/19 | ✅ 100% | ✅ 0 vulns | ✅ | ✅ | ✅ | ✅ | ❌ | None |
| **World Time** | ✅ 14/14 | ❌ 71% branch | ✅ 0 vulns | ✅ | ✅ | ✅ | ✅ | ❌ | Coverage below threshold |
| **Password Generator** | ✅ 26/26 | ✅ 98% | ✅ 0 vulns | ✅ | ✅ | ✅ | ✅ | ❌ | None |

---

## Cross-Cutting Issues (All 5 tools)

| Issue | Severity | Affects |
|:------|:--------:|:--------|
| `App.css` is raw Vite template CSS, dead code. File ships but is never `import`ed — should be deleted | Low | All 5 |
| `font-sans` resolves to system-ui (no explicit web font). Spec §4 says "typography should have a point of view — don't default to system-ui for everything without consideration." | Medium | All 5 |
| `console.warn` in DonationButton fires every dev session when `VITE_UPI_ID` is unset | Low | All 5 (DEV only) |

---

## Priority Order for Remaining Work

1. **BMR Calculator** (most gaps): fix `alert()` → inline error, add robots.txt + sitemap.xml, write proper README
2. **World Time**: add branch coverage tests for `getUtcOffset()` edge cases (coverage must reach ≥80%)  
3. **All tools**: delete `App.css` dead code, add a web font (e.g. Inter from Google Fonts) to give typography intentional design
4. **Storage, World Time, Password READMEs**: write actual tool-specific setup/env/deploy documentation

