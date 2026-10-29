# Interactive preview verification — 29 October 2026

Preview: https://joe-kanjirathingal-portfolio-dybadxf15-joepikkai.vercel.app/
Deployment: dpl_EJCc5AnYGA9cWY1SWY9SJRemXfKK (READY, staging/preview).

## Confirmed
- `npm run build` succeeds and creates ten static project pages and ten 1200×630 PNG cards.
- `npm test`: eight tests pass, zero failures. Tests check search word matching/empty input, theme defaults, deterministic illustrative samples, point-selection math, pipeline boundaries, all project pages, skip-link destinations and referenced local assets.
- Node syntax checks pass for source/build scripts and original app/theme scripts. `git diff --check` passes. npm audit reports zero known vulnerabilities, including development dependencies. Targeted secret-pattern scan found no matches.
- Mobile (375×812): homepage, catalogue, lab, journal, and IntentDesk page have no page-wide horizontal overflow. Search/theme/menu controls are available; the resume link remains visible. Notes code scrolls within its block.
- Tablet (768×1024) and desktop (1440×900): lab layout and controls reviewed in screenshots; no page-wide horizontal overflow.
- Mobile lab begins with zero WebGL canvases. Start/stop 3D works; stopping removes the canvas. Selecting sentence 06 before activation and restarting 3D preserves the selected orange point and readout.
- Desktop 3D scatter and device rendered successfully. Pipeline steps update their matching explanation. Empty search, Escape closing/focus return, theme persistence, Copy code feedback, category filtering and unknown-project recovery were exercised.
- Browser warning/error log returned no entries during the final hosted lab check.
- Fresh independent code review found two issues; selection initialization and no-JavaScript text fallback were fixed and re-reviewed with no remaining P1/P2 findings.

## Scope and limitations
- Vector coordinates and sentences are explicitly illustrative, not original model embeddings or benchmark results.
- Original academic/training/project facts and source limitations are preserved. No work experience or completed certification was added.
- Reduced-motion, storage denial, clipboard denial, and unavailable-WebGL fallback branches were inspected in source; they were not forcibly simulated in the browser. No full assistive-technology audit or field Core Web Vitals measurement was performed.
- The full no-JavaScript lab fallback was inspected in source. Static case studies include content before JavaScript runs.
- The preview is intentionally excluded from search indexing. It must be rebuilt for the final domain and its preview-only indexing restriction removed only after the user approves replacement.
- The source is a separate local Git repository/branch; it has not been pushed to GitHub. The original Vercel project had no Git connection.

## Production isolation
Main domain: https://joe-kanjirathingal-portfolio.vercel.app/
Unchanged production deployment: dpl_4FyqyCvhaVjMWewqP7PgBY9nKEA4.
The original local source folder was not edited. Only preview deployments were created.
