const prismReact = require('prism-react-renderer');
const {
  buildDocPathManifest,
  buildSearchContexts,
  createDocsPlugins,
  latestVersion,
  versions,
} = require('./versioned-docs/registry');

const siteUrl = process.env.SITE_URL ?? 'https://koala-ts.github.io';
const latestVersionEntry = versions.find(({slug}) => slug === latestVersion);
const docsIntroPath = `/docs/${latestVersionEntry.slug}/${latestVersionEntry.introDocId}`;
const docsQuickStartPath = `/docs/${latestVersionEntry.slug}/${latestVersionEntry.quickStartDocId}`;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'KoalaTs',
  tagline: 'TypeScript framework documentation',
  favicon: 'favicon.ico',
  url: siteUrl,
  baseUrl: '/',
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
    docsIntroPath,
    docsQuickStartPath,
    docPathManifest: buildDocPathManifest(versions),
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
        href: '/',
      },
      items: [
        {
          href: docsIntroPath,
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'custom-version-switcher',
          position: 'right',
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
        href: '/',
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
        href: '/favicon/apple-touch-icon.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon/favicon-32x32.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon/favicon-16x16.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'manifest',
        href: '/site.webmanifest',
      },
    },
  ],
  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    ...createDocsPlugins(versions),
    [
      '@easyops-cn/docusaurus-search-local',
      {
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        hashed: true,
        language: ['en'],
        docsRouteBasePath: versions.map(({routeBasePath}) => routeBasePath),
        searchContextByPaths: buildSearchContexts(versions),
        hideSearchBarWithNoSearchContext: true,
      },
    ],
  ],
};

module.exports = config;
