const {classifyDocsBranch} = require('../core/classify-docs-branch');

const resolvePublishContext = ({currentBranch, registry}) => {
  if (!currentBranch || typeof currentBranch !== 'string') {
    throw new Error('Publish context currentBranch must be a non-empty string.');
  }

  const {defaultBranch, deployableBranches} = registry;
  const classification = classifyDocsBranch(currentBranch);
  const isDefaultBranch = currentBranch === defaultBranch;
  const isDeployableBranch = deployableBranches.includes(currentBranch);
  const docsRouteBasePath = isDefaultBranch ? 'docs' : '/';

  return {
    currentBranch,
    defaultBranch,
    deployableBranches,
    versionSlug: classification.versionSlug,
    isDefaultBranch,
    isDeployableBranch,
    docsRouteBasePath,
  };
};

module.exports = {
  resolvePublishContext,
};
