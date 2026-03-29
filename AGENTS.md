# Docs Repo Instructions

## Version Strategy

- The current default branch owns the canonical homepage at `/` and the canonical docs at `/docs`.
- The canonical branch value is provided to release workflows by the current default branch, not by branch-local docs config.
- `main` documents the upcoming next release published as `/docs/next`.
- Non-default release branches publish docs at `/docs/<version>`.

## Routing Documentation Policy

- Keep the public URL contract consistent between local development and GitHub Pages publication.
- Local development supports two explicit modes:
  - local preview keeps the checked out branch canonical locally
  - publish simulation uses an injected centralized default branch value
- Treat `/` as the canonical homepage and `/docs` as the canonical docs URL for the current default branch.
- Treat `/docs/next` as the canonical docs URL for `main`.
- Treat `/docs/<version>` as the canonical docs URL for non-default release branches.
- `2.x` may document deprecated compatibility paths when they still exist in the framework.
- `main` must document only the intended next-major API.
- Do not keep deprecated routing guidance in `main` once the replacement API is known.
- Treat `main` as the clean destination state for the next major release.

## Writing Rules

- Prefer the current recommended API in all primary examples.
- Keep migration guidance in versioned release branches when needed.
- Avoid mixing deprecated and recommended APIs in the same example unless the page is explicitly about migration.

## Deployment Model

- The current default branch owns release policy, deploy helpers, and the dispatchable workflows used by GitHub Actions.
- Deployable docs branches must not become the source of truth for global release ownership.
- Branch-local docs runtime should stay limited to what is necessary for local development and branch builds, and it should prefer explicit branch-owned values over unnecessary dynamic helper layers.
- `docusaurus.config.js` in this branch may depend on the standalone Docusaurus adapter at [`release-policy/docusaurus.js`](./release-policy/docusaurus.js), but it must not import or depend on release-policy deploy logic.
- The standalone Docusaurus adapter currently reads:
  - `DOCS_VERSION`
  - `DOCS_DEFAULT_BRANCH`
  - `DOCS_BASE_URL`
  - `DOCS_SITE_BASE`
  - `DOCS_ROUTE_BASE_PATH`
  - `DOCS_VERSIONS`
  - `DOCS_SEARCH_ROUTE_BASE_PATH`
- `SITE_URL` is branch-local and should be consumed only by `docusaurus.config.js`, not by the adapter.
- Manual operators should use:
  - `🚀 Deploy Selected Docs Branch` on the current default branch
  - `🚀 Deploy All Deployable Docs Branches` on the current default branch
- A release branch that is not included in the default branch deployable configuration is not deployable and should be documented that way.
