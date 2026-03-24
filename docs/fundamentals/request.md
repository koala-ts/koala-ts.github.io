---
title: Request
---

The `HttpScope` interface passed to a route handler provides access to the incoming request data.

## Input

### Request body and query parameters

The `request` object provides access to the request `body` and `query` parameters.

```typescript
import {Route} from '@koala-ts/framework/routing';
import type {HttpScope} from '@koala-ts/framework';

export const storeUser = Route({
  method: 'POST',
  path: '/users',
  handler: async ({request}: HttpScope) => {
    const {body, query} = request;
  },
});
```

### File uploads

If you need to allow file uploads on a specific route, you need to pass `multipart: true` in the route `options`.

```typescript
import {Route} from '@koala-ts/framework/routing';
import type {HttpScope, UploadedFile} from '@koala-ts/framework';

export const storeUser = Route({
  method: 'POST',
  path: '/users',
  options: {multipart: true},
  handler: async ({request}: HttpScope) => {
    // assuming `avatar` is the name of the file input
    const avatar = request.files?.avatar as unknown as UploadedFile;
  },
});
```

## Request details

### Request properties

The `request` object contains information about the incoming request, such as `path`, `host`, and `method`.

```typescript
export const storeUser = Route({
  method: 'POST',
  path: '/users',
  handler: async ({request}: HttpScope) => {
    const {path, host, method} = request;
  },
});
```

### Request Parameters

You can access the request parameters using the `params` property.

```typescript
export const showUser = Route({
  method: 'GET',
  path: '/users/:id',
  handler: async ({request}: HttpScope) => {
    const {params} = request;
    const userId = params.id;
  },
});
```

### Request headers

You can access the request headers using the `headers` property.

```typescript
export const storeUser = Route({
  method: 'POST',
  path: '/users',
  handler: async ({request}: HttpScope) => {
    const {headers} = request;
    const contentType = headers['content-type'];
  },
});
```
