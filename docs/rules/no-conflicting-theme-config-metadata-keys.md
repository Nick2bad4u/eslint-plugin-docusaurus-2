# no-conflicting-theme-config-metadata-keys

Disallow `themeConfig.metadata` entries from declaring both `name` and `property`.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects `themeConfig.metadata` object entries.

## What this rule reports

This rule reports metadata entries that declare both `name` and `property` keys at the same time.

## Why this rule exists

Docusaurus metadata entries should describe either a `name`-based tag or a `property`-based tag. Declaring both makes the entry ambiguous and harder to review.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        metadata: [
            {
                name: "keywords",
                property: "og:keywords",
                content: "docs",
            },
        ],
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

This rule reports and provides suggestions to remove either `name` or `property`, letting authors preserve the intended metadata style.

## When not to use it

Do not use this rule if your metadata objects are intentionally authored with both keys for later custom transformation.

> **Rule catalog ID:** R064

## Further reading

- [Docusaurus theme config metadata](https://docusaurus.io/docs/api/themes/configuration#metadata)
