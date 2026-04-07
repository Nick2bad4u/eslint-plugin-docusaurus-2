# Contributing to eslint-plugin-docusaurus-2

Thanks for contributing.

This repository is building an ESLint plugin focused on Docusaurus sites, documentation repositories, and TypeDoc-integrated docs workflows.

## Core expectations

- do not add generic placeholder rules copied from other plugins
- keep rule docs hand-authored and specific
- preserve the Flat Config preset surface
- keep generated API output and authored docs separate
- prefer safe autofixes and explicit tests

## Local setup

```bash
npm install
npm run build
npm run typecheck
npm run test
npm run lint:all:fix:quiet
```

## Repository structure

- `src/` – plugin runtime and internal helpers
- `docs/rules/` – rule and preset reference docs
- `docs/docusaurus/` – documentation site app
- `test/` – Vitest and type-level coverage
- `scripts/` – sync and validation tooling

## Adding a new rule

When the first Docusaurus-specific rules are added, each rule should include:

1. a source module in `src/rules/`
2. public registration in `src/_internal/rules-registry.ts`
3. authored docs in `docs/rules/`
4. tests in `test/`
5. README and preset sync updates when relevant

## Documentation workflow

- update authored markdown first
- regenerate any derived tables with the sync scripts
- do not hand-edit generated API output under `docs/docusaurus/site-docs/developer/api/`

## Validation checklist

Before opening a PR, run:

```bash
npm run build
npm run typecheck
npm run test
npm run lint:all:fix:quiet
```

If you touched docs site structure, also run:

```bash
npm run docs:build
```
