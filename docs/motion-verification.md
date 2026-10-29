# Motion edition verification

29 October 2026. Branch: `preview/motion-polish`.

Preview: https://joe-kanjirathingal-portfolio-76vddzz69-joepikkai.vercel.app/
Vercel deployment: `dpl_FLGs57yk8N3YWkJzN6KGm7hYKrzf`, READY, target `staging`.
Production before and after: `dpl_4FyqyCvhaVjMWewqP7PgBY9nKEA4`. No promotion performed.

## Checks completed

- Production build passes. All 10 automated tests pass, including two new tests first observed failing before implementation: motion policy (pause/reduced preference/hidden tab) and bounded pointer depth. Existing static routes, social images, local assets, project search, theme logic and lab data tests still pass.
- Full `npm audit`: zero known vulnerabilities. `node --check src/motion.js` and `git diff --check` pass. Git reports line-ending normalization notices on Windows; no whitespace errors.
- Actual browser rendering at 320×800, 375×812, 768×1024 and 1440×900. Document scroll widths were 311, 366, 759 and 1431 pixels respectively (the browser reserves 9 pixels for its scrollbar); no horizontal overflow.
- Desktop: sticky project showcase changes from IntentDesk to La Liga on scroll. Pointer movement produces bounded image rotation and follows the pointer with the Explore cue. Hero portrait and SVG field move in opposite directions. Keyboard Shift+Tab onto IntentDesk updates the stage title and destination to the IntentDesk case study.
- Pause clears GSAP transforms and reveals education text at full opacity. The paused state survives navigation from home to Notes; Resume motion restores enhancement. On 320-pixel inner pages the motion control is inside the navigation menu, leaving a gap between the theme and menu controls.
- Mobile: the desktop sticky stage is replaced by image cards. The 375-pixel gallery shows real QuoteCheck and IntentDesk images, with links and readable labels. Project concept art is explicitly labelled. At 768 pixels the gallery has two columns.
- Search from the Notes page returns QuoteCheck and IntentDesk for `python fastapi`; Escape closes the dialog and restores focus to Search projects.
- Hosted preview renders the new stage and loads the enhanced script successfully. Captured browser warning/error logs were empty.

## Scope of evidence

The reduced-motion preference is covered by policy tests, media-query wiring, disabled-control behavior and source review; the operating-system preference was not forcibly changed. Hidden-tab cleanup is implemented and policy-tested, not profiled with a power monitor. This is browser responsive testing, not a physical-device or full screen-reader audit. No field Core Web Vitals measurement or comprehensive accessibility certification is claimed. The existing lab's detailed 3D verification is recorded in QA.md from the first preview; its unchanged renderer was not exhaustively retested in this motion iteration.

Screenshots in the parent outputs folder: `motion-hero-1440.jpg`, `motion-desktop-1440.jpg`, `motion-mobile-375.jpg`. These show real browser rendering, not design mockups.

Free tool research and implementation scope: [motion-edition.md](motion-edition.md).
