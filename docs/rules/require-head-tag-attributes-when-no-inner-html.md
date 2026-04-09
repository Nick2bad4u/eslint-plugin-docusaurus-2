# require-head-tag-attributes-when-no-inner-html

Require top-level `headTags` entries without `innerHTML` to provide meaningful `attributes`.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects the top-level `headTags` array.

## What this rule reports

This rule reports head-tag entries that do not provide non-empty `innerHTML` and also do not provide meaningful `attributes`.

## Why this rule exists

A head-tag entry without attributes or inline content cannot produce meaningful output and usually indicates unfinished configuration.

## ❌ Incorrect

```ts
export default {
    headTags: [{ tagName: "meta" }],
};
```

## ✅ Correct

```ts
export default {
    headTags: [
        {
            tagName: "meta",
            attributes: { name: "theme-color", content: "#25c2a0" },
        },
    ],
};
```

## Behavior and migration notes

This rule reports only. It does not autofix, because the missing attributes depend on author intent.

## When not to use it

Do not use this rule if your project intentionally emits placeholder head-tag objects for later transformation.

> **Rule catalog ID:** R077

## Further reading

- [Docusaurus site config reference](https://docusaurus.io/docs/api/docusaurus-config)
