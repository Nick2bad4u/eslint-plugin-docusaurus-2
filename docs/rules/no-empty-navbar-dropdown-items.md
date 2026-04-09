# no-empty-navbar-dropdown-items

Disallow navbar dropdown items whose `items` arrays resolve statically to empty arrays.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects:

- top-level `themeConfig.navbar.items`, and
- nested dropdown `items` arrays.

## What this rule reports

This rule reports navbar dropdown objects whose `items` arrays resolve statically to `[]`.

## Why this rule exists

Empty dropdowns add clutter to navigation and often indicate unfinished or copied configuration.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        navbar: {
            items: [{ type: "dropdown", label: "Docs", items: [] }],
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
                    type: "dropdown",
                    label: "Docs",
                    items: [{ label: "Overview", to: "/docs" }],
                },
            ],
        },
    },
};
```

## Behavior and migration notes

This rule autofixes by removing empty dropdown items from static navbar arrays.

## When not to use it

Do not use this rule if your navbar intentionally includes placeholder dropdowns for later runtime population.

> **Rule catalog ID:** R072

## Further reading

- [Docusaurus navbar items](https://docusaurus.io/docs/api/themes/configuration#navbar-items)
