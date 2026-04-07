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

- `no-deprecated-on-broken-markdown-links`
- `no-ignored-site-validations`
- `no-useless-collapsed-sidebar-categories`
- `prefer-config-satisfies`
- `prefer-sidebars-config-satisfies`
- `prefer-to-for-internal-links`
- `require-doc-sidebar-link-type`
- `require-generated-index-link-type`

The stricter presets also add:

- `prefer-css-modules-in-site-src`
- `no-page-css-module-imports-in-components`
- `require-default-export-pages`

## Choosing a preset

- Start with `recommended` if you want the default future upgrade path and the stable config/sidebar rules.
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

## Where to go next

- Read the [Overview](./overview.md) for the product direction.
- Compare presets in the [Preset index](./presets/index.md).
