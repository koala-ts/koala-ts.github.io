/**
 * Purpose: compatibility wrapper around the extracted Docusaurus version-switch adapter.
 * Usage: retained so existing imports keep working during extraction.
 */
const {
  parseCurrentDocPath,
  resolveVersionSwitchTarget,
} = require('../release-policy/docusaurus/resolve-version-switch-target');

module.exports = {
  parseCurrentDocPath,
  resolveVersionSwitchTarget,
};
