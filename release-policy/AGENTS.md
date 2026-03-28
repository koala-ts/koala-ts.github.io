# Release Policy Module Instructions

## Authority

- [`PLAN.md`](./PLAN.md) is the authoritative plan for all work inside this directory.
- [`WORKLOG.md`](./WORKLOG.md) is the execution log and incremental action plan for this directory.
- If code and `PLAN.md` disagree, treat that as a design issue and reconcile them intentionally.

## Boundaries

- [`core`](./core) is reserved for pure release-policy functions.
- [`docusaurus`](./docusaurus) is reserved for the Docusaurus adapter.
- [`github-pages`](./github-pages) is reserved for the GitHub Pages adapter.

## Drift Prevention

- Do not place Docusaurus-specific logic in `core`.
- Do not place GitHub Actions, shell, Git, or filesystem concerns in `core`.
- Do not duplicate release-policy rules across adapters.
- For each policy concept, keep one authoritative implementation in `core` and make other core functions consume it instead of re-deriving the same rule.
- Pass required policy inputs explicitly. Do not hide policy decisions behind implicit defaults unless the fallback is a deliberate domain rule.
- Do not add barrels in this module unless there is a documented justification.
- Every source code file in this module must have a colocated unit test file.
- Unit tests in this module must be isolated, must follow AAA, and must remain compatible with the CI test command.
- Do not add tests for barrels. Test behavior-bearing source files instead.
- Maintain existing tests when behavior changes. Update them when necessary instead of only appending new tests.
- Release branches in this module must follow `<number>.x`.
- Do not add implementation here that reintroduces a separate control branch model.
- Keep the current default branch as the target single source of truth for release policy and deployment orchestration.
- Keep [`../release-registry.json`](../release-registry.json) as the centralized release-policy data source.
- Treat any remaining `gh-pages-control` dependency as migration debt. Remove it rather than extending it.
- Keep shared system design, homepage ownership, navigation behavior, and deployment orchestration on the default branch.
- Limit a non-default docs branch to its versioned documentation and the minimum code needed for that version to run locally.
- Preserve the existing working publish model until the extraction plan is complete. Do not break current behavior in the name of cleanup.
- Keep the design compatible with a future major release branch taking over as the default branch and inheriting the same shared responsibilities.

## Incremental Delivery

- Preserve the incremental PR strategy recorded in [`WORKLOG.md`](./WORKLOG.md).
- Prefer moving one coherent responsibility at a time.
- Before creating a new PR branch, fetch the remote and create the branch from the latest state of the current default branch.
- Update [`WORKLOG.md`](./WORKLOG.md) when a PR changes status, scope, history, or next steps.
- Avoid mixing skeleton work, behavior moves, and workflow rewrites in the same PR unless the recorded work plan explicitly calls for it.
