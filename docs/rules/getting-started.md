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

- `no-conflicting-config-link-props`
- `no-conflicting-config-link-content-props`
- `no-deprecated-on-broken-markdown-links`
- `no-duplicate-sidebar-doc-ids`
- `no-conflicting-footer-html-item-props`
- `no-conflicting-navbar-doc-item-props`
- `no-conflicting-navbar-doc-sidebar-item-props`
- `no-duplicate-i18n-locales`
- `no-duplicate-plugin-pwa-head-tags`
- `no-ignored-site-validations`
- `no-mixed-sidebar-link-kinds`
- `no-redundant-social-card-metadata`
- `no-svg-social-card-image`
- `no-use-base-url-for-internal-link-components`
- `no-useless-collapsed-sidebar-categories`
- `prefer-config-satisfies`
- `prefer-href-for-external-link-components`
- `prefer-href-for-external-links`
- `prefer-i18n-default-locale-first`
- `prefer-sidebars-config-satisfies`
- `prefer-to-for-internal-link-components`
- `prefer-to-for-internal-links`
- `prefer-use-base-url-for-static-assets`
- `require-base-url-issue-banner-enabled`
- `require-base-url-slashes`
- `require-i18n-default-locale-in-locales`
- `require-config-link-content`
- `require-config-link-destination`
- `require-footer-link-column-items`
- `require-footer-link-column-title`
- `require-plugin-pwa-debug`
- `require-plugin-pwa-head-manifest`
- `require-plugin-pwa-head-theme-color`
- `require-plugin-pwa-offline-mode-activation-strategies`
- `require-plugin-pwa-setup`
- `require-site-config-fields`
- `require-site-url-origin`
- `require-trailing-slash-explicit`
- `require-navbar-doc-item-doc-id`
- `require-navbar-doc-sidebar-item-sidebar-id`
- `require-navbar-docs-version-item-to`
- `require-navbar-dropdown-items`
- `require-navbar-dropdown-label`
- `require-navbar-html-item-value`
- `require-sidebar-category-items`
- `require-sidebar-category-label`
- `require-doc-sidebar-link-type`
- `require-generated-index-link-type`
- `require-pages-plugin-excludes`
- `require-sidebar-category-type`
- `require-theme-config-image`
- `validate-theme-config-metadata`

The stricter presets also add:

- `prefer-css-modules-in-site-src`
- `no-page-css-module-imports-in-components`
- `require-default-export-pages`
- `require-plugin-pwa-setup`
- `require-site-config-fields`
- `require-site-url-origin`
- `require-trailing-slash-explicit`
- `require-theme-config-image`

## Choosing a preset

- Start with `recommended` if you want the default future upgrade path and the stable config/sidebar rules.
- Start with `config` if you want only Docusaurus config, themeConfig, navbar/footer, and plugin-setup enforcement.
- Start with `minimal` if you want the smallest baseline.
- Move to `recommended-type-checked` once you are ready for type-aware rules.
- Use `strict`, `all`, or `experimental` when you also want the stricter Docusaurus page-module and site-source CSS checks.

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

For stronger TypeDoc-only linting, pair this plugin with `eslint-plugin-typedoc` instead of expecting every TypeDoc concern to live here.

## Where to go next

- Read the [Overview](./overview.md) for the product direction.
- Compare presets in the [Preset index](./presets/index.md).
