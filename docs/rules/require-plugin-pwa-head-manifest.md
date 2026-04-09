# require-plugin-pwa-head-manifest

Require plugin-pwa `pwaHead` to include a manifest link tag.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files when `@docusaurus/plugin-pwa` is configured in the top-level `plugins` array.

It expects the plugin-pwa options object to include a `pwaHead` entry with a manifest link tag.

## What this rule reports

This rule reports plugin-pwa setups that do not provide a manifest link tag in `pwaHead`.

## Why this rule exists

The Docusaurus PWA docs call out the manifest link tag as part of the minimal head setup for a usable progressive web app.

When plugin-pwa is enabled but the manifest link is missing, the configuration no longer reflects the documented setup needed for installation and PWA compliance.

## ❌ Incorrect

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

## ✅ Correct

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

## Behavior and migration notes

This rule reports only. It does not autofix.

The right manifest URL depends on the site’s base path and PWA setup, so a fixer should not guess it.

## When not to use it

Do not use this rule if your project intentionally configures plugin-pwa without a manifest link or you do not want linting to enforce the documented Docusaurus PWA head setup.

> **Rule catalog ID:** R042

## Further reading

- [Docusaurus plugin-pwa configuration](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-pwa)
