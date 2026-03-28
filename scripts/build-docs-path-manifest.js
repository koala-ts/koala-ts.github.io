/**
 * Purpose: compatibility wrapper around the extracted GitHub Pages adapter.
 * Usage: retained so existing CLI entrypoints keep working during extraction.
 */
const {
  buildDocsPathManifestCli,
  collectDocsPaths,
} = require('../release-policy/github-pages/build-docs-path-manifest');

if (require.main === module) {
  buildDocsPathManifestCli(process.argv.slice(2));
}

module.exports = {
  collectDocsPaths,
};
