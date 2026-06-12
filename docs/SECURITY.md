# Security Review & Hardening Notes — Hometown Serenity

> **Scope:** Static Astro 5 site (Astro 5.18.2 + Tailwind CSS v4, TypeScript) deployed on Netlify.
> **Date:** 2026-06-11 · **Status:** advisory / reference doc.
> **Disclaimer:** Technical security guidance. The privacy/compliance section is general information, **not legal advice** — confirm with a privacy attorney for your jurisdiction.

This document records the current security posture, what's already done well, and a prioritized list of hardening actions. Findings are grounded in the actual code (`netlify.toml`, `src/layouts/Layout.astro`, `src/components/*.astro`) and verified against official advisories/docs.

---

## Posture at a glance

| Area | Status | Action |
|------|--------|--------|
| External links (`target="_blank"`) | ✅ Already safe — every one has `rel="noopener noreferrer"` | None |
| JSON-LD via `set:html` | ✅ Safe — trusted, hardcoded data through `JSON.stringify` | None |
| `define:vars` XSS advisory | ✅ Not triggered — directive is unused | Upgrade for hygiene (low priority) |
| Server-island advisory | ✅ No exposure — no server islands | None |
| HTTP headers (XFO, nosniff, Referrer, Permissions) | ✅ Present in `netlify.toml` | None |
| Content-Security-Policy | ⚠️ **Missing** | **Add (must-fix)** |
| HSTS (`Strict-Transport-Security`) | ⚠️ **Missing** | **Add (must-fix, after DNS cutover)** |
| Astro on a supported/patched major | ⚠️ 5.x is a major behind (6.4.4 latest) | Plan upgrade (medium) |
| Privacy policy / disclaimers | ⚠️ Stub only (`/privacy`) | Flesh out (medium) |

---

## 1. Dependency advisories (Astro)

`npm audit` reports one moderate finding against `astro <= 6.1.9`, combining two advisories. Verified affected/fixed versions:

