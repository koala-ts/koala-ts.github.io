const {
  buildAbsoluteSiteUrl,
  buildCanonicalDocsContentPath,
  buildCanonicalDocsRootPath,
  buildCanonicalHomePath,
  buildCurrentDocsContentPath,
  buildCurrentDocsRoutePath,
  buildSharedDocsManifestPath,
} = require('./build-canonical-site-paths');
const {buildVersionNavbarItems} = require('./build-version-navbar-items');
const {parseDocsVersions} = require('./parse-docs-versions');
const {
  LOCAL_PREVIEW_MODE,
  PUBLISH_SIMULATION_MODE,
  requireEnvValue,
  resolveBranchRuntime,
  resolveCurrentBranch,
  resolveRuntimeMode,
} = require('./resolve-branch-runtime');
const {resolveDocsRouteBasePath, resolveDocsRuntime} = require('./resolve-docs-runtime');
const {resolveGitBranch, resolveLocalDocsEnv} = require('./resolve-local-docs-env');

module.exports = {
  buildAbsoluteSiteUrl,
  buildCanonicalDocsContentPath,
  buildCanonicalDocsRootPath,
  buildCanonicalHomePath,
  buildCurrentDocsContentPath,
  buildCurrentDocsRoutePath,
  buildSharedDocsManifestPath,
  buildVersionNavbarItems,
  LOCAL_PREVIEW_MODE,
  PUBLISH_SIMULATION_MODE,
  parseDocsVersions,
  requireEnvValue,
  resolveBranchRuntime,
  resolveCurrentBranch,
  resolveDocsRouteBasePath,
  resolveDocsRuntime,
  resolveGitBranch,
  resolveLocalDocsEnv,
  resolveRuntimeMode,
};
