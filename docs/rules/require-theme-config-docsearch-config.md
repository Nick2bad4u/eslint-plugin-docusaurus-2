# require-theme-config-docsearch-config

Require `themeConfig.docsearch` or the legacy `themeConfig.algolia` alias to declare non-empty `appId`, `apiKey`, and `indexName` values.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files.

It validates the object-literal search config under either of these keys:

- `themeConfig.docsearch`
- `themeConfig.algolia`

## What this rule reports

This rule reports search config objects that omit any of the required Algolia DocSearch keys:

- `appId`
- `apiKey`
- `indexName`

It also reports those keys when they are present as empty strings or invalid literal values.

## Why this rule exists

Algolia DocSearch wiring is not meaningful without the required connection keys.

Leaving one of them out produces config that looks complete in code review but still cannot power the actual search integration.

This rule keeps the config honest and closer to the documented Docusaurus search setup.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        docsearch: {
            appId: "APP",
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

This rule is intentionally report-only.

It cannot safely invent or guess the missing Algolia credentials and index metadata for you.

## Additional examples

### ❌ Incorrect — empty or invalid literal values

```ts
export default {
    themeConfig: {
        algolia: {
            appId: "",
            apiKey: true,
            indexName: "docs",
        },
    },
};
```

### ✅ Correct — dynamic environment-based values are still acceptable

```ts
const appId = process.env["ALGOLIA_APP_ID"];
const apiKey = process.env["ALGOLIA_API_KEY"];
const indexName = process.env["ALGOLIA_INDEX_NAME"];

export default {
    themeConfig: {
        docsearch: {
            appId,
            apiKey,
            indexName,
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

Do not use this rule if your project intentionally keeps incomplete placeholder search config checked in and you do not want linting to report it.

> **Rule catalog ID:** R090

## Further reading

- [Docusaurus search docs](https://docusaurus.io/docs/3.8.1/search)
- [Algolia DocSearch adapter docs](https://docsearch.algolia.com/docs/docusaurus-adapter/)
