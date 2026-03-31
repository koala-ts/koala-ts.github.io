# Docs Repo Instructions

## Repository Scope

- The repository publishes the documentation site as one static site.
- The homepage is always served at `/`.
- Released documentation versions are served only under `/docs/<version>`.
- Documentation versions live in-repo under `docs/<version>`.
- Published versions are defined explicitly in `versioned-docs/versions.js`.
- Sidebar mode per version is defined in `versioned-docs/navigation/<version>.js`.
- The Docusaurus registry module lives in `versioned-docs/registry/registry.js`.
- Detailed documentation writing and editing rules live in `docs/AGENTS.md`.
- The rules in `docs/AGENTS.md` apply to published documentation under `docs/**`.
- The rules in `docs/AGENTS.md` also apply to homepage content published from `src/pages/index.tsx` and `src/components/landing/**`.
- The rules in `docs/AGENTS.md` do not apply to `README.md` unless explicitly requested.

## Routing Policy

- Keep the public URL contract consistent between local development and GitHub Pages publication.
- Treat `/` as the canonical homepage.
- Treat `/docs/<version>` as the canonical docs URL for every published version.
- Do not introduce a special unversioned docs route for the latest release.
- Keep migration or compatibility notes inside the version where they apply.
- Git branch names must not affect docs routing, search scope, or version ownership.

## Deployment Model

- The site is built once and deployed once to GitHub Pages.
- Version ownership must come only from `versioned-docs/versions.js` and the `docs/<version>` tree.
- Repository code outside `versioned-docs` should stay limited to configuration, content, workflow YAML, and runtime UI code.
- Keep the top-level workflow set limited to:
  - [`ci.yml`](./.github/workflows/ci.yml)
  - [`publish-site.yml`](./.github/workflows/publish-site.yml)

## Major Releases

- Add the new major release content under `docs/<version>`.
- Register the version in `versioned-docs/versions.js`.
- Add the corresponding navigation config in `versioned-docs/navigation/<version>.js`.
- Preserve the `/docs/<version>` route contract and do not introduce a special latest-docs route.
- Keep the homepage at `/` and update homepage content only when the published recommendation changes.
- Validate the full site after the version is added with the repository validation pipeline.

## Review Routing

- Review documentation-content PRs against `docs/AGENTS.md`.
- Review repository-wide, configuration, routing, deployment, and release-process PRs against this root `AGENTS.md`.
- If a PR mixes documentation content with repository-wide structural changes, evaluate each part against the corresponding instructions and challenge the scope if the PR becomes incoherent.

## Agent Roles

- The repository uses separate Author and Editor agents under `.github/agents/`.
- The Author agent is responsible for generating and restructuring documentation.
- The Editor agent is responsible for reviewing, editing, and refining documentation produced by others.
- Both agents should defer to this file for repository-wide rules and to `docs/AGENTS.md` for published-docs editorial rules.

## Code Review

- For documentation PRs, review for correctness, information source quality, flow, examples, FP-first alignment, and tone based on `docs/AGENTS.md`.
- For repository-wide changes, review for routing integrity, version ownership, deployment constraints, and release workflow correctness based on this file.
- Do not approve a PR that preserves bad documentation structure merely to keep the diff small.
- Do not approve a PR that violates the published route contract or version ownership model.
