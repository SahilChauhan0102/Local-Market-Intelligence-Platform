# World Time Comparison — worldtime.localgali.in

A free, private, client-side world time comparison tool. Shows live times across multiple cities simultaneously, DST-correct, using the browser's built-in `Intl.DateTimeFormat` API with IANA timezone data. Also supports a custom date/time mode for scheduling across timezones.

**Live URL:** https://worldtime.localgali.in

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
3. Set **Root directory** to `tools/world-time`.
4. Set **Build command**: `npm run build`
5. Set **Build output directory**: `dist`
6. Add environment variables (`VITE_UPI_ID`, `VITE_UPI_NAME`) in the Pages settings.
7. In Cloudflare DNS, add a CNAME record:
   - **Name**: `worldtime`
   - **Target**: `<your-pages-project>.pages.dev`
   - **Proxied**: ✅ Yes

The `public/_headers` file sets HSTS, CSP, and other security headers automatically via Cloudflare Pages.

---

## DNS (subdomain setup)

| Record | Name | Target | Proxy |
|--------|------|--------|-------|
| CNAME  | worldtime | `<project>.pages.dev` | ✅ |

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

- All timezone conversions run 100% client-side using the browser's `Intl.DateTimeFormat` API.
- No timezone selections, search queries, or usage data is sent to any server.
- No API keys required — `Intl.DateTimeFormat` is a browser built-in with IANA timezone data.
- CSP blocks inline scripts and `unsafe-eval`.
- HSTS preloaded for HTTPS enforcement.
- The live clock `setInterval` is always cleaned up on component unmount to prevent memory leaks.
- No use of `eval()`, `dangerouslySetInnerHTML`, or `innerHTML` with unsanitized input.

---

## Lighthouse targets

| Metric | Target |
|--------|--------|
| Performance | ≥ 90 |
| Accessibility | ≥ 90 |
| Best Practices | ≥ 90 |
| SEO | ≥ 90 |
