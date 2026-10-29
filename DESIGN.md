---
name: Joe Kanjirathingal Portfolio
description: A portrait-led portfolio for data, machine learning and useful software.
colors:
  ink: "#1c1d20"
  paper: "#f8f8f5"
  grey: "#858e8c"
  blue: "#354bdf"
  blue-hover: "#2334b4"
  white: "#ffffff"
  muted: "#626469"
  line: "#d2d3d0"
  education: "#e9eae7"
  secondary-copy: "#55585d"
  dark-line: "#55575a"
  lavender: "#e0ddeb"
  charcoal: "#34393b"
  sand: "#d5c8b2"
typography:
  display:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(110px, 14vw, 260px)"
    fontWeight: 400
    lineHeight: 1.18
    letterSpacing: "-0.04em"
  mobile-name:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(37px, 10.1vw, 72px)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.04em"
  case-study-title:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "30px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.035em"
  evidence-headline:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "38px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(40px, 5.6vw, 80px)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  page-title:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(56px, 8vw, 110px)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  project-title:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(32px, 4.7vw, 66px)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  title:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "32px"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  footer-headline:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(48px, 7vw, 96px)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.04em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  media-caption:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  circle: "50%"
  pill: "50px"
  filter: "30px"
spacing:
  page-gutter: "clamp(24px, 5vw, 88px)"
  gap-small: "15px"
  gap-medium: "24px"
  gap-large: "35px"
  frame-inset: "35px"
components:
  button-round:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.circle}"
    size: "165px"
  button-round-hover:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.circle}"
    size: "165px"
  button-round-blue:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.circle}"
    size: "165px"
  button-round-blue-hover:
    backgroundColor: "{colors.blue-hover}"
    textColor: "{colors.white}"
    rounded: "{rounded.circle}"
    size: "165px"
  pill-link:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "18px 32px"
  pill-link-dark:
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "18px 32px"
  pill-link-hover:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "18px 32px"
  filter-chip:
    textColor: "{colors.ink}"
    rounded: "{rounded.filter}"
    padding: "12px 23px"
  filter-chip-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.filter}"
    padding: "12px 23px"
  project-row:
    textColor: "{colors.ink}"
    typography: "{typography.project-title}"
    padding: "44px 30px"
  project-card:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
  navigation-panel:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    padding: "130px 65px 45px"
    width: "min(540px, 100vw)"
    height: "100dvh"
  menu-trigger:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.circle}"
    size: "74px"
  text-link:
    textColor: "{colors.ink}"
  mobile-hero-name:
    textColor: "{colors.white}"
    typography: "{typography.mobile-name}"
  mobile-resume:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.filter}"
    padding: "8px 14px"
  case-study-section:
    textColor: "{colors.ink}"
    typography: "{typography.case-study-title}"
    padding: "42px 0"
  evaluation-section:
    backgroundColor: "{colors.education}"
    textColor: "{colors.ink}"
    typography: "{typography.evidence-headline}"
    padding: "55px"
  video-walkthrough:
    textColor: "{colors.ink}"
    typography: "{typography.evidence-headline}"
  media-caption:
    textColor: "{colors.muted}"
    typography: "{typography.media-caption}"
  project-status:
    textColor: "{colors.muted}"
    typography: "{typography.label}"
  project-flow:
    textColor: "{colors.ink}"
    typography: "{typography.case-study-title}"
    padding: "65px 0 0"
  comparison-table:
    textColor: "{colors.ink}"
---

# Design System: Joe Kanjirathingal Portfolio

## Overview

**Creative North Star: "The Portrait-Led Portfolio"**

A full-height slate canvas introduces Joe through a large portrait, a moving white name on desktop, a static full name on mobile and a compact statement of his data and machine learning focus. The rest of the site opens into quiet paper surfaces, broad type, real project imagery and fine horizontal rules. The dense visual energy of the hero gives way to generous space for inspecting the work.

The visual system follows the user's chosen Dennis Snellenberg reference: editorial scale, circular actions, restrained framing, a sliding dark navigation panel and motion tied to interaction. Joe's original photograph appears in About and the contact avatar. The hero and desk portraits are AI-generated likeness studies based on that photograph; retain their existing alt text and the desk image's visible disclosure.

**Key Characteristics:**

