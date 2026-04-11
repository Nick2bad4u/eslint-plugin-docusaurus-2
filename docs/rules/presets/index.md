---
title: Presets
description: Preset reference for eslint-plugin-docusaurus-2.
---

# Presets

`eslint-plugin-docusaurus-2` exposes a focused flat-config preset ladder:

| Preset                                 | Summary                                       |
| -------------------------------------- | --------------------------------------------- |
| [🟢 `minimal`](./minimal.md)           | Smallest future-ready baseline.               |
| [🔵 `config`](./config.md)             | Focused config/theme/plugin rule set.         |
| [🟡 `recommended`](./recommended.md)   | Default starting point for most repositories. |
| [🔴 `strict`](./strict.md)             | Stricter path for mature sites.               |
| [🟣 `all`](./all.md)                   | Every stable rule once the catalog expands.   |
| [🧪 `experimental`](./experimental.md) | Future experimental rule candidates.          |

Use the matrix below to quickly compare rule coverage and pick the strictness tier that fits your docs repository.

The plugin also exports opt-in content configs outside this preset ladder:

- `docusaurus2.configs.content`
- `docusaurus2.configs["strict-mdx-upgrade"]`

## Rule matrix

The current rule catalog focuses on Docusaurus config, validation, sidebar, and site-source CSS correctness.

The public preset surface is stable, and the rule catalog is intentionally focused while higher-value Docusaurus rule gaps are explored.

- `Fix` legend:
  - `🔧` = autofixable
  - `💡` = suggestions available
  - `—` = report only
- Rules shown without preset membership appear in the opt-in rules table below.
- `Preset key` legend:
  - [🟢](./minimal.md) — [`docusaurus2.configs.minimal`](./minimal.md)
  - [🔵](./config.md) — [`docusaurus2.configs.config`](./config.md)
  - [🟡](./recommended.md) — [`docusaurus2.configs.recommended`](./recommended.md)
  - [🔴](./strict.md) — [`docusaurus2.configs.strict`](./strict.md)
  - [🟣](./all.md) — [`docusaurus2.configs.all`](./all.md)
  - [🧪](./experimental.md) — [`docusaurus2.configs.experimental`](./experimental.md)

