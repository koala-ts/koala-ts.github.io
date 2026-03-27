const test = require('node:test');
const assert = require('node:assert/strict');
const {mkdtempSync, mkdirSync, writeFileSync} = require('node:fs');
const {join} = require('node:path');
const {tmpdir} = require('node:os');

const {collectDocsPaths} = require('./build-docs-path-manifest');

test('collects sorted docs paths from markdown files', () => {
  const rootDir = mkdtempSync(join(tmpdir(), 'koala-docs-paths-'));

  mkdirSync(join(rootDir, 'fundamentals'), {recursive: true});
  mkdirSync(join(rootDir, 'overview'), {recursive: true});
  writeFileSync(join(rootDir, 'fundamentals', 'request.md'), '# Request\n');
  writeFileSync(join(rootDir, 'overview', 'intro.mdx'), '# Intro\n');

  assert.deepEqual(collectDocsPaths(rootDir), [
    'fundamentals/request',
    'overview/intro',
  ]);
});

test('normalizes index documents to their parent path', () => {
  const rootDir = mkdtempSync(join(tmpdir(), 'koala-docs-index-'));

  mkdirSync(join(rootDir, 'guides', 'configuration'), {recursive: true});
  writeFileSync(join(rootDir, 'guides', 'configuration', 'index.md'), '# Config\n');

  assert.deepEqual(collectDocsPaths(rootDir), ['guides/configuration']);
});
