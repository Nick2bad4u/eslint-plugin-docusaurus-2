---
title: recommended-type-checked
description: Typed preset for eslint-plugin-docusaurus-2.
---

# recommended-type-checked

`recommended-type-checked` is the typed counterpart to `recommended`.

## What it configures today

In addition to the base parser setup, this preset enables `projectService: true` automatically.

That keeps the preset ready for future Docusaurus rules that need full TypeScript type information.

## Flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs["recommended-type-checked"]];
```

## When to use it

Choose this preset when your Docusaurus repository already runs typed linting and you want to adopt future type-aware rules without changing presets later.
