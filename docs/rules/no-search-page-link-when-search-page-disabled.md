# no-search-page-link-when-search-page-disabled

Disallow theme-config navbar or footer links to `/search` when search page support is explicitly disabled.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files.

It reports theme-config navbar or footer links to `/search` when search config sets:

- `searchPagePath: false`

under either:

- `themeConfig.docsearch`
- `themeConfig.algolia`

## What this rule reports

This rule reports links to the default search page when that search page has been explicitly disabled.

## Why this rule exists

Disabling the search page and still linking to `/search` creates a broken or misleading navigation experience.

That is a real config mismatch, not a style preference.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        docsearch: {
            apiKey: "KEY",
            appId: "APP",
            indexName: "docs",
            searchPagePath: false,
        },
        navbar: {
            items: [{ to: "/search", label: "Search" }],
        },
    },
};
```

## ✅ Correct

```ts
export default {
    themeConfig: {
        docsearch: {
            apiKey: "KEY",
            appId: "APP",
            indexName: "docs",
            searchPagePath: false,
        },
        navbar: {
            items: [{ to: "/docs", label: "Docs" }],
        },
    },
};
```

## Behavior and migration notes

This rule reports only.

If you want a dedicated search page, keep `searchPagePath` enabled and point your navigation at that route deliberately.

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## When not to use it

Do not use this rule if your navigation intentionally points to a custom `/search` page that is unrelated to Docusaurus DocSearch page support.

> **Rule catalog ID:** R119

## Further reading

- [Docusaurus search docs](https://docusaurus.io/docs/search)
