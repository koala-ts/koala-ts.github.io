const test = require('node:test');
const assert = require('node:assert/strict');

const {resolveDocsRuntime} = require('./resolve-docs-runtime');

test('includes resolved branch ownership and docs runtime inputs', () => {
  const env = {
    DOCS_CURRENT_BRANCH: '2.x',
    DOCS_DEFAULT_BRANCH: '2.x',
    DOCS_VERSION: '2.x',
    DOCS_VERSIONS: 'next,2.x',
    SITE_URL: 'https://koala-ts.github.io',
    DOCS_BASE_URL: '/docs/',
    DOCS_SITE_BASE: '/',
  };

  const runtime = resolveDocsRuntime(env);

  assert.deepEqual(runtime, {
    currentBranch: '2.x',
    defaultBranch: '2.x',
    isDefaultBranch: true,
    versionSlug: '2.x',
    siteUrl: 'https://koala-ts.github.io',
    baseUrl: '/docs/',
    docsSiteBase: '/',
    docsRouteBasePath: 'docs',
    versions: ['next', '2.x'],
  });
});

test('maps non-default branches to versioned docs route bases', () => {
  const env = {
    DOCS_CURRENT_BRANCH: 'main',
    DOCS_DEFAULT_BRANCH: '2.x',
    DOCS_VERSIONS: '2.x,next',
  };

  const runtime = resolveDocsRuntime(env);

  assert.deepEqual(runtime, {
    currentBranch: 'main',
    defaultBranch: '2.x',
    isDefaultBranch: false,
    versionSlug: 'next',
    siteUrl: 'http://localhost:3000',
    baseUrl: '/',
    docsSiteBase: '/',
    docsRouteBasePath: 'docs/next',
    versions: ['2.x', 'next'],
  });
});
