# KoalaTs Docs

This repository contains the KoalaTs documentation website.

The site is generated with Docusaurus and published as one static site. Released documentation versions live side by side in this repository under `docs/<version>`.

## Public URL contract

- `/` serves the shared homepage
- `/docs/1.x` serves the `1.x` documentation
- `/docs/2.x` serves the `2.x` documentation
- future releases follow `/docs/<version>`

`/docs` is a version selector entry point, not the canonical route for the latest version. The latest version is linked explicitly from the homepage and navbar.

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
