/**
 * Purpose: compatibility wrapper around the extracted release-policy core utility.
 * Usage: retained so existing script imports keep working during extraction.
 */
const {normalizeBasePath} = require('../release-policy/core/normalize-base-path');

module.exports = {
  normalizeBasePath,
};
