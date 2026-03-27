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

The actual default branch value must be provided by runtime configuration so local development and GitHub Pages publication resolve the same owner for `/` and `/docs`.

This contract is the target state for the repository. Implementation slices align local development and GitHub Pages publication with this model.

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

The deploy workflow target is:

- `/` and `/docs` from the current default branch
- `/docs/next` from `main`
- `/docs/<version>` from non-default release branches
- `/docs/versions.json` for version navigation
