# no-conflicting-config-link-props

Disallow Docusaurus config link items from declaring both `to` and `href` at the same time.

## Targeted pattern scope

This rule focuses on Docusaurus config link-item objects in `docusaurus.config.*` files.

It targets objects that look like navbar or footer link items and define both:

- `to`
- `href`

## What this rule reports

This rule reports Docusaurus config link items that declare both destination props on the same object.

## Why this rule exists

The Docusaurus theme configuration docs treat `to` and `href` as mutually exclusive choices:

- `to` for internal client-side navigation
- `href` for external or full-page navigation

Keeping both on the same item makes the config ambiguous and harder to review.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        navbar: {
            items: [
                {
                    label: "Docs",
                    to: "/docs/intro",
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

This rule autofixes only the safe redundant cases it can prove:

- identical internal `to`/`href` values → remove `href`
- identical external `to`/`href` values → remove `to`

When both values differ, the rule reports only, because the intended destination is ambiguous.

## Additional examples

### ✅ Correct — external link keeps only `href`

```ts
export default {
    themeConfig: {
        footer: {
            links: [
                {
                    title: "Project",
                    items: [
                        {
                            label: "GitHub",
                            href: "https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2",
                        },
                    ],
                },
            ],
        },
    },
};
```

### ❌ Incorrect — conflicting values need manual review

```ts
export default {
    themeConfig: {
        navbar: {
            items: [
                {
                    label: "Docs",
                    to: "/docs/intro",
                    href: "https://example.com/docs",
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

Do not use this rule if your project intentionally keeps both destination props in these objects and you do not want linting to enforce the documented mutual-exclusion pattern.

> **Rule catalog ID:** R018

## Further reading

- [Docusaurus theme configuration: navbar items](https://docusaurus.io/docs/api/themes/configuration)
- [Docusaurus theme configuration: `to` versus `href`](https://docusaurus.io/docs/api/themes/configuration)
