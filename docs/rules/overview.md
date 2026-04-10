---
title: Overview
description: Overview of eslint-plugin-docusaurus-2 and its preset surface.
---

# eslint-plugin-docusaurus-2

[`eslint-plugin-docusaurus-2`](https://www.npmjs.com/package/eslint-plugin-docusaurus-2) is an ESLint plugin for Docusaurus sites, docs repositories, and documentation apps that mix content, React pages, and TypeDoc-generated API references.

## What this plugin is for

This repository is being built to enforce Docusaurus-specific best practices such as:

- safe conventions for docs-heavy Docusaurus codebases
- clear boundaries around generated TypeDoc output
- maintainable flat-config presets for documentation repositories
- rules and autofixes tailored to Docusaurus site structure rather than generic TypeScript utility libraries

## Current status

The runtime, docs site, tests, and preset infrastructure have been re-identified for [`eslint-plugin-docusaurus-2`](https://www.npmjs.com/package/eslint-plugin-docusaurus-2).

The plugin now ships a stable namespace, a preset ladder, opt-in content configs, and a focused rule catalog that currently covers:

- config and `themeConfig` validation
- search, analytics, and package-ownership checks
- sidebar, i18n, and navigation integrity
- PWA, faster, and release-upgrade migration rules
- page-module and site-architecture rules in the broader tiers
- Markdown / MDX migration and content-aware rules through opt-in content configs

Use these source-of-truth docs instead of a hand-maintained full rule inventory here:

- [Preset matrix](./presets/index.md)
- [Config Surfaces](./guides/config-surfaces.md)

The rule catalog is still intentionally focused while the higher-value Docusaurus rule space is explored.

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

| Preset                                                             | Purpose                                                   |
| ------------------------------------------------------------------ | --------------------------------------------------------- |
| [🟢 `docusaurus2.configs.minimal`](./presets/minimal.md)           | Smallest baseline for future Docusaurus-specific linting. |
| [🟡 `docusaurus2.configs.recommended`](./presets/recommended.md)   | Default preset for most documentation repositories.       |
| [🔴 `docusaurus2.configs.strict`](./presets/strict.md)             | Stricter adoption path for mature sites.                  |
| [🟣 `docusaurus2.configs.all`](./presets/all.md)                   | Every stable rule once the rule catalog grows.            |
| [🧪 `docusaurus2.configs.experimental`](./presets/experimental.md) | Future experimental rules and rollout candidates.         |

The plugin also exports opt-in content configs outside the preset ladder:

| Config                                      | Purpose                                                     |
| ------------------------------------------- | ----------------------------------------------------------- |
| `docusaurus2.configs.content`               | Enable content-aware docs rules for `*.md` and `*.mdx`.     |
| `docusaurus2.configs["strict-mdx-upgrade"]` | Enable only the Docusaurus 3.10 strict-MDX migration rules. |

## Current rule areas

- Docusaurus config destination-prop conflict hygiene
- Docusaurus config link content-shape conflict hygiene
- Docusaurus config link minimal-schema hygiene
- Docusaurus explicit site-config field hygiene
- Docusaurus config typing and validation hygiene
- Docusaurus deprecated-config migration hygiene
- Docusaurus search-provider configuration hygiene
- Docusaurus search navigation and search-page route hygiene
- Docusaurus deprecated analytics migration hygiene
- Docusaurus faster/storage release-upgrade hygiene
- Docusaurus Mermaid and live-codeblock configuration hygiene
- Docusaurus classic-theme stylesheet-path hygiene
- Docusaurus configured-package ownership hygiene
- Docusaurus external link config-key hygiene
- Docusaurus social-card metadata redundancy hygiene
- Docusaurus themeConfig default social-image hygiene
- Docusaurus themeConfig metadata schema hygiene
- Docusaurus theme config link hygiene
- Docusaurus footer HTML pass-through schema hygiene
- Docusaurus footer column schema hygiene
- Docusaurus plugin-pwa debug/activation/head-tag hygiene
- Docusaurus plugin-pwa setup hygiene
- Docusaurus navbar dropdown schema hygiene
- Docusaurus navbar special-item schema hygiene and conflict cleanup
- Docusaurus Link component prop hygiene
- Docusaurus `useBaseUrl` link-wrapper hygiene
- Docusaurus mixed sidebar link-kind hygiene
- Docusaurus sidebar generated-index hygiene
- Docusaurus duplicate sidebar doc-association hygiene
- Docusaurus sidebar collapse-state hygiene
- Docusaurus sidebar category required-field hygiene
- Docusaurus sidebar typing hygiene
- Docusaurus sidebar doc-link schema hygiene
- Docusaurus page-module routing and default export hygiene
- Docusaurus pages-plugin include/exclude hygiene
- Docusaurus site-source CSS architecture hygiene
- Docusaurus Markdown and MDX migration/content hygiene

## Current rollout shape

- [`recommended`](./presets/recommended.md) carries the broadly applicable config and sidebar rules.
- [`strict`](./presets/strict.md), [`all`](./presets/all.md), and [`experimental`](./presets/experimental.md) add the stricter page-module and site-source CSS architecture rules.
- [`minimal`](./presets/minimal.md) stays intentionally empty so repositories can adopt the runtime and preset surface before enabling any bundled rules.

## Planned next areas

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

## TypeDoc pairing note

This plugin can enforce Docusaurus-side integration and configuration patterns around TypeDoc, but it is not trying to replace dedicated TypeDoc linting by itself.

If you want stricter TypeDoc-specific policy, pair it with [`eslint-plugin-typedoc`](https://www.npmjs.com/package/eslint-plugin-typedoc).
