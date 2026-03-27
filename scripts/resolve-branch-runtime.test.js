const test = require('node:test');
const assert = require('node:assert/strict');

const {
  LOCAL_PREVIEW_MODE,
  PUBLISH_SIMULATION_MODE,
  resolveBranchRuntime,
} = require('./resolve-branch-runtime');

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

test('defaults current and default branches to the checked out branch', () => {
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
    currentBranch: '2.x',
    defaultBranch: '3.x',
    isDefaultBranch: false,
  });
});

test('uses local preview mode to keep the checked out branch canonical locally', () => {
  const runtime = resolveBranchRuntime({
    DOCS_RUNTIME_MODE: LOCAL_PREVIEW_MODE,
    DOCS_DEFAULT_BRANCH: '3.x',
  });

  assert.deepEqual(runtime, {
    currentBranch: '2.x',
    defaultBranch: '2.x',
    isDefaultBranch: true,
  });
});

test('uses publish simulation mode to honor the injected default branch', () => {
  const runtime = resolveBranchRuntime({
    DOCS_RUNTIME_MODE: PUBLISH_SIMULATION_MODE,
    DOCS_DEFAULT_BRANCH: '3.x',
  });

  assert.deepEqual(runtime, {
    currentBranch: '2.x',
    defaultBranch: '3.x',
    isDefaultBranch: false,
  });
});

test('rejects publish simulation mode without an injected default branch', () => {
  assert.throws(
    () =>
      resolveBranchRuntime({
        DOCS_RUNTIME_MODE: PUBLISH_SIMULATION_MODE,
      }),
    /DOCS_DEFAULT_BRANCH must be provided in publish-simulation mode/,
  );
});
