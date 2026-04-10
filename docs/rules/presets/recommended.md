---
title: recommended
description: Default preset for eslint-plugin-docusaurus-2.
---

# recommended

`recommended` is the default preset for most repositories that want the stable public configuration surface of `eslint-plugin-docusaurus-2`.

## What it configures today

It includes the same parser and plugin registration behavior as `minimal`, plus
the stable default rollout of broadly applicable Docusaurus config, navbar,
footer, sidebar, and theme-metadata rules.

Use the generated [preset matrix](./index.md) as the source of
truth for the exact current rule membership.

These rules cover the most common Docusaurus config mistakes without imposing the stricter site-source CSS architecture checks from the broader presets.

If you only want the `docusaurus.config.*`-focused subset, use [`config`](./config.md) instead of the broader default rollout tier.

## Flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## When to use it

Use `recommended` if you want the default public rollout without the broader page-module and site-source CSS checks from the stricter presets.
