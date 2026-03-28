# Deploy Docs Branch Action

This directory is a placeholder for the local single-branch deploy action.

Target responsibility:

- own GitHub-specific runtime glue for selected-branch deploy
- call [`../../../release-policy/node.js`](../../../release-policy/node.js) for deploy computation
- replace [`../../workflows/publish-branch-runner.yml`](../../workflows/publish-branch-runner.yml) once the migration reaches that step

This scaffold PR must not change deployment behavior yet.
