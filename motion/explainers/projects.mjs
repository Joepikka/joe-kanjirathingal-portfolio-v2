// Content for the 20 s project explainers. Values marked "example" are illustrative; results quote the case studies.
export const explainers = [
  {
    id: 'retail-analytics', title: 'Retail Analytics Lab', discipline: 'Data analytics & SQL warehousing', color: '#dcd6ea',
    steps: [
      {title: 'Raw clickstream', text: '4.6 GB of e-commerce events are downloaded in parallel and typed into Parquet.', widget: {type: 'chips', items: ['2019-Oct.csv.gz', '2019-Nov.csv.gz', '110M events', 'view · cart · purchase']}},
      {title: 'Tested star schema', text: 'DuckDB models events, sessions, products and users; 14 tests reconcile every total.', widget: {type: 'list', rows: [['Staged rows', '109,950,743'], ['Duplicates removed', '130,739'], ['Revenue reconciled', '$505.1M ✓']]}},
      {title: 'Tracking gap caught', text: 'An hourly check finds 48 hours with traffic but no purchases logged.', widget: {type: 'list', rows: [['14 Nov, 19:00', 'logging stops'], ['15 Nov', '$40 revenue'], ['17 Nov', '$57.8M catch-up']], miss: 1}},
      {title: 'Decisions', text: 'Findings become five recommendations, a forecast and a test design.', widget: {type: 'bars', note: 'Share of revenue', rows: [['Repeat buyers', .787, '78.7%'], ['Electronics', .756, '75.6%'], ['Apple + Samsung', .674, '67.4%']]}},
    ],
    result: '$505.1M reconciled to the cent. Forecast beat baselines on normal days, missed Black Friday by 24%.',
    limit: 'Public 2019 data from one store. The A/B test is simulated, and the forecast edge is small.',
  },
  {
    id: 'quotecheck', title: 'QuoteCheck', discipline: 'Product matching & full-stack ML', color: '#d6e3e1',
    steps: [
      {title: 'Supplier documents', text: 'PDF and spreadsheet offers arrive; printed scans are read with OCR.', widget: {type: 'chips', items: ['quote_A.pdf', 'offer_B.xlsx', 'scan_C.pdf', 'tiers_D.xlsx']}},
      {title: 'Source-linked extraction', text: 'Every price, pack size and freight term keeps a link to its box or cell.', widget: {type: 'list', rows: [['Cartridge 26A · pack of 2', 'page 1 · row 4'], ['MOQ 10 · tier price', 'sheet 2 · C7'], ['Freight: ex-works', 'page 2 · box 3']]}},
      {title: 'MiniLM ranking', text: 'A fine-tuned MiniLM cross-encoder orders the shortlist, served through ONNX.', widget: {type: 'bars', note: 'Example scores', rows: [['Candidate A', .91, '0.91'], ['Candidate B', .34, '0.34'], ['Candidate C', .12, '0.12']]}},
      {title: 'Human approval', text: 'A buyer approves each match; history is append-only and exports are immutable.', widget: {type: 'button', primary: 'Approve match', secondary: 'Open source page', stamp: '✓ Added to review history'}},
    ],
    result: '74.3% validation average precision and 64.7% F1, versus a 43.4% baseline.',
    limit: 'Evaluated on synthetic quotations. Not a validated purchasing service.',
  },
  {
    id: 'intentdesk', title: 'IntentDesk', discipline: 'NLP & model evaluation', color: '#e0ddeb',
    steps: [
      {title: 'Request', text: 'A support request arrives for a reviewer to route.', widget: {type: 'card', label: 'Customer request', text: 'My card was charged twice for one order.'}},
      {title: 'Frozen embeddings', text: 'A frozen MPNet encoder turns the text into a sentence embedding.', widget: {type: 'vector', label: 'Sentence embedding'}},
      {title: 'Calibrated suggestion', text: 'A trained classifier with temperature calibration suggests an intent.', widget: {type: 'bars', note: 'Example scores', rows: [['Duplicate charge', .72, '0.72'], ['Refund request', .18, '0.18'], ['Card payment issue', .06, '0.06']]}},
      {title: 'Human decision', text: 'The reviewer approves or changes it; every decision is versioned.', widget: {type: 'button', primary: 'Approve', secondary: 'Change intent', stamp: '✓ Decision recorded'}},
    ],
    result: '96.24% accuracy on 4,500 known-intent requests.',
    limit: 'The unsupported-request rule failed and stays disabled. Pilot tickets are fictional.',
  },
  {
    id: 'laliga-ml', title: 'La Liga ML', discipline: 'Machine learning research', color: '#d9e0df',
    steps: [
      {title: 'Historical archives', text: 'Fixtures and player histories are collected and reconciled.', widget: {type: 'list', rows: [['Real Madrid – Sevilla', ''], ['Barcelona – Valencia', ''], ['Betis – Villarreal', ''], ['Athletic – Girona', '']]}},
      {title: 'Identity & missingness', text: 'Player IDs are matched, and missing evidence is recorded explicitly.', widget: {type: 'list', rows: [['Real Madrid – Sevilla', 'IDs matched'], ['Barcelona – Valencia', 'IDs matched'], ['Betis – Villarreal', 'Missing lineup'], ['Athletic – Girona', 'IDs matched']], miss: 2}},
      {title: 'Chronological splits', text: 'Older seasons train, later ones calibrate, the newest are held out.', widget: {type: 'split', segments: [['Train', 5, 'ink'], ['Calibrate', 3, 'grey'], ['Test', 2, 'blue']], left: 'Older seasons', right: 'Newest →'}},
      {title: 'Frozen comparison', text: 'The selected release is compared with the frozen baseline on held-out fixtures.', widget: {type: 'bars', note: 'Accuracy · 86 held-out fixtures', rows: [['Selected release v4', .4767, '47.67%'], ['Frozen baseline v3', .5, '50.00%']], accent: 1}},
    ],
    result: '47.67% vs 50.00% accuracy on 86 held-out fixtures; 0 of 18 draws.',
    limit: 'No improvement over the baseline, and it is reported as such.',
  },
  {
    id: 'lillys-pos', title: "Lilly's POS", discipline: 'Full-stack web application', color: '#dad2bf',
    steps: [
      {title: 'Guest customisation', text: 'Guests search the menu, filter by diet and customise an order.', widget: {type: 'card', label: 'Order · dine-in', text: 'Flat white, oat milk, extra shot.'}},
      {title: 'Role-based workspace', text: 'Google sign-in and database roles open customer, owner and kitchen views.', widget: {type: 'chips', items: ['Customer', 'Owner', 'Kitchen'], accent: 2}},
      {title: 'Shared order state', text: 'One shared snapshot keeps the counter and the kitchen aligned.', widget: {type: 'flow', nodes: ['Order #24', 'Shared state', 'Kitchen']}},
      {title: 'Kitchen & receipts', text: 'The kitchen tracks progress; cash corrections need a reason.', widget: {type: 'list', rows: [['Order #24', 'Preparing'], ['Cash receipt', 'Issued'], ['Correction', 'Reason required']]}},
    ],
    result: 'Ordering, kitchen tracking, receipts and daily reports on one order state.',
    limit: 'Prototype with demo prices. No online payment gateway.',
  },
  {
    id: 'cooksmart', title: 'CookSmart', discipline: 'Web application', color: '#d5c8b2',
    steps: [
      {title: 'Recipe collection', text: 'A recipe library with publisher attribution on every dish.', widget: {type: 'grid', cells: 12, cols: 4}},
      {title: 'Search & filters', text: 'Search by dish or ingredient, then narrow by category.', widget: {type: 'card', label: 'Search', text: 'paneer'}},
      {title: 'Attributed instructions', text: 'Full recipe details load in chunks and keep their source.', widget: {type: 'list', rows: [['1 · Marinate the paneer', ''], ['2 · Sear in a hot pan', ''], ['Source', 'original publisher']]}},
      {title: 'Local favourites', text: 'Dishes worth coming back to are saved on this device.', widget: {type: 'button', primary: '♥ Save recipe', secondary: 'Share', stamp: '✓ Saved on this device'}},
    ],
    result: 'From search to a saved recipe, with the publisher credited.',
    limit: 'Favourites stay in this browser and do not sync between devices.',
  },
  {
    id: 'smile-dental', title: 'Smile Dental', discipline: 'Full-stack web application', color: '#d7e0df',
    steps: [
      {title: 'Visit request', text: 'A patient picks a treatment and requests a time.', widget: {type: 'card', label: 'Appointment request', text: 'Cleaning · Tuesday 10:30'}},
      {title: 'Patient sign-in', text: 'Google sign-in opens a personal patient view.', widget: {type: 'button', primary: 'Sign in with Google', secondary: 'View services', stamp: '✓ Patient portal'}},
      {title: 'Appointment state', text: 'Each request moves through clear, visible states.', widget: {type: 'flow', nodes: ['Requested', 'Confirmed', 'Rescheduled']}},
      {title: 'Administration & retries', text: 'Staff confirm, reschedule or cancel; follow-up work is retried.', widget: {type: 'list', rows: [['Tuesday 10:30', 'Confirmed'], ['Thursday 16:00', 'Rescheduled'], ['Follow-up email', 'Retry queued']]}},
    ],
    result: 'Patient booking connected to clinic scheduling and service management.',
    limit: 'Student prototype; no real patient records. Email delivery not independently verified.',
  },
  {
    id: 'meme-coin-lab', title: 'Meme Coin Lab', discipline: 'Research automation', color: '#e8e0ed',
    steps: [
      {title: 'Public evidence', text: 'Public headlines and observations are collected with their sources.', widget: {type: 'list', note: 'Example topics', rows: [['Topic A', '4 sources'], ['Topic B', '2 sources'], ['Topic A (repeat)', '1 source']]}},
      {title: 'Topic deduplication', text: 'Related stories are grouped so one topic is counted once.', widget: {type: 'flow', nodes: ['3 stories', 'Grouped', '1 topic']}},
      {title: 'Scores & coverage', text: 'Versioned heuristic scores, with missing data shown as coverage.', widget: {type: 'bars', note: 'Example values', rows: [['Interest score', .64, '0.64'], ['Data coverage', .8, '80%']]}},
      {title: 'Fictional drafts', text: 'Concept cards and artwork are prepared as drafts only.', widget: {type: 'card', label: 'Fictional concept · draft', text: 'Not published. Not a prediction.'}},
    ],
    result: 'Transparent scores with coverage, kept apart from fictional drafts.',
    limit: 'Scores show research interest, not token returns. Nothing is published to mainnet.',
  },
  {
    id: 'forex-demo', title: 'Forex Demo Lab', discipline: 'Research platform', color: '#d9dfe4',
    steps: [
      {title: 'Broker observations', text: 'Ten markets and five timeframes from a local MetaTrader 5 bridge.', widget: {type: 'chips', items: ['EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'XAUUSD', 'M5', 'M15', 'H1', 'H4', 'D1']}},
      {title: 'Freshness & risk checks', text: 'Stale data is labelled, and limits are checked before anything runs.', widget: {type: 'list', note: 'Example states', rows: [['EURUSD · M15', 'Fresh'], ['GBPUSD · H1', 'Stale'], ['Account limits', 'Within range']], miss: 1}},
      {title: 'Decision history', text: 'Rejected setups stay visible with the reason they were blocked.', widget: {type: 'list', note: 'Example entries', rows: [['Setup 09:15', 'Rejected · data stale'], ['Setup 10:40', 'Rejected · spread'], ['Setup 11:05', 'Logged']]}},
      {title: 'Guarded demo controls', text: 'Demo actions run only when every guard passes.', widget: {type: 'button', primary: 'Send demo order', secondary: 'Review checks', stamp: 'Blocked until data is fresh', blocked: true}},
    ],
    result: 'Charts, signals, news and blocked actions in one demo workspace.',
    limit: 'Demo account only. No demonstrated trading edge; no model authorises orders.',
  },
];
