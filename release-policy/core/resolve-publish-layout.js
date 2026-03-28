const {normalizeBasePath, requireString} = require('./normalize-base-path');
const {
  assertBranchVersionSlug,
  classifyDocsBranch,
} = require('./classify-docs-branch');

const resolvePublishLayout = ({
  currentBranch,
  defaultBranch,
  siteBase,
  versionSlug,
}) => {
  const normalizedCurrentBranch = requireString(currentBranch, 'currentBranch');
  const normalizedDefaultBranch = requireString(defaultBranch, 'defaultBranch');
  const normalizedSiteBase = normalizeBasePath(siteBase);
  const currentBranchClassification = assertBranchVersionSlug({
    branchName: normalizedCurrentBranch,
    versionSlug,
  });
  const defaultBranchClassification = classifyDocsBranch(normalizedDefaultBranch);
  const isDefaultBranch =
    currentBranchClassification.versionSlug === defaultBranchClassification.versionSlug &&
    normalizedCurrentBranch === normalizedDefaultBranch;
  const docsRouteBasePath = isDefaultBranch
    ? 'docs'
    : currentBranchClassification.docsRouteBasePath;

  return {
    buildBaseUrl: normalizedSiteBase,
    docsRouteBasePath,
    isDefaultBranch,
    publishSourceDir: isDefaultBranch
      ? 'build'
      : `build/${docsRouteBasePath}`,
    publishTargetDir: isDefaultBranch
      ? '.gh-pages'
      : currentBranchClassification.publishTargetDir,
    versionedDocsDir: currentBranchClassification.publishTargetDir,
  };
};

module.exports = {
  resolvePublishLayout,
};
