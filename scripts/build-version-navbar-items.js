/**
 * Purpose: build navbar version items with stable absolute version URLs per docs base.
 * Usage: imported by `docusaurus.config.js` to render the version dropdown items.
 */
const {normalizeBasePath} = require('./normalize-base-path');

const buildVersionNavbarItems = ({
  versions,
  versionSlug,
  siteUrl,
  baseUrl,
  docsSiteBase,
}) => {
  const uniqueVersions = [...new Set(versions.concat(versionSlug))];
  const normalizedSiteUrl = siteUrl.replace(/\/+$/, '');
  const normalizedDocsSiteBase = normalizeBasePath(docsSiteBase);

  const createVersionTo = (version) => {
    if (version === versionSlug) {
      return `${normalizedSiteUrl}${baseUrl}`;
    }

    return `${normalizedSiteUrl}${normalizedDocsSiteBase}docs/${version}/`;
  };

  return uniqueVersions.map((version) => ({
    label: version,
    to: createVersionTo(version),
  }));
};

module.exports = {
  buildVersionNavbarItems,
};
