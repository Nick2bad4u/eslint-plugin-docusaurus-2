# no-duplicate-plugin-pwa-head-tags

Disallow duplicate `@docusaurus/plugin-pwa` `pwaHead` object entries.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects `@docusaurus/plugin-pwa` option objects, specifically their `pwaHead` arrays.

## What this rule reports

This rule reports duplicate `pwaHead` object entries that repeat an earlier tag definition with the same property/value signature.

## Why this rule exists

Duplicate head-tag entries make PWA config harder to audit and can produce redundant metadata/link entries in generated pages.

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
                        tagName: "link",
                        rel: "manifest",
                        href: "/manifest.json",
                    },
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

This rule autofixes by removing duplicate `pwaHead` object entries after the first occurrence.

## When not to use it

Do not use this rule if your `pwaHead` entries are intentionally duplicated for custom runtime mutation behavior.

> **Rule catalog ID:** R053

## Further reading

- [Docusaurus plugin-pwa configuration](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-pwa)
