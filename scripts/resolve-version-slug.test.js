const test = require('node:test');
const assert = require('node:assert/strict');

const {resolveVersionSlug, sanitizeBranchName} = require('./resolve-version-slug');

test('maps main to next', () => {
  assert.equal(resolveVersionSlug('main'), 'next');
});

test('sanitizes release branch names into stable version slugs', () => {
  assert.equal(resolveVersionSlug('Release Candidate'), 'release-candidate');
  assert.equal(sanitizeBranchName(' feature///docs '), 'feature-docs');
});
