# no-duplicate-footer-column-titles

Disallow duplicate static footer column titles.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects top-level footer link column objects under `themeConfig.footer.links`.

## What this rule reports

This rule reports repeated static `title` values across footer columns. Comparison is case-insensitive and trims surrounding whitespace.

## Why this rule exists

Duplicate footer column titles make footer navigation harder to scan and can hide accidental copy/paste mistakes.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        footer: {
            links: [
                { title: "Docs", items: [] },
                { title: "Docs", items: [] },
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
                { title: "Docs", items: [] },
                { title: "Project", items: [] },
            ],
        },
    },
};
```

## Behavior and migration notes

This rule reports only. It does not autofix because safe title changes require author intent.

## When not to use it

Do not use this rule if duplicate footer column titles are an intentional design choice in your site.

> **Rule catalog ID:** R060

## Further reading

- [Docusaurus footer configuration](https://docusaurus.io/docs/api/themes/configuration#footer)
