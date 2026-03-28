# Release Policy

This directory is reserved for the reusable release-policy module that will be incubated in this repository before extraction to a shared repository.

The architecture is defined in [`PLAN.md`](./PLAN.md).
The delivery history and next steps are tracked in [`WORKLOG.md`](./WORKLOG.md).

## Boundaries

- [`index.js`](./index.js) is the only intended public entrypoint of this module.
- The only intended public operations are `deployBranch` and `redeployAll`.
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
- The repository should consume this module through [`index.js`](./index.js), not by importing internal files directly.
- The workflow entrypoint for release operations is [`index.js`](./index.js), not repo-level release wrapper scripts.
- Future implementation must preserve the separation between pure policy and adapters.
- Production logic must not be added to the adapters when it belongs in `core`.
- Production logic must not be added directly to repo-level workflows or Docusaurus bootstrap code when it belongs in this module.
- Keep each release-policy rule authoritative in one core implementation and compose from it instead of duplicating the same rule in multiple core files.
- Treat the versioned publish contract as one unit: `baseUrl`, `docsRouteBasePath`, and the publish target path must stay aligned for non-default branches.
- Avoid barrels in this module unless there is a clear documented justification.
- Every source code file in this module should be introduced together with a colocated unit test file.
- Unit tests in this module should be isolated, follow AAA, and stay compatible with the repository CI test command.
- Unit tests in this module should target behavior-bearing files rather than barrels.
- Update existing tests when policy changes. Do not treat the suite as append-only.
- Path-policy changes must keep explicit regression coverage for both the default branch contract and at least one non-default versioned branch contract.
- Keep release-policy helpers and deployment workflows on the current default branch. Do not reintroduce a separate control branch.
- The existing workflow model must keep working until the extraction plan is finished.
