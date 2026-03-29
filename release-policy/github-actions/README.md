# GitHub Actions Adapter

This directory contains GitHub Actions-specific wrappers and shared scripts that travel with the `release-policy` tree.

Current workflow-to-action input contract:

- `site_base`
- `site_url`
- `canonical_branch`
- `deployable_branches`
- `target_branch` for single-branch deploy

Contents:

- [`deploy-docs-branch`](./deploy-docs-branch)
- [`redeploy-all-docs`](./redeploy-all-docs)
- [`shared`](./shared)
