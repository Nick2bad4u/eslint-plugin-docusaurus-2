# no-duplicate-footer-link-item-labels

Disallow duplicate static footer link item labels within the same footer column.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects `themeConfig.footer.links[*].items` arrays.

## What this rule reports

This rule reports repeated static `label` values within the same footer column items array. Comparison is case-insensitive and trims surrounding whitespace.

## Why this rule exists

Duplicate footer labels make navigation sections harder to scan and reduce the value of descriptive link text. Unique labels per column improve clarity.

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
                        { label: "Overview", to: "/rules" },
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

This rule reports only. It does not autofix because renaming labels safely requires author intent.

## When not to use it

Do not use this rule if your footer intentionally repeats labels in a column for branding or localization reasons.

> **Rule catalog ID:** R058

## Further reading

- [Docusaurus footer configuration](https://docusaurus.io/docs/api/themes/configuration#footer)
