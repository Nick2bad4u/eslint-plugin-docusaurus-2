---
title: recommended-type-checked
description: Typed preset for eslint-plugin-docusaurus-2.
---

# recommended-type-checked

`recommended-type-checked` is the typed counterpart to [`recommended`](../presets/recommended.md).

## What it configures today

In addition to the base parser setup, this preset enables `projectService: true` automatically.

Today it contains the same stable user-facing rule rollout as `recommended`,
but with typed parser services enabled up front.

Use the generated [preset matrix](./index.md#rule-matrix) as the source of
truth for the exact current rule membership.

The difference is not current rule behavior. The difference is that this preset already enables the typed parser setup that future type-aware Docusaurus rules will need.

## Flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs["recommended-type-checked"]];
```

## When to use it

Choose this preset when your Docusaurus repository already runs typed linting and you want to adopt future type-aware rules without changing presets later.
