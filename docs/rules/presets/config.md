---
title: config
description: Config-focused preset for eslint-plugin-docusaurus-2.
---

# config

`config` is the focused preset for repositories that want Docusaurus config, themeConfig, navbar/footer, and plugin-setup enforcement without bringing in sidebar, page-module, or site-source architecture rules.

## What it configures today

`config` includes the Docusaurus rules that primarily target `docusaurus.config.*` and its nested plugin/theme configuration surfaces:

- [`no-conflicting-config-link-content-props`](../no-conflicting-config-link-content-props.md)
- [`no-conflicting-config-link-props`](../no-conflicting-config-link-props.md)
- [`no-conflicting-footer-html-item-props`](../no-conflicting-footer-html-item-props.md)
- [`no-deprecated-on-broken-markdown-links`](../no-deprecated-on-broken-markdown-links.md)
- [`no-ignored-site-validations`](../no-ignored-site-validations.md)
- [`no-redundant-social-card-metadata`](../no-redundant-social-card-metadata.md)
- [`no-svg-social-card-image`](../no-svg-social-card-image.md)
- [`prefer-config-satisfies`](../prefer-config-satisfies.md)
- [`prefer-href-for-external-links`](../prefer-href-for-external-links.md)
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
- [`require-pages-plugin-excludes`](../require-pages-plugin-excludes.md)
- [`require-plugin-pwa-setup`](../require-plugin-pwa-setup.md)
- [`require-site-config-fields`](../require-site-config-fields.md)
- [`require-theme-config-image`](../require-theme-config-image.md)
- [`validate-theme-config-metadata`](../validate-theme-config-metadata.md)

That makes it the best fit for teams that want global Docusaurus config correctness first, before they adopt broader site-source or sidebar enforcement.

## Flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.config];
```

## When to use it

Use `config` when you want a focused Docusaurus config-and-theme baseline without pulling in sidebar-only rules or the broader page/CSS architecture rules from `strict`.
