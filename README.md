# KoalaTs Docs `1.x`

This branch contains the Docusaurus documentation site for KoalaTs `1.x`.

## Canonical URL contract

This branch is a non-default release branch.

- `/` is owned by the current default branch `2.x`
- `/docs` is owned by the current default branch `2.x`
- `/docs/next` is owned by `main`
- `/docs/1.x` is owned by this branch

## Local development

Requirements:

- Node.js 24.x
- npm 11.x

Install dependencies:

```bash
npm install
```

To run this branch locally with its published route shape, provide the branch override explicitly:

```bash
DOCS_CURRENT_BRANCH=1.x npm run start
```

That serves the docs under `/docs/1.x`.

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
