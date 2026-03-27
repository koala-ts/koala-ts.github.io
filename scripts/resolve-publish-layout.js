/**
 * Purpose: resolve the build and publish layout for a docs branch on GitHub Pages.
 * Usage: used by the deploy workflow so default and non-default branches publish to the correct paths.
 */
const {appendFileSync} = require('node:fs');
const {normalizeBasePath} = require('./normalize-base-path');
const {resolveVersionSlug} = require('./resolve-version-slug');

const resolvePublishLayout = ({
  currentBranch,
  defaultBranch,
  siteBase = '/',
  versionSlug,
}) => {
  const normalizedSiteBase = normalizeBasePath(siteBase);
  const defaultVersionSlug = resolveVersionSlug(defaultBranch);
  const isDefaultBranch = versionSlug === defaultVersionSlug && currentBranch === defaultBranch;
  const docsRouteBasePath = isDefaultBranch ? 'docs' : `docs/${versionSlug}`;

  return {
    buildBaseUrl: normalizedSiteBase,
    docsRouteBasePath,
    isDefaultBranch,
    publishSourceDir: isDefaultBranch
      ? 'build'
      : `build/${docsRouteBasePath}`,
    publishTargetDir: isDefaultBranch ? '.gh-pages' : `.gh-pages/docs/${versionSlug}`,
    versionedDocsDir: `.gh-pages/docs/${versionSlug}`,
  };
};

if (require.main === module) {
  const args = process.argv.slice(2);
  const outputIndex = args.indexOf('--github-output');
  const githubOutputPath = outputIndex >= 0 ? args[outputIndex + 1] : '';
  const currentBranch = args[0];
  const defaultBranch = args[1];
  const siteBase = args[2];
  const versionSlug = args[3];

  if (!currentBranch || !defaultBranch || !siteBase || !versionSlug) {
    throw new Error(
      'Usage: node scripts/resolve-publish-layout.js <currentBranch> <defaultBranch> <siteBase> <versionSlug> [--github-output <path>]',
    );
  }

  const layout = resolvePublishLayout({
    currentBranch,
    defaultBranch,
    siteBase,
    versionSlug,
  });

  if (githubOutputPath) {
    appendFileSync(
      githubOutputPath,
      `build_base_url=${layout.buildBaseUrl}\n` +
        `docs_route_base_path=${layout.docsRouteBasePath}\n` +
        `is_default_branch=${layout.isDefaultBranch}\n` +
        `publish_source_dir=${layout.publishSourceDir}\n` +
        `publish_target_dir=${layout.publishTargetDir}\n` +
        `versioned_docs_dir=${layout.versionedDocsDir}\n`,
    );
  }

  process.stdout.write(`${JSON.stringify(layout)}\n`);
}

module.exports = {
  resolvePublishLayout,
};
