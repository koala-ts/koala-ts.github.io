# Request Scope Store

The Request Scope Store is a utility that helps manage and propagate context-specific data (such as user information, request IDs, or feature flags) across asynchronous operations without manual parameter passing.

In complex systems, this utility ensures that each request or logical operation maintains its own isolated state, preventing data leaks and simplifying access to context throughout the application lifecycle.

## Why Use Request Scope Store?

- **Context Propagation:** Automatically propagates state across async calls without manual passing.
- **Type Safety:** Enforces state shape via TypeScript generics.
- **Isolation:** Each scope (e.g., HTTP request) gets its own state, preventing data leaks.
- **Functional API:** Encourages immutability and functional programming practices.

## Use Cases

The Request Scope Store is particularly useful for:

- Tracking authenticated user data across middleware and handlers
- Propagating correlation or trace IDs for logging and monitoring
- Managing per-request feature toggles or configuration
- Ensuring data consistency in multi-tenant or multi-user environments

## Creating a Store

You can create a request scope store by using the `createStore` function and defining the shape of your store using TypeScript generics.

```typescript
import { createStore } from '@koala-ts/framework';

type RequestScope = {
  userId: string;
  requestId: string;
};

const requestScopeStore = createStore<RequestScope>();
```

## API Reference

### `run(initialState, callback)`

Initializes a new scope with the given state and runs the callback within that context.

```typescript
requestScopeStore.run({ userId: 'anonymous', requestId: 'req-123' }, () => {
  // Your code runs within this scope
  console.log(requestScopeStore.get('userId')); // 'anonymous'
});
```

### `set(key, value)`

Updates a value in the current scope.

```typescript
requestScopeStore.set('userId', 'user-42');
```

### `get(key)`

Retrieves a value from the current scope.

```typescript
const userId = requestScopeStore.get('userId');
const requestId = requestScopeStore.get('requestId');
```

### `all()`

Returns the entire current scope state.

```typescript
const scope = requestScopeStore.all();
console.log(scope); // { userId: 'user-42', requestId: 'req-123' }
```

### `has(key)`

Checks if a specific key exists in the current scope.

```typescript
if (requestScopeStore.has('userId')) {
  const userId = requestScopeStore.get('userId');
}
```

## Usage Example

Here's a complete example of how to use the Request Scope Store in your application:

```typescript
import { createStore, type HttpScope, Route } from '@koala-ts/framework';

type RequestScope = {
  userId: string;
  requestId: string;
};

const requestScopeStore = createStore<RequestScope>();

export class UserController {
  @Route({method: 'GET', path: '/users/:id'})
  show({request}: HttpScope) {
    // Initialize the scope with default values
    requestScopeStore.run({ userId: 'anonymous', requestId: 'req-123' }, () => {
      // Set userId after authentication
      requestScopeStore.set('userId', request.params.id);

      // Access anywhere in the same async context
      const userId = requestScopeStore.get('userId');
      const requestId = requestScopeStore.get('requestId');

      // Get the whole state
      const scope = requestScopeStore.all();

      // Use the data in your business logic
      console.log(`Processing request ${requestId} for user ${userId}`);
    });
  }
}
```

## With Middleware

You can also use the Request Scope Store in middleware to set up context that will be available to all subsequent handlers:

```typescript
import { createStore, type HttpScope, type NextMiddleware } from '@koala-ts/framework';

type RequestScope = {
  userId: string;
  requestId: string;
  timestamp: number;
};

const requestScopeStore = createStore<RequestScope>();

export async function requestContextMiddleware(scope: HttpScope, next: NextMiddleware): Promise<void> {
  const requestId = scope.request.headers['x-request-id'] || generateRequestId();
  
  await requestScopeStore.run(
    { 
      userId: 'anonymous', 
      requestId, 
      timestamp: Date.now() 
    }, 
    async () => {
      await next();
    }
  );
}
```

Then in your controller, you can access the data set by the middleware:

```typescript
export class UserController {
  @Route({method: 'GET', path: '/profile', middleware: [requestContextMiddleware]})
  profile({request}: HttpScope) {
    // Access the request context set by the middleware
    const requestId = requestScopeStore.get('requestId');
    const timestamp = requestScopeStore.get('timestamp');
    
    console.log(`Request ${requestId} started at ${timestamp}`);
  }
}
```
