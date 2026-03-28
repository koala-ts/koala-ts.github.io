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
- Active branch for docs alignment PR: `document-default-branch-release-policy`

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
- Status: in progress
- Scope:
  - align root `AGENTS.md` and `README.md` with the current default-branch deployment model
  - update release-policy docs to describe the completed control-branch removal
  - record the successful redeploy checkpoint and control-branch deletion

## Completed Checkpoint

- PR `fix: restore versioned docs runtime` merged successfully.
- Republish-all completed successfully after the fix.
- `1.x`, `2.x`, and `main` redeployed successfully from the current default branch.
- The remote `gh-pages-control` branch was deleted after the successful redeploy checkpoint.

## Next Steps

- Finish and merge the docs-alignment PR.
- For every later PR, fetch the remote default branch first and create the branch from that updated base.
- Move additional pure release-policy logic into `release-policy/core`.
- Keep repository-level docs aligned with the release-policy module when architecture checkpoints are completed.
- Validate the extracted design through real usage before porting it to another repository.
