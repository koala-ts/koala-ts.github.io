const test = require('node:test');
const assert = require('node:assert/strict');

const {resolvePublishLayout} = require('./resolve-publish-layout');
const {resolveDefaultBranch} = require('./resolve-default-branch');

test('default branch scenario publishes root site and /docs content', () => {
  const defaultBranch = resolveDefaultBranch({
    DOCS_CURRENT_BRANCH: '2.x',
    DOCS_DEFAULT_BRANCH: '2.x',
  });

  assert.deepEqual(
    resolvePublishLayout({
      currentBranch: defaultBranch,
      defaultBranch,
      siteBase: '/',
      versionSlug: defaultBranch,
    }),
    {
      buildBaseUrl: '/',
      docsRouteBasePath: 'docs',
      isDefaultBranch: true,
      publishSourceDir: 'build',
      publishTargetDir: '.gh-pages',
      versionedDocsDir: `.gh-pages/docs/${defaultBranch}`,
    },
  );
});

test('main scenario publishes only versioned docs under /docs/next', () => {
  const defaultBranch = resolveDefaultBranch({
    DOCS_CURRENT_BRANCH: '2.x',
    DOCS_DEFAULT_BRANCH: '2.x',
  });

  assert.deepEqual(
    resolvePublishLayout({
      currentBranch: 'main',
      defaultBranch,
      siteBase: '/',
      versionSlug: 'next',
    }),
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
