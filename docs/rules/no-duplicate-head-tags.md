# no-duplicate-head-tags

Disallow duplicate top-level `headTags` entries in Docusaurus config.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects the top-level `headTags` array.

## What this rule reports

This rule reports later `headTags` object entries that repeat an earlier tag definition with the same serialized signature.

## Why this rule exists

Duplicate head tags create noisy document metadata, repeated preload/preconnect hints, and harder-to-review config.

## ❌ Incorrect

```ts
export default {
    headTags: [
        {
            tagName: "link",
            attributes: { rel: "preconnect", href: "https://github.com" },
        },
        {
            tagName: "link",
            attributes: { rel: "preconnect", href: "https://github.com" },
        },
    ],
};
```

## ✅ Correct

```ts
export default {
    headTags: [
        {
            tagName: "link",
            attributes: { rel: "preconnect", href: "https://github.com" },
        },
    ],
};
```

## Behavior and migration notes

This rule autofixes by removing later duplicate `headTags` entries after the first occurrence.

## When not to use it

Do not use this rule if duplicate top-level head tags are intentionally emitted for downstream processing.

> **Rule catalog ID:** R061

## Further reading

- [Docusaurus site config reference](https://docusaurus.io/docs/api/docusaurus-config)