| Rule | Fix | Preset key |
| --- | :-: | --- |
| [`no-conflicting-config-link-content-props`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-conflicting-config-link-content-props) | — | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-conflicting-config-link-props`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-conflicting-config-link-props) | 🔧 | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-conflicting-footer-html-item-props`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-conflicting-footer-html-item-props) | — | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-conflicting-navbar-doc-item-props`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-conflicting-navbar-doc-item-props) | 🔧 | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-conflicting-navbar-doc-sidebar-item-props`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-conflicting-navbar-doc-sidebar-item-props) | 🔧 | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-conflicting-search-providers`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-conflicting-search-providers) | — | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-conflicting-theme-config-color-mode-flags`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-conflicting-theme-config-color-mode-flags) | 🔧 | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-conflicting-theme-config-metadata-keys`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-conflicting-theme-config-metadata-keys) | 💡 | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-deprecated-future-experimental-faster`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-deprecated-future-experimental-faster) | 🔧 | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-deprecated-future-experimental-storage`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-deprecated-future-experimental-storage) | 🔧 | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-deprecated-google-analytics`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-deprecated-google-analytics) | 💡 | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-deprecated-on-broken-markdown-links`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-deprecated-on-broken-markdown-links) | 🔧 | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-duplicate-footer-column-titles`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-footer-column-titles) | — | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-duplicate-footer-link-item-destinations`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-footer-link-item-destinations) | 💡 | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-duplicate-footer-link-item-labels`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-footer-link-item-labels) | — | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-duplicate-head-tags`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-head-tags) | 🔧 | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-duplicate-i18n-locales`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-i18n-locales) | 🔧 💡 | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-duplicate-navbar-item-destinations`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-navbar-item-destinations) | 💡 | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-duplicate-navbar-item-labels`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-navbar-item-labels) | — | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-duplicate-plugin-pwa-head-tags`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-plugin-pwa-head-tags) | 🔧 | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-duplicate-sidebar-doc-ids`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-sidebar-doc-ids) | 💡 | [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-duplicate-theme-classic-custom-css`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-theme-classic-custom-css) | 🔧 | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-duplicate-theme-config-metadata-keys`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-duplicate-theme-config-metadata-keys) | 🔧 | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-empty-config-link-destinations`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-empty-config-link-destinations) | 🔧 | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-empty-config-link-labels`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-empty-config-link-labels) | 🔧 | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-empty-footer-link-columns`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-empty-footer-link-columns) | 🔧 | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-empty-footer-link-items`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-empty-footer-link-items) | 🔧 | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-empty-head-tags`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-empty-head-tags) | 🔧 | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-empty-navbar-dropdown-items`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-empty-navbar-dropdown-items) | 🔧 | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-empty-navbar-item-objects`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-empty-navbar-item-objects) | 🔧 | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-empty-sidebar-categories`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-empty-sidebar-categories) | 🔧 | [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-empty-theme-classic-custom-css`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-empty-theme-classic-custom-css) | 🔧 | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-empty-theme-config-metadata`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-empty-theme-config-metadata) | 🔧 | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-ignored-site-validations`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-ignored-site-validations) | 🔧 | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-mixed-sidebar-link-kinds`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-mixed-sidebar-link-kinds) | 💡 | [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-page-css-module-imports-in-components`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-page-css-module-imports-in-components) | — | [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-redundant-social-card-metadata`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-redundant-social-card-metadata) | 🔧 | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-search-link-without-search-provider`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-search-link-without-search-provider) | — | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-search-page-link-when-search-page-disabled`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-search-page-link-when-search-page-disabled) | — | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-search-page-path-conflict`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-search-page-path-conflict) | — | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-svg-social-card-image`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-svg-social-card-image) | — | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-unknown-i18n-locale-configs`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-unknown-i18n-locale-configs) | — | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-use-base-url-for-internal-link-components`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-use-base-url-for-internal-link-components) | 🔧 | [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`no-useless-collapsed-sidebar-categories`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-useless-collapsed-sidebar-categories) | 🔧 | [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`prefer-config-satisfies`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-config-satisfies) | 🔧 | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`prefer-css-modules-in-site-src`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-css-modules-in-site-src) | — | [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`prefer-head-tag-attributes-object`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-head-tag-attributes-object) | 🔧 | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`prefer-href-for-external-link-components`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-href-for-external-link-components) | 🔧 | [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`prefer-href-for-external-links`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-href-for-external-links) | 🔧 | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`prefer-i18n-default-locale-first`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-i18n-default-locale-first) | 🔧 💡 | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`prefer-sidebars-config-satisfies`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-sidebars-config-satisfies) | 🔧 | [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`prefer-theme-config-docsearch`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-theme-config-docsearch) | 🔧 | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`prefer-theme-config-metadata-name-for-twitter-tags`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-theme-config-metadata-name-for-twitter-tags) | 🔧 | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`prefer-theme-config-metadata-property-for-og-tags`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-theme-config-metadata-property-for-og-tags) | 🔧 | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`prefer-to-for-internal-link-components`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-to-for-internal-link-components) | 🔧 | [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`prefer-to-for-internal-links`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-to-for-internal-links) | 🔧 | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`prefer-use-base-url-for-static-assets`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-use-base-url-for-static-assets) | 💡 | [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-base-url-issue-banner-enabled`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-base-url-issue-banner-enabled) | 🔧 | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-base-url-slashes`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-base-url-slashes) | 🔧 | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-config-link-content`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-config-link-content) | — | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-config-link-destination`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-config-link-destination) | — | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-default-export-pages`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-default-export-pages) | — | [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-doc-sidebar-link-type`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-doc-sidebar-link-type) | 🔧 | [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-docsearch-ask-ai-assistant-id`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-docsearch-ask-ai-assistant-id) | — | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-docsearch-theme-when-configured`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-docsearch-theme-when-configured) | — | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-docusaurus-faster-package-installed`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-docusaurus-faster-package-installed) | — | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-footer-link-column-items`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-footer-link-column-items) | — | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-footer-link-column-title`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-footer-link-column-title) | — | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-generated-index-link-type`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-generated-index-link-type) | 🔧 | [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-head-tag-attributes-when-no-inner-html`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-head-tag-attributes-when-no-inner-html) | — | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-head-tag-content-or-attributes`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-head-tag-content-or-attributes) | — | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-head-tag-tag-name`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-head-tag-tag-name) | 💡 | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-i18n-default-locale-in-locales`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-i18n-default-locale-in-locales) | 🔧 💡 | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-markdown-mermaid-when-theme-mermaid-enabled`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-markdown-mermaid-when-theme-mermaid-enabled) | 🔧 | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-navbar-doc-item-doc-id`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-navbar-doc-item-doc-id) | — | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-navbar-doc-sidebar-item-sidebar-id`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-navbar-doc-sidebar-item-sidebar-id) | — | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-navbar-docs-version-item-to`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-navbar-docs-version-item-to) | — | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-navbar-dropdown-items`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-navbar-dropdown-items) | — | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-navbar-dropdown-label`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-navbar-dropdown-label) | — | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-navbar-html-item-value`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-navbar-html-item-value) | — | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-pages-plugin-excludes`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-pages-plugin-excludes) | 🔧 | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-plugin-pwa-debug`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-plugin-pwa-debug) | — | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-plugin-pwa-head-manifest`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-plugin-pwa-head-manifest) | — | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-plugin-pwa-head-theme-color`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-plugin-pwa-head-theme-color) | — | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-plugin-pwa-offline-mode-activation-strategies`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-plugin-pwa-offline-mode-activation-strategies) | — | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-plugin-pwa-setup`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-plugin-pwa-setup) | — | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-rspack-bundler-for-faster-persistent-cache`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-rspack-bundler-for-faster-persistent-cache) | 🔧 | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-search-provider-package-installed`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-search-provider-package-installed) | — | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-sidebar-category-items`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-sidebar-category-items) | — | [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-sidebar-category-label`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-sidebar-category-label) | — | [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-sidebar-category-type`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-sidebar-category-type) | 🔧 | [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-sidebar-item-key-for-duplicate-labels`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-sidebar-item-key-for-duplicate-labels) | — | [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-site-config-fields`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-site-config-fields) | — | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-site-url-origin`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-site-url-origin) | 🔧 💡 | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-theme-classic-custom-css-files-exist`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-theme-classic-custom-css-files-exist) | — | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-theme-classic-package-installed`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-theme-classic-package-installed) | — | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-theme-config-announcement-bar-id`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-theme-config-announcement-bar-id) | — | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-theme-config-color-mode-object`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-theme-config-color-mode-object) | 💡 | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-theme-config-docsearch-config`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-theme-config-docsearch-config) | — | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-theme-config-image`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-theme-config-image) | — | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-theme-live-codeblock-package-installed`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-theme-live-codeblock-package-installed) | — | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-theme-live-codeblock-when-live-codeblock-configured`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-theme-live-codeblock-when-live-codeblock-configured) | 💡 | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-theme-mermaid-package-installed`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-theme-mermaid-package-installed) | — | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-theme-mermaid-when-markdown-mermaid-enabled`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-theme-mermaid-when-markdown-mermaid-enabled) | 💡 | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-theme-search-algolia-package-installed`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-theme-search-algolia-package-installed) | — | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-trailing-slash-explicit`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-trailing-slash-explicit) | 🔧 💡 | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`require-v4-remove-legacy-post-build-head-attribute-for-ssg-worker-threads`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-v4-remove-legacy-post-build-head-attribute-for-ssg-worker-threads) | 🔧 | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`validate-live-codeblock-playground-position`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/validate-live-codeblock-playground-position) | 💡 | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`validate-navbar-item-position`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/validate-navbar-item-position) | 🔧 💡 | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`validate-theme-config-announcement-bar-is-closeable`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/validate-theme-config-announcement-bar-is-closeable) | 🔧 💡 | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`validate-theme-config-color-mode-default-mode`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/validate-theme-config-color-mode-default-mode) | 🔧 💡 | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`validate-theme-config-color-mode-switch-flags`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/validate-theme-config-color-mode-switch-flags) | 🔧 💡 | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`validate-theme-config-footer-style`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/validate-theme-config-footer-style) | 🔧 💡 | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`validate-theme-config-metadata`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/validate-theme-config-metadata) | — | [🔵](./config.md) [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |
| [`validate-theme-config-navbar-style`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/validate-theme-config-navbar-style) | 🔧 💡 | [🔵](./config.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./experimental.md) |

### Opt-in rules

These rules are intentionally outside the preset ladder. Some are enabled through opt-in content configs; others are direct rule opt-ins only.

- `Config surface` legend:
  - [📝](../guides/config-surfaces.md) — [`docusaurus2.configs.content`](../guides/config-surfaces.md)
  - [🧭](../guides/config-surfaces.md) — [`docusaurus2.configs["strict-mdx-upgrade"]`](../guides/config-surfaces.md)

| Rule | Fix | Config surface |
| --- | :-: | --- |
| [`local-search-will-not-work-in-dev`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/local-search-will-not-work-in-dev) | — | direct rule opt-in only |
| [`no-deprecated-admonition-title-syntax`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-deprecated-admonition-title-syntax) | 🔧 | [📝](../guides/config-surfaces.md) [`docusaurus2.configs.content`](../guides/config-surfaces.md) [🧭](../guides/config-surfaces.md) [`docusaurus2.configs["strict-mdx-upgrade"]`](../guides/config-surfaces.md) |
| [`no-deprecated-heading-id-syntax`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-deprecated-heading-id-syntax) | 🔧 | [📝](../guides/config-surfaces.md) [`docusaurus2.configs.content`](../guides/config-surfaces.md) [🧭](../guides/config-surfaces.md) [`docusaurus2.configs["strict-mdx-upgrade"]`](../guides/config-surfaces.md) |
| [`no-deprecated-html-comments-in-mdx`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-deprecated-html-comments-in-mdx) | 🔧 | [📝](../guides/config-surfaces.md) [`docusaurus2.configs.content`](../guides/config-surfaces.md) [🧭](../guides/config-surfaces.md) [`docusaurus2.configs["strict-mdx-upgrade"]`](../guides/config-surfaces.md) |
| [`require-mermaid-elk-package-installed`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-mermaid-elk-package-installed) | — | [📝](../guides/config-surfaces.md) [`docusaurus2.configs.content`](../guides/config-surfaces.md) |
