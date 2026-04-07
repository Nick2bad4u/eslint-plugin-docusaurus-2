---
title: Presets
description: Preset reference for eslint-plugin-docusaurus-2.
---

# Presets

`eslint-plugin-docusaurus-2` currently exposes six flat-config presets:

| Preset | Type-aware | Summary |
| --- | --- | --- |
| [🟢 `minimal`](./minimal.md) | No | Smallest future-ready baseline. |
| [🟡 `recommended`](./recommended.md) | No | Default starting point for most repositories. |
| [🟠 `recommended-type-checked`](./recommended-type-checked.md) | Yes | Recommended plus typed parser setup. |
| [🔴 `strict`](./strict.md) | Yes | Stricter path for mature sites. |
| [🟣 `all`](./all.md) | Yes | Every stable rule once the catalog expands. |
| [🧪 `experimental`](./experimental.md) | Yes | Future experimental rule candidates. |

## Current rule count

All presets intentionally ship with **0 rules** today.

That does not make them useless:

- they establish the public runtime surface
- they give consumers a stable adoption path
- they keep typed and untyped preset tiers explicit from day one

As rules are added, these preset pages remain the canonical explanation of how each tier is intended to differ.

## Rule matrix

No bundled rules ship yet, but this matrix remains the canonical place to show preset coverage as the Docusaurus rule catalog grows.

| Rule | 🟢 | 🟡 | 🟠 | 🔴 | 🟣 | 🧪 |
| --- | :-: | :-: | :-: | :-: | :-: | :-: |
| — | — | — | — | — | — | — |
