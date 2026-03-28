const test = require('node:test');
const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
const {mkdtempSync, readFileSync, writeFileSync} = require('node:fs');
const {join} = require('node:path');
const {tmpdir} = require('node:os');

test('keeps only next and numeric release versions in the shared catalog', () => {
  const tempDir = mkdtempSync(join(tmpdir(), 'version-catalog-'));
  const catalogPath = join(tempDir, 'versions.json');

  writeFileSync(
    catalogPath,
    `${JSON.stringify(['next', '2.x', 'release.x', 'qa-release-smoke'], null, 2)}\n`,
  );

  const output = execFileSync(
    process.execPath,
    ['scripts/build-version-catalog.js', catalogPath, '12.x'],
    {
      cwd: process.cwd(),
      encoding: 'utf8',
    },
  );

  const persistedCatalog = JSON.parse(readFileSync(catalogPath, 'utf8'));

  assert.equal(output.trim(), 'next,12.x,2.x');
  assert.deepEqual(persistedCatalog, ['next', '12.x', '2.x']);
});
