# Configuration

Applications often need to be configured to run in different environments. For example, you might want to use a
different database in development than in production.

Thanks to [dotenv](https://www.npmjs.com/package/dotenv), **KoalaTs** provides a practical way to manage application
configuration.

## Environment files

A fresh KoalaTs application contains a `.env` file in the root of your project. This file contains the default values
needed to run your application. It also comes with a `.env.test` file that contains the default values for your tests.

## Accessing configuration values

You can access configuration values using the `process.env` object. For example, to access the `PORT` value, you can
use the following code:

```typescript
const port = process.env.PORT;
```

## Overriding configuration values

If you need to override an environment value, you can do that in a `.env.local` file:

```dotenv
DATABASE_URL="mysql://root:@127.0.0.1:3306/my_database_name"
```

:::caution
The `.env.local` file should not be committed to your repository. It is meant to be used for local development only.
:::

Several other `.env` files are available to set environment variables in the right situation:

- `.env`: defines the default values of the env vars needed by the application
- `.env.local`: overrides the default values for all environments but only on the machine which contains the file
- `.env.<environment>` such as `.env.test`: overrides env vars only for one environment but for all machines
- `.env.<environment>.local` such as `.env.test.local`: defines machine-specific env var overrides only for one environment

## Selecting the environment

The environment is selected by the `NODE_ENV` environment variable. If you do not set it, the default value is
`development`. You can set it before running your application:

```bash
NODE_ENV=production npm start
```

Or in your `package.json` scripts:

```json
{
  "scripts": {
    "start": "NODE_ENV=production node dist/index.js"
  }
}
```
