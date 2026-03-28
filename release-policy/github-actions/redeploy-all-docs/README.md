# Redeploy All Docs Action

This directory is the target location for the multi-branch redeploy action.

Target responsibility:

- own GitHub-specific runtime glue for ordered redeploy of configured branches
- call [`../../node.js`](../../node.js) for republish planning
- provide the active republish-all workflow action path once [`republish-all.yml`](../../../.github/workflows/republish-all.yml) is switched
- keep the old [`.github/actions/redeploy-all-docs`](../../../.github/actions/redeploy-all-docs) copy only as cleanup debt until the final PR

This PR moves republish-all to this location and reuses the relocated shared deploy script.
