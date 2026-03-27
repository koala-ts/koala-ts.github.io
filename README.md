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

The default branch is configured in `docs-site.config.js`, and both local development and GitHub Pages publication resolve ownership from that same source of truth.

## Version publishing model

Only these branches are deployable:

- `main`
- `*.x` such as `1.x`, `2.x`, or `3.x`

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

By default, local development uses the configured default branch from `docs-site.config.js`, so the homepage is served at `/` and the docs are served at `/docs`.

To simulate another branch locally, override the branch inputs explicitly:

```bash
DOCS_CURRENT_BRANCH=main npm run start
```

That example keeps the homepage at `/` and serves the docs at `/docs/next`.

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

Docs publication is manual. Select the branch in GitHub's `Use workflow from` menu, then run `Deploy Docs` from that branch. Merging into `main` or `*.x` keeps the branch ready to publish, but does not update GitHub Pages until the workflow is run.

The deploy workflow resolves the default branch from `docs-site.config.js` and publishes with these ownership rules:

- `/` and `/docs` from the current default branch
- `/docs/next` from `main`
- `/docs/<version>` from non-default release branches
- `/docs/versions.json` for version navigation

When a branch is not the default branch, it publishes only its versioned docs subtree and does not overwrite the homepage.
