# GitHub Actions Adapter

This directory is reserved for GitHub Actions-specific wrappers and shared scripts that travel with the `release-policy` tree.

Target contents:

- [`deploy-docs-branch`](./deploy-docs-branch)
- [`redeploy-all-docs`](./redeploy-all-docs)
- [`shared`](./shared)

During the relocation sequence, the active workflow paths still point at [`.github/actions`](../../.github/actions). This directory exists first to make the target extraction boundary explicit before behavior moves.
