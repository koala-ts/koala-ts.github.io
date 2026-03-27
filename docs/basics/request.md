# Http Request

The `IScope` interface that is passed to a controller method provides access to the incoming request data.

## Input

### Request body and query parameters

The `request` object provides access to the request `body` and `query` parameters.

```typescript
export class UserController {
  @Route({method: 'POST', path: '/users'})
  store({request}: IScope) {
    const {body, query} = request;
  }
}
```

### File uploads

If you need to allow file uploads on a specific route, pass `multipart: true` in the route `options`.

```typescript
export class UserController {
  @Route({method: 'POST', path: '/users', options: {multipart: true}})
  store(scope: IScope) {
    const avatar = scope.request.files?.avatar as unknown as IUploadedFile;
  }
}
```

## Request details

### Request properties

The `request` object contains information about the incoming request, such as `path`, `host`, and `method`.

```typescript
export class UserController {
  @Route({method: 'POST', path: '/users'})
  store({request}: IScope) {
    const {path, host, method} = request;
  }
}
```

### Request parameters

You can access request parameters using the `params` property.

```typescript
export class UserController {
  @Route({method: 'GET', path: '/users/:id'})
  show({request}: IScope) {
    const {params} = request;
    const userId = params.id;
  }
}
```

### Request headers

You can access request headers using the `headers` property.

```typescript
export class UserController {
  @Route({method: 'POST', path: '/users'})
  store({request}: IScope) {
    const {headers} = request;
    const contentType = headers['content-type'];
  }
}
```
