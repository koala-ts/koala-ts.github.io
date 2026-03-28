const {classifyDocsBranch} = require('../core/classify-docs-branch');
const {parseDocsVersions} = require('../../scripts/parse-docs-versions');
const {resolveBranchRuntime} = require('../../scripts/resolve-branch-runtime');
const {resolveVersionSlug} = require('../../scripts/resolve-version-slug');

const resolveDocsRouteBasePath = ({
  currentBranch,
  isDefaultBranch,
  versionSlug,
  env,
}) => {
  if (env.DOCS_ROUTE_BASE_PATH) {
    return env.DOCS_ROUTE_BASE_PATH;
  }

  if (isDefaultBranch) {
    return 'docs';
  }

  const classification = classifyDocsBranch(currentBranch);

  return classification.docsRouteBasePath || `docs/${versionSlug}`;
};

const resolveDocsRuntime = (env = process.env) => {
  const {currentBranch, defaultBranch, isDefaultBranch} = resolveBranchRuntime(env);
  const branchClassification = classifyDocsBranch(currentBranch);
  const versionSlug = env.DOCS_VERSION ?? branchClassification.versionSlug;
  const siteUrl = env.SITE_URL ?? 'http://localhost:3000';
  const baseUrl = env.DOCS_BASE_URL ?? '/';
  const docsSiteBase = env.DOCS_SITE_BASE ?? '/';
  const docsRouteBasePath = resolveDocsRouteBasePath({
    currentBranch,
    isDefaultBranch,
    versionSlug,
    env,
  });
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
  resolveDocsRouteBasePath,
  resolveDocsRuntime,
};
