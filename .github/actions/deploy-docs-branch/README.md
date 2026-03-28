# Deploy Docs Branch Action

This directory contains the local single-branch deploy action.

Target responsibility:

- own GitHub-specific runtime glue for selected-branch deploy
- call [`../../../release-policy/node.js`](../../../release-policy/node.js) for deploy computation
- serve as the shared single-branch deployment implementation for:
  - [`../../workflows/publish-branch.yml`](../../workflows/publish-branch.yml)
  - [`../../workflows/publish-branch-runner.yml`](../../workflows/publish-branch-runner.yml) during the transition

This action is the transition step that removes the deployment mechanics from the reusable runner workflow while keeping republish-all on its current path for now.
