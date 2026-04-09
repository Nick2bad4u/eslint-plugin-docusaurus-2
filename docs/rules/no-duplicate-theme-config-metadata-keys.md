# no-duplicate-theme-config-metadata-keys

Disallow duplicate `themeConfig.metadata` keys across static `name` and `property` entries.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects `themeConfig.metadata` arrays.

## What this rule reports

This rule reports duplicate metadata entries that repeat an earlier static `name` or `property` key.

## Why this rule exists

Duplicate metadata keys make site metadata harder to audit and can produce redundant or conflicting document head output.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        metadata: [
            { name: "keywords", content: "docs" },
            { name: "keywords", content: "rules" },
        ],
    },
};
```

## ✅ Correct

```ts
export default {
    themeConfig: {
        metadata: [
            { name: "keywords", content: "docs, rules" },
        ],
    },
};
```

## Behavior and migration notes

This rule autofixes by removing later duplicate entries after the first occurrence.

## When not to use it

Do not use this rule if duplicate metadata keys are intentionally emitted and resolved by downstream rendering logic.

> **Rule catalog ID:** R059

## Further reading

- [Docusaurus theme config metadata](https://docusaurus.io/docs/api/themes/configuration#metadata)
