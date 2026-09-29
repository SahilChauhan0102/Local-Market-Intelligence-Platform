# MASTER PROMPT — Utility Tools Subdomain Suite
**Role for the agent:** You are a Senior Software Engineer building production-grade micro-tools for a live commercial website. This is NOT a prototype, demo, or hackathon project. Code will be reviewed against production standards before merge. Do not take shortcuts, do not skip validation, do not skip error handling, do not skip tests.

---

## 1. CONTEXT

Primary domain: `[yourdomain.com]` — a Delhi NCR real-estate/local-market comparison platform ("Local Gali").

We are adding 5 independent utility tools, each on its own subdomain, to drive additional organic search traffic without diluting the topical SEO relevance of the main domain. These tools must NOT be linked from the main site's primary navigation. They are standalone products sharing only infrastructure/hosting.

**Subdomains to build:**
1. `bmi.yourdomain.com` — BMI Calculator
2. `bmr.yourdomain.com` — BMR Calculator
3. `storage.yourdomain.com` — Data Storage Unit Converter
4. `worldtime.yourdomain.com` — World Time Comparison
5. `password.yourdomain.com` — Password Generator

Each subdomain is a **fully independent static/lightweight app** — no shared session, no shared database, no cross-linking to the main real-estate site anywhere in code, metadata, or footer.

---

## 2. GLOBAL TECHNICAL REQUIREMENTS (apply to all 5 tools)

### 2.1 Stack
- Frontend: React (Vite) + TypeScript — strict mode ON (`"strict": true` in tsconfig, no `any` without justification comment)
- Styling: Tailwind CSS
- No backend/server required for any of the 5 tools — all run 100% client-side. This keeps hosting cost at zero beyond static file serving.
- Hosting: static build output (`dist/`) deployable to Vercel/Netlify/Cloudflare Pages/Nginx — confirm which the user already has before assuming.

### 2.2 Repository structure
Monorepo, one repo, clean separation:
```
/tools
  /bmi-calculator
  /bmr-calculator
  /storage-converter
  /world-time
  /password-generator
  /shared        <- shared UI components, utils, ONLY if truly generic (buttons, layout shell)
```
Each tool folder is a self-contained deployable app. Do not create hidden coupling between tools via shared global state.

### 2.3 Security requirements (non-negotiable)
- All user input sanitized and validated client-side AND server-side (where a server exists).
- Content-Security-Policy header set on every deployed app: no inline scripts except nonce-based, no `unsafe-eval`.
- Dependencies: run `npm audit` before final delivery; zero high/critical vulnerabilities allowed.
- No API keys, secrets, or tokens in frontend bundle. None of these 5 tools should require any third-party API key — if the agent finds itself needing one, stop and flag it rather than hardcoding it client-side.
- HTTPS enforced (HSTS header) on every subdomain.
- No use of `eval()`, `dangerouslySetInnerHTML`, or `innerHTML` with unsanitized input anywhere in the codebase.
- Password Generator specifically: all generation MUST happen client-side using `crypto.getRandomValues()` — NEVER `Math.random()` for password generation. Generated passwords must never be sent to any server, logged, or stored anywhere (no analytics on password content, ever).

### 2.4 Code quality bar
- ESLint + Prettier configured and passing with zero errors before delivery.
- Every component: typed props, no implicit `any`.
- Unit tests (Vitest or Jest) for all calculation/logic functions — minimum 80% coverage on `/utils` and `/lib` logic files. UI components can have lighter coverage but critical user flows need at least one test.
- No console.log left in production build.
- Meaningful commit messages if using git (feat/fix/chore convention).

### 2.5 UI/UX requirements
- Mobile-first responsive design — test at 320px, 768px, 1024px, 1440px widths minimum.
- Accessibility: proper semantic HTML, ARIA labels on interactive elements, keyboard navigable, color contrast passing WCAG AA.
- Loading and error states for every async action (no silent failures, no infinite spinners).
- Each tool must have: a clear H1, a one-line description of what it does, the tool itself, and a short "how it works" or FAQ section (this helps SEO — thin pages rank poorly).
- Dark/light mode is a bonus, not required, unless the user asks.
- Each tool page must have unique, keyword-relevant `<title>`, `<meta description>`, and Open Graph tags. No shared boilerplate meta copy across tools.
- Add a `robots.txt` and `sitemap.xml` PER SUBDOMAIN (not shared with main domain) so each is crawled as its own entity.
- Footer must NOT link to the main real-estate domain. Keep these fully siloed.

### 2.6 Performance
- Lighthouse score target: 90+ on Performance, Accessibility, Best Practices, SEO for every tool.
- Lazy-load anything non-critical. Keep initial JS bundle under ~150KB gzipped per tool.

### 2.7 Deliverables per tool
1. Full source code, organized per §2.2.
2. `README.md` per tool: setup, env vars needed (if any), build/deploy steps.
3. Passing test suite + coverage report.
4. Lighthouse report (screenshot or JSON) showing scores.
5. List of npm dependencies used and why (flag anything with a known CVE).

---

