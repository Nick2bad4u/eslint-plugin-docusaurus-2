# no-mixed-sidebar-link-kinds

Disallow Docusaurus sidebar category link objects from mixing `doc`-style and `generated-index`-style fields.

## Targeted pattern scope

This rule focuses on `sidebars.*` files and specifically on category `link` objects.

It reports link objects that combine both kinds of schema signals:

- doc-link fields such as `id`
- generated-index metadata such as `title`, `description`, `slug`, `keywords`, or `image`

## What this rule reports

This rule reports sidebar category `link` objects that mix the two Docusaurus link kinds in the same object.

## Why this rule exists

Docusaurus category links are schema-sensitive.

A category `link` is either:

- a `doc` link
- or a `generated-index` link

Mixing both styles in the same object makes the config ambiguous and can lead to misleading fixes or confusing review decisions.

## ❌ Incorrect

```ts
const sidebars = {
    docs: [
        {
            type: "category",
            label: "Guides",
            link: {
                type: "generated-index",
                id: "introduction",
                title: "Guides",
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
                type: "generated-index",
                title: "Guides",
            },
            items: ["introduction"],
        },
    ],
};
```

## Behavior and migration notes

This rule reports mixed-kind link objects and provides suggestions in the two safest cases:

- remove `id` when the link is explicitly `type: "generated-index"`
- remove generated-index metadata when the link is explicitly `type: "doc"`

When the link kind is implicit or otherwise ambiguous, the rule reports only.

## Additional examples

### ❌ Incorrect — doc link mixed with generated-index metadata

```ts
const sidebars = {
    docs: [
        {
            type: "category",
            label: "Guides",
            link: {
                type: "doc",
                id: "introduction",
                title: "Guides",
                slug: "/guides",
            },
            items: ["introduction"],
        },
    ],
};
```

### ✅ Correct — doc link only uses doc fields

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

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.strict];
```

## When not to use it

Do not use this rule if your project intentionally keeps mixed sidebar link shapes and you do not want linting to force a single Docusaurus link kind per object.

> **Rule catalog ID:** R020

## Further reading

- [Docusaurus sidebar items](https://docusaurus.io/docs/sidebar/items)
