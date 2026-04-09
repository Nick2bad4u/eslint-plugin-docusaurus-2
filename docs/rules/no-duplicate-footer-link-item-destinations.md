# no-duplicate-footer-link-item-destinations

Disallow duplicate static footer link destinations within the same footer column.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects `themeConfig.footer.links[*].items` arrays.

## What this rule reports

This rule reports later footer items in the same column that repeat an earlier static `to` or `href` destination.

## Why this rule exists

Duplicate footer destinations usually come from copy/paste mistakes and make footer navigation noisier without adding value.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        footer: {
            links: [
                {
                    title: "Docs",
                    items: [
                        { label: "Overview", to: "/docs" },
                        { label: "Read the docs", to: "/docs" },
                    ],
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
                    items: [
                        { label: "Overview", to: "/docs" },
                        { label: "Rules", to: "/rules" },
                    ],
                },
            ],
        },
    },
};
```

## Behavior and migration notes

This rule reports and provides a suggestion to remove the later duplicate footer item.

## When not to use it

Do not use this rule if your footer intentionally repeats destinations within a column for content or localization reasons.

> **Rule catalog ID:** R065

## Further reading

- [Docusaurus footer configuration](https://docusaurus.io/docs/api/themes/configuration#footer)
