const test = require('node:test');
const assert = require('node:assert/strict');

const {resolvePublishLayout} = require('./resolve-publish-layout');

test('publishes the default branch build from the site root', () => {
  const input = {
    currentBranch: '2.x',
    defaultBranch: '2.x',
    siteBase: '/',
    versionSlug: '2.x',
  };

  const layout = resolvePublishLayout(input);

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
  const input = {
    currentBranch: 'main',
    defaultBranch: '2.x',
    siteBase: '/koala-ts/',
    versionSlug: 'next',
  };

  const layout = resolvePublishLayout(input);

  assert.deepEqual(layout, {
    buildBaseUrl: '/koala-ts/docs/next/',
    docsRouteBasePath: '/',
    isDefaultBranch: false,
    publishSourceDir: 'build',
    publishTargetDir: '.gh-pages/docs/next',
    versionedDocsDir: '.gh-pages/docs/next',
  });
});

test('publishes a release branch as a site rooted at its versioned docs path', () => {
  const input = {
    currentBranch: '1.x',
    defaultBranch: '2.x',
    siteBase: '/',
    versionSlug: '1.x',
  };

  const layout = resolvePublishLayout(input);

  assert.deepEqual(layout, {
    buildBaseUrl: '/docs/1.x/',
    docsRouteBasePath: '/',
    isDefaultBranch: false,
    publishSourceDir: 'build',
    publishTargetDir: '.gh-pages/docs/1.x',
    versionedDocsDir: '.gh-pages/docs/1.x',
  });
});

test('rejects a missing site base', () => {
  const input = {
    currentBranch: '2.x',
    defaultBranch: '2.x',
    versionSlug: '2.x',
  };

  const act = () => resolvePublishLayout(input);

  assert.throws(act, /value must be a string/);
});

test('rejects a version slug that does not match the current branch policy', () => {
  const input = {
    currentBranch: 'main',
    defaultBranch: '2.x',
    siteBase: '/',
    versionSlug: '2.x',
  };

  const act = () => resolvePublishLayout(input);

  assert.throws(act, /versionSlug must match the classified branch policy/);
});
