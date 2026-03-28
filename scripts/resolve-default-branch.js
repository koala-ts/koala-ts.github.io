/**
 * Purpose: resolve the injected default branch for compatibility with older callers.
 * Usage: preserved for local/runtime callers, but deployment ownership is now controlled centrally.
 */
const {appendFileSync} = require('node:fs');
const {resolveBranchRuntime} = require('./resolve-branch-runtime');

const resolveDefaultBranch = (env = process.env) =>
  resolveBranchRuntime(env).defaultBranch;

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
