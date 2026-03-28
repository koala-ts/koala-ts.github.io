const test = require('node:test');
const assert = require('node:assert/strict');

const {
  LOCAL_PREVIEW_MODE,
  PUBLISH_SIMULATION_MODE,
  resolveBranchRuntime,
} = require('./resolve-branch-runtime');

test('uses explicit docs branch configuration when provided', () => {
  const env = {
    DOCS_CURRENT_BRANCH: '2.x',
    DOCS_DEFAULT_BRANCH: '2.x',
  };

  const runtime = resolveBranchRuntime(env);

  assert.deepEqual(runtime, {
    currentBranch: '2.x',
    defaultBranch: '2.x',
    isDefaultBranch: true,
  });
});

test('rejects missing current branch configuration', () => {
  const act = () =>
    resolveBranchRuntime({
      DOCS_DEFAULT_BRANCH: '2.x',
    });

  assert.throws(act, /DOCS_CURRENT_BRANCH must be provided/);
});

test('rejects missing default branch configuration', () => {
  const act = () =>
    resolveBranchRuntime({
      DOCS_CURRENT_BRANCH: '2.x',
    });

  assert.throws(act, /DOCS_DEFAULT_BRANCH must be provided/);
});

test('uses the provided branch values when current and default branches differ', () => {
  const env = {
    DOCS_CURRENT_BRANCH: '2.x',
    DOCS_DEFAULT_BRANCH: 'main',
  };

  const runtime = resolveBranchRuntime(env);

  assert.deepEqual(runtime, {
    currentBranch: '2.x',
    defaultBranch: 'main',
    isDefaultBranch: false,
  });
});

test('uses local preview mode to keep the checked out branch canonical locally', () => {
  const env = {
    DOCS_CURRENT_BRANCH: '2.x',
    DOCS_RUNTIME_MODE: LOCAL_PREVIEW_MODE,
    DOCS_DEFAULT_BRANCH: '3.x',
  };

  const runtime = resolveBranchRuntime(env);

  assert.deepEqual(runtime, {
    currentBranch: '2.x',
    defaultBranch: '2.x',
    isDefaultBranch: true,
  });
});

test('uses publish simulation mode to honor the injected default branch', () => {
  const env = {
    DOCS_CURRENT_BRANCH: '2.x',
    DOCS_RUNTIME_MODE: PUBLISH_SIMULATION_MODE,
    DOCS_DEFAULT_BRANCH: '3.x',
  };

  const runtime = resolveBranchRuntime(env);

  assert.deepEqual(runtime, {
    currentBranch: '2.x',
    defaultBranch: '3.x',
    isDefaultBranch: false,
  });
});

test('rejects publish simulation mode without an injected default branch', () => {
  const act = () =>
    resolveBranchRuntime({
      DOCS_CURRENT_BRANCH: '2.x',
      DOCS_RUNTIME_MODE: PUBLISH_SIMULATION_MODE,
    });

  assert.throws(act, /DOCS_DEFAULT_BRANCH must be provided/);
});
