(() => {
  'use strict';
  const projects = window.portfolioProjects || [];
  const arrow = '<svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19L19 5M5 5h14v14"/></svg>';
  const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const externalLink = (url, label) => `<a class="pill-link" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)}${arrow}</a>`;
  document.querySelectorAll('[data-project-count]').forEach(node => { node.textContent = projects.length; });
  const studySections = project => (project.caseStudy || []).map(section => `<section class="case-study-section"><h2>${esc(section.heading)}</h2><p>${esc(section.text)}</p></section>`).join('');
  const projectFlow = project => project.flow ? `<section class="project-flow" aria-labelledby="flow-heading"><h2 id="flow-heading">How the pieces connect.</h2><ol>${project.flow.map(step=>`<li>${esc(step)}</li>`).join('')}</ol></section>` : '';
  const supplementalEvidence = project => project.id === 'kerala-veg-prices' ? `<section class="supplemental-evidence"><h2>Also in Power BI and Excel.</h2><p>The same cleaned data as a three-page Power BI report, built on a star schema with DAX measures, and an Excel workbook with a crop-driven dashboard, a PivotTable with slicers and formula checks against Python.</p><figure class="project-detail-media" style="background:#e3d7de;margin-top:28px"><img src="assets/kerala-powerbi-overview.webp" width="1280" height="740" alt="Power BI Overview page: monthly Kerala and all-India median price, premium and spike cards, crop and year slicers" loading="lazy" decoding="async"></figure><p class="media-caption detail-media-caption">Power BI · Overview page. Crop and year slicers filter every visual through a DAX date and crop table.</p><figure class="project-detail-media" style="background:#e3d7de;margin-top:28px"><img src="assets/kerala-powerbi-warning.webp" width="1280" height="740" alt="Power BI Shocks and warning page: 28 spikes, 22 hub-first, 14.5-day lead, 32% precision, 29% recall, warning score chart and model comparison table" loading="lazy" decoding="async"></figure><p class="media-caption detail-media-caption">Power BI · Shocks & warning page. Precision and recall are DAX measures over the model's held-out predictions.</p><figure class="project-detail-media" style="background:#e3d7de;margin-top:28px"><img src="assets/kerala-excel-dashboard.webp" width="1280" height="655" alt="Excel dashboard: crop and date input cells driving median prices, the Kerala premium and a monthly line chart" loading="lazy" decoding="async"></figure><p class="media-caption detail-media-caption">Excel · Dashboard sheet. The yellow cells drive every formula and both charts; a Checks sheet matches 12 numbers to Python.</p><div class="project-actions">${externalLink('https://github.com/Joepikka/kerala-veg-prices/raw/main/powerbi/KeralaVegPrices.pbix','Download the .pbix')}${externalLink('https://github.com/Joepikka/kerala-veg-prices/raw/main/reports/kerala_veg_prices.xlsx','Download the .xlsx')}${externalLink('https://github.com/Joepikka/kerala-veg-prices/blob/main/reports/kerala_veg_prices_powerbi.pdf','Power BI report as PDF')}</div></section>` : project.id === 'laliga-ml' ? `<section class="supplemental-evidence"><h2 id="comparison-heading">A comparison worth keeping.</h2><table class="evaluation-table"><caption>Recorded historical test · 86 reserved fixtures</caption><thead><tr><th scope="col">Measure</th><th scope="col">Selected v4 release</th><th scope="col">Frozen v3 baseline</th></tr></thead><tbody><tr><th scope="row">Accuracy</th><td>47.67%</td><td>50.00%</td></tr><tr><th scope="row">Log loss (lower is better)</th><td>1.0861</td><td>1.0220</td></tr><tr><th scope="row">Draws correctly classified</th><td>0 / 18</td><td>0 / 18</td></tr></tbody></table><p class="project-note">The selected v4 release is the team-context logistic model, not the pure neural ensemble. The richer workflow did not beat the frozen baseline. These repository-recorded results were not rerun for this portfolio; the final test is consumed.</p></section>` : project.id === 'intentdesk' ? `<section class="supplemental-evidence"><h2>More than one experiment.</h2><p>The separate feedback lab compares review-rating models on product-disjoint splits. On the same fresh 20,000-review check, the preselected word/character V2 model recorded 69.13% accuracy and 0.5591 macro-F1, versus the original model at 67.955% and 0.5487. A later IDF experiment failed its development promotion rule, so V2 was retained.</p><p>Passage retrieval is another separate task: disk-based BM25 over 8.84 million research passages recorded MRR@10 of 0.2195 on a fixed 100-query development sample. Those passages are not verified customer-support answers.</p><div class="project-actions">${externalLink('https://github.com/Joepikka/intentdesk/blob/main/reports/Milestone_11.md','Feedback evaluation')}${externalLink('https://github.com/Joepikka/intentdesk/blob/main/reports/Milestone_12.md','Why V2 was retained')}</div></section>` : '';
  const videoSection = project => project.video ? `<section class="walkthrough" aria-labelledby="walkthrough-heading"><div class="section-heading"><h2 id="walkthrough-heading">See the project.</h2><span>${esc(project.video.label)}</span></div><video controls playsinline preload="none" poster="${esc(project.video.poster)}" aria-label="${esc(project.title)} screenshot walkthrough"><source src="${esc(project.video.src)}" type="video/mp4"><track kind="captions" src="${esc(project.video.captions)}" srclang="en" label="English" default>Your browser does not support embedded video. <a href="${esc(project.video.src)}">Download the walkthrough</a>.</video><p>${esc(project.video.description)} <a class="text-link" href="${esc(project.video.transcript)}">Read the transcript</a></p></section>` : '';
  const explainerSection = project => project.explainer ? `<section class="walkthrough explainer" aria-labelledby="explainer-heading"><div class="section-heading"><h2 id="explainer-heading">Watch how it works.</h2><span>20-second motion explainer</span></div><video controls playsinline preload="none" poster="${esc(project.explainerPoster)}" aria-label="${esc(project.title)} motion explainer of the four steps above"><source src="${esc(project.explainer)}" type="video/mp4">Your browser does not support embedded video. <a href="${esc(project.explainer)}">Download the explainer</a>.</video><p>An illustrative walk through the four steps above, with sound effects and no narration. Values marked “example” are illustrative; the closing result comes from the case study. Sound effects are CC0 recordings found through <a class="text-link" href="https://openverse.org" target="_blank" rel="noopener noreferrer">Openverse</a>.</p></section>` : '';
  const evaluation = project => project.id === 'intentdesk' ? `<section class="evaluation" aria-labelledby="evaluation-heading"><h2 id="evaluation-heading">What the benchmark showed.</h2><p>Final known-intent accuracy · 4,500 requests · 150 categories. The primary model was selected before this comparison.</p><div class="evaluation-chart" role="img" aria-label="Known-intent accuracy: lexical baseline 91.96 percent; preselected MPNet linear 96.24 percent; small neural head 96.20 percent; large neural head 94.27 percent. Bar lengths use a zero to one hundred percent scale.">${[['Lexical baseline',91.96],['MPNet + linear (primary)',96.24],['Small neural head',96.20],['Large neural head',94.27]].map(([label,value])=>`<div class="evaluation-row"><span>${label}</span><div class="evaluation-bar"><i style="width:${value}%"></i></div><strong>${value.toFixed(2)}%</strong></div>`).join('')}<div class="evaluation-scale"><span>0%</span><span>100%</span></div></div><table class="evaluation-table"><caption>Primary classifier and unsupported-input check</caption><tbody><tr><th scope="row">Known-intent accuracy</th><td>96.24%</td></tr><tr><th scope="row">Macro-F1</th><td>0.9624</td></tr><tr><th scope="row">Calibration error (ECE, 15 bins)</th><td>0.0074</td></tr><tr><th scope="row">Unsupported requests wrongly accepted by proposed thresholds</th><td>135 / 1,000 (13.5%)</td></tr><tr><th scope="row">Deployment decision</th><td>Human review for every request</td></tr></tbody></table><p class="project-note">These are fixed benchmark results, not measured customer outcomes. High known-intent accuracy did not make the unsupported-input policy safe. <a href="${esc(project.evidence)}" target="_blank" rel="noopener noreferrer">Read the evaluation and limitations</a>.</p></section>` : '';
  const media = (project, lazy = true) => `<img src="${esc(project.image)}" ${project.imageSmall ? `srcset="${esc(project.imageSmall)} ${project.imageSmallWidth}w, ${esc(project.image)} ${project.imageWidth}w" sizes="${lazy ? '(max-width:720px) 90vw, 45vw' : '90vw'}"` : ''} width="${project.mediaWidth}" height="${project.mediaHeight}" alt="${esc(project.imageAlt || project.title + ' project preview')}" ${lazy ? 'loading="lazy"' : 'fetchpriority="high"'} decoding="async" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><div class="project-code-art" hidden><strong>${esc(project.title)}</strong><span>${esc(project.status)}</span></div>`;

  document.querySelectorAll('[data-project-list]').forEach(list => {
    const selected = list.dataset.projectList === 'featured' ? projects.slice(0, 4) : projects;
    list.innerHTML = selected.map(project => `<a class="project-row" data-project="${esc(project.id)}" href="project.html?id=${esc(project.id)}"><h3>${esc(project.shortTitle || project.title)}</h3><p>${esc(project.discipline)}</p>${arrow}</a>`).join('');
  });

  const grid = document.querySelector('[data-project-grid]');
  if (grid) {
    grid.innerHTML = projects.map(project => `<a class="project-card" data-category="${esc(project.category)}" href="project.html?id=${esc(project.id)}"><div class="project-media" style="background:${esc(project.color)}">${media(project)}</div>${project.imageCaption ? `<p class="media-caption">${esc(project.imageCaption)}</p>` : ''}<h2>${esc(project.title)}</h2><div class="card-meta"><span>${esc(project.discipline)}</span>${arrow}</div><p class="project-card-status">${esc(project.status)}</p></a>`).join('');
    const status = document.querySelector('[data-result-count]');
    status.textContent = `${projects.length} projects`;
    document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      let count = 0;
      grid.querySelectorAll('.project-card').forEach(card => { card.hidden = filter !== 'all' && !card.dataset.category.split(' ').includes(filter); if (!card.hidden) count++; });
      status.textContent = `${count} ${count === 1 ? 'project' : 'projects'}`;
    }));
  }

  const detail = document.querySelector('[data-project-detail]');
  if (detail) {
    const id = detail.dataset.projectId || new URLSearchParams(location.search).get('id');
    const project = projects.find(item => item.id === id);
    if (project) {
      document.title = `${project.title} — Joe Kanjirathingal`;
      document.querySelector('meta[name="description"]').content = project.summary;
      const actions = `${project.demo ? externalLink(project.demo, 'Explore live project') : ''}${project.source ? externalLink(project.source, 'Code on GitHub') : ''}${project.evidence ? externalLink(project.evidence, 'Read the evidence') : ''}`;
      detail.innerHTML = `<a class="text-link project-back" href="work.html"><svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16M13 5l7 7-7 7"/></svg>All projects</a><h1>${esc(project.title)}</h1><p class="project-summary">${esc(project.summary)}</p><dl class="project-facts"><div><dt>Focus</dt><dd>${esc(project.discipline)}</dd></div><div><dt>Tools</dt><dd>${project.technologies.map(esc).join(' · ')}</dd></div><div><dt>Project status</dt><dd>${esc(project.status)}</dd></div></dl><div class="project-actions">${project.demo ? externalLink(project.demo, 'Explore live project') : ''}${project.source ? externalLink(project.source, 'Code on GitHub') : ''}${project.evidence ? externalLink(project.evidence, 'Read the evidence') : ''}</div><div class="project-detail-media" style="background:${esc(project.color)}">${media(project, false)}</div><section class="project-detail-copy"><h2>In the build.</h2><div><ul>${project.features.map(item => `<li>${esc(item)}</li>`).join('')}</ul><p class="project-note">${esc(project.note)}</p></div></section>`;
      const actionBlock = detail.querySelector('.project-actions');
      if (!actions) actionBlock.remove();
      if (project.imageCaption) detail.querySelector('.project-detail-media').insertAdjacentHTML('afterend', `<p class="media-caption detail-media-caption">${esc(project.imageCaption)}${project.imageKind === 'concept' ? ' · A visual interpretation of the project, not a screenshot.' : ''}</p>`);
      detail.insertAdjacentHTML('beforeend', `${projectFlow(project)}${explainerSection(project)}<div class="case-study">${studySections(project)}</div>${evaluation(project)}${supplementalEvidence(project)}${videoSection(project)}<div class="project-next"><a class="text-link" href="project.html?id=${esc(projects[(projects.indexOf(project)+1)%projects.length].id)}">Next project: ${esc(projects[(projects.indexOf(project)+1)%projects.length].title)}${arrow}</a></div>`);
    } else {
      detail.classList.add('detail-error');
      detail.innerHTML = '<h1>Project not found.</h1><p>That project link is not in this portfolio. You can explore all projects below.</p><a class="pill-link" href="work.html">Explore projects</a>';
    }
  }

  const nav = document.querySelector('#navigation');
  const trigger = document.querySelector('.menu-trigger');
  if (nav && trigger) {
    trigger.addEventListener('click', () => { if (!nav.open) nav.showModal(); });
    nav.querySelector('.menu-close').addEventListener('click', () => nav.close());
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.close()));
    nav.addEventListener('click', event => { if (event.target === nav) { const box = nav.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right) nav.close(); } });
  }

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const motionButton = document.querySelector('.motion-toggle');
  let paused = reducedMotion.matches;
  try { paused = reducedMotion.matches || localStorage.getItem('portfolio-motion') === 'paused'; } catch {}
  const setMotion = value => {
    paused = reducedMotion.matches || value;
    document.body.classList.toggle('motion-paused', paused);
    if (motionButton) { motionButton.setAttribute('aria-pressed', String(paused)); motionButton.querySelector('span').textContent = paused ? 'Resume motion' : 'Pause motion'; }
    document.querySelectorAll('.magnetic').forEach(node=>node.style.removeProperty('transform'));
    try { localStorage.setItem('portfolio-motion', value ? 'paused' : 'on'); } catch {}
    window.dispatchEvent(new Event('portfolio-motion-change'));
  };
  setMotion(paused);
  motionButton?.addEventListener('click', () => setMotion(!paused));
  addEventListener('portfolio-motion-request', event=>setMotion(Boolean(event.detail)));
  reducedMotion.addEventListener('change', event => setMotion(event.matches));

  const finePointer = matchMedia('(hover:hover) and (pointer:fine)');
  const ribbon = document.querySelector('.image-ribbon');
  let scheduled = false;
  const updateScroll = () => {
    document.body.classList.toggle('scrolled', scrollY > 250);
    if (ribbon && innerWidth > 720 && finePointer.matches && !paused && !reducedMotion.matches) { const box = ribbon.getBoundingClientRect(); if (box.top < innerHeight && box.bottom > 0) ribbon.style.setProperty('--ribbon-x', `${Math.max(-65, Math.min(65, (innerHeight / 2 - box.top) * .09))}px`); }
    scheduled = false;
  };
  addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateScroll); } }, { passive: true });
  updateScroll();

  document.querySelectorAll('.magnetic').forEach(control => {
    control.addEventListener('pointermove', event => { if (paused || reducedMotion.matches || !finePointer.matches) return; const box = control.getBoundingClientRect(); const x = (event.clientX - box.left - box.width / 2) * .15; const y = (event.clientY - box.top - box.height / 2) * .15; control.style.transform = `translate(${x}px, ${y}px)`; });
    control.addEventListener('pointerleave', () => control.style.removeProperty('transform'));
  });

  const hover = document.querySelector('.project-hover');
  if (hover) {
    let hoverActive = false;
    document.querySelectorAll('.project-row').forEach(row => {
      row.addEventListener('pointerenter', () => {
        if (!finePointer.matches || reducedMotion.matches || paused) return;
        const project = projects.find(item => item.id === row.dataset.project);
        if (!project) return;
        hover.querySelector('img').src = project.image;
        hover.querySelector('.hover-image').style.background = project.color;
        hoverActive = true;
        hover.classList.add('is-active');
      });
      row.addEventListener('pointermove', event => { if (!hoverActive) return; hover.style.left = `${Math.max(190, Math.min(innerWidth - 190, event.clientX))}px`; hover.style.top = `${Math.max(140, Math.min(innerHeight - 140, event.clientY))}px`; });
      row.addEventListener('pointerleave', () => { hoverActive = false; hover.classList.remove('is-active'); });
    });
    addEventListener('scroll', () => { hoverActive = false; hover.classList.remove('is-active'); }, { passive: true });
  }

  document.querySelectorAll('[data-local-time]').forEach(node => {
    const update = () => { node.textContent = new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata', hour12: true }).format(new Date()) + ' IST'; };
    update();
    setInterval(update, 60000);
  });

  const intro = document.querySelector('.intro-screen');
  if (intro && !reducedMotion.matches) {
    // Browser privacy settings may disable session storage; the page still works.
    try { if (!sessionStorage.getItem('joe-portfolio-visited')) { intro.classList.add('is-playing'); sessionStorage.setItem('joe-portfolio-visited', '1'); intro.addEventListener('animationend', () => intro.remove(), { once: true }); } } catch { intro.remove(); }
  }
})();
