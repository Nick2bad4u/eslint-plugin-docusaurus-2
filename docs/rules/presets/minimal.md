---
title: minimal
description: Smallest preset exposed by eslint-plugin-docusaurus-2.
---

# minimal

`minimal` is the smallest preset exposed by `eslint-plugin-docusaurus-2`.

## What it configures today

- TypeScript file globs
- `@typescript-eslint/parser`
- `ecmaVersion: "latest"`
- `sourceType: "module"`
- plugin registration under `"docusaurus-2"`
- no bundled rules yet

## Flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.minimal];
```

## When to use it

Use `minimal` when you want to adopt the package early, keep future churn low, and opt into stricter Docusaurus-specific rules later in a controlled rollout.
