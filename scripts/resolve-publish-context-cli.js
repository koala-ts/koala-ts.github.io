const {appendFileSync} = require('node:fs');
const {
  loadReleaseRegistry,
  resolvePublishContext,
} = require('../release-policy/github-pages/resolve-publish-context');

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

if (!currentBranch) {
  throw new Error(
    'Usage: node scripts/resolve-publish-context-cli.js <currentBranch> [--github-output <path>]',
  );
}

const publishContext = resolvePublishContext({
  currentBranch,
  registry: loadReleaseRegistry(),
});

if (!publishContext.isDeployableBranch) {
  throw new Error(`Branch is not deployable: ${currentBranch}.`);
}

if (githubOutputPath) {
  appendFileSync(
    githubOutputPath,
    `current_branch=${publishContext.currentBranch}\n` +
      `default_branch=${publishContext.defaultBranch}\n` +
      `version_slug=${publishContext.versionSlug}\n` +
      `is_default_branch=${publishContext.isDefaultBranch}\n` +
      `docs_route_base_path=${publishContext.docsRouteBasePath}\n`,
  );
}

process.stdout.write(`${JSON.stringify(publishContext)}\n`);
