---
title: all
description: All stable rules preset for eslint-plugin-docusaurus-2.
---

# all

`all` is reserved for the full stable rule catalog.

## What it configures today

Today it contains the current full stable rule catalog:

- `no-deprecated-on-broken-markdown-links`
- `no-ignored-site-validations`
- `no-page-css-module-imports-in-components`
- `no-useless-collapsed-sidebar-categories`
- `prefer-config-satisfies`
- `prefer-css-modules-in-site-src`
- `prefer-sidebars-config-satisfies`
- `prefer-to-for-internal-links`
- `require-default-export-pages`
- `require-doc-sidebar-link-type`
- `require-generated-index-link-type`

That means `all` includes the broadly applicable config/sidebar rules plus the stricter Docusaurus page-module and site-source CSS architecture rules.

## Flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.all];
```

## When to use it

Use `all` only if you explicitly want every future stable rule as soon as it becomes part of the published catalog.
