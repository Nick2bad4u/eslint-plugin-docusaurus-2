# no-conflicting-navbar-doc-sidebar-item-props

Disallow Docusaurus navbar items with `type: "docSidebar"` from mixing in direct-link props such as `to`, `href`, or `html`.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files and on navbar items authored inside:

- `themeConfig.navbar.items`
- nested navbar dropdown `items`

It targets navbar items that declare:

- `type: "docSidebar"`

and also declare direct-link props such as:

- `to`
- `href`
- `html`

## What this rule reports

This rule reports Docusaurus navbar doc-sidebar items that mix the `sidebarId`-based shape with direct-link props.

## Why this rule exists

Docusaurus `type: "docSidebar"` navbar items are a dedicated schema that links to the first document of a sidebar through `sidebarId`.

When they also declare `to`, `href`, or `html`, the object becomes ambiguous because it mixes incompatible navigation shapes in the same item.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        navbar: {
            items: [
                {
                    type: "docSidebar",
                    label: "API",
                    sidebarId: "api",
                    to: "/docs/api",
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

This rule autofixes when the item already has `sidebarId` by removing the conflicting direct-link props.

When `sidebarId` is missing, the rule still reports but does not guess which shape the author intended.

## When not to use it

Do not use this rule if your project intentionally permits mixed navbar doc-sidebar item shapes and you do not want linting to enforce the documented Docusaurus navbar doc-sidebar contract.

> **Rule catalog ID:** R045

## Further reading

- [Docusaurus theme configuration: navbar linked to a sidebar](https://docusaurus.io/docs/api/themes/configuration)
