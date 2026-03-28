# Release Policy

This directory is reserved for the reusable release-policy module that will be incubated in this repository before extraction to a shared repository.

The architecture is defined in [`PLAN.md`](./PLAN.md).
The delivery history and next steps are tracked in [`WORKLOG.md`](./WORKLOG.md).

## Boundaries

- [`core`](./core) will contain pure release-policy functions.
- [`docusaurus`](./docusaurus) will contain the Docusaurus adapter.
- [`github-pages`](./github-pages) will contain the GitHub Pages adapter.

## Ownership Model

- The default branch is intended to own the shared system design, homepage behavior, navigation model, and deployment orchestration.
- A version branch is intended to own only its versioned documentation content and the minimum code needed to make that version work locally.
- The model is intended to allow a future major release branch to become the default branch and inherit those shared responsibilities intact.

## Delivery Rules

- This directory follows [`PLAN.md`](./PLAN.md) as the authoritative implementation plan.
- This directory relies on [`WORKLOG.md`](./WORKLOG.md) for the incremental action plan, completed steps, and next work.
- Start each new PR branch from a freshly fetched current default branch.
- The first pull request creates structure only. No behavior should be moved here yet.
- Future implementation must preserve the separation between pure policy and adapters.
- Production logic must not be added to the adapters when it belongs in `core`.
- Production logic must not be added directly to repo-level workflows or Docusaurus bootstrap code when it belongs in this module.
- Keep each release-policy rule authoritative in one core implementation and compose from it instead of duplicating the same rule in multiple core files.
- Avoid barrels in this module unless there is a clear documented justification.
- Every source code file in this module should be introduced together with a colocated unit test file.
- Unit tests in this module should be isolated, follow AAA, and stay compatible with the repository CI test command.
- Unit tests in this module should target behavior-bearing files rather than barrels.
- Update existing tests when policy changes. Do not treat the suite as append-only.
- The existing workflow model must keep working until the extraction plan is finished.
