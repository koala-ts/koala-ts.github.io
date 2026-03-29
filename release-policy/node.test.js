const {describe, test} = require('node:test');
const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
const {
  mkdtempSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} = require('node:fs');
const {join} = require('node:path');
const {tmpdir} = require('node:os');

const CLI_ENTRYPOINT = 'release-policy/node.js';

const runCliJson = (args) => {
  const output = execFileSync(process.execPath, [CLI_ENTRYPOINT, ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });

  return JSON.parse(output);
};

const writeJsonFile = (filePath, value) => {
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
};

const readJsonFile = (filePath) => JSON.parse(readFileSync(filePath, 'utf8'));

const createDeployBranchFixture = () => {
  const tempDir = mkdtempSync(join(tmpdir(), 'release-policy-node-'));
  const docsDir = join(tempDir, 'docs');
  const versionsPath = join(tempDir, 'versions.json');
  const docPathsPath = join(tempDir, 'doc-paths.json');

  mkdirSync(join(docsDir, 'overview'), {recursive: true});
  writeFileSync(join(docsDir, 'overview', 'intro.md'), '# Intro\n');

  writeJsonFile(versionsPath, ['2.x']);
  writeJsonFile(docPathsPath, {'2.x': ['overview/intro']});

  return {docsDir, versionsPath, docPathsPath};
};

const buildDeployBranchArgs = ({docsDir, versionsPath, docPathsPath}) => [
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
  '--versions-path',
  versionsPath,
  '--doc-paths-path',
  docPathsPath,
  '--docs-dir',
  docsDir,
];

const buildRedeployAllArgs = () => [
  'redeploy-all',
  '--canonical-branch',
  '2.x',
  '--deployable-branches',
  '1.x,2.x,main',
  '--existing-branches',
  '1.x,2.x,main',
];

describe('release-policy node CLI', () => {
  test('deploy-branch persists artifacts and returns deployment metadata', () => {
    const fixture = createDeployBranchFixture();

    const deployment = runCliJson(buildDeployBranchArgs(fixture));

    const persistedVersions = readJsonFile(fixture.versionsPath);
    const persistedDocPaths = readJsonFile(fixture.docPathsPath);
    assert.equal(deployment.layout.buildBaseUrl, '/docs/1.x/');
    assert.equal(deployment.versionCatalog.versionCsv, '1.x,2.x');
    assert.deepEqual(persistedVersions, ['1.x', '2.x']);
    assert.deepEqual(persistedDocPaths, {
      '2.x': ['overview/intro'],
      '1.x': ['overview/intro'],
    });
  });

  test('redeploy-all returns deployable branches in configured order', () => {
    const redeployResult = runCliJson(buildRedeployAllArgs());

    const currentBranches = redeployResult.deployments.map(
        (deployment) => deployment.currentBranch,
    );

    assert.deepEqual(currentBranches, ['1.x', '2.x', 'main']);
  });
});
