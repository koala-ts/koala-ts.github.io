# Release Policy Extraction Plan

## Goal

Stabilize the documentation publishing model inside this repository before extracting it for reuse in other repositories.

The target state is a clear separation between pure release-policy logic, Docusaurus integration, and GitHub Pages deployment orchestration.

## Architectural Boundaries

### Root Source Of Truth

- The current default branch is the single source of truth for release policy and deployment orchestration.
- The current default branch owns the system design, the homepage, the shared navigation model, and all repository-wide publishing behavior.
- [`../release-registry.json`](../release-registry.json) lives at the repository root and is authoritative.
- No dedicated control branch such as `gh-pages-control` is allowed in the target architecture.
- Workflows still depend on `gh-pages-control` today for some deployment scripts, but that dependency is transitional and must be removed before the migration is considered complete.
- The design must support a future major release becoming the new default branch and inheriting all default-branch responsibilities without redefining the architecture.

### Release Policy Module

- [`core`](./core) will contain pure functions only.
- Core logic must not depend on Docusaurus, GitHub Actions, shell scripts, the filesystem, or Git state.
- Core logic must receive required inputs explicitly. Do not rely on hidden process state or convenience fallbacks unless a fallback is an intentional domain rule.
- Core logic will own branch deployability, version slug resolution, canonical URL policy, publish layout policy, and republish planning.
- Core logic will classify branches explicitly: `main`, `<number>.x`, and non-deployable branches.

### Docusaurus Adapter

- [`docusaurus`](./docusaurus) will adapt the core policy to Docusaurus configuration and runtime needs.
- This adapter may translate policy outputs into `baseUrl`, `routeBasePath`, navigation inputs, and local runtime inputs.
- This adapter must not become a second source of release-policy truth.

### GitHub Pages Adapter

- [`github-pages`](./github-pages) will adapt the core policy to deployment orchestration.
- The default branch owns the operator workflows for deploying one selected branch or redeploying all declared branches.
- Non-default branches provide buildable documentation content, but they do not own global deployment policy.
- The target state is that workflows consume deployment helpers from this repository on the current default branch through `release-policy/github-pages`, not from `gh-pages-control`.

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
- Deployable release branches must match `<number>.x`.
- Deploying another branch always happens from workflows on the current default branch.
- Operators must be able to deploy a selected branch and redeploy all deployable branches.
- The current workflow model must remain functional during the extraction. Transitional refactors must preserve the existing publishing behavior until the plan is complete.
- Promoting a new default branch must transfer homepage ownership, canonical `/docs` ownership, shared navigation ownership, and deployment orchestration without changing the overall model.
