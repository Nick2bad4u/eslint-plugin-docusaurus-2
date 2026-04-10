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

If you also want docs-content rules, add the opt-in content config separately:

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [
    docusaurus2.configs.recommended,
    docusaurus2.configs.content,
];
```

## What the presets provide today

Every preset already gives you a stable plugin contract:

- `files: ["**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}"]`
- `@typescript-eslint/parser`
- `ecmaVersion: "latest"`
- `sourceType: "module"`
- plugin registration under `"docusaurus-2"`

The plugin also exposes two non-preset content configs:

- `docusaurus2.configs.content` for `*.md` and `*.mdx`
- `docusaurus2.configs["strict-mdx-upgrade"]` for `*.mdx` only

Those use the plugin's text-content parser so content migration and docs-content rules stay opt-in instead of being mixed into the normal JS/TS preset ladder.

`strict-mdx-upgrade` is intentionally scoped to the **3.10 MDX syntax migration** rules only.
The 3.8 and 3.9 upgrade rules remain normal config-level rules in the regular preset ladder.

Instead of hand-maintaining a long rule inventory here, use these source-of-truth surfaces:

- [Preset matrix](./presets/index.md) for rules that belong to the preset ladder
- [Config Surfaces](./guides/config-surfaces.md) for opt-in content configs and direct rule opt-ins

At a high level, the current rule catalog covers these families:

- config, `themeConfig`, navbar, footer, and head-tag validation
- search, analytics, and DocSearch / Algolia integration hygiene
- sidebar, i18n, and navigation integrity
- theme package ownership and classic-theme stylesheet checks
- PWA, faster, and release-upgrade migration rules
- opt-in Markdown / MDX migration and content-aware rules

## Choosing a preset

- Start with [`recommended`](./presets/recommended.md) if you want the default future upgrade path and the stable config/sidebar rules.
- Start with [`config`](./presets/config.md) if you want only Docusaurus config, themeConfig, navbar/footer, and plugin-setup enforcement.
- Start with [`minimal`](./presets/minimal.md) if you want the smallest baseline.
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
