const test = require('node:test');
const assert = require('node:assert/strict');

const {
  resolvePublishLayout,
} = require('./resolve-publish-layout');

test('publishes the default branch build from the site root', () => {
  const layout = resolvePublishLayout({
    currentBranch: '2.x',
    defaultBranch: '2.x',
    siteBase: '/',
    versionSlug: '2.x',
  });

  assert.deepEqual(layout, {
    buildBaseUrl: '/',
    docsRouteBasePath: 'docs',
    isDefaultBranch: true,
    publishSourceDir: 'build',
    publishTargetDir: '.gh-pages',
    versionedDocsDir: '.gh-pages/docs/2.x',
  });
});

test('publishes a non-default branch under its versioned docs path', () => {
  const layout = resolvePublishLayout({
    currentBranch: 'main',
    defaultBranch: '2.x',
    siteBase: '/',
    versionSlug: 'next',
  });

  assert.deepEqual(layout, {
    buildBaseUrl: '/',
    docsRouteBasePath: 'docs/next',
    isDefaultBranch: false,
    publishSourceDir: 'build/docs/next',
    publishTargetDir: '.gh-pages/docs/next',
    versionedDocsDir: '.gh-pages/docs/next',
  });
});
