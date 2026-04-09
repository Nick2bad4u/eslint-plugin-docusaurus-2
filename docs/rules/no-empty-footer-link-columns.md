# no-empty-footer-link-columns

Disallow footer link columns whose `items` arrays are statically empty.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects `themeConfig.footer.links` column objects.

## What this rule reports

This rule reports footer columns whose `items` arrays resolve statically to `[]`.

## Why this rule exists

Empty footer columns take up space, add visual noise, and often indicate unfinished or copy/pasted configuration.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        footer: {
            links: [{ title: "Docs", items: [] }],
        },
    },
};
```

## ✅ Correct

```ts
export default {
    themeConfig: {
        footer: {
            links: [
                {
                    title: "Docs",
                    items: [{ label: "Overview", to: "/docs" }],
                },
            ],
        },
    },
};
```

## Behavior and migration notes

This rule autofixes by removing empty footer columns from static `themeConfig.footer.links` arrays.

## When not to use it

Do not use this rule if your footer intentionally includes placeholder columns for later runtime population.

> **Rule catalog ID:** R067

## Further reading

- [Docusaurus footer configuration](https://docusaurus.io/docs/api/themes/configuration#footer)
