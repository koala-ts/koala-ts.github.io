# KoalaTs Docs

This repository contains the documentation website for KoalaTs.

The site is generated with Docusaurus and published to GitHub Pages with branch-based version paths.

## Version publishing model

Only these branches are deployed:

- `main`
- `*.x` such as `1.x`, `2.x`, or `3.x`

Published paths:

- `main` -> `/docs/next`
- `1.x` -> `/docs/1.x`
- `2.x` -> `/docs/2.x`

Branches outside this policy are not deployed.

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

The deploy workflow updates:

- `/docs/<version>/` for the current branch build
- `/docs/versions.json` for version navigation
- root redirects to the default branch version
