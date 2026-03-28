const parseDocsVersions = (rawValue, fallbackVersion) =>
  (rawValue ?? fallbackVersion)
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

module.exports = {
  parseDocsVersions,
};
