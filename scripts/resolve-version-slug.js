/**
 * Purpose: compatibility wrapper around the extracted release-policy core utility.
 * Usage: retained so existing script imports keep working during extraction.
 */
const {
  resolveVersionSlug,
  sanitizeBranchName,
} = require('../release-policy/core');

module.exports = {
  resolveVersionSlug,
  sanitizeBranchName,
};
