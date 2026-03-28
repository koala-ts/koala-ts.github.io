/**
 * Purpose: provide explicit branch inputs for local Docusaurus commands.
 * Usage: imported by the Docusaurus bootstrap so runtime helpers can stay strict.
 */
const {execSync} = require('node:child_process');
const {
  PUBLISH_SIMULATION_MODE,
} = require('./resolve-branch-runtime');

const resolveGitBranch = () => {
  try {
    const branch = execSync('git branch --show-current', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();

    if (branch) {
      return branch;
    }
  } catch {}

  throw new Error(
    'DOCS_CURRENT_BRANCH must be provided when the checked out Git branch cannot be resolved.',
  );
};

const resolveLocalDocsEnv = (
  env = process.env,
  {resolveGitBranch: resolveBranch = resolveGitBranch} = {},
) => {
  const currentBranch = env.DOCS_CURRENT_BRANCH ?? resolveBranch();

  if (env.DOCS_RUNTIME_MODE === PUBLISH_SIMULATION_MODE) {
    if (!env.DOCS_DEFAULT_BRANCH?.trim()) {
      throw new Error(
        'DOCS_DEFAULT_BRANCH must be provided in publish-simulation mode.',
      );
    }

    return {
      DOCS_CURRENT_BRANCH: currentBranch,
      DOCS_DEFAULT_BRANCH: env.DOCS_DEFAULT_BRANCH.trim(),
    };
  }

  return {
    DOCS_CURRENT_BRANCH: currentBranch,
    DOCS_DEFAULT_BRANCH: env.DOCS_DEFAULT_BRANCH?.trim() || currentBranch,
  };
};

module.exports = {
  resolveGitBranch,
  resolveLocalDocsEnv,
};
