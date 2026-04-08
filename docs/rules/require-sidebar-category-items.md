# require-sidebar-category-items

Require `items` for explicit Docusaurus sidebar category objects.

## Targeted pattern scope

This rule focuses on `sidebars.*` files and specifically on explicit longhand category objects that declare:

- `type: "category"`

It expects those objects to also declare:

- `items`

## What this rule reports

This rule reports explicit sidebar category objects that omit the `items` field.

## Why this rule exists

Docusaurus category items are containers for other sidebar items.

When an explicit category object omits `items`, the object no longer matches the documented category shape and readers have to guess whether the config is incomplete or malformed.

This rule keeps longhand category objects aligned with the documented sidebar schema.

## ❌ Incorrect

```ts
export default {
    docs: [
        {
            type: "category",
            label: "Guides",
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

This rule reports only. It does not autofix.

If a category should exist, the maintainer still has to decide which child items belong in it.

## Additional examples

### ✅ Correct — shorthand categories already define their items implicitly

```ts
export default {
    docs: [
        {
            Guides: ["introduction"],
        },
    ],
};
```

### ✅ Correct — an empty `items` array is outside this rule’s scope

```ts
export default {
    docs: [
        {
            type: "category",
            label: "Guides",
            items: [],
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

Do not use this rule if your project intentionally permits explicit category placeholders without `items` and you do not want linting to enforce the documented Docusaurus category schema.

> **Rule catalog ID:** R027

## Further reading

- [Docusaurus sidebar items](https://docusaurus.io/docs/sidebar/items)
- [Docusaurus sidebar](https://docusaurus.io/docs/sidebar)
