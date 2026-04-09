# no-empty-head-tags

Disallow top-level `headTags` entries that do not contribute meaningful attributes or inline content.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects the top-level `headTags` array.

## What this rule reports

This rule reports `headTags` object entries that do not provide useful output, including entries with:

- no `attributes` and no `innerHTML`
- an empty static `attributes` object
- empty static `innerHTML`

## Why this rule exists

Empty head-tag entries add noise to configuration and can hide copy/paste mistakes. Removing them keeps the site head configuration easier to review.

## ❌ Incorrect

```ts
export default {
    headTags: [{ tagName: "meta" }],
};
```

```ts
export default {
    headTags: [{ tagName: "meta", attributes: {} }],
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

This rule autofixes by removing empty `headTags` entries from static arrays.

## When not to use it

Do not use this rule if your configuration intentionally includes placeholder head-tag entries for a later transformation step.

> **Rule catalog ID:** R063

## Further reading

- [Docusaurus site config reference](https://docusaurus.io/docs/api/docusaurus-config)
