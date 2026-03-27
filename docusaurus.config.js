const {resolveDocsRuntime} = require('./scripts/resolve-docs-runtime');
const {versionFallbackDocPath} = require('./docs-site.config');
const prismReact = require('prism-react-renderer');

const {
  versionSlug,
  siteUrl,
  baseUrl,
  docsSiteBase,
  docsRouteBasePath,
  defaultBranch,
  versions,
} = resolveDocsRuntime();
const {
  buildCanonicalHomePath,
  buildCanonicalDocsRootPath,
  buildCurrentDocsContentPath,
} = require('./scripts/build-canonical-site-paths');
const {resolveVersionSlug} = require('./scripts/resolve-version-slug');

const homePath = buildCanonicalHomePath({docsSiteBase});
const currentVersionSlug = versionSlug;
const stableDocsPath = buildCanonicalDocsRootPath({
  docsSiteBase,
  defaultBranch,
  versionSlug: resolveVersionSlug(defaultBranch),
});
const docsIntroPath = buildCurrentDocsContentPath({
  baseUrl,
  docsRouteBasePath,
  docPath: 'overview/intro',
});
const docsQuickStartPath = buildCurrentDocsContentPath({
  baseUrl,
  docsRouteBasePath,
  docPath: 'get-started/configuration',
});

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'KoalaTs',
  tagline: 'TypeScript framework documentation',
  favicon: 'favicon.ico',
  url: siteUrl,
  baseUrl,
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  customFields: {
    currentVersionSlug,
    defaultBranch,
    homePath,
    siteUrl,
    docsSiteBase,
    docsIntroPath,
    docsQuickStartPath,
    stableDocsPath,
    versionFallbackDocPath,
  },
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'KoalaTs',
      logo: {
        alt: 'KoalaTs Logo',
        src: 'img/logo.png',
        href: homePath,
      },
      items: [
        {
          to: docsIntroPath,
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'custom-version-switcher',
          currentVersion: versionSlug,
          position: 'right',
          versions,
        },
        {
          href: 'https://github.com/koala-ts',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} KoalaTs.`,
      logo: {
        alt: 'KoalaTs Logo',
        src: 'img/logo.png',
        href: homePath,
        width: 32,
        height: 32,
      },
    },
    prism: {
      theme: prismReact.themes.github,
      darkTheme: prismReact.themes.dracula,
    },
  },
  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: `${baseUrl}favicon/apple-touch-icon.png`,
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: `${baseUrl}favicon/favicon-32x32.png`,
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: `${baseUrl}favicon/favicon-16x16.png`,
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'manifest',
        href: `${baseUrl}site.webmanifest`,
      },
    },
  ],
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: docsRouteBasePath,
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        docsRouteBasePath: `/${docsRouteBasePath}`,
        hashed: true,
        language: ['en'],
      },
    ],
  ],
};

module.exports = config;
