const test = require('node:test');
const assert = require('node:assert/strict');

const {resolveRepublishPlan} = require('./resolve-republish-plan');

test('builds republish availability for declared branches in order', () => {
  const plan = resolveRepublishPlan({
    deployableBranches: ['1.x', '2.x', 'main'],
    existingBranches: ['2.x', 'main'],
  });

  assert.deepEqual(plan, [
    {
      currentBranch: '1.x',
      isDeployableBranch: true,
      branchExists: false,
      shouldSkip: true,
      skipReason: 'Deployable branch does not exist and will be skipped: 1.x.',
    },
    {
      currentBranch: '2.x',
      isDeployableBranch: true,
      branchExists: true,
      shouldSkip: false,
      skipReason: '',
    },
    {
      currentBranch: 'main',
      isDeployableBranch: true,
      branchExists: true,
      shouldSkip: false,
      skipReason: '',
    },
  ]);
});
