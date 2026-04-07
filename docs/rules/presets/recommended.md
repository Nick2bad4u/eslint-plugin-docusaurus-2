---
title: recommended
description: Default preset for eslint-plugin-docusaurus-2.
---

# recommended

`recommended` is the default preset for most repositories that want the stable public configuration surface of `eslint-plugin-docusaurus-2`.

## What it configures today

It includes the same parser and plugin registration behavior as `minimal`, but it is the intended long-term default tier for the plugin.

Today that still means **0 bundled rules**.

## Flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## When to use it

Use `recommended` if you want the normal adoption path and do not need type-aware rules yet.
