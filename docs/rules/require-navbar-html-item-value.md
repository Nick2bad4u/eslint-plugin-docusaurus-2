# require-navbar-html-item-value

Require `value` for Docusaurus navbar items with `type: "html"`.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files and on navbar items authored inside:

- `themeConfig.navbar.items`
- nested navbar dropdown `items`

It targets navbar items that declare:

- `type: "html"`

and expects them to also declare:

- `value`

## What this rule reports

This rule reports Docusaurus navbar HTML items that omit `value` or resolve it to an empty static string.

## Why this rule exists

Docusaurus `type: "html"` navbar items are an explicit raw-markup schema.

When `value` is missing, the item no longer matches the documented navbar HTML item contract and there is no actual HTML payload to render.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        navbar: {
            items: [
                {
                    type: "html",
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
        navbar: {
            items: [
                {
                    type: "html",
                    value: "<button>Docs</button>",
                },
            ],
        },
    },
};
```

## Behavior and migration notes

This rule reports only. It does not autofix.

Choosing the actual HTML fragment is an intentional authoring decision and cannot be inferred safely from syntax alone.

## When not to use it

Do not use this rule if your project intentionally permits incomplete navbar HTML placeholders and you do not want linting to enforce the documented Docusaurus navbar item contract.

> **Rule catalog ID:** R040

## Further reading

- [Docusaurus theme configuration: navbar HTML item](https://docusaurus.io/docs/api/themes/configuration)
