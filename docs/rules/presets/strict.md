---
title: strict
description: Strict preset for eslint-plugin-docusaurus-2.
---

# strict

`strict` is the future stricter tier for repositories that want more opinionated Docusaurus-site enforcement.

## What it configures today

`strict` includes all of `recommended`, plus the stricter Docusaurus page-module and site-source CSS rules:

- [`no-conflicting-config-link-props`](../no-conflicting-config-link-props.md)
- [`no-duplicate-sidebar-doc-ids`](../no-duplicate-sidebar-doc-ids.md)
- [`no-mixed-sidebar-link-kinds`](../no-mixed-sidebar-link-kinds.md)
- [`no-redundant-social-card-metadata`](../no-redundant-social-card-metadata.md)
- [`no-svg-social-card-image`](../no-svg-social-card-image.md)
- [`no-use-base-url-for-internal-link-components`](../no-use-base-url-for-internal-link-components.md)
- [`prefer-css-modules-in-site-src`](../prefer-css-modules-in-site-src.md)
- [`no-page-css-module-imports-in-components`](../no-page-css-module-imports-in-components.md)
- [`prefer-use-base-url-for-static-assets`](../prefer-use-base-url-for-static-assets.md)
- [`require-default-export-pages`](../require-default-export-pages.md)
- [`require-plugin-pwa-setup`](../require-plugin-pwa-setup.md)
- [`require-pages-plugin-excludes`](../require-pages-plugin-excludes.md)
- [`require-site-config-fields`](../require-site-config-fields.md)
- [`require-theme-config-image`](../require-theme-config-image.md)

The recommended link-semantics rules also remain enabled here, so `strict` covers both config/sidebar correctness and component-level routing conventions.

It also keeps the typed parser baseline for future stricter Docusaurus checks.

If you only want Docusaurus config/theme/plugin enforcement without the broader page-module and CSS architecture rules, use [`config`](./config.md) instead.

## Flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.strict];
```

## When to use it

Use `strict` if you are intentionally adopting the strongest future tier and are comfortable with that preset becoming more opinionated over time.
