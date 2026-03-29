# Shared GitHub Action Scripts

This directory contains shared GitHub Action scripts that travel with the relocated action wrappers.

- [`deploy-docs-branch.sh`](./deploy-docs-branch.sh) is active for the selected-branch workflow through [`../deploy-docs-branch`](../deploy-docs-branch)
- `deploy-docs-branch.sh` consumes the workflow/action contract through env:
  - `SITE_BASE`
  - `SITE_URL`
  - `CANONICAL_BRANCH`
  - `DEPLOYABLE_BRANCHES`
  - `TARGET_BRANCH`
  - `GITHUB_TOKEN`
