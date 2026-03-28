const {normalizeBasePath, requireString} = require('./normalize-base-path');
const {resolveVersionSlug} = require('./resolve-version-slug');

const resolvePublishLayout = ({
  currentBranch,
  defaultBranch,
  siteBase,
  versionSlug,
}) => {
  const normalizedCurrentBranch = requireString(currentBranch, 'currentBranch');
  const normalizedDefaultBranch = requireString(defaultBranch, 'defaultBranch');
  const normalizedSiteBase = normalizeBasePath(siteBase);
  const normalizedVersionSlug = requireString(versionSlug, 'versionSlug');
  const defaultVersionSlug = resolveVersionSlug(normalizedDefaultBranch);
  const isDefaultBranch =
    normalizedVersionSlug === defaultVersionSlug &&
    normalizedCurrentBranch === normalizedDefaultBranch;
  const docsRouteBasePath = isDefaultBranch
    ? 'docs'
    : `docs/${normalizedVersionSlug}`;

  return {
    buildBaseUrl: normalizedSiteBase,
    docsRouteBasePath,
    isDefaultBranch,
    publishSourceDir: isDefaultBranch
      ? 'build'
      : `build/${docsRouteBasePath}`,
    publishTargetDir: isDefaultBranch
      ? '.gh-pages'
      : `.gh-pages/docs/${normalizedVersionSlug}`,
    versionedDocsDir: `.gh-pages/docs/${normalizedVersionSlug}`,
  };
};

module.exports = {
  resolvePublishLayout,
};
