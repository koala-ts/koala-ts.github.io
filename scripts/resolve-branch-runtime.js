/**
 * Purpose: resolve the current branch and default branch from runtime inputs.
 * Usage: imported by docs/runtime helpers so local and CI builds share one branch model.
 */
const {defaultBranch: configuredDefaultBranch} = require('../docs-site.config');

const resolveBranchRuntime = (env = process.env) => {
  const defaultBranch = env.DOCS_DEFAULT_BRANCH ?? configuredDefaultBranch;
  const currentBranch = env.DOCS_CURRENT_BRANCH ?? defaultBranch;

  return {
    currentBranch,
    defaultBranch,
    isDefaultBranch: currentBranch === defaultBranch,
  };
};

module.exports = {
  resolveBranchRuntime,
};
