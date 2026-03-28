const {
  buildAbsoluteSiteUrl,
  buildCanonicalDocsContentPath,
  buildCanonicalDocsRootPath,
  buildCurrentDocsContentPath,
  buildCurrentDocsRoutePath,
  buildSharedDocsManifestPath,
} = require('./build-canonical-site-paths');
const {
  parseCurrentDocPath,
  resolveVersionSwitchTarget,
} = require('./resolve-version-switch-target');

module.exports = {
  buildAbsoluteSiteUrl,
  buildCanonicalDocsContentPath,
  buildCanonicalDocsRootPath,
  buildCurrentDocsContentPath,
  buildCurrentDocsRoutePath,
  buildSharedDocsManifestPath,
  parseCurrentDocPath,
  resolveVersionSwitchTarget,
};
