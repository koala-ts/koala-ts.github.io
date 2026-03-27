/**
 * Purpose: map a branch name to a publishable docs version slug (`main` -> `next`).
 * Usage: used by deploy workflow to compute target version paths and default redirects.
 */
const {appendFileSync} = require('node:fs');
const {resolveVersionSlug} = require('./resolve-version-slug');

const args = process.argv.slice(2);

const outputIndex = args.indexOf('--github-output');
const githubOutputPath = outputIndex >= 0 ? args[outputIndex + 1] : '';

const branchArg = args.find((arg, index) => {
  if (arg.startsWith('--')) {
    return false;
  }

  if (outputIndex >= 0 && index === outputIndex + 1) {
    return false;
  }

  return true;
});

const branchName =
  branchArg || process.env.GITHUB_REF_NAME || process.env.BRANCH_NAME || 'main';

const versionSlug = resolveVersionSlug(branchName);

if (githubOutputPath) {
  appendFileSync(
    githubOutputPath,
    `branch_name=${branchName}\nversion_slug=${versionSlug}\n`,
  );
}

process.stdout.write(`${versionSlug}\n`);
