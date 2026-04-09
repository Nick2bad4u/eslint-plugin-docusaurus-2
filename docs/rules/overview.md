---
title: Overview
description: Overview of eslint-plugin-docusaurus-2 and its preset surface.
---

# eslint-plugin-docusaurus-2

`eslint-plugin-docusaurus-2` is an ESLint plugin for Docusaurus sites, docs repositories, and documentation apps that mix content, React pages, and TypeDoc-generated API references.

## What this plugin is for

This repository is being built to enforce Docusaurus-specific best practices such as:

- safe conventions for docs-heavy Docusaurus codebases
- clear boundaries around generated TypeDoc output
- maintainable flat-config presets for documentation repositories
- rules and autofixes tailored to Docusaurus site structure rather than generic TypeScript utility libraries

## Current status

The runtime, docs site, tests, and preset infrastructure have been re-identified for `eslint-plugin-docusaurus-2`.

The plugin now ships Docusaurus-specific rules across config validation, deprecated-config migration, config typing, sidebar hygiene, page-module routing, and site-source CSS architecture:

- a stable plugin namespace: `"docusaurus-2"`
- a documented flat-config preset surface
- TypeScript parser wiring inside each preset
- `projectService: true` for the typed presets
- `no-conflicting-config-link-props`
- `no-conflicting-config-link-content-props`
- `no-conflicting-theme-config-metadata-keys`
- `no-deprecated-on-broken-markdown-links`
- `no-empty-head-tags`
- `no-duplicate-footer-column-titles`
- `no-duplicate-footer-link-item-destinations`
- `no-duplicate-footer-link-item-labels`
- `no-duplicate-head-tags`
- `no-duplicate-navbar-item-destinations`
- `no-duplicate-sidebar-doc-ids`
- `no-conflicting-footer-html-item-props`
- `no-conflicting-navbar-doc-item-props`
- `no-conflicting-navbar-doc-sidebar-item-props`
- `no-duplicate-i18n-locales`
- `no-duplicate-navbar-item-labels`
- `no-duplicate-plugin-pwa-head-tags`
- `no-duplicate-theme-config-metadata-keys`
- `no-empty-footer-link-columns`
- `no-ignored-site-validations`
- `no-empty-theme-config-metadata`
- `no-mixed-sidebar-link-kinds`
- `no-redundant-social-card-metadata`
- `no-svg-social-card-image`
- `no-use-base-url-for-internal-link-components`
- `no-useless-collapsed-sidebar-categories`
- `prefer-config-satisfies`
- `prefer-css-modules-in-site-src`
- `prefer-href-for-external-link-components`
- `prefer-href-for-external-links`
- `prefer-head-tag-attributes-object`
- `prefer-i18n-default-locale-first`
- `no-page-css-module-imports-in-components`
- `prefer-sidebars-config-satisfies`
- `prefer-to-for-internal-link-components`
- `prefer-to-for-internal-links`
- `prefer-use-base-url-for-static-assets`
- `require-base-url-issue-banner-enabled`
- `require-base-url-slashes`
- `require-i18n-default-locale-in-locales`
- `require-config-link-content`
- `require-config-link-destination`
- `require-default-export-pages`
- `require-footer-link-column-items`
- `require-footer-link-column-title`
- `require-head-tag-tag-name`
- `require-plugin-pwa-debug`
- `require-plugin-pwa-head-manifest`
- `require-plugin-pwa-head-theme-color`
- `require-plugin-pwa-offline-mode-activation-strategies`
- `require-plugin-pwa-setup`
- `require-site-config-fields`
- `require-site-url-origin`
- `require-trailing-slash-explicit`
- `require-navbar-doc-item-doc-id`
- `require-navbar-doc-sidebar-item-sidebar-id`
- `require-navbar-docs-version-item-to`
- `require-navbar-dropdown-items`
- `require-navbar-dropdown-label`
- `require-navbar-html-item-value`
- `validate-navbar-item-position`
- `require-sidebar-category-items`
- `require-sidebar-category-label`
- `require-doc-sidebar-link-type`
- `require-generated-index-link-type`
- `require-pages-plugin-excludes`
- `require-sidebar-category-type`
- `require-theme-config-image`
- `validate-theme-config-metadata`

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

| Preset                                                                                        | Purpose                                                          |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| [🟢 `docusaurus2.configs.minimal`](./presets/minimal.md)                                      | Smallest baseline for future Docusaurus-specific linting.        |
| [🟡 `docusaurus2.configs.recommended`](./presets/recommended.md)                              | Default preset for most documentation repositories.              |
| [🟠 `docusaurus2.configs["recommended-type-checked"]`](./presets/recommended-type-checked.md) | Recommended plus typed parser setup for future type-aware rules. |
| [🔴 `docusaurus2.configs.strict`](./presets/strict.md)                                        | Stricter adoption path for mature sites.                         |
| [🟣 `docusaurus2.configs.all`](./presets/all.md)                                              | Every stable rule once the rule catalog grows.                   |
| [🧪 `docusaurus2.configs.experimental`](./presets/experimental.md)                            | Future experimental rules and rollout candidates.                |

## Current rule areas

- Docusaurus config destination-prop conflict hygiene
- Docusaurus config link content-shape conflict hygiene
- Docusaurus config link minimal-schema hygiene
- Docusaurus explicit site-config field hygiene
- Docusaurus config typing and validation hygiene
- Docusaurus deprecated-config migration hygiene
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

## Current rollout shape

- `recommended` and `recommended-type-checked` carry the broadly applicable config and sidebar rules.
- `strict`, `all`, and `experimental` add the stricter page-module and site-source CSS architecture rules.
- `minimal` stays intentionally empty so repositories can adopt the runtime and preset surface before enabling any bundled rules.

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
