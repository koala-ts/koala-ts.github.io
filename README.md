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

The default branch is configured in `release-registry.json` on `gh-pages-control`.

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

By default, local development uses local preview mode, so the checked out branch stays canonical locally and the docs are served at `/docs`.

To simulate published routing from the centralized release registry, use publish simulation mode:

```bash
DOCS_RUNTIME_MODE=publish-simulation DOCS_DEFAULT_BRANCH=<current-default-branch> npm run start
```

That keeps the current default branch canonical at `/docs`. For a non-default release branch such as `1.x`, publish simulation would serve the docs under `/docs/1.x`.

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

Docs publication is manual and controlled through bridge workflows on the current default branch.

The centralized registry and deploy scripts still live on `gh-pages-control`.
The dispatchable workflows on the current default branch load `release-registry.json` and the deploy scripts from `gh-pages-control`, then publish with these ownership rules:

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
- `🚀 Deploy All Deployable Docs Branches` republishes all deployable branches in registry order

Internal orchestration details such as `registry_json` stay hidden from manual workflow runs.

Missing deployable branches are skipped without failing a republish-all run.
