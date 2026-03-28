const {requireString} = require('./normalize-base-path');

const sanitizeBranchName = (value) =>
  requireString(value, 'branchName')
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
