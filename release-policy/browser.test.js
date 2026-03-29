const test = require('node:test');
const assert = require('node:assert/strict');

const {
  buildAbsoluteSiteUrl,
  buildSharedDocsManifestPath,
  resolveVersionSwitchTarget,
} = require('./browser');

test('exposes the browser-safe routing helpers', () => {
  const absoluteUrl = buildAbsoluteSiteUrl({
    siteUrl: 'https://koala-ts.github.io',
    path: '/docs/',
  });
  const docPathsPath = buildSharedDocsManifestPath({docsSiteBase: '/'});
  const switchTarget = resolveVersionSwitchTarget({
    availableDocPathsByVersion: {
      next: ['overview/intro'],
    },
    currentPathname: '/docs/overview/intro',
    defaultBranch: '2.x',
    docsSiteBase: '/',
    fallbackDocPath: 'overview/intro',
    targetVersion: 'next',
  });

  assert.deepEqual(
    {
      absoluteUrl,
      docPathsPath,
      switchTarget,
    },
    {
      absoluteUrl: 'https://koala-ts.github.io/docs/',
      docPathsPath: '/docs/doc-paths.json',
      switchTarget: '/docs/next/overview/intro',
    },
  );
});
