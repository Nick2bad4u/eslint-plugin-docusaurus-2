# require-navbar-docs-version-item-to

Require `to` for Docusaurus navbar items with `type: "docsVersion"`.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files and on navbar items authored inside:

- `themeConfig.navbar.items`
- nested navbar dropdown `items`

It targets navbar items that declare:

- `type: "docsVersion"`

and expects them to also declare:

- `to`

## What this rule reports

This rule reports Docusaurus navbar docs-version items that omit `to` or resolve it to an empty static string.

## Why this rule exists

Docusaurus `type: "docsVersion"` navbar items are a special schema that links to the active or latest docs version.

When `to` is missing, the item no longer matches the documented docs-version navbar contract and the destination is unclear.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        navbar: {
            items: [
                {
                    type: "docsVersion",
                    label: "Version",
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
                    type: "docsVersion",
                    label: "Version",
                    to: "/docs/versions",
                },
            ],
        },
    },
};
```

## Behavior and migration notes

This rule reports only. It does not autofix.

Choosing the correct `to` destination depends on the site’s versioning structure and cannot be inferred safely from syntax alone.

## When not to use it

Do not use this rule if your project intentionally permits incomplete docs-version navbar placeholders and you do not want linting to enforce the documented Docusaurus navbar item contract.

> **Rule catalog ID:** R041

## Further reading

- [Docusaurus theme configuration: navbar docs version](https://docusaurus.io/docs/api/themes/configuration)
