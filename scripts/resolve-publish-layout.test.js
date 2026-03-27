const test = require('node:test');
const assert = require('node:assert/strict');

const {resolvePublishLayout} = require('./resolve-publish-layout');

test('publishes the default branch build from the site root', () => {
  assert.deepEqual(
    resolvePublishLayout({
      currentBranch: '2.x',
      defaultBranch: '2.x',
      siteBase: '/',
      versionSlug: '2.x',
    }),
    {
      buildBaseUrl: '/',
      isDefaultBranch: true,
      publishSourceDir: 'build',
      publishTargetDir: '.gh-pages',
      versionedDocsDir: '.gh-pages/docs/2.x',
    },
  );
});

test('publishes non-default branch docs under /docs/<version>', () => {
  assert.deepEqual(
    resolvePublishLayout({
      currentBranch: 'main',
      defaultBranch: '2.x',
      siteBase: '/',
      versionSlug: 'next',
    }),
    {
      buildBaseUrl: '/docs/next/',
      isDefaultBranch: false,
      publishSourceDir: 'build/docs',
      publishTargetDir: '.gh-pages/docs/next',
      versionedDocsDir: '.gh-pages/docs/next',
    },
  );
});

test('preserves non-root site bases when computing publish urls', () => {
  assert.deepEqual(
    resolvePublishLayout({
      currentBranch: 'main',
      defaultBranch: '2.x',
      siteBase: '/koala-ts/',
      versionSlug: 'next',
    }),
    {
      buildBaseUrl: '/koala-ts/docs/next/',
      isDefaultBranch: false,
      publishSourceDir: 'build/docs',
      publishTargetDir: '.gh-pages/docs/next',
      versionedDocsDir: '.gh-pages/docs/next',
    },
  );
});
