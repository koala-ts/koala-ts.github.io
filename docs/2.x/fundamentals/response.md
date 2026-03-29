---
title: Response
---

All routes should return a response. You can set the response data using the `response` object of the `HttpScope`
interface.

## Response Body

The response `body` can be `string`, `Buffer`, `Stream`, `Object`, `Array`, `null`, or `undefined`.

```typescript
import {Route} from '@koala-ts/framework/routing';
import type {HttpScope} from '@koala-ts/framework';

export const showUser = Route({
  method: 'GET',
  path: '/users/:id',
  handler: async ({response, request}: HttpScope) => {
    // Find user by id
    const user = findUserById(request.params.id);

    // Set response body
    response.body = user;
  },
});
```

## Response Status

By default, the response status is `404`. You can set the response status using the `status` property of the `response`

```typescript
export const showUser = Route({
  method: 'GET',
  path: '/users/:id',
  handler: async ({response, request}: HttpScope) => {
    // Find user by id
    const user = findUserById(request.params.id);

    // If user not found
    if (!user) {
      response.status = 404;
      response.body = {message: 'User not found'};
      return;
    }

    // This will automatically set the status to 200
    response.body = user;
  },
});
```

Since `response.status` default is set to 404, to send a response without a body and with a different status is to be
done like this:

```typescript
scope.response.status = 204; // Or any other status code
```

If `response.status` has not been set, The status will be set to `200` or `204` depending on `response.body`.
Specifically, if `response.body` has been set as `null` or `undefined`, the status will be set to `204`. Otherwise, it
will be set to `200`.

## Response Headers

There are two ways to set response headers:

```typescript
// using response.SetHeader for single header per call
scope.response.setHeader('X-Header-One', 'Header Value').setHeader('X-Header-Two', 'Header Value');

// using response.withHeaders to set multiple headers
scope.response.withHeaders({
  'X-Header-One': 'Header Value',
  'X-Header-Two': 'Header Value'
});
```

As you have seen, both helpers are chainable.
