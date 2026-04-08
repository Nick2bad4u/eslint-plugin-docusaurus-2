# no-conflicting-footer-html-item-props

Disallow footer HTML pass-through items from mixing `html` with `label`, `to`, or `href`.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files and specifically on footer link items authored under `themeConfig.footer.links`.

It targets footer items that declare:

- `html`

and also declare any of:

- `label`
- `to`
- `href`

## What this rule reports

This rule reports footer HTML pass-through items that also try to behave like normal footer links.

## Why this rule exists

Docusaurus footer HTML items are an escape hatch for raw custom markup.

When a footer item mixes `html` with normal link fields, the object becomes ambiguous and no longer matches the documented footer-item shape.

This rule keeps footer HTML pass-through items separate from standard footer links.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        footer: {
            links: [
                {
                    html: "<strong>Docs</strong>",
                    href: "https://example.com",
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
                    html: "<strong>Docs</strong>",
                },
                {
                    label: "Docs",
                    href: "https://example.com",
                },
            ],
        },
    },
};
```

## Behavior and migration notes

This rule reports only. It does not autofix.

Maintainers still have to decide whether the item should be a normal footer link or a raw HTML fragment.

## When not to use it

Do not use this rule if your project intentionally permits mixed footer HTML/link objects and you do not want linting to enforce the documented Docusaurus footer-item shape.

> **Rule catalog ID:** R033

## Further reading

- [Docusaurus theme configuration](https://docusaurus.io/docs/api/themes/configuration)
