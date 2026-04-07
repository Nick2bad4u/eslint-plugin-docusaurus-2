# require-generated-index-link-type

Require `type: "generated-index"` when sidebar link objects use generated-index metadata.

## Targeted pattern scope

This rule focuses on `sidebars.*` files and specifically on sidebar category `link` objects.

It targets `link` objects that use generated-index metadata fields such as:

- `title`
- `description`
- `slug`
- `keywords`
- `image`

## What this rule reports

This rule reports sidebar `link` objects that use generated-index metadata without declaring `type: "generated-index"`.

It also reports `link.type` values that conflict with generated-index metadata on the same object.

## Why this rule exists

Docusaurus sidebar `link` objects are schema-sensitive.

- generated-index metadata belongs to generated-index links
- missing or conflicting `type` values make sidebar intent harder to read
- explicit `type: "generated-index"` keeps category landing-page config unambiguous

## ❌ Incorrect

```ts
const sidebars = {
    docs: [
        {
            type: "category",
            label: "Guides",
            link: {
                title: "Guides",
                description: "Browse the guides.",
            },
            items: ["intro"],
        },
    ],
};
```

## ✅ Correct

```ts
const sidebars = {
    docs: [
        {
            type: "category",
            label: "Guides",
            link: {
                type: "generated-index",
                title: "Guides",
                description: "Browse the guides.",
            },
            items: ["intro"],
        },
    ],
};
```

## Behavior and migration notes

This rule autofixes two common cases:

- insert `type: "generated-index"` when it is missing
- replace an incompatible static `type` string when generated-index metadata is already present

Review the result if the original object mixed category-link strategies in a nonstandard way.

## Additional examples

### ❌ Incorrect — Conflicting type value

```ts
const sidebars = {
    docs: [
        {
            label: "Rules",
            items: ["overview"],
            link: {
                type: "doc",
                slug: "/rules",
                title: "Rules",
            },
        },
    ],
};
```

### ✅ Correct — Explicit doc link

```ts
const sidebars = {
    docs: [
        {
            type: "category",
            label: "Docs",
            items: ["intro"],
            link: {
                type: "doc",
                id: "intro",
            },
        },
    ],
};
```

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## When not to use it

Do not use this rule if your project intentionally avoids generated-index links and never uses generated-index metadata fields in sidebar configs.

> **Rule catalog ID:** R002

## Further reading

- [Docusaurus sidebar docs](https://docusaurus.io/docs/sidebar)
- [Docusaurus generated index sidebar links](https://docusaurus.io/docs/sidebar)
