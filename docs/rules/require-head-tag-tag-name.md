# require-head-tag-tag-name

Require top-level `headTags` entries to declare a non-empty `tagName`.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects the top-level `headTags` array.

## What this rule reports

This rule reports `headTags` object entries whose `tagName` is missing or statically empty.

## Why this rule exists

`headTags` entries are only useful when Docusaurus knows which HTML tag to emit. Requiring an explicit `tagName` makes head configuration clearer and less error-prone.

## ❌ Incorrect

```ts
export default {
    headTags: [
        {
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

This rule reports and provides suggestions to set `tagName` based on static clues:

- `link` when `attributes.rel` or `attributes.href` is present
- `meta` when common metadata attributes are present
- `script` when `innerHTML` is present

When no clear clue exists, it still offers generic `meta` / `link` / `script` suggestions.

## When not to use it

Do not use this rule if your project intentionally injects incomplete head-tag descriptors for later transformation.

> **Rule catalog ID:** R062

## Further reading

- [Docusaurus site config reference](https://docusaurus.io/docs/api/docusaurus-config)
