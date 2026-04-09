# no-empty-footer-link-items

Disallow empty footer link item objects inside static footer column `items` arrays.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects footer link item objects inside `themeConfig.footer.links[*].items`.

## What this rule reports

This rule reports empty footer link item objects such as `{}` that do not contribute any content or destination.

## Why this rule exists

Empty footer link items add noise and usually come from unfinished or copied configuration.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        footer: {
            links: [
                {
                    title: "Docs",
                    items: [{}, { label: "Overview", to: "/docs" }],
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

This rule autofixes by removing empty footer link item objects from static footer arrays.

## When not to use it

Do not use this rule if your footer items intentionally use placeholder objects for later runtime population.

> **Rule catalog ID:** R074

## Further reading

- [Docusaurus footer configuration](https://docusaurus.io/docs/api/themes/configuration#footer)
