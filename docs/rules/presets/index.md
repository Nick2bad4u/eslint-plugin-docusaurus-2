---
title: Presets
description: Preset reference for eslint-plugin-docusaurus-2.
---

# Presets

`eslint-plugin-docusaurus-2` currently exposes seven flat-config presets:

| Preset                                                         | Type-aware | Summary                                       |
| -------------------------------------------------------------- | ---------- | --------------------------------------------- |
| [🟢 `minimal`](./minimal.md)                                   | No         | Smallest future-ready baseline.               |
| [🔵 `config`](./config.md)                                     | No         | Focused config/theme/plugin rule set.         |
| [🟡 `recommended`](./recommended.md)                           | No         | Default starting point for most repositories. |
| [🟠 `recommended-type-checked`](./recommended-type-checked.md) | Yes        | Recommended plus typed parser setup.          |
| [🔴 `strict`](./strict.md)                                     | Yes        | Stricter path for mature sites.               |
| [🟣 `all`](./all.md)                                           | Yes        | Every stable rule once the catalog expands.   |
| [🧪 `experimental`](./experimental.md)                         | Yes        | Future experimental rule candidates.          |

## Current rule count

The plugin currently ships **37 rules**.

- `no-conflicting-config-link-props`
- `no-conflicting-config-link-content-props`
- `no-deprecated-on-broken-markdown-links`
- `no-duplicate-sidebar-doc-ids`
- `no-conflicting-footer-html-item-props`
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
- `require-plugin-pwa-setup`
- `require-site-config-fields`
- `require-navbar-doc-item-doc-id`
- `require-navbar-doc-sidebar-item-sidebar-id`
- `require-navbar-dropdown-items`
- `require-navbar-dropdown-label`
- `require-sidebar-category-items`
- `require-sidebar-category-label`
- `require-doc-sidebar-link-type`
- `require-generated-index-link-type`
- `require-pages-plugin-excludes`
- `require-sidebar-category-type`
- `require-theme-config-image`
- `validate-theme-config-metadata`

The preset ladder still matters because it defines how broader future Docusaurus rule sets will roll out.

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

| Rule                                                                                                                                                              | Fix | Preset key        |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-: | ----------------- |
| [`no-conflicting-config-link-content-props`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-conflicting-config-link-content-props)         |  —  | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`no-conflicting-config-link-props`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-conflicting-config-link-props)                         |  🔧 | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`no-conflicting-footer-html-item-props`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-conflicting-footer-html-item-props)               |  —  | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`no-conflicting-navbar-doc-item-props`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-conflicting-navbar-doc-item-props)                 |  🔧 | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`no-conflicting-navbar-doc-sidebar-item-props`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-conflicting-navbar-doc-sidebar-item-props) |  🔧 | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`no-deprecated-on-broken-markdown-links`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-deprecated-on-broken-markdown-links)             |  🔧 | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`no-duplicate-sidebar-doc-ids`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-sidebar-doc-ids)                                 |  💡 | 🔴 🟣 🧪          |
| [`no-ignored-site-validations`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-ignored-site-validations)                                   |  🔧 | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`no-mixed-sidebar-link-kinds`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-mixed-sidebar-link-kinds)                                   |  💡 | 🔴 🟣 🧪          |
| [`no-page-css-module-imports-in-components`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-page-css-module-imports-in-components)         |  —  | 🔴 🟣 🧪          |
| [`no-redundant-social-card-metadata`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-redundant-social-card-metadata)                       |  🔧 | 🔵 🔴 🟣 🧪       |
| [`no-svg-social-card-image`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-svg-social-card-image)                                         |  —  | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`no-use-base-url-for-internal-link-components`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-use-base-url-for-internal-link-components) |  🔧 | 🟡 🟠 🔴 🟣 🧪    |
| [`no-useless-collapsed-sidebar-categories`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-useless-collapsed-sidebar-categories)           |  🔧 | 🟡 🟠 🔴 🟣 🧪    |
| [`prefer-config-satisfies`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-config-satisfies)                                           |  🔧 | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`prefer-css-modules-in-site-src`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-css-modules-in-site-src)                             |  —  | 🔴 🟣 🧪          |
| [`prefer-href-for-external-link-components`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-href-for-external-link-components)         |  🔧 | 🟡 🟠 🔴 🟣 🧪    |
| [`prefer-href-for-external-links`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-href-for-external-links)                             |  🔧 | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`prefer-sidebars-config-satisfies`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-sidebars-config-satisfies)                         |  🔧 | 🟡 🟠 🔴 🟣 🧪    |
| [`prefer-to-for-internal-link-components`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-to-for-internal-link-components)             |  🔧 | 🟡 🟠 🔴 🟣 🧪    |
| [`prefer-to-for-internal-links`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-to-for-internal-links)                                 |  🔧 | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`prefer-use-base-url-for-static-assets`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-use-base-url-for-static-assets)               |  💡 | 🔴 🟣 🧪          |
| [`require-config-link-content`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-config-link-content)                                   |  —  | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`require-config-link-destination`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-config-link-destination)                           |  —  | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`require-default-export-pages`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-default-export-pages)                                 |  —  | 🔴 🟣 🧪          |
| [`require-doc-sidebar-link-type`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-doc-sidebar-link-type)                               |  🔧 | 🟡 🟠 🔴 🟣 🧪    |
| [`require-footer-link-column-items`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-footer-link-column-items)                         |  —  | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`require-footer-link-column-title`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-footer-link-column-title)                         |  —  | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`require-generated-index-link-type`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-generated-index-link-type)                       |  🔧 | 🟡 🟠 🔴 🟣 🧪    |
| [`require-navbar-doc-item-doc-id`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-navbar-doc-item-doc-id)                             |  —  | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`require-navbar-doc-sidebar-item-sidebar-id`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-navbar-doc-sidebar-item-sidebar-id)     |  —  | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`require-navbar-docs-version-item-to`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-navbar-docs-version-item-to)                   |  —  | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`require-navbar-dropdown-items`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-navbar-dropdown-items)                               |  —  | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`require-navbar-dropdown-label`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-navbar-dropdown-label)                               |  —  | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`require-navbar-html-item-value`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-navbar-html-item-value)                             |  —  | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`require-pages-plugin-excludes`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-pages-plugin-excludes)                               |  🔧 | 🔵 🔴 🟣 🧪       |
| [`require-plugin-pwa-head-manifest`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-plugin-pwa-head-manifest)                         |  —  | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`require-plugin-pwa-head-theme-color`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-plugin-pwa-head-theme-color)                   |  —  | 🔵 🟡 🟠 🔴 🟣 🧪 |
| [`require-plugin-pwa-setup`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-plugin-pwa-setup)                                         |  —  | 🔵 🔴 🟣 🧪       |
| [`require-sidebar-category-items`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-sidebar-category-items)                             |  —  | 🟡 🟠 🔴 🟣 🧪    |
| [`require-sidebar-category-label`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-sidebar-category-label)                             |  —  | 🟡 🟠 🔴 🟣 🧪    |
| [`require-sidebar-category-type`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-sidebar-category-type)                               |  🔧 | 🟡 🟠 🔴 🟣 🧪    |
| [`require-site-config-fields`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-site-config-fields)                                     |  —  | 🔵 🔴 🟣 🧪       |
| [`require-theme-config-image`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-theme-config-image)                                     |  —  | 🔵 🔴 🟣 🧪       |
| [`validate-theme-config-metadata`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/validate-theme-config-metadata)                             |  —  | 🔵 🟡 🟠 🔴 🟣 🧪 |
