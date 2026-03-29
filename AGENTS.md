# Docs Repo Instructions

## Version Strategy

- The current default branch owns the canonical homepage at `/` and the canonical docs at `/docs`.
- The canonical branch value is provided to the release actions through workflow configuration, not through branch-local docs config.
- `main` documents the upcoming next release published as `/docs/next`.
- Non-default release branches publish docs at `/docs/<version>`.

## Routing Documentation Policy

- Keep the public URL contract consistent between local development and GitHub Pages publication.
- Local development supports two explicit modes:
  - local preview keeps the checked out branch canonical locally
  - publish simulation uses an injected centralized default branch
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
- Release-policy configuration should flow explicitly through workflow `with`, local action inputs, and the Node entrypoint.
- Deployable docs branches must not become the source of truth for global release ownership.
- Repository code outside `release-policy` should stay limited to configuration, content, workflow YAML, and the minimum explicit branch-local docs runtime needed for local builds.
- External release-policy consumers should go through [`release-policy/node.js`](./release-policy/node.js).
- The current release workflow contract uses:
  - `site_base`
  - `site_url`
  - `canonical_branch`
  - `deployable_branches`
  - `target_branch` for single-branch deploy
- Branch-local docs runtime should prefer explicit configured values over reusable helper layers when the behavior is intentionally branch-specific.
- `docusaurus.config.js` in a docs branch may depend on the standalone Docusaurus adapter at [`release-policy/docusaurus.js`](./release-policy/docusaurus.js), but it must not import or depend on `release-policy` core deploy logic.
- The standalone Docusaurus adapter currently reads these runtime env variables:
  - `DOCS_VERSION`
  - `DOCS_DEFAULT_BRANCH`
  - `DOCS_BASE_URL`
  - `DOCS_SITE_BASE`
  - `DOCS_ROUTE_BASE_PATH`
  - `DOCS_VERSIONS`
  - `DOCS_SEARCH_ROUTE_BASE_PATH`
- `SITE_URL` is branch-local and should be consumed only by `docusaurus.config.js`, not by the standalone adapter.
- Keep the final top-level workflow set limited to:
  - [`ci.yml`](./.github/workflows/ci.yml)
  - [`publish-branch.yml`](./.github/workflows/publish-branch.yml)
  - [`republish-all.yml`](./.github/workflows/republish-all.yml)
- GitHub-specific runtime glue belongs in [`release-policy/github-actions`](./release-policy/github-actions).
- Manual operators should use:
  - `🚀 Deploy Selected Docs Branch` on the current default branch
  - `🚀 Deploy All Deployable Docs Branches` on the current default branch
