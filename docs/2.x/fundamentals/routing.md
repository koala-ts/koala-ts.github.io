---
title: Routing
---

KoalaTs routing is function-first. You define routes as explicit values and register them through the application
configuration.

The preferred routing API lives in `@koala-ts/framework/routing`.

:::tip

KoalaTs is function-first by design. Routes are explicit values that can be composed, grouped, validated, and reused
without relying on controller discovery.

:::

## Defining Routes

Use `Route(...)` to declare a route as an exported value.

```typescript
import { Route } from '@koala-ts/framework/routing';
import type { HttpScope } from '@koala-ts/framework';

export const homeRoute = Route({
  method: 'GET',
  path: '/',
  handler: async (scope: HttpScope) => {
    scope.response.body = { ok: true };
  },
});
```

For simple routes, you can also use HTTP verb helpers:

```typescript
import { Get } from '@koala-ts/framework/routing';
import type { HttpScope } from '@koala-ts/framework';

export const homeRoute = Get('/', async (scope: HttpScope) => {
  scope.response.body = { ok: true };
});
```

Helpers are convenience wrappers for the common case:

- `Get`
- `Post`
- `Put`
- `Patch`
- `Delete`
- `Head`
- `Options`
- `Any`

Helpers support both:

```typescript
Get('/', handler);
Get('/', 'home.show', handler);
```

Use `Route(...)` when a route needs middleware, body parsing options, or multiple methods.

## Registering Routes

Register routes through the `routes` configuration key.

```typescript
import { type KoalaConfig } from '@koala-ts/framework';
import { homeRoute } from '../routes/home-route';

export const appConfig: KoalaConfig = {
  routes: [homeRoute],
};
```

