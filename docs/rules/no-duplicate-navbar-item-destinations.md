# no-duplicate-navbar-item-destinations

Disallow duplicate static navbar item destinations within the same navbar menu array.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects:

- top-level `themeConfig.navbar.items`, and
- dropdown `items` arrays inside navbar dropdowns.

## What this rule reports

This rule reports later navbar items in the same menu array that repeat an earlier static `to` or `href` destination.

## Why this rule exists

Duplicate navbar destinations usually come from copy/paste mistakes and make navigation noisier without adding value.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        navbar: {
            items: [
                { label: "Docs", to: "/docs" },
                { label: "Read the docs", to: "/docs" },
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
                { label: "Docs", to: "/docs" },
                { label: "Rules", to: "/rules" },
            ],
        },
    },
};
```

## Behavior and migration notes

This rule reports and provides a suggestion to remove the later duplicate navbar item.

## When not to use it

Do not use this rule if your navbar intentionally repeats destinations in the same menu array for localization or UX reasons.

> **Rule catalog ID:** R066

## Further reading

- [Docusaurus navbar items](https://docusaurus.io/docs/api/themes/configuration#navbar-items)
