const test = require('node:test');
const assert = require('node:assert/strict');

const {parseReleaseRegistry} = require('./release-registry');

test('parses and validates a release registry payload', () => {
  const registry = parseReleaseRegistry(
    JSON.stringify({
      defaultBranch: '2.x',
      deployableBranches: ['1.x', '2.x', 'main'],
    }),
  );

  assert.deepEqual(registry, {
    defaultBranch: '2.x',
    deployableBranches: ['1.x', '2.x', 'main'],
  });
});