- Large, regular-weight sans-serif typography.
- Slate, paper and ink surfaces with a vivid blue action accent.
- Square project imagery, horizontal rules and open page layouts.
- Circular actions and outlined pill links.
- Responsive motion with a visible pause control and reduced-motion support.

## Colors

Cool neutral surfaces carry the portrait and project imagery; blue identifies action and interaction.

### Primary

- **Blue:** Circular contact action, hover fills, selection background and focus outlines on paper surfaces.
- **Blue Hover:** The deeper fill used when the already-blue circular action is hovered.

### Neutral

- **Ink:** Default copy, the location hanger, circular controls, dark navigation and footer surfaces.
- **Paper:** Default page background and light copy in the main footer.
- **Grey:** The hero canvas and the small globe's circular background.
- **White:** Oversized hero name, dark-control labels and navigation text.
- **Muted:** Counts, captions and secondary labels on light surfaces.
- **Line:** Fine dividers and outlined controls on paper.
- **Education:** The education section, the curved edge above the contact section and the IntentDesk benchmark block.
- **Secondary Copy:** Skills, education supporting text and project notes.
- **Dark Line:** Outlined contact links on dark surfaces.
- **Lavender, Charcoal and Sand:** Reused project-image mounts in the work ribbon and associated project cards. Other projects carry their own image-mount color in their content data.

**The Surface Rule.** Preserve the shift from slate portrait hero to paper content to an ink contact area. Use image-mount colors within project presentation rather than as additional global action accents.

## Typography

**Display Font:** Self-hosted DM Sans variable font, with sans-serif fallback.  
**Body Font:** The same family. The installed face supports weights (100–1000); visible headings and ordinary copy primarily use regular weight (400).

**Character:** Clear and open, with tightly tracked large headings. Hierarchy comes from size, line breaks and space rather than multiple font families or heavy weight changes.

### Hierarchy

- **Display:** The repeating white name across the lower desktop hero. Under reduced motion it becomes a single wrapping name at (clamp(56px, 9.1vw, 140px)) with line height (1.02).
- **Mobile Name:** A static two-line full name replaces the marquee at the mobile breakpoint. Its recorded clamp and line height keep the complete surname visible; screens at or below (360px) use (9.7vw).
- **Case Study Title:** Regular-weight section headings alongside the case-study copy; mobile uses (27px).
- **Evidence Headline:** Benchmark, supplemental-evidence and video-section titles; mobile uses (31px).
- **Headline:** Large section statements, including the About title. The introduction uses a smaller statement scale (clamp(32px, 3.1vw, 48px)) and line height (1.25). Mobile section titles settle around (38–39px).
- **Page Title:** Work landing heading. Mobile uses (54px). Project detail headings use (clamp(48px, 7vw, 100px)) and (49px) on mobile.
- **Project Title:** Oversized titles in the homepage project list. They resolve to (47px) at the tablet breakpoint and (32px) on mobile.
- **Title:** Project-card title; mobile uses (29px). Education titles and skill-group headings use nearby context-specific sizes.
- **Footer Headline:** Large contact invitation; on mobile its size is (11vw).
- **Body:** Comfortable reading copy. About paragraphs use a maximum width of (43ch); project-detail paragraphs allow up to (65ch).
- **Label:** Counts and compact metadata. The site also uses (12px) for captions and supporting labels and (14px) for small links.
- **Media Caption:** Compact, comfortably spaced image-provenance labels under gallery media and project-detail mounts.

**The Type Rule.** Keep the shared DM Sans voice and regular-weight headings. Use the existing tight tracking for large type; keep ordinary body and labels naturally spaced.

## Layout

The shared content container has a maximum width of (1180px), inset by the fluid page gutter. The header spans the viewport. Homepage sections use generous vertical spacing: introduction (145px 110px), About (65px 140px), education (115px 130px) and contact (120px 35px).

The hero uses (100svh), with a desktop minimum height of (780px) and maximum of (1150px). Its portrait is anchored near the bottom and centered; the name crosses the lower figure. Location is attached to the left edge and the role sits to the right. On mobile the role moves above the portrait, the portrait becomes shorter, and the lower utility bar has a solid slate background. The static full name sits (142px) above the mobile hero's bottom, with a compact résumé pill below it at (84px).