## 3. PER-TOOL FUNCTIONAL SPEC

### 3.1 BMI Calculator (`bmi.yourdomain.com`)
- Inputs: height (cm or ft/in toggle), weight (kg or lbs toggle), age (optional), sex (optional, for more accurate category ranges).
- Output: BMI value, category (Underweight/Normal/Overweight/Obese per WHO standard), visual gauge/meter.
- Validation: reject negative/zero/absurd values (e.g., height > 300cm, weight > 500kg) with clear inline error messages, not alerts.
- Include a disclaimer: "BMI is a general screening tool, not a diagnostic measure. Consult a doctor for medical advice." (Do NOT let this tool give health advice beyond the standard category.)
- No data persistence — nothing saved, no tracking of health data in analytics.

### 3.2 BMR Calculator (`bmr.yourdomain.com`)
- Purpose: calculate Basal Metabolic Rate (calories burned at rest) and optionally Total Daily Energy Expenditure (TDEE) when activity level is factored in.
- Inputs: age, sex (biological, needed for formula accuracy), height (cm or ft/in toggle), weight (kg or lbs toggle), activity level (sedentary / light / moderate / active / very active — standard multiplier dropdown).
- Formula: use the **Mifflin-St Jeor equation** (more accurate than the older Harris-Benedict) as the default:
  - Men: `BMR = 10×weight(kg) + 6.25×height(cm) − 5×age(years) + 5`
  - Women: `BMR = 10×weight(kg) + 6.25×height(cm) − 5×age(years) − 161`
- Output: BMR value (kcal/day), and TDEE (BMR × activity multiplier), shown clearly as two separate numbers with a one-line explanation of the difference.
- Optionally show a breakdown for weight maintenance / mild deficit / mild surplus (e.g., TDEE, TDEE−500, TDEE+500) since this is a common follow-up need — clearly label these as general estimates, not prescriptions.
- Validation: reject negative/zero/absurd values (age > 120, height > 300cm, weight > 500kg) with inline error messages.
- Include a disclaimer: "This is an estimate based on standard formulas and does not account for individual medical conditions. Consult a doctor or nutritionist for personalized advice."
- No data persistence — nothing saved, no health data sent to analytics.

### 3.3 Data Storage Unit Converter (`storage.yourdomain.com`)
- Convert between: bits, bytes, KB, MB, GB, TB, PB — and clarify binary (1024) vs decimal (1000) base, since this trips people up. Give user a toggle for "Binary (1024)" vs "Decimal (1000, SI)".
- Pure client-side math, no backend needed.
- Show conversion formula/explanation for transparency (helps SEO content depth too).

### 3.4 World Time Comparison (`worldtime.yourdomain.com`)
- Let user pick multiple cities/timezones and see current time side-by-side, updating live (setInterval, cleaned up properly on unmount — no memory leaks).
- Handle DST correctly — use a proper timezone library (`Intl.DateTimeFormat` with IANA timezone names, or `date-fns-tz` / `luxon`) — do NOT hand-roll UTC offset math, it breaks on DST.
- Allow user to also pick a specific date+time and see it converted across all selected zones (not just "now").
- Default suggested cities relevant to Delhi NCR audience: Delhi, Dubai, London, New York, Singapore, Sydney.

### 3.5 Password Generator (`password.yourdomain.com`)
- Options: length (slider, 8–64), include uppercase/lowercase/numbers/symbols (checkboxes), exclude ambiguous characters (toggle: `l`, `1`, `O`, `0`).
- MUST use `crypto.getRandomValues()` — reiterate: no `Math.random()`.
- Show a strength indicator (entropy-based, not just a cosmetic bar — calculate actual bits of entropy from charset size × length).
- "Copy to clipboard" button with a visible confirmation (not just silent).
- No password should ever leave the browser — no network calls, no analytics events containing password content, no autofill-triggering `<form>` submission.

---

## 4. THINGS THE AGENT MUST ASK BEFORE STARTING (do not assume)
1. Which hosting platform/provider is currently in use, and does it support subdomain routing (all 5 tools are static, so no serverless functions are required)?
2. Analytics preference — Google Analytics, Plausible, none? (Must be privacy-respecting; no analytics on the Password Generator page beyond basic pageviews.)
3. Domain registrar/DNS provider, to confirm subdomain CNAME/A record setup steps.
4. Whether TypeScript is acceptable or if plain JS is preferred (recommend TypeScript, but confirm).

---

## 5. DEFINITION OF DONE
A tool is NOT complete until:
- [ ] All functional spec items in §3 work correctly, including edge cases
- [ ] All security requirements in §2.3 are verifiably met
- [ ] Test suite passes with required coverage
- [ ] Lighthouse scores meet the §2.6 bar
- [ ] Mobile responsiveness manually verified at all breakpoints
- [ ] No console errors/warnings in browser devtools
- [ ] `npm audit` clean
- [ ] README written
- [ ] Meta tags/SEO basics in place per §2.5

Do not report a tool as "done" if any box above is unchecked. If blocked on something (e.g., missing API key), stop and ask rather than mocking/faking it silently.
