# Release Policy Worklog

This file is the execution log and action plan for the release-policy extraction.

Use it to:

- record completed incremental PRs
- track current status
- define the next smallest useful step
- update the planned sequence when the implementation learns something new

Keep [`PLAN.md`](./PLAN.md) focused on stable architectural rules. Keep this file focused on history and next actions.

## Status

- State: in progress
- Active branch: `redeploy-all-action`

## History

### PR 1

- Goal: create the release-policy skeleton without moving behavior.
- Status: merged
- Scope:
  - add `release-policy/`
  - add `release-policy/PLAN.md`
  - add localized release-policy instructions and documentation
  - add root `release-registry.json`
  - avoid implementation moves in this PR

### PR 2

- Goal: extract the first pure release-policy functions into `release-policy/core` while preserving current behavior.
- Status: merged
- Notes:
  - this branch was rebased onto the latest `origin/2.x` after PR 1 merged so PR 2 does not carry a stale-base conflict
- Scope:
  - establish explicit-input rules for core policy functions
  - move version slug, base path normalization, and publish layout logic into `release-policy/core`
  - add colocated unit tests for each extracted core source file
  - keep `scripts/*` as compatibility wrappers
  - avoid Docusaurus adapter moves and workflow rewrites in this PR

### PR 3

- Goal: introduce explicit branch classification and deployability rules in `release-policy/core`.
- Status: merged
- Scope:
  - classify `main`, `<number>.x`, and non-deployable branches
  - validate release-registry branch names against the new policy
  - maintain and update existing tests as policy changes, rather than only adding new ones

### PR 4

- Goal: move Docusaurus/runtime path and navigation policy behind `release-policy/docusaurus`.
- Status: merged
- Scope:
  - extract docs runtime resolution into `release-policy/docusaurus`
  - extract canonical docs path builders into `release-policy/docusaurus`
  - extract version navbar and version-switch helpers into `release-policy/docusaurus`
  - keep `scripts/*` as compatibility wrappers
  - maintain and update existing tests while adding colocated adapter tests

### PR 5

- Goal: move deployment helper logic behind `release-policy/github-pages` and make the `gh-pages-control` dependency explicitly transitional.
- Status: merged
- Scope:
  - extract publish-layout, version-catalog, and docs-path manifest helpers into `release-policy/github-pages`
  - keep `scripts/*` as compatibility wrappers
  - make `gh-pages-control` removal an explicit migration requirement in the local release-policy documents
  - maintain and update existing tests while adding colocated adapter tests

### Fix PR: Versioned Docs Base URL

- Goal: restore the deployed non-default branch contract so versioned docs load assets, search, and mobile navigation from their versioned publish root.
- Status: merged
- Scope:
  - align `baseUrl`, `docsRouteBasePath`, and publish source/target rules for non-default branches
  - update existing tests for the versioned-build contract
  - add regression coverage for versioned branch publish paths
  - record the path-contract guardrails in the local release-policy documents

### Docs Alignment PR

- Goal: remove stale repository-level documentation about `gh-pages-control` and record the completed default-branch migration checkpoint.
- Status: merged
- Scope:
  - align root `AGENTS.md` and `README.md` with the current default-branch deployment model
  - update release-policy docs to describe the completed control-branch removal
  - record the successful redeploy checkpoint and control-branch deletion

### Public API PR

- Goal: define an initial workflow-facing release-policy entrypoint for release operations.
- Status: merged
- Scope:
  - add an initial workflow-facing release-policy entrypoint for release operations
  - keep `core`, `docusaurus`, and `github-pages` internal
  - add tests for the new public operations
  - migrate release workflows to the public entrypoint
  - remove obsolete repo-level release wrapper scripts
  - document the current release workflow entrypoint in the local release-policy docs

### Remove Scripts Directory PR

- Goal: move the remaining Docusaurus/runtime behavior into `release-policy`, align the docs with the merged state, and remove `scripts/` entirely.
- Status: merged
- Scope:
  - update stale release-policy and repository-level plans/instructions
  - add an internal Docusaurus integration entrypoint under `release-policy/docusaurus`
  - migrate Docusaurus/runtime consumers away from repo-level wrapper scripts
  - relocate remaining behavior and tests from `scripts/` into `release-policy`
  - remove the `scripts/` directory completely

### External API Mapping PR

- Goal: make the current externally used `release-policy` entrypoints explicit without changing responsibilities or deciding the final public API.
- Status: merged
- Scope:
  - introduce [`node.js`](./node.js) as the Node-side external entrypoint
  - introduce [`browser.js`](./browser.js) as the browser-side external entrypoint
  - route workflow and Docusaurus config/runtime consumers through [`node.js`](./node.js)
  - route browser consumers through [`browser.js`](./browser.js)
  - keep all other internal modules private
  - update plans and instructions to distinguish current external entrypoints from private internals

### GitHub Action Skeleton PR

- Goal: document the full workflow simplification target and add local action skeletons without changing workflow behavior.
- Status: merged
- Scope:
  - add local action skeletons under [`../.github/actions`](../.github/actions)
  - document the final top-level workflow set
  - document the planned removal of internal reusable workflows
  - record the four-PR migration sequence for the GitHub workflow simplification

### Single-Branch Deploy Action PR

- Goal: migrate selected-branch deploy into the local deploy action.
- Status: merged
- Scope:
  - move the single-branch deployment mechanics into [`../.github/actions/deploy-docs-branch`](../.github/actions/deploy-docs-branch)
  - make [`../.github/workflows/publish-branch.yml`](../.github/workflows/publish-branch.yml) call the local action directly
  - keep [`../.github/workflows/publish-branch-internal.yml`](../.github/workflows/publish-branch-internal.yml) working through the same action path during the transition
  - keep republish-all behavior unchanged for now

### Redeploy-All Action PR

- Goal: migrate redeploy-all orchestration into the local republish action.
- Status: in progress
- Scope:
  - move multi-branch orchestration into [`../.github/actions/redeploy-all-docs`](../.github/actions/redeploy-all-docs)
  - stop dispatching child workflows and polling GitHub from [`../.github/workflows/republish-all.yml`](../.github/workflows/republish-all.yml)
  - reuse the shared single-branch deploy mechanics from local action code
  - keep the internal reusable workflows in place until the final cleanup PR

### Planned Follow-up PR 4

- Goal: remove the internal reusable workflows after both local actions are proven.
- Status: planned

## Completed Checkpoint

- PR `fix: restore versioned docs runtime` merged successfully.
- Republish-all completed successfully after the fix.
- `1.x`, `2.x`, and `main` redeployed successfully from the current default branch.
- The remote `gh-pages-control` branch was deleted after the successful redeploy checkpoint.

## Next Steps

- Finish and merge the redeploy-all action PR.
- Then delete `publish-branch-runner.yml` and `publish-branch-internal.yml`.
- For every later PR, fetch the remote default branch first and create the branch from that updated base.
- Keep the repository limited to configuration, content, workflow YAML, and release data outside `release-policy`.
- Reduce the transitional external entrypoint surface deliberately later, after the workflow/action boundary is simplified and explicit.
- Keep repository-level docs aligned with the release-policy module when architecture checkpoints are completed.
- Validate the extracted design through real usage before porting it to another repository.
