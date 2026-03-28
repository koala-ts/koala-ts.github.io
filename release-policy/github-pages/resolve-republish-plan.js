const {resolveBranchAvailability} = require('./resolve-branch-availability');

const resolveRepublishPlan = ({deployableBranches, existingBranches}) => {
  if (!Array.isArray(deployableBranches)) {
    throw new Error('Republish plan deployableBranches must be an array.');
  }

  if (!Array.isArray(existingBranches)) {
    throw new Error('Republish plan existingBranches must be an array.');
  }

  return deployableBranches.map((currentBranch) =>
    resolveBranchAvailability({
      currentBranch,
      deployableBranches,
      existingBranches,
    }),
  );
};

module.exports = {
  resolveRepublishPlan,
};
