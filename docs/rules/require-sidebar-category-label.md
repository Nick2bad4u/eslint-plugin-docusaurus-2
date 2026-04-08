# require-sidebar-category-label

Require a non-empty `label` for explicit Docusaurus sidebar category objects.

## Targeted pattern scope

This rule focuses on `sidebars.*` files and specifically on explicit longhand category objects.

It targets category objects that declare fields such as:

- `type: "category"`
- `items`

and expects them to also declare:

- `label`

## What this rule reports

This rule reports explicit sidebar category objects that omit `label` or resolve it to an empty static string.

## Why this rule exists

Docusaurus category items are named navigation groups.

When an explicit category object has no label, the sidebar structure becomes ambiguous and drifts away from the documented category schema.

The shorthand category syntax already encodes the label in the object key, so this rule focuses only on explicit longhand category objects.

## ❌ Incorrect

```ts
export default {
    docs: [
        {
            type: "category",
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

This rule reports only. It does not autofix.

Choosing the right category label is a content decision that depends on the sidebar’s information architecture.

## Additional examples

### ✅ Correct — shorthand categories already carry their label

```ts
export default {
    docs: [
        {
            Guides: ["introduction"],
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

Do not use this rule if your project intentionally permits explicit longhand category objects without labels and you do not want linting to enforce the documented category schema.

> **Rule catalog ID:** R026

## Further reading

- [Docusaurus sidebar items](https://docusaurus.io/docs/sidebar/items)
- [Docusaurus sidebar](https://docusaurus.io/docs/sidebar)
