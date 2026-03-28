# Release Policy Extraction Plan

## Goal

Stabilize the documentation publishing model inside this repository before extracting it for reuse in other repositories.

The target state is a clear separation between pure release-policy logic, Docusaurus integration, GitHub Pages deployment orchestration, and GitHub-specific runtime glue.

## Architectural Boundaries

### Root Source Of Truth

- The current default branch is the single source of truth for release policy and deployment orchestration.
- The current default branch owns the system design, the homepage, the shared navigation model, and all repository-wide publishing behavior.
- [`../release-registry.json`](../release-registry.json) lives at the repository root and is authoritative.
- No dedicated control branch such as `gh-pages-control` is allowed in the target architecture.
- The `gh-pages-control` migration checkpoint is complete. Workflows and deploy helpers now run from the current default branch.
- The design must support a future major release becoming the new default branch and inheriting all default-branch responsibilities without redefining the architecture.

### Release Policy Module

- This module currently exposes a transitional external API for repository consumers.
- The final long-term public API is intentionally deferred and must not be documented as settled.
- Current external entrypoints are:
  - [`node.js`](./node.js) for all Node-side external usage, including workflows and Docusaurus config/runtime wiring
  - [`browser.js`](./browser.js) for browser-safe external usage
- [`core`](./core) will contain pure functions only.
- Core logic must not depend on Docusaurus, GitHub Actions, shell scripts, the filesystem, or Git state.
- Core logic must receive required inputs explicitly. Do not rely on hidden process state or convenience fallbacks unless a fallback is an intentional domain rule.
- Core logic will own branch deployability, version slug resolution, canonical URL policy, publish layout policy, and republish planning.
- Core logic will classify branches explicitly: `main`, `<number>.x`, and non-deployable branches.

### Docusaurus Adapter

- [`docusaurus`](./docusaurus) will adapt the core policy to Docusaurus configuration and runtime needs.
- Remaining files under [`docusaurus`](./docusaurus) are private implementation detail unless they are surfaced through [`../node.js`](./node.js) or [`../browser.js`](./browser.js).
- This adapter may translate policy outputs into `baseUrl`, `routeBasePath`, navigation inputs, and local runtime inputs.
- This adapter must not become a second source of release-policy truth.

### GitHub Pages Adapter

- [`github-pages`](./github-pages) will adapt the core policy to deployment orchestration.
- Files under [`github-pages`](./github-pages) are private implementation detail unless they are surfaced through an explicit external entrypoint.
- The default branch owns the operator workflows for deploying one selected branch or redeploying all declared branches.
- Non-default branches provide buildable documentation content, but they do not own global deployment policy.
- Workflows consume deployment helpers from this repository on the current default branch through [`node.js`](./node.js).

### GitHub Actions Boundary

- The final workflow set must contain only:
  - [`../.github/workflows/ci.yml`](../.github/workflows/ci.yml)
  - [`../.github/workflows/publish-branch.yml`](../.github/workflows/publish-branch.yml)
  - [`../.github/workflows/republish-all.yml`](../.github/workflows/republish-all.yml)
- GitHub-specific runtime glue belongs with the release-policy tree under [`github-actions`](./github-actions).
- The target local actions are:
  - [`github-actions/deploy-docs-branch`](./github-actions/deploy-docs-branch)
  - [`github-actions/redeploy-all-docs`](./github-actions/redeploy-all-docs)
- During the relocation, `.github/actions` remains transitional implementation detail only until workflows are switched to the new paths.
- Top-level workflow YAML should keep only triggers, permissions, concurrency, and thin configuration wiring.
- Local actions should own GitHub runtime mechanics such as checkout sequencing, workspace preparation, build execution, publish copying, and commit/push behavior.
- `release-policy/node.js` should remain responsible for deploy computation and policy decisions rather than GitHub metadata structure.

### Branch Responsibility Model

- The default branch owns all repository-wide behavior: system design, homepage ownership, shared navigation, release policy, and deployment orchestration.
- A non-default docs branch owns only its documentation version and the minimum local runtime code required to build and preview that version correctly.
- A non-default docs branch must not become the source of truth for shared design or deployment behavior.
- When default-branch ownership moves to a new major release branch, that branch inherits the full default-branch responsibility set.

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

## Completed Workflow Simplification

The GitHub workflow simplification is complete:

1. local action skeletons were added and the end state was documented
2. single-branch deploy moved into `deploy-docs-branch`
3. republish-all orchestration moved into `redeploy-all-docs`
4. the internal reusable workflows were removed after both local actions were proven

Further work should treat that boundary as the baseline architecture.

## Recorded GitHub Action Relocation Sequence

The GitHub action relocation should land in four incremental PRs:

1. add `release-policy/github-actions` skeletons and document the relocation target clearly
2. move `deploy-docs-branch` to `release-policy/github-actions` and switch the selected-branch workflow
3. move `redeploy-all-docs` and shared scripts to `release-policy/github-actions` and switch republish-all
4. remove the old `.github/actions` copies once both workflow paths are proven

Each step must start from the latest current default branch, preserve working deployments, and update the worklog and instructions to reflect the new state.
