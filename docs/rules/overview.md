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

The plugin now ships Docusaurus-specific rules across config validation, deprecated-config migration, config typing, sidebar hygiene, page-module routing, and site-source CSS architecture:

- a stable plugin namespace: `"docusaurus-2"`
- a documented flat-config preset surface
- TypeScript parser wiring inside each preset
- `projectService: true` for the typed presets
- [`no-conflicting-config-link-props`](./no-conflicting-config-link-props.md)
- [`no-conflicting-config-link-content-props`](./no-conflicting-config-link-content-props.md)
- [`no-empty-config-link-destinations`](./no-empty-config-link-destinations.md)
- [`no-empty-config-link-labels`](./no-empty-config-link-labels.md)
- [`no-conflicting-theme-config-metadata-keys`](./no-conflicting-theme-config-metadata-keys.md)
- [`no-deprecated-on-broken-markdown-links`](./no-deprecated-on-broken-markdown-links.md)
- [`no-empty-head-tags`](./no-empty-head-tags.md)
- [`no-duplicate-footer-column-titles`](./no-duplicate-footer-column-titles.md)
- [`no-duplicate-footer-link-item-destinations`](./no-duplicate-footer-link-item-destinations.md)
- [`no-duplicate-footer-link-item-labels`](./no-duplicate-footer-link-item-labels.md)
- [`no-duplicate-head-tags`](./no-duplicate-head-tags.md)
- [`no-duplicate-navbar-item-destinations`](./no-duplicate-navbar-item-destinations.md)
- [`no-duplicate-sidebar-doc-ids`](./no-duplicate-sidebar-doc-ids.md)
- [`no-conflicting-footer-html-item-props`](./no-conflicting-footer-html-item-props.md)
- [`no-conflicting-navbar-doc-item-props`](./no-conflicting-navbar-doc-item-props.md)
- [`no-conflicting-navbar-doc-sidebar-item-props`](./no-conflicting-navbar-doc-sidebar-item-props.md)
- [`no-duplicate-i18n-locales`](./no-duplicate-i18n-locales.md)
- [`no-duplicate-navbar-item-labels`](./no-duplicate-navbar-item-labels.md)
- [`no-duplicate-plugin-pwa-head-tags`](./no-duplicate-plugin-pwa-head-tags.md)
- [`no-duplicate-theme-config-metadata-keys`](./no-duplicate-theme-config-metadata-keys.md)
- [`no-empty-footer-link-columns`](./no-empty-footer-link-columns.md)
- [`no-ignored-site-validations`](./no-ignored-site-validations.md)
- [`no-empty-navbar-dropdown-items`](./no-empty-navbar-dropdown-items.md)
- [`no-empty-navbar-item-objects`](./no-empty-navbar-item-objects.md)
- [`no-empty-sidebar-categories`](./no-empty-sidebar-categories.md)
- [`no-empty-theme-config-metadata`](./no-empty-theme-config-metadata.md)
- [`no-mixed-sidebar-link-kinds`](./no-mixed-sidebar-link-kinds.md)
- [`no-redundant-social-card-metadata`](./no-redundant-social-card-metadata.md)
- [`no-svg-social-card-image`](./no-svg-social-card-image.md)
- [`no-use-base-url-for-internal-link-components`](./no-use-base-url-for-internal-link-components.md)
- [`no-useless-collapsed-sidebar-categories`](./no-useless-collapsed-sidebar-categories.md)
- [`prefer-config-satisfies`](./prefer-config-satisfies.md)
- [`prefer-css-modules-in-site-src`](./prefer-css-modules-in-site-src.md)
- [`prefer-href-for-external-link-components`](./prefer-href-for-external-link-components.md)
- [`prefer-href-for-external-links`](./prefer-href-for-external-links.md)
- [`prefer-head-tag-attributes-object`](./prefer-head-tag-attributes-object.md)
- [`prefer-i18n-default-locale-first`](./prefer-i18n-default-locale-first.md)
- [`prefer-theme-config-metadata-name-for-twitter-tags`](./prefer-theme-config-metadata-name-for-twitter-tags.md)
- [`prefer-theme-config-metadata-property-for-og-tags`](./prefer-theme-config-metadata-property-for-og-tags.md)
- [`no-page-css-module-imports-in-components`](./no-page-css-module-imports-in-components.md)
- [`prefer-sidebars-config-satisfies`](./prefer-sidebars-config-satisfies.md)
- [`prefer-to-for-internal-link-components`](./prefer-to-for-internal-link-components.md)
- [`prefer-to-for-internal-links`](./prefer-to-for-internal-links.md)
- [`prefer-use-base-url-for-static-assets`](./prefer-use-base-url-for-static-assets.md)
- [`require-base-url-issue-banner-enabled`](./require-base-url-issue-banner-enabled.md)
- [`require-base-url-slashes`](./require-base-url-slashes.md)
- [`require-i18n-default-locale-in-locales`](./require-i18n-default-locale-in-locales.md)
- [`require-config-link-content`](./require-config-link-content.md)
- [`require-config-link-destination`](./require-config-link-destination.md)
- [`require-default-export-pages`](./require-default-export-pages.md)
- [`require-footer-link-column-items`](./require-footer-link-column-items.md)
- [`require-footer-link-column-title`](./require-footer-link-column-title.md)
- [`require-head-tag-attributes-when-no-inner-html`](./require-head-tag-attributes-when-no-inner-html.md)
- [`require-head-tag-tag-name`](./require-head-tag-tag-name.md)
- [`require-theme-config-color-mode-object`](./require-theme-config-color-mode-object.md)
- [`validate-theme-config-color-mode-default-mode`](./validate-theme-config-color-mode-default-mode.md)
- [`validate-theme-config-color-mode-switch-flags`](./validate-theme-config-color-mode-switch-flags.md)
- [`no-conflicting-theme-config-color-mode-flags`](./no-conflicting-theme-config-color-mode-flags.md)
- [`require-theme-config-announcement-bar-id`](./require-theme-config-announcement-bar-id.md)
- [`validate-theme-config-announcement-bar-is-closeable`](./validate-theme-config-announcement-bar-is-closeable.md)
- [`require-plugin-pwa-debug`](./require-plugin-pwa-debug.md)
- [`require-plugin-pwa-head-manifest`](./require-plugin-pwa-head-manifest.md)
- [`require-plugin-pwa-head-theme-color`](./require-plugin-pwa-head-theme-color.md)
- [`require-plugin-pwa-offline-mode-activation-strategies`](./require-plugin-pwa-offline-mode-activation-strategies.md)
- [`require-plugin-pwa-setup`](./require-plugin-pwa-setup.md)
- [`require-site-config-fields`](./require-site-config-fields.md)
- [`require-site-url-origin`](./require-site-url-origin.md)
- [`require-trailing-slash-explicit`](./require-trailing-slash-explicit.md)
- [`require-navbar-doc-item-doc-id`](./require-navbar-doc-item-doc-id.md)
- [`require-navbar-doc-sidebar-item-sidebar-id`](./require-navbar-doc-sidebar-item-sidebar-id.md)
- [`require-navbar-docs-version-item-to`](./require-navbar-docs-version-item-to.md)
- [`require-navbar-dropdown-items`](./require-navbar-dropdown-items.md)
- [`require-navbar-dropdown-label`](./require-navbar-dropdown-label.md)
- [`require-navbar-html-item-value`](./require-navbar-html-item-value.md)
- [`validate-navbar-item-position`](./validate-navbar-item-position.md)
- [`require-sidebar-category-items`](./require-sidebar-category-items.md)
- [`require-sidebar-category-label`](./require-sidebar-category-label.md)
- [`require-doc-sidebar-link-type`](./require-doc-sidebar-link-type.md)
- [`require-generated-index-link-type`](./require-generated-index-link-type.md)
- [`require-pages-plugin-excludes`](./require-pages-plugin-excludes.md)
- [`require-sidebar-category-type`](./require-sidebar-category-type.md)
- [`require-theme-config-image`](./require-theme-config-image.md)
- [`validate-theme-config-metadata`](./validate-theme-config-metadata.md)

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
