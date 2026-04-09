# require-plugin-pwa-head-theme-color

Require plugin-pwa `pwaHead` to include a `theme-color` meta tag.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files when `@docusaurus/plugin-pwa` is configured in the top-level `plugins` array.

It expects the plugin-pwa options object to include a `pwaHead` entry with a `theme-color` meta tag.

## What this rule reports

This rule reports plugin-pwa setups that do not provide a `theme-color` meta tag in `pwaHead`.

## Why this rule exists

The Docusaurus PWA docs list a theme-color meta tag as part of the minimal head setup for a PWA-compliant site.

When plugin-pwa is enabled but the theme-color tag is missing, the configuration no longer matches the documented PWA head setup that browsers use for installation and chrome theming.

## ❌ Incorrect

```ts
export default {
    plugins: [
        [
            "@docusaurus/plugin-pwa",
            {
                pwaHead: [
                    {
                        tagName: "link",
                        rel: "manifest",
                        href: "/manifest.json",
                    },
                ],
            },
        ],
    ],
};
```

## ✅ Correct

```ts
export default {
    plugins: [
        [
            "@docusaurus/plugin-pwa",
            {
                pwaHead: [
                    {
                        tagName: "meta",
                        name: "theme-color",
                        content: "#25c2a0",
                    },
                ],
            },
        ],
    ],
};
```

## Behavior and migration notes

This rule reports only. It does not autofix.

The right theme color depends on the site’s branding and PWA design choices, so a fixer should not invent one.

## When not to use it

Do not use this rule if your project intentionally configures plugin-pwa without a theme-color tag or you do not want linting to enforce the documented Docusaurus PWA head setup.

> **Rule catalog ID:** R043

## Further reading

- [Docusaurus plugin-pwa configuration](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-pwa)
