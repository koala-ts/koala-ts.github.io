# Release Policy Extraction Plan

## Goal

Stabilize the documentation publishing model inside this repository before extracting it for reuse in other repositories.

The target state is a clear separation between pure release-policy logic, GitHub Pages deployment orchestration, GitHub-specific runtime glue, and explicit branch-local docs configuration outside this module.

## Architectural Boundaries

### Root Source Of Truth

- The current default branch is the single source of truth for release policy and deployment orchestration.
- The current default branch owns the system design, the homepage, the shared navigation model, and all repository-wide publishing behavior.
- No dedicated control branch is allowed in this architecture.
- The design must support a future major release becoming the new default branch and inheriting all default-branch responsibilities without redefining the architecture.

### Release Policy Module

- This module currently exposes a narrow transitional Node API for repository deployment consumers.
- This branch also exposes a standalone Docusaurus adapter through [`docusaurus.js`](./docusaurus.js).
- The final long-term public API is intentionally deferred and must not be documented as settled beyond these transitional entrypoints.
- The current external entrypoint is [`node.js`](./node.js) for workflow and local-action release operations.
- [`core`](./core) will contain pure functions only.
- Core logic must not depend on Docusaurus, GitHub Actions, shell scripts, the filesystem, or Git state.
- Core logic must receive required inputs explicitly. Do not rely on hidden process state or convenience fallbacks unless a fallback is an intentional domain rule.
- Core logic will own branch deployability, version slug resolution, canonical URL policy, publish layout policy, and republish planning.
- Core logic will classify branches explicitly: `main`, `<number>.x`, and non-deployable branches.

### GitHub Pages Adapter

- [`github-pages`](./github-pages) will adapt the core policy to deployment orchestration.
- Files under [`github-pages`](./github-pages) are private implementation detail unless they are surfaced through an explicit external entrypoint.
- The default branch owns the operator workflows for deploying one selected branch or redeploying all declared branches.
- Non-default branches provide buildable documentation content, but they do not own global deployment policy.
- Workflows consume deployment helpers from this repository on the current default branch through [`node.js`](./node.js).
- Workflow configuration should pass release-policy inputs through `with` into local actions, and local actions should pass explicit values into [`node.js`](./node.js).
- File-based release-policy lookup is not part of the target runtime contract.
- The current configuration contract is:
  - `site_base`
  - `site_url`
  - `canonical_branch`
  - `deployable_branches`
  - `target_branch` for single-branch deploy

### GitHub Actions Boundary

- The final workflow set must contain only:
  - [`../.github/workflows/ci.yml`](../.github/workflows/ci.yml)
  - [`../.github/workflows/publish-branch.yml`](../.github/workflows/publish-branch.yml)
  - [`../.github/workflows/republish-all.yml`](../.github/workflows/republish-all.yml)
- GitHub-specific runtime glue belongs with the release-policy tree under [`github-actions`](./github-actions).
- The local actions are:
  - [`github-actions/deploy-docs-branch`](./github-actions/deploy-docs-branch)
  - [`github-actions/redeploy-all-docs`](./github-actions/redeploy-all-docs)
- Top-level workflow YAML should keep only triggers, permissions, concurrency, and thin configuration wiring.
- Local actions should own GitHub runtime mechanics such as checkout sequencing, workspace preparation, build execution, publish copying, and commit/push behavior.
- `release-policy/node.js` should remain responsible for deploy computation and policy decisions rather than GitHub metadata structure.

### Branch Responsibility Model

- The default branch owns all repository-wide behavior: system design, homepage ownership, shared navigation, release policy, and deployment orchestration.
- A docs branch owns only its documentation version and the minimum explicit local runtime code required to build and preview that version correctly.
- A non-default docs branch must not become the source of truth for shared design or deployment behavior.
- When default-branch ownership moves to a new major release branch, that branch inherits the full default-branch responsibility set.
- In the current branch shape, branch-local Docusaurus config may consume the standalone Docusaurus adapter, but that adapter must stay independent from `core` and deployment orchestration.

## Invariants

- `/` is the canonical homepage of the current default branch.
- `/docs` is the canonical docs URL of the current default branch.
- `/docs/next` belongs to `main`.
- `/docs/<version>` belongs to a non-default deployable release branch.
- A non-default deployable branch must build as a site rooted at its published docs URL, so its `baseUrl` resolves to `/docs/<version>/` and its docs route base path resolves to `/`.
- Deployable release branches must match `<number>.x`.
- Deploying another branch always happens from workflows on the current default branch.
- Operators must be able to deploy a selected branch and redeploy all deployable branches.
- The current workflow model must remain functional during the extraction. Transitional refactors must preserve the existing publishing behavior until the plan is complete.
- Promoting a new default branch must transfer homepage ownership, canonical `/docs` ownership, shared navigation ownership, and deployment orchestration without changing the overall model.

## Current Baseline

- The top-level workflow set is limited to:
  - [`../.github/workflows/ci.yml`](../.github/workflows/ci.yml)
  - [`../.github/workflows/publish-branch.yml`](../.github/workflows/publish-branch.yml)
  - [`../.github/workflows/republish-all.yml`](../.github/workflows/republish-all.yml)
- GitHub-specific runtime glue lives under [`github-actions`](./github-actions).
- A standalone Docusaurus adapter currently lives at [`docusaurus.js`](./docusaurus.js).
- Internal reusable workflows and `.github/actions` copies are not part of the current architecture.
- Further work should treat this structure as the baseline rather than as an active migration.

## Current Env Surfaces

Workflow and local-action release inputs:

- `site_base`
- `site_url`
- `canonical_branch`
- `deployable_branches`
- `target_branch`

Standalone Docusaurus adapter runtime env variables:

- `DOCS_VERSION`
- `DOCS_DEFAULT_BRANCH`
- `DOCS_BASE_URL`
- `DOCS_SITE_BASE`
- `DOCS_ROUTE_BASE_PATH`
- `DOCS_VERSIONS`
- `DOCS_SEARCH_ROUTE_BASE_PATH`

Branch-local `docusaurus.config.js` is also allowed to read `SITE_URL` directly. That variable is intentionally kept outside the adapter so a site URL migration can be handled centrally by workflow injection without widening the standalone adapter contract.
