const test = require('node:test');
const assert = require('node:assert/strict');

const {
  resolveVersionSlug,
  sanitizeBranchName,
} = require('./resolve-version-slug');

test('maps main to next', () => {
  const branchName = 'main';

  const versionSlug = resolveVersionSlug(branchName);

  assert.equal(versionSlug, 'next');
});

test('sanitizes a branch name into a stable slug', () => {
  const branchName = ' feature///docs ';

  const versionSlug = sanitizeBranchName(branchName);

  assert.equal(versionSlug, 'feature-docs');
});

test('rejects a missing branch name', () => {
  const act = () => resolveVersionSlug();

  assert.throws(act, /branchName must be a string/);
});
