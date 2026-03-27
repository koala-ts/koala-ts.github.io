/**
 * Purpose: map a branch name to a publishable docs version slug (`main` -> `next`).
 * Usage: shared by runtime and deployment helpers that need stable version-aware URLs.
 */
const sanitizeBranchName = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');

const resolveVersionSlug = (branchName) =>
  branchName === 'main' ? 'next' : sanitizeBranchName(branchName) || 'next';

module.exports = {
  resolveVersionSlug,
  sanitizeBranchName,
};
