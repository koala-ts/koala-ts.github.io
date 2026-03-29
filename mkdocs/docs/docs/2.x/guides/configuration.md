Koala uses [dotenv](https://www.npmjs.com/package/dotenv) to load environment files in a predictable order. The goal is
simple: configuration should feel obvious in the common path and explicit in the custom path.

## Environment files

Koala loads environment files in this order:

1. `.env`
2. `.env.local`
3. `.env.<environment>`
4. `.env.<environment>.local`

When `NODE_ENV` is `test`, Koala skips `.env.local` so test runs stay consistent across machines.

A fresh Koala application usually includes:

- `.env` for the default values needed by the app
- `.env.test` for test defaults

If you need to override values only on your machine, use a local file such as:

```dotenv
# .env.local
DATABASE_URL="mysql://root:@127.0.0.1:3306/my_database_name"
```

!!! caution

Do not commit `.env.local` files. They are meant for machine-specific overrides.


## Smallest setup

The smallest setup does not require any dotenv options:

```ts
loadEnvConfig(process.env.NODE_ENV ?? 'development');
```

That loads Koala's standard environment file sequence with the default dotenv behavior:

- `quiet: true`
- `override: true`

## Using the CLI skeleton

If you created your app with the Koala CLI, the generated skeleton already calls `loadEnvConfig()` for you.

In that setup, you do not need to call it again and you do not need to configure anything to get the default behavior.

## Manual setup

If you are wiring the application yourself instead of using the generated skeleton, call `loadEnvConfig()` before
creating the application:

```ts
import { create, loadEnvConfig, type KoalaConfig } from '@koala-ts/framework';

const config: KoalaConfig = {};

loadEnvConfig(process.env.NODE_ENV ?? 'development');

const app = create(config);
```

This is the same mechanism the CLI skeleton uses. The framework does not call `loadEnvConfig()` inside `create()`. The
difference is only who owns the bootstrap code.

## Customizing dotenv options

You can customize dotenv behavior through `config.environment.dotenv`.

Both `environment` and `environment.dotenv` are optional. If you omit them, Koala still loads the same environment
files with the default behavior shown above.

Koala intentionally supports a small, explicit subset:

- `encoding`
- `quiet`
- `debug`
- `override`

Example:

```ts
import { create, loadEnvConfig, type KoalaConfig } from '@koala-ts/framework';

const config: KoalaConfig = {
  environment: {
    dotenv: {
      debug: true,
      override: false,
    },
  },
};

loadEnvConfig(process.env.NODE_ENV ?? 'development', config.environment?.dotenv);

const app = create(config);
```

Koala manages environment file selection and load order itself. That is why options such as `path` are not part of the
supported config surface.

## Accessing values

Once the environment has been loaded, read values from `process.env`:

```ts
const port = process.env.PORT;
```

## Selecting the environment

Koala reads the current environment from `NODE_ENV`. If you are calling `loadEnvConfig()` yourself, use
`development` as the default when `NODE_ENV` is unset:

```ts
loadEnvConfig(process.env.NODE_ENV ?? 'development');
```

You can also set `NODE_ENV` directly in your scripts:

```json
{
  "scripts": {
    "start": "NODE_ENV=production node dist/index.js"
  }
}
```
