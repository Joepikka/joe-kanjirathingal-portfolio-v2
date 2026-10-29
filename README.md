# Joe Kanjirathingal — portfolio

A responsive portfolio built with plain HTML, CSS and JavaScript, using Dennis Snellenberg's portfolio as the requested visual reference and Joe's own content and imagery.

Live site: https://joe-kanjirathingal-portfolio.vercel.app/

Vercel deployment: dpl_3KXAAQPKjzMQkafNhh1ZaUcRMkKg (production, 19 October 2026).

## Pages

- `index.html`: portrait opening, selected projects, About, education and contact.
- `work.html`: all nine projects, with Data & ML and web-application filters.
- `project.html?id=intentdesk`: project details; available IDs are defined in `projects.js`.

## Edit the content

Edit `projects.js` for titles, project descriptions, technologies, repository URLs and live demo URLs. Edit `index.html` for the biography, education and contact links. Colors, type, layout and responsive rules are in `styles.css`; interaction behavior is in `app.js`.

The source needs no package installation or build step. Serve this folder with a static web server. For Vercel use the Other framework preset, no build command, and this folder as the output directory. `vercel.json` supplies the static configuration.

## Verified content

Identity, education and background came from Joe's LinkedIn profile on 18 October 2026. Project descriptions were checked against GitHub source/READMEs, LinkedIn project descriptions and live previews. Private repositories are not exposed through source links. No employment history, professional-client results or new qualifications were invented.

IntentDesk's benchmark result is scoped to its published test; EV suitability labels are synthetic and need real-world validation. Lilly's paused Supabase backend was restored on 18 October 2026. Anonymous landing/menu requests returned HTTP 200; Google sign-in initiation reached Google. No orders, payments or authenticated staff workflows were tested.

## Images and accessibility

The original supplied photograph is preserved in About. The studio and desk portraits are AI-generated likeness images based on that photograph; they are not documentary evidence of a workplace. See `ASSETS.md` for provenance.

The moving name can be paused, operating-system reduced-motion preferences are respected, the navigation supports Escape and keyboard focus restoration, project filters announce result counts, and every project has a standalone detail page and recovery for unknown IDs.

## Validation

Checked desktop and mobile rendering, the actual in-app browser viewport, project filters, details, keyboard menu behavior, missing-project recovery, image loading, source syntax, local HTTP responses and asset integrity. No analytics, contact form or server database is included.

## Portfolio improvements

All nine project pages now explain the problem, project work, architecture and outcomes or limitations. IntentDesk includes its fixed benchmark comparison and unsupported-input failure. Lilly's POS and IntentDesk include 36-second silent screenshot walkthroughs with captions and transcripts. These use genuine captures and published results, not customer-performance demonstrations.

The contact email joepikka5@gmail.com was explicitly approved for public use. A one-page résumé is available at assets/joe-kanjirathingal-resume.pdf. Mobile shows the full name immediately; WebP image variants reduce the original large-image payload by about 88%. Videos load only when requested.

## GitHub catalogue review

Reviewed all 12 connected owner repositories on 18 October 2026. The portfolio contains nine distinct project families: Lilly’s POS, IntentDesk, La Liga ML Forecasting, Kerala Crime Map, Thrissur EV Site Selection, Meme Coin Lab, Forex Demo Research Platform, Smile Dental and CookSmart. CookSmart-ApplePie, CookSmart-ApplePie-Scroll and the earlier lillys preview are grouped into their canonical projects. See PROJECT_REVIEW.md.

Every case study includes an implementation flow, source-grounded features, architecture and limitations. The three new project covers are explicitly labeled AI-generated concept illustrations. Private GitHub repositories are not linked as public source. La Liga’s comparison preserves its unsuccessful newer-model result; Forex is demo-only and Meme Coin Lab is research/draft preparation.
