const {
  buildAbsoluteSiteUrl,
  buildCanonicalDocsContentPath,
  buildCanonicalDocsRootPath,
  buildCanonicalHomePath,
  buildCurrentDocsContentPath,
  buildSharedDocsManifestPath,
} = require('./docusaurus/build-canonical-site-paths');
const {resolveDocsRuntime} = require('./docusaurus/resolve-docs-runtime');

module.exports = {
  buildAbsoluteSiteUrl,
  buildCanonicalDocsContentPath,
  buildCanonicalDocsRootPath,
  buildCanonicalHomePath,
  buildCurrentDocsContentPath,
  buildSharedDocsManifestPath,
  resolveDocsRuntime,
};
