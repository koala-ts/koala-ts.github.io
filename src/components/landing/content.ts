export const problemPoints = [
  'Projects become messy as they grow.',
  'Teams drift because there is no shared structure.',
  'Every new service starts with another round of library decisions.',
  'Configuration and request flow get duplicated across projects.',
] as const;

export const ideaPoints = [
  'Controllers keep HTTP entry points explicit.',
  'Decorators describe routes where the behavior lives.',
  'Request and response handling stay easy to read.',
  'Configuration remains predictable across environments.',
] as const;

export const featureItems = [
  {
    title: 'Controller-driven routing',
    description:
      'Define routes directly on controller methods with decorators and register controllers explicitly in your application configuration.',
  },
  {
    title: 'Practical request handling',
    description:
      'Use the request scope to access params, query values, body data, files, and headers without inventing your own transport conventions.',
  },
  {
    title: 'Consistent structure',
    description:
      'Keep the same controller, routing, and configuration patterns across services so teams can read and extend code without re-learning the project shape.',
  },
  {
    title: 'Explicit responses',
    description:
      'Control status codes, body payloads, and headers through the response object in one predictable place.',
  },
] as const;

export const gettingStartedSteps = [
  {
    title: 'Create the project',
    body: 'Generate a new application with `npx @koala-ts/cli create my-app` and start from the default structure.',
  },
  {
    title: 'Configure and run',
    body: 'Set environment values, install dependencies, and start the generated application with the provided scripts.',
  },
  {
    title: 'Add your first endpoint',
    body: 'Add a controller method with `@Route`, register the controller in `config/app.ts`, and build from the request and response basics.',
  },
] as const;

export const architectureCards = [
  {
    title: 'Application shape',
    description:
      'Controllers define HTTP entry points, route decorators keep behavior discoverable, and the HTTP scope keeps request and response data explicit.',
  },
  {
    title: 'Why it matters',
    description:
      'That structure reduces accidental coupling and makes it easier to reason about behavior as the codebase and team both grow.',
  },
] as const;

export const codeTabs = [
  {
    label: 'Routing',
    language: 'ts',
    code: `export class HomeController {
  @Route({method: 'GET', path: '/'})
  index(scope: IScope): void {
    scope.response.body = {ok: true};
  }
}`,
  },
  {
    label: 'Configuration',
    language: 'ts',
    code: `// .env.local
DATABASE_URL="mysql://root:@127.0.0.1:3306/my_database_name"`,
  },
] as const;
