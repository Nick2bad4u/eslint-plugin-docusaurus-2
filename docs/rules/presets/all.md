---
title: all
description: All stable rules preset for eslint-plugin-docusaurus-2.
---

# all

`all` is reserved for the full stable rule catalog.

## What it configures today

Today it contains the current full stable rule catalog:

- [`no-conflicting-config-link-props`](../no-conflicting-config-link-props.md)
- [`no-conflicting-config-link-content-props`](../no-conflicting-config-link-content-props.md)
- [`no-deprecated-on-broken-markdown-links`](../no-deprecated-on-broken-markdown-links.md)
- [`no-duplicate-i18n-locales`](../no-duplicate-i18n-locales.md)
- [`no-duplicate-navbar-item-labels`](../no-duplicate-navbar-item-labels.md)
- [`no-duplicate-plugin-pwa-head-tags`](../no-duplicate-plugin-pwa-head-tags.md)
- [`no-duplicate-sidebar-doc-ids`](../no-duplicate-sidebar-doc-ids.md)
- [`no-conflicting-footer-html-item-props`](../no-conflicting-footer-html-item-props.md)
- [`no-ignored-site-validations`](../no-ignored-site-validations.md)
- [`no-mixed-sidebar-link-kinds`](../no-mixed-sidebar-link-kinds.md)
- [`no-page-css-module-imports-in-components`](../no-page-css-module-imports-in-components.md)
- [`no-redundant-social-card-metadata`](../no-redundant-social-card-metadata.md)
- [`no-svg-social-card-image`](../no-svg-social-card-image.md)
- [`no-use-base-url-for-internal-link-components`](../no-use-base-url-for-internal-link-components.md)
- [`no-useless-collapsed-sidebar-categories`](../no-useless-collapsed-sidebar-categories.md)
- [`prefer-config-satisfies`](../prefer-config-satisfies.md)
- [`prefer-css-modules-in-site-src`](../prefer-css-modules-in-site-src.md)
- [`prefer-href-for-external-link-components`](../prefer-href-for-external-link-components.md)
- [`prefer-href-for-external-links`](../prefer-href-for-external-links.md)
- [`prefer-i18n-default-locale-first`](../prefer-i18n-default-locale-first.md)
- [`prefer-sidebars-config-satisfies`](../prefer-sidebars-config-satisfies.md)
- [`prefer-to-for-internal-link-components`](../prefer-to-for-internal-link-components.md)
- [`prefer-to-for-internal-links`](../prefer-to-for-internal-links.md)
- [`prefer-use-base-url-for-static-assets`](../prefer-use-base-url-for-static-assets.md)
- [`require-config-link-content`](../require-config-link-content.md)
- [`require-config-link-destination`](../require-config-link-destination.md)
- [`require-default-export-pages`](../require-default-export-pages.md)
- [`require-footer-link-column-items`](../require-footer-link-column-items.md)
- [`require-footer-link-column-title`](../require-footer-link-column-title.md)
- [`require-base-url-issue-banner-enabled`](../require-base-url-issue-banner-enabled.md)
- [`require-base-url-slashes`](../require-base-url-slashes.md)
- [`require-i18n-default-locale-in-locales`](../require-i18n-default-locale-in-locales.md)
- [`require-plugin-pwa-debug`](../require-plugin-pwa-debug.md)
- [`require-plugin-pwa-head-manifest`](../require-plugin-pwa-head-manifest.md)
- [`require-plugin-pwa-head-theme-color`](../require-plugin-pwa-head-theme-color.md)
- [`require-plugin-pwa-offline-mode-activation-strategies`](../require-plugin-pwa-offline-mode-activation-strategies.md)
- [`require-plugin-pwa-setup`](../require-plugin-pwa-setup.md)
- [`require-site-config-fields`](../require-site-config-fields.md)
- [`require-site-url-origin`](../require-site-url-origin.md)
- [`require-trailing-slash-explicit`](../require-trailing-slash-explicit.md)
- [`require-navbar-doc-item-doc-id`](../require-navbar-doc-item-doc-id.md)
- [`require-navbar-doc-sidebar-item-sidebar-id`](../require-navbar-doc-sidebar-item-sidebar-id.md)
- [`require-navbar-docs-version-item-to`](../require-navbar-docs-version-item-to.md)
- [`require-navbar-dropdown-items`](../require-navbar-dropdown-items.md)
- [`require-navbar-dropdown-label`](../require-navbar-dropdown-label.md)
- [`require-navbar-html-item-value`](../require-navbar-html-item-value.md)
- [`validate-navbar-item-position`](../validate-navbar-item-position.md)
- [`require-sidebar-category-items`](../require-sidebar-category-items.md)
- [`require-sidebar-category-label`](../require-sidebar-category-label.md)
- [`require-doc-sidebar-link-type`](../require-doc-sidebar-link-type.md)
- [`require-generated-index-link-type`](../require-generated-index-link-type.md)
- [`require-pages-plugin-excludes`](../require-pages-plugin-excludes.md)
- [`require-sidebar-category-type`](../require-sidebar-category-type.md)
- [`require-theme-config-image`](../require-theme-config-image.md)
- [`validate-theme-config-metadata`](../validate-theme-config-metadata.md)

That means `all` includes the broadly applicable config/sidebar rules plus the stricter Docusaurus page-module and site-source CSS architecture rules.

## Flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.all];
```

## When to use it

Use `all` only if you explicitly want every future stable rule as soon as it becomes part of the published catalog.
