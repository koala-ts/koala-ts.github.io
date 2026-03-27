# KoalaTs Docs `1.x`

This branch contains the Docusaurus documentation site for KoalaTs `1.x`.

## Canonical URL contract

This branch is a non-default release branch.

- `/` is owned by the current default branch `2.x`
- `/docs` is owned by the current default branch `2.x`
- `/docs/next` is owned by `main`
- `/docs/1.x` is owned by this branch

Release ownership is centralized on the `gh-pages-control` branch in `release-registry.json`.

## Local development

Requirements:

- Node.js 24.x
- npm 11.x

Install dependencies:

```bash
npm install
```

Run this branch locally in local preview mode:

```bash
npm run start
```

That keeps the checked out branch canonical locally and serves the docs under `/docs`.

To simulate published routing from the centralized release registry, run with publish simulation inputs:

```bash
DOCS_RUNTIME_MODE=publish-simulation DOCS_DEFAULT_BRANCH=2.x npm run start
```

That serves this branch under `/docs/1.x`.

Run validation:

```bash
npm run validate
```

## Content structure

The `1.x` docs preserve the legacy content taxonomy inside Docusaurus:

- `docs/overview/intro.md`
- `docs/get-started/configuration.md`
- `docs/basics/routing.md`
- `docs/basics/request.md`
- `docs/basics/response.md`

## Publication

Publication is centralized and this branch is deployable again.

The live deployment control plane is split like this:

- `gh-pages-control` owns `release-registry.json` and the deploy scripts
- `2.x` hosts the dispatchable bridge workflows required by GitHub Actions

Current registry state:

- deployable branches: `1.x`, `2.x`, `main`
- default branch: `2.x`

Manual operators should use these workflows on `2.x`:

- `🚀 Deploy Selected Docs Branch`
- `🚀 Deploy All Deployable Docs Branches`

That means `1.x` keeps its local preview and publish-simulation support, and it can be published again through the centralized deployment model.
