const test = require('node:test');
const assert = require('node:assert/strict');
const {execSync} = require('node:child_process');

const {
  LOCAL_PREVIEW_MODE,
  PUBLISH_SIMULATION_MODE,
} = require('./resolve-branch-runtime');
const {resolveDocsRuntime} = require('./resolve-docs-runtime');

const readCheckedOutBranch = () =>
  execSync('git branch --show-current', {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  }).trim();

test('includes resolved branch ownership and docs runtime inputs', () => {
  const runtime = resolveDocsRuntime({
    DOCS_CURRENT_BRANCH: '2.x',
    DOCS_DEFAULT_BRANCH: '2.x',
    DOCS_VERSION: '2.x',
    DOCS_VERSIONS: 'next,2.x',
    SITE_URL: 'https://koala-ts.github.io',
    DOCS_BASE_URL: '/docs/',
    DOCS_SITE_BASE: '/',
  });

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

test('defaults runtime values when docs environment is absent', () => {
  const checkedOutBranch = readCheckedOutBranch();

  const runtime = resolveDocsRuntime({});

  assert.deepEqual(runtime, {
    currentBranch: checkedOutBranch,
    defaultBranch: checkedOutBranch,
    isDefaultBranch: true,
    versionSlug: checkedOutBranch,
    siteUrl: 'http://localhost:3000',
    baseUrl: '/',
    docsSiteBase: '/',
    docsRouteBasePath: 'docs',
    versions: [checkedOutBranch],
  });
});

test('maps non-default branches to versioned docs route bases', () => {
  const runtime = resolveDocsRuntime({
    DOCS_CURRENT_BRANCH: 'main',
    DOCS_DEFAULT_BRANCH: '2.x',
  });

  assert.deepEqual(runtime, {
    currentBranch: 'main',
    defaultBranch: '2.x',
    isDefaultBranch: false,
    versionSlug: 'next',
    siteUrl: 'http://localhost:3000',
    baseUrl: '/',
    docsSiteBase: '/',
    docsRouteBasePath: 'docs/next',
    versions: ['next'],
  });
});

test('uses the docs root in local preview mode for the checked out branch', () => {
  const checkedOutBranch = readCheckedOutBranch();

  const runtime = resolveDocsRuntime({
    DOCS_RUNTIME_MODE: LOCAL_PREVIEW_MODE,
    DOCS_DEFAULT_BRANCH: '3.x',
  });

  assert.deepEqual(runtime, {
    currentBranch: checkedOutBranch,
    defaultBranch: checkedOutBranch,
    isDefaultBranch: true,
    versionSlug: checkedOutBranch,
    siteUrl: 'http://localhost:3000',
    baseUrl: '/',
    docsSiteBase: '/',
    docsRouteBasePath: 'docs',
    versions: [checkedOutBranch],
  });
});

test('uses the versioned docs path in publish simulation mode for a non-default branch', () => {
  const checkedOutBranch = readCheckedOutBranch();

  const runtime = resolveDocsRuntime({
    DOCS_RUNTIME_MODE: PUBLISH_SIMULATION_MODE,
    DOCS_DEFAULT_BRANCH: '3.x',
  });

  assert.deepEqual(runtime, {
    currentBranch: checkedOutBranch,
    defaultBranch: '3.x',
    isDefaultBranch: false,
    versionSlug: checkedOutBranch,
    siteUrl: 'http://localhost:3000',
    baseUrl: '/',
    docsSiteBase: '/',
    docsRouteBasePath: `docs/${checkedOutBranch}`,
    versions: [checkedOutBranch],
  });
});
