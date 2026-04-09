# validate-theme-config-color-mode-default-mode

Require `themeConfig.colorMode.defaultMode` to be present and to use canonical `"light"` or `"dark"` values when colorMode config is authored statically.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects `themeConfig.colorMode.defaultMode`.

## What this rule reports

This rule reports when `defaultMode` is:

- missing from a statically authored `colorMode` object,
- a statically invalid value, or
- a valid value with non-canonical casing/whitespace.

## Why this rule exists

Color mode defaults affect first-load UX and should be explicit and predictable in authored config.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        colorMode: {},
    },
};
```

```ts
export default {
    themeConfig: {
        colorMode: { defaultMode: "Dark" },
    },
};
```

## ✅ Correct

```ts
export default {
    themeConfig: {
        colorMode: { defaultMode: "dark" },
    },
};
```

## Behavior and migration notes

This rule autofixes valid-but-noncanonical static string values such as `"Dark"` to `"dark"`.

When `defaultMode` is missing or statically invalid, it reports and provides suggestions to set it to `"light"` or `"dark"`.

## When not to use it

Do not use this rule if your project intentionally leaves `defaultMode` implicit or resolves it outside static config.

> **Rule catalog ID:** R078

## Further reading

- [Docusaurus color mode configuration](https://docusaurus.io/docs/api/themes/configuration#color-mode)
