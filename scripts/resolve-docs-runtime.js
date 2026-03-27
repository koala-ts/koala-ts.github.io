/**
 * Purpose: resolve Docusaurus runtime inputs from environment variables in one place.
 * Usage: imported by `docusaurus.config.js` to keep root config declarative.
 */
const {parseDocsVersions} = require('./parse-docs-versions');
const {resolveBranchRuntime} = require('./resolve-branch-runtime');
const {resolveVersionSlug} = require('./resolve-version-slug');

const resolveDocsRuntime = (env = process.env) => {
  const {currentBranch, defaultBranch, isDefaultBranch} = resolveBranchRuntime(env);
  const versionSlug = env.DOCS_VERSION ?? resolveVersionSlug(currentBranch);
  const siteUrl = env.SITE_URL ?? 'http://localhost:3000';
  const baseUrl = env.DOCS_BASE_URL ?? '/';
  const docsSiteBase = env.DOCS_SITE_BASE ?? '/';
  const docsRouteBasePath =
    env.DOCS_ROUTE_BASE_PATH ??
    (isDefaultBranch ? 'docs' : `docs/${versionSlug}`);
  const versions = parseDocsVersions(env.DOCS_VERSIONS, versionSlug);

  return {
    currentBranch,
    defaultBranch,
    isDefaultBranch,
    versionSlug,
    siteUrl,
    baseUrl,
    docsSiteBase,
    docsRouteBasePath,
    versions,
  };
};

module.exports = {
  resolveDocsRuntime,
};
