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
- [`no-empty-config-link-destinations`](../no-empty-config-link-destinations.md)
- [`no-empty-config-link-labels`](../no-empty-config-link-labels.md)
- [`no-conflicting-theme-config-metadata-keys`](../no-conflicting-theme-config-metadata-keys.md)
- [`no-conflicting-search-providers`](../no-conflicting-search-providers.md)
- [`no-search-link-without-search-provider`](../no-search-link-without-search-provider.md)
- [`no-search-page-path-conflict`](../no-search-page-path-conflict.md)
- [`no-conflicting-footer-html-item-props`](../no-conflicting-footer-html-item-props.md)
- [`no-deprecated-google-analytics`](../no-deprecated-google-analytics.md)
- [`no-deprecated-future-experimental-faster`](../no-deprecated-future-experimental-faster.md)
- [`no-deprecated-future-experimental-storage`](../no-deprecated-future-experimental-storage.md)
- [`no-deprecated-on-broken-markdown-links`](../no-deprecated-on-broken-markdown-links.md)
- [`no-empty-head-tags`](../no-empty-head-tags.md)
- [`no-duplicate-footer-column-titles`](../no-duplicate-footer-column-titles.md)
- [`no-duplicate-footer-link-item-destinations`](../no-duplicate-footer-link-item-destinations.md)
- [`no-duplicate-footer-link-item-labels`](../no-duplicate-footer-link-item-labels.md)
- [`no-duplicate-head-tags`](../no-duplicate-head-tags.md)
- [`no-duplicate-navbar-item-destinations`](../no-duplicate-navbar-item-destinations.md)
- [`no-duplicate-i18n-locales`](../no-duplicate-i18n-locales.md)
- [`no-duplicate-navbar-item-labels`](../no-duplicate-navbar-item-labels.md)
- [`no-duplicate-plugin-pwa-head-tags`](../no-duplicate-plugin-pwa-head-tags.md)
- [`no-duplicate-theme-classic-custom-css`](../no-duplicate-theme-classic-custom-css.md)
- [`no-duplicate-theme-config-metadata-keys`](../no-duplicate-theme-config-metadata-keys.md)
- [`no-empty-footer-link-columns`](../no-empty-footer-link-columns.md)
- [`no-ignored-site-validations`](../no-ignored-site-validations.md)
- [`no-empty-navbar-dropdown-items`](../no-empty-navbar-dropdown-items.md)
- [`no-empty-navbar-item-objects`](../no-empty-navbar-item-objects.md)
- [`no-empty-theme-classic-custom-css`](../no-empty-theme-classic-custom-css.md)
- [`no-empty-theme-config-metadata`](../no-empty-theme-config-metadata.md)
- [`no-redundant-social-card-metadata`](../no-redundant-social-card-metadata.md)
- [`no-svg-social-card-image`](../no-svg-social-card-image.md)
- [`prefer-config-satisfies`](../prefer-config-satisfies.md)
- [`prefer-href-for-external-links`](../prefer-href-for-external-links.md)
- [`prefer-head-tag-attributes-object`](../prefer-head-tag-attributes-object.md)
- [`prefer-i18n-default-locale-first`](../prefer-i18n-default-locale-first.md)
- [`prefer-theme-config-docsearch`](../prefer-theme-config-docsearch.md)
- [`prefer-theme-config-metadata-name-for-twitter-tags`](../prefer-theme-config-metadata-name-for-twitter-tags.md)
- [`prefer-theme-config-metadata-property-for-og-tags`](../prefer-theme-config-metadata-property-for-og-tags.md)
- [`prefer-to-for-internal-links`](../prefer-to-for-internal-links.md)
- [`require-config-link-content`](../require-config-link-content.md)
- [`require-config-link-destination`](../require-config-link-destination.md)
- [`require-footer-link-column-items`](../require-footer-link-column-items.md)
- [`require-footer-link-column-title`](../require-footer-link-column-title.md)
- [`require-head-tag-attributes-when-no-inner-html`](../require-head-tag-attributes-when-no-inner-html.md)
- [`require-head-tag-tag-name`](../require-head-tag-tag-name.md)
- [`require-theme-config-color-mode-object`](../require-theme-config-color-mode-object.md)
- [`require-theme-config-docsearch-config`](../require-theme-config-docsearch-config.md)
- [`validate-theme-config-color-mode-default-mode`](../validate-theme-config-color-mode-default-mode.md)
- [`validate-theme-config-color-mode-switch-flags`](../validate-theme-config-color-mode-switch-flags.md)
- [`no-conflicting-theme-config-color-mode-flags`](../no-conflicting-theme-config-color-mode-flags.md)
- [`require-theme-config-announcement-bar-id`](../require-theme-config-announcement-bar-id.md)
- [`require-theme-classic-custom-css-files-exist`](../require-theme-classic-custom-css-files-exist.md)
- [`require-theme-classic-package-installed`](../require-theme-classic-package-installed.md)
- [`require-docusaurus-faster-package-installed`](../require-docusaurus-faster-package-installed.md)
- [`validate-theme-config-announcement-bar-is-closeable`](../validate-theme-config-announcement-bar-is-closeable.md)
- [`require-base-url-issue-banner-enabled`](../require-base-url-issue-banner-enabled.md)
- [`require-base-url-slashes`](../require-base-url-slashes.md)
- [`require-i18n-default-locale-in-locales`](../require-i18n-default-locale-in-locales.md)
- [`require-plugin-pwa-debug`](../require-plugin-pwa-debug.md)
- [`require-plugin-pwa-head-manifest`](../require-plugin-pwa-head-manifest.md)
- [`require-plugin-pwa-head-theme-color`](../require-plugin-pwa-head-theme-color.md)
- [`require-plugin-pwa-offline-mode-activation-strategies`](../require-plugin-pwa-offline-mode-activation-strategies.md)
- [`require-navbar-doc-item-doc-id`](../require-navbar-doc-item-doc-id.md)
- [`require-navbar-doc-sidebar-item-sidebar-id`](../require-navbar-doc-sidebar-item-sidebar-id.md)
- [`require-navbar-docs-version-item-to`](../require-navbar-docs-version-item-to.md)
- [`require-navbar-dropdown-items`](../require-navbar-dropdown-items.md)
- [`require-navbar-dropdown-label`](../require-navbar-dropdown-label.md)
- [`require-navbar-html-item-value`](../require-navbar-html-item-value.md)
- [`require-markdown-mermaid-when-theme-mermaid-enabled`](../require-markdown-mermaid-when-theme-mermaid-enabled.md)
- [`validate-navbar-item-position`](../validate-navbar-item-position.md)
- [`require-pages-plugin-excludes`](../require-pages-plugin-excludes.md)
- [`require-plugin-pwa-setup`](../require-plugin-pwa-setup.md)
- [`require-site-config-fields`](../require-site-config-fields.md)
- [`require-site-url-origin`](../require-site-url-origin.md)
- [`require-trailing-slash-explicit`](../require-trailing-slash-explicit.md)
- [`require-theme-live-codeblock-package-installed`](../require-theme-live-codeblock-package-installed.mdx)
- [`require-theme-mermaid-package-installed`](../require-theme-mermaid-package-installed.md)
- [`require-theme-search-algolia-package-installed`](../require-theme-search-algolia-package-installed.md)
- [`require-search-provider-package-installed`](../require-search-provider-package-installed.md)
- [`require-rspack-bundler-for-faster-persistent-cache`](../require-rspack-bundler-for-faster-persistent-cache.md)
- [`require-v4-remove-legacy-post-build-head-attribute-for-ssg-worker-threads`](../require-v4-remove-legacy-post-build-head-attribute-for-ssg-worker-threads.md)

## Flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.config];
```

## When to use it

Use `config` when you want a focused Docusaurus config-and-theme baseline without pulling in sidebar-only rules or the broader page/CSS architecture rules from [`strict`](./strict.md).
