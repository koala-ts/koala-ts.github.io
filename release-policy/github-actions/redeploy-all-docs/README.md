# Redeploy All Docs Action

This directory is the target location for the multi-branch redeploy action.

Target responsibility:

- own GitHub-specific runtime glue for ordered redeploy of configured branches
- call [`../../node.js`](../../node.js) for republish planning
- replace [`.github/actions/redeploy-all-docs`](../../../.github/actions/redeploy-all-docs) once the workflows are switched

This PR only establishes the target location. It must not change workflow behavior yet.
