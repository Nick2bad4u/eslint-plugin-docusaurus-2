# require-pages-plugin-excludes

Require explicit `pages.exclude` patterns when Docusaurus classic preset pages config customizes `include`.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files and specifically on `@docusaurus/preset-classic` page-plugin options.

It targets configs that customize:

- `pages.include`

and expects them to also configure `pages.exclude` with the patterns needed to keep declarations and test helpers from becoming routes.

## What this rule reports

This rule reports classic-preset `pages` configs that customize `include` but omit required `exclude` patterns.

The required exclude patterns are:

- `"**/*.d.ts"`
- `"**/*.d.tsx"`
- `"**/__tests__/**"`
- `"**/*.test.{js,jsx,ts,tsx}"`
- `"**/*.spec.{js,jsx,ts,tsx}"`

## Why this rule exists

Docusaurus turns JavaScript and TypeScript files under `src/pages/` into routes.

The Docusaurus pages guide warns that helper files inside `src/pages/` can become routable pages unless they are excluded.
When a config customizes `pages.include`, being explicit about `pages.exclude` becomes more important because:

- declaration files can accidentally enter the pages glob
- test files can show up as routes in local development or production builds
- helper modules inside `src/pages/` become easier to misconfigure

## ❌ Incorrect

```ts
export default {
    presets: [
        [
            "classic",
            {
                pages: {
                    path: "src/pages",
                    include: ["**/*.{js,jsx,ts,tsx,md,mdx}"],
                },
            },
        ],
    ],
};
```

## ✅ Correct

```ts
export default {
    presets: [
        [
            "classic",
            {
                pages: {
                    path: "src/pages",
                    include: ["**/*.{js,jsx,ts,tsx,md,mdx}"],
                    exclude: [
                        "**/*.d.ts",
                        "**/*.d.tsx",
                        "**/__tests__/**",
                        "**/*.test.{js,jsx,ts,tsx}",
                        "**/*.spec.{js,jsx,ts,tsx}",
                    ],
                },
            },
        ],
    ],
};
```

## Behavior and migration notes

This rule autofixes the common literal-object cases it can safely rewrite.

It will:

- insert a missing `exclude` property
- append any missing required exclude patterns to an existing `exclude` array

## Additional examples

### ✅ Correct — no custom include, no forced exclude requirement

```ts
export default {
    presets: [["classic", { pages: {} }]],
};
```

### ❌ Incorrect — partial exclude list

```ts
export default {
    presets: [
        [
            "classic",
            {
                pages: {
                    include: ["**/*.{js,jsx,ts,tsx,md,mdx}"],
                    exclude: ["**/*.d.ts"],
                },
            },
        ],
    ],
};
```

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.strict];
```

## When not to use it

Do not use this rule if your project intentionally manages `plugin-content-pages` include/exclude behavior outside the classic preset shape that this rule targets.

> **Rule catalog ID:** R012

## Further reading

- [Docusaurus creating pages guide](https://docusaurus.io/docs/creating-pages)
- [Docusaurus configuration docs](https://docusaurus.io/docs/configuration)
