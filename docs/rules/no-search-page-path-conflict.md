# no-search-page-path-conflict

Disallow Algolia/DocSearch `searchPagePath` values that collide with configured Docusaurus route base paths.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files.

It checks configured or default search page paths against route base paths from:

- classic preset `docs`, `blog`, and `pages`
- direct `@docusaurus/plugin-content-docs`
- direct `@docusaurus/plugin-content-blog`
- direct `@docusaurus/plugin-content-pages`

## What this rule reports

This rule reports search page paths that collide with another configured route base path.

## Why this rule exists

A search page path should be unique in the site's route space.

If it collides with another docs/blog/pages route root, the site config becomes ambiguous and harder to reason about.

## ❌ Incorrect

```ts
export default {
    presets: [[
        "classic",
        {
            docs: { routeBasePath: "docs" },
        },
    ]],
    themeConfig: {
        docsearch: {
            appId: "APP",
            apiKey: "KEY",
            indexName: "docs",
            searchPagePath: "docs",
        },
    },
};
```

## ✅ Correct

```ts
export default {
    presets: [[
        "classic",
        {
            docs: { routeBasePath: "docs" },
        },
    ]],
    themeConfig: {
        docsearch: {
            appId: "APP",
            apiKey: "KEY",
            indexName: "docs",
            searchPagePath: "search",
        },
    },
};
```

## Behavior and migration notes

This rule is report-only.

It does not guess a replacement path for you.

## Additional examples

### ❌ Incorrect — default `search` conflicts with a docs plugin route root

```ts
export default {
    plugins: [["@docusaurus/plugin-content-docs", { routeBasePath: "search" }]],
    themeConfig: {
        algolia: {
            appId: "APP",
            apiKey: "KEY",
            indexName: "docs",
        },
    },
};
```

### ✅ Correct — search page disabled

```ts
export default {
    themeConfig: {
        docsearch: {
            appId: "APP",
            apiKey: "KEY",
            indexName: "docs",
            searchPagePath: false,
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

Do not use this rule if your project intentionally keeps a route collision during a staged migration and you do not want linting to report it yet.

> **Rule catalog ID:** R106

## Further reading

- [Docusaurus search docs](https://docusaurus.io/docs/3.8.1/search)
