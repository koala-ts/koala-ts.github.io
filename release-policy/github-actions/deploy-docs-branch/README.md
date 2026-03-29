# Deploy Docs Branch Action

This directory contains the single-branch deploy action.

Responsibility:

- own GitHub-specific runtime glue for selected-branch deploy
- call [`../../node.js`](../../node.js) for deploy computation
- provide the active selected-branch workflow action path used by [`publish-branch.yml`](../../../.github/workflows/publish-branch.yml)

Current inputs:

- `site_base`
- `site_url`
- `canonical_branch`
- `deployable_branches`
- `target_branch`
- `github_token`
