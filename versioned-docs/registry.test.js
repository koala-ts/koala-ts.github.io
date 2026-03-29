const test = require('node:test');
const assert = require('node:assert/strict');

const {
  buildDocPathManifest,
  buildSearchContexts,
  collectDocPaths,
  createDocsPlugins,
  latestVersion,
  versions,
} = require('./registry');

test('collectDocPaths returns version-local doc ids', () => {
  const result = collectDocPaths('docs/1.x');

  assert.deepEqual(result, [
    'basics/request',
    'basics/response',
    'basics/routing',
    'get-started/configuration',
    'overview/intro',
  ]);
});

test('buildDocPathManifest maps all configured versions', () => {
  const result = buildDocPathManifest(versions);

  assert.equal(result['1.x'].includes('overview/intro'), true);
  assert.equal(result['2.x'].includes('overview/intro'), true);
});

test('buildSearchContexts scopes search to versioned docs roots', () => {
  const result = buildSearchContexts(versions);

  assert.deepEqual(result, [
    {label: '2.x', path: 'docs/2.x'},
    {label: '1.x', path: 'docs/1.x'},
  ]);
});

test('createDocsPlugins creates one docs plugin per version', () => {
  const result = createDocsPlugins(versions);

  assert.equal(result.length, 2);
  assert.equal(result[0][1].id, undefined);
  assert.equal(result[0][1].routeBasePath, 'docs/2.x');
  assert.equal(result[1][1].routeBasePath, 'docs/1.x');
});

test('latestVersion references a configured version', () => {
  assert.equal(
    versions.some(({slug}) => slug === latestVersion),
    true,
  );
});
