---
title: Getting Started
description: Enable eslint-plugin-docusaurus-2 in Flat Config.
---

# Getting Started

Install the plugin and TypeScript:

```bash
npm install --save-dev eslint-plugin-docusaurus-2 typescript
```

Enable one preset in your flat config:

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## What the presets provide today

Every preset already gives you a stable plugin contract:

- `files: ["**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}"]`
- `@typescript-eslint/parser`
- `ecmaVersion: "latest"`
- `sourceType: "module"`
- plugin registration under `"docusaurus-2"`

The typed presets also enable `projectService: true` automatically.

The currently shipped rules start with the broadly useful config and sidebar checks, then add stricter page-module and site-source CSS architecture checks in the broader presets:

- [`no-conflicting-config-link-props`](./no-conflicting-config-link-props.md)
- [`no-conflicting-config-link-content-props`](./no-conflicting-config-link-content-props.md)
- [`no-empty-config-link-destinations`](./no-empty-config-link-destinations.md)
- [`no-empty-config-link-labels`](./no-empty-config-link-labels.md)
- [`no-conflicting-theme-config-metadata-keys`](./no-conflicting-theme-config-metadata-keys.md)
- [`no-deprecated-on-broken-markdown-links`](./no-deprecated-on-broken-markdown-links.md)
- [`no-empty-head-tags`](./no-empty-head-tags.md)
- [`no-duplicate-footer-column-titles`](./no-duplicate-footer-column-titles.md)
- [`no-duplicate-footer-link-item-destinations`](./no-duplicate-footer-link-item-destinations.md)
- [`no-duplicate-footer-link-item-labels`](./no-duplicate-footer-link-item-labels.md)
- [`no-duplicate-head-tags`](./no-duplicate-head-tags.md)
- [`no-duplicate-navbar-item-destinations`](./no-duplicate-navbar-item-destinations.md)
- [`no-duplicate-sidebar-doc-ids`](./no-duplicate-sidebar-doc-ids.md)
- [`no-conflicting-footer-html-item-props`](./no-conflicting-footer-html-item-props.md)
- [`no-conflicting-navbar-doc-item-props`](./no-conflicting-navbar-doc-item-props.md)
- [`no-conflicting-navbar-doc-sidebar-item-props`](./no-conflicting-navbar-doc-sidebar-item-props.md)
- [`no-duplicate-i18n-locales`](./no-duplicate-i18n-locales.md)
- [`no-duplicate-navbar-item-labels`](./no-duplicate-navbar-item-labels.md)
- [`no-duplicate-plugin-pwa-head-tags`](./no-duplicate-plugin-pwa-head-tags.md)
- [`no-duplicate-theme-config-metadata-keys`](./no-duplicate-theme-config-metadata-keys.md)
- [`no-empty-footer-link-columns`](./no-empty-footer-link-columns.md)
- [`no-ignored-site-validations`](./no-ignored-site-validations.md)
- [`no-empty-navbar-dropdown-items`](./no-empty-navbar-dropdown-items.md)
- [`no-empty-navbar-item-objects`](./no-empty-navbar-item-objects.md)
- [`no-empty-sidebar-categories`](./no-empty-sidebar-categories.md)
- [`no-empty-theme-config-metadata`](./no-empty-theme-config-metadata.md)
- [`no-mixed-sidebar-link-kinds`](./no-mixed-sidebar-link-kinds.md)
- [`no-redundant-social-card-metadata`](./no-redundant-social-card-metadata.md)
- [`no-svg-social-card-image`](./no-svg-social-card-image.md)
- [`no-use-base-url-for-internal-link-components`](./no-use-base-url-for-internal-link-components.md)
- [`no-useless-collapsed-sidebar-categories`](./no-useless-collapsed-sidebar-categories.md)
- [`prefer-config-satisfies`](./prefer-config-satisfies.md)
- [`prefer-href-for-external-link-components`](./prefer-href-for-external-link-components.md)
- [`prefer-href-for-external-links`](./prefer-href-for-external-links.md)
- [`prefer-head-tag-attributes-object`](./prefer-head-tag-attributes-object.md)
- [`prefer-i18n-default-locale-first`](./prefer-i18n-default-locale-first.md)
- [`prefer-theme-config-metadata-name-for-twitter-tags`](./prefer-theme-config-metadata-name-for-twitter-tags.md)
- [`prefer-theme-config-metadata-property-for-og-tags`](./prefer-theme-config-metadata-property-for-og-tags.md)
- [`prefer-sidebars-config-satisfies`](./prefer-sidebars-config-satisfies.md)
- [`prefer-to-for-internal-link-components`](./prefer-to-for-internal-link-components.md)
- [`prefer-to-for-internal-links`](./prefer-to-for-internal-links.md)
- [`prefer-use-base-url-for-static-assets`](./prefer-use-base-url-for-static-assets.md)
- [`require-base-url-issue-banner-enabled`](./require-base-url-issue-banner-enabled.md)
- [`require-base-url-slashes`](./require-base-url-slashes.md)
- [`require-i18n-default-locale-in-locales`](./require-i18n-default-locale-in-locales.md)
- [`require-config-link-content`](./require-config-link-content.md)
- [`require-config-link-destination`](./require-config-link-destination.md)
- [`require-footer-link-column-items`](./require-footer-link-column-items.md)
- [`require-footer-link-column-title`](./require-footer-link-column-title.md)
- [`require-head-tag-attributes-when-no-inner-html`](./require-head-tag-attributes-when-no-inner-html.md)
- [`require-head-tag-tag-name`](./require-head-tag-tag-name.md)
- [`require-theme-config-color-mode-object`](./require-theme-config-color-mode-object.md)
- [`validate-theme-config-color-mode-default-mode`](./validate-theme-config-color-mode-default-mode.md)
- [`validate-theme-config-color-mode-switch-flags`](./validate-theme-config-color-mode-switch-flags.md)
- [`no-conflicting-theme-config-color-mode-flags`](./no-conflicting-theme-config-color-mode-flags.md)
- [`require-theme-config-announcement-bar-id`](./require-theme-config-announcement-bar-id.md)
- [`validate-theme-config-announcement-bar-is-closeable`](./validate-theme-config-announcement-bar-is-closeable.md)
- [`require-plugin-pwa-debug`](./require-plugin-pwa-debug.md)
- [`require-plugin-pwa-head-manifest`](./require-plugin-pwa-head-manifest.md)
- [`require-plugin-pwa-head-theme-color`](./require-plugin-pwa-head-theme-color.md)
- [`require-plugin-pwa-offline-mode-activation-strategies`](./require-plugin-pwa-offline-mode-activation-strategies.md)
- [`require-plugin-pwa-setup`](./require-plugin-pwa-setup.md)
- [`require-site-config-fields`](./require-site-config-fields.md)
- [`require-site-url-origin`](./require-site-url-origin.md)
- [`require-trailing-slash-explicit`](./require-trailing-slash-explicit.md)
- [`require-navbar-doc-item-doc-id`](./require-navbar-doc-item-doc-id.md)
- [`require-navbar-doc-sidebar-item-sidebar-id`](./require-navbar-doc-sidebar-item-sidebar-id.md)
- [`require-navbar-docs-version-item-to`](./require-navbar-docs-version-item-to.md)
- [`require-navbar-dropdown-items`](./require-navbar-dropdown-items.md)
- [`require-navbar-dropdown-label`](./require-navbar-dropdown-label.md)
- [`require-navbar-html-item-value`](./require-navbar-html-item-value.md)
- [`validate-navbar-item-position`](./validate-navbar-item-position.md)
- [`require-sidebar-category-items`](./require-sidebar-category-items.md)
- [`require-sidebar-category-label`](./require-sidebar-category-label.md)
- [`require-doc-sidebar-link-type`](./require-doc-sidebar-link-type.md)
- [`require-generated-index-link-type`](./require-generated-index-link-type.md)
- [`require-pages-plugin-excludes`](./require-pages-plugin-excludes.md)
- [`require-sidebar-category-type`](./require-sidebar-category-type.md)
- [`require-theme-config-image`](./require-theme-config-image.md)
- [`validate-theme-config-metadata`](./validate-theme-config-metadata.md)

