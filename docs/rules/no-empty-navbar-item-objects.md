# no-empty-navbar-item-objects

Disallow empty navbar item objects inside static navbar item arrays.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects navbar item arrays, including nested dropdown item arrays.

## What this rule reports

This rule reports empty navbar item objects such as `{}` that do not contribute any label, destination, dropdown items, or HTML content.

## Why this rule exists

Empty navbar item objects add noise and usually come from unfinished or copied configuration.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        navbar: {
            items: [{}, { label: "Docs", to: "/docs" }],
        },
    },
};
```

## ✅ Correct

```ts
export default {
    themeConfig: {
        navbar: {
            items: [{ label: "Docs", to: "/docs" }],
        },
    },
};
```

## Behavior and migration notes

This rule autofixes by removing empty navbar item objects from static navbar arrays.

## When not to use it

Do not use this rule if your navbar intentionally includes placeholder objects for later runtime population.

> **Rule catalog ID:** R076

## Further reading

- [Docusaurus navbar items](https://docusaurus.io/docs/api/themes/configuration#navbar-items)
