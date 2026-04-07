---
title: Overview
description: Overview of eslint-plugin-docusaurus-2 and its preset surface.
---

# eslint-plugin-docusaurus-2

`eslint-plugin-docusaurus-2` is a future-ready ESLint plugin scaffold for Docusaurus sites, docs repositories, and documentation apps that mix content, React pages, and TypeDoc-generated API references.

## What this plugin is for

This repository is being built to enforce Docusaurus-specific best practices such as:

- safe conventions for docs-heavy Docusaurus codebases
- clear boundaries around generated TypeDoc output
- maintainable flat-config presets for documentation repositories
- rules and autofixes tailored to Docusaurus site structure rather than generic TypeScript utility libraries

## Current status

The runtime, docs site, tests, and preset infrastructure have been re-identified for `eslint-plugin-docusaurus-2`.

The first Docusaurus-specific rules are still being authored, so the plugin currently ships:

- a stable plugin namespace: `"docusaurus-2"`
- a documented flat-config preset surface
- TypeScript parser wiring inside each preset
- `projectService: true` for the typed presets

It does **not** ship rule modules yet.

That is intentional: an honest empty scaffold is better than carrying unrelated starter rules from another plugin template.

## Installation

```bash
npm install --save-dev eslint-plugin-docusaurus-2 typescript
```

## Quick start

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## Presets

| Preset | Purpose |
| --- | --- |
| [🟢 `docusaurus2.configs.minimal`](./presets/minimal.md) | Smallest baseline for future Docusaurus-specific linting. |
| [🟡 `docusaurus2.configs.recommended`](./presets/recommended.md) | Default preset for most documentation repositories. |
| [🟠 `docusaurus2.configs["recommended-type-checked"]`](./presets/recommended-type-checked.md) | Recommended plus typed parser setup for future type-aware rules. |
| [🔴 `docusaurus2.configs.strict`](./presets/strict.md) | Stricter adoption path for mature sites. |
| [🟣 `docusaurus2.configs.all`](./presets/all.md) | Every stable rule once the rule catalog grows. |
| [🧪 `docusaurus2.configs.experimental`](./presets/experimental.md) | Future experimental rules and rollout candidates. |

## Planned rule areas

The plugin is being shaped around Docusaurus-specific concerns instead of generic utility-library rules. Likely rule areas include:

- frontmatter and route metadata consistency
- Docusaurus config and sidebar hygiene
- generated-doc and TypeDoc boundary protection
- docs-site asset and link integrity
- patterns around `@docusaurus/*` packages and site contracts

## Next steps

- Read [Getting Started](./getting-started.md) for the preset setup flow.
- Browse the [Preset reference pages](./presets/index.md) to choose a rollout level.
- Use the Docusaurus site docs for maintainer-facing architecture guidance as the first rule set lands.
