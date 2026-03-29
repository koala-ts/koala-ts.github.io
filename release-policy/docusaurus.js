function docsIntroPath(docsRouteBasePath, baseUrl) {
  return process.env.DOCS_INTRO_PATH ??
      (docsRouteBasePath === '/'
          ? `${baseUrl}overview/intro`
          : `${baseUrl}${docsRouteBasePath}/overview/intro`);
}

function versions(branch) {
  return process.env.DOCS_VERSIONS
      ? process.env.DOCS_VERSIONS.split(',').
          map((value) => value.trim()).
          filter(Boolean)
      : [branch];
}

function docsQuickStartPath(docsRouteBasePath, baseUrl) {
  return process.env.DOCS_QUICK_START_PATH ??
      (docsRouteBasePath === '/'
          ? `${baseUrl}getting-started/quick-start`
          : `${baseUrl}${docsRouteBasePath}/getting-started/quick-start`);
}

function searchDocsRouteBasePath(docsRouteBasePath) {
  return process.env.DOCS_SEARCH_ROUTE_BASE_PATH ??
      (docsRouteBasePath === '/' ? '/' : `/${docsRouteBasePath}`);
}

function buildVersionConfigs({
  branch,
  docsFallbackPath,
}) {
  const defaultBranch = process.env.DOCS_DEFAULT_BRANCH ?? branch;

  const baseUrl = process.env.DOCS_BASE_URL ?? '/';
  const homePath = process.env.DOCS_HOME_PATH ?? '/';

  const docsSiteBase = process.env.DOCS_SITE_BASE ?? '/';
  const docsRouteBasePath = process.env.DOCS_ROUTE_BASE_PATH ?? 'docs';
  const siteUrl = process.env.SITE_URL ?? 'http://localhost:3000';

  return {
    siteUrl,
    baseUrl,
    homePath,
    docsIntroPath: docsIntroPath(docsRouteBasePath, baseUrl),
    versionSlug: process.env.DOCS_VERSION ?? branch,
    versions: versions(branch),
    defaultBranch,
    docsSiteBase,
    docsRouteBasePath,
    docsQuickStartPath: docsQuickStartPath(docsRouteBasePath, baseUrl),
    searchDocsRouteBasePath: searchDocsRouteBasePath(docsRouteBasePath),
    versionFallbackDocPath: docsFallbackPath,

    customFields: {
      defaultBranch,
      homePath,
      siteUrl,
      docsSiteBase,
      docsIntroPath,
      docsQuickStartPath,
      versionFallbackDocPath: docsFallbackPath,
    },
  };
}

module.exports = {
  buildVersionConfigs,
};
