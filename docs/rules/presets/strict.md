---
title: strict
description: Strict preset for eslint-plugin-docusaurus-2.
---

# strict

`strict` is the future stricter tier for repositories that want more opinionated Docusaurus-site enforcement.

## What it configures today

`strict` includes all of `recommended`, plus the stricter Docusaurus page-module and site-source CSS rules:

- [`no-conflicting-config-link-props`](../no-conflicting-config-link-props.md)
- [`no-empty-config-link-destinations`](../no-empty-config-link-destinations.md)
- [`no-empty-config-link-labels`](../no-empty-config-link-labels.md)
- [`no-conflicting-theme-config-metadata-keys`](../no-conflicting-theme-config-metadata-keys.md)
- [`no-empty-head-tags`](../no-empty-head-tags.md)
- [`no-duplicate-footer-column-titles`](../no-duplicate-footer-column-titles.md)
- [`no-duplicate-footer-link-item-destinations`](../no-duplicate-footer-link-item-destinations.md)
- [`no-duplicate-footer-link-item-labels`](../no-duplicate-footer-link-item-labels.md)
- [`no-duplicate-head-tags`](../no-duplicate-head-tags.md)
- [`no-duplicate-navbar-item-destinations`](../no-duplicate-navbar-item-destinations.md)
- [`no-duplicate-i18n-locales`](../no-duplicate-i18n-locales.md)
- [`no-duplicate-navbar-item-labels`](../no-duplicate-navbar-item-labels.md)
- [`no-duplicate-plugin-pwa-head-tags`](../no-duplicate-plugin-pwa-head-tags.md)
- [`no-duplicate-theme-config-metadata-keys`](../no-duplicate-theme-config-metadata-keys.md)
- [`no-empty-footer-link-columns`](../no-empty-footer-link-columns.md)
- [`no-empty-theme-config-metadata`](../no-empty-theme-config-metadata.md)
- [`no-empty-navbar-dropdown-items`](../no-empty-navbar-dropdown-items.md)
- [`no-empty-navbar-item-objects`](../no-empty-navbar-item-objects.md)
- [`no-duplicate-sidebar-doc-ids`](../no-duplicate-sidebar-doc-ids.md)
- [`no-empty-sidebar-categories`](../no-empty-sidebar-categories.md)
- [`no-mixed-sidebar-link-kinds`](../no-mixed-sidebar-link-kinds.md)
- [`no-redundant-social-card-metadata`](../no-redundant-social-card-metadata.md)
- [`no-svg-social-card-image`](../no-svg-social-card-image.md)
- [`no-use-base-url-for-internal-link-components`](../no-use-base-url-for-internal-link-components.md)
- [`prefer-css-modules-in-site-src`](../prefer-css-modules-in-site-src.md)
- [`prefer-head-tag-attributes-object`](../prefer-head-tag-attributes-object.md)
- [`prefer-i18n-default-locale-first`](../prefer-i18n-default-locale-first.md)
- [`prefer-theme-config-metadata-name-for-twitter-tags`](../prefer-theme-config-metadata-name-for-twitter-tags.md)
- [`prefer-theme-config-metadata-property-for-og-tags`](../prefer-theme-config-metadata-property-for-og-tags.md)
- [`no-page-css-module-imports-in-components`](../no-page-css-module-imports-in-components.md)
- [`prefer-use-base-url-for-static-assets`](../prefer-use-base-url-for-static-assets.md)
- [`require-default-export-pages`](../require-default-export-pages.md)
- [`require-head-tag-attributes-when-no-inner-html`](../require-head-tag-attributes-when-no-inner-html.md)
- [`require-head-tag-tag-name`](../require-head-tag-tag-name.md)
- [`require-theme-config-color-mode-object`](../require-theme-config-color-mode-object.md)
- [`validate-theme-config-color-mode-default-mode`](../validate-theme-config-color-mode-default-mode.md)
- [`validate-theme-config-color-mode-switch-flags`](../validate-theme-config-color-mode-switch-flags.md)
- [`no-conflicting-theme-config-color-mode-flags`](../no-conflicting-theme-config-color-mode-flags.md)
- [`require-theme-config-announcement-bar-id`](../require-theme-config-announcement-bar-id.md)
- [`validate-theme-config-announcement-bar-is-closeable`](../validate-theme-config-announcement-bar-is-closeable.md)
- [`require-base-url-issue-banner-enabled`](../require-base-url-issue-banner-enabled.md)
- [`require-base-url-slashes`](../require-base-url-slashes.md)
- [`require-i18n-default-locale-in-locales`](../require-i18n-default-locale-in-locales.md)
- [`require-plugin-pwa-debug`](../require-plugin-pwa-debug.md)
- [`require-plugin-pwa-offline-mode-activation-strategies`](../require-plugin-pwa-offline-mode-activation-strategies.md)
- [`require-plugin-pwa-setup`](../require-plugin-pwa-setup.md)
- [`require-pages-plugin-excludes`](../require-pages-plugin-excludes.md)
- [`require-site-config-fields`](../require-site-config-fields.md)
- [`require-site-url-origin`](../require-site-url-origin.md)
- [`require-trailing-slash-explicit`](../require-trailing-slash-explicit.md)
- [`require-theme-config-image`](../require-theme-config-image.md)
- [`validate-navbar-item-position`](../validate-navbar-item-position.md)

The recommended link-semantics rules also remain enabled here, so `strict` covers both config/sidebar correctness and component-level routing conventions.

If you only want Docusaurus config/theme/plugin enforcement without the broader page-module and CSS architecture rules, use [`config`](./config.md) instead.

## Flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.strict];
```

## When to use it

Use `strict` if you are intentionally adopting the strongest future tier and are comfortable with that preset becoming more opinionated over time.
