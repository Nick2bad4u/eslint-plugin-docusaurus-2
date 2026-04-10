# require-theme-classic-custom-css-files-exist

Require statically configured Docusaurus classic-theme `customCss` paths to exist.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files.

It validates statically known classic-theme `customCss` entries from:

- classic preset `theme.customCss`
- direct `@docusaurus/theme-classic` options

## What this rule reports

This rule reports `customCss` entries when the configured stylesheet path resolves to a file that does not exist.

## Why this rule exists

`customCss` is meant to load real theme stylesheets.

A missing file path leaves the classic theme config looking complete while pointing at a stylesheet that cannot actually be loaded.

## ❌ Incorrect

```ts
export default {
    presets: [[
        "@docusaurus/preset-classic",
        {
            theme: { customCss: "./src/css/missing.css" },
        },
    ]],
};
```

## ✅ Correct

```ts
export default {
    presets: [[
        "@docusaurus/preset-classic",
        {
            theme: { customCss: "./src/css/custom.css" },
        },
    ]],
};
```

## Behavior and migration notes

This rule is report-only.

It does not try to invent replacement stylesheet paths or remove missing entries automatically.

## Additional examples

### ❌ Incorrect — one missing entry inside a `customCss` array

```ts
export default {
    themes: [[
        "@docusaurus/theme-classic",
        {
            customCss: [
                require.resolve("./src/css/custom.css"),
                "./src/css/missing.css",
            ],
        },
    ]],
};
```

### ✅ Correct — only existing stylesheet paths

```ts
export default {
    themes: [[
        "@docusaurus/theme-classic",
        {
            customCss: [require.resolve("./src/css/custom.css")],
        },
    ]],
};
```

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## When not to use it

Do not use this rule if your project intentionally keeps unresolved placeholder stylesheet paths in config and you do not want linting to report them yet.

> **Rule catalog ID:** R098

## Further reading

- [Docusaurus theme docs: `@docusaurus/theme-classic`](https://docusaurus.io/docs/api/themes/@docusaurus/theme-classic)
