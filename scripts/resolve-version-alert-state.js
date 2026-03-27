/**
 * Purpose: classify the current docs version as stable, preview, or legacy.
 * Usage: shared by docs UI so branch-specific alerts follow one contract.
 */
const {resolveVersionSlug} = require('./resolve-version-slug');

const resolveVersionAlertState = ({currentVersionSlug, defaultBranch}) => {
  const defaultVersionSlug = resolveVersionSlug(defaultBranch);

  if (currentVersionSlug === defaultVersionSlug) {
    return 'stable';
  }

  if (currentVersionSlug === 'next') {
    return 'preview';
  }

  return 'legacy';
};

module.exports = {
  resolveVersionAlertState,
};