Route groups can be registered in the same `routes` array. See [Grouping Routes](#grouping-routes).

```typescript
import { type KoalaConfig } from '@koala-ts/framework';
import { apiRoutes } from '../routes/api-routes';

export const appConfig: KoalaConfig = {
  routes: [apiRoutes],
};
```

This keeps routing explicit and avoids controller registration through configuration.

## Route Names

Routes may define a name to give them a stable identity.

Use `name` with the canonical `Route(...)` API:

```typescript
Route({
  name: 'users.list',
  method: 'GET',
  path: '/users',
  handler,
});
```

Or pass the name as the second argument to a verb helper:

```typescript
Get('/users', 'users.list', handler);
```

Route names are useful when a route needs an explicit identity beyond its method and path.

## Generate Paths From Route Names

Use `createPathFor(routes)` when application code needs a stable way to generate paths from named routes.

```typescript
import { Get, createPathFor } from '@koala-ts/framework/routing';

const routes = [
  Get('/users', 'users.list', listUsers),
  Get('/users/:id', 'users.show', showUser),
];

const pathFor = createPathFor(routes);

const usersPath = pathFor('users.list'); // '/users'
const userPath = pathFor('users.show', { id: '42' }); // '/users/42'
```

In that example:

- `usersPath` is `/users`
- `userPath` is `/users/42`

:::important

`createPathFor(...)` returns paths, not full URLs.

:::

It throws when:

- the route name does not exist in the provided routes
- a required path parameter is missing

The route names used with `pathFor(...)` depend on the exact `routes` value passed to `createPathFor(...)`.

For example, when a group adds a name prefix, the generated path uses the normalized name from that route source tree:

```typescript
import { Get, RouteGroup, createPathFor } from '@koala-ts/framework/routing';

const routes = [
  RouteGroup(
    {
      prefix: '/api',
      namePrefix: 'api.',
    },
    () => [
      Get('/users/:id', 'users.show', showUser),
    ],
  ),
];

const pathFor = createPathFor(routes);

const userPath = pathFor('api.users.show', { id: '42' }); // '/api/users/42'
```

In that example, `userPath` is `/api/users/42`.

## Matching HTTP Methods

The `method` property accepts either one HTTP method or an array of methods.

```typescript
Route({ method: 'GET', path: '/', handler });
Route({ method: ['GET', 'POST'], path: '/', handler });
```

To match all HTTP methods, use `ALL` or `ANY`.

```typescript
Route({ method: 'ALL', path: '/', handler });
Route({ method: 'ANY', path: '/', handler });
```

Or use the `Any(...)` helper for the common case:

```typescript
Any('/', handler);
```

## Route Parameters

Define route parameters by using `:` inside the route path.

```typescript
Route({
  method: 'GET',
  path: '/users/:id',
  handler: async (scope: HttpScope) => {
    const { id } = scope.request.params;

    scope.response.body = { id };
  },
});
```

## Middleware

Attach route middleware with the `middleware` property.

```typescript
import { Route } from '@koala-ts/framework/routing';
import type { HttpScope, NextMiddleware } from '@koala-ts/framework';

async function exampleMiddleware(scope: HttpScope, next: NextMiddleware): Promise<void> {
  scope.response.set('x-example', 'applied');
  await next();
}

export const homeRoute = Route({
  method: 'GET',
  path: '/',
  middleware: [exampleMiddleware],
  handler: async (scope: HttpScope) => {
    scope.response.body = { ok: true };
  },
});
```

## Route Options

Use `options` when a route needs body parsing behavior such as multipart handling.

```typescript
Route({
  method: 'POST',
  path: '/upload-avatar',
  options: { multipart: true },
  handler: async (scope: HttpScope) => {
    scope.response.body = { ok: true };
  },
});
```

You can also disable body parsing for routes that need access to the raw request body.

```typescript
Route({
  method: 'POST',
  path: '/raw-body',
  options: { parseBody: false },
  handler: async (scope: HttpScope) => {
    scope.response.body = { ok: true };
  },
});
```

## Grouping Routes

Use `RouteGroup(...)` when multiple routes share a path prefix, name prefix, middleware, or route-level configuration.

```typescript
import { Get, Post, RouteGroup } from '@koala-ts/framework/routing';
import type { HttpScope } from '@koala-ts/framework';

async function listPosts(scope: HttpScope): Promise<void> {
  scope.response.body = [{ id: 1 }];
}

async function createPost(scope: HttpScope): Promise<void> {
  scope.response.body = { ok: true };
}

export const postsRoutes = RouteGroup(
  {
    prefix: '/posts',
    namePrefix: 'posts.',
  },
  () => [
    Get('/', 'list', listPosts),
    Post('/', 'create', createPost),
  ],
);
```

`RouteGroup(...)` is callback-based on purpose. The callback is synchronous, takes no arguments, and returns route
sources.

In that example:

- every child route is mounted under `/posts`
- local route names like `list` and `create` become `posts.list` and `posts.create`

Those normalized names are also the ones used by `createPathFor(...)` when you pass this group as part of the route
source tree.

### Nested Groups

Groups can be nested to compose larger route trees.

```typescript
import { Get, RouteGroup } from '@koala-ts/framework/routing';

export const postsRoutes = RouteGroup(
  {
    prefix: '/posts',
    namePrefix: 'posts.',
  },
  () => [
    Get('/', 'list', handler),
  ],
);

export const apiRoutes = RouteGroup(
  {
    prefix: '/api',
    namePrefix: 'api.',
  },
  () => [postsRoutes],
);
```

The final route in that example is:

- path: `/api/posts`
- name: `api.posts.list`

## Group Route Config

Use `routeConfig` when grouped routes need extra middleware or route options without abandoning helper syntax.

Each `routeConfig` entry targets a route by its local name inside the current group.

```typescript
import { Post, RouteGroup } from '@koala-ts/framework/routing';

export const postsRoutes = RouteGroup(
  {
    prefix: '/posts',
    namePrefix: 'posts.',
    routeConfig: {
      create: {
        middleware: [validateCreatePostMiddleware],
        options: { parseBody: false },
      },
    },
  },
  () => [
    Post('/', 'create', createPost),
  ],
);
```

In that example:

- `create` matches the local route name declared inside the group
- the final route name is still `posts.create` because `namePrefix` is applied after local route configuration
- the `create` route gets both `validateCreatePostMiddleware` and `parseBody: false`

:::note

`routeConfig` matches only direct child routes by their local route name inside the current group.

:::

Important rules:

- `routeConfig` matches direct child routes by their local route name
- parent groups do not target nested child routes by local name
- `middleware` and `options` are the supported overlay fields in the current API

## Legacy Decorator Routing

:::warning Deprecated

Decorator-based controller routing from `@koala-ts/framework` is deprecated.

:::

Legacy surface:

- `Route` from `@koala-ts/framework`
- `controllers` in `KoalaConfig`
- `getRoutes` from `@koala-ts/framework`
- `registerRoutes` from `@koala-ts/framework`

Recommended path:

- `Route` from `@koala-ts/framework/routing`
- `routes` in `KoalaConfig`

## Routing Mode Rule

:::important

An application instance must choose exactly one routing style.

:::

An application instance must use exactly one routing style:

- legacy decorator routing with `controllers`
- function-first routing with `routes`

Mixing both in the same app or test agent is rejected.
