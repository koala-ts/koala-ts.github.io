const {appendFileSync} = require('node:fs');
const {
  loadReleaseRegistry,
} = require('../release-policy/github-pages/release-registry');
const {
  resolveBranchAvailability,
} = require('../release-policy/github-pages/resolve-branch-availability');

const args = process.argv.slice(2);
const outputIndex = args.indexOf('--github-output');
const githubOutputPath = outputIndex >= 0 ? args[outputIndex + 1] : '';
const branchArg = args.find((arg, index) => {
  if (arg.startsWith('--')) {
    return false;
  }

  if (outputIndex >= 0 && index === outputIndex + 1) {
    return false;
  }

  return true;
});
const currentBranch = branchArg || process.env.BRANCH_NAME;
const existingBranches = (process.env.REMOTE_BRANCHES ?? '')
  .split(',')
  .map((branch) => branch.trim())
  .filter(Boolean);

if (!currentBranch) {
  throw new Error(
    'Usage: node scripts/resolve-branch-availability-cli.js <currentBranch> [--github-output <path>]',
  );
}

const {deployableBranches} = loadReleaseRegistry();
const availability = resolveBranchAvailability({
  currentBranch,
  deployableBranches,
  existingBranches,
});

if (!availability.isDeployableBranch) {
  throw new Error(`Branch is not deployable: ${currentBranch}.`);
}

if (githubOutputPath) {
  appendFileSync(
    githubOutputPath,
    `branch_exists=${availability.branchExists}\n` +
      `should_skip=${availability.shouldSkip}\n` +
      `skip_reason=${availability.skipReason}\n`,
  );
}

process.stdout.write(`${JSON.stringify(availability)}\n`);
