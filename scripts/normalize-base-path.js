/**
 * Purpose: normalize base paths to `/path/` format for safe URL concatenation.
 * Usage: shared utility for docs/version URL composition helpers.
 */
const normalizeBasePath = (value) => {
  const trimmed = value.trim();
  const withLeadingSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  const withTrailingSlash = withLeadingSlash.endsWith('/')
    ? withLeadingSlash
    : `${withLeadingSlash}/`;

  return withTrailingSlash.replace(/\/{2,}/g, '/');
};

module.exports = {
  normalizeBasePath,
};
