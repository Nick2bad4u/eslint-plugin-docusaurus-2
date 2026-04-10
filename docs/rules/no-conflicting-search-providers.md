# no-conflicting-search-providers

Disallow configuring a local-search plugin together with Algolia/DocSearch provider settings in the same Docusaurus site config.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files.

It reports combinations such as:

- `themeConfig.docsearch` with a known local-search plugin entry
- `themeConfig.algolia` with a known local-search plugin entry

Known local-search plugin entries currently include:

- `@cmfcmf/docusaurus-search-local`
- `@easyops-cn/docusaurus-search-local`
- `docusaurus-plugin-search-local`

## What this rule reports

This rule reports config that tries to enable two different site-search providers at once.

## Why this rule exists

Search-provider setup is a product choice, not something most sites want duplicated.

Combining a local-search plugin with Algolia/DocSearch config usually means the site is carrying overlapping search integrations that can:

- confuse maintainers about which provider is authoritative
- make search UX drift harder to reason about
- increase config complexity without a clear user-facing win

## ❌ Incorrect

```ts
export default {
    plugins: ["@easyops-cn/docusaurus-search-local"],
    themeConfig: {
        docsearch: {
            appId: "APP",
            apiKey: "KEY",
            indexName: "docs",
        },
    },
};
```

## ✅ Correct

```ts
export default {
    plugins: ["@easyops-cn/docusaurus-search-local"],
};
```

## Behavior and migration notes

This rule is report-only.

It does not try to remove one provider automatically because that would be a product-level decision, not a safe mechanical rewrite.

## Additional examples

### ❌ Incorrect — local search with legacy Algolia alias

```ts
export default {
    plugins: [["@cmfcmf/docusaurus-search-local", { indexDocs: true }]],
    themeConfig: {
        algolia: {
            appId: "APP",
            apiKey: "KEY",
            indexName: "docs",
        },
    },
};
```

### ✅ Correct — Algolia/DocSearch only

```ts
export default {
    themeConfig: {
        docsearch: {
            appId: "APP",
            apiKey: "KEY",
            indexName: "docs",
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

Do not use this rule if you intentionally keep two search providers configured during a short-lived migration window and you do not want linting to report that overlap.

> **Rule catalog ID:** R091

## Further reading

- [Docusaurus search docs](https://docusaurus.io/docs/3.8.1/search)
- [Algolia DocSearch adapter docs](https://docsearch.algolia.com/docs/docusaurus-adapter/)
- [Community local search resources](https://docusaurus.io/community/resources#search)
