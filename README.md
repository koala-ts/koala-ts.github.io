# KoalaTs Docs

This repository contains the documentation website for KoalaTs.

The site is generated with Docusaurus and published to GitHub Pages with branch-based version paths.

## Canonical URL contract

The repository targets this public URL model:

- `/` serves the homepage from the current default branch.
- `/docs` serves the documentation from the current default branch.
- `/docs/next` serves the documentation published from `main`.
- `/docs/<version>` serves the documentation published from a non-default release branch such as `1.x` or `2.x`.

Only one branch owns `/` and `/docs` at a time: the current default branch.

The canonical branch is currently provided to release actions through workflow configuration.

## Version publishing model

Only these branches are deployable:

- `main`
- `<number>.x` such as `1.x`, `2.x`, or `3.x`

Published paths:

- the current default branch -> `/` and `/docs`
- `main` -> `/docs/next`
- any non-default `*.x` branch -> `/docs/<version>`

Branches outside this policy cannot be published.

A version selector in the navbar is generated from `docs/versions.json` on the `gh-pages` branch.

## Local development

Requirements:

- Node.js 24.x
- npm 11.x

Install dependencies:

```bash
npm install
```

Run the docs locally:

```bash
npm run start
```

Local development defaults the checked out branch to the canonical branch locally, so the docs are served at `/docs`.

To simulate published routing from an injected canonical branch, set only the canonical branch explicitly:

```bash
DOCS_DEFAULT_BRANCH=<current-default-branch> npm run start
```

That keeps the injected default branch canonical at `/docs`. For a non-default release branch such as `1.x`, publish simulation would serve the docs under `/docs/1.x`.

Branch-local docs runtime behavior now lives explicitly in the branch Docusaurus config and browser components. In the current branch shape, `docusaurus.config.js` may use the standalone Docusaurus adapter at [`release-policy/docusaurus.js`](./release-policy/docusaurus.js), but it must not depend on `release-policy` core deploy logic. Release-policy core remains the deployment control plane on the current default branch.

Build static files:

```bash
npm run build
```

Run validation:

```bash
npm run validate
```

## GitHub Pages setup

Set GitHub Pages source to the `gh-pages` branch root.

Docs publication is manual and controlled through operator workflows on the current default branch.

The current default branch owns the `release-policy` module and the dispatchable workflows. Those workflows publish with these ownership rules:

- `/` and `/docs` from the current default branch
- `/docs/next` from `main`
- `/docs/<version>` from non-default release branches
- `/docs/versions.json` for version navigation

When a branch is not the default branch, it publishes only its versioned docs subtree and does not overwrite the homepage.

Current deployment state:

- current default branch: `2.x`
- current deployable branches: `1.x`, `2.x`, `main`

Available operator workflows on the current default branch:

- `🚀 Deploy Selected Docs Branch` publishes the selected workflow branch with no manual inputs
- `🚀 Deploy All Deployable Docs Branches` republishes all configured deployable branches in order

Internal orchestration details such as the normalized release-policy payload stay hidden from manual workflow runs.

The target workflow structure keeps only these top-level workflows:

- [`ci.yml`](./.github/workflows/ci.yml)
- [`publish-branch.yml`](./.github/workflows/publish-branch.yml)
- [`republish-all.yml`](./.github/workflows/republish-all.yml)

GitHub-specific runtime glue lives under [`release-policy/github-actions`](./release-policy/github-actions), while release-policy computation stays in [`release-policy/node.js`](./release-policy/node.js).

The workflow-to-action release-policy contract currently passes:

- `site_base`
- `site_url`
- `canonical_branch`
- `deployable_branches`
- `target_branch` for single-branch deploy

## Runtime env variables

The current branch uses two distinct env-variable surfaces.

Workflow and action inputs:

- `site_base`
- `site_url`
- `canonical_branch`
- `deployable_branches`
- `target_branch` for single-branch deploy

Docusaurus runtime env variables used by the standalone adapter in [`release-policy/docusaurus.js`](./release-policy/docusaurus.js):

- `DOCS_VERSION`
  - current version slug for the build
- `DOCS_DEFAULT_BRANCH`
  - canonical branch name used to distinguish default-branch vs non-default docs behavior
- `DOCS_BASE_URL`
  - final Docusaurus `baseUrl`
- `DOCS_SITE_BASE`
  - canonical site base used by version-switching URLs and shared manifest lookup
- `DOCS_ROUTE_BASE_PATH`
  - final docs route base path
- `DOCS_VERSIONS`
  - ordered versions list for the version switcher
- `DOCS_SEARCH_ROUTE_BASE_PATH`
  - docs route base path used by the local search plugin

`SITE_URL` is intentionally branch-local. It is read only in [`docusaurus.config.js`](./docusaurus.config.js), injected from workflows during deploy builds, and not consumed by the standalone adapter or browser custom fields.

Missing deployable branches are skipped without failing a republish-all run.

The repository no longer uses or depends on a separate control branch for release policy or deployment scripts.
The current workflow entrypoint is [`release-policy/node.js`](./release-policy/node.js). Repository code outside `release-policy` should stay limited to configuration, content, workflow YAML, and the minimum explicit branch-local docs runtime needed for local builds.
