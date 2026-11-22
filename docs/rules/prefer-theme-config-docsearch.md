# prefer-theme-config-docsearch

Prefer `themeConfig.docsearch` for sites that configure the standalone DocSearch adapter.

## Targeted pattern scope

This rule checks `docusaurus.config.*` files that statically register `@docsearch/docusaurus-adapter` in `plugins` or `themes`. Docusaurus's built-in Algolia integration reads `themeConfig.algolia`. The rule leaves that key alone on sites that rely on the classic preset's built-in search, explicitly register `@docusaurus/theme-search-algolia`, or have no recognized adapter registration.

## What this rule reports

With the standalone adapter configured, the rule reports:

- `themeConfig.algolia` in place of `themeConfig.docsearch`
- both `themeConfig.docsearch` and `themeConfig.algolia` in the same configuration

## Why this rule exists

The standalone adapter uses `themeConfig.docsearch`. Version 4 also accepts `themeConfig.algolia` as a legacy alias. Changing the key on a site that uses the built-in integration can remove search because the classic preset loads the built-in search theme when `themeConfig.algolia` is present.

## ❌ Incorrect

```ts
export default {
 plugins: ["@docsearch/docusaurus-adapter"],
 themeConfig: {
  algolia: {
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
 plugins: ["@docsearch/docusaurus-adapter"],
 themeConfig: {
  docsearch: {
   appId: "APP",
   apiKey: "KEY",
   indexName: "docs",
  },
 },
};
```

## Behavior and migration notes

The autofix renames the property and preserves its value. When both keys are present, the rule reports the conflict and leaves both values for you to resolve.

The examples use DocSearch v4 options. Upgrading to v5 also requires updating the options, such as replacing `indexName` with `indices`.

## Additional examples

### ✅ Correct — built-in Algolia search with the classic preset

```ts
export default {
 presets: ["classic"],
 themeConfig: {
  algolia: {
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

Disable the rule if a DocSearch v4 site deliberately keeps the legacy alias during a migration.

> **Rule catalog ID:** R089

## Further reading

- [Algolia DocSearch v4 adapter configuration](https://docsearch.algolia.com/docs/v4/docusaurus-adapter/)
- [Migrate the Docusaurus adapter from v4](https://docsearch.algolia.com/docs/packages/docusaurus-adapter/migrating-from-v4/)
- [Docusaurus search docs](https://docusaurus.io/docs/search)
