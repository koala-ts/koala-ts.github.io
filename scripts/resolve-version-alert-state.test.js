const test = require('node:test');
const assert = require('node:assert/strict');

const {resolveVersionAlertState} = require('./resolve-version-alert-state');

test('returns stable for the default branch version', () => {
  const state = resolveVersionAlertState({
    currentVersionSlug: '2.x',
    defaultBranch: '2.x',
  });

  assert.equal(state, 'stable');
});

test('returns preview for next', () => {
  const state = resolveVersionAlertState({
    currentVersionSlug: 'next',
    defaultBranch: '2.x',
  });

  assert.equal(state, 'preview');
});

test('returns legacy for older release branches', () => {
  const state = resolveVersionAlertState({
    currentVersionSlug: '1.x',
    defaultBranch: '2.x',
  });

  assert.equal(state, 'legacy');
});
