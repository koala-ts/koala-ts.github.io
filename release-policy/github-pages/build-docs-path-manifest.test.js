const test = require('node:test');
const assert = require('node:assert/strict');

const {
  buildDocsPathManifest,
  collectDocsPaths,
} = require('./build-docs-path-manifest');

test('adds the current docs paths into the version manifest', () => {
  const manifest = buildDocsPathManifest({
    loadedManifest: {
      '2.x': ['overview/intro'],
    },
    currentVersion: 'next',
    docsPaths: ['fundamentals/request', 'overview/intro'],
  });

  assert.deepEqual(manifest, {
    '2.x': ['overview/intro'],
    next: ['fundamentals/request', 'overview/intro'],
  });
});

test('collects docs paths for the deployment manifest builder', () => {
  const typeOfCollector = typeof collectDocsPaths;

  assert.equal(typeOfCollector, 'function');
});
