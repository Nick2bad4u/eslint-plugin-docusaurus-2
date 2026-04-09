# no-empty-config-link-destinations

Disallow empty `href` or `to` values on Docusaurus theme-config link items.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects default Docusaurus theme-config link items in navbar and footer arrays.

## What this rule reports

This rule reports `href` or `to` properties whose static string value is empty or whitespace-only.

## Why this rule exists

Empty destinations are almost always mistakes and make link objects misleading or invalid.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        navbar: {
            items: [{ label: "Docs", href: "", to: "/docs/intro" }],
        },
    },
};
```

## ✅ Correct

```ts
export default {
    themeConfig: {
        navbar: {
            items: [{ label: "Docs", to: "/docs/intro" }],
        },
    },
};
```

## Behavior and migration notes

When another destination or footer `html` content already makes the item meaningful, this rule autofixes by removing the empty destination property.

## When not to use it

Do not use this rule if empty destination strings are intentionally used as placeholders for a later transform step.

> **Rule catalog ID:** R085

## Further reading

- [Docusaurus navbar items](https://docusaurus.io/docs/api/themes/configuration#navbar-items)
- [Docusaurus footer configuration](https://docusaurus.io/docs/api/themes/configuration#footer)
