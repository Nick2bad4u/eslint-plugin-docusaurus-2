# require-head-tag-content-or-attributes

Require top-level `headTags` entries to provide either meaningful `attributes` or non-empty `innerHTML`.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects the top-level `headTags` array.

## What this rule reports

This rule reports head-tag entries that do not provide meaningful `attributes` and do not provide non-empty `innerHTML`.

## Why this rule exists

A head-tag entry without attributes or inline content cannot contribute meaningful output and usually indicates unfinished configuration.

## ❌ Incorrect

```ts
export default {
    headTags: [{ tagName: "meta" }],
};
```

```ts
export default {
    headTags: [{ tagName: "script", innerHTML: "" }],
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

This rule reports only. It does not autofix, because the correct missing attributes or inline content depend on author intent.

## When not to use it

Do not use this rule if your project intentionally emits placeholder head-tag objects for a later transform step.

> **Rule catalog ID:** R075

## Further reading

- [Docusaurus site config reference](https://docusaurus.io/docs/api/docusaurus-config)
