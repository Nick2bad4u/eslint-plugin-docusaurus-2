---
title: recommended
description: Default preset for eslint-plugin-docusaurus-2.
---

# recommended

`recommended` is the default preset for most repositories that want the stable public configuration surface of `eslint-plugin-docusaurus-2`.

## What it configures today

It includes the same parser and plugin registration behavior as `minimal`, plus the stable config/sidebar rules that are broadly useful across Docusaurus sites:

- [`no-conflicting-config-link-props`](../no-conflicting-config-link-props.md)
- [`no-conflicting-config-link-content-props`](../no-conflicting-config-link-content-props.md)
- [`no-deprecated-on-broken-markdown-links`](../no-deprecated-on-broken-markdown-links.md)
- [`no-conflicting-footer-html-item-props`](../no-conflicting-footer-html-item-props.md)
- [`no-ignored-site-validations`](../no-ignored-site-validations.md)
- [`no-useless-collapsed-sidebar-categories`](../no-useless-collapsed-sidebar-categories.md)
- [`no-use-base-url-for-internal-link-components`](../no-use-base-url-for-internal-link-components.md)
- [`prefer-config-satisfies`](../prefer-config-satisfies.md)
- [`prefer-href-for-external-link-components`](../prefer-href-for-external-link-components.md)
- [`prefer-href-for-external-links`](../prefer-href-for-external-links.md)
- [`prefer-sidebars-config-satisfies`](../prefer-sidebars-config-satisfies.md)
- [`prefer-to-for-internal-link-components`](../prefer-to-for-internal-link-components.md)
- [`prefer-to-for-internal-links`](../prefer-to-for-internal-links.md)
- [`require-config-link-content`](../require-config-link-content.md)
- [`require-config-link-destination`](../require-config-link-destination.md)
- [`require-footer-link-column-items`](../require-footer-link-column-items.md)
- [`require-footer-link-column-title`](../require-footer-link-column-title.md)
- [`require-plugin-pwa-head-manifest`](../require-plugin-pwa-head-manifest.md)
- [`require-plugin-pwa-head-theme-color`](../require-plugin-pwa-head-theme-color.md)
- [`require-navbar-doc-item-doc-id`](../require-navbar-doc-item-doc-id.md)
- [`require-navbar-doc-sidebar-item-sidebar-id`](../require-navbar-doc-sidebar-item-sidebar-id.md)
- [`require-navbar-docs-version-item-to`](../require-navbar-docs-version-item-to.md)
- [`require-navbar-dropdown-items`](../require-navbar-dropdown-items.md)
- [`require-navbar-dropdown-label`](../require-navbar-dropdown-label.md)
- [`require-navbar-html-item-value`](../require-navbar-html-item-value.md)
- [`require-sidebar-category-items`](../require-sidebar-category-items.md)
- [`require-sidebar-category-label`](../require-sidebar-category-label.md)
- [`require-doc-sidebar-link-type`](../require-doc-sidebar-link-type.md)
- [`require-generated-index-link-type`](../require-generated-index-link-type.md)
- [`require-sidebar-category-type`](../require-sidebar-category-type.md)
- [`validate-theme-config-metadata`](../validate-theme-config-metadata.md)

These rules cover the most common Docusaurus config mistakes without imposing the stricter site-source CSS architecture checks from the broader presets.

If you only want the `docusaurus.config.*`-focused subset, use [`config`](./config.md) instead of the broader default rollout tier.

## Flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## When to use it

Use `recommended` if you want the normal adoption path and do not need type-aware rules yet.
