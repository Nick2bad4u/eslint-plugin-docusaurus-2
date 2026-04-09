# prefer-head-tag-attributes-object

Require top-level `headTags` entries to place HTML attributes inside an `attributes` object.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects the top-level `headTags` array.

## What this rule reports

This rule reports `headTags` entries that put HTML attribute-like fields at the root of the tag object instead of inside `attributes`.

## Why this rule exists

Docusaurus `headTags` entries are easier to review and more portable when attribute fields live inside a dedicated `attributes` object.

## ❌ Incorrect

```ts
export default {
    headTags: [
        {
            tagName: "link",
            rel: "preconnect",
            href: "https://github.com",
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
            attributes: {
                rel: "preconnect",
                href: "https://github.com",
            },
        },
    ],
};
```

## Behavior and migration notes

This rule autofixes straightforward static head-tag objects by moving flat attribute properties into `attributes`.

## When not to use it

Do not use this rule if your project intentionally relies on a custom transform that expects flat root properties on head-tag objects.

> **Rule catalog ID:** R068

## Further reading

- [Docusaurus site config reference](https://docusaurus.io/docs/api/docusaurus-config)
