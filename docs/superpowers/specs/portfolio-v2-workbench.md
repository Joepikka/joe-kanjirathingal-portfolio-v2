# Portfolio V2 workbench

The portfolio serves recruiters who want direct access to a résumé and case studies, and visitors who want to play with the work. The V2 homepage will place an editorial studio portrait after the opening, then a workbench with three original Three.js models for market signals, retail events and language matching. Each chapter leads to the real project and calls its model illustrative.

Desktop visitors can scroll the chapter text while the stage stays in view. Everyone can select a chapter, open the case study or start, turn and close the 3D view. The screenshot stage and case-study links work with unavailable WebGL. Phones use a normal vertical layout. The scene respects the site's motion control and reduced-motion setting. The portrait and blue swipe trail retain their current placement.

Bruno Simon's portfolio is a reference for inspectable 3D objects (https://bruno-simon.com/). Lusion's portfolio is a reference for pacing a visual sequence through scrolling (https://lusion.co/). The objects, typography, imagery and interface in this workbench are designed for Joe's work.

## Implementation checks

1. Add still previews, scene controls and chapter links. Verify that the chapter closest to the viewport reading point selects the corresponding preview.
2. Load three procedural models with the existing Three.js bundle on request. Verify orientation controls, context-loss fallback and idle rendering.
3. Add two generated portraits and a small selection of supplied photos using WebP, responsive sources and explicit captions. Check narrow, landscape and desktop layouts.
4. Run preview and production build checks, publish V2 from its own GitHub repository, and verify the V2 homepage, assets and original homepage fingerprint.
