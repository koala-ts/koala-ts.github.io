const test = require('node:test');
const assert = require('node:assert/strict');

const {createDocusaurusReleaseConfig} = require('./docusaurus');

test('builds release-aware Docusaurus config for the default branch', () => {
  const input = {
    branch: '2.x',
    fallbackDocPath: 'overview/intro',
    introDocPath: 'overview/intro',
    quickStartDocPath: 'getting-started/quick-start',
    siteUrl: 'https://koala-ts.github.io',
    env: {},
  };

  const releasePolicy = createDocusaurusReleaseConfig(input);

  assert.deepEqual(releasePolicy, {
    site: {
      baseUrl: '/',
    },
    branch: {
      currentBranch: '2.x',
      defaultBranch: '2.x',
      versionSlug: '2.x',
      versions: ['2.x'],
    },
    docs: {
      routeBasePath: 'docs',
      introPath: '/docs/overview/intro',
      quickStartPath: '/docs/getting-started/quick-start',
      presetConfig: {
        routeBasePath: 'docs',
      },
    },
    navbar: {
      docsItem: {
        href: 'https://koala-ts.github.io/docs/overview/intro',
        position: 'left',
        label: 'Documentation',
      },
      versionSwitcherItem: {
        type: 'custom-version-switcher',
        currentVersion: '2.x',
        position: 'right',
        versions: ['2.x'],
      },
    },
    search: {
      docsRouteBasePath: '/docs',
    },
    customFields: {
      defaultBranch: '2.x',
      docsSiteBase: '/',
      docsIntroPath: '/docs/overview/intro',
      docsQuickStartPath: '/docs/getting-started/quick-start',
      versionFallbackDocPath: 'overview/intro',
    },
  });
});

test('builds release-aware Docusaurus config for a non-default branch', () => {
  const input = {
    branch: '1.x',
    fallbackDocPath: 'overview/intro',
    introDocPath: 'overview/intro',
    quickStartDocPath: 'get-started/configuration',
    siteUrl: 'https://koala-ts.github.io',
    env: {
      DOCS_DEFAULT_BRANCH: '2.x',
      DOCS_VERSION: '1.x',
      DOCS_VERSIONS: '1.x,2.x,main',
    },
  };

  const releasePolicy = createDocusaurusReleaseConfig(input);

  assert.deepEqual(releasePolicy, {
    site: {
      baseUrl: '/',
    },
    branch: {
      currentBranch: '1.x',
      defaultBranch: '2.x',
      versionSlug: '1.x',
      versions: ['1.x', '2.x', 'main'],
    },
    docs: {
      routeBasePath: 'docs/1.x',
      introPath: '/docs/1.x/overview/intro',
      quickStartPath: '/docs/1.x/get-started/configuration',
      presetConfig: {
        routeBasePath: 'docs/1.x',
      },
    },
    navbar: {
      docsItem: {
        href: 'https://koala-ts.github.io/docs/1.x/overview/intro',
        position: 'left',
        label: 'Documentation',
      },
      versionSwitcherItem: {
        type: 'custom-version-switcher',
        currentVersion: '1.x',
        position: 'right',
        versions: ['1.x', '2.x', 'main'],
      },
    },
    search: {
      docsRouteBasePath: '/docs/1.x',
    },
    customFields: {
      defaultBranch: '2.x',
      docsSiteBase: '/',
      docsIntroPath: '/docs/1.x/overview/intro',
      docsQuickStartPath: '/docs/1.x/get-started/configuration',
      versionFallbackDocPath: 'overview/intro',
    },
  });
});

test('prefers explicit runtime overrides from the env adapter', () => {
  const input = {
    branch: '2.x',
    fallbackDocPath: 'overview/intro',
    introDocPath: 'overview/intro',
    quickStartDocPath: 'getting-started/quick-start',
    siteUrl: 'https://koala-ts.github.io',
    env: {
      DOCS_DEFAULT_BRANCH: '2.x',
      DOCS_BASE_URL: '/docs/2.x/',
      DOCS_ROUTE_BASE_PATH: '/',
      DOCS_SITE_BASE: '/docs/',
      DOCS_SEARCH_ROUTE_BASE_PATH: '/',
      DOCS_VERSION: '2.x',
      DOCS_VERSIONS: '1.x,2.x,main',
    },
  };

  const releasePolicy = createDocusaurusReleaseConfig(input);

  assert.deepEqual(releasePolicy, {
    site: {
      baseUrl: '/docs/2.x/',
    },
    branch: {
      currentBranch: '2.x',
      defaultBranch: '2.x',
      versionSlug: '2.x',
      versions: ['1.x', '2.x', 'main'],
    },
    docs: {
      routeBasePath: '/',
      introPath: '/docs/2.x/overview/intro',
      quickStartPath: '/docs/2.x/getting-started/quick-start',
      presetConfig: {
        routeBasePath: '/',
      },
    },
    navbar: {
      docsItem: {
        href: 'https://koala-ts.github.io/docs/2.x/overview/intro',
        position: 'left',
        label: 'Documentation',
      },
      versionSwitcherItem: {
        type: 'custom-version-switcher',
        currentVersion: '2.x',
        position: 'right',
        versions: ['1.x', '2.x', 'main'],
      },
    },
    search: {
      docsRouteBasePath: '/',
    },
    customFields: {
      defaultBranch: '2.x',
      docsSiteBase: '/docs/',
      docsIntroPath: '/docs/2.x/overview/intro',
      docsQuickStartPath: '/docs/2.x/getting-started/quick-start',
      versionFallbackDocPath: 'overview/intro',
    },
  });
});
