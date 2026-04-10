# no-duplicate-theme-classic-custom-css

Disallow duplicate `customCss` entries in Docusaurus classic theme config.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files.

It checks Docusaurus classic theme `customCss` arrays in:

- classic preset `theme.customCss`
- direct `@docusaurus/theme-classic` options

## What this rule reports

This rule reports duplicate `customCss` entries when multiple array items resolve to the same stylesheet path.

## Why this rule exists

Loading the same classic-theme stylesheet path more than once adds noise to the config without adding value.

Duplicate entries make it harder to review the theme surface and suggest configuration drift that should be cleaned up.

## ❌ Incorrect

```ts
export default {
    presets: [[
        "@docusaurus/preset-classic",
        {
            theme: {
                customCss: ["./src/css/custom.css", "./src/css/custom.css"],
            },
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
            theme: {
                customCss: ["./src/css/custom.css", "./src/css/extra.css"],
            },
        },
    ]],
};
```

## Behavior and migration notes

This rule autofixes duplicate array entries by removing later duplicates and keeping the first occurrence.

## Additional examples

### ❌ Incorrect — duplicate through `require.resolve`

```ts
export default {
    themes: [[
        "@docusaurus/theme-classic",
        {
            customCss: [
                require.resolve("./src/css/custom.css"),
                "./src/css/custom.css",
            ],
        },
    ]],
};
```

### ✅ Correct — one resolved stylesheet path

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

Do not use this rule if your project intentionally repeats the same stylesheet entry and you do not want linting to collapse those duplicates.

> **Rule catalog ID:** R097

## Further reading

- [Docusaurus theme docs: `@docusaurus/theme-classic`](https://docusaurus.io/docs/api/themes/@docusaurus/theme-classic)
