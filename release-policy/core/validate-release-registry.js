const {requireString} = require('./normalize-base-path');
const {classifyDocsBranch} = require('./classify-docs-branch');

const assertDeployableRegistryBranch = (branchName) => {
  const classification = classifyDocsBranch(branchName);

  if (!classification.isDeployable) {
    throw new Error(`deployableBranches contains an unsupported branch: ${branchName}.`);
  }

  return classification;
};

const validateReleaseRegistry = (registry) => {
  if (!registry || typeof registry !== 'object' || Array.isArray(registry)) {
    throw new Error('releaseRegistry must be an object.');
  }

  const defaultBranch = requireString(registry.defaultBranch, 'defaultBranch');
  const deployableBranches = registry.deployableBranches;

  if (!Array.isArray(deployableBranches)) {
    throw new Error('deployableBranches must be an array.');
  }

  const normalizedDeployableBranches = deployableBranches.map((branchName) =>
    requireString(branchName, 'deployableBranch'),
  );

  const defaultBranchClassification = assertDeployableRegistryBranch(defaultBranch);

  for (const branchName of normalizedDeployableBranches) {
    assertDeployableRegistryBranch(branchName);
  }

  if (!normalizedDeployableBranches.includes(defaultBranch)) {
    throw new Error('deployableBranches must include defaultBranch.');
  }

  return {
    defaultBranch,
    deployableBranches: normalizedDeployableBranches,
  };
};

module.exports = {
  validateReleaseRegistry,
};
