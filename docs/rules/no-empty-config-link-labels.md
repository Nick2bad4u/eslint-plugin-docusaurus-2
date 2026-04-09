# no-empty-config-link-labels

Disallow empty `label` values on Docusaurus theme-config link items.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects default Docusaurus theme-config link items in navbar and footer arrays.

## What this rule reports

This rule reports `label` properties whose static string value is empty or whitespace-only.

## Why this rule exists

Empty link labels usually come from copy/paste or unfinished configuration and make navigation harder to understand.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        navbar: {
            items: [{ label: "", to: "/docs/intro" }],
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

When `html` already provides visible content, this rule autofixes by removing the empty `label` property.

## When not to use it

Do not use this rule if empty labels are intentionally used as placeholders for a later transform step.

> **Rule catalog ID:** R084

## Further reading

- [Docusaurus navbar items](https://docusaurus.io/docs/api/themes/configuration#navbar-items)
- [Docusaurus footer configuration](https://docusaurus.io/docs/api/themes/configuration#footer)
