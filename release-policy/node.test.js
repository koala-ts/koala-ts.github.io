const test = require('node:test');
const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
const {mkdtempSync, mkdirSync, readFileSync, writeFileSync} = require('node:fs');
const {join} = require('node:path');
const {tmpdir} = require('node:os');

const {deployBranch, redeployAll, resolveDocsRuntime} = require('./node');

test('exposes release operations through the node entrypoint', () => {
  const deployment = typeof deployBranch;
  const redeploy = typeof redeployAll;
  const docsRuntime = typeof resolveDocsRuntime;

  assert.deepEqual([deployment, redeploy, docsRuntime], ['function', 'function', 'function']);
});

test('the node cli deploy-branch command updates deployment artifacts', () => {
  const tempDir = mkdtempSync(join(tmpdir(), 'release-policy-node-'));
  const docsDir = join(tempDir, 'docs');
  const catalogPath = join(tempDir, 'versions.json');
  const manifestPath = join(tempDir, 'doc-paths.json');

  mkdirSync(join(docsDir, 'overview'), {recursive: true});
  writeFileSync(join(docsDir, 'overview', 'intro.md'), '# Intro\n');
  writeFileSync(catalogPath, `${JSON.stringify(['2.x'], null, 2)}\n`);
  writeFileSync(
    manifestPath,
    `${JSON.stringify({'2.x': ['overview/intro']}, null, 2)}\n`,
  );

  const output = execFileSync(
    process.execPath,
    [
      'release-policy/node.js',
      'deploy-branch',
      '1.x',
      '--canonical-branch',
      '2.x',
      '--deployable-branches',
      '1.x,2.x,main',
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

test('the node cli redeploy-all command returns configured branches in order', () => {
  const output = execFileSync(
    process.execPath,
    [
      'release-policy/node.js',
      'redeploy-all',
      '--canonical-branch',
      '2.x',
      '--deployable-branches',
      '1.x,2.x,main',
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
