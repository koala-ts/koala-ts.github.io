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

function joinPath(basePath, childPath) {
  const normalizedBasePath = basePath.replace(/\/+$/, '');
  const normalizedChildPath = childPath.replace(/^\/+/, '');

  if (!normalizedBasePath) {
    return `/${normalizedChildPath}`;
  }

  return `${normalizedBasePath}/${normalizedChildPath}`;
}

function resolveDocsBasePath({
  baseUrl,
  docsRouteBasePath,
}) {
  return docsRouteBasePath === '/'
      ? baseUrl.replace(/\/+$/, '')
      : joinPath(baseUrl, docsRouteBasePath);
}

function createDocusaurusReleaseConfig({
  branch,
  fallbackDocPath,
  introDocPath,
  quickStartDocPath,
  env = process.env,
}) {
  const versionSlug = env.DOCS_VERSION ?? branch;
  const resolvedDefaultBranch = env.DOCS_DEFAULT_BRANCH ?? branch;
  const baseUrl = env.DOCS_BASE_URL ?? '/';
  const docsSiteBase = env.DOCS_SITE_BASE ?? '/';
  const docsRouteBasePath = env.DOCS_ROUTE_BASE_PATH ??
      (versionSlug === resolvedDefaultBranch ? 'docs' : `docs/${versionSlug}`);
  const versions = parseVersions(env.DOCS_VERSIONS, versionSlug);
  const docsBasePath = resolveDocsBasePath({
    baseUrl,
    docsRouteBasePath,
  });
  const resolvedDocsIntroPath = joinPath(docsBasePath, introDocPath);
  const resolvedDocsQuickStartPath = joinPath(docsBasePath, quickStartDocPath);

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
      introPath: resolvedDocsIntroPath,
      quickStartPath: resolvedDocsQuickStartPath,
      presetConfig: {
        routeBasePath: docsRouteBasePath,
      },
    },
    navbar: {
      docsItem: {
        href: resolvedDocsIntroPath,
        position: 'left',
        label: 'Documentation',
      },
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
      docsIntroPath: resolvedDocsIntroPath,
      docsQuickStartPath: resolvedDocsQuickStartPath,
      versionFallbackDocPath: fallbackDocPath,
    },
  };
}

module.exports = {
  createDocusaurusReleaseConfig,
};