Desktop introduction uses two unequal columns (1.8fr 1fr). About uses two equal columns; skills use three. Work cards use a two-column grid with a row gap of (70px) and column gap of (35px). Project details place their facts in three columns and their extended copy in two columns.

Responsive changes occur at (1050px), (720px) and a wide-screen adjustment at (1700px), with a compact-screen adjustment at (360px). At the mobile breakpoint, major content grids stack, project-row metadata moves beneath the title, work cards become a single column, education dates become a top row, and the desktop navigation gives way to a fixed circular trigger. The mobile hero has a minimum height of (680px) and maximum of (950px). Page gutters retain a minimum of (24px).

Case-study rows use the existing two-column proportions (1fr 1.4fr) and gap (14%), then stack on mobile. The evaluation block has an inset of (55px); on mobile it reaches the viewport edges and uses (35px) vertical padding with the shared page gutter. The native video remains a full-width (16:9) surface.

Project process flows use four equal columns beneath a single top rule. At the mobile breakpoint they become a two-by-two ordered grid. Gallery cards use a vertical flex layout so metadata aligns across adjacent cards despite different title lengths and media captions.

**The Reading Order Rule.** Preserve the same content sequence when columns stack. Mobile project titles, discipline labels and arrows remain together as one accessible link.

## Elevation & Depth

The page is primarily flat. Changes in surface color, fine dividers, oversized type and overlapping portrait/name layers create depth. Soft shadows belong to screenshot images and the desktop floating menu control; ordinary sections and project rows do not use raised card shells.

### Shadow Vocabulary

