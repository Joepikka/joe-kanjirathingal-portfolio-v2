# Portfolio motion edition — 29 October 2026

Scope: a new preview on `preview/motion-polish`. Production and the recovered original source stay untouched. Preserve all factual biography, education, project evidence, accessible navigation, search, themes and the lab.

## Visual direction and acceptance checks

Keep the editorial type, sage portrait background, cobalt accents and real project screenshots. Add a pointer-responsive portrait/data field, a sticky project stage with scroll/hover/focus selection, gentle image depth and section reveals. Mobile uses a vertical image gallery with native scrolling. No scroll hijacking, cursor replacement, fabricated credentials or synthetic project screenshots.

Pause motion persists across pages. Reduced-motion preferences take priority. Hidden tabs stop decorative animations. Without animation JavaScript, existing content remains usable. Verify pause/resume, project focus selection, image loading, narrow screens, keyboard navigation and existing search/lab functionality before a separate staging deployment.

## Reference research and free availability

- [GSAP official announcement](https://webflow.com/updates/gsap-becomes-free): the complete GSAP toolkit is free, including commercial use. [Standard license](https://gsap.com/standard-license) applies; free does not mean public domain. Use locally bundled GSAP and ScrollTrigger from the official npm package. Keep its license comments.
- [ScrollTrigger documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/): viewport reveals and native-scroll-linked image depth. Original implementation in this repository; no copied showcase templates.
- [ThreeUI browse](https://threeui.com/browse?sort=recent): inspected its catalog of text effects, fields, buttons and 3D components. The catalog distinguishes Community/FREE from PRO assets. Use it for visual research; no paid source or artwork imported, and no blanket free-license claim.
- [21st plans](https://21st.dev/plans): browsing is free; its published free tier includes two component copies per day. [Terms](https://docs.21st.dev/terms) restrict automated scraping and separately protect demo/media assets. Reviewed public product information and available browser tooling; no bulk scrape, copied media, paid component, or component installation.
- [Taste Skill](https://www.tasteskill.dev/): its public page presents open-source design guidance, not a runtime animation engine. Its emphasis on typography, coherent hierarchy and purposeful motion informs the direction; no installation required.
- Framer and Figma were open as design tools. The existing code already supports a reviewable interactive preview, so no design-file edit, account setting, subscription or production publish is required.

Existing portrait studies and actual project images are sufficient. No new image generation or external image service is needed for this iteration.

## Implementation sequence

1. Research references and freeze a separate branch.
2. Write failing tests for motion policy and bounded pointer math.
3. Implement responsive showcase, decorative pointer depth, reveals and shared motion controls.
4. Build, test and inspect desktop/mobile interactions, then fix evidence-backed issues.
5. Deploy only to Vercel staging, verify production identity, and provide screenshots and source.
