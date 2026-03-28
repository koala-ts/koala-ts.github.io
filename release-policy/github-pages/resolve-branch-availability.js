const resolveBranchAvailability = ({
  currentBranch,
  deployableBranches,
  existingBranches,
}) => {
  if (!currentBranch || typeof currentBranch !== 'string') {
    throw new Error('Branch availability currentBranch must be a non-empty string.');
  }

  if (!Array.isArray(deployableBranches)) {
    throw new Error('Branch availability deployableBranches must be an array.');
  }

  if (!Array.isArray(existingBranches)) {
    throw new Error('Branch availability existingBranches must be an array.');
  }

  const isDeployableBranch = deployableBranches.includes(currentBranch);
  const branchExists = existingBranches.includes(currentBranch);
  const shouldSkip = isDeployableBranch && !branchExists;
  const skipReason = shouldSkip
    ? `Deployable branch does not exist and will be skipped: ${currentBranch}.`
    : '';

  return {
    currentBranch,
    isDeployableBranch,
    branchExists,
    shouldSkip,
    skipReason,
  };
};

module.exports = {
  resolveBranchAvailability,
};