The stricter presets also add:

- [`prefer-css-modules-in-site-src`](./prefer-css-modules-in-site-src.md)
- [`no-page-css-module-imports-in-components`](./no-page-css-module-imports-in-components.md)
- [`require-default-export-pages`](./require-default-export-pages.md)
- [`require-plugin-pwa-setup`](./require-plugin-pwa-setup.md)
- [`require-site-config-fields`](./require-site-config-fields.md)
- [`require-site-url-origin`](./require-site-url-origin.md)
- [`require-trailing-slash-explicit`](./require-trailing-slash-explicit.md)
- [`require-theme-config-image`](./require-theme-config-image.md)

## Choosing a preset

- Start with [`recommended`](./presets/recommended.md) if you want the default future upgrade path and the stable config/sidebar rules.
- Start with [`config`](./presets/config.md) if you want only Docusaurus config, themeConfig, navbar/footer, and plugin-setup enforcement.
- Start with [`minimal`](./presets/minimal.md) if you want the smallest baseline.
- Move to [`recommended-type-checked`](./presets/recommended-type-checked.md) once you are ready for type-aware rules.
- Use [`strict`](./presets/strict.md), [`all`](./presets/all.md), or [`experimental`](./presets/experimental.md) when you also want the stricter Docusaurus page-module and site-source CSS checks.

## Manual scoped setup

If you prefer to spread a preset into your own file-scoped config object, you can do that too:

```ts
import tsParser from "@typescript-eslint/parser";
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [
    {
        files: ["**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                // Enable when you opt into a typed preset.
                // projectService: true,
            },
        },
        plugins: {
            "docusaurus-2": docusaurus2,
        },
        rules: {
            ...docusaurus2.configs.recommended.rules,
        },
    },
];
```

## Important expectation

The plugin still has a deliberately focused rule catalog.

That means you can adopt the public runtime and start with a focused Docusaurus-specific baseline instead of inheriting a large bundle of speculative rules.

For stronger TypeDoc-only linting, pair this plugin with [`eslint-plugin-typedoc`](https://www.npmjs.com/package/eslint-plugin-typedoc) instead of expecting every TypeDoc concern to live here.

## Where to go next

- Read the [Overview](./overview.md) for the product direction.
- Compare presets in the [Preset index](./presets/index.md).
