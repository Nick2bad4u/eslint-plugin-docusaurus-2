# require-doc-sidebar-link-type

Require `type: "doc"` when a Docusaurus sidebar category link object uses `id`.

## Targeted pattern scope

This rule focuses on `sidebars.*` files and specifically on category `link` objects.

It targets category-link objects that use:

- `id`

and expects them to declare:

- `type: "doc"`

## What this rule reports

This rule reports sidebar category `link` objects that use `id` but do not declare `type: "doc"`.

It also reports category-link objects whose `type` conflicts with an `id`-based doc link shape.

## Why this rule exists

Docusaurus category links are schema-sensitive.

According to the Docusaurus sidebar model, a category `link` object is either:

- a `doc` link, identified by `type: "doc"` and `id`
- a `generated-index` link, identified by `type: "generated-index"` and generated-index metadata

When an `id`-based category link omits `type` or uses the wrong one:

- the config becomes harder to read
- reviewers have to infer the intended schema from property shape
- future refactors are easier to get wrong

## ❌ Incorrect

```ts
const sidebars = {
    docs: [
        {
            type: "category",
            label: "Guides",
            link: {
                id: "introduction",
            },
            items: ["introduction"],
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
                type: "doc",
                id: "introduction",
            },
            items: ["introduction"],
        },
    ],
};
```

## Behavior and migration notes

This rule autofixes two common cases:

- insert `type: "doc"` when it is missing
- replace a conflicting static `type` value with `"doc"`

The rule intentionally ignores category-link objects that already look like `generated-index` links, because those belong to a different sidebar link shape.

## Additional examples

### ❌ Incorrect — conflicting type

```ts
const sidebars = {
    docs: [
        {
            label: "Guides",
            items: ["introduction"],
            link: {
                type: "generated-index",
                id: "introduction",
            },
        },
    ],
};
```

### ✅ Correct — generated-index links stay generated-index

```ts
const sidebars = {
    docs: [
        {
            label: "API",
            items: ["api/index"],
            link: {
                type: "generated-index",
                title: "API",
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

Do not use this rule if your project intentionally keeps partially specified category-link objects and you do not want linting to enforce the explicit Docusaurus schema.

> **Rule catalog ID:** R008

## Further reading

- [Docusaurus sidebar items](https://docusaurus.io/docs/sidebar/items)
- [Docusaurus sidebar category links](https://docusaurus.io/docs/sidebar/items)
