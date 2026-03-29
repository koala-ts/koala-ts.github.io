const {
  buildAbsoluteSiteUrl,
  buildCanonicalDocsContentPath,
  buildCanonicalDocsRootPath,
  buildSharedDocsManifestPath,
} = require('./docusaurus/build-canonical-site-paths');
const {
  parseCurrentDocPath,
  resolveVersionSwitchTarget,
} = require('./docusaurus/resolve-version-switch-target');

module.exports = {
  buildAbsoluteSiteUrl,
  buildCanonicalDocsContentPath,
  buildCanonicalDocsRootPath,
  buildSharedDocsManifestPath,
  parseCurrentDocPath,
  resolveVersionSwitchTarget,
};
