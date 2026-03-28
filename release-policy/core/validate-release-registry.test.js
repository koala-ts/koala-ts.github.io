const test = require('node:test');
const assert = require('node:assert/strict');

const {validateReleaseRegistry} = require('./validate-release-registry');

test('accepts numeric release branches and main in the registry', () => {
  const registry = {
    defaultBranch: '2.x',
    deployableBranches: ['1.x', '2.x', 'main'],
  };

  const validatedRegistry = validateReleaseRegistry(registry);

  assert.deepEqual(validatedRegistry, registry);
});

test('rejects a loose non-numeric release branch name', () => {
  const registry = {
    defaultBranch: '2.x',
    deployableBranches: ['2.x', 'release.x'],
  };

  const act = () => validateReleaseRegistry(registry);

  assert.throws(act, /unsupported branch: release\.x/);
});
