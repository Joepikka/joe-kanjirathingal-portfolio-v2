(() => {
  let preference = 'system';
  try { preference = localStorage.getItem('portfolio-theme') || 'system'; } catch {}
  document.documentElement.dataset.theme = preference === 'dark' || preference === 'light' ? preference : matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
})();
