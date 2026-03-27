const test = require('node:test');
const assert = require('node:assert/strict');

const {resolveDefaultBranch} = require('./resolve-default-branch');

test('reads the default branch from the repo-owned site config', () => {
  assert.equal(resolveDefaultBranch(), '2.x');
});
