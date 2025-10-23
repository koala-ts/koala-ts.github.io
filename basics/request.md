# Http Request

The `HttpScope` interface which is passed to the controller method provides access to the incoming request data.

## Input

### Request body and query parameters

The `request` object provides access to the request `body` and `query` parameters.

```typescript
export class UserController {
  @Route({method: 'POST', path: '/users'})
  store({request}: HttpScope) {
    const {body, query} = request;
  }
}
```

### File uploads

If you need to allow file uploads on a specific route, you need to pass `multipart: true` in the route `options`.

```typescript
export class UserController {
  @Route({method: 'POST', path: '/users', options: {multipart: true}})
  store({request}: HttpScope) {
    // assuming `avatar` is the name of the file input
    const avatar = scope.request.files?.avatar as unknown as UploadedFile;
  }
}
````

## Request details

### Request properties

The `request` object contains information about the incoming request, such as `path`, `host`, and `method`.

```typescript
export class UserController {
  @Route({method: 'POST', path: '/users'})
  store({request}: HttpScope) {
    const {path, host, method} = request;
  }
}
```

### Request Parameters

You can access the request parameters using the `params` property.

```typescript
export class UserController {
  @Route({method: 'GET', path: '/users/:id'})
  show({request}: HttpScope) {
    const {params} = request;
    const userId = params.id;
  }
}
```

### Request headers

You can access the request headers using the `headers` property.

```typescript
export class UserController {
  @Route({method: 'POST', path: '/users'})
  store({request}: HttpScope) {
    const {headers} = request;
    const contentType = headers['content-type'];
  }
}
```
