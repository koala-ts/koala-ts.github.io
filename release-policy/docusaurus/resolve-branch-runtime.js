/**
 * Purpose: resolve the current branch and default branch from runtime inputs.
 * Usage: imported by docs/runtime helpers so local and CI builds share one branch model.
 */
const {execSync} = require('node:child_process');
const LOCAL_PREVIEW_MODE = 'local-preview';
const PUBLISH_SIMULATION_MODE = 'publish-simulation';

const resolveCurrentBranch = (env = process.env) => {
  const configuredBranch =
    env.DOCS_CURRENT_BRANCH ?? env.GITHUB_REF_NAME ?? env.BRANCH_NAME;

  if (configuredBranch) {
    return configuredBranch;
  }

  try {
    const gitBranch = execSync('git branch --show-current', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();

    if (gitBranch) {
      return gitBranch;
    }
  } catch {
    return 'main';
  }

  return 'main';
};

const resolveRuntimeMode = (env = process.env) =>
  env.DOCS_RUNTIME_MODE ?? '';

const resolveBranchRuntime = (env = process.env) => {
  const currentBranch = resolveCurrentBranch(env);
  const runtimeMode = resolveRuntimeMode(env);

  if (runtimeMode === PUBLISH_SIMULATION_MODE && !env.DOCS_DEFAULT_BRANCH) {
    throw new Error(
      'DOCS_DEFAULT_BRANCH must be provided in publish-simulation mode.',
    );
  }

  const defaultBranch =
    runtimeMode === LOCAL_PREVIEW_MODE
      ? currentBranch
      : env.DOCS_DEFAULT_BRANCH ?? currentBranch;

  return {
    currentBranch,
    defaultBranch,
    isDefaultBranch: currentBranch === defaultBranch,
  };
};

module.exports = {
  LOCAL_PREVIEW_MODE,
  PUBLISH_SIMULATION_MODE,
  resolveCurrentBranch,
  resolveRuntimeMode,
  resolveBranchRuntime,
};
