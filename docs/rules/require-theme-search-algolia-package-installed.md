# require-theme-search-algolia-package-installed

Require `@docusaurus/theme-search-algolia` or `@docusaurus/preset-classic` to be declared in the nearest package manifest when `@docusaurus/theme-search-algolia` is configured directly.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files.

It reports direct top-level `themes` usage of `@docusaurus/theme-search-algolia` when the nearest `package.json` does not declare either:

- `@docusaurus/theme-search-algolia`
- `@docusaurus/preset-classic`

## What this rule reports

This rule reports direct Algolia search-theme module usage that is configured in site config but missing from the nearest package manifest dependency fields.

## Why this rule exists

If a site explicitly configures `@docusaurus/theme-search-algolia`, the workspace owning that config should also declare either the theme package itself or the classic preset that supplies it.

That keeps dependency ownership explicit and avoids config that only works because of unrelated hoisting or transitive installs.

## ❌ Incorrect

```ts
export default {
    themes: ["@docusaurus/theme-search-algolia"],
};
```

## ✅ Correct

```ts
export default {
    themes: ["@docusaurus/theme-search-algolia"],
};
```

With either `@docusaurus/theme-search-algolia` or `@docusaurus/preset-classic` declared in the nearest `package.json` dependency fields.

## Behavior and migration notes

This rule is report-only.

It does not edit `package.json` automatically.

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## When not to use it

Do not use this rule if your repository intentionally relies on a higher-level workspace package manifest and you do not want each Docusaurus site workspace to declare the Algolia theme or classic preset locally.

> **Rule catalog ID:** R103

## Further reading

- [Docusaurus theme docs: `@docusaurus/theme-search-algolia`](https://docusaurus.io/docs/3.8.1/api/themes/@docusaurus/theme-search-algolia)
