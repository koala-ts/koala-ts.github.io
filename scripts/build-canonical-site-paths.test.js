const test = require('node:test');
const assert = require('node:assert/strict');

const {
  buildAbsoluteSiteUrl,
  buildCanonicalDocsContentPath,
  buildCanonicalDocsRootPath,
  buildCanonicalHomePath,
  buildCurrentDocsContentPath,
} = require('./build-canonical-site-paths');

test('builds the canonical home path from the site base', () => {
  assert.equal(buildCanonicalHomePath({docsSiteBase: '/'}), '/');
  assert.equal(buildCanonicalHomePath({docsSiteBase: '/preview'}), '/preview/');
});

test('maps the default branch version to /docs', () => {
  assert.equal(
    buildCanonicalDocsRootPath({
      docsSiteBase: '/',
      defaultBranch: '2.x',
      versionSlug: '2.x',
    }),
    '/docs/',
  );
});

test('maps non-default versions under /docs/<version>', () => {
  assert.equal(
    buildCanonicalDocsRootPath({
      docsSiteBase: '/',
      defaultBranch: '2.x',
      versionSlug: 'next',
    }),
    '/docs/next/',
  );
});

test('builds canonical docs content paths from the docs root', () => {
  assert.equal(
    buildCanonicalDocsContentPath({
      docsSiteBase: '/',
      defaultBranch: '2.x',
      versionSlug: 'next',
      docPath: 'overview/intro',
    }),
    '/docs/next/overview/intro',
  );
});

test('builds current-build docs content paths from base url and route base path', () => {
  assert.equal(
    buildCurrentDocsContentPath({
      baseUrl: '/',
      docsRouteBasePath: 'docs',
      docPath: 'overview/intro',
    }),
    '/docs/overview/intro',
  );
});

test('builds absolute site urls from canonical paths', () => {
  assert.equal(
    buildAbsoluteSiteUrl({
      siteUrl: 'https://koala-ts.github.io/',
      path: '/docs/',
    }),
    'https://koala-ts.github.io/docs/',
  );
});
