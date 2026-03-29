# Redeploy All Docs Action

This directory contains the multi-branch redeploy action.

Responsibility:

- own GitHub-specific runtime glue for ordered redeploy of configured branches
- call [`../../node.js`](../../node.js) for republish planning
- provide the active republish-all workflow action path used by [`republish-all.yml`](../../../.github/workflows/republish-all.yml)

Current inputs:

- `site_base`
- `site_url`
- `canonical_branch`
- `deployable_branches`
- `github_token`
