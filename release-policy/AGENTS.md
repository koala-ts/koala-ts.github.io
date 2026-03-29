# Release Policy Module Instructions

## Authority

- [`PLAN.md`](./PLAN.md) is the authoritative plan for all work inside this directory.
- If code and `PLAN.md` disagree, treat that as a design issue and reconcile them intentionally.

## Boundaries

- The final long-term public API is intentionally undecided at this stage.
- The current repository-facing external entrypoint is [`node.js`](./node.js).
- [`core`](./core) is reserved for pure release-policy functions.
- [`github-pages`](./github-pages) is reserved for the GitHub Pages adapter.
- [`github-actions`](./github-actions) is reserved for GitHub Actions-specific wrappers and shared scripts that travel with the release-policy tree.
- Any other file under this module is private implementation detail unless it is explicitly listed above.

## Drift Prevention

- Do not place Docusaurus-specific logic in `core`.
- Do not place GitHub Actions, shell, Git, or filesystem concerns in `core`.
- Do not duplicate release-policy rules across adapters.
- For each policy concept, keep one authoritative implementation in `core` and make other core functions consume it instead of re-deriving the same rule.
- Treat versioned publish behavior as a single contract across `baseUrl`, `docsRouteBasePath`, and the publish target directory. Do not change one of them in isolation.
- For a non-default release build, asset and search paths must resolve from the versioned docs root rather than from the site root.
- Pass required policy inputs explicitly. Do not hide policy decisions behind implicit defaults unless the fallback is a deliberate domain rule.
- Do not add barrels in this module unless there is a documented justification.
- Transitional external entrypoint files may re-export behavior when they exist only to make current external dependencies explicit during extraction.
- Every source code file in this module must have a colocated unit test file.
- Unit tests in this module must be isolated, must follow AAA, and must remain compatible with the CI test command.
- Do not add tests for barrels. Test behavior-bearing source files instead.
- Maintain existing tests when behavior changes. Update them when necessary instead of only appending new tests.
- When changing runtime or deployment path policy, update existing tests and add regression coverage for both the default branch and at least one non-default versioned branch.
- Release branches in this module must follow `<number>.x`.
- Do not add implementation here that reintroduces a separate control branch model.
- Keep the current default branch as the target single source of truth for release policy and deployment orchestration.
- Prefer explicit workflow -> action -> JS inputs for release-policy configuration over filesystem config discovery.
- Keep deployment helpers and operator workflows on the current default branch. Do not reintroduce `gh-pages-control` or any similar control branch.
- Do not expose additional helpers under `core` or `github-pages` as repo-facing API unless the change explicitly documents a new transitional external entrypoint.
- Keep branch-local Docusaurus runtime behavior outside this module unless there is a deliberate architecture change.
- Keep `docusaurus.config.js` in docs branches completely unaware of this module.
- For GitHub release operations, prefer this explicit config contract:
  - `site_base`
  - `canonical_branch`
  - `deployable_branches`
  - `target_branch` for single-branch deploy
- Keep the final top-level workflow set limited to:
  - [`../.github/workflows/ci.yml`](../.github/workflows/ci.yml)
  - [`../.github/workflows/publish-branch.yml`](../.github/workflows/publish-branch.yml)
  - [`../.github/workflows/republish-all.yml`](../.github/workflows/republish-all.yml)
- Use local actions for GitHub runtime mechanics under:
  - [`github-actions/deploy-docs-branch`](./github-actions/deploy-docs-branch)
  - [`github-actions/redeploy-all-docs`](./github-actions/redeploy-all-docs)
- Keep workflow YAML thin. Put triggers, permissions, concurrency, and top-level wiring there; keep checkout/build/publish mechanics in local actions.
- Prefer migrating release workflows to documented external entrypoints and deleting repo-level wrapper scripts once they become redundant.
- Keep shared system design, homepage ownership, navigation behavior, and deployment orchestration on the default branch.
- Limit a non-default docs branch to its versioned documentation and the minimum code needed for that version to run locally.
- Keep repository code outside `release-policy` limited to configuration, content, and workflow YAML.
- Preserve the existing working publish model until the extraction plan is complete. Do not break current behavior in the name of cleanup.
- Keep the design compatible with a future major release branch taking over as the default branch and inheriting the same shared responsibilities.

## Incremental Delivery

- Prefer moving one coherent responsibility at a time.
- Before creating a new PR branch, fetch the remote and create the branch from the latest state of the current default branch.
- Avoid mixing skeleton work, behavior moves, and workflow rewrites in the same PR unless the recorded work plan explicitly calls for it.
- Treat `release-policy/github-actions` as the canonical location for GitHub-specific runtime glue unless the architecture plan intentionally changes.
