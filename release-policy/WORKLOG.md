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
- Active branch for PR 3: `release-policy-branch-policy`

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
- Status: in progress
- Scope:
  - classify `main`, `<number>.x`, and non-deployable branches
  - validate release-registry branch names against the new policy
  - maintain and update existing tests as policy changes, rather than only adding new ones

## Next Steps

- Finish and merge PR 3.
- For every later PR, fetch the remote default branch first and create the branch from that updated base.
- Move additional pure release-policy logic into `release-policy/core`.
- Move Docusaurus integration behind `release-policy/docusaurus`.
- Move deployment orchestration helpers behind `release-policy/github-pages`.
- Remove separate-control-branch assumptions from the implementation without breaking the current working model.
- Validate the extracted design through real usage before porting it to another repository.
