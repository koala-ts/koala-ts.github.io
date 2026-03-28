const test = require('node:test');
const assert = require('node:assert/strict');

const {resolveBranchAvailability} = require('./resolve-branch-availability');

test('marks a declared branch as skippable when it does not exist remotely', () => {
  const availability = resolveBranchAvailability({
    currentBranch: '1.x',
    deployableBranches: ['1.x', '2.x', 'main'],
    existingBranches: ['2.x', 'main'],
  });

  assert.deepEqual(availability, {
    currentBranch: '1.x',
    isDeployableBranch: true,
    branchExists: false,
    shouldSkip: true,
    skipReason: 'Deployable branch does not exist and will be skipped: 1.x.',
  });
});
