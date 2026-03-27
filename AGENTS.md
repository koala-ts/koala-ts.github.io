# Docs Repo Instructions

## Version Strategy

- The current default branch owns the canonical homepage at `/` and the canonical docs at `/docs`.
- The actual default branch value must be resolved from code-level runtime configuration, not hardcoded in policy text.
- `main` documents the upcoming next release published as `/docs/next`.
- Non-default release branches publish docs at `/docs/<version>`.

## Routing Documentation Policy

- Keep the public URL contract consistent between local development and GitHub Pages publication.
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
