# require-config-link-destination

Require Docusaurus theme-config link items to provide a destination through `to`, `href`, or footer `html`.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files and on default link items authored inside:

- `themeConfig.navbar.items`
- `themeConfig.footer.links`
- nested dropdown/footer item arrays that contain the same default link shape

It expects navbar and standard footer link items to provide a destination with:

- `to`
- `href`

Footer HTML pass-through items may use `html` instead.

## What this rule reports

This rule reports Docusaurus theme-config link items that do not provide a destination.

## Why this rule exists

Navbar and footer link items are navigation entries.

When a link item has content but no `to` or `href`, the config becomes misleading because the object looks like a navigable link without actually declaring where it should go.

This rule keeps default theme-config link items aligned with the documented Docusaurus link contract.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        navbar: {
            items: [
                {
                    label: "Docs",
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

Link destinations are semantic choices, so automatically inventing `to` or `href` values would be unsafe.

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

Do not use this rule if your project intentionally permits incomplete theme-config link placeholders and you do not want linting to enforce the documented Docusaurus navigation schema.

> **Rule catalog ID:** R031

## Further reading

- [Docusaurus theme configuration](https://docusaurus.io/docs/api/themes/configuration)
