# Deploy Docs Branch Action

This directory is the target location for the single-branch deploy action.

Target responsibility:

- own GitHub-specific runtime glue for selected-branch deploy
- call [`../../node.js`](../../node.js) for deploy computation
- replace [`.github/actions/deploy-docs-branch`](../../../.github/actions/deploy-docs-branch) once the workflows are switched

This PR only establishes the target location. It must not change workflow behavior yet.
