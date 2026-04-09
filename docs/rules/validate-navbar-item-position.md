# validate-navbar-item-position

Validate static navbar item `position` values as canonical `"left"` or `"right"`.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects object entries in `themeConfig.navbar.items`.

## What this rule reports

This rule reports static `position` values that are:

- not `"left"` or `"right"`, or
- valid but non-canonical casing/whitespace (for example `"Left"`, `" RIGHT "`).

## Why this rule exists

Navbar item placement drives navigation layout. Canonical position values reduce churn in review diffs and avoid subtle config inconsistency.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        navbar: {
            items: [{ label: "Docs", to: "/docs", position: "Left" }],
        },
    },
};
```

```ts
export default {
    themeConfig: {
        navbar: {
            items: [{ label: "Docs", to: "/docs", position: "center" }],
        },
    },
};
```

## ✅ Correct

```ts
export default {
    themeConfig: {
        navbar: {
            items: [{ label: "Docs", to: "/docs", position: "left" }],
        },
    },
};
```

## Behavior and migration notes

This rule autofixes static string values that are valid after normalization (for example `"Left"` -> `"left"`).

For invalid static values, it reports and provides suggestions to set `position` to `"left"` or `"right"`.

## When not to use it

Do not use this rule if your repository intentionally allows custom nonstandard `position` semantics through runtime transforms.

> **Rule catalog ID:** R057

## Further reading

- [Docusaurus navbar items](https://docusaurus.io/docs/api/themes/configuration#navbar-items)
