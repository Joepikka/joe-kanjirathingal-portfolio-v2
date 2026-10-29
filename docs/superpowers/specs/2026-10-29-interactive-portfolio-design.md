# Separate interactive portfolio preview

## Intent and authorization
The user approved implementing all ten additions from this chat and asked for a separate preview, mobile optimization, and replacement only after their later review. This document records that accepted scope. Production must remain unchanged.

## Approach
Extend the original static HTML/CSS/JavaScript source, copied from the earlier portfolio workspace. This retains the current design, images, ten project families, truthful limitations, resume, and six-month training. A Next.js rewrite adds migration cost without enabling anything required here; it is not needed. A standalone replacement design would discard an identity the user did not ask to change.

The implementation remains static. Three.js is bundled locally and loaded only near interactive sections. Node scripts generate individual project pages and social preview PNGs. No runtime backend, paid API, remote AI inference, or third-party tracking is added.

## Features
1. Persistent light/dark/system preference, respecting the system when selected. All pages and dialogs must remain readable; storage failure must not prevent navigation.
2. Accessible project-search dialog, Ctrl/Cmd+K shortcut, query matching across title, discipline, technologies, and summary, clear empty result state, and mobile access. Existing category filters remain.
3. Learning journal, using source-grounded study notes about existing projects and ongoing Python training. Do not invent dated personal progress, completed qualifications, or achievements.
4. Copy-email button with success feedback and selectable-text recovery if clipboard access fails. Code samples in the journal gain copy buttons.
5. Ten static project URLs with server-readable social metadata, per-project PNG share cards, and preserved legacy query links.
6. Interactive ML pipeline explainer with individually selectable steps and a scroll-controlled desktop narrative. All content must remain available without animation or JavaScript.
7. Inspectable Three.js text-vector scatter. Since original embedding coordinates are unavailable, display an explicitly illustrative, synthetic dataset. Do not present it as IntentDesk output, measured embeddings, or an evaluation.
8. A restrained decorative network visualization beside the interactive explainer; never obscure the portrait, name, primary navigation, or resume CTA.
9. A rotatable 3D device preview containing an existing genuine application screenshot, with a labelled static image until the visitor requests 3D. Touch scrolling must remain usable.
10. Scroll narrative connects data, representation, evaluation, and human review. Reduced-motion and mobile versions use explicit step buttons and stable content.

## Design contract
Purpose: let recruiters understand Joe's work and inspect a concrete demonstration. Audience: internship reviewers, including mobile visitors. Tone: editorial and technical, extending current DM Sans, warm off-white, charcoal, muted sage and cobalt accents. Keep existing project rows and original imagery. The memorable addition is an interactive experiment, not a new decorative hero.

Primary actions: explore projects and download resume. Search/theme controls must be visible and have at least 44px touch targets. Interactive controls have visible labels, keyboard support, focus indicators, and current-state feedback. Never rely on canvas alone to convey information.

Target viewports: 375x812, 768x1024, 1440x900. No page-wide horizontal overflow, no sticky visual covering controls, no hover-only access. On narrow screens render static fallbacks initially; explicit activation loads 3D. Cap renderer pixel ratio at 1.5 and pause render loops when offscreen, hidden, or global motion is paused. Reduced-motion prevents auto animation.

## Content states
Loading: static preview and text remain available during module loading. Empty: search says no matches and offers clearing. Error: failed 3D retains its static alternative; clipboard failure offers selecting the visible text. Partial: original model outputs are unavailable, so examples are labelled synthetic. Success: selection, copy and filter changes announce feedback. Permission: no accounts or permissions required; clipboard denial has a recovery path.

## Verification
Unit tests cover multi-word search and empty input, theme resolution, invalid preferences, synthetic vector determinism and nearest-point selection. Build checks all ten generated routes, unique metadata, local assets and safe external URLs. Browser checks light/dark/system UI, keyboard search and Escape, copy controls, journal links, legacy/static project routes, mobile menus, synthetic sample selection, pipeline controls, WebGL fallback and 3D activation. Check all three target widths and no critical console errors. Deployment target must be preview; verify production deployment ID before and after.
