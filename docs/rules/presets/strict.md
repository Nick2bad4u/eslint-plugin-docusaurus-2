---
title: strict
description: Strict preset for eslint-plugin-docusaurus-2.
---

# strict

`strict` is the future stricter tier for repositories that want more opinionated Docusaurus-site enforcement.

## What it configures today

`strict` includes all of `recommended`, plus the stricter Docusaurus site-source CSS rules:

- `prefer-css-modules-in-site-src`
- `no-page-css-module-imports-in-components`

It also keeps the typed parser baseline for future stricter Docusaurus checks.

## Flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.strict];
```

## When to use it

Use `strict` if you are intentionally adopting the strongest future tier and are comfortable with that preset becoming more opinionated over time.
