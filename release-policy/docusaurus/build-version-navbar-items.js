const {
  buildAbsoluteSiteUrl,
  buildCanonicalDocsRootPath,
} = require('./build-canonical-site-paths');

const buildVersionNavbarItems = ({
  defaultBranch,
  versions,
  siteUrl,
  docsSiteBase,
  versionSlug,
}) => {
  const uniqueVersions = [...new Set(versions.concat(versionSlug))];

  return uniqueVersions.map((version) => ({
    label: version,
    to: buildAbsoluteSiteUrl({
      siteUrl,
      path: buildCanonicalDocsRootPath({
        docsSiteBase,
        defaultBranch,
        versionSlug: version,
      }),
    }),
  }));
};

module.exports = {
  buildVersionNavbarItems,
};
