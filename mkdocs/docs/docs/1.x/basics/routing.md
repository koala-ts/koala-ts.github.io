# Routing

When your application receives a request, it calls a controller method to generate the response. The routing
configuration defines which action to run for each incoming URL.

## Defining Routes

Routes can be defined by adding the `@Route` decorator to a controller method. Due to the way decorators work in
TypeScript, you must also add the controller class to the `controllers` array in `config/app.ts`.

```typescript
// src/controller/HomeController.ts
import {type IScope, Route} from '@koala-ts/framework';

export class HomeController {
  @Route({method: 'GET', path: '/'})
  index(scope: IScope): void {
    scope.response.body = {ok: true};
  }
}
```

```typescript
// src/config/app.ts
import {type IKoalaConfig} from '@koala-ts/framework';
import {HomeController} from '../controller/HomeController';

export const appConfig: IKoalaConfig = {
  controllers: [HomeController],
};
```

In the example above, the `index` method of `HomeController` will be called when the application receives a `GET`
request to `/`.

## Matching HTTP Methods

The `method` property of the `@Route` decorator can be used to match specific HTTP methods. The value can be one of
the following methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS`, or `HEAD`.

You can also match multiple HTTP methods by passing an array of methods to the `method` property.

```typescript
@Route({method: 'GET', path: '/'})
@Route({method: ['GET', 'POST'], path: '/'})
```

And to match all HTTP methods, you can use the `ALL` or `ANY` method.

```typescript
@Route({method: 'ALL', path: '/'})
@Route({method: 'ANY', path: '/'})
```

## Route Parameters

You can define route parameters by adding a colon `:` followed by the parameter name in the `path` property of the
`@Route` decorator.

```typescript
@Route({method: 'GET', path: '/user/:id'})
```

Then you can access the parameter value in the controller method by using `scope.params`.

```typescript
const {id} = scope.params;
```

## Middleware

You can add multiple middleware functions to a route by passing an array of middleware functions to the `middleware`
property of the `@Route` decorator.

```typescript
// src/controller/HomeController.ts
export class HomeController {
  @Route({method: 'GET', path: '/', middleware: [exampleMiddleware]})
  index(scope: IScope): void {
    scope.response.body = {ok: true};
  }
}
```

Below is an example of a middleware function.

```typescript
// src/middleware/exampleMiddleware.ts
export async function exampleMiddleware(
  scope: IScope,
  next: INext,
): Promise<void> {
  console.log('Example middleware: Before controller');
  await next();
  console.log('Example middleware: After controller');
}
```