- **Menu control:** (0 6px 22px #0001), removed from the mobile trigger.
- **Project preview:** (0 10px 20px #0002), used for hover-preview and project-card screenshots.
- **Ribbon image:** (0 10px 25px #0002).
- **Detail image:** (0 15px 35px #0002).

**The Image Depth Rule.** Keep soft shadow depth attached to project imagery. The surrounding page remains defined by space, color and rules.

## Shapes

Circular controls and avatars contrast with square-edged image frames. Pill links and filter chips use their recorded radii. The location hanger is flat against the viewport edge and rounded at its right end (0 70px 70px 0). A shallow curved strip connects the education surface to the contact area. Arrow icons are thin-stroked inline SVGs; their usual size is (24px), with larger section arrows at (52px).

## Components

### Circular Actions

Confident, compact destinations within a generous layout.

- **Shape:** Equal width and height with a circular radius; the default diameter is (165px).
- **Color:** Ink with white content; the main contact action starts blue.
- **Hover:** A blue layer rises from below. The blue action fills with Blue Hover.
- **Responsive:** About action shrinks to (108px); contact action to (112px) on mobile.
- **Interaction:** Fine-pointer magnetic movement follows the pointer by (15%) of its displacement. It is disabled for coarse pointers, paused motion and reduced motion.

### Pill Links

Outlined links with a label and arrow; used for project navigation, source/demo actions and contact destinations.

- **Shape:** Long rounded capsule, minimum desktop height (68px).
- **Color:** Inherited text on a transparent surface, with a Line border. Dark-surface links use light text and Dark Line.
- **Hover:** Blue fill rises into the control; text and border become white/blue.
- **Responsive:** Minimum height becomes (58px), with padding (15px 24px).

### Résumé and Contact Links

The hero's résumé destination is a text link on desktop and a compact Ink pill with Paper text on mobile. The mobile pill has a minimum height of (40px), padding (8px 14px), radius (30px) and label size (12px). Email and résumé destinations also appear in the wrapping contact links and expanded navigation. The main circular contact action opens the public email address.

### Portrait Images

The hero and original About photograph use responsive WebP sources at (480px) and their larger intrinsic widths, with explicit sizes and dimensions. The hero is preloaded and has high fetch priority; About, desk and avatar imagery loads lazily. The WebP desk study retains its caption and the original image proportions.

### Filter Chips

Small outlined buttons whose selected state has a solid ink fill and white label.

- **Shape:** Rounded capsule with padding (12px 23px); mobile uses (10px 17px).
- **State:** The selected filter is exposed through `aria-pressed`. Hover strengthens the border to Ink.
- **Feedback:** The result count is a polite live status region.
- **Catalog:** Four wrapping choices cover All projects, Data & ML, Web applications and Research & automation. Counts derive from the current nine project families.

### Project Rows and Cards

The homepage uses broad ruled rows; the work page uses image-led cards for nine distinct project families. Related variants and IntentDesk's feedback/retrieval subsystems remain within their parent entry.

- **Rows:** Three columns for title, discipline and arrow, divided by Line. Hover moves the title left and discipline right by (12px), with a subdued text color. Keyboard focus also shifts the title.
- **Hover Preview:** On fine pointers, a floating project image follows the pointer. Its blue circular label says “View project.” It is absent for coarse pointers, reduced motion and paused motion.
- **Cards:** Square-cornered image mount with aspect ratio (1.5), default inset (35px), provenance caption, title, ruled discipline metadata and a Muted status line. Images use contain fitting and scale to (1.045) on hover. Mobile uses a (25px) inset. Each card is a vertical flex column: its title has (20px) bottom margin and metadata pushes to the bottom with automatic top margin, aligning rows across adjacent cards.
- **Details:** Larger image mount with (60px) inset; mobile uses (22px) and reaches the viewport edge. Existing text-art fallback appears if a project image cannot load.

### Project Media and Status

Every catalog entry identifies the image as an application screenshot, a code-rendered study-boundary map or an AI-generated concept illustration. Captions use Muted text with a (13px) top margin; the following card title starts after (12px). Detail captions have a (15px) top margin. The three concept-cover entries explicitly state that their illustrations are visual interpretations rather than application screenshots.

Concept covers use responsive (640w) and (1536w) sources. Gallery image sizes are (90vw) on mobile and (45vw) on desktop; detail images use (90vw). Gallery images load lazily, detail images have high fetch priority, and both decode asynchronously. Project-specific image-mount colors remain local content values.

Each card includes its actual project status below the ruled metadata, at (13px) with a (12px) top margin; mobile status text uses (12px). Status is plain text rather than a decorative badge.

### Case Studies

All nine project pages extend the image and build notes with four ruled sections covering the problem, project work, how the build fits together, and the result or next step. Headings sit beside body copy capped at (65ch). Each row has a one-pixel Line border and padding (42px 0); on mobile it stacks with a (20px) gap, padding (30px 0) and (15px) body copy. A next-project text link continues the sequence.

### Project Process Flow

All nine details show an ordered four-step explanation titled “How the pieces connect.” The heading uses the Case Study Title role; the section starts after (65px), with a (30px) gap before the ruled list. Steps use (15px) type, line height (1.5) and padding (22px 25px 22px 0). Small CSS chevrons indicate progression between desktop steps.

On mobile the section starts after (45px), its title uses (27px) with (24px) below, and the list becomes two columns with a (20px) column gap. Step type becomes (13px), vertical padding (18px), and each row has a bottom rule. The second step's chevron is hidden to avoid implying movement beyond the row.

### Benchmark Evidence

IntentDesk's evaluation uses four horizontal bars on a shared (0–100%) scale, with labels, right-aligned tabular values and a semantic table beneath. Ink bars sit on Line tracks; the preselected MPNet classifier is the Blue bar. Tracks are (12px) high. Desktop rows use columns (210px 1fr 70px); mobile labels and values share the first row and the bar spans beneath them. The flat block uses the existing Education surface.

The table uses fine horizontal rules, left-aligned row headers and tabular values. The accompanying text keeps the dataset scope, unsupported-input result and human-review decision beside the chart. Do not remove these limits when reusing this evidence pattern.

Supplemental evidence starts after (65px), or (45px) on mobile, using the Evidence Headline role and paragraphs capped at (70ch). IntentDesk retains its feedback and retrieval comparisons inside the same project page.

La Liga uses a three-column semantic comparison table: measure, selected v4 release and frozen v3 baseline. Its caption identifies the recorded historical test of (86) reserved fixtures. Accuracy values are (47.67%) and (50.00%); log loss values are (1.0861) and (1.0220), with lower identified as better. Both show (0 / 18) correctly classified draws. The note preserves the model identity, lack of improvement and consumed-test limitation. Header copy is Muted at (13px); mobile table type is (12px), with (12px) right padding so all three columns remain visible.

### Video Walkthroughs

IntentDesk and Lilly's POS have (36-second) screenshot walkthroughs presented through native video controls. The player uses a poster, inline playback and (preload="none"); playback begins through the visitor's controls. A default English caption track and a transcript link accompany each video. Below the player, compact Muted copy explains the provenance and scope of the captures. Keep the caption track and transcript available.

### Navigation

Desktop links use a small circular dot beneath hover and current-page states. The circular menu trigger appears after scrolling (250px), and remains available on mobile. It opens a native modal dialog sliding in from the right.

The expanded panel uses Ink, large white links, fine dark rules, a blue circular close control and a dimmed backdrop. Its desktop width is (min(540px, 100vw)); mobile padding becomes (110px 35px 35px). Links shift right by (15px) on hover. The secondary link row wraps Email, Résumé, GitHub and LinkedIn, with a mobile gap of (18px). The modal closes through its close control, Escape, navigation or an outside click.

### Text Links and Focus

Text links pair a label with a thin arrow. A one-pixel underline grows beneath the text on hover. Global visible keyboard focus uses a (3px) outline with (7px) offset. The hero and header use Ink focus outlines; the navigation panel and dark footers use Paper. The circular menu trigger uses a two-color treatment: a Paper outline at (3px) offset over an Ink outer ring (0 0 0 9px), so it stays visible across backgrounds. Project rows draw their focus outline inward with an offset of (-3px).

### Motion Controls

The desktop hero name travels horizontally in a linear loop (28s); the mobile full name remains static. A first-visit intro leaves upward over (1.15s), and the image ribbon tracks visible scroll within a limited horizontal range. The shared easing is (cubic-bezier(.22, 1, .36, 1)); most state transitions run between (0.25s) and (0.8s).

The visible pause control pauses CSS animations and disables magnetic and scroll-ribbon movement. The reduced-motion preference removes animations, transitions, hover previews and smooth scrolling, and changes the desktop hero name to a single readable static treatment. Native walkthrough playback remains visitor-controlled.

## Do's and Don'ts

### Do:

- **Do** use the shared slate, paper and ink surfaces with blue for the existing action and interaction roles.
- **Do** keep regular-weight DM Sans headings and generous whitespace around large type.
- **Do** present real project imagery inside square frames with fine rules and restrained screenshot shadows.
- **Do** preserve the existing focus treatments, mobile content order, pause control and reduced-motion behavior.
- **Do** retain the original personal photograph and disclose AI portrait studies in their existing image descriptions and caption.
- **Do** keep the complete static mobile name and its résumé destination visible above the hero utility bar.
- **Do** keep zero-based benchmark bars, their written values and table, and the nearby scope and limitations together.
- **Do** retain visitor-controlled video playback, captions and transcript links.
- **Do** retain media-provenance captions and plain-language project status alongside the gallery images.
- **Do** keep process steps in their ordered four-column or two-by-two layout and preserve written values in comparison tables.

### Don't:

- **Don't** introduce a second global action accent from a project-specific image-mount color.
- **Don't** turn the flat project rows or page sections into raised rounded card shells.
- **Don't** make moving imagery or pointer hover the only way to inspect a project.
- **Don't** replace the static reduced-motion name with the looping marquee.
- **Don't** replace the static mobile full name with the desktop marquee or crop away the surname.
- **Don't** present the AI concept covers as screenshots of working interfaces.

## Mobile image alignment — October 2026

On phones (720px and below), keep the portrait centered in a bounded image box above the utility bar. The role and compact location badge sit above the face; the complete static name and résumé link retain their existing overlay treatment. Use the full 3:4 original photograph and 3:2 desk portrait without cropping on mobile.

Gallery mounts retain the shared 3:2 ratio, centered `object-fit: contain` previews and a responsive 14–24px inset. Shadows follow the rendered image instead of its letterbox. Detail images follow their intrinsic ratio and display the full capture. Every project image declares its actual intrinsic dimensions in `projects.js`; retain those fields when replacing an asset.

The home-page ribbon uses native horizontal scrolling and snap alignment on phones, with a glimpse of the following image. Desktop scroll movement remains limited to fine pointers. Hover effects require a fine pointer and hover support; touch controls provide active feedback and filter targets are at least 44px tall. Safe-area insets protect the menu, page gutters and footer, and viewport zoom remains enabled.

The inherited type, mount colors, location-pill radius, desktop marquee and separator rows are intentional parts of the reference-led design. Detector advisories about those existing treatments are not reasons to redesign this mobile fix.

