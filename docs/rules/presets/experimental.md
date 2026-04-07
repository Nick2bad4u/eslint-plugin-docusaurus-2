---
title: experimental
description: Experimental preset for eslint-plugin-docusaurus-2.
---

# experimental

`experimental` is reserved for rule candidates that are not stable enough for the normal preset ladder.

## What it configures today

Like `all`, it currently carries no bundled rules.

The preset still exists now so the runtime contract and documentation are stable before experimental Docusaurus rules are introduced.

## Flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.experimental];
```

## When to use it

Choose `experimental` only when you are intentionally opting into in-progress rule ideas and are prepared for faster iteration.
