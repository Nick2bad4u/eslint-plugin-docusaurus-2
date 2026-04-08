---
title: strict
description: Strict preset for eslint-plugin-docusaurus-2.
---

# strict

`strict` is the future stricter tier for repositories that want more opinionated Docusaurus-site enforcement.

## What it configures today

`strict` includes all of `recommended`, plus the stricter Docusaurus page-module and site-source CSS rules:

- `no-conflicting-config-link-props`
- `no-duplicate-sidebar-doc-ids`
- `no-mixed-sidebar-link-kinds`
- `no-redundant-social-card-metadata`
- `no-svg-social-card-image`
- `no-use-base-url-for-internal-link-components`
- `prefer-css-modules-in-site-src`
- `no-page-css-module-imports-in-components`
- `prefer-use-base-url-for-static-assets`
- `require-default-export-pages`
- `require-plugin-pwa-setup`
- `require-pages-plugin-excludes`
- `require-site-config-fields`
- `require-theme-config-image`

The recommended link-semantics rules also remain enabled here, so `strict` covers both config/sidebar correctness and component-level routing conventions.

It also keeps the typed parser baseline for future stricter Docusaurus checks.

## Flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.strict];
```

## When to use it

Use `strict` if you are intentionally adopting the strongest future tier and are comfortable with that preset becoming more opinionated over time.
