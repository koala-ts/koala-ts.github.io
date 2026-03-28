const {appendFileSync, existsSync, readFileSync, writeFileSync} = require('node:fs');
const {
  buildAbsoluteSiteUrl,
  buildCanonicalDocsContentPath,
  buildCanonicalDocsRootPath,
  buildCanonicalHomePath,
  buildCurrentDocsContentPath,
  buildCurrentDocsRoutePath,
  buildSharedDocsManifestPath,
  buildVersionNavbarItems,
  LOCAL_PREVIEW_MODE,
  PUBLISH_SIMULATION_MODE,
  parseDocsVersions,
  requireEnvValue,
  resolveBranchRuntime,
  resolveCurrentBranch,
  resolveDocsRouteBasePath,
  resolveDocsRuntime,
  resolveGitBranch,
  resolveLocalDocsEnv,
  resolveRuntimeMode,
} = require('./docusaurus/config');
const {
  resolvePublishContext,
} = require('./github-pages/resolve-publish-context');
const {
  resolveBranchAvailability,
} = require('./github-pages/resolve-branch-availability');
const {
  resolvePublishLayout,
} = require('./github-pages/resolve-publish-layout');
const {
  buildVersionCatalog,
} = require('./github-pages/build-version-catalog');
const {
  buildDocsPathManifest,
  collectDocsPaths,
} = require('./github-pages/build-docs-path-manifest');
const {validateReleaseRegistry} = require('./core/validate-release-registry');

const requireNonEmptyString = (value, name) => {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${name} must be a non-empty string.`);
  }

  return value.trim();
};

const requireArray = (value, name) => {
  if (!Array.isArray(value)) {
    throw new Error(`${name} must be an array.`);
  }

  return value;
};

const requireObject = (value, name) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${name} must be an object.`);
  }

  return value;
};

const parseOptionalCsv = (value) =>
  value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);

const parseOptionalJson = (value, name) => {
  try {
    return JSON.parse(value);
  } catch {
    throw new Error(`${name} must be valid JSON.`);
  }
};

const parseOptionalArrayArgument = (value, name) => {
  if (typeof value !== 'string') {
    return null;
  }

  return value.trim().startsWith('[')
    ? requireArray(parseOptionalJson(value, name), name)
    : parseOptionalCsv(value);
};

const parseArgs = (args) => {
  const positionals = [];
  const options = {};

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];

    if (!argument.startsWith('--')) {
      positionals.push(argument);
      continue;
    }

    const optionName = argument.slice(2);
    const optionValue = args[index + 1];

    if (!optionValue || optionValue.startsWith('--')) {
      throw new Error(`Option requires a value: --${optionName}.`);
    }

    options[optionName] = optionValue;
    index += 1;
  }

  return {
    positionals,
    options,
  };
};

const resolveRegistry = ({
  registry,
  canonicalBranch,
  deployableBranches,
}) => {
  if (registry) {
    return requireObject(registry, 'registry');
  }

  return validateReleaseRegistry({
    defaultBranch: requireNonEmptyString(canonicalBranch, 'canonicalBranch'),
    deployableBranches: requireArray(deployableBranches, 'deployableBranches'),
  });
};

const buildDeployBranchResult = ({
  registry,
  publishContext,
  availability,
  layout,
  versionCatalog,
  docsPathManifest,
}) => ({
  currentBranch: publishContext.currentBranch,
  defaultBranch: publishContext.defaultBranch,
  registry,
  publishContext,
  availability,
  layout,
  versionCatalog,
  docsPathManifest,
  status: 'ready',
});

const buildSkippedDeployBranchResult = ({
  registry,
  publishContext,
  availability,
}) => ({
  currentBranch: publishContext.currentBranch,
  defaultBranch: publishContext.defaultBranch,
  registry,
  publishContext,
  availability,
  layout: null,
  versionCatalog: null,
  docsPathManifest: null,
  status: 'skipped',
});

