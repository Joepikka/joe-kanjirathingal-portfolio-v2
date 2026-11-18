export function chapterInFocus(chapters, readingLine) {
  return chapters.findIndex(chapter => readingLine >= chapter.top && readingLine < chapter.bottom);
}

export function initWorkbench(root, projects) {
  const chapters = Array.from(root.querySelectorAll('[data-bench-project]'));
  const choices = Array.from(root.querySelectorAll('[data-bench-select]'));
  const stage = root.querySelector('[data-bench-stage]');
  const mount = root.querySelector('[data-bench-mount]');
  const poster = root.querySelector('[data-bench-poster]');
  const label = root.querySelector('[data-bench-label]');
  const link = root.querySelector('[data-bench-link]');
  const toggle = root.querySelector('[data-bench-toggle]');
  const turnControls = root.querySelector('[data-bench-turn]');
  const status = root.querySelector('[data-bench-status]');
  const wide = matchMedia('(min-width: 861px)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const motionAllowed = () => !reducedMotion.matches && !document.body.classList.contains('motion-paused');
  let active = -1;
  let instance = null;
  let loading = false;
  let frame = 0;
  let inView = false;

  function setChapter(index) {
    if (index === active) return;
    const chapter = chapters[index];
    const project = projects.find(item => item.id === chapter.dataset.benchProject);
    if (!project) return;
    const direction = active < 0 ? 0 : Math.sign(index - active);
    active = index;
    choices.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    chapters.forEach((entry, i) => entry.classList.toggle('is-current', i === index));
    label.textContent = chapter.dataset.benchLabel;
    link.href = chapter.querySelector('a').href;
    link.setAttribute('aria-label', `Read the ${project.title} case study`);
    poster.alt = project.imageAlt || `${project.title} project screenshot`;
    if (project.imageSmall) {
      poster.srcset = `${project.imageSmall} ${project.imageSmallWidth}w, ${project.image} ${project.imageWidth}w`;
    } else poster.removeAttribute('srcset');
    poster.src = project.image;
    instance?.select(index, direction);
  }

  function syncScroll() {
    frame = 0;
    if (!inView || !wide.matches) return;
    const index = chapterInFocus(chapters.map(chapter => chapter.getBoundingClientRect()), innerHeight * .53);
    if (index >= 0) setChapter(index);
  }
  const scheduleScroll = () => {
    if (inView && wide.matches && !frame) frame = requestAnimationFrame(syncScroll);
  };
  const observer = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    scheduleScroll();
  });
  observer.observe(root);
  addEventListener('scroll', scheduleScroll, {passive: true});
  addEventListener('resize', scheduleScroll, {passive: true});
  wide.addEventListener('change', scheduleScroll);

  choices.forEach((button, index) => button.addEventListener('click', () => {
    setChapter(index);
    if (wide.matches) {
      const rect = chapters[index].getBoundingClientRect();
      scrollBy({top: rect.top - innerHeight * .32, behavior: 'instant'});
    }
  }));
  turnControls.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => instance?.turn(Number(button.value) * Math.PI / 6));
  });
  function showPreview(message) {
    if (turnControls.contains(document.activeElement)) toggle.focus();
    instance?.dispose();
    instance = null;
    stage.classList.remove('is-3d');
    turnControls.hidden = true;
    toggle.textContent = 'Open 3D';
    toggle.setAttribute('aria-pressed', 'false');
    status.textContent = message;
  }
  toggle.addEventListener('click', async () => {
    if (instance) {
      showPreview('Showing the project preview.');
      return;
    }
    if (loading) return;
    loading = true;
    toggle.setAttribute('aria-busy', 'true');
    toggle.textContent = 'Opening 3D…';
    status.textContent = 'Loading the 3D model.';
    try {
      const {mountWorkbenchScene} = await import('./workbench-scene.js');
      instance = mountWorkbenchScene(mount, {
        motionAllowed,
        onLost: () => showPreview('3D stopped. The project preview is available.')
      });
      instance.select(active);
      stage.classList.add('is-3d');
      turnControls.hidden = false;
      toggle.textContent = 'Close 3D';
      toggle.setAttribute('aria-pressed', 'true');
      status.textContent = 'Drag sideways or use the rotate buttons. Models illustrate the work.';
    } catch {
      showPreview('3D is unavailable in this browser. The project preview and case study are available.');
    } finally {
      loading = false;
      toggle.removeAttribute('aria-busy');
    }
  });
  reducedMotion.addEventListener('change', () => instance?.wake());
  addEventListener('portfolio-motion-change', () => instance?.wake());
  setChapter(0);
  stage.dataset.ready = '';
}
