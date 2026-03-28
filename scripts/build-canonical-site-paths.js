/**
 * Purpose: compatibility wrapper around the extracted Docusaurus path adapter.
 * Usage: retained so existing imports keep working during extraction.
 */
const {
  buildAbsoluteSiteUrl,
  buildCanonicalDocsContentPath,
  buildCanonicalDocsRootPath,
  buildCanonicalHomePath,
  buildCurrentDocsContentPath,
  buildCurrentDocsRoutePath,
  buildSharedDocsManifestPath,
} = require('../release-policy/docusaurus/build-canonical-site-paths');

module.exports = {
  buildAbsoluteSiteUrl,
  buildCanonicalDocsContentPath,
  buildCanonicalDocsRootPath,
  buildCanonicalHomePath,
  buildCurrentDocsContentPath,
  buildCurrentDocsRoutePath,
  buildSharedDocsManifestPath,
};
