/**
 * Purpose: compatibility wrapper around the extracted GitHub Pages adapter.
 * Usage: retained so existing CLI entrypoints keep working during extraction.
 */
const {
  buildVersionCatalogCli,
} = require('../release-policy/github-pages/build-version-catalog');

buildVersionCatalogCli(process.argv.slice(2));
