const test = require('node:test');
const assert = require('node:assert/strict');

const {
  buildAbsoluteSiteUrl,
  buildCanonicalDocsContentPath,
  buildCanonicalDocsRootPath,
  buildCanonicalHomePath,
  buildCurrentDocsContentPath,
  buildCurrentDocsRoutePath,
  buildSharedDocsManifestPath,
} = require('./build-canonical-site-paths');

test('builds the canonical home path from the site base', () => {
  const rootPath = buildCanonicalHomePath({docsSiteBase: '/'});
  const previewPath = buildCanonicalHomePath({docsSiteBase: '/preview'});

  assert.equal(rootPath, '/');
  assert.equal(previewPath, '/preview/');
});

test('maps the default branch version to /docs', () => {
  const docsRootPath = buildCanonicalDocsRootPath({
    docsSiteBase: '/',
    defaultBranch: '2.x',
    versionSlug: '2.x',
  });

  assert.equal(docsRootPath, '/docs/');
});

test('maps non-default versions under /docs/<version>', () => {
  const docsRootPath = buildCanonicalDocsRootPath({
    docsSiteBase: '/',
    defaultBranch: '2.x',
    versionSlug: 'next',
  });

  assert.equal(docsRootPath, '/docs/next/');
});

test('builds canonical docs content paths from the docs root', () => {
  const docsContentPath = buildCanonicalDocsContentPath({
    docsSiteBase: '/',
    defaultBranch: '2.x',
    versionSlug: 'next',
    docPath: 'overview/intro',
  });

  assert.equal(docsContentPath, '/docs/next/overview/intro');
});

test('builds current-build docs content paths from base url and route base path', () => {
  const currentDocsContentPath = buildCurrentDocsContentPath({
    baseUrl: '/',
    docsRouteBasePath: 'docs',
    docPath: 'overview/intro',
  });

  assert.equal(currentDocsContentPath, '/docs/overview/intro');
});

test('builds in-app docs route paths without re-applying the base url', () => {
  const currentDocsRoutePath = buildCurrentDocsRoutePath({
    docsRouteBasePath: '/',
    docPath: 'overview/intro',
  });

  assert.equal(currentDocsRoutePath, '/overview/intro');
});

test('builds current-build docs paths for versioned branches rooted at their publish path', () => {
  const currentDocsContentPath = buildCurrentDocsContentPath({
    baseUrl: '/docs/1.x/',
    docsRouteBasePath: '/',
    docPath: 'overview/intro',
  });

  assert.equal(currentDocsContentPath, '/docs/1.x/overview/intro');
});

test('builds absolute site urls from canonical paths', () => {
  const siteUrl = buildAbsoluteSiteUrl({
    siteUrl: 'https://koala-ts.github.io/',
    path: '/docs/',
  });

  assert.equal(siteUrl, 'https://koala-ts.github.io/docs/');
});

test('builds the shared docs manifest path from the site base', () => {
  const rootManifestPath = buildSharedDocsManifestPath({docsSiteBase: '/'});
  const previewManifestPath = buildSharedDocsManifestPath({
    docsSiteBase: '/preview',
  });

  assert.equal(rootManifestPath, '/docs/doc-paths.json');
  assert.equal(previewManifestPath, '/preview/docs/doc-paths.json');
});
