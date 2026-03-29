<div class="landing-page">
  <div class="landing-container">
    <section class="landing-hero">
      <div class="landing-hero-grid">
        <div class="landing-hero-copy">
          <p class="landing-eyebrow">KoalaTS</p>
          <h1 class="landing-hero-title">Build robust Node.js backends without overthinking</h1>
          <p class="landing-hero-text">
            KoalaTS is a batteries-included framework that brings structure,
            scalability, and functional programming into real-world backend development.
          </p>
          <div class="landing-button-row">
            <a class="landing-button landing-button-primary" href="/docs/2.x/overview/intro/">Read the Docs</a>
            <a class="landing-button landing-button-secondary" href="/docs/2.x/getting-started/quick-start/">Get Started</a>
          </div>
        </div>
        <div class="landing-card landing-hero-card">
          <h2 class="landing-hero-card-title">Why teams reach for it</h2>
          <p class="landing-hero-card-text">
            KoalaTS gives backend projects a clear starting point: function-first routes,
            middleware for request flow, explicit request and response handling, and
            utilities like request scope storage when context needs to follow async work.
          </p>
          <ul class="landing-hero-card-list">
            <li>Clear entry points for HTTP and application code</li>
            <li>Practical defaults instead of repeated framework assembly</li>
            <li>Patterns that stay readable as features and teams grow</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="landing-section">
      <div class="landing-section-header">
        <p class="landing-eyebrow">Problem</p>
        <h2 class="landing-section-title">Node backends don’t scale well by default</h2>
      </div>
      <div class="landing-split-grid">
        <div class="landing-card">
          <ul class="landing-copy-list">
            <li>Projects become messy as they grow.</li>
            <li>Teams drift because there is no shared structure.</li>
            <li>Every new service starts with another round of library decisions.</li>
            <li>Functional programming sounds good, but applying it consistently is hard.</li>
          </ul>
        </div>
        <div class="landing-card">
          <p class="landing-section-description">
            Most Node backends work at first, then accumulate ad hoc structure.
            Each team solves routing, validation, state, and boundaries a little
            differently, which makes the code harder to reason about over time.
          </p>
        </div>
      </div>
    </section>

    <section class="landing-section">
      <div class="landing-section-header">
        <p class="landing-eyebrow">Idea</p>
        <h2 class="landing-section-title">A structured way to build backends</h2>
      </div>
      <div class="landing-split-grid">
        <div class="landing-card">
          <p class="landing-section-description">
            KoalaTS gives you a stable baseline built around explicit routes,
            middleware, request and response primitives, and predictable
            application structure. You spend less time inventing conventions
            and more time building backend behavior.
          </p>
        </div>
        <div class="landing-card">
          <ul class="landing-copy-list">
            <li>Clear architecture from day one.</li>
            <li>Built-in patterns that reduce incidental decisions.</li>
            <li>Practical functional programming without turning everything into theory.</li>
            <li>A workflow focused on shipping backend features, not rebuilding conventions.</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="landing-section">
      <div class="landing-section-header">
        <p class="landing-eyebrow">What You Get</p>
        <h2 class="landing-section-title">The pieces you need to keep moving</h2>
      </div>
      <div class="landing-feature-grid">
        <div class="landing-card">
          <h3 class="landing-feature-card-title">Batteries included</h3>
          <p class="landing-feature-card-text">Start with routing, middleware, request and response handling, and request-scoped context without stitching together a framework from scratch.</p>
        </div>
        <div class="landing-card">
          <h3 class="landing-feature-card-title">Functional-first approach</h3>
          <p class="landing-feature-card-text">Keep application logic in plain functions with explicit inputs and dependencies instead of hiding behavior behind implicit state.</p>
        </div>
        <div class="landing-card">
          <h3 class="landing-feature-card-title">Consistent structure</h3>
          <p class="landing-feature-card-text">Use the same route, middleware, and configuration patterns across services so teams can read and extend code without re-learning the project shape.</p>
        </div>
        <div class="landing-card">
          <h3 class="landing-feature-card-title">Scalable by design</h3>
          <p class="landing-feature-card-text">Grow from simple endpoints to larger modules while keeping HTTP concerns, application logic, and shared utilities understandable.</p>
        </div>
        <div class="landing-card">
          <h3 class="landing-feature-card-title">Focus on real backend problems</h3>
          <p class="landing-feature-card-text">Solve request flow, validation, context propagation, and service boundaries instead of spending that time debating libraries and wiring.</p>
        </div>
      </div>
    </section>

    <section class="landing-section">
      <div class="landing-section-header">
        <p class="landing-eyebrow">Examples</p>
        <h2 class="landing-section-title">A framework shape you can read quickly</h2>
        <p class="landing-section-description">
          KoalaTS keeps the surface area small: define routes explicitly and validate input with plain constraints that stay easy to read.
        </p>
      </div>
      <div class="landing-code-tabs">
        === "Routing"

            ```ts
            export const dashboardRoute = Get('/dashboard', async (scope) => {
              scope.response.body = {ok: true};
            });
            ```

        === "Validation"

            ```ts
            const constrains = {
              username: ['notBlank'],
              email: ['notBlank', 'email'],
            };
            ```
      </div>
    </section>

    <section class="landing-section">
      <div class="landing-section-header">
        <p class="landing-eyebrow">Architecture</p>
        <h2 class="landing-section-title">Designed with architecture in mind</h2>
      </div>
      <div class="landing-architecture-grid">
        <div class="landing-card">
          <p class="landing-section-description">
            KoalaTS is influenced by the same ideas that make larger systems maintainable:
            clear boundaries, explicit dependencies, and a separation between transport concerns
            and application behavior.
          </p>
          <ul class="landing-architecture-list">
            <li>Inspired by DDD and Clean Architecture without turning them into ceremony.</li>
            <li>Separation of concerns between HTTP handling, middleware, and application logic.</li>
            <li>Code that stays easier to discuss, review, and evolve as a system.</li>
          </ul>
        </div>
        <div class="landing-architecture-card-grid">
          <div class="landing-card">
            <h3 class="landing-feature-card-title">Application shape</h3>
            <p class="landing-feature-card-text">Function-first routes define HTTP entry points, middleware handles cross-cutting concerns, and the HTTP scope keeps request and response data explicit.</p>
          </div>
          <div class="landing-card">
            <h3 class="landing-feature-card-title">Why it matters</h3>
            <p class="landing-feature-card-text">That structure reduces accidental coupling and makes it easier to reason about behavior as the codebase and team both grow.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="landing-section">
      <div class="landing-section-header">
        <p class="landing-eyebrow">Getting Started</p>
        <h2 class="landing-section-title">Start small and keep the structure</h2>
      </div>
      <div class="landing-steps-grid">
        <div class="landing-card">
          <span class="landing-step-number">1</span>
          <h3 class="landing-step-title">Create the project</h3>
          <p class="landing-step-text">Generate a new application with <code>npx @koala-ts/cli create my-app</code> and start from the default structure.</p>
        </div>
        <div class="landing-card">
          <span class="landing-step-number">2</span>
          <h3 class="landing-step-title">Configure and run</h3>
          <p class="landing-step-text">Set your environment values, install dependencies, and start the server with the generated project scripts.</p>
        </div>
        <div class="landing-card">
          <span class="landing-step-number">3</span>
          <h3 class="landing-step-title">Add your first endpoint</h3>
          <p class="landing-step-text">Define a route, register it explicitly, and build from the documented basics for requests, responses, and middleware.</p>
        </div>
      </div>
    </section>

    <section class="landing-section landing-cta-section">
      <div class="landing-card landing-cta-card">
        <h2 class="landing-cta-title">Start building structured backends today</h2>
        <p class="landing-cta-text">
          Start with the documentation when you want the full model, or jump into the quick start and build your first structured endpoint right away.
        </p>
        <div class="landing-button-row">
          <a class="landing-button landing-button-primary" href="/docs/2.x/overview/intro/">Read the Docs</a>
          <a class="landing-button landing-button-secondary" href="/docs/2.x/getting-started/quick-start/">Try KoalaTS</a>
        </div>
      </div>
    </section>
  </div>
</div>
