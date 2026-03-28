# Docs Repo Instructions

## Version Strategy

- The current default branch owns the canonical homepage at `/` and the canonical docs at `/docs`.
- The actual default branch value is configured in the repository-root `release-registry.json` on the current default branch, not in branch-local docs config.
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

- The current default branch owns release policy, registry data, deploy helpers, and the dispatchable workflows used by GitHub Actions.
- `release-registry.json` at the repository root is the authoritative release-policy data source.
- Deployable docs branches must not become the source of truth for global release ownership.
- Repository code outside `release-policy` should stay limited to configuration, content, workflow YAML, and release data.
- External consumers should go through [`release-policy/node.js`](./release-policy/node.js) or [`release-policy/browser.js`](./release-policy/browser.js), depending on the runtime they execute in.
- Runtime helpers must require explicit branch inputs; branch discovery belongs only in the current Docusaurus config/runtime entrypoint under `release-policy/docusaurus` or CI/workflow env injection.
- Manual operators should use:
  - `🚀 Deploy Selected Docs Branch` on the current default branch
  - `🚀 Deploy All Deployable Docs Branches` on the current default branch
