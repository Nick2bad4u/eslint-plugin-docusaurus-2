# prefer-href-for-external-links

Prefer `href` over `to` for external Docusaurus config links.

## Targeted pattern scope

This rule focuses on Docusaurus config link-item objects in `docusaurus.config.*` files.

It targets objects that look like navbar or footer link items and use:

- `to: "https://..."`
- `to: "mailto:..."`
- `to: "tel:..."`

## What this rule reports

This rule reports Docusaurus config link items that use `to` for external destinations.

## Why this rule exists

For Docusaurus theme config link objects, the docs distinguish between:

- `to` for internal client-side navigation
- `href` for external or full-page navigation

Using `href` for external destinations keeps the config aligned with the documented theme semantics and makes review intent clearer.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        navbar: {
            items: [
                {
                    label: "GitHub",
                    to: "https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2",
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
                    label: "GitHub",
                    href: "https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2",
                },
            ],
        },
    },
};
```

## Behavior and migration notes

This rule provides an autofix that replaces the external-destination key `to` with `href` for matching link items.

## Additional examples

### ❌ Incorrect — external footer item

```ts
export default {
    themeConfig: {
        footer: {
            links: [
                {
                    title: "Project",
                    items: [
                        {
                            label: "NPM",
                            to: "https://www.npmjs.com/package/eslint-plugin-docusaurus-2",
                        },
                    ],
                },
            ],
        },
    },
};
```

### ✅ Correct — internal routes still use `to`

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

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## When not to use it

Do not use this rule if your project intentionally standardizes on `to` for external Docusaurus config links and you do not want linting to enforce the theme docs distinction.

> **Rule catalog ID:** R014

## Further reading

- [Docusaurus theme configuration: navbar items](https://docusaurus.io/docs/api/themes/configuration)
- [Docusaurus theme configuration: `to` versus `href`](https://docusaurus.io/docs/api/themes/configuration)
