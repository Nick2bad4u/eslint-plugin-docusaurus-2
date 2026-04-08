# require-navbar-doc-item-doc-id

Require `docId` for Docusaurus navbar items with `type: "doc"`.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files and on navbar items authored inside:

- `themeConfig.navbar.items`
- nested navbar dropdown `items`

It targets navbar items that declare:

- `type: "doc"`

and expects them to also declare:

- `docId`

## What this rule reports

This rule reports Docusaurus navbar doc-link items that omit `docId` or resolve it to an empty static string.

## Why this rule exists

Docusaurus `type: "doc"` navbar items are a special schema with a required document identifier.

When `docId` is missing, the item no longer matches the documented navbar doc-link contract and the intended target document becomes unclear.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        navbar: {
            items: [
                {
                    type: "doc",
                    label: "Docs",
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

This rule reports only. It does not autofix.

Choosing the correct `docId` is a site-structure decision that cannot be inferred safely from syntax alone.

## When not to use it

Do not use this rule if your project intentionally permits incomplete navbar doc-link placeholders and you do not want linting to enforce the documented Docusaurus navbar item contract.

> **Rule catalog ID:** R034

## Further reading

- [Docusaurus theme configuration: navbar doc link](https://docusaurus.io/docs/api/themes/configuration)
