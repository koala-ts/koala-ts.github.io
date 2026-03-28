const test = require('node:test');
const assert = require('node:assert/strict');

const {
  PUBLISH_SIMULATION_MODE,
} = require('./resolve-branch-runtime');
const {resolveLocalDocsEnv} = require('./resolve-local-docs-env');

test('uses the configured default branch when provided', () => {
  const env = {
    DOCS_CURRENT_BRANCH: '2.x',
    DOCS_DEFAULT_BRANCH: '3.x',
  };

  const docsEnv = resolveLocalDocsEnv(env);

  assert.deepEqual(docsEnv, {
    DOCS_CURRENT_BRANCH: '2.x',
    DOCS_DEFAULT_BRANCH: '3.x',
  });
});

test('resolves the current branch from the adapter when one is not provided', () => {
  const env = {};

  const docsEnv = resolveLocalDocsEnv(env, {
    resolveGitBranch: () => '2.x',
  });

  assert.deepEqual(docsEnv, {
    DOCS_CURRENT_BRANCH: '2.x',
    DOCS_DEFAULT_BRANCH: '2.x',
  });
});

test('keeps the current branch canonical outside publish simulation mode', () => {
  const env = {
    DOCS_CURRENT_BRANCH: '2.x',
  };

  const docsEnv = resolveLocalDocsEnv(env);

  assert.deepEqual(docsEnv, {
    DOCS_CURRENT_BRANCH: '2.x',
    DOCS_DEFAULT_BRANCH: '2.x',
  });
});

test('rejects publish simulation mode without a default branch', () => {
  const act = () =>
    resolveLocalDocsEnv({
      DOCS_CURRENT_BRANCH: '2.x',
      DOCS_RUNTIME_MODE: PUBLISH_SIMULATION_MODE,
    });

  assert.throws(act, /DOCS_DEFAULT_BRANCH must be provided in publish-simulation mode/);
});
