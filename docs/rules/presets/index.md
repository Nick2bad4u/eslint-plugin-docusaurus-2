---
title: Presets
description: Preset reference for eslint-plugin-docusaurus-2.
---

# Presets

`eslint-plugin-docusaurus-2` exposes a focused flat-config preset ladder:

| Preset                                                         | Type-aware | Summary                                       |
| -------------------------------------------------------------- | ---------- | --------------------------------------------- |
| [🟢 `minimal`](./minimal.md)                                   | No         | Smallest future-ready baseline.               |
| [🔵 `config`](./config.md)                                     | No         | Focused config/theme/plugin rule set.         |
| [🟡 `recommended`](./recommended.md)                           | No         | Default starting point for most repositories. |
| [🟠 `recommended-type-checked`](./recommended-type-checked.md) | Yes        | Recommended plus typed parser setup.          |
| [🔴 `strict`](./strict.md)                                     | Yes        | Stricter path for mature sites.               |
| [🟣 `all`](./all.md)                                           | Yes        | Every stable rule once the catalog expands.   |
| [🧪 `experimental`](./experimental.md)                         | Yes        | Future experimental rule candidates.          |

Use the matrix below to quickly compare rule coverage and pick the strictness tier that fits your docs repository.

## Rule matrix

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
| [`no-deprecated-on-broken-markdown-links`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-deprecated-on-broken-markdown-links) | 🔧 | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`no-duplicate-i18n-locales`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-i18n-locales) | 🔧 💡 | 🔵 🔴 🟣 🧪 |
| [`no-duplicate-plugin-pwa-head-tags`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-plugin-pwa-head-tags) | 🔧 | 🔵 🔴 🟣 🧪 |
| [`no-duplicate-sidebar-doc-ids`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-sidebar-doc-ids) | 💡 | 🔴 🟣 🧪 |
| [`no-ignored-site-validations`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-ignored-site-validations) | 🔧 | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`no-mixed-sidebar-link-kinds`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-mixed-sidebar-link-kinds) | 💡 | 🔴 🟣 🧪 |
| [`no-page-css-module-imports-in-components`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-page-css-module-imports-in-components) | — | 🔴 🟣 🧪 |
| [`no-redundant-social-card-metadata`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-redundant-social-card-metadata) | 🔧 | 🔵 🔴 🟣 🧪 |
| [`no-svg-social-card-image`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-svg-social-card-image) | — | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`no-use-base-url-for-internal-link-components`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-use-base-url-for-internal-link-components) | 🔧 | 🟡 🟠 🔴 🟣 🧪 |
| [`no-useless-collapsed-sidebar-categories`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-useless-collapsed-sidebar-categories) | 🔧 | 🟡 🟠 🔴 🟣 🧪 |
| [`prefer-config-satisfies`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-config-satisfies) | 🔧 | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`prefer-css-modules-in-site-src`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-css-modules-in-site-src) | — | 🔴 🟣 🧪 |
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
| [`validate-theme-config-metadata`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/validate-theme-config-metadata) | — | 🔵 🟡 🟠 🔴 🟣 🧪 |
