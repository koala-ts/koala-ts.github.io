const {readdirSync, statSync} = require('node:fs');
const {join, relative} = require('node:path');

const rawVersions = require('../versions');

const buildDocsDir = (version) => `docs/${version}`;
const buildRouteBasePath = (version) => `docs/${version}`;
const buildSidebarPath = (version) => require.resolve(`../sidebars/${version}.js`);

const normalizeVersion = ({
  version,
  introDocId,
  fallbackDocId,
  quickStartDocId,
}) => ({
  slug: version,
  label: version,
  docsDir: buildDocsDir(version),
  routeBasePath: buildRouteBasePath(version),
  sidebarPath: buildSidebarPath(version),
  introDocId,
  fallbackDocId,
  quickStartDocId,
});

const versions = rawVersions.map(normalizeVersion);
const latestVersion = versions.at(-1)?.slug;

const collectDocPaths = (rootDir, currentDir = rootDir) =>
  readdirSync(currentDir)
    .flatMap((entry) => {
      const absolutePath = join(currentDir, entry);
      const stats = statSync(absolutePath);

      if (stats.isDirectory()) {
        return collectDocPaths(rootDir, absolutePath);
      }

      if (!entry.endsWith('.md') && !entry.endsWith('.mdx')) {
        return [];
      }

      const relativePath = relative(rootDir, absolutePath).replace(/\.(md|mdx)$/u, '');
      return [relativePath.replace(/\\/gu, '/')];
    })
    .sort((left, right) => left.localeCompare(right, 'en'));

const buildDocPathManifest = (configuredVersions) =>
  configuredVersions.reduce(
    (manifest, version) => ({
      ...manifest,
      [version.slug]: collectDocPaths(version.docsDir),
    }),
    {},
  );

const buildSearchContexts = (configuredVersions) =>
  configuredVersions.map(({label, routeBasePath}) => ({
    label,
    path: routeBasePath,
  }));

const createDocsPlugins = (configuredVersions) =>
  configuredVersions.map((version) => [
    '@docusaurus/plugin-content-docs',
    {
      ...(version.slug === latestVersion
        ? {}
        : {id: `version-${version.slug.replace(/[^a-z0-9]+/giu, '-')}`}),
      path: version.docsDir,
      routeBasePath: version.routeBasePath,
      sidebarPath: version.sidebarPath,
    },
  ]);

const createRegistryConfig = () => {
  const latestVersionEntry = versions.at(-1);

  return {
    customFields: {
      versions: versions.map(
        ({slug, label, routeBasePath, introDocId, fallbackDocId}) => ({
          slug,
          label,
          routeBasePath,
          introDocId,
          fallbackDocId,
        }),
      ),
      latestVersion,
      docsIntroPath: `/docs/${latestVersionEntry.slug}/${latestVersionEntry.introDocId}`,
      docsQuickStartPath: `/docs/${latestVersionEntry.slug}/${latestVersionEntry.quickStartDocId}`,
      docPathManifest: buildDocPathManifest(versions),
    },
    docsPlugins: createDocsPlugins(versions),
    search: {
      docsRouteBasePath: versions.map(({routeBasePath}) => routeBasePath),
      searchContextByPaths: buildSearchContexts(versions),
    },
  };
};

module.exports = createRegistryConfig;
