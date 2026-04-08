# require-navbar-doc-sidebar-item-sidebar-id

Require `sidebarId` for Docusaurus navbar items with `type: "docSidebar"`.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files and on navbar items authored inside:

- `themeConfig.navbar.items`
- nested navbar dropdown `items`

It targets navbar items that declare:

- `type: "docSidebar"`

and expects them to also declare:

- `sidebarId`

## What this rule reports

This rule reports Docusaurus navbar doc-sidebar items that omit `sidebarId` or resolve it to an empty static string.

## Why this rule exists

Docusaurus `type: "docSidebar"` navbar items link to the first document of a specific sidebar.

When `sidebarId` is missing, the item no longer matches the documented navbar doc-sidebar contract and the config stops expressing which sidebar should be linked.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        navbar: {
            items: [
                {
                    type: "docSidebar",
                    label: "API",
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
                    type: "docSidebar",
                    label: "API",
                    sidebarId: "api",
                },
            ],
        },
    },
};
```

## Behavior and migration notes

This rule reports only. It does not autofix.

Choosing the correct `sidebarId` depends on the repository’s sidebar layout and cannot be inferred safely from syntax alone.

## When not to use it

Do not use this rule if your project intentionally permits incomplete navbar doc-sidebar placeholders and you do not want linting to enforce the documented Docusaurus navbar item contract.

> **Rule catalog ID:** R035

## Further reading

- [Docusaurus theme configuration: navbar linked to a sidebar](https://docusaurus.io/docs/api/themes/configuration)
