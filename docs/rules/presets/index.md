---
title: Presets
description: Preset reference for eslint-plugin-docusaurus-2.
---

# Presets

`eslint-plugin-docusaurus-2` currently exposes six flat-config presets:

| Preset                                                         | Type-aware | Summary                                       |
| -------------------------------------------------------------- | ---------- | --------------------------------------------- |
| [🟢 `minimal`](./minimal.md)                                   | No         | Smallest future-ready baseline.               |
| [🟡 `recommended`](./recommended.md)                           | No         | Default starting point for most repositories. |
| [🟠 `recommended-type-checked`](./recommended-type-checked.md) | Yes        | Recommended plus typed parser setup.          |
| [🔴 `strict`](./strict.md)                                     | Yes        | Stricter path for mature sites.               |
| [🟣 `all`](./all.md)                                           | Yes        | Every stable rule once the catalog expands.   |
| [🧪 `experimental`](./experimental.md)                         | Yes        | Future experimental rule candidates.          |

## Current rule count

The plugin currently ships **6 rules**.

- `no-ignored-site-validations`
- `no-page-css-module-imports-in-components`
- `prefer-config-satisfies`
- `prefer-css-modules-in-site-src`
- `prefer-to-for-internal-links`
- `require-generated-index-link-type`

The preset ladder still matters because it defines how broader future Docusaurus rule sets will roll out.

## Rule matrix

This matrix is the canonical place to show how the current Docusaurus rule catalog maps onto each preset tier.

| Rule                                                                                                                                                      |  🟢 |  🟡 |  🟠 |  🔴 |  🟣 |  🧪 |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | :-: | :-: | :-: | :-: | :-: | :-: |
| [`no-ignored-site-validations`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-ignored-site-validations)                           |  —  |  ✅  |  ✅  |  ✅  |  ✅  |  ✅  |
| [`no-page-css-module-imports-in-components`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-page-css-module-imports-in-components) |  —  |  —  |  —  |  ✅  |  ✅  |  ✅  |
| [`prefer-config-satisfies`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-config-satisfies)                                   |  —  |  ✅  |  ✅  |  ✅  |  ✅  |  ✅  |
| [`prefer-css-modules-in-site-src`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-css-modules-in-site-src)                     |  —  |  —  |  —  |  ✅  |  ✅  |  ✅  |
| [`prefer-to-for-internal-links`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/prefer-to-for-internal-links)                         |  —  |  ✅  |  ✅  |  ✅  |  ✅  |  ✅  |
| [`require-generated-index-link-type`](https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-generated-index-link-type)               |  —  |  ✅  |  ✅  |  ✅  |  ✅  |  ✅  |
