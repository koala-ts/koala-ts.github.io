# Serving Static Files

KoalaTs includes built-in support for serving static files such as HTML, CSS, JavaScript, images, and other assets. This is useful for serving public files like client-side assets, documentation, or any files that don't require server-side processing.

## Configuration

By default, static files are served from the `public` directory in your project root. You can configure the static files options in your application configuration file.

```typescript
// src/config/app.ts
import { type KoalaConfig } from '@koala-ts/framework';

export const appConfig: KoalaConfig = {
  controllers: [
    // your controllers
  ],
  staticFiles: {
    root: 'public',       // Directory to serve static files from
    index: 'index.html',  // Default index file name
  },
};
```

## Default Behavior

If you don't specify the `staticFiles` configuration, KoalaTs will use these defaults:
- **Root directory**: `public`
- **Index file**: `index.html`

## How It Works

When a request is received, KoalaTs will first check if the requested path matches a static file in the configured root directory. If a file is found, it will be served directly. If no file is found, the request will continue to the routing system.

This means:
1. Static files take precedence over routes
2. If a file doesn't exist, your routes will handle the request
3. Index files (e.g., `index.html`) are automatically served for directory requests

## Directory Structure Example

Here's a typical project structure with static files:

```
my-app/
├── public/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── app.js
│   └── images/
│       └── logo.png
├── src/
│   ├── config/
│   │   └── app.ts
│   └── controller/
│       └── HomeController.ts
└── package.json
```

## Usage Examples

### Serving HTML Files

Create an HTML file in your public directory:

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Welcome</title>
</head>
<body>
    <h1>Welcome to KoalaTs!</h1>
</body>
</html>
```

Access it at: `http://localhost:3000/` or `http://localhost:3000/index.html`

### Serving CSS and JavaScript

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html>
<head>
    <title>My App</title>
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    <h1>Hello World</h1>
    <script src="/js/app.js"></script>
</body>
</html>
```

```css
/* public/css/styles.css */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
}
```

```javascript
// public/js/app.js
console.log('App loaded!');
```

### Serving Images

Place images in your public directory and reference them in your HTML:

```html
<img src="/images/logo.png" alt="Logo">
```

### Custom Root Directory

If you want to serve files from a different directory:

```typescript
// src/config/app.ts
export const appConfig: KoalaConfig = {
  controllers: [
    // your controllers
  ],
  staticFiles: {
    root: 'assets',      // Serve files from 'assets' directory
    index: 'index.html',
  },
};
```

### Custom Index File

You can change the default index file:

```typescript
// src/config/app.ts
export const appConfig: KoalaConfig = {
  controllers: [
    // your controllers
  ],
  staticFiles: {
    root: 'public',
    index: 'home.html',  // Use 'home.html' as the index file
  },
};
```

### Disabling Static Files

If you don't want to serve static files, simply omit the `staticFiles` configuration:

```typescript
// src/config/app.ts
export const appConfig: KoalaConfig = {
  controllers: [
    // your controllers
  ],
  // No staticFiles configuration
};
```

## Important Notes

- Static files are served before routing is processed
- If a static file exists at a path, it will be served instead of triggering a route
- The static file middleware handles proper content types automatically
- 404 errors for missing static files are passed to the routing system
- Directory traversal attacks are prevented automatically
