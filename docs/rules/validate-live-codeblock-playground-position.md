# validate-live-codeblock-playground-position

Validate `themeConfig.liveCodeBlock.playgroundPosition` against the supported Docusaurus values.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files.

It validates:

- `themeConfig.liveCodeBlock.playgroundPosition`

## What this rule reports

This rule reports static `playgroundPosition` values that are not one of the supported Docusaurus options:

- `"top"`
- `"bottom"`

## Why this rule exists

The Docusaurus live-codeblock docs document `playgroundPosition` as a constrained option with only two supported values.

Using another string leaves the config in an invalid or misleading state and makes the playground placement harder to reason about.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        liveCodeBlock: {
            playgroundPosition: "side",
        },
    },
};
```

## ✅ Correct

```ts
export default {
    themeConfig: {
        liveCodeBlock: {
            playgroundPosition: "bottom",
        },
    },
};
```

## Behavior and migration notes

This rule provides suggestions to rewrite invalid static values to either `"top"` or `"bottom"`.

It does not guess which one you actually intended.

## Additional examples

### ❌ Incorrect — empty string

```ts
export default {
    themeConfig: {
        liveCodeBlock: {
            playgroundPosition: "",
        },
    },
};
```

### ✅ Correct — top playground

```ts
export default {
    themeConfig: {
        liveCodeBlock: {
            playgroundPosition: "top",
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

Do not use this rule if your project intentionally computes `playgroundPosition` dynamically and you do not want linting to validate static values on this config surface.

> **Rule catalog ID:** R095

## Further reading

- [Docusaurus theme docs: `@docusaurus/theme-live-codeblock`](https://docusaurus.io/docs/3.8.1/api/themes/@docusaurus/theme-live-codeblock)
