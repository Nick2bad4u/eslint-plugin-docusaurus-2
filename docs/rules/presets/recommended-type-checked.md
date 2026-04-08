---
title: recommended-type-checked
description: Typed preset for eslint-plugin-docusaurus-2.
---

# recommended-type-checked

`recommended-type-checked` is the typed counterpart to `recommended`.

## What it configures today

In addition to the base parser setup, this preset enables `projectService: true` automatically.

Today it contains the same stable rule catalog as `recommended`:

- `no-conflicting-config-link-props`
- `no-deprecated-on-broken-markdown-links`
- `no-ignored-site-validations`
- `no-useless-collapsed-sidebar-categories`
- `no-use-base-url-for-internal-link-components`
- `prefer-config-satisfies`
- `prefer-href-for-external-links`
- `prefer-sidebars-config-satisfies`
- `prefer-to-for-internal-link-components`
- `prefer-to-for-internal-links`
- `require-doc-sidebar-link-type`
- `require-generated-index-link-type`

The difference is not current rule behavior. The difference is that this preset already enables the typed parser setup that future type-aware Docusaurus rules will need.

## Flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs["recommended-type-checked"]];
```

## When to use it

Choose this preset when your Docusaurus repository already runs typed linting and you want to adopt future type-aware rules without changing presets later.
