---
title: recommended
description: Default preset for eslint-plugin-docusaurus-2.
---

# recommended

`recommended` is the default preset for most repositories that want the stable public configuration surface of `eslint-plugin-docusaurus-2`.

## What it configures today

It includes the same parser and plugin registration behavior as `minimal`, plus the stable config/sidebar rules that are broadly useful across Docusaurus sites:

- `no-conflicting-config-link-props`
- `no-deprecated-on-broken-markdown-links`
- `no-ignored-site-validations`
- `no-redundant-social-card-metadata`
- `no-useless-collapsed-sidebar-categories`
- `no-use-base-url-for-internal-link-components`
- `prefer-config-satisfies`
- `prefer-href-for-external-links`
- `prefer-sidebars-config-satisfies`
- `prefer-to-for-internal-link-components`
- `prefer-to-for-internal-links`
- `require-doc-sidebar-link-type`
- `require-generated-index-link-type`

These rules cover the most common Docusaurus config mistakes without imposing the stricter site-source CSS architecture checks from the broader presets.

## Flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## When to use it

Use `recommended` if you want the normal adoption path and do not need type-aware rules yet.
