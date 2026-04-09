# no-empty-theme-config-metadata

Disallow `themeConfig.metadata` arrays that are statically empty.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects `themeConfig.metadata`.

## What this rule reports

This rule reports `themeConfig.metadata` when it resolves statically to an empty array.

## Why this rule exists

An empty metadata array adds noise without contributing any head metadata and often indicates unfinished or left-over configuration.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        metadata: [],
    },
};
```

## ✅ Correct

```ts
export default {
    themeConfig: {
        metadata: [{ name: "keywords", content: "docs" }],
    },
};
```

## Behavior and migration notes

This rule autofixes by removing empty `themeConfig.metadata` properties.

## When not to use it

Do not use this rule if empty metadata arrays are intentionally emitted for a later transform step.

> **Rule catalog ID:** R069

## Further reading

- [Docusaurus theme config metadata](https://docusaurus.io/docs/api/themes/configuration#metadata)
