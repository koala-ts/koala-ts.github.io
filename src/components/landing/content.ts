export const problemPoints = [
  'Projects become messy as they grow.',
  'Teams drift because there is no shared structure.',
  'Every new service starts with another round of library decisions.',
  'Functional programming sounds good, but applying it consistently is hard.',
] as const;

export const ideaPoints = [
  'Clear architecture from day one.',
  'Built-in patterns that reduce incidental decisions.',
  'Practical functional programming without turning everything into theory.',
  'A workflow focused on shipping backend features, not rebuilding conventions.',
] as const;

export const featureItems = [
  {
    title: 'Batteries included',
    description:
      'Start with routing, middleware, request and response handling, and request-scoped context without stitching together a framework from scratch.',
  },
  {
    title: 'Functional-first approach',
    description:
      'Keep application logic in plain functions with explicit inputs and dependencies instead of hiding behavior behind implicit state.',
  },
  {
    title: 'Consistent structure',
    description:
      'Use the same controller and configuration patterns across services so teams can read and extend code without re-learning the project shape.',
  },
  {
    title: 'Scalable by design',
    description:
      'Grow from simple endpoints to larger modules while keeping HTTP concerns, application logic, and shared utilities understandable.',
  },
  {
    title: 'Focus on real backend problems',
    description:
      'Solve request flow, validation, context propagation, and service boundaries instead of spending that time debating libraries and wiring.',
  },
] as const;

export const gettingStartedSteps = [
  {
    title: 'Create the project',
    body: 'Generate a new application with `npx @koala-ts/cli create my-app` and start from the default structure.',
  },
  {
    title: 'Configure and run',
    body: 'Set your environment values, install dependencies, and start the server with the generated project scripts.',
  },
  {
    title: 'Add your first endpoint',
    body: 'Define a controller, register routes, and build from the documented basics for requests, responses, and middleware.',
  },
] as const;

export const architectureCards = [
  {
    title: 'Application shape',
    description:
      'Controllers define HTTP entry points, middleware handles cross-cutting concerns, and the HTTP scope keeps request and response data explicit.',
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
    code: `export class DashboardController {
  @Route({method: 'GET', path: '/dashboard'})
  show() {}
}`,
  },
  {
    label: 'Validation',
    language: 'ts',
    code: `const constrains = {
  username: ['notBlank'],
  email: ['notBlank', 'email'],
};`,
  },
] as const;
