/**
 * Purpose: resolve Docusaurus runtime inputs from environment variables in one place.
 * Usage: imported by `docusaurus.config.js` to keep root config declarative.
 */
const {parseDocsVersions} = require('./parse-docs-versions');

const resolveDocsRuntime = (env = process.env) => {
  const versionSlug = env.DOCS_VERSION ?? 'next';
  const siteUrl = env.SITE_URL ?? 'http://localhost:3000';
  const baseUrl = env.DOCS_BASE_URL ?? '/';
  const docsSiteBase = env.DOCS_SITE_BASE ?? '/';
  const versions = parseDocsVersions(env.DOCS_VERSIONS, versionSlug);

  return {
    versionSlug,
    siteUrl,
    baseUrl,
    docsSiteBase,
    versions,
  };
};

module.exports = {
  resolveDocsRuntime,
};
