const {appendFileSync} = require('node:fs');
const {
  loadReleaseRegistry,
} = require('../release-policy/github-pages/release-registry');

const args = process.argv.slice(2);
const outputIndex = args.indexOf('--github-output');
const githubOutputPath = outputIndex >= 0 ? args[outputIndex + 1] : '';

const registry = loadReleaseRegistry();
const registryJson = JSON.stringify(registry);
const {deployableBranches} = registry;
const deployableBranchesJson = JSON.stringify(deployableBranches);

if (githubOutputPath) {
  appendFileSync(
    githubOutputPath,
    `registry_json=${registryJson}\n` +
      `deployable_branches=${deployableBranchesJson}\n`,
  );
}

process.stdout.write(
  `${JSON.stringify({
    registryJson,
    deployableBranches,
  })}\n`,
);
