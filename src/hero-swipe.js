export function mountHeroSwipe(hero, line, enabled) {
  let pointer = null;
  let origin;
  let points = [];

  const clear = () => {
    pointer = null;
    points = [];
    line.classList.remove('is-active');
  };
  const point = event => [
    Math.round(event.clientX - origin.left),
    Math.round(event.clientY - origin.top)
  ];

  hero.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'touch' || !event.isPrimary || !enabled()
      || event.target.closest?.('a, button, input, select, textarea, summary')) return;
    clear();
    origin = hero.getBoundingClientRect();
    pointer = event.pointerId;
    points = [point(event)];
    line.setAttribute('points', '');
  }, { passive: true });

  hero.addEventListener('pointermove', event => {
    if (event.pointerId !== pointer) return;
    if (!enabled()) {
      clear();
      return;
    }
    const next = point(event);
    const [x, y] = points.at(-1);
    if (Math.hypot(next[0] - x, next[1] - y) < (points.length === 1 ? 8 : 2)) return;
    points.push(next);
    if (points.length > 16) points.shift();
    line.setAttribute('points', points.map(pair => pair.join(',')).join(' '));
    line.classList.add('is-active');
  }, { passive: true });

  for (const type of ['pointerup', 'pointercancel', 'pointerleave']) {
    hero.addEventListener(type, event => {
      if (event.pointerId === pointer) clear();
    }, { passive: true });
  }
  return clear;
}
