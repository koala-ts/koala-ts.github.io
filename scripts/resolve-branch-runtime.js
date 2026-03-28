/**
 * Purpose: resolve the current branch and default branch from runtime inputs.
 * Usage: imported by docs/runtime helpers so local and CI builds share one branch model.
 */
const LOCAL_PREVIEW_MODE = 'local-preview';
const PUBLISH_SIMULATION_MODE = 'publish-simulation';

const requireEnvValue = (env, key) => {
  const value = env[key];

  if (typeof value === 'string' && value.trim()) {
    return value.trim();
  }

  throw new Error(`${key} must be provided.`);
};

const resolveCurrentBranch = (env = process.env) =>
  requireEnvValue(env, 'DOCS_CURRENT_BRANCH');

const resolveRuntimeMode = (env = process.env) =>
  env.DOCS_RUNTIME_MODE ?? '';

const resolveBranchRuntime = (env = process.env) => {
  const currentBranch = resolveCurrentBranch(env);
  const runtimeMode = resolveRuntimeMode(env);
  const configuredDefaultBranch = requireEnvValue(env, 'DOCS_DEFAULT_BRANCH');

  const defaultBranch =
    runtimeMode === LOCAL_PREVIEW_MODE
      ? currentBranch
      : configuredDefaultBranch;

  return {
    currentBranch,
    defaultBranch,
    isDefaultBranch: currentBranch === defaultBranch,
  };
};

module.exports = {
  LOCAL_PREVIEW_MODE,
  PUBLISH_SIMULATION_MODE,
  requireEnvValue,
  resolveCurrentBranch,
  resolveRuntimeMode,
  resolveBranchRuntime,
};
