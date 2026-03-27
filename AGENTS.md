# Docs Repo Instructions

## Version Strategy

- The current default branch owns the canonical homepage at `/` and the canonical docs at `/docs`.
- The actual default branch value is configured in `release-registry.json` on `gh-pages-control`, not in branch-local docs config.
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

- `gh-pages-control` owns release policy, registry data, and deploy scripts.
- `2.x` hosts the dispatchable bridge workflows required by GitHub Actions.
- Deployable docs branches must not become the source of truth for global release ownership.
- Branch-local scripts should stay limited to what is necessary for local development and branch builds.
- Manual operators should use:
  - `Deploy Selected Docs Branch` on `2.x`
  - `Deploy All Deployable Docs Branches` on `2.x`
