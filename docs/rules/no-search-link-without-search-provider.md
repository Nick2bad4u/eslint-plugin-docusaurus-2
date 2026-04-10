# no-search-link-without-search-provider

Disallow linking theme-config navbar or footer items to the default search page when no known search provider is configured.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files.

It inspects theme-config navbar/footer link items that point to:

- `/search`

and reports them when no known search provider is configured through:

- `themeConfig.docsearch`
- `themeConfig.algolia`
- a supported local-search provider module

## What this rule reports

This rule reports default search-page links that appear in theme-config navigation even though the site config does not currently declare a known search provider.

## Why this rule exists

A visible `/search` navigation link strongly implies that the site actually has a search integration behind it.

If the config has no known search provider, that link is usually misleading or broken for users.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        navbar: {
            items: [{ label: "Search", to: "/search" }],
        },
    },
};
```

## ✅ Correct

```ts
export default {
    themes: ["@easyops-cn/docusaurus-search-local"],
    themeConfig: {
        navbar: {
            items: [{ label: "Search", to: "/search" }],
        },
    },
};
```

## Behavior and migration notes

This rule is report-only.

It does not automatically remove the link because some projects may intentionally route `/search` to a custom page that this plugin cannot prove from config alone.

## Additional examples

### ❌ Incorrect — footer search link without a provider

```ts
export default {
    themeConfig: {
        footer: {
            links: [
                {
                    title: "Resources",
                    items: [{ label: "Search", href: "/search" }],
                },
            ],
        },
    },
};
```

### ✅ Correct — DocSearch configured

```ts
export default {
    themeConfig: {
        docsearch: {
            appId: "APP",
            apiKey: "KEY",
            indexName: "docs",
        },
        navbar: {
            items: [{ label: "Search", to: "/search" }],
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

Do not use this rule if your project intentionally ships a custom `/search` page without one of the known search-provider config surfaces that this plugin understands.

> **Rule catalog ID:** R105

## Further reading

- [Docusaurus search docs](https://docusaurus.io/docs/3.8.1/search)