const deployBranch = (
  {
    currentBranch,
    existingBranches,
    siteBase,
    loadedVersions,
    loadedManifest,
    docsPaths,
    registry,
    canonicalBranch,
    deployableBranches,
  },
  {
    resolveContext = resolvePublishContext,
    resolveAvailability = resolveBranchAvailability,
    resolveLayout = resolvePublishLayout,
    buildCatalog = buildVersionCatalog,
    buildManifest = buildDocsPathManifest,
  } = {},
) => {
  const normalizedCurrentBranch = requireNonEmptyString(
    currentBranch,
    'currentBranch',
  );
  const normalizedExistingBranches = requireArray(
    existingBranches,
    'existingBranches',
  );
  const resolvedRegistry = resolveRegistry({
    registry,
    canonicalBranch,
    deployableBranches,
  });
  const publishContext = resolveContext({
    currentBranch: normalizedCurrentBranch,
    registry: resolvedRegistry,
  });

  if (!publishContext.isDeployableBranch) {
    throw new Error(`Branch is not deployable: ${publishContext.currentBranch}.`);
  }

  const availability = resolveAvailability({
    currentBranch: publishContext.currentBranch,
    deployableBranches: resolvedRegistry.deployableBranches,
    existingBranches: normalizedExistingBranches,
  });

  if (availability.shouldSkip) {
    return buildSkippedDeployBranchResult({
      registry: resolvedRegistry,
      publishContext,
      availability,
    });
  }

  const layout =
    typeof siteBase === 'string'
      ? resolveLayout({
          currentBranch: publishContext.currentBranch,
          defaultBranch: publishContext.defaultBranch,
          siteBase: requireNonEmptyString(siteBase, 'siteBase'),
          versionSlug: publishContext.versionSlug,
        })
      : null;
  const versionCatalog =
    Array.isArray(loadedVersions) && Array.isArray(docsPaths) && loadedManifest
      ? buildCatalog({
          loadedVersions: requireArray(loadedVersions, 'loadedVersions'),
          currentVersion: publishContext.versionSlug,
        })
      : null;
  const docsPathManifest =
    versionCatalog && loadedManifest
      ? buildManifest({
          loadedManifest: requireObject(loadedManifest, 'loadedManifest'),
          currentVersion: publishContext.versionSlug,
          docsPaths: requireArray(docsPaths, 'docsPaths'),
        })
      : null;

  return buildDeployBranchResult({
    registry: resolvedRegistry,
    publishContext,
    availability,
    layout,
    versionCatalog,
    docsPathManifest,
  });
};

const redeployAll = (
  {
    existingBranches,
    siteBase,
    loadedVersions,
    loadedManifest,
    docsPathsByBranch,
    registry,
    canonicalBranch,
    deployableBranches,
  },
  {
    deploy = deployBranch,
  } = {},
) => {
  const normalizedExistingBranches = requireArray(
    existingBranches,
    'existingBranches',
  );
  const resolvedRegistry = resolveRegistry({
    registry,
    canonicalBranch,
    deployableBranches,
  });
  let currentLoadedVersions = Array.isArray(loadedVersions)
    ? loadedVersions
    : null;
  let currentLoadedManifest = loadedManifest ? loadedManifest : null;
  const normalizedDocsPathsByBranch = docsPathsByBranch ?? {};

  const deployments = resolvedRegistry.deployableBranches.map((branchName) => {
    const hasDeploymentArtifacts =
      Array.isArray(currentLoadedVersions) &&
      currentLoadedManifest &&
      siteBase &&
      normalizedDocsPathsByBranch;
    const deployment = deploy(
      {
        currentBranch: branchName,
        existingBranches: normalizedExistingBranches,
        siteBase,
        loadedVersions: hasDeploymentArtifacts ? currentLoadedVersions : undefined,
        loadedManifest: hasDeploymentArtifacts ? currentLoadedManifest : undefined,
        docsPaths: hasDeploymentArtifacts
          ? normalizedDocsPathsByBranch[branchName] ?? []
          : undefined,
        registry: resolvedRegistry,
      },
      {
      },
    );

    if (deployment.status === 'ready' && deployment.versionCatalog && deployment.docsPathManifest) {
      currentLoadedVersions = deployment.versionCatalog.merged;
      currentLoadedManifest = deployment.docsPathManifest;
    }

    return deployment;
  });

  return {
    registry: resolvedRegistry,
    deployments,
  };
};

const writeDeployBranchOutput = (deployment, githubOutputPath) => {
  appendFileSync(
    githubOutputPath,
    `current_branch=${deployment.publishContext.currentBranch}\n` +
      `default_branch=${deployment.publishContext.defaultBranch}\n` +
      `version_slug=${deployment.publishContext.versionSlug}\n` +
      `is_default_branch=${deployment.publishContext.isDefaultBranch}\n` +
      `docs_route_base_path=${deployment.publishContext.docsRouteBasePath}\n` +
      `branch_exists=${deployment.availability.branchExists}\n` +
      `should_skip=${deployment.availability.shouldSkip}\n` +
      `skip_reason=${deployment.availability.skipReason}\n`,
  );

  if (!deployment.layout || !deployment.versionCatalog) {
    return;
  }

  appendFileSync(
    githubOutputPath,
    `build_base_url=${deployment.layout.buildBaseUrl}\n` +
      `publish_source_dir=${deployment.layout.publishSourceDir}\n` +
      `publish_target_dir=${deployment.layout.publishTargetDir}\n` +
      `versioned_docs_dir=${deployment.layout.versionedDocsDir}\n` +
      `version_csv=${deployment.versionCatalog.versionCsv}\n`,
  );
};

