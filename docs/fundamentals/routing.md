---
title: Routing
---

When your application receives a request, it calls a controller method to generate the response. The routing
configuration defines which action to run for each incoming URL.

## Defining Routes

Routes can be defined by adding the `@Route` decorator to a controller method. Due to the way decorators work in
TypeScript, you must also add the Controller class to the `controllers` array in the `config/app.ts` file.

```typescript
// src/controller/HomeController.ts
import { type HttpScope, Route } from '@koala-ts/framework';

export class HomeController {
  @Route({method: 'GET', path: '/'})
  index(scope: HttpScope): void {

  }
}

```

```typescript
// src/config/app.ts
import { HomeController } from '../controller/HomeController';
import { type KoalaConfig } from '@koala-ts/framework';

export const appConfig: KoalaConfig = {
  controllers: [
    HomeController,
  ]
};
```

In the example above, the `index` method of the `HomeController` class will be called when the application receives a
`GET` request to the `/` URL.

## Matching HTTP Methods

The `method` property of the `@Route` decorator can be used to match specific HTTP methods. The value can be
one of the following methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS`, or `HEAD`.

You can also match multiple HTTP methods by passing an array of methods to the `method` property.

```typescript
@Route({method: 'GET', path: '/'}) // Matches only GET requests
@Route({method: ['GET', 'POST'], path: '/'}) // Matches both GET and POST requests
```

And to match all HTTP methods, you can use the `ALL` or `ANY` method.

```typescript
@Route({method: 'ALL', path: '/'}) // Matches all HTTP methods
@Route({method: 'ANY', path: '/'}) // Matches all HTTP methods
```

## Route Parameters

You can define route parameters by adding a colon `:` followed by the parameter name in the `path` property of the
`@Route` decorator.

```typescript
@Route({method: 'GET', path: '/user/:id'})
```

Then you can access the parameter value in the controller method by using the `scope.params` object.

```typescript
const {id} = scope.params;
```

## Middleware

You can add multiple middleware functions to a route by passing an array of middleware functions to the `middleware` of
the `@Route` decorator.

```typescript
// src/controller/HomeController.ts
export class HomeController {
  @Route({method: 'GET', path: '/', middleware: [exampleMiddleware]})
  index(scope: HttpScope): void {

  }
}
```

Below is an example of a middleware function.

```typescript
// src/middleware/exampleMiddleware.ts
export async function exampleMiddleware(scope: HttpScope, next: NextMiddleware): Promise<void> {
  console.log('Example middleware: Before controller');
  await next();
  console.log('Example middleware: After controller');
}
```
