/**
 * Purpose: build canonical home and docs paths from the versioning contract.
 * Usage: shared by config and navbar helpers so URL generation follows one rule set.
 */
const {normalizeBasePath} = require('./normalize-base-path');
const {resolveVersionSlug} = require('./resolve-version-slug');

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
  const defaultVersionSlug = resolveVersionSlug(defaultBranch);

  if (versionSlug === defaultVersionSlug) {
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
