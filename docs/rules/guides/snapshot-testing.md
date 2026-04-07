# snapshot-testing

Guidance for snapshot testing in `eslint-plugin-docusaurus-2`.

## When snapshots make sense here

Use snapshots for repository-level generated surfaces that are hard to read as long inline strings, such as:

- README-generated rules sections
- preset matrix sections
- docs-site navigation output when the rendered structure matters more than one literal string

## When snapshots are the wrong tool

Do **not** use snapshots for rule autofix output.

For autofixes and suggestions, prefer explicit `output` strings in `RuleTester` cases so the behavior stays reviewable.

## Snapshot hygiene

- Keep snapshots small and intentional.
- Update snapshots only after reviewing the semantic change.
- Prefer deterministic ordering before snapshotting generated content.
- If a snapshot duplicates a short literal expectation, replace it with an inline assertion instead.