| Advisory | CVE | What | Affected | Fixed | Our exposure |
|----------|-----|------|----------|-------|--------------|
| [GHSA-j687-52p2-xcff](https://github.com/advisories/GHSA-j687-52p2-xcff) | CVE-2026-41067 | XSS in `define:vars` — incomplete `</script>` regex sanitization (case/whitespace bypass like `</Script>`, `</script />`) | `< 6.1.6` | **6.1.6** | **None in practice** — the site uses **no `define:vars`** (confirmed: only `set:html` for JSON-LD). Severity Moderate (CVSS 6.1). |
| [GHSA-xr5h-phrj-8vxv](https://github.com/advisories/GHSA-xr5h-phrj-8vxv) | CVE-2026-45028 | Server-island encrypted props/slots cross-component replay → possible XSS | `< 6.1.10` | **6.1.10** | **None** — requires server islands, which this static site does not use. Severity Low (CVSS 2.9). |

**Key facts**
- The affected range `< 6.1.6` technically includes our `5.18.2`, but **neither vulnerable code path is exercised** by this site (no `define:vars`, no server islands). The `define:vars` XSS is reachable only on **SSR** deployments where user input flows in at runtime — a prerendered `output: 'static'` build resolves these at build time.
- **The other 2026 Astro advisories don't apply here either.** They all target server-only features this static site doesn't use: Server Islands DoS ([GHSA-3rmj-9m5h-8fpv](https://github.com/advisories/GHSA-3rmj-9m5h-8fpv)), Server Actions DoS (GHSA-jm64-8m5q-4qh8), SSRF via Host header (GHSA-qq67-mvv5-fw3g), `x-astro-path` override (GHSA-mr6q-rp88-fx84), allowlist bypass (GHSA-g735-7g2w-hh3f), and if-match cache poisoning (GHSA-c57f-mm3j-27q9). Worth re-checking **if SSR/server output is ever enabled.**
- **There is no 5.x backport** — both fixes land in the **Astro 6.x** line. `npm audit fix --force` would install `astro@6.4.4`, a **breaking major upgrade**.
- Recommendation: **don't `--force` reactively.** Plan a deliberate Astro 5 → 6 migration (see the [v6 upgrade guide](https://docs.astro.build/en/guides/upgrade-to/v6/)) so the site stays on a security-maintained major. Astro provides security-only maintenance for one previous major.

**Dependency hygiene** ([npm audit docs](https://docs.npmjs.com/cli/v11/commands/npm-audit/), [OWASP NPM Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/NPM_Security_Cheat_Sheet.html))
- `npm audit` does **not** assess reachability — it flags tree presence, not actual exploitability. Triage each finding against real usage (as done above).
- Keep `package-lock.json` committed; use **`npm ci`** in CI for reproducible installs.
- For stuck transitive vulns, prefer a targeted **`overrides`** entry in `package.json` (npm ≥ 8.3) over `--force`.
- Consider enabling **Dependabot** restricted to patch/minor (`version-update-types: ["patch","minor"]`) to avoid surprise major bumps.

---

## 2. HTTP security headers (Netlify)

Current `netlify.toml` already sets, for `/*`: `X-Frame-Options = SAMEORIGIN`, `X-Content-Type-Options = nosniff`, `Referrer-Policy = strict-origin-when-cross-origin`, `Permissions-Policy = camera=(), microphone=(), geolocation=()`. Good baseline.

**Gaps:** no **Content-Security-Policy** and no **HSTS**. Recommended additions (merge into the existing `[[headers]] for = "/*"` block):

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
    # --- add ---
    Content-Security-Policy = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; frame-src https://calendar.app.google https://*.jotform.com; form-action 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; upgrade-insecure-requests"
    # Enable HSTS ONLY after hometownserenity.com is live on Netlify over HTTPS:
    # Strict-Transport-Security = "max-age=31536000; includeSubDomains"
```

**CSP notes for this site** ([web.dev CSP](https://web.dev/articles/strict-csp), [Netlify headers](https://docs.netlify.com/manage/routing/headers/))
- **Google Fonts needs two origins:** `https://fonts.googleapis.com` in `style-src` (the CSS) and `https://fonts.gstatic.com` in `font-src` (the font files).
- **`'unsafe-inline'` in `style-src`** is included because Tailwind/Astro emit some inline styles; tightening this to hashes is a later refinement.
- **JSON-LD is not executable** — `<script type="application/ld+json">` does **not** need `script-src`/`'unsafe-inline'` and won't trip CSP. So `script-src 'self'` is sufficient (the only other inline script, the reveal observer, is `is:inline`; if CSP blocks it, either move it to an external file under `/` or add its `'sha256-…'` hash — browsers print the needed hash in the console).
- **Static site → use hashes, not nonces.** Nonces require a per-request server; a prerendered Astro build can't regenerate them.
- **`frame-src`** must list the embed/booking origins actually used (Google Calendar `calendar.app.google`, JotForm `*.jotform.com`). Verify exact origins via browser CSP violation logs before enforcing.
- **Roll out with `Content-Security-Policy-Report-Only` first** to catch breakage without blocking, then switch to enforcing.
- **HSTS only after DNS cutover** — committing the site to HTTPS-only before the custom domain is live can lock you out of the apex over HTTP.

---

## 3. External links & embeds

- ✅ **Reverse-tabnabbing is handled.** Every `target="_blank"` link carries `rel="noopener noreferrer"` (`Button.astro`, `Resources.astro`, `MobileCTA.astro`, `Footer.astro`, `Connect.astro`, `Header.astro`). Modern Chromium (88+) implies `noopener` anyway, but keeping it explicit covers older engines and adds `noreferrer` privacy. ([OWASP Reverse Tabnabbing](https://owasp.org/www-community/attacks/Reverse_Tabnabbing), [web.dev](https://web.dev/external-anchors-use-rel-noopener/))
- ✅ **JSON-LD via `set:html` is safe** because the data is trusted and hardcoded in `src/data/site.ts`, serialized with `JSON.stringify`. `set:html` does not auto-escape (like `dangerouslySetInnerHTML`), so this must stay true: **never feed user/untrusted input into `set:html`.** The one theoretical risk — a literal `</script>` inside the JSON breaking out of the tag — is moot for controlled content but is the reason to keep that data first-party. ([Astro directives](https://docs.astro.build/en/reference/directives-reference/), [OWASP XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html))
- **If form/booking widgets are ever embedded as iframes** (currently they're outbound links), sandbox them: `sandbox="allow-scripts allow-same-origin allow-forms allow-popups"` + `referrerpolicy="strict-origin-when-cross-origin"`. ([web.dev sandboxed iframes](https://web.dev/articles/sandboxed-iframes))

---

## 4. Privacy & compliance (general info — not legal advice)

- **Cookie banner:** Not federally mandated in the US. This site appears to ship no analytics/tracking cookies — if that stays true, no banner is needed. A banner becomes relevant if you add analytics/tracking and have **EU visitors** (GDPR opt-in) or qualify under **CCPA/CPRA** (large-business thresholds). ([FTC](https://www.ftc.gov/business-guidance/privacy-security), [Cookiebot/GDPR](https://www.cookiebot.com/en/gdpr-cookies/))
- **HIPAA:** A cash-only hypnotherapy/coaching practice that does **not** submit insurance claims electronically is generally **not a HIPAA covered entity**. If insurance is ever billed electronically, re-evaluate and execute BAAs (JotForm offers a HIPAA tier + BAA on higher plans). ([HIPAA Journal](https://www.hipaajournal.com/covered-entities-under-hipaa/), [HHS](https://www.hhs.gov/hipaa/for-professionals/covered-entities/index.html))
- **Third-party forms (JotForm) / booking (Google):** You are the data controller; they are processors. Document what's collected and disclose these integrations in the privacy policy. Execute JotForm's DPA if handling regulated data. ([JotForm privacy](https://www.jotform.com/privacy/))
- **Privacy policy:** The FTC doesn't require one, but if published you must follow it. The current `/privacy` is a stub — flesh it out to cover: data collected (name/email/phone/booking details), purpose, third parties (JotForm, Google), retention, user rights + contact, and security measures.
- **Wellness disclaimer:** Recommended (mandatory only in CA/FL/IL). State that services are for wellness/coaching, are **not medical/psychological diagnosis or treatment**, and are not a substitute for licensed care. ([TermsFeed](https://www.termsfeed.com/blog/disclaimers-health-coaches/))

---

## Prioritized remediation checklist

**Must-fix (high value, low effort)**
1. Add **Content-Security-Policy** to `netlify.toml` (start in `Report-Only`, then enforce). §2
2. Add **HSTS** — but **only after** the custom domain is live on Netlify over HTTPS. §2

**Should-fix (medium)**
3. Flesh out the **privacy policy** at `/privacy` and add a **wellness disclaimer**. §4
4. Plan the **Astro 5 → 6 upgrade** to stay on a security-maintained major; clears the `npm audit` finding too. §1
5. Use **`npm ci`** in CI and (optionally) enable **Dependabot** (patch/minor only). §1

**Nice-to-have (low / future)**
6. Tighten CSP: replace `'unsafe-inline'` in `style-src` with hashes; add `'sha256-…'` for the inline reveal script (or externalize it). §2
7. If any third-party widget is moved to an **iframe embed**, apply `sandbox` + `referrerpolicy`. §3

---

## Sources

- Astro advisories: [GHSA-j687-52p2-xcff](https://github.com/advisories/GHSA-j687-52p2-xcff) · [GHSA-xr5h-phrj-8vxv](https://github.com/advisories/GHSA-xr5h-phrj-8vxv) · [Astro v6 upgrade guide](https://docs.astro.build/en/guides/upgrade-to/v6/) · [Astro security](https://github.com/withastro/astro/security)
- npm/deps: [npm audit](https://docs.npmjs.com/cli/v11/commands/npm-audit/) · [OWASP NPM Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/NPM_Security_Cheat_Sheet.html)
- Headers/CSP: [Netlify custom headers](https://docs.netlify.com/manage/routing/headers/) · [Netlify CSP](https://docs.netlify.com/manage/security/content-security-policy/) · [OWASP Secure Headers](https://owasp.org/www-project-secure-headers/) · [web.dev strict CSP](https://web.dev/articles/strict-csp) · [OWASP HSTS](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html)
- Links/embeds: [OWASP Reverse Tabnabbing](https://owasp.org/www-community/attacks/Reverse_Tabnabbing) · [web.dev sandboxed iframes](https://web.dev/articles/sandboxed-iframes) · [Astro directives](https://docs.astro.build/en/reference/directives-reference/) · [OWASP XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- Privacy: [FTC business guidance](https://www.ftc.gov/business-guidance/privacy-security) · [HIPAA covered entities (HHS)](https://www.hhs.gov/hipaa/for-professionals/covered-entities/index.html) · [HIPAA Journal](https://www.hipaajournal.com/covered-entities-under-hipaa/) · [JotForm privacy](https://www.jotform.com/privacy/) · [Health-coach disclaimers](https://www.termsfeed.com/blog/disclaimers-health-coaches/)
