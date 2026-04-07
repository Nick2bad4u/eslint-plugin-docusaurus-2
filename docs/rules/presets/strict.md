---
title: strict
description: Strict preset for eslint-plugin-docusaurus-2.
---

# strict

`strict` is the future stricter tier for repositories that want more opinionated Docusaurus-site enforcement.

## What it configures today

At the moment, `strict` is effectively the typed parser baseline with no bundled rules yet.

It still exists now so teams can standardize on the public preset name before the rule catalog grows.

## Flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.strict];
```

## When to use it

Use `strict` if you are intentionally adopting the strongest future tier and are comfortable with that preset becoming more opinionated over time.
