const test = require('node:test');
const assert = require('node:assert/strict');

const {
  parseCurrentDocPath,
  resolveVersionSwitchTarget,
} = require('./resolve-version-switch-target');

test('parses a default-branch docs path into a logical doc path', () => {
  assert.equal(
    parseCurrentDocPath({
      currentPathname: '/docs/fundamentals/request',
      defaultBranch: '2.x',
      docsSiteBase: '/',
      targetVersion: 'next',
    }),
    'fundamentals/request',
  );
});

test('parses a non-default version docs path into a logical doc path', () => {
  assert.equal(
    parseCurrentDocPath({
      currentPathname: '/docs/next/fundamentals/request',
      defaultBranch: '2.x',
      docsSiteBase: '/',
      targetVersion: '2.x',
    }),
    'fundamentals/request',
  );
});

test('returns null for non-docs pages', () => {
  assert.equal(
    parseCurrentDocPath({
      currentPathname: '/',
      defaultBranch: '2.x',
      docsSiteBase: '/',
      targetVersion: 'next',
    }),
    null,
  );
});

test('preserves the current docs path when the target version contains it', () => {
  assert.equal(
    resolveVersionSwitchTarget({
      availableDocPathsByVersion: {
        next: ['fundamentals/request', 'overview/intro'],
      },
      currentPathname: '/docs/fundamentals/request',
      defaultBranch: '2.x',
      docsSiteBase: '/',
      fallbackDocPath: 'overview/intro',
      targetVersion: 'next',
    }),
    '/docs/next/fundamentals/request',
  );
});

test('falls back when the target version does not contain the current docs path', () => {
  assert.equal(
    resolveVersionSwitchTarget({
      availableDocPathsByVersion: {
        next: ['overview/intro'],
      },
      currentPathname: '/docs/fundamentals/request',
      defaultBranch: '2.x',
      docsSiteBase: '/',
      fallbackDocPath: 'overview/intro',
      targetVersion: 'next',
    }),
    '/docs/next/overview/intro',
  );
});

test('falls back from non-doc pages', () => {
  assert.equal(
    resolveVersionSwitchTarget({
      availableDocPathsByVersion: {
        next: ['overview/intro'],
      },
      currentPathname: '/',
      defaultBranch: '2.x',
      docsSiteBase: '/',
      fallbackDocPath: 'overview/intro',
      targetVersion: 'next',
    }),
    '/docs/next/overview/intro',
  );
});

test('targets the default branch canonical docs path when switching back', () => {
  assert.equal(
    resolveVersionSwitchTarget({
      availableDocPathsByVersion: {
        '2.x': ['fundamentals/request', 'overview/intro'],
      },
      currentPathname: '/docs/next/fundamentals/request',
      defaultBranch: '2.x',
      docsSiteBase: '/',
      fallbackDocPath: 'overview/intro',
      targetVersion: '2.x',
    }),
    '/docs/fundamentals/request',
  );
});
