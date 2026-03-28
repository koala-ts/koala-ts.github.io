const {requireString} = require('./normalize-base-path');
const {sanitizeBranchName} = require('./resolve-version-slug');

const RELEASE_BRANCH_PATTERN = /^[0-9]+\.x$/;

const createDeployableClassification = ({branchName, kind, versionSlug}) => ({
  branchName,
  kind,
  isDeployable: true,
  versionSlug,
  docsRouteBasePath: `docs/${versionSlug}`,
  publishTargetDir: `.gh-pages/docs/${versionSlug}`,
  shouldAppearInVersionCatalog: true,
});

const classifyDocsBranch = (branchName) => {
  const normalizedBranchName = requireString(branchName, 'branchName');

  if (normalizedBranchName === 'main') {
    return createDeployableClassification({
      branchName: normalizedBranchName,
      kind: 'main',
      versionSlug: 'next',
    });
  }

  if (RELEASE_BRANCH_PATTERN.test(normalizedBranchName)) {
    return createDeployableClassification({
      branchName: normalizedBranchName,
      kind: 'release',
      versionSlug: normalizedBranchName,
    });
  }

  return {
    branchName: normalizedBranchName,
    kind: 'other',
    isDeployable: false,
    versionSlug: sanitizeBranchName(normalizedBranchName) || 'next',
    docsRouteBasePath: '',
    publishTargetDir: '',
    shouldAppearInVersionCatalog: false,
  };
};

const assertBranchVersionSlug = ({branchName, versionSlug}) => {
  const classification = classifyDocsBranch(branchName);
  const normalizedVersionSlug = requireString(versionSlug, 'versionSlug');

  if (classification.versionSlug !== normalizedVersionSlug) {
    throw new Error(
      `versionSlug must match the classified branch policy for ${classification.branchName}.`,
    );
  }

  return classification;
};

module.exports = {
  RELEASE_BRANCH_PATTERN,
  assertBranchVersionSlug,
  classifyDocsBranch,
};
