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
- Active branch for PR 1: `release-policy-skeleton`

## History

### PR 1

- Goal: create the release-policy skeleton without moving behavior.
- Status: in progress
- Scope:
  - add `release-policy/`
  - add `release-policy/PLAN.md`
  - add localized release-policy instructions and documentation
  - add root `release-registry.json`
  - avoid implementation moves in this PR

## Next Steps

- Finish and merge PR 1.
- Move pure release-policy logic into `release-policy/core`.
- Move Docusaurus integration behind `release-policy/docusaurus`.
- Move deployment orchestration helpers behind `release-policy/github-pages`.
- Remove separate-control-branch assumptions from the implementation without breaking the current working model.
- Validate the extracted design through real usage before porting it to another repository.
