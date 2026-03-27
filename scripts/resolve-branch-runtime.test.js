const test = require('node:test');
const assert = require('node:assert/strict');

const {resolveBranchRuntime} = require('./resolve-branch-runtime');

test('uses explicit docs branch configuration when provided', () => {
  const runtime = resolveBranchRuntime({
    DOCS_CURRENT_BRANCH: '2.x',
    DOCS_DEFAULT_BRANCH: '2.x',
  });

  assert.deepEqual(runtime, {
    currentBranch: '2.x',
    defaultBranch: '2.x',
    isDefaultBranch: true,
  });
});

test('defaults current branch to the configured default branch', () => {
  const runtime = resolveBranchRuntime({});

  assert.deepEqual(runtime, {
    currentBranch: '2.x',
    defaultBranch: '2.x',
    isDefaultBranch: true,
  });
});

test('uses the provided branch values when current and default branches differ', () => {
  const runtime = resolveBranchRuntime({
    DOCS_CURRENT_BRANCH: '2.x',
    DOCS_DEFAULT_BRANCH: 'main',
  });

  assert.deepEqual(runtime, {
    currentBranch: '2.x',
    defaultBranch: 'main',
    isDefaultBranch: false,
  });
});

test('defaults current branch to an overridden default branch', () => {
  const runtime = resolveBranchRuntime({
    DOCS_DEFAULT_BRANCH: '3.x',
  });

  assert.deepEqual(runtime, {
    currentBranch: '3.x',
    defaultBranch: '3.x',
    isDefaultBranch: true,
  });
});
