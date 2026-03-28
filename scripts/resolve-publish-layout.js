/**
 * Purpose: compatibility wrapper around the extracted GitHub Pages adapter.
 * Usage: retained so existing CLI and script imports keep working during extraction.
 */
const {
  resolvePublishLayout,
  resolvePublishLayoutCli,
} = require('../release-policy/github-pages/resolve-publish-layout');

if (require.main === module) {
  resolvePublishLayoutCli(process.argv.slice(2));
}

module.exports = {
  resolvePublishLayout,
};
