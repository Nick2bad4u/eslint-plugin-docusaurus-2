# require-sidebar-category-type

Require `type: "category"` for Docusaurus sidebar category objects.

## Targeted pattern scope

This rule focuses on `sidebars.*` files and specifically on category-like sidebar item objects.

It targets sidebar item objects that contain category-shaped fields such as:

- `items`
- `label` alongside `items`

and expects them to declare:

- `type: "category"`

## What this rule reports

This rule reports sidebar category objects that omit `type` or use a conflicting static `type` value.

## Why this rule exists

Docusaurus sidebar items are schema-sensitive.

When an object has category-shaped fields such as `items`, readers should not have to infer whether it is meant to be a category.

Making the category type explicit improves review clarity and reduces the chance of future edits drifting into an invalid or ambiguous sidebar shape.

## ❌ Incorrect

```ts
export default {
    docs: [
        {
            label: "Guides",
            items: ["introduction"],
        },
    ],
};
```

## ✅ Correct

```ts
export default {
    docs: [
        {
            type: "category",
            label: "Guides",
            items: ["introduction"],
        },
    ],
};
```

## Behavior and migration notes

This rule autofixes two common cases:

- insert `type: "category"` when it is missing
- replace a conflicting static `type` value with `"category"`

The rule intentionally ignores dynamic `type` expressions because it cannot prove their runtime value safely from static syntax alone.

## Additional examples

### ❌ Incorrect — conflicting static type

```ts
export default {
    docs: [
        {
            type: "link",
            label: "Guides",
            items: ["introduction"],
        },
    ],
};
```

### ✅ Correct — non-category items stay untouched

```ts
export default {
    docs: [
        {
            type: "doc",
            id: "introduction",
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

Do not use this rule if your project intentionally relies on implicit category inference in sidebars and you do not want linting to enforce the explicit Docusaurus category schema.

> **Rule catalog ID:** R023

## Further reading

- [Docusaurus sidebar](https://docusaurus.io/docs/sidebar)
- [Docusaurus sidebar items](https://docusaurus.io/docs/sidebar/items)
