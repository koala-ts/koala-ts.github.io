const {readdirSync, statSync} = require('node:fs');
const {join, relative} = require('node:path');

const versions = [
  {
    slug: '2.x',
    label: '2.x',
    docsDir: 'docs/2.x',
    routeBasePath: 'docs/2.x',
    sidebarPath: require.resolve('./sidebars/2.x.js'),
    introDocId: 'overview/intro',
    fallbackDocId: 'overview/intro',
    quickStartDocId: 'getting-started/quick-start',
  },
  {
    slug: '1.x',
    label: '1.x',
    docsDir: 'docs/1.x',
    routeBasePath: 'docs/1.x',
    sidebarPath: require.resolve('./sidebars/1.x.js'),
    introDocId: 'overview/intro',
    fallbackDocId: 'overview/intro',
    quickStartDocId: 'get-started/configuration',
  },
];

const latestVersion = '2.x';

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

module.exports = {
  buildDocPathManifest,
  buildSearchContexts,
  collectDocPaths,
  createDocsPlugins,
  latestVersion,
  versions,
};
