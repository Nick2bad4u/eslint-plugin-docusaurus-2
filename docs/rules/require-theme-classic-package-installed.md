# require-theme-classic-package-installed

Require `@docusaurus/theme-classic` or `@docusaurus/preset-classic` to be declared in the nearest package manifest when `@docusaurus/theme-classic` is configured directly.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files.

It reports direct top-level `themes` usage of `@docusaurus/theme-classic` when the nearest `package.json` does not declare either:

- `@docusaurus/theme-classic`
- `@docusaurus/preset-classic`

## What this rule reports

This rule reports direct classic-theme module usage that is configured in site config but missing from the nearest package manifest dependency fields.

## Why this rule exists

If a site explicitly configures `@docusaurus/theme-classic`, the workspace owning that config should also declare either the theme package itself or the classic preset that supplies it.

That keeps dependency ownership explicit and avoids config that only works because of unrelated hoisting or transitive installs.

## ❌ Incorrect

```ts
export default {
    themes: ["@docusaurus/theme-classic"],
};
```

## ✅ Correct

```ts
export default {
    themes: ["@docusaurus/theme-classic"],
};
```

With either `@docusaurus/theme-classic` or `@docusaurus/preset-classic` declared in the nearest `package.json` dependency fields.

## Behavior and migration notes

This rule is report-only.

It does not edit `package.json` automatically.

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## When not to use it

Do not use this rule if your repository intentionally relies on a higher-level workspace package manifest and you do not want each Docusaurus site workspace to declare the classic theme or preset locally.

> **Rule catalog ID:** R102

## Further reading

- [Docusaurus theme docs: `@docusaurus/theme-classic`](https://docusaurus.io/docs/api/themes/@docusaurus/theme-classic)
