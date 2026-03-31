---
title: Http Response
sidebar_position: 3
---

All controller methods should return a response. You can set response data using the `response` object of `IScope`.

## Response Body

The response `body` can be `string`, `Buffer`, `Stream`, `Object`, `Array`, `null`, or `undefined`.

```typescript
export class UserController {
  @Route({method: 'GET', path: '/users/:id'})
  show({response, params}: IScope) {
    const user = findUserById(params.id);
    response.body = user;
  }
}
```

## Response Status

By default, the response status is `404`. You can set the response status using the `status` property of `response`.

```typescript
export class UserController {
  @Route({method: 'GET', path: '/users/:id'})
  show({response, params}: IScope) {
    const user = findUserById(params.id);

    if (!user) {
      response.status = 404;
      response.body = {message: 'User not found'};
      return;
    }

    response.body = user;
  }
}
```

Since `response.status` defaults to `404`, sending a response without a body and with a different status is done like
this:

```typescript
scope.response.status = 204;
```

If `response.status` has not been set, the status will be set to `200` or `204` depending on `response.body`.
Specifically, if `response.body` has been set as `null` or `undefined`, the status will be set to `204`. Otherwise, it
will be set to `200`.

## Response Headers

There are two ways to set response headers:

```typescript
scope.response
  .setHeader('X-Header-One', 'Header Value')
  .setHeader('X-Header-Two', 'Header Value');

scope.response.withHeaders({
  'X-Header-One': 'Header Value',
  'X-Header-Two': 'Header Value',
});
```

As you have seen, both helpers are chainable.
