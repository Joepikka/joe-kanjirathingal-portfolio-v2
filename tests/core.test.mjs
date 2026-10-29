import test from 'node:test';
import assert from 'node:assert/strict';
const core = await import('../src/core.mjs').catch(error => {
  if (error.code !== 'ERR_MODULE_NOT_FOUND') throw error;
  return {};
});
const catalogue = [
  {id:'quotecheck', title:'QuoteCheck', discipline:'Product matching', technologies:['Python','FastAPI'], summary:'Source-linked review'},
  {id:'intentdesk', title:'IntentDesk', discipline:'NLP', technologies:['Python','PyTorch'], summary:'Calibrated intent review'},
  {id:'cooksmart', title:'CookSmart', discipline:'Web development', technologies:['JavaScript'], summary:'Recipe discovery'}
];
test('search matches all words across title and technologies, ignoring case', () => {
  assert.equal(typeof core.searchProjects, 'function', 'Search feature is missing');
  assert.deepEqual(core.searchProjects(catalogue, ' QUOTECHECK python ').map(p=>p.id), ['quotecheck']);
  assert.deepEqual(core.searchProjects(catalogue, 'python review').map(p=>p.id), ['quotecheck','intentdesk']);
  assert.deepEqual(core.searchProjects(catalogue, 'python recipes'), []);
});
test('blank searches return all projects and unmatched text returns none', () => {
  assert.equal(typeof core.searchProjects, 'function', 'Search feature is missing');
  assert.equal(core.searchProjects(catalogue, '   ').length, 3);
  assert.equal(core.searchProjects(catalogue, '<img src=x>').length, 0);
});
test('theme resolves system preference and ignores corrupt saved values', () => {
  assert.equal(typeof core.resolveTheme, 'function', 'Theme feature is missing');
  assert.equal(core.resolveTheme('dark', false), 'dark');
  assert.equal(core.resolveTheme('light', true), 'light');
  assert.equal(core.resolveTheme('system', true), 'dark');
  assert.equal(core.resolveTheme('corrupt', false), 'light');
});
test('illustrative vectors are deterministic, labelled, finite and distinct', () => {
  assert.equal(typeof core.makeVectorSamples, 'function', 'Vector samples are missing');
  const samples = core.makeVectorSamples();
  assert.equal(samples.length, 12);
  assert.deepEqual(samples, core.makeVectorSamples());
  assert.equal(new Set(samples.map(s=>s.id)).size, 12);
  assert.equal(new Set(samples.map(s=>s.group)).size, 3);
  assert.ok(samples.every(s=>s.position.length===3 && s.position.every(Number.isFinite) && s.text.length>10));
});
test('nearest point uses all three coordinates and handles empty or invalid input', () => {
  assert.equal(typeof core.nearestSample, 'function', 'Point selection is missing');
  const points = [{id:'a',position:[0,0,10]},{id:'b',position:[0,0,1]}];
  assert.equal(core.nearestSample(points,[0,0,0]).id, 'b');
  assert.equal(core.nearestSample([], [0,0,0]), null);
  assert.equal(core.nearestSample(points, [NaN,0,0]), null);
});
test('pipeline progression clamps boundaries and changes at quarter intervals', () => {
  assert.equal(typeof core.pipelineStep, 'function', 'Pipeline controls are missing');
  assert.deepEqual([-.1,0,.24,.25,.5,.75,1,4].map(p=>core.pipelineStep(p)), [0,0,0,1,2,3,3,3]);
});
