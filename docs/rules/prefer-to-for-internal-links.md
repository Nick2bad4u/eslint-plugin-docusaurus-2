# prefer-to-for-internal-links

Prefer `to` over `href` for internal Docusaurus config links.

## Targeted pattern scope

This rule focuses on Docusaurus config link-item objects in `docusaurus.config.*` files.

- objects that look like navbar or footer link items
- internal routes expressed with `href: "/..."`

External URLs such as GitHub or npm links are ignored.

## What this rule reports

This rule reports Docusaurus config link items that use `href` for internal site routes.

- `href: "/docs/..."` in navbar items
- `href: "/docs/..."` in footer link items

## Why this rule exists

Docusaurus treats `to` and `href` differently.

- `to` is for client-side internal navigation
- `href` is for full-page navigation and external destinations
- `to` also participates in Docusaurus base URL handling automatically

Using `href` for internal routes makes config less idiomatic and can weaken routing consistency.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        navbar: {
            items: [
                {
                    label: "Docs",
                    href: "/docs/intro",
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

This rule provides an autofix that renames the property key from `href` to the client-routing `to` field for matching internal link items.

If a config object mixes other specialized Docusaurus link fields, review the result after autofix as part of normal config review.

## Additional examples

### ❌ Incorrect — Footer item

```ts
export default {
    themeConfig: {
        footer: {
            links: [
                {
                    title: "Docs",
                    items: [
                        {
                            label: "Rules overview",
                            href: "/docs/rules/overview",
                        },
                    ],
                },
            ],
        },
    },
};
```

### ✅ Correct — External link stays `href`

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

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## When not to use it

Do not use this rule if your project intentionally treats those objects as generic data structures outside Docusaurus config semantics.

> **Rule catalog ID:** R001

## Further reading

- [Docusaurus theme configuration: navbar items](https://docusaurus.io/docs/api/themes/configuration)
- [Docusaurus theme configuration: `to` versus `href`](https://docusaurus.io/docs/api/themes/configuration)
