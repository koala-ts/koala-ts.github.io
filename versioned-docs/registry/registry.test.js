const test = require('node:test');
const assert = require('node:assert/strict');

const rawVersions = require('../versions');
const createRegistryConfig = require('./registry');

test('registry config derives versioned docs settings from raw declarations', () => {
  const registryConfig = createRegistryConfig();
  const {customFields, docsPlugins, search} = registryConfig;
  const {docPathManifest, latestVersion, versions} = customFields;

  assert.deepEqual(rawVersions, [
    {
      version: '1.x',
      introDocId: 'overview/intro',
      fallbackDocId: 'overview/intro',
      quickStartDocId: 'get-started/configuration',
    },
    {
      version: '2.x',
      introDocId: 'overview/intro',
      fallbackDocId: 'overview/intro',
      quickStartDocId: 'getting-started/quick-start',
    },
  ]);

  assert.deepEqual(versions, [
    {
      slug: '1.x',
      label: '1.x',
      routeBasePath: 'docs/1.x',
      introDocId: 'overview/intro',
      fallbackDocId: 'overview/intro',
    },
    {
      slug: '2.x',
      label: '2.x',
      routeBasePath: 'docs/2.x',
      introDocId: 'overview/intro',
      fallbackDocId: 'overview/intro',
    },
  ]);

  assert.equal(docPathManifest['1.x'].includes('overview/intro'), true);
  assert.equal(docPathManifest['2.x'].includes('overview/intro'), true);

  assert.deepEqual(search.searchContextByPaths, [
    {label: '1.x', path: 'docs/1.x'},
    {label: '2.x', path: 'docs/2.x'},
  ]);
  assert.deepEqual(search.docsRouteBasePath, ['docs/1.x', 'docs/2.x']);

  assert.equal(docsPlugins.length, 2);
  assert.equal(docsPlugins[0][1].id, 'version-1-x');
  assert.equal(docsPlugins[0][1].routeBasePath, 'docs/1.x');
  assert.equal(docsPlugins[0][1].sidebarPath, undefined);
  assert.equal(docsPlugins[1][1].routeBasePath, 'docs/2.x');
  assert.equal(docsPlugins[1][1].id, undefined);
  assert.equal(docsPlugins[1][1].sidebarPath, undefined);

  assert.equal(latestVersion, '2.x');
  assert.equal(rawVersions.at(-1)?.version, latestVersion);
  assert.equal(versions.at(-1)?.slug, latestVersion);

  assert.equal(customFields.docsIntroPath, '/docs/2.x/overview/intro');
  assert.equal(
    customFields.docsQuickStartPath,
    '/docs/2.x/getting-started/quick-start',
  );
});
