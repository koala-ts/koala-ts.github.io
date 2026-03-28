const requireString = (value, name) => {
  if (typeof value !== 'string') {
    throw new Error(`${name} must be a string.`);
  }

  const trimmed = value.trim();

  if (!trimmed) {
    throw new Error(`${name} must be a non-empty string.`);
  }

  return trimmed;
};

const normalizeBasePath = (value) => {
  const normalizedValue = requireString(value, 'value');
  const withLeadingSlash = normalizedValue.startsWith('/')
    ? normalizedValue
    : `/${normalizedValue}`;
  const withTrailingSlash = withLeadingSlash.endsWith('/')
    ? withLeadingSlash
    : `${withLeadingSlash}/`;

  return withTrailingSlash.replace(/\/{2,}/g, '/');
};

module.exports = {
  normalizeBasePath,
  requireString,
};
