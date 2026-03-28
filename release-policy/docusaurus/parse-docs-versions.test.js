const test = require('node:test');
const assert = require('node:assert/strict');

const {parseDocsVersions} = require('./parse-docs-versions');

test('parses comma-separated versions into a trimmed list', () => {
  const rawValue = ' next, 2.x , ,1.x ';

  const versions = parseDocsVersions(rawValue, '2.x');

  assert.deepEqual(versions, ['next', '2.x', '1.x']);
});

test('uses the fallback version when no raw value is provided', () => {
  const rawValue = undefined;

  const versions = parseDocsVersions(rawValue, '2.x');

  assert.deepEqual(versions, ['2.x']);
});
