---
title: Routing
---

KoalaTs routing is function-first. You define routes as explicit values and register them through the application
configuration.

The preferred routing API lives in `@koala-ts/framework/routing`.

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

This keeps routing explicit and avoids controller registration through configuration.

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

An application instance must use exactly one routing style:

- legacy decorator routing with `controllers`
- function-first routing with `routes`

Mixing both in the same app or test agent is rejected.
