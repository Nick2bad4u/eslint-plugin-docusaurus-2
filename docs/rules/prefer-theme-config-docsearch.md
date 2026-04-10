# prefer-theme-config-docsearch

Prefer the canonical `themeConfig.docsearch` key over the backward-compatible `themeConfig.algolia` alias.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files.

It targets the search provider config keys inside `themeConfig`:

- `themeConfig.docsearch`
- `themeConfig.algolia`

## What this rule reports

This rule reports two situations:

- `themeConfig.algolia` is used on its own instead of the canonical `themeConfig.docsearch` key
- both `themeConfig.docsearch` and `themeConfig.algolia` are defined at the same time

## Why this rule exists

The DocSearch adapter docs explicitly describe `themeConfig.docsearch` as the canonical key and `themeConfig.algolia` as a backward-compatible alias.

Using the canonical key is better because it:

- keeps the config aligned with current DocSearch guidance
- avoids drift between old alias usage and newer DocSearch examples
- makes future search-related docs and migrations easier to follow

## ❌ Incorrect

```ts
export default {
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

This rule autofixes the simple alias-only case by renaming the property key from `algolia` to `docsearch`.

If both keys are already defined, the rule still reports the conflict but does **not** autofix it because the intended final merge is ambiguous.

## Additional examples

### ❌ Incorrect — conflicting alias and canonical key

```ts
export default {
    themeConfig: {
        docsearch: {
            appId: "APP",
            apiKey: "KEY",
            indexName: "docs",
        },
        algolia: {
            appId: "APP",
            apiKey: "KEY",
            indexName: "docs",
        },
    },
};
```

### ✅ Correct — only the canonical key remains

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

Do not use this rule if you deliberately keep the legacy alias for a short compatibility window and do not want linting to normalize it yet.

> **Rule catalog ID:** R089

## Further reading

- [Algolia DocSearch adapter docs: `docsearch` vs `algolia`](https://docsearch.algolia.com/docs/docusaurus-adapter/)
- [Docusaurus search docs](https://docusaurus.io/docs/3.8.1/search)
