// Canonical project families, reviewed against GitHub on 28 October 2026.
window.portfolioProjects = [
  {
    "id": "quotecheck",
    "title": "QuoteCheck",
    "category": "data",
    "discipline": "Product Matching & Full-Stack ML",
    "year": "2026",
    "image": "assets/quotecheck.webp",
    "imageSmall": "assets/quotecheck-small.webp",
    "imageWidth": 1440,
    "imageSmallWidth": 640,
    "mediaWidth": 1440,
    "mediaHeight": 900,
    "imageAlt": "QuoteCheck comparison screen for a synthetic black toner request, showing three supplier offers with MiniLM ranking scores",
    "color": "#d6e3e1",
    "status": "Deployed review prototype",
    "technologies": [
      "Python",
      "FastAPI",
      "PyTorch",
      "ONNX",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Vercel"
    ],
    "summary": "A quotation-review app that extracts supplier offers, ranks product matches with a fine-tuned MiniLM model and keeps every price traceable to its source.",
    "paragraphs": [
      "Compare supplier quotations for printer cartridges without hiding uncertainty: every price, pack size, freight term and product match should trace back to the original PDF or spreadsheet before a buyer approves it.",
      "The app extracts PDF/XLSX offers with printed-scan OCR, keeps original boxes and cells for source review, and records revision-checked edits in append-only history. It handles pack/MOQ/tier arithmetic with Decimal rounding, unique allocations, hard product conflicts and complete supplier baskets, then produces immutable Excel/PDF exports and verified backups.",
      "FastAPI with SQLAlchemy/Alembic on SQLite locally or PostgreSQL in the cloud; React, TypeScript, Tailwind and PDF.js in the browser. A fine-tuned MiniLM cross-encoder, exported to ONNX for CPU inference on the server, orders lexical shortlists of candidates. Exact part numbers and confirmed conflicts take priority over model rank, and model scores can never approve a match or change prices.",
      "MiniLM was fine-tuned on 19,835 labelled WDC product pairs and selected on a separate validation split: 74.3% validation average precision and 64.7% F1 on a 4,500-pair regression benchmark, versus 43.4% for the original logistic baseline. Neither model met the predeclared 98% precision gate, so it ranks candidates for human review only. 247 automated tests and three browser workflows passed; 473 cartridge pairs still await independent human labels, and no real-supplier accuracy is claimed."
    ],
    "features": [
      "PDF/XLSX extraction with OCR and source-linked review",
      "Fine-tuned MiniLM ranking served through ONNX",
      "Decimal pack, MOQ, tier and freight arithmetic",
      "Append-only review history and immutable exports",
      "Local Windows app and password-protected cloud workspace"
    ],
    "note": "Student portfolio prototype developed with AI coding assistance, evaluated on synthetic quotations and a public product-matching benchmark. Not a validated purchasing service. Source private; the cloud workspace is password-protected.",
    "source": null,
    "demo": null,
    "evidence": null,
    "caseStudy": [
      {
        "heading": "The problem",
        "text": "Compare supplier quotations for printer cartridges without hiding uncertainty: every price, pack size, freight term and product match should trace back to the original PDF or spreadsheet before a buyer approves it."
      },
      {
        "heading": "Project work",
        "text": "The app extracts PDF/XLSX offers with printed-scan OCR, keeps original boxes and cells for source review, and records revision-checked edits in append-only history. It handles pack/MOQ/tier arithmetic with Decimal rounding, unique allocations, hard product conflicts and complete supplier baskets, then produces immutable Excel/PDF exports and verified backups."
      },
      {
        "heading": "Architecture",
        "text": "FastAPI with SQLAlchemy/Alembic on SQLite locally or PostgreSQL in the cloud; React, TypeScript, Tailwind and PDF.js in the browser. A fine-tuned MiniLM cross-encoder, exported to ONNX for CPU inference on the server, orders lexical shortlists of candidates. Exact part numbers and confirmed conflicts take priority over model rank, and model scores can never approve a match or change prices."
      },
      {
        "heading": "Results and limits",
        "text": "MiniLM was fine-tuned on 19,835 labelled WDC product pairs and selected on a separate validation split: 74.3% validation average precision and 64.7% F1 on a 4,500-pair regression benchmark, versus 43.4% for the original logistic baseline. Neither model met the predeclared 98% precision gate, so it ranks candidates for human review only. 247 automated tests and three browser workflows passed; 473 cartridge pairs still await independent human labels, and no real-supplier accuracy is claimed."
      }
    ],
    "flow": [
      "Supplier documents",
      "Source-linked extraction",
      "MiniLM ranking",
      "Human approval"
    ],
    "imageKind": "screenshot",
    "imageCaption": "Application screenshot with synthetic data"
  },
  {
    "id": "intentdesk",
    "title": "IntentDesk",
    "category": "data",
    "discipline": "NLP & Model Evaluation",
    "year": "2026",
    "image": "assets/intentdesk.jpg",
    "mediaWidth": 1269,
    "mediaHeight": 1625,
    "color": "#e0ddeb",
    "status": "Local NLP research application",
    "technologies": [
      "Python",
      "FastAPI",
      "SQLite",
      "scikit-learn",
      "PyTorch",
      "MPNet",
      "BM25"
    ],
    "summary": "A local NLP workspace for human-reviewed intent handoffs, with separate large-data review-rating and retrieval experiments.",
    "paragraphs": [
      "Help a reviewer identify the subject of a request and prepare a team handoff while keeping uncertainty visible. Separate research tasks explore product-review ratings and passage retrieval; neither supplies verified support answers or automatic decisions.",
      "The application includes intent suggestions, scope advice, review queues and versioned decisions. A six-category card-support pilot uses fictional tickets. The same project also contains an updated hybrid card desk, a product-disjoint feedback ML lab and a disk-based BM25 passage-search experiment; these are subsystems rather than duplicate portfolio entries.",
      "The main intent workflow combines a frozen MPNet encoder, trained classifier, temperature calibration and human review through FastAPI/SQLite. The separate feedback lab compares sparse word/character models, numeric regression, clustering and compact transformers trained from random initialization. Checksums and consumed-evaluation markers preserve fixed comparisons.",
      "The main intent benchmark records 96.24% accuracy on 4,500 known-intent requests, while the original unsupported-request rule failed and stays disabled. In a separate 20,000-review rating check, preselected V2 reached 69.13% accuracy and 0.5591 macro-F1 versus the original at 67.955% and 0.5487 on the same sample. A later bounded IDF experiment failed its development promotion rule, so V2 remains selected. BM25 records MRR@10 of 0.2195 over a fixed 100-query development sample. No completed human-benefit comparison or production reliability is established."
    ],
    "features": [
      "Human review with versioned decision history",
      "Calibrated 150-category intent benchmark",
      "Separate product-disjoint feedback ML lab",
      "Word/character, scratch-transformer and clustering comparisons",
      "Disk-based BM25 retrieval research",
      "Frozen comparisons and explicit unsuccessful experiments"
    ],
    "note": "Student project developed with AI coding assistance. Intent accuracy, rating accuracy and retrieval scores measure different tasks. Public reviews are subjective; pilot tickets are fictional. All published final checks are consumed.",
    "source": "https://github.com/Joepikka/intentdesk",
    "demo": null,
    "evidence": "https://github.com/Joepikka/intentdesk/blob/main/reports/Milestone_05.md",
    "caseStudy": [
      {
        "heading": "The problem",
        "text": "Help a reviewer identify the subject of a request and prepare a team handoff while keeping uncertainty visible. Separate research tasks explore product-review ratings and passage retrieval; neither supplies verified support answers or automatic decisions."
      },
      {
        "heading": "Project work",
        "text": "The application includes intent suggestions, scope advice, review queues and versioned decisions. A six-category card-support pilot uses fictional tickets. The same project also contains an updated hybrid card desk, a product-disjoint feedback ML lab and a disk-based BM25 passage-search experiment; these are subsystems rather than duplicate portfolio entries."
      },
      {
        "heading": "Architecture",
        "text": "The main intent workflow combines a frozen MPNet encoder, trained classifier, temperature calibration and human review through FastAPI/SQLite. The separate feedback lab compares sparse word/character models, numeric regression, clustering and compact transformers trained from random initialization. Checksums and consumed-evaluation markers preserve fixed comparisons."
      },
      {
        "heading": "Results and limits",
        "text": "The main intent benchmark records 96.24% accuracy on 4,500 known-intent requests, while the original unsupported-request rule failed and stays disabled. In a separate 20,000-review rating check, preselected V2 reached 69.13% accuracy and 0.5591 macro-F1 versus the original at 67.955% and 0.5487 on the same sample. A later bounded IDF experiment failed its development promotion rule, so V2 remains selected. BM25 records MRR@10 of 0.2195 over a fixed 100-query development sample. No completed human-benefit comparison or production reliability is established."
      }
    ],
    "video": {
      "src": "assets/intentdesk-walkthrough.mp4",
      "poster": "assets/intentdesk.jpg",
      "captions": "assets/intentdesk-walkthrough.vtt",
      "transcript": "assets/intentdesk-walkthrough.txt",
      "label": "36-second screenshot walkthrough",
      "description": "A captioned walkthrough using genuine repository screenshots and published evaluation results. Screenshots came from automated interface verification; this is not a human performance study."
    },
    "flow": [
      "Request",
      "Frozen embeddings",
      "Calibrated suggestion",
      "Human decision"
    ],
    "imageKind": "screenshot",
    "imageCaption": "Application screenshot"
  },
  {
    "id": "crime-map",
    "title": "Kerala Crime Map",
    "shortTitle": "Kerala Crime Map",
    "category": "data",
    "discipline": "Data Analysis & Visualization",
    "year": "2026",
    "image": "assets/crime-map.webp",
    "mediaWidth": 1440,
    "mediaHeight": 760,
    "color": "#34393b",
    "status": "Public data dashboard",
    "technologies": [
      "JavaScript",
      "Leaflet",
      "Chart.js",
      "Python",
      "Cloudflare Pages",
      "Workers AI",
      "Ollama"
    ],
    "summary": "An interactive public-data dashboard that separates Kerala Police district statistics, statewide trends and recent news context.",
    "paragraphs": [
      "Make public crime statistics easier to explore without inventing incident locations or mixing incompatible reporting periods. The dashboard must make district coverage, year-to-date figures and population denominators visible.",
      "The interface provides district POCSO layers, raw-count/rate views, trend comparisons, CSV exports and shareable selections. Saved views and snapshot exports preserve context locally. A separate news outlet covers Indian states and topics, while source-health checks and data audits expose collection or reconciliation problems.",
      "A Leaflet and Chart.js frontend consumes versioned statistical JSON through local Python or Cloudflare-compatible read APIs. Scheduled collection checks district completeness and reconciles mapped districts plus Railway Police totals. The AI Analyst uses aggregate context through local Ollama or optional Workers AI; supported local fallback responses remain available.",
      "District-resolved POCSO data maps to 14 revenue districts; unsupported crime categories remain statewide-only. The reviewed methodology labels 2026 as January–July year-to-date and uses Census 2011 populations for rates. District-centre heat anchors are visual summaries rather than incident coordinates. News remains separate from official counts, and AI interpretation does not establish future danger or causation."
    ],
    "features": [
      "District POCSO layers and statewide crime trends",
      "Raw counts and labeled population rates",
      "Shareable filters, saved views and export snapshots",
      "Separate state/topic news context",
      "Source-health checks and reconciliation audits",
      "Aggregate-context AI Analyst"
    ],
    "note": "Reported aggregates are not exact incident locations or a prediction of personal danger. Rates use a 2011 population baseline; partial-year figures must not be compared as complete years. Open original sources for current context.",
    "source": null,
    "demo": "https://kerala-crime-map.pages.dev/",
    "evidence": "https://kerala-crime-map.pages.dev/methodology.html",
    "caseStudy": [
      {
        "heading": "The problem",
        "text": "Make public crime statistics easier to explore without inventing incident locations or mixing incompatible reporting periods. The dashboard must make district coverage, year-to-date figures and population denominators visible."
      },
      {
        "heading": "Project work",
        "text": "The interface provides district POCSO layers, raw-count/rate views, trend comparisons, CSV exports and shareable selections. Saved views and snapshot exports preserve context locally. A separate news outlet covers Indian states and topics, while source-health checks and data audits expose collection or reconciliation problems."
      },
      {
        "heading": "Architecture",
        "text": "A Leaflet and Chart.js frontend consumes versioned statistical JSON through local Python or Cloudflare-compatible read APIs. Scheduled collection checks district completeness and reconciles mapped districts plus Railway Police totals. The AI Analyst uses aggregate context through local Ollama or optional Workers AI; supported local fallback responses remain available."
      },
      {
        "heading": "Results and limits",
        "text": "District-resolved POCSO data maps to 14 revenue districts; unsupported crime categories remain statewide-only. The reviewed methodology labels 2026 as January–July year-to-date and uses Census 2011 populations for rates. District-centre heat anchors are visual summaries rather than incident coordinates. News remains separate from official counts, and AI interpretation does not establish future danger or causation."
      }
    ],
    "flow": [
      "Official aggregates",
      "Reconciliation checks",
      "District maps & trends",
      "Sources & exports"
    ],
    "imageKind": "screenshot",
    "imageCaption": "Application screenshot"
  },
  {
    "id": "laliga-ml",
    "title": "La Liga ML Forecasting",
    "shortTitle": "La Liga ML",
    "category": "data",
    "year": "2026",
    "status": "Research prototype",
    "technologies": [
      "Python",
      "PyTorch",
      "NumPy",
      "SQLite",
      "scikit-learn"
    ],
    "summary": "A football forecasting research pipeline that compares player-history neural models with simpler baselines using chronological evaluation.",
    "features": [
      "Resumable collection and fixture reconciliation",
      "Source hashes and explicit missing evidence",
      "Independent player-history modelling",
      "Chronological calibration and held-out comparison"
    ],
    "note": "Research prototype. The 86-fixture final test is consumed; new changes require a new untouched evaluation. No live forecast or betting-profit claim. The source repository is private.",
    "source": null,
    "demo": null,
    "discipline": "ML Forecasting & Sports Analytics",
    "image": "assets/laliga-cover.webp",
    "mediaWidth": 1536,
    "mediaHeight": 1024,
    "imageSmall": "assets/laliga-cover-small.webp",
    "imageWidth": 1536,
    "imageSmallWidth": 640,
    "imageAlt": "AI-generated concept illustration for La Liga ML Forecasting, not an application screenshot",
    "imageCaption": "AI-generated concept illustration",
    "color": "#d9e0df",
    "evidence": null,
    "caseStudy": [
      {
        "heading": "The problem",
        "text": "Estimate home-win, draw and away-win probabilities while keeping historical match evidence, player identities and evaluation dates consistent. Large feature catalogues are useful only when actual observations and their availability are known."
      },
      {
        "heading": "Project work",
        "text": "The project collects and reconciles public football archives, retains source hashes, derives player summaries with missingness masks, and compares fixed-seed models. A separate player-history experiment adds memory and team attention while preserving frozen comparison rules."
      },
      {
        "heading": "Architecture",
        "text": "Python collectors feed SQLite and training-only encoders. A 33-layer PyTorch backbone processes players independently, then pools team representations. The newer workflow adds a 64-state GRU, four-head team attention and direct/goal outcome heads, with separate train, validation, calibration and final-test blocks."
      },
      {
        "heading": "Results and limits",
        "text": "Across 86 reserved historical fixtures, the validation-selected v4 release recorded 47.67% accuracy and 1.0861 log loss, compared with the frozen v3 release at 50.00% and 1.0220. The richer workflow did not improve the benchmark. Neither correctly classified the 18 draws. Historical availability uses explicit assumptions; current-season forecasting remains unvalidated."
      }
    ],
    "paragraphs": [
      "Estimate home-win, draw and away-win probabilities while keeping historical match evidence, player identities and evaluation dates consistent. Large feature catalogues are useful only when actual observations and their availability are known.",
      "The project collects and reconciles public football archives, retains source hashes, derives player summaries with missingness masks, and compares fixed-seed models. A separate player-history experiment adds memory and team attention while preserving frozen comparison rules.",
      "Python collectors feed SQLite and training-only encoders. A 33-layer PyTorch backbone processes players independently, then pools team representations. The newer workflow adds a 64-state GRU, four-head team attention and direct/goal outcome heads, with separate train, validation, calibration and final-test blocks.",
      "Across 86 reserved historical fixtures, the validation-selected v4 release recorded 47.67% accuracy and 1.0861 log loss, compared with the frozen v3 release at 50.00% and 1.0220. The richer workflow did not improve the benchmark. Neither correctly classified the 18 draws. Historical availability uses explicit assumptions; current-season forecasting remains unvalidated."
    ],
    "flow": [
      "Historical archives",
      "Identity & missingness checks",
      "Chronological splits",
      "Frozen comparison"
    ],
    "imageKind": "concept"
  },
  {
    "id": "lillys-pos",
    "title": "Lilly's POS",
    "category": "web",
    "discipline": "Full-Stack Development",
    "year": "2026",
    "image": "assets/lillys-pos.webp",
    "mediaWidth": 1440,
    "mediaHeight": 900,
    "color": "#dad2bf",
    "status": "Café POS prototype",
    "technologies": [
      "React",
      "TypeScript",
      "Vite",
      "Supabase",
      "PostgreSQL"
    ],
    "summary": "A café operations prototype connecting guest ordering, kitchen workspaces, cash receipts and daily reporting.",
    "paragraphs": [
      "Keep a customised guest order, counter activity and the kitchen’s view connected, with clear responsibility for confirmations and later corrections.",
      "The prototype combines menu search, diet filters, sizes, extras and notes with customer, owner and kitchen workspaces. Counter orders, receipts, menu management, reports and driver operations extend the guest flow.",
      "React and TypeScript render the guest and staff views. Google sign-in and database-assigned roles connect to Supabase/PostgreSQL RPCs. Shared snapshots keep the workspaces aligned; confirmed cash records use reasoned corrections rather than silent edits.",
      "The anonymous guest landing, menu, item customisation and Google sign-in entry were verified after restoring the paused backend. Staff ordering, cash handling and reports were reviewed in source rather than exercised against live records. Prices are demo values and payments are cash-only."
    ],
    "features": [
      "Menu search, diet filters and order customisation",
      "Dine-in, pickup and delivery flows",
      "Customer, owner and kitchen workspaces",
      "Counter orders, kitchen tracking and cash receipts",
      "Reasoned confirmation corrections and daily reports"
    ],
    "note": "Student restaurant-management prototype. The older Lillys ordering preview is grouped into this project. No online payment gateway, commercial operation or production-reliability claim. Source private.",
    "source": null,
    "demo": "https://lillys-pos.vercel.app/",
    "evidence": null,
    "caseStudy": [
      {
        "heading": "The problem",
        "text": "Keep a customised guest order, counter activity and the kitchen’s view connected, with clear responsibility for confirmations and later corrections."
      },
      {
        "heading": "Project work",
        "text": "The prototype combines menu search, diet filters, sizes, extras and notes with customer, owner and kitchen workspaces. Counter orders, receipts, menu management, reports and driver operations extend the guest flow."
      },
      {
        "heading": "Architecture",
        "text": "React and TypeScript render the guest and staff views. Google sign-in and database-assigned roles connect to Supabase/PostgreSQL RPCs. Shared snapshots keep the workspaces aligned; confirmed cash records use reasoned corrections rather than silent edits."
      },
      {
        "heading": "Results and limits",
        "text": "The anonymous guest landing, menu, item customisation and Google sign-in entry were verified after restoring the paused backend. Staff ordering, cash handling and reports were reviewed in source rather than exercised against live records. Prices are demo values and payments are cash-only."
      }
    ],
    "video": {
      "src": "assets/lillys-walkthrough.mp4",
      "poster": "assets/lillys-pos.webp",
      "captions": "assets/lillys-walkthrough.vtt",
      "transcript": "assets/lillys-walkthrough.txt",
      "label": "36-second screenshot walkthrough",
      "description": "A captioned introduction using captures of the restored guest landing page, menu and item options. No customer orders or payments were created for this video."
    },
    "flow": [
      "Guest customisation",
      "Role-based workspace",
      "Shared order state",
      "Kitchen & receipts"
    ],
    "imageKind": "screenshot",
    "imageCaption": "Application screenshot"
  },
  {
    "id": "ev-sites",
    "title": "Thrissur EV Site Selection",
    "category": "data",
    "discipline": "GIS & Machine Learning",
    "year": "2026",
    "image": "assets/ev-map.svg",
    "mediaWidth": 1080,
    "mediaHeight": 720,
    "color": "#c9d1c8",
    "status": "GIS preprocessing prototype",
    "technologies": [
      "Python",
      "Streamlit",
      "GeoPandas",
      "Folium",
      "pandas",
      "scikit-learn"
    ],
    "summary": "A geospatial prototype for inspecting possible EV charging locations in Thrissur, with candidate layers, charger proximity and road-distance results.",
    "paragraphs": [
      "Explore where an EV charging site could be considered by comparing district boundaries, existing charging stations and road access. A map alone cannot establish whether a site is practical or approved.",
      "The Streamlit application switches between all candidate sites, charger-filtered sites and road-distance results. Separate controls show the district boundary, one-kilometre grid, roads and existing chargers. Progress and data summaries reflect the files actually available.",
      "GeoPandas loads processed GeoJSON layers, converts display geometry to WGS84 and passes it to Folium. Candidate popups and tables expose nearest-charger and nearest-road distances. Separate experimental scripts generate synthetic feature rows, calculate a weighted MCDA score and train a random forest on score-derived classes.",
      "The implemented application is a GIS preprocessing viewer. Population, terrain, flood and commercial layers, integrated suitability scoring and final recommendations remain listed as unfinished. The separate learning workflow uses 2,000 randomly generated rows and rule-derived labels, so it demonstrates a method rather than real-site prediction accuracy."
    ],
    "features": [
      "Switchable candidate and distance-result layers",
      "Optional boundary, grid, roads and chargers",
      "File-based preprocessing progress",
      "Distance summaries and candidate results table"
    ],
    "note": "Research prototype. Synthetic training examples and rule-derived labels do not validate real charging sites. Field feasibility, land permissions, grid capacity and deployment decisions require independent evidence.",
    "source": "https://github.com/Joepikka/EV_Site_Selection",
    "demo": null,
    "evidence": "https://github.com/Joepikka/EV_Site_Selection/blob/main/app.py",
    "caseStudy": [
      {
        "heading": "The problem",
        "text": "Explore where an EV charging site could be considered by comparing district boundaries, existing charging stations and road access. A map alone cannot establish whether a site is practical or approved."
      },
      {
        "heading": "Project work",
        "text": "The Streamlit application switches between all candidate sites, charger-filtered sites and road-distance results. Separate controls show the district boundary, one-kilometre grid, roads and existing chargers. Progress and data summaries reflect the files actually available."
      },
      {
        "heading": "Architecture",
        "text": "GeoPandas loads processed GeoJSON layers, converts display geometry to WGS84 and passes it to Folium. Candidate popups and tables expose nearest-charger and nearest-road distances. Separate experimental scripts generate synthetic feature rows, calculate a weighted MCDA score and train a random forest on score-derived classes."
      },
      {
        "heading": "Results and limits",
        "text": "The implemented application is a GIS preprocessing viewer. Population, terrain, flood and commercial layers, integrated suitability scoring and final recommendations remain listed as unfinished. The separate learning workflow uses 2,000 randomly generated rows and rule-derived labels, so it demonstrates a method rather than real-site prediction accuracy."
      }
    ],
    "flow": [
      "Geographic layers",
      "Candidate filtering",
      "Distance calculations",
      "GIS inspection"
    ],
    "imageKind": "map",
    "imageCaption": "Study boundary · code-rendered map"
  },
  {
    "id": "cooksmart",
    "title": "CookSmart",
    "category": "web",
    "discipline": "Web Design & Development",
    "year": "2026",
    "image": "assets/cooksmart.webp",
    "mediaWidth": 1440,
    "mediaHeight": 960,
    "color": "#d5c8b2",
    "status": "Recipe discovery web application",
    "technologies": [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS"
    ],
    "summary": "A recipe collection built for finding something good to cook and saving the dishes worth coming back to.",
    "paragraphs": [
      "Move from recipe inspiration to useful cooking instructions without losing the original publisher or the dishes a visitor wants to save.",
      "A recipe-library website with dish and ingredient search, category filters, native detail dialogs and local favourites. The two ApplePie repositories explore cinematic hero alternatives within this same product family.",
      "React and TypeScript run the interface, built with Vite and Tailwind CSS. Complete recipe details load in chunks; browser storage keeps favourites on the visitor’s device. The alternate hero studies use GSAP/ScrollTrigger and canvas frame sequences with fallback posters.",
      "The web project provides a complete discovery and saved-recipe flow with source attribution. Local favourites do not sync between devices. Hero variants are grouped here rather than counted as separate projects; the separate Flutter/Gemini application is not represented by the reviewed web source."
    ],
    "features": [
      "Dish and ingredient search with category filters",
      "Native recipe dialogs with publisher attribution",
      "Lazy-loaded complete recipe details",
      "Browser-local favourites",
      "Responsive controls and reduced-motion handling"
    ],
    "note": "One CookSmart project family, including the ApplePie and Scroll visual studies. Recipe content and photography retain publisher attribution. No live AI recipe generation is claimed for this website.",
    "source": "https://github.com/Joepikka/CookSmart",
    "demo": "https://cook-smart-omega.vercel.app/",
    "evidence": null,
    "caseStudy": [
      {
        "heading": "The problem",
        "text": "Move from recipe inspiration to useful cooking instructions without losing the original publisher or the dishes a visitor wants to save."
      },
      {
        "heading": "Project work",
        "text": "A recipe-library website with dish and ingredient search, category filters, native detail dialogs and local favourites. The two ApplePie repositories explore cinematic hero alternatives within this same product family."
      },
      {
        "heading": "Architecture",
        "text": "React and TypeScript run the interface, built with Vite and Tailwind CSS. Complete recipe details load in chunks; browser storage keeps favourites on the visitor’s device. The alternate hero studies use GSAP/ScrollTrigger and canvas frame sequences with fallback posters."
      },
      {
        "heading": "Results and limits",
        "text": "The web project provides a complete discovery and saved-recipe flow with source attribution. Local favourites do not sync between devices. Hero variants are grouped here rather than counted as separate projects; the separate Flutter/Gemini application is not represented by the reviewed web source."
      }
    ],
    "flow": [
      "Recipe collection",
      "Search & filters",
      "Attributed instructions",
      "Local favourites"
    ],
    "imageKind": "screenshot",
    "imageCaption": "Application screenshot"
  },
  {
    "id": "smile-dental",
    "title": "Smile Dental",
    "category": "web",
    "discipline": "Full-Stack Development",
    "year": "2026",
    "image": "assets/dental.webp",
    "mediaWidth": 1440,
    "mediaHeight": 900,
    "color": "#d7e0df",
    "status": "Appointment-booking project",
    "technologies": [
      "React",
      "TypeScript",
      "Vite",
      "Supabase",
      "PostgreSQL"
    ],
    "summary": "A dental appointment project that connects patient booking with an administration workflow.",
    "paragraphs": [
      "Connect a patient’s appointment request and status view with the clinic’s scheduling and service-management workflow.",
      "The application includes services pages, authenticated booking, a patient portal and an administration portal. Staff can filter appointments, confirm or reject requests, reschedule, cancel and edit services.",
      "React and TypeScript provide the public site and role-based portal. Supabase backs authentication and application data. A separate automation worker uses retry and effect-ledger logic to track follow-up work.",
      "The public interface and underlying booking/administration implementation are available as a student prototype. This portfolio review did not exercise authenticated appointments or verify email/calendar delivery. No real patient records or clinical outcomes are presented."
    ],
    "features": [
      "Responsive treatment and services pages",
      "Google sign-in with patient and administration views",
      "Appointment requests and personal status tracking",
      "Confirmation, rejection, rescheduling and cancellation",
      "Service editing and appointment filters",
      "Backend automation-event retries"
    ],
    "note": "Student appointment-management prototype, not an operating clinical service. Source private. Patient and administration features are supported by source review; external automation delivery was not independently verified.",
    "source": null,
    "demo": "https://dental-nine-eta.vercel.app/",
    "evidence": null,
    "caseStudy": [
      {
        "heading": "The problem",
        "text": "Connect a patient’s appointment request and status view with the clinic’s scheduling and service-management workflow."
      },
      {
        "heading": "Project work",
        "text": "The application includes services pages, authenticated booking, a patient portal and an administration portal. Staff can filter appointments, confirm or reject requests, reschedule, cancel and edit services."
      },
      {
        "heading": "Architecture",
        "text": "React and TypeScript provide the public site and role-based portal. Supabase backs authentication and application data. A separate automation worker uses retry and effect-ledger logic to track follow-up work."
      },
      {
        "heading": "Results and limits",
        "text": "The public interface and underlying booking/administration implementation are available as a student prototype. This portfolio review did not exercise authenticated appointments or verify email/calendar delivery. No real patient records or clinical outcomes are presented."
      }
    ],
    "flow": [
      "Visit request",
      "Patient sign-in",
      "Appointment state",
      "Administration & retries"
    ],
    "imageKind": "screenshot",
    "imageCaption": "Application screenshot"
  },
  {
    "id": "meme-coin-lab",
    "title": "Meme Coin Lab",
    "shortTitle": "Meme Coin Lab",
    "category": "automation",
    "year": "2026",
    "status": "Research and concept preparation",
    "technologies": [
      "TypeScript",
      "Next.js",
      "Node.js",
      "Python",
      "SQLite",
      "Supabase",
      "n8n"
    ],
    "summary": "A trend research system that gathers public-source evidence, explains deterministic scores and prepares fictional coin concepts and artwork packages.",
    "features": [
      "Public-source evidence and topic deduplication",
      "Versioned heuristic scoring with missing-data coverage",
      "Read-only public headlines and fictional concept cards",
      "Original artwork and protected draft export"
    ],
    "note": "Research and draft preparation only. Concepts are fictional; scores do not predict token returns. Mainnet publishing and paid integrations are outside the implemented workflow. The source repository is private.",
    "source": null,
    "demo": null,
    "discipline": "Data Pipelines & Creative Tools",
    "image": "assets/meme-cover.webp",
    "mediaWidth": 1536,
    "mediaHeight": 1024,
    "imageSmall": "assets/meme-cover-small.webp",
    "imageWidth": 1536,
    "imageSmallWidth": 640,
    "imageAlt": "AI-generated concept illustration for Meme Coin Lab, not an application screenshot",
    "imageCaption": "AI-generated concept illustration",
    "color": "#e8e0ed",
    "evidence": null,
    "caseStudy": [
      {
        "heading": "The problem",
        "text": "Explore emerging internet topics without confusing duplicated stories, missing measurements or fictional concepts with genuine evidence."
      },
      {
        "heading": "Project work",
        "text": "The lab normalizes public headlines and observations, groups related topics, preserves source history and computes transparent heuristic scores with separate coverage. Public news and fictional concept views stay read-only, while owner-only preparation creates draft fields, artwork and a launch package."
      },
      {
        "heading": "Architecture",
        "text": "A Next.js interface sits above a local Node worker and isolated Python collectors. SQLite keeps the authoritative evidence and run history, with idempotent Supabase synchronization. Scheduling, cancellation generations and quotas bound repeated work. A separate cloud Selenium job supplies a sanitized public headline snapshot."
      },
      {
        "heading": "Results and limits",
        "text": "The documented delivery includes backend, collector-boundary, UI and access-isolation checks, plus a real local scheduler interval test. Scores represent research interest rather than predicted returns. Default mode prepares drafts only; no mainnet publication or completed live mint is claimed. Some shared n8n runtime checks remained blocked by database contention."
      }
    ],
    "paragraphs": [
      "Explore emerging internet topics without confusing duplicated stories, missing measurements or fictional concepts with genuine evidence.",
      "The lab normalizes public headlines and observations, groups related topics, preserves source history and computes transparent heuristic scores with separate coverage. Public news and fictional concept views stay read-only, while owner-only preparation creates draft fields, artwork and a launch package.",
      "A Next.js interface sits above a local Node worker and isolated Python collectors. SQLite keeps the authoritative evidence and run history, with idempotent Supabase synchronization. Scheduling, cancellation generations and quotas bound repeated work. A separate cloud Selenium job supplies a sanitized public headline snapshot.",
      "The documented delivery includes backend, collector-boundary, UI and access-isolation checks, plus a real local scheduler interval test. Scores represent research interest rather than predicted returns. Default mode prepares drafts only; no mainnet publication or completed live mint is claimed. Some shared n8n runtime checks remained blocked by database contention."
    ],
    "flow": [
      "Public evidence",
      "Topic deduplication",
      "Scores & coverage",
      "Fictional drafts"
    ],
    "imageKind": "concept"
  },
  {
    "id": "forex-demo",
    "title": "Forex Demo Research Platform",
    "shortTitle": "Forex Demo",
    "category": "automation",
    "year": "2026",
    "status": "Demo-only research",
    "technologies": [
      "Python",
      "React",
      "Vite",
      "MetaTrader 5",
      "Supabase",
      "n8n"
    ],
    "summary": "A demo-only market research workspace combining broker charts, explainable signal history and guarded local execution controls.",
    "features": [
      "Ten-market, five-timeframe chart workspace",
      "Keyboard chart zoom, pan and latest-view controls",
      "Stale-data labels and rejection explanations",
      "Chronological research screens with constant baselines"
    ],
    "note": "Demo account research only. Private owner dashboard; market data can become stale when the local bridge is offline. No demonstrated trading edge. The source repository is private.",
    "source": null,
    "demo": null,
    "discipline": "Research Systems & Automation",
    "image": "assets/forex-cover.webp",
    "mediaWidth": 1536,
    "mediaHeight": 1024,
    "imageSmall": "assets/forex-cover-small.webp",
    "imageWidth": 1536,
    "imageSmallWidth": 640,
    "imageAlt": "AI-generated concept illustration for Forex Demo Research Platform, not an application screenshot",
    "imageCaption": "AI-generated concept illustration",
    "color": "#d9dfe4",
    "evidence": null,
    "caseStudy": [
      {
        "heading": "The problem",
        "text": "Bring charts, research signals, news and execution status into one clear workspace while making stale information and blocked actions visible."
      },
      {
        "heading": "Project work",
        "text": "The platform includes a ten-market watchlist, five chart timeframes, searchable instruments, chart navigation and an eight-hour decision history. Directional setups that fail a check remain visible with their rejection reason, and research commentary remains advisory."
      },
      {
        "heading": "Architecture",
        "text": "A React/Vite dashboard reads authenticated Supabase records. Local Python services collect MetaTrader 5 data and handle demo requests; n8n supports the news pipeline. Durable account-bound limits, fresh-data checks and broker reconciliation guard the demo executor."
      },
      {
        "heading": "Results and limits",
        "text": "The repository documents a production build and 25 chart/status/viewport checks, including desktop and mobile browser checks. Separate chronological model reviews compare probability screens with constant baselines; no model is approved to authorize orders. Charts depend on the local workstation and broker connection. No profitable-strategy claim is made."
      }
    ],
    "paragraphs": [
      "Bring charts, research signals, news and execution status into one clear workspace while making stale information and blocked actions visible.",
      "The platform includes a ten-market watchlist, five chart timeframes, searchable instruments, chart navigation and an eight-hour decision history. Directional setups that fail a check remain visible with their rejection reason, and research commentary remains advisory.",
      "A React/Vite dashboard reads authenticated Supabase records. Local Python services collect MetaTrader 5 data and handle demo requests; n8n supports the news pipeline. Durable account-bound limits, fresh-data checks and broker reconciliation guard the demo executor.",
      "The repository documents a production build and 25 chart/status/viewport checks, including desktop and mobile browser checks. Separate chronological model reviews compare probability screens with constant baselines; no model is approved to authorize orders. Charts depend on the local workstation and broker connection. No profitable-strategy claim is made."
    ],
    "flow": [
      "Broker observations",
      "Freshness & risk checks",
      "Decision history",
      "Guarded demo controls"
    ],
    "imageKind": "concept"
  }
];
