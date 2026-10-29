# Mobile layout verification

19 October 2026

- Fixed the phone hero's off-center portrait and moved the location badge clear of the face.
- Centered complete project screenshots in consistent gallery frames. Detail pages preserve each image's full intrinsic ratio.
- Corrected intrinsic image dimensions, including the tall IntentDesk capture, to reserve layout space.
- Made the home project strip scroll and snap naturally on phones; disabled its scroll-linked movement on small screens and coarse pointers.
- Preserved complete mobile personal photos, added safe-area support, 44px filter targets and touch feedback, and gated hover styles to supported input devices.
- Versioned the shared assets so returning visitors receive the mobile update.

Browser viewport checks cover home, gallery and IntentDesk at 320×568, 390×844, 430×932, 768×1024, 844×390 and 1440×900. The measured content has no horizontal page overflow at these sizes. All nine detail pages were checked at 320px; their images loaded and their titles, actions and tables fit the page.

The Data & ML filter returned the four matching projects, All projects restored nine, and the mobile navigation opened, trapped the modal interaction, locked document scrolling and closed correctly. Desktop appearance and mobile image placement were inspected visually. The mechanical design detector ran once; remaining advisories concern existing reference-led styling documented in DESIGN.md. JavaScript syntax checks passed.

This is browser viewport verification, not a physical iOS/Android hardware test. Notch insets and native touch behavior are implemented through standard browser CSS; a physical-device check remains useful.

The existing résumé PDF and project order are preserved.
