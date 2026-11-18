import test from 'node:test';
import assert from 'node:assert/strict';
import {chapterInFocus} from '../src/workbench.js';
import {makeWorkbenchModels} from '../src/workbench-models.js';

test('scroll selects the chapter at the reading line and leaves the stage alone outside it', () => {
  const chapters = [{top: -200, bottom: 280}, {top: 280, bottom: 760}, {top: 760, bottom: 1240}];
  assert.equal(chapterInFocus(chapters, 150), 0);
  assert.equal(chapterInFocus(chapters, 400), 1);
  assert.equal(chapterInFocus(chapters, 850), 2);
  assert.equal(chapterInFocus(chapters, 1300), -1);
});

test('the workbench builds three distinct labeled Three.js models', () => {
  const models = makeWorkbenchModels();
  assert.deepEqual(models.map(model => model.name), ['Markets', 'Retail', 'Language']);
  for (const model of models) {
    assert.ok(model.isGroup);
    assert.ok(model.children.filter(child => child.isMesh).length >= 12);
  }
  assert.notEqual(models[0].children.length, models[1].children.length);
  assert.notEqual(models[1].children.length, models[2].children.length);
});
