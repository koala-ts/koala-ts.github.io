const test = require('node:test');
const assert = require('node:assert/strict');

const {resolvePublishContext} = require('./resolve-publish-context');

test('resolves publish context for the default branch', () => {
  const publishContext = resolvePublishContext({
    currentBranch: '2.x',
    registry: {
      defaultBranch: '2.x',
      deployableBranches: ['1.x', '2.x', 'main'],
    },
  });

  assert.deepEqual(publishContext, {
    currentBranch: '2.x',
    defaultBranch: '2.x',
    deployableBranches: ['1.x', '2.x', 'main'],
    versionSlug: '2.x',
    isDefaultBranch: true,
    isDeployableBranch: true,
    docsRouteBasePath: 'docs',
  });
});

test('resolves publish context for main under /docs/next', () => {
  const publishContext = resolvePublishContext({
    currentBranch: 'main',
    registry: {
      defaultBranch: '2.x',
      deployableBranches: ['1.x', '2.x', 'main'],
    },
  });

  assert.deepEqual(publishContext, {
    currentBranch: 'main',
    defaultBranch: '2.x',
    deployableBranches: ['1.x', '2.x', 'main'],
    versionSlug: 'next',
    isDefaultBranch: false,
    isDeployableBranch: true,
    docsRouteBasePath: '/',
  });
});
