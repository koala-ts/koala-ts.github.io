# Redeploy All Docs Action

This directory is a placeholder for the local redeploy-all action.

Target responsibility:

- own GitHub-specific runtime glue for ordered republish of all configured branches
- call [`../../../release-policy/node.js`](../../../release-policy/node.js) for republish planning
- replace child-workflow dispatch and polling from [`../../workflows/republish-all.yml`](../../workflows/republish-all.yml)

This scaffold PR must not change deployment behavior yet.
