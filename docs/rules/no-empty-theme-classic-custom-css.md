# no-empty-theme-classic-custom-css

Disallow empty `customCss` entries in Docusaurus classic theme config.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files.

It checks Docusaurus classic theme `customCss` configuration through:

- classic preset `theme.customCss`
- direct `@docusaurus/theme-classic` options

## What this rule reports

This rule reports empty `customCss` strings and empty string entries inside `customCss` arrays.

## Why this rule exists

`customCss` entries are file paths. Empty strings do not point to meaningful stylesheets and only make the config harder to read and review.

Removing empty entries keeps the classic theme config honest and easier to maintain.

## ❌ Incorrect

```ts
export default {
    presets: [[
        "@docusaurus/preset-classic",
        {
            theme: { customCss: "" },
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

This rule autofixes the simple literal cases it can safely prove:

- remove empty entries from `customCss` arrays
- remove a `customCss` property when its value is an empty string

## Additional examples

### ❌ Incorrect — empty array entry

```ts
export default {
    presets: [[
        "@docusaurus/preset-classic",
        {
            theme: {
                customCss: ["./src/css/custom.css", "", "./src/css/extra.css"],
            },
        },
    ]],
};
```

### ✅ Correct — only real stylesheet entries remain

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

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## When not to use it

Do not use this rule if your project intentionally keeps empty placeholder stylesheet entries during a staged migration and you do not want linting to remove them yet.

> **Rule catalog ID:** R096

## Further reading

- [Docusaurus theme docs: `@docusaurus/theme-classic`](https://docusaurus.io/docs/api/themes/@docusaurus/theme-classic)
