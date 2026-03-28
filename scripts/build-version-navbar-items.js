/**
 * Purpose: compatibility wrapper around the extracted Docusaurus navbar adapter.
 * Usage: retained so existing config imports keep working during extraction.
 */
const {
  buildVersionNavbarItems,
} = require('../release-policy/docusaurus/build-version-navbar-items');

module.exports = {
  buildVersionNavbarItems,
};
