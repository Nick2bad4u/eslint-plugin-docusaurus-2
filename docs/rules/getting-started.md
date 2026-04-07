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

Even before the first Docusaurus-specific rules land, every preset already gives you a stable plugin contract:

- `files: ["**/*.{ts,tsx,mts,cts}"]`
- `@typescript-eslint/parser`
- `ecmaVersion: "latest"`
- `sourceType: "module"`
- plugin registration under `"docusaurus-2"`

The typed presets also enable `projectService: true` automatically.

## Choosing a preset

- Start with `recommended` if you want the default future upgrade path.
- Start with `minimal` if you want the smallest baseline while rules are still being introduced.
- Move to `recommended-type-checked` once you are ready for type-aware rules.
- Use `strict`, `all`, or `experimental` only when you intentionally want broader future coverage.

## Manual scoped setup

If you prefer to spread a preset into your own file-scoped config object, you can do that too:

```ts
import tsParser from "@typescript-eslint/parser";
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [
    {
        files: ["**/*.{ts,tsx,mts,cts}"],
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

The plugin currently exposes **preset infrastructure first** and **rule behavior second**.

That means your config can adopt the public runtime today without inheriting fake placeholder rules copied from another plugin template.

## Where to go next

- Read the [Overview](./overview.md) for the product direction.
- Compare presets in the [Preset index](./presets/index.md).
