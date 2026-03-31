# KoalaTs Docs

This repository contains the KoalaTs documentation website.

The site is generated with Docusaurus and published as one static site. Released documentation versions live side by side in this repository under `docs/<version>`.

## Public URL contract

- `/` serves the shared homepage
- `/docs/1.x` serves the `1.x` documentation
- `/docs/2.x` serves the `2.x` documentation
- future releases follow `/docs/<version>`

`/docs` is a version selector entry point, not the canonical route for the latest version. The latest version is linked explicitly from the homepage and navbar.

## Repository structure

```text
docs/
  1.x/
  2.x/
versioned-docs/
  versions.js
  registry/
    registry.js
  sidebars/
src/
.github/workflows/
```

- `docs/<version>` stores version-specific markdown content
- `versioned-docs/versions.js` is the single source of truth for published versions
- `versioned-docs/registry/registry.js` derives the Docusaurus configuration from `versioned-docs/versions.js`
- `versioned-docs/sidebars/*.js` defines each version sidebar independently
- `src/components/version-switcher` resolves cross-version navigation targets

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

## Search model

Search is scoped by version path.

- pages under `/docs/1.x/**` search only `1.x` content
- pages under `/docs/2.x/**` search only `2.x` content
- the homepage does not expose cross-version mixed search results

## Deployment model

The site is built once and deployed once to GitHub Pages.

- version ownership comes from `versioned-docs/versions.js`
- published content comes from `docs/<version>`
- the workflow model is limited to CI and single-site publication
