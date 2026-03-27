/**
 * Purpose: build navbar version items with stable absolute version URLs per docs base.
 * Usage: imported by `docusaurus.config.js` to render the version dropdown items.
 */
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

  const createVersionTo = (version) =>
    buildAbsoluteSiteUrl({
      siteUrl,
      path: buildCanonicalDocsRootPath({
        docsSiteBase,
        defaultBranch,
        versionSlug: version,
      }),
    });

  return uniqueVersions.map((version) => ({
    label: version,
    to: createVersionTo(version),
  }));
};

module.exports = {
  buildVersionNavbarItems,
};
