const test = require('node:test');
const assert = require('node:assert/strict');

const {buildVersionNavbarItems} = require('./build-version-navbar-items');

test('builds the current version item from the current base url', () => {
  const items = buildVersionNavbarItems({
    defaultBranch: '2.x',
    versions: ['next', '2.x'],
    versionSlug: '2.x',
    siteUrl: 'https://koala-ts.github.io/',
    docsSiteBase: '/',
  });

  assert.deepEqual(items, [
    {label: 'next', to: 'https://koala-ts.github.io/docs/next/'},
    {label: '2.x', to: 'https://koala-ts.github.io/docs/'},
  ]);
});

test('adds the current version when it is missing from the versions catalog', () => {
  const items = buildVersionNavbarItems({
    defaultBranch: '2.x',
    versions: ['next'],
    versionSlug: '3.x',
    siteUrl: 'https://koala-ts.github.io',
    docsSiteBase: '/',
  });

  assert.deepEqual(items, [
    {label: 'next', to: 'https://koala-ts.github.io/docs/next/'},
    {label: '3.x', to: 'https://koala-ts.github.io/docs/3.x/'},
  ]);
});
