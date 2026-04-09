# no-conflicting-navbar-doc-item-props

Disallow Docusaurus navbar items with `type: "doc"` from mixing in direct-link props such as `to`, `href`, or `html`.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files and on navbar items authored inside:

- `themeConfig.navbar.items`
- nested navbar dropdown `items`

It targets navbar items that declare:

- `type: "doc"`

and also declare direct-link props such as:

- `to`
- `href`
- `html`

## What this rule reports

This rule reports Docusaurus navbar doc-link items that mix the `docId`-based shape with direct-link props.

## Why this rule exists

Docusaurus `type: "doc"` navbar items are a dedicated schema that points to a document through `docId`.

When they also declare `to`, `href`, or `html`, the object becomes ambiguous because it mixes two incompatible navigation shapes in the same item.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        navbar: {
            items: [
                {
                    type: "doc",
                    label: "Docs",
                    docId: "introduction",
                    to: "/docs/intro",
                    href: "https://example.com",
                },
            ],
        },
    },
};
```

## ✅ Correct

```ts
export default {
    themeConfig: {
        navbar: {
            items: [
                {
                    type: "doc",
                    label: "Docs",
                    docId: "introduction",
                },
            ],
        },
    },
};
```

## Behavior and migration notes

This rule autofixes when the item already has `docId` by removing the conflicting direct-link props.

When `docId` is missing, the rule still reports but does not guess which shape the author intended.

## When not to use it

Do not use this rule if your project intentionally permits mixed navbar doc-item shapes and you do not want linting to enforce the documented Docusaurus navbar doc-link contract.

> **Rule catalog ID:** R044

## Further reading

- [Docusaurus theme configuration: navbar doc link](https://docusaurus.io/docs/api/themes/configuration)
