const prismReact = require('prism-react-renderer');
const {createDocusaurusReleaseConfig} = require('./release-policy/docusaurus');

const releasePolicy = createDocusaurusReleaseConfig({
  branch: '1.x',
  fallbackDocPath: 'overview/intro',
});

const siteUrl = process.env.SITE_URL ?? 'https://koala-ts.github.io';
const docsIntroPath = '/docs/overview/intro';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'KoalaTs',
  tagline: 'TypeScript framework documentation',
  favicon: 'favicon.ico',
  url: siteUrl,
  baseUrl: releasePolicy.site.baseUrl,
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
    docsIntroPath,
    ...releasePolicy.customFields,
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
          to: docsIntroPath,
          position: 'left',
          label: 'Documentation',
        },
        releasePolicy.navbar.versionSwitcherItem,
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
        href: `${releasePolicy.site.baseUrl}favicon/apple-touch-icon.png`,
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: `${releasePolicy.site.baseUrl}favicon/favicon-32x32.png`,
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: `${releasePolicy.site.baseUrl}favicon/favicon-16x16.png`,
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'manifest',
        href: `${releasePolicy.site.baseUrl}site.webmanifest`,
      },
    },
  ],
  presets: [
    [
      'classic',
      {
        docs: {
          ...releasePolicy.docs.presetConfig,
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
        docsRouteBasePath: releasePolicy.search.docsRouteBasePath,
        hashed: true,
        language: ['en'],
      },
    ],
  ],
};

module.exports = config;
