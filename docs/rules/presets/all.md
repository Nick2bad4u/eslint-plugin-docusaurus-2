---
title: all
description: All stable rules preset for eslint-plugin-docusaurus-2.
---

# all

`all` is reserved for the full stable rule catalog.

## What it configures today

Today it is effectively identical to the other typed presets because the plugin does not ship stable rule modules yet.

That will change once the first Docusaurus-specific rules are added.

## Flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.all];
```

## When to use it

Use `all` only if you explicitly want every future stable rule as soon as it becomes part of the published catalog.
