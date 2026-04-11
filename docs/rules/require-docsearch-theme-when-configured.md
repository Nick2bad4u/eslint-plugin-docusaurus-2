# require-docsearch-theme-when-configured

Require `@docusaurus/theme-search-algolia` or `@docusaurus/preset-classic` when DocSearch or Algolia search config is present.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files.

It reports search config under:

- `themeConfig.docsearch`
- `themeConfig.algolia`

when the nearest `package.json` does not declare either:

- `@docusaurus/theme-search-algolia`
- `@docusaurus/preset-classic`

## What this rule reports

This rule reports DocSearch or Algolia config that is present without the theme package or classic preset that provides the search UI integration.

## Why this rule exists

Configuring search credentials alone is not enough. A site also needs the search theme surface that renders the DocSearch integration.

If a project uses `themeConfig.docsearch` or `themeConfig.algolia` without either `@docusaurus/theme-search-algolia` or `@docusaurus/preset-classic`, the config is incomplete and likely to confuse maintainers.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        docsearch: {
            apiKey: "KEY",
            appId: "APP",
            indexName: "docs",
        },
    },
};
```

Without either `@docusaurus/theme-search-algolia` or `@docusaurus/preset-classic` declared in the nearest `package.json`.

## ✅ Correct

```ts
export default {
    themeConfig: {
        docsearch: {
            apiKey: "KEY",
            appId: "APP",
            indexName: "docs",
        },
    },
};
```

With either `@docusaurus/theme-search-algolia` or `@docusaurus/preset-classic` declared in the nearest `package.json`.

## Behavior and migration notes

This rule reports only.

It does not edit `package.json` automatically.

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## When not to use it

Do not use this rule if your repository intentionally relies on a higher-level workspace package manifest and you do not want each Docusaurus site workspace to declare the search theme or classic preset locally.

> **Rule catalog ID:** R118

## Further reading

- [Docusaurus search docs](https://docusaurus.io/docs/search)
- [Docusaurus theme docs: `@docusaurus/theme-search-algolia`](https://docusaurus.io/docs/3.8.1/api/themes/@docusaurus/theme-search-algolia)
