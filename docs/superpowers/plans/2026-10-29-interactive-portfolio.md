# Interactive Portfolio Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Deliver a separate mobile-optimized preview with all ten agreed additions while leaving production unchanged.
**Architecture:** Retain static pages and existing content. Bundle a small enhancement entry and a lazy Three.js entry; generate static project routes and social cards at build time.
**Tech Stack:** HTML, CSS, JavaScript, Three.js, esbuild, sharp, Node test runner.
**Spec:** ../specs/2026-10-29-interactive-portfolio-design.md

## Global Constraints
- Production must remain unchanged; deploy only to preview.
- Preserve all existing factual project content and ongoing six-month training.
- Synthetic vector examples must be labelled; never invent real model outputs or personal achievements.
- No paid APIs or new runtime backend.
- Target viewports: 375x812, 768x1024, 1440x900.

## Review Focus
- Empty/whitespace/multi-word searches must produce sensible results and counts.
- Storage denial and invalid theme values must not break the page.
- Missing WebGL or reduced motion must retain usable content.
- Narrow-screen gestures must allow scrolling and buttons must remain reachable.
- Generated social cards and static project pages must agree with the project catalogue.

### Task 1: Core behavior and accessible controls
Files: src/core.mjs, src/enhancements.js, theme.js, enhancements.css, tests/core.test.mjs; modify all root HTML pages.
Consumes: existing window.portfolioProjects. Produces: searchProjects(projects, query), resolveTheme(preference, systemDark), makeVectorSamples(), nearestSample(samples, point), and accessible enhancement controls.
- [ ] Write node tests with literal search and theme fixtures; run and observe failure before implementation.
- [ ] Implement the core and wire the theme selector, search dialog and copy controls.
- [ ] Run node --test tests/core.test.mjs and manually check controls in browser.

### Task 2: Learning and interactive experiments
Files: journal.html, lab.html, src/scenes.js; modify index.html and enhancements.css.
Consumes: core synthetic samples and original project screenshots. Produces: pipeline narrative, selected sample readout, 3D device/network/scatter with fallbacks, source-grounded study notes.
- [ ] Test deterministic vectors, nearest selection and invalid inputs before implementation.
- [ ] Implement static accessible content first and then lazy scenes.
- [ ] Check mobile explicit activation, reduced-motion behavior and keyboard sample selection.

### Task 3: Build, real share pages and mobile polish
Files: package.json, scripts/build.mjs, tests/build.test.mjs, projects/*.html, assets/social/*.png; modify app.js, README.md, vercel.json.
Consumes: original catalogue, root HTML templates and new entries. Produces: dist/ with complete static site and individual project metadata.
- [ ] Write build assertions for every catalogue route and distinct social metadata, then observe failure on baseline.
- [ ] Generate pages and PNGs, bundle local modules, preserve legacy links, and optimize font/image loading.
- [ ] Run npm test and npm run build; verify local links and assets.

### Task 4: Browser QA and separate preview
Files: QA.md and screenshots/evidence in parent outputs directory.
Consumes: dist/. Produces: reviewed preview URL and production-unchanged evidence.
- [ ] Serve locally and inspect all three widths, interactive states, keyboard flows, errors and dark contrast.
- [ ] Review the whole diff and run the final suite and security checks.
- [ ] Create a preview deployment, wait until READY, verify the hosted site, and confirm production deployment is unchanged.
- [ ] Package source and report preview URL, verified features and any real limitations.
