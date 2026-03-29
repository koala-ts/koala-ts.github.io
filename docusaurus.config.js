const prismReact = require('prism-react-renderer');

const BRANCH_VERSION = '2.x';
const versionFallbackDocPath = 'overview/intro';

const trimLeadingSlash = (value) => value.replace(/^\/+/, '');
const normalizeBasePath = (value) => {
  const trimmed = value.trim();
  const withLeadingSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  const withTrailingSlash = withLeadingSlash.endsWith('/')
    ? withLeadingSlash
    : `${withLeadingSlash}/`;

  return withTrailingSlash.replace(/\/{2,}/g, '/');
};
const buildCanonicalHomePath = ({docsSiteBase = '/'}) =>
  normalizeBasePath(docsSiteBase);
const buildCurrentDocsContentPath = ({
  baseUrl = '/',
  docsRouteBasePath = 'docs',
  docPath,
}) => {
  const normalizedBaseUrl = normalizeBasePath(baseUrl);
  const normalizedDocsRouteBasePath = trimLeadingSlash(
    normalizeBasePath(docsRouteBasePath),
  );

  return `${normalizedBaseUrl}${normalizedDocsRouteBasePath}${trimLeadingSlash(docPath)}`;
};
const buildAbsoluteSiteUrl = ({siteUrl, path}) =>
  `${siteUrl.replace(/\/+$/, '')}${path}`;
const parseVersions = (rawValue, fallbackVersion) =>
  (rawValue ?? fallbackVersion)
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

const versionSlug = process.env.DOCS_VERSION ?? BRANCH_VERSION;
const defaultBranch = process.env.DOCS_DEFAULT_BRANCH ?? BRANCH_VERSION;
const isDefaultBranch = versionSlug === defaultBranch;
const siteUrl = process.env.SITE_URL ?? 'http://localhost:3000';
const baseUrl = process.env.DOCS_BASE_URL ?? '/';
const docsSiteBase = process.env.DOCS_SITE_BASE ?? '/';
const docsRouteBasePath =
  process.env.DOCS_ROUTE_BASE_PATH ??
  (isDefaultBranch ? 'docs' : `docs/${versionSlug}`);
const versions = parseVersions(process.env.DOCS_VERSIONS, versionSlug);
const homePath = buildCanonicalHomePath({docsSiteBase});
const docsIntroPath = buildCurrentDocsContentPath({
  baseUrl,
  docsRouteBasePath,
  docPath: 'overview/intro',
});
const docsQuickStartPath = buildCurrentDocsContentPath({
  baseUrl,
  docsRouteBasePath,
  docPath: 'getting-started/quick-start',
});
const searchDocsRouteBasePath =
  docsRouteBasePath === '/' ? '/' : `/${docsRouteBasePath}`;
const homeHref = buildAbsoluteSiteUrl({siteUrl, path: homePath});

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
    defaultBranch,
    homePath,
    homeHref,
    siteUrl,
    docsSiteBase,
    docsIntroPath,
    docsQuickStartPath,
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
        docsRouteBasePath: searchDocsRouteBasePath,
        hashed: true,
        language: ['en'],
      },
    ],
  ],
};

module.exports = config;
