const test = require('node:test');
const assert = require('node:assert/strict');

const {buildVersionCatalog} = require('./build-version-catalog');

test('keeps only next and numeric release versions in the shared catalog', () => {
  const result = buildVersionCatalog({
    loadedVersions: ['next', '2.x', 'release.x', 'qa-release-smoke'],
    currentVersion: '12.x',
  });

  assert.equal(result.versionCsv, 'next,12.x,2.x');
  assert.deepEqual(result.merged, ['next', '12.x', '2.x']);
});
