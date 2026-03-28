/**
 * Purpose: compatibility wrapper around the extracted Docusaurus runtime adapter.
 * Usage: retained so existing config imports keep working during extraction.
 */
const {
  resolveDocsRuntime,
} = require('../release-policy/docusaurus/resolve-docs-runtime');

module.exports = {
  resolveDocsRuntime,
};
