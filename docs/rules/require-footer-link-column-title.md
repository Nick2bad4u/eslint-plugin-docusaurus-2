# require-footer-link-column-title

Require a non-empty `title` for Docusaurus footer link columns.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files and specifically on footer column objects under `themeConfig.footer.links`.

It targets footer column objects that declare:

- `items`

and expects them to also declare:

- `title`

## What this rule reports

This rule reports footer link columns that omit `title` or resolve it to an empty static string.

## Why this rule exists

Docusaurus multi-column footers are sectioned navigation groups.

When a column has an `items` array but no title, the footer structure becomes harder to understand and drifts away from the documented footer-column shape.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        footer: {
            links: [
                {
                    items: [{ label: "Docs", to: "/docs/intro" }],
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
                    items: [{ label: "Docs", to: "/docs/intro" }],
                },
            ],
        },
    },
};
```

## Behavior and migration notes

This rule reports only. It does not autofix.

Choosing the right footer column title is a content decision and should not be guessed by a fixer.

## When not to use it

Do not use this rule if your project intentionally permits untitled footer columns and you do not want linting to enforce the documented Docusaurus footer-column contract.

> **Rule catalog ID:** R038

## Further reading

- [Docusaurus theme configuration: footer links](https://docusaurus.io/docs/api/themes/configuration)
