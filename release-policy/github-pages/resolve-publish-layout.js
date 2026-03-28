const {appendFileSync} = require('node:fs');
const {
  resolvePublishLayout,
} = require('../core/resolve-publish-layout');

const writeGithubOutput = (layout, githubOutputPath) => {
  appendFileSync(
    githubOutputPath,
    `build_base_url=${layout.buildBaseUrl}\n` +
      `docs_route_base_path=${layout.docsRouteBasePath}\n` +
      `is_default_branch=${layout.isDefaultBranch}\n` +
      `publish_source_dir=${layout.publishSourceDir}\n` +
      `publish_target_dir=${layout.publishTargetDir}\n` +
      `versioned_docs_dir=${layout.versionedDocsDir}\n`,
  );
};

const resolvePublishLayoutCli = (args, {stdout = process.stdout} = {}) => {
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
    writeGithubOutput(layout, githubOutputPath);
  }

  stdout.write(`${JSON.stringify(layout)}\n`);

  return layout;
};

module.exports = {
  resolvePublishLayout,
  resolvePublishLayoutCli,
  writeGithubOutput,
};
