# Redeploy All Docs Action

This directory contains the local redeploy-all action.

Target responsibility:

- own GitHub-specific runtime glue for ordered republish of all configured branches
- call [`../../../release-policy/node.js`](../../../release-policy/node.js) for republish planning
- replace child-workflow dispatch and polling from [`../../workflows/republish-all.yml`](../../workflows/republish-all.yml)
- reuse the shared shell entrypoint in [`../shared/deploy-docs-branch.sh`](../shared/deploy-docs-branch.sh) for each branch

This action is the transition step that moves multi-branch orchestration out of workflow YAML and into a local GitHub action.
