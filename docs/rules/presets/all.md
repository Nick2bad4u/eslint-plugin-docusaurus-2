---
title: all
description: All stable rules preset for eslint-plugin-docusaurus-2.
---

# all

`all` is reserved for the full stable rule catalog.

## What it configures today

Today it contains the current full stable rule catalog:

- `no-conflicting-config-link-props`
- `no-deprecated-on-broken-markdown-links`
- `no-duplicate-sidebar-doc-ids`
- `no-ignored-site-validations`
- `no-mixed-sidebar-link-kinds`
- `no-page-css-module-imports-in-components`
- `no-redundant-social-card-metadata`
- `no-svg-social-card-image`
- `no-use-base-url-for-internal-link-components`
- `no-useless-collapsed-sidebar-categories`
- `prefer-config-satisfies`
- `prefer-css-modules-in-site-src`
- `prefer-href-for-external-links`
- `prefer-sidebars-config-satisfies`
- `prefer-to-for-internal-link-components`
- `prefer-to-for-internal-links`
- `prefer-use-base-url-for-static-assets`
- `require-default-export-pages`
- `require-doc-sidebar-link-type`
- `require-generated-index-link-type`
- `require-pages-plugin-excludes`
- `require-pages-plugin-excludes`

That means `all` includes the broadly applicable config/sidebar rules plus the stricter Docusaurus page-module and site-source CSS architecture rules.

## Flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.all];
```

## When to use it

Use `all` only if you explicitly want every future stable rule as soon as it becomes part of the published catalog.
