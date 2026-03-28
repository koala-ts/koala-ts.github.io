# Deploy Docs Branch Action

This directory is the target location for the single-branch deploy action.

Target responsibility:

- own GitHub-specific runtime glue for selected-branch deploy
- call [`../../node.js`](../../node.js) for deploy computation
- provide the active selected-branch workflow action path once [`publish-branch.yml`](../../../.github/workflows/publish-branch.yml) is switched
- keep the old [`.github/actions/deploy-docs-branch`](../../../.github/actions/deploy-docs-branch) copy only for republish-related compatibility until the next PR

This PR moves the selected-branch workflow to this location while leaving republish-all on the old action path for one more step.
