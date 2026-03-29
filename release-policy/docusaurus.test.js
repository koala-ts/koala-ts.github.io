const test = require('node:test');
const assert = require('node:assert/strict');

const {createDocusaurusReleaseConfig} = require('./docusaurus');

test('builds release-aware Docusaurus config for the default branch', () => {
  const input = {
    branch: '1.x',
    fallbackDocPath: 'overview/intro',
    env: {},
  };

  const releasePolicy = createDocusaurusReleaseConfig(input);

  assert.deepEqual(releasePolicy, {
    site: {
      baseUrl: '/',
    },
    branch: {
      currentBranch: '1.x',
      defaultBranch: '1.x',
      versionSlug: '1.x',
      versions: ['1.x'],
    },
    docs: {
      routeBasePath: 'docs',
      presetConfig: {
        routeBasePath: 'docs',
      },
    },
    navbar: {
      versionSwitcherItem: {
        type: 'custom-version-switcher',
        currentVersion: '1.x',
        position: 'right',
        versions: ['1.x'],
      },
    },
    search: {
      docsRouteBasePath: '/docs',
    },
    customFields: {
      defaultBranch: '1.x',
      docsSiteBase: '/',
      versionFallbackDocPath: 'overview/intro',
    },
  });
});

test('builds release-aware Docusaurus config for a non-default branch', () => {
  const input = {
    branch: '1.x',
    fallbackDocPath: 'overview/intro',
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
      presetConfig: {
        routeBasePath: 'docs/1.x',
      },
    },
    navbar: {
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
      versionFallbackDocPath: 'overview/intro',
    },
  });
});

test('prefers explicit runtime overrides from the env adapter', () => {
  const input = {
    branch: '1.x',
    fallbackDocPath: 'overview/intro',
    env: {
      DOCS_DEFAULT_BRANCH: '2.x',
      DOCS_BASE_URL: '/docs/1.x/',
      DOCS_ROUTE_BASE_PATH: '/',
      DOCS_SITE_BASE: '/docs/',
      DOCS_SEARCH_ROUTE_BASE_PATH: '/',
      DOCS_VERSION: '1.x',
      DOCS_VERSIONS: '1.x,2.x,main',
    },
  };

  const releasePolicy = createDocusaurusReleaseConfig(input);

  assert.deepEqual(releasePolicy, {
    site: {
      baseUrl: '/docs/1.x/',
    },
    branch: {
      currentBranch: '1.x',
      defaultBranch: '2.x',
      versionSlug: '1.x',
      versions: ['1.x', '2.x', 'main'],
    },
    docs: {
      routeBasePath: '/',
      presetConfig: {
        routeBasePath: '/',
      },
    },
    navbar: {
      versionSwitcherItem: {
        type: 'custom-version-switcher',
        currentVersion: '1.x',
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
      versionFallbackDocPath: 'overview/intro',
    },
  });
});
