function trimSlashes(value) {
  return value.replace(/^\/+|\/+$/g, '');
}

function parseVersions(rawValue, fallbackVersion) {
  return rawValue
      ? rawValue.split(',').map((value) => value.trim()).filter(Boolean)
      : [fallbackVersion];
}

function resolveSearchDocsRouteBasePath(docsRouteBasePath) {
  return docsRouteBasePath === '/' ? '/' : `/${trimSlashes(docsRouteBasePath)}`;
}

function createDocusaurusReleaseConfig({
  branch,
  fallbackDocPath,
  env = process.env,
}) {
  const versionSlug = env.DOCS_VERSION ?? branch;
  const resolvedDefaultBranch = env.DOCS_DEFAULT_BRANCH ?? branch;
  const baseUrl = env.DOCS_BASE_URL ?? '/';
  const docsSiteBase = env.DOCS_SITE_BASE ?? '/';
  const docsRouteBasePath = env.DOCS_ROUTE_BASE_PATH ??
      (versionSlug === resolvedDefaultBranch ? 'docs' : `docs/${versionSlug}`);
  const versions = parseVersions(env.DOCS_VERSIONS, versionSlug);

  return {
    site: {
      baseUrl,
    },
    branch: {
      currentBranch: branch,
      defaultBranch: resolvedDefaultBranch,
      versionSlug,
      versions,
    },
    docs: {
      routeBasePath: docsRouteBasePath,
      presetConfig: {
        routeBasePath: docsRouteBasePath,
      },
    },
    navbar: {
      versionSwitcherItem: {
        type: 'custom-version-switcher',
        currentVersion: versionSlug,
        position: 'right',
        versions,
      },
    },
    search: {
      docsRouteBasePath: env.DOCS_SEARCH_ROUTE_BASE_PATH ??
          resolveSearchDocsRouteBasePath(docsRouteBasePath),
    },
    customFields: {
      defaultBranch: resolvedDefaultBranch,
      docsSiteBase,
      versionFallbackDocPath: fallbackDocPath,
    },
  };
}

module.exports = {
  createDocusaurusReleaseConfig,
};
