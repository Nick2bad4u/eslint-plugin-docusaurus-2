# prefer-theme-config-metadata-name-for-twitter-tags

Require `themeConfig.metadata` Twitter entries to use `name` instead of `property`.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects `themeConfig.metadata` entries.

## What this rule reports

This rule reports metadata entries that use `property` for static Twitter keys such as `twitter:image` or `twitter:card`.

## Why this rule exists

Twitter/X metadata is conventionally emitted through `name`. Using the canonical key form keeps metadata consistent with common platform documentation and tooling.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        metadata: [{ property: "twitter:image", content: "https://example.com/card.png" }],
    },
};
```

## ✅ Correct

```ts
export default {
    themeConfig: {
        metadata: [{ name: "twitter:image", content: "https://example.com/card.png" }],
    },
};
```

## Behavior and migration notes

This rule autofixes by renaming the metadata key from `property` to `name` for matching static Twitter entries.

## When not to use it

Do not use this rule if your metadata pipeline intentionally relies on nonstandard Twitter key handling.

> **Rule catalog ID:** R071

## Further reading

- [X/Twitter cards markup reference](https://developer.x.com/en/docs/x-for-websites/cards/overview/markup)
- [Docusaurus theme config metadata](https://docusaurus.io/docs/api/themes/configuration#metadata)
