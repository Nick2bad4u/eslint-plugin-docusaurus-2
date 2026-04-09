# require-footer-link-column-items

Require an `items` array for Docusaurus footer link columns.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files and specifically on footer column objects under `themeConfig.footer.links`.

It targets footer column objects that declare:

- `title`

and expects them to also declare:

- `items`

When `items` is authored statically, this rule also expects it to be an array.

## What this rule reports

This rule reports two invalid footer-column shapes:

- footer columns that omit `items`
- footer columns whose static `items` value is not an array

## Why this rule exists

Docusaurus footer columns are containers for grouped footer links.

When a column has a title but no `items` array, the config becomes misleading and no longer matches the documented footer-column contract.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        footer: {
            links: [
                {
                    title: "Docs",
                },
                {
                    title: "Community",
                    items: "docs",
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

Maintainers still need to decide which footer links belong in the column.

## Additional examples

### ✅ Correct — identifier-backed items array

```ts
const footerItems = [{ label: "Docs", to: "/docs/intro" }];

export default {
    themeConfig: {
        footer: {
            links: [
                {
                    title: "Docs",
                    items: footerItems,
                },
            ],
        },
    },
};
```

## When not to use it

Do not use this rule if your project intentionally permits incomplete footer-column placeholders and you do not want linting to enforce the documented Docusaurus footer-column contract.

> **Rule catalog ID:** R039

## Further reading

- [Docusaurus theme configuration: footer links](https://docusaurus.io/docs/api/themes/configuration)
