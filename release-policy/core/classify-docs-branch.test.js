const test = require('node:test');
const assert = require('node:assert/strict');

const {
  assertBranchVersionSlug,
  classifyDocsBranch,
} = require('./classify-docs-branch');

test('classifies main as the next docs branch', () => {
  const branchName = 'main';

  const classification = classifyDocsBranch(branchName);

  assert.deepEqual(classification, {
    branchName: 'main',
    kind: 'main',
    isDeployable: true,
    versionSlug: 'next',
    docsRouteBasePath: 'docs/next',
    publishTargetDir: '.gh-pages/docs/next',
    shouldAppearInVersionCatalog: true,
  });
});

test('classifies a numeric release branch as deployable', () => {
  const branchName = '12.x';

  const classification = classifyDocsBranch(branchName);

  assert.deepEqual(classification, {
    branchName: '12.x',
    kind: 'release',
    isDeployable: true,
    versionSlug: '12.x',
    docsRouteBasePath: 'docs/12.x',
    publishTargetDir: '.gh-pages/docs/12.x',
    shouldAppearInVersionCatalog: true,
  });
});

test('classifies unsupported branches as non-deployable', () => {
  const branchName = 'release.x';

  const classification = classifyDocsBranch(branchName);

  assert.deepEqual(classification, {
    branchName: 'release.x',
    kind: 'other',
    isDeployable: false,
    versionSlug: 'release.x',
    docsRouteBasePath: '',
    publishTargetDir: '',
    shouldAppearInVersionCatalog: false,
  });
});

test('rejects a version slug that does not match the classified branch policy', () => {
  const input = {
    branchName: 'main',
    versionSlug: '2.x',
  };

  const act = () => assertBranchVersionSlug(input);

  assert.throws(act, /versionSlug must match the classified branch policy/);
});
