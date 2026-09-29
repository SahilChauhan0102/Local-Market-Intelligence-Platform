# Password Generator — password.localgali.in

A free, private, client-side cryptographically secure password generator. Uses the browser's built-in `crypto.getRandomValues()` (a CSPRNG) — never `Math.random()`. Generated passwords never leave the browser, are never logged, and are never sent to any server or analytics system.

**Live URL:** https://password.localgali.in

---

## Setup

### Prerequisites
- Node.js ≥ 20
- npm ≥ 10

### Install dependencies
```bash
npm install
```

### Environment variables
Create a `.env.local` file (never commit this):
```
VITE_UPI_ID=yourname@upi
VITE_UPI_NAME=Your Name
```
These power the UPI donation button. If not set, the button is hidden (no broken UI).
A `console.warn` will appear in the dev console when `VITE_UPI_ID` is unset — this is expected behaviour, not an error.

### Development
```bash
npm run dev
# Opens at http://localhost:5173
```

### Build (production)
```bash
npm run build
# Output: dist/
```

### Tests
```bash
npm test                # Run once
npm run test:coverage   # Run with coverage report (target: 80%+ on utils/)
```

### Lint
```bash
npm run lint            # Must exit with 0 errors before deploy
```

---

## Deploy to Cloudflare Pages

1. Push to GitHub.
2. In Cloudflare Pages, create a new project pointing to this repo.
3. Set **Root directory** to `tools/password-generator`.
4. Set **Build command**: `npm run build`
5. Set **Build output directory**: `dist`
6. Add environment variables (`VITE_UPI_ID`, `VITE_UPI_NAME`) in the Pages settings.
7. In Cloudflare DNS, add a CNAME record:
   - **Name**: `password`
   - **Target**: `<your-pages-project>.pages.dev`
   - **Proxied**: ✅ Yes

The `public/_headers` file sets HSTS, CSP, and other security headers automatically via Cloudflare Pages.

---

## DNS (subdomain setup)

| Record | Name | Target | Proxy |
|--------|------|--------|-------|
| CNAME  | password | `<project>.pages.dev` | ✅ |

---

## Dependencies

| Package | Purpose | Known CVEs |
|---------|---------|-----------|
| react ^19 | UI framework | None at install time |
| react-dom ^19 | DOM renderer | None at install time |
| vite ^8 | Build tool | None at install time |
| tailwindcss ^4 | Styling | None at install time |
| vitest ^3 | Unit testing | None at install time |
| @testing-library/react ^16 | Component testing | None at install time |

> Run `npm audit` before each production deploy. Zero high/critical vulnerabilities allowed per project standards.

---

## Security notes

- **All password generation happens 100% client-side** using `crypto.getRandomValues()` (CSPRNG).
- `Math.random()` is never used — it is a PRNG, not a CSPRNG, and is predictable.
- Generated passwords are never sent to any server, stored in any database, or captured by analytics.
- The password display uses a `<div role="textbox">` (not `<input type="password">`) to prevent browser autosave prompts.
- The clipboard API is used for copy — no fallback to deprecated `document.execCommand`.
- CSP blocks inline scripts and `unsafe-eval`.
- HSTS preloaded for HTTPS enforcement.
- No use of `eval()`, `dangerouslySetInnerHTML`, or `innerHTML` with unsanitized input.

---

## Lighthouse targets

| Metric | Target |
|--------|--------|
| Performance | ≥ 90 |
| Accessibility | ≥ 90 |
| Best Practices | ≥ 90 |
| SEO | ≥ 90 |
