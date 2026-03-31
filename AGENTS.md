# Docs Repo Instructions

## Version Strategy

- The repository publishes the documentation site as one static site.
- The homepage is always served at `/`.
- Released documentation versions are served only under `/docs/<version>`.
- Documentation versions live in-repo under `docs/<version>`.
- Published versions are defined explicitly in `versioned-docs/versions.js`.
- The Docusaurus registry module lives in `versioned-docs/registry/registry.js`.

## Routing Documentation Policy

- Keep the public URL contract consistent between local development and GitHub Pages publication.
- Treat `/` as the canonical homepage.
- Treat `/docs/<version>` as the canonical docs URL for every published version.
- Do not introduce a special unversioned docs route for the latest release.
- `2.x` may document deprecated compatibility paths when they still exist in the framework.
- Keep migration or compatibility notes inside the version where they apply.

## Writing Rules

- Prefer the current recommended API in all primary examples.
- Keep migration guidance in the versioned docs subtree where it applies.
- Avoid mixing deprecated and recommended APIs in the same example unless the page is explicitly about migration.

## Deployment Model

- The site is built once and deployed once to GitHub Pages.
- Git branch names must not affect docs routing, search scope, or version ownership.
- Version ownership must come only from `versioned-docs/versions.js` and the `docs/<version>` tree.
- Repository code outside `versioned-docs` should stay limited to configuration, content, workflow YAML, and runtime UI code.
- Keep the top-level workflow set limited to:
  - [`ci.yml`](./.github/workflows/ci.yml)
  - [`publish-site.yml`](./.github/workflows/publish-site.yml)
