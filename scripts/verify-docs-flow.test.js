const test = require('node:test');
const assert = require('node:assert/strict');

const {deployBranch} = require('../release-policy');

test('default branch scenario publishes root site and /docs content', () => {
  const deployment = deployBranch({
    currentBranch: '2.x',
    existingBranches: ['1.x', '2.x', 'main'],
    siteBase: '/',
    loadedVersions: [],
    loadedManifest: {},
    docsPaths: [],
    registry: {
      defaultBranch: '2.x',
      deployableBranches: ['1.x', '2.x', 'main'],
    },
  });

  assert.deepEqual(
    deployment.layout,
    {
      buildBaseUrl: '/',
      docsRouteBasePath: 'docs',
      isDefaultBranch: true,
      publishSourceDir: 'build',
      publishTargetDir: '.gh-pages',
      versionedDocsDir: '.gh-pages/docs/2.x',
    },
  );
});

test('main scenario publishes only versioned docs under /docs/next', () => {
  const deployment = deployBranch({
    currentBranch: 'main',
    existingBranches: ['1.x', '2.x', 'main'],
    siteBase: '/',
    loadedVersions: [],
    loadedManifest: {},
    docsPaths: [],
    registry: {
      defaultBranch: '2.x',
      deployableBranches: ['1.x', '2.x', 'main'],
    },
  });

  assert.deepEqual(
    deployment.layout,
    {
      buildBaseUrl: '/docs/next/',
      docsRouteBasePath: '/',
      isDefaultBranch: false,
      publishSourceDir: 'build',
      publishTargetDir: '.gh-pages/docs/next',
      versionedDocsDir: '.gh-pages/docs/next',
    },
  );
});
