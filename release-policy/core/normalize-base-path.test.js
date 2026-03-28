const test = require('node:test');
const assert = require('node:assert/strict');

const {normalizeBasePath} = require('./normalize-base-path');

test('normalizes a base path into slash-delimited form', () => {
  const input = 'docs';

  const result = normalizeBasePath(input);

  assert.equal(result, '/docs/');
});

test('rejects an empty base path input', () => {
  const act = () => normalizeBasePath('');

  assert.throws(act, /value must be a non-empty string/);
});
