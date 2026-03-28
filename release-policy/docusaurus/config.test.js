const test = require('node:test');
const assert = require('node:assert/strict');

const {
  buildAbsoluteSiteUrl,
  buildCanonicalHomePath,
  buildCurrentDocsRoutePath,
  resolveDocsRuntime,
  resolveLocalDocsEnv,
} = require('./config');

test('exposes the node-side docusaurus config helpers', () => {
  const docsEnv = resolveLocalDocsEnv({
    DOCS_CURRENT_BRANCH: '2.x',
  });
  const runtime = resolveDocsRuntime({
    ...docsEnv,
    DOCS_VERSION: '2.x',
    DOCS_VERSIONS: 'next,2.x',
    DOCS_BASE_URL: '/docs/',
    DOCS_SITE_BASE: '/',
    SITE_URL: 'https://koala-ts.github.io',
  });
  const homePath = buildCanonicalHomePath({docsSiteBase: runtime.docsSiteBase});
  const docsPath = buildCurrentDocsRoutePath({
    docsRouteBasePath: runtime.docsRouteBasePath,
    docPath: 'overview/intro',
  });
  const absoluteUrl = buildAbsoluteSiteUrl({
    siteUrl: runtime.siteUrl,
    path: homePath,
  });

  assert.deepEqual(
    {
      absoluteUrl,
      docsPath,
      homePath,
      versionSlug: runtime.versionSlug,
    },
    {
      absoluteUrl: 'https://koala-ts.github.io/',
      docsPath: '/docs/overview/intro',
      homePath: '/',
      versionSlug: '2.x',
    },
  );
});
