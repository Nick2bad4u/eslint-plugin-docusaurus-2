# no-useless-collapsed-sidebar-categories

Disallow `collapsed` on Docusaurus sidebar categories that already set `collapsible: false`.

## Targeted pattern scope

This rule focuses on `sidebars.*` files and specifically on sidebar category objects.

It reports category objects that contain both:

- `collapsible: false`
- `collapsed: ...`

## What this rule reports

This rule reports sidebar categories where `collapsed` has no effect because the same category already disables collapsing entirely.

## Why this rule exists

The Docusaurus sidebar docs call out that `collapsed` is only meaningful for collapsible categories.

When a category sets `collapsible: false`, the `collapsed` property is ignored.
Keeping both properties together is misleading because:

- readers may think the category still has an initial open/closed state
- reviews have to reason about a setting that does nothing
- the sidebar config becomes noisier than it needs to be

## ❌ Incorrect

```ts
export default {
    docs: [
        {
            type: "category",
            label: "Guides",
            collapsible: false,
            collapsed: true,
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
            collapsible: false,
            items: ["introduction"],
        },
    ],
};
```

## Behavior and migration notes

This rule provides an autofix.

The autofix removes the useless `collapsed` property when the same category already sets `collapsible: false`.

## Additional examples

### ✅ Correct — collapsible categories may still use `collapsed`

```ts
export default {
    docs: [
        {
            type: "category",
            label: "Guides",
            collapsible: true,
            collapsed: false,
            items: ["introduction"],
        },
    ],
};
```

### ✅ Correct — non-collapsible categories do not need `collapsed`

```ts
export default {
    docs: [
        {
            type: "category",
            label: "API",
            collapsible: false,
            items: ["api/index"],
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

Do not use this rule if your project intentionally keeps redundant sidebar state fields for documentation or template reasons and you do not want linting to remove them.

> **Rule catalog ID:** R011

## Further reading

- [Docusaurus sidebar items](https://docusaurus.io/docs/sidebar/items)
