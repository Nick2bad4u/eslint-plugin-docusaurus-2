# require-config-link-content

Require Docusaurus theme-config link items to provide visible content via `label` or `html`.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files and on default link items authored inside:

- `themeConfig.navbar.items`
- `themeConfig.footer.links`
- nested dropdown/footer item arrays that contain the same default link shape

It expects those link items to provide visible content with either:

- `label`
- `html`

## What this rule reports

This rule reports Docusaurus theme-config link items that omit both `label` and `html`, or resolve those fields to an empty static string.

## Why this rule exists

Navbar and footer links need visible content so users understand what the link represents.

When a Docusaurus config link item has a destination but no content, the config no longer matches the documented theme link schema and the rendered navigation becomes ambiguous.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        navbar: {
            items: [
                {
                    to: "/docs/intro",
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
                    label: "Docs",
                    to: "/docs/intro",
                },
            ],
        },
    },
};
```

## Behavior and migration notes

This rule reports only. It does not autofix.

Choosing the right visible content for a link is a UX and content decision, not a safe automatic rewrite.

## Additional examples

### ✅ Correct — footer HTML pass-through item

```ts
export default {
    themeConfig: {
        footer: {
            links: [
                {
                    html: "<strong>Docs</strong>",
                },
            ],
        },
    },
};
```

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## When not to use it

Do not use this rule if your project intentionally permits unlabeled theme-config link items and you do not want linting to enforce the documented Docusaurus navigation schema.

> **Rule catalog ID:** R030

## Further reading

- [Docusaurus theme configuration](https://docusaurus.io/docs/api/themes/configuration)
