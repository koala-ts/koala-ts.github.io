---
title: Quick Start
---

This is the shortest path to a running KoalaTs application.

## Create a project

Use the [KoalaTs CLI](https://www.npmjs.com/package/@koala-ts/cli) to generate a new project:

```bash
npx @koala-ts/cli create my-app
```

This command creates a new project in the `my-app` directory.

## Install and run

Move into the project, install dependencies, and start the server:

```bash
cd my-app
npm install
npm run start
```

## First endpoint

KoalaTs now prefers function-first route declarations through `@koala-ts/framework/routing`.

```ts
import { create, type HttpScope } from '@koala-ts/framework';
import { Route } from '@koala-ts/framework/routing';

const helloRoute = Route({
  method: 'GET',
  path: '/',
  handler: async (scope: HttpScope) => {
    scope.response.body = { message: 'Hello KoalaTs' };
  },
});

const app = create({
  routes: [helloRoute],
});

app.listen(3000);
```

## What to read next

- [Routing](../fundamentals/routing.md) to define your first endpoints
- [Request](../fundamentals/request.md) and [Response](../fundamentals/response.md) to understand the HTTP programming model
- [Configuration](../guides/configuration.md) when you need to tune the app for different environments