const writeRedeployAllOutput = (result, githubOutputPath) => {
  const deployableBranches = result.deployments.map((deployment) => deployment.currentBranch);

  appendFileSync(
    githubOutputPath,
    `deployable_branches=${JSON.stringify(deployableBranches)}\n` +
      `branch_csv=${deployableBranches.join(',')}\n`,
  );
};

const loadJsonFileOrDefault = (path, fallback) =>
  existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : fallback;

const deployBranchCli = (args, {stdout = process.stdout} = {}) => {
  const {
    positionals,
    options,
  } = parseArgs(args);
  const currentBranch = positionals[0];

  if (!currentBranch) {
    throw new Error(
      'Usage: node release-policy/node.js deploy-branch <currentBranch> --canonical-branch <branch> --deployable-branches <csv> --existing-branches <csv> [--site-base <path>] [--catalog-path <path>] [--manifest-path <path>] [--docs-dir <path>] [--github-output <path>]',
    );
  }

  const canonicalBranch = options['canonical-branch'];
  const deployableBranches = parseOptionalArrayArgument(
    options['deployable-branches'],
    'deployable-branches',
  );
  const existingBranches = parseOptionalArrayArgument(
    options['existing-branches'],
    'existing-branches',
  );

  if (!existingBranches) {
    throw new Error('existing-branches must be provided.');
  }

  const shouldPrepareArtifacts =
    typeof options['catalog-path'] === 'string' &&
    typeof options['manifest-path'] === 'string' &&
    typeof options['docs-dir'] === 'string';
  const deployment = deployBranch({
    currentBranch,
    existingBranches,
    siteBase: options['site-base'],
    loadedVersions: shouldPrepareArtifacts
      ? loadJsonFileOrDefault(options['catalog-path'], [])
      : undefined,
    loadedManifest: shouldPrepareArtifacts
      ? loadJsonFileOrDefault(options['manifest-path'], {})
      : undefined,
    docsPaths: shouldPrepareArtifacts
      ? collectDocsPaths(options['docs-dir'])
      : undefined,
    canonicalBranch,
    deployableBranches,
  });

  if (shouldPrepareArtifacts && deployment.status === 'ready') {
    writeFileSync(
      options['catalog-path'],
      `${JSON.stringify(deployment.versionCatalog.merged, null, 2)}\n`,
    );
    writeFileSync(
      options['manifest-path'],
      `${JSON.stringify(deployment.docsPathManifest, null, 2)}\n`,
    );
  }

  if (options['github-output']) {
    writeDeployBranchOutput(deployment, options['github-output']);
  }

  stdout.write(`${JSON.stringify(deployment)}\n`);

  return deployment;
};

const redeployAllCli = (args, {stdout = process.stdout} = {}) => {
  const {
    options,
  } = parseArgs(args);
  const canonicalBranch = options['canonical-branch'];
  const deployableBranches = parseOptionalArrayArgument(
    options['deployable-branches'],
    'deployable-branches',
  );
  const existingBranches = parseOptionalArrayArgument(
    options['existing-branches'],
    'existing-branches',
  );

  if (!existingBranches) {
    throw new Error('existing-branches must be provided.');
  }

  const result = redeployAll({
    existingBranches,
    canonicalBranch,
    deployableBranches,
  });

  if (options['github-output']) {
    writeRedeployAllOutput(result, options['github-output']);
  }

  stdout.write(`${JSON.stringify(result)}\n`);

  return result;
};

const runCli = (args) => {
  const [command, ...rest] = args;

  if (command === 'deploy-branch') {
    deployBranchCli(rest);
    return;
  }

  if (command === 'redeploy-all') {
    redeployAllCli(rest);
    return;
  }

  throw new Error(
    'Usage: node release-policy/node.js <deploy-branch|redeploy-all> ...',
  );
};

if (require.main === module) {
  runCli(process.argv.slice(2));
}

module.exports = {
  buildAbsoluteSiteUrl,
  buildCanonicalDocsContentPath,
  buildCanonicalDocsRootPath,
  buildCanonicalHomePath,
  buildCurrentDocsContentPath,
  buildCurrentDocsRoutePath,
  buildSharedDocsManifestPath,
  buildVersionNavbarItems,
  LOCAL_PREVIEW_MODE,
  PUBLISH_SIMULATION_MODE,
  deployBranch,
  parseDocsVersions,
  redeployAll,
  requireEnvValue,
  resolveBranchRuntime,
  resolveCurrentBranch,
  resolveDocsRouteBasePath,
  resolveDocsRuntime,
  resolveGitBranch,
  resolveLocalDocsEnv,
  resolveRuntimeMode,
  runCli,
};
