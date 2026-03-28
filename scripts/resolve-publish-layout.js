/**
 * Purpose: compatibility wrapper around the extracted release-policy core utility.
 * Usage: retained so existing CLI and script imports keep working during extraction.
 */
const {appendFileSync} = require('node:fs');
const {resolvePublishLayout} = require('../release-policy/core');

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
