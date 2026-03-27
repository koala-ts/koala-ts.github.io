/**
 * Purpose: resolve the configured default branch from the repo-owned docs site config.
 * Usage: used by runtime and deployment automation so local and CI share one source of truth.
 */
const {appendFileSync} = require('node:fs');
const {defaultBranch} = require('../docs-site.config');

const resolveDefaultBranch = () => defaultBranch;

if (require.main === module) {
  const args = process.argv.slice(2);
  const outputIndex = args.indexOf('--github-output');
  const githubOutputPath = outputIndex >= 0 ? args[outputIndex + 1] : '';
  const resolvedDefaultBranch = resolveDefaultBranch();

  if (githubOutputPath) {
    appendFileSync(
      githubOutputPath,
      `default_branch=${resolvedDefaultBranch}\n`,
    );
  }

  process.stdout.write(`${resolvedDefaultBranch}\n`);
}

module.exports = {
  resolveDefaultBranch,
};
