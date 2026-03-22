---
title: Serving Static Files
---

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
