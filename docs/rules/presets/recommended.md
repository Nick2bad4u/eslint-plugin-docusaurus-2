---
title: recommended
description: Default preset for eslint-plugin-docusaurus-2.
---

# recommended

`recommended` is the default preset for most repositories that want the stable public configuration surface of `eslint-plugin-docusaurus-2`.

## What it configures today

It includes the same parser and plugin registration behavior as `minimal`, plus the stable config/sidebar rules that are broadly useful across Docusaurus sites:

- `no-ignored-site-validations`

- `prefer-config-satisfies`

- `prefer-to-for-internal-links`

- `require-generated-index-link-type`

## Flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## When to use it

Use `recommended` if you want the normal adoption path and do not need type-aware rules yet.
