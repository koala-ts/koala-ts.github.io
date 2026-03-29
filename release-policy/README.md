# Release Policy

This directory is reserved for the reusable release-policy module that will be incubated in this repository before extraction to a shared repository.

The architecture is defined in [`PLAN.md`](./PLAN.md).

## Boundaries

- This module currently exposes a narrow transitional Node API for repository deployment consumers.
- The final long-term public API is intentionally deferred.
- The current external entrypoint is [`node.js`](./node.js) for workflow and local-action release operations.
- [`core`](./core) will contain pure release-policy functions.
- [`github-pages`](./github-pages) will contain the GitHub Pages adapter.
- [`github-actions`](./github-actions) is reserved for GitHub Actions-specific wrappers and shared scripts.

## Ownership Model

- The default branch is intended to own the shared system design, homepage behavior, navigation model, and deployment orchestration.
- A version branch is intended to own only its versioned documentation content and the minimum code needed to make that version work locally.
- The model is intended to allow a future major release branch to become the default branch and inherit those shared responsibilities intact.

## Delivery Rules

- This directory follows [`PLAN.md`](./PLAN.md) as the authoritative implementation plan.
- Start each new PR branch from a freshly fetched current default branch.
- Repository consumers should use only the documented external entrypoints and avoid importing private internal files directly.
- The workflow entrypoint for release operations is [`node.js`](./node.js).
- Current workflow-to-action release-policy config is passed explicitly as:
  - `site_base`
  - `canonical_branch`
  - `deployable_branches`
  - `target_branch` for single-branch deploy
- Branch-local Docusaurus config/runtime should stay outside this module and keep only the minimum explicit logic needed for that branch to build and preview correctly.
- Keep the top-level workflow set limited to:
  - [`../.github/workflows/ci.yml`](../.github/workflows/ci.yml)
  - [`../.github/workflows/publish-branch.yml`](../.github/workflows/publish-branch.yml)
  - [`../.github/workflows/republish-all.yml`](../.github/workflows/republish-all.yml)
- Move GitHub-specific runtime glue under this module in:
  - [`github-actions/deploy-docs-branch`](./github-actions/deploy-docs-branch)
  - [`github-actions/redeploy-all-docs`](./github-actions/redeploy-all-docs)
- Future implementation must preserve the separation between pure policy and adapters.
- Production logic must not be added to the adapters when it belongs in `core`.
- Production logic must not be added directly to repo-level workflows or Docusaurus bootstrap code when it belongs in this module.
- Prefer explicit config payloads over file-based release-policy lookup.
- Keep each release-policy rule authoritative in one core implementation and compose from it instead of duplicating the same rule in multiple core files.
- Treat the versioned publish contract as one unit: `baseUrl`, `docsRouteBasePath`, and the publish target path must stay aligned for non-default branches.
- Avoid barrels in this module unless there is a clear documented justification.
- Transitional external entrypoint files may re-export behavior when they exist only to make current external dependencies explicit during extraction.
- Every source code file in this module should be introduced together with a colocated unit test file.
- Unit tests in this module should be isolated, follow AAA, and stay compatible with the repository CI test command.
- Unit tests in this module should target behavior-bearing files rather than barrels.
- Update existing tests when policy changes. Do not treat the suite as append-only.
- Path-policy changes must keep explicit regression coverage for both the default branch contract and at least one non-default versioned branch contract.
- Keep release-policy helpers and deployment workflows on the current default branch. Do not reintroduce a separate control branch.
- Keep repository code outside this module limited to configuration, content, and workflow YAML.
- The existing workflow model must keep working until the extraction plan is finished.

## Current GitHub Action State

GitHub-specific runtime glue now lives in:

- [`github-actions/deploy-docs-branch`](./github-actions/deploy-docs-branch)
- [`github-actions/redeploy-all-docs`](./github-actions/redeploy-all-docs)
- [`github-actions/shared`](./github-actions/shared)
