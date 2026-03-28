const test = require('node:test');
const assert = require('node:assert/strict');

const {LOCAL_PREVIEW_MODE} = require('./resolve-branch-runtime');
const {resolveDefaultBranch} = require('./resolve-default-branch');

test('rejects missing default branch configuration', () => {
  const act = () =>
    resolveDefaultBranch({
      DOCS_CURRENT_BRANCH: '2.x',
    });

  assert.throws(act, /DOCS_DEFAULT_BRANCH must be provided/);
});

test('uses the injected default branch when one is provided', () => {
  const env = {
    DOCS_CURRENT_BRANCH: '2.x',
    DOCS_DEFAULT_BRANCH: '3.x',
  };

  const defaultBranch = resolveDefaultBranch(env);

  assert.equal(defaultBranch, '3.x');
});

test('keeps the checked out branch canonical in local preview mode', () => {
  const env = {
    DOCS_CURRENT_BRANCH: '2.x',
    DOCS_RUNTIME_MODE: LOCAL_PREVIEW_MODE,
    DOCS_DEFAULT_BRANCH: '3.x',
  };

  const defaultBranch = resolveDefaultBranch(env);

  assert.equal(defaultBranch, '2.x');
});
