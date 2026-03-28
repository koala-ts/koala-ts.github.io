const {normalizeBasePath} = require('../core/normalize-base-path');
const {classifyDocsBranch} = require('../core/classify-docs-branch');

const trimLeadingSlash = (value) => value.replace(/^\/+/, '');

const buildCanonicalHomePath = ({docsSiteBase = '/'}) =>
  normalizeBasePath(docsSiteBase);

const buildSharedDocsManifestPath = ({docsSiteBase = '/'}) => {
  const homePath = buildCanonicalHomePath({docsSiteBase});

  return `${homePath}docs/doc-paths.json`;
};

const buildCurrentDocsContentPath = ({
  baseUrl = '/',
  docsRouteBasePath = 'docs',
  docPath,
}) => {
  const normalizedBaseUrl = normalizeBasePath(baseUrl);
  const normalizedDocsRouteBasePath = trimLeadingSlash(
    normalizeBasePath(docsRouteBasePath),
  );

  return `${normalizedBaseUrl}${normalizedDocsRouteBasePath}${trimLeadingSlash(docPath)}`;
};

const buildCanonicalDocsRootPath = ({
  docsSiteBase = '/',
  defaultBranch,
  versionSlug,
}) => {
  const homePath = buildCanonicalHomePath({docsSiteBase});
  const defaultBranchClassification = classifyDocsBranch(defaultBranch);

  if (versionSlug === defaultBranchClassification.versionSlug) {
    return `${homePath}docs/`;
  }

  return `${homePath}docs/${versionSlug}/`;
};

const buildCanonicalDocsContentPath = ({
  docsSiteBase = '/',
  defaultBranch,
  versionSlug,
  docPath,
}) => {
  const docsRootPath = buildCanonicalDocsRootPath({
    docsSiteBase,
    defaultBranch,
    versionSlug,
  });

  return `${docsRootPath}${trimLeadingSlash(docPath)}`;
};

const buildAbsoluteSiteUrl = ({siteUrl, path}) =>
  `${siteUrl.replace(/\/+$/, '')}${path}`;

module.exports = {
  buildAbsoluteSiteUrl,
  buildCanonicalDocsContentPath,
  buildCanonicalDocsRootPath,
  buildCanonicalHomePath,
  buildCurrentDocsContentPath,
  buildSharedDocsManifestPath,
};
