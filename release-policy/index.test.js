const test = require('node:test');
const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
const {mkdtempSync, mkdirSync, readFileSync, writeFileSync} = require('node:fs');
const {join} = require('node:path');
const {tmpdir} = require('node:os');

const {deployBranch, redeployAll} = require('./index');

test('deployBranch returns the deployment contract for an available branch', () => {
  const input = {
    currentBranch: '1.x',
    existingBranches: ['1.x', '2.x', 'main'],
    siteBase: '/',
    loadedVersions: ['2.x', 'next'],
    loadedManifest: {
      '2.x': ['overview/intro'],
      next: ['overview/intro'],
    },
    docsPaths: ['overview/intro', 'getting-started/quick-start'],
    registry: {
      defaultBranch: '2.x',
      deployableBranches: ['1.x', '2.x', 'main'],
    },
  };

  const deployment = deployBranch(input);

  assert.deepEqual(deployment, {
    currentBranch: '1.x',
    defaultBranch: '2.x',
    registry: {
      defaultBranch: '2.x',
      deployableBranches: ['1.x', '2.x', 'main'],
    },
    publishContext: {
      currentBranch: '1.x',
      defaultBranch: '2.x',
      deployableBranches: ['1.x', '2.x', 'main'],
      versionSlug: '1.x',
      isDefaultBranch: false,
      isDeployableBranch: true,
      docsRouteBasePath: '/',
    },
    availability: {
      currentBranch: '1.x',
      isDeployableBranch: true,
      branchExists: true,
      shouldSkip: false,
      skipReason: '',
    },
    layout: {
      buildBaseUrl: '/docs/1.x/',
      docsRouteBasePath: '/',
      isDefaultBranch: false,
      publishSourceDir: 'build',
      publishTargetDir: '.gh-pages/docs/1.x',
      versionedDocsDir: '.gh-pages/docs/1.x',
    },
    versionCatalog: {
      merged: ['next', '1.x', '2.x'],
      versionCsv: 'next,1.x,2.x',
    },
    docsPathManifest: {
      '2.x': ['overview/intro'],
      next: ['overview/intro'],
      '1.x': ['overview/intro', 'getting-started/quick-start'],
    },
    status: 'ready',
  });
});

test('deployBranch returns a skipped deployment when the branch is configured but missing', () => {
  const input = {
    currentBranch: '1.x',
    existingBranches: ['2.x', 'main'],
    registry: {
      defaultBranch: '2.x',
      deployableBranches: ['1.x', '2.x', 'main'],
    },
  };

  const deployment = deployBranch(input);

  assert.deepEqual(deployment, {
    currentBranch: '1.x',
    defaultBranch: '2.x',
    registry: {
      defaultBranch: '2.x',
      deployableBranches: ['1.x', '2.x', 'main'],
    },
    publishContext: {
      currentBranch: '1.x',
      defaultBranch: '2.x',
      deployableBranches: ['1.x', '2.x', 'main'],
      versionSlug: '1.x',
      isDefaultBranch: false,
      isDeployableBranch: true,
      docsRouteBasePath: '/',
    },
    availability: {
      currentBranch: '1.x',
      isDeployableBranch: true,
      branchExists: false,
      shouldSkip: true,
      skipReason: 'Deployable branch does not exist and will be skipped: 1.x.',
    },
    layout: null,
    versionCatalog: null,
    docsPathManifest: null,
    status: 'skipped',
  });
});

test('redeployAll builds the configured branch plan in order', () => {
  const result = redeployAll({
    existingBranches: ['1.x', '2.x', 'main'],
    registry: {
      defaultBranch: '2.x',
      deployableBranches: ['1.x', '2.x', 'main'],
    },
  });

  assert.deepEqual(result.deployments.map((deployment) => deployment.currentBranch), [
    '1.x',
    '2.x',
    'main',
  ]);
  assert.deepEqual(result.deployments.map((deployment) => deployment.status), [
    'ready',
    'ready',
    'ready',
  ]);
});

test('the public cli deploy-branch command updates deployment artifacts', () => {
  const tempDir = mkdtempSync(join(tmpdir(), 'release-policy-cli-'));
  const docsDir = join(tempDir, 'docs');
  const catalogPath = join(tempDir, 'versions.json');
  const manifestPath = join(tempDir, 'doc-paths.json');
  const registryPath = join(tempDir, 'release-registry.json');

  mkdirSync(join(docsDir, 'overview'), {recursive: true});
  writeFileSync(join(docsDir, 'overview', 'intro.md'), '# Intro\n');
  writeFileSync(catalogPath, `${JSON.stringify(['2.x'], null, 2)}\n`);
  writeFileSync(
    manifestPath,
    `${JSON.stringify({'2.x': ['overview/intro']}, null, 2)}\n`,
  );
  writeFileSync(
    registryPath,
    `${JSON.stringify({
      defaultBranch: '2.x',
      deployableBranches: ['1.x', '2.x', 'main'],
    })}\n`,
  );

  const output = execFileSync(
    process.execPath,
    [
      'release-policy/index.js',
      'deploy-branch',
      '1.x',
      '--registry-source',
      registryPath,
      '--existing-branches',
      '1.x,2.x,main',
      '--site-base',
      '/',
      '--catalog-path',
      catalogPath,
      '--manifest-path',
      manifestPath,
      '--docs-dir',
      docsDir,
    ],
    {
      cwd: process.cwd(),
      encoding: 'utf8',
    },
  );

  const deployment = JSON.parse(output);
  const persistedCatalog = JSON.parse(readFileSync(catalogPath, 'utf8'));
  const persistedManifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

  assert.equal(deployment.layout.buildBaseUrl, '/docs/1.x/');
  assert.equal(deployment.versionCatalog.versionCsv, '1.x,2.x');
  assert.deepEqual(persistedCatalog, ['1.x', '2.x']);
  assert.deepEqual(persistedManifest, {
    '2.x': ['overview/intro'],
    '1.x': ['overview/intro'],
  });
});

test('the public cli redeploy-all command returns configured branches in order', () => {
  const tempDir = mkdtempSync(join(tmpdir(), 'release-policy-plan-'));
  const registryPath = join(tempDir, 'release-registry.json');

  writeFileSync(
    registryPath,
    `${JSON.stringify({
      defaultBranch: '2.x',
      deployableBranches: ['1.x', '2.x', 'main'],
    })}\n`,
  );

  const output = execFileSync(
    process.execPath,
    [
      'release-policy/index.js',
      'redeploy-all',
      '--registry-source',
      registryPath,
      '--existing-branches',
      '1.x,2.x,main',
    ],
    {
      cwd: process.cwd(),
      encoding: 'utf8',
    },
  );

  const result = JSON.parse(output);

  assert.deepEqual(result.deployments.map((deployment) => deployment.currentBranch), [
    '1.x',
    '2.x',
    'main',
  ]);
});
