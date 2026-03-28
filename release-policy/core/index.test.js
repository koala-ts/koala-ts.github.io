const test = require('node:test');
const assert = require('node:assert/strict');

const core = require('./index');

test('exports the release policy core surface', () => {
  const exportedKeys = Object.keys(core).sort();

  const result = exportedKeys;

  assert.deepEqual(result, [
    'normalizeBasePath',
    'resolvePublishLayout',
    'resolveVersionSlug',
    'sanitizeBranchName',
  ]);
});
