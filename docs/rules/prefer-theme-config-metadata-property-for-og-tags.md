# prefer-theme-config-metadata-property-for-og-tags

Require `themeConfig.metadata` Open Graph entries to use `property` instead of `name`.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects `themeConfig.metadata` entries.

## What this rule reports

This rule reports metadata entries that use `name` for static Open Graph keys such as `og:image`.

## Why this rule exists

Open Graph metadata is conventionally emitted through `property`. Using the canonical key form makes metadata easier to audit and aligns with common tooling expectations.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        metadata: [{ name: "og:image", content: "https://example.com/card.png" }],
    },
};
```

## ✅ Correct

```ts
export default {
    themeConfig: {
        metadata: [{ property: "og:image", content: "https://example.com/card.png" }],
    },
};
```

## Behavior and migration notes

This rule autofixes by renaming the metadata key from `name` to `property` for matching static Open Graph entries.

## When not to use it

Do not use this rule if your metadata pipeline intentionally relies on nonstandard Open Graph key handling.

> **Rule catalog ID:** R070

## Further reading

- [Open Graph protocol](https://ogp.me/)
- [Docusaurus theme config metadata](https://docusaurus.io/docs/api/themes/configuration#metadata)
