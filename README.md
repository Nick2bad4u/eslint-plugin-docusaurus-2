# eslint-plugin-docusaurus-2

[![npm license.](https://flat.badgen.net/npm/license/eslint-plugin-docusaurus-2?color=purple)](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/blob/main/LICENSE) [![npm total downloads.](https://flat.badgen.net/npm/dt/eslint-plugin-docusaurus-2?color=pink)](https://www.npmjs.com/package/eslint-plugin-docusaurus-2) [![latest GitHub release.](https://flat.badgen.net/github/release/Nick2bad4u/eslint-plugin-docusaurus-2?color=cyan)](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/releases) [![GitHub stars.](https://flat.badgen.net/github/stars/Nick2bad4u/eslint-plugin-docusaurus-2?color=yellow)](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/stargazers) [![GitHub forks.](https://flat.badgen.net/github/forks/Nick2bad4u/eslint-plugin-docusaurus-2?color=green)](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/forks) [![GitHub open issues.](https://flat.badgen.net/github/open-issues/Nick2bad4u/eslint-plugin-docusaurus-2?color=red)](https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/issues) [![codecov.](https://flat.badgen.net/codecov/github/Nick2bad4u/eslint-plugin-docusaurus-2?color=blue)](https://codecov.io/gh/Nick2bad4u/eslint-plugin-docusaurus-2)

`eslint-plugin-docusaurus-2` is an ESLint plugin for Docusaurus sites, docs repositories, and TypeDoc-integrated documentation workflows.

The goal is simple: ship a **rock-solid preset surface**, then add **high-quality Docusaurus-specific rules** instead of reusing unrelated rules from a template plugin.

## What this package is for

This repository is being built around Docusaurus-specific concerns such as:

- site configuration and sidebar consistency
- docs-content and generated-content boundaries
- TypeDoc integration hygiene
- patterns around `@docusaurus/*` packages
- maintainable Flat Config presets for documentation-heavy repositories

## Current status

The package has already been re-scaffolded away from the previous template plugin.

Today it ships:

- the public plugin namespace: `"docusaurus-2"`
- documented Flat Config presets
- TypeScript parser setup inside each preset
- typed preset support via `projectService: true`
- `no-conflicting-config-link-props`
- `no-conflicting-config-link-content-props`
- `no-deprecated-on-broken-markdown-links`
- `no-duplicate-sidebar-doc-ids`
- `no-conflicting-footer-html-item-props`
- `no-conflicting-navbar-doc-item-props`
- `no-conflicting-navbar-doc-sidebar-item-props`
- `no-ignored-site-validations`
- `no-mixed-sidebar-link-kinds`
- `no-page-css-module-imports-in-components`
- `no-redundant-social-card-metadata`
- `no-svg-social-card-image`
- `no-use-base-url-for-internal-link-components`
- `no-useless-collapsed-sidebar-categories`
- `prefer-config-satisfies`
- `prefer-css-modules-in-site-src`
- `prefer-href-for-external-link-components`
- `prefer-href-for-external-links`
- `prefer-sidebars-config-satisfies`
- `prefer-to-for-internal-link-components`
- `prefer-to-for-internal-links`
- `prefer-use-base-url-for-static-assets`
- `require-config-link-content`
- `require-config-link-destination`
- `require-default-export-pages`
- `require-footer-link-column-items`
- `require-footer-link-column-title`
- `require-plugin-pwa-head-manifest`
- `require-plugin-pwa-head-theme-color`
- `require-plugin-pwa-setup`
- `require-site-config-fields`
- `require-navbar-doc-item-doc-id`
- `require-navbar-doc-sidebar-item-sidebar-id`
- `require-navbar-docs-version-item-to`
- `require-navbar-dropdown-items`
- `require-navbar-dropdown-label`
- `require-navbar-html-item-value`
- `require-sidebar-category-items`
- `require-sidebar-category-label`
- `require-doc-sidebar-link-type`
- `require-generated-index-link-type`
- `require-pages-plugin-excludes`
- `require-sidebar-category-type`
- `require-theme-config-image`
- `validate-theme-config-metadata`

The rule catalog is intentionally focused while the higher-value Docusaurus rule space is explored.

## Installation

```bash
npm install --save-dev eslint-plugin-docusaurus-2 typescript
```

## Compatibility

- **ESLint:** `9.x` and `10.x`
- **Config system:** Flat Config only
- **Node.js:** repository baseline `>=22`

## Quick start

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## Presets

| Preset                                                                                                   | Type-aware | Purpose                                       |
| -------------------------------------------------------------------------------------------------------- | ---------- | --------------------------------------------- |
| [🟢 `docusaurus2.configs.minimal`](./docs/rules/presets/minimal.md)                                      | No         | Smallest future-ready baseline.               |
| [🔵 `docusaurus2.configs.config`](./docs/rules/presets/config.md)                                        | No         | Focused config/theme/plugin rule set.         |
| [🟡 `docusaurus2.configs.recommended`](./docs/rules/presets/recommended.md)                              | No         | Default starting point for most repositories. |
| [🟠 `docusaurus2.configs["recommended-type-checked"]`](./docs/rules/presets/recommended-type-checked.md) | Yes        | Recommended plus typed parser setup.          |
| [🔴 `docusaurus2.configs.strict`](./docs/rules/presets/strict.md)                                        | Yes        | Stricter future tier for mature sites.        |
| [🟣 `docusaurus2.configs.all`](./docs/rules/presets/all.md)                                              | Yes        | Every stable rule once the catalog grows.     |
| [🧪 `docusaurus2.configs.experimental`](./docs/rules/presets/experimental.md)                            | Yes        | Future experimental rule candidates.          |

## What the presets configure today

Every preset already includes:

- `files: ["**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}"]`
- `@typescript-eslint/parser`
- `ecmaVersion: "latest"`
- `sourceType: "module"`
- plugin registration under `"docusaurus-2"`

The typed presets also enable `projectService: true` automatically.

For stronger TypeDoc-specific linting around API doc authoring and TypeDoc conventions, pair this plugin with [`eslint-plugin-typedoc`](https://www.npmjs.com/package/eslint-plugin-typedoc).

## Rules

The current rule catalog focuses on Docusaurus config, validation, sidebar, and site-source CSS correctness.

The public preset surface is stable, and the rule catalog is intentionally focused while higher-value Docusaurus rule gaps are explored.

- `Fix` legend:
  - `🔧` = autofixable
  - `💡` = suggestions available
  - `—` = report only
- `Preset key` legend:
  - [🟢](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/presets/minimal) — [`docusaurus2.configs.minimal`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/presets/minimal)
  - [🔵](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/presets/config) — [`docusaurus2.configs.config`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/presets/config)
  - [🟡](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/presets/recommended) — [`docusaurus2.configs.recommended`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/presets/recommended)
  - [🟠](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/presets/recommended-type-checked) — [`docusaurus2.configs["recommended-type-checked"]`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/presets/recommended-type-checked)
  - [🔴](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/presets/strict) — [`docusaurus2.configs.strict`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/presets/strict)
  - [🟣](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/presets/all) — [`docusaurus2.configs.all`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/presets/all)
  - [🧪](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/presets/experimental) — [`docusaurus2.configs.experimental`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/presets/experimental)

| Rule | Fix | Preset key |
| --- | :-: | --- |
| [`no-conflicting-config-link-content-props`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-conflicting-config-link-content-props) | — | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`no-conflicting-config-link-props`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-conflicting-config-link-props) | 🔧 | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`no-conflicting-footer-html-item-props`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-conflicting-footer-html-item-props) | — | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`no-conflicting-navbar-doc-item-props`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-conflicting-navbar-doc-item-props) | 🔧 | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`no-conflicting-navbar-doc-sidebar-item-props`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-conflicting-navbar-doc-sidebar-item-props) | 🔧 | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`no-conflicting-theme-config-metadata-keys`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-conflicting-theme-config-metadata-keys) | 💡 | 🔵 🔴 🟣 🧪 |
| [`no-deprecated-on-broken-markdown-links`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-deprecated-on-broken-markdown-links) | 🔧 | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`no-duplicate-footer-column-titles`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-footer-column-titles) | — | 🔵 🔴 🟣 🧪 |
| [`no-duplicate-footer-link-item-destinations`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-footer-link-item-destinations) | 💡 | 🔵 🔴 🟣 🧪 |
| [`no-duplicate-footer-link-item-labels`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-footer-link-item-labels) | — | 🔵 🔴 🟣 🧪 |
| [`no-duplicate-head-tags`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-head-tags) | 🔧 | 🔵 🔴 🟣 🧪 |
| [`no-duplicate-i18n-locales`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-i18n-locales) | 🔧 💡 | 🔵 🔴 🟣 🧪 |
| [`no-duplicate-navbar-item-destinations`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-navbar-item-destinations) | 💡 | 🔵 🔴 🟣 🧪 |
| [`no-duplicate-navbar-item-labels`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-navbar-item-labels) | — | 🔵 🔴 🟣 🧪 |
| [`no-duplicate-plugin-pwa-head-tags`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-plugin-pwa-head-tags) | 🔧 | 🔵 🔴 🟣 🧪 |
| [`no-duplicate-sidebar-doc-ids`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-sidebar-doc-ids) | 💡 | 🔴 🟣 🧪 |
| [`no-duplicate-theme-config-metadata-keys`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-theme-config-metadata-keys) | 🔧 | 🔵 🔴 🟣 🧪 |
| [`no-empty-footer-link-columns`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-empty-footer-link-columns) | 🔧 | 🔵 🔴 🟣 🧪 |
| [`no-empty-head-tags`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-empty-head-tags) | 🔧 | 🔵 🔴 🟣 🧪 |
| [`no-empty-theme-config-metadata`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-empty-theme-config-metadata) | 🔧 | 🔵 🔴 🟣 🧪 |
| [`no-ignored-site-validations`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-ignored-site-validations) | 🔧 | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`no-mixed-sidebar-link-kinds`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-mixed-sidebar-link-kinds) | 💡 | 🔴 🟣 🧪 |
| [`no-page-css-module-imports-in-components`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-page-css-module-imports-in-components) | — | 🔴 🟣 🧪 |
| [`no-redundant-social-card-metadata`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-redundant-social-card-metadata) | 🔧 | 🔵 🔴 🟣 🧪 |
| [`no-svg-social-card-image`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-svg-social-card-image) | — | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`no-use-base-url-for-internal-link-components`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-use-base-url-for-internal-link-components) | 🔧 | 🟡 🟠 🔴 🟣 🧪 |
| [`no-useless-collapsed-sidebar-categories`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-useless-collapsed-sidebar-categories) | 🔧 | 🟡 🟠 🔴 🟣 🧪 |
| [`prefer-config-satisfies`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-config-satisfies) | 🔧 | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`prefer-css-modules-in-site-src`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-css-modules-in-site-src) | — | 🔴 🟣 🧪 |
| [`prefer-head-tag-attributes-object`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-head-tag-attributes-object) | 🔧 | 🔵 🔴 🟣 🧪 |
| [`prefer-href-for-external-link-components`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-href-for-external-link-components) | 🔧 | 🟡 🟠 🔴 🟣 🧪 |
| [`prefer-href-for-external-links`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-href-for-external-links) | 🔧 | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`prefer-i18n-default-locale-first`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-i18n-default-locale-first) | 🔧 💡 | 🔵 🔴 🟣 🧪 |
| [`prefer-sidebars-config-satisfies`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-sidebars-config-satisfies) | 🔧 | 🟡 🟠 🔴 🟣 🧪 |
| [`prefer-to-for-internal-link-components`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-to-for-internal-link-components) | 🔧 | 🟡 🟠 🔴 🟣 🧪 |
| [`prefer-to-for-internal-links`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-to-for-internal-links) | 🔧 | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`prefer-use-base-url-for-static-assets`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-use-base-url-for-static-assets) | 💡 | 🔴 🟣 🧪 |
| [`require-base-url-issue-banner-enabled`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-base-url-issue-banner-enabled) | 🔧 | 🔵 🔴 🟣 🧪 |
| [`require-base-url-slashes`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-base-url-slashes) | 🔧 | 🔵 🔴 🟣 🧪 |
| [`require-config-link-content`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-config-link-content) | — | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`require-config-link-destination`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-config-link-destination) | — | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`require-default-export-pages`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-default-export-pages) | — | 🔴 🟣 🧪 |
| [`require-doc-sidebar-link-type`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-doc-sidebar-link-type) | 🔧 | 🟡 🟠 🔴 🟣 🧪 |
| [`require-footer-link-column-items`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-footer-link-column-items) | — | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`require-footer-link-column-title`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-footer-link-column-title) | — | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`require-generated-index-link-type`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-generated-index-link-type) | 🔧 | 🟡 🟠 🔴 🟣 🧪 |
| [`require-head-tag-tag-name`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-head-tag-tag-name) | 💡 | 🔵 🔴 🟣 🧪 |
| [`require-i18n-default-locale-in-locales`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-i18n-default-locale-in-locales) | 🔧 💡 | 🔵 🔴 🟣 🧪 |
| [`require-navbar-doc-item-doc-id`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-navbar-doc-item-doc-id) | — | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`require-navbar-doc-sidebar-item-sidebar-id`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-navbar-doc-sidebar-item-sidebar-id) | — | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`require-navbar-docs-version-item-to`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-navbar-docs-version-item-to) | — | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`require-navbar-dropdown-items`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-navbar-dropdown-items) | — | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`require-navbar-dropdown-label`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-navbar-dropdown-label) | — | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`require-navbar-html-item-value`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-navbar-html-item-value) | — | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`require-pages-plugin-excludes`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-pages-plugin-excludes) | 🔧 | 🔵 🔴 🟣 🧪 |
| [`require-plugin-pwa-debug`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-plugin-pwa-debug) | — | 🔵 🔴 🟣 🧪 |
| [`require-plugin-pwa-head-manifest`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-plugin-pwa-head-manifest) | — | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`require-plugin-pwa-head-theme-color`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-plugin-pwa-head-theme-color) | — | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`require-plugin-pwa-offline-mode-activation-strategies`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-plugin-pwa-offline-mode-activation-strategies) | — | 🔵 🔴 🟣 🧪 |
| [`require-plugin-pwa-setup`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-plugin-pwa-setup) | — | 🔵 🔴 🟣 🧪 |
| [`require-sidebar-category-items`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-sidebar-category-items) | — | 🟡 🟠 🔴 🟣 🧪 |
| [`require-sidebar-category-label`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-sidebar-category-label) | — | 🟡 🟠 🔴 🟣 🧪 |
| [`require-sidebar-category-type`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-sidebar-category-type) | 🔧 | 🟡 🟠 🔴 🟣 🧪 |
| [`require-site-config-fields`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-site-config-fields) | — | 🔵 🔴 🟣 🧪 |
| [`require-site-url-origin`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-site-url-origin) | 🔧 💡 | 🔵 🔴 🟣 🧪 |
| [`require-theme-config-image`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-theme-config-image) | — | 🔵 🔴 🟣 🧪 |
| [`require-trailing-slash-explicit`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-trailing-slash-explicit) | 🔧 💡 | 🔵 🔴 🟣 🧪 |
| [`validate-navbar-item-position`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/validate-navbar-item-position) | 🔧 💡 | 🔵 🔴 🟣 🧪 |
| [`validate-theme-config-metadata`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/validate-theme-config-metadata) | — | 🔵 🟡 🟠 🔴 🟣 🧪 |

## Documentation

- Rules overview: [`docs/rules/overview.md`](./docs/rules/overview.md)
- Getting started: [`docs/rules/getting-started.md`](./docs/rules/getting-started.md)
- Preset reference: [`docs/rules/presets/index.md`](./docs/rules/presets/index.md)
- Docusaurus site app: [`docs/docusaurus/`](./docs/docusaurus/)

## Roadmap direction

The next phase of the plugin is focused on expanding the Docusaurus rule catalog with more high-signal checks. Likely areas include:

- Docusaurus config and route metadata rules
- sidebar and docs-structure validation rules
- TypeDoc-generated API boundary rules
- site-contract and docs-build integration rules

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

[MIT](./LICENSE)
