# KoalaTs Docs `1.x`

This branch contains the Docusaurus documentation site for KoalaTs `1.x`.

## Canonical URL contract

This branch is a non-default release branch.

- `/` is owned by the current default branch
- `/docs` is owned by the current default branch
- `/docs/next` is owned by `main`
- `/docs/1.x` is owned by this branch

Release ownership is centralized on the current default branch through the `release-policy` workflows and GitHub actions.

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

To simulate published routing from the centralized canonical-branch config, run with publish simulation inputs:

```bash
DOCS_RUNTIME_MODE=publish-simulation DOCS_DEFAULT_BRANCH=<current-default-branch> npm run start
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

Publication is centralized and this branch remains deployable.

The live deployment control plane is owned by the current default branch:

- the current default branch owns the release-policy module and deploy workflows
- this `1.x` branch owns only its versioned docs content and branch-local runtime/config

Current deployment state:

- canonical branch: `2.x`
- deployable branches: `1.x`, `2.x`, `main`

Manual operators should use these workflows on the current default branch:

- `🚀 Deploy Selected Docs Branch`
- `🚀 Deploy All Deployable Docs Branches`

That means `1.x` keeps its local preview and publish-simulation support, while the current default branch remains the only deployment control plane.
