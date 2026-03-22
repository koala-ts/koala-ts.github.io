/**
 * Purpose: parse `DOCS_VERSIONS` into a trimmed, non-empty list.
 * Usage: imported by runtime/config helpers to build version-aware navigation.
 */
const parseDocsVersions = (rawValue, fallbackVersion) =>
  (rawValue ?? fallbackVersion)
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

module.exports = {
  parseDocsVersions,
};
