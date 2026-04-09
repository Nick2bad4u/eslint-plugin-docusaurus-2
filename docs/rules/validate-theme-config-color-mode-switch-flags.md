# validate-theme-config-color-mode-switch-flags

Require static `themeConfig.colorMode` switch flags to use boolean values.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects boolean color mode flags such as:

- `disableSwitch`
- `respectPrefersColorScheme`

## What this rule reports

This rule reports static non-boolean values for those flags, including string forms like `"true"` and `"false"`.

## Why this rule exists

Boolean flags are clearer and less error-prone than stringly-typed values in plain JavaScript config.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        colorMode: { disableSwitch: "true" },
    },
};
```

## ✅ Correct

```ts
export default {
    themeConfig: {
        colorMode: { disableSwitch: true },
    },
};
```

## Behavior and migration notes

This rule autofixes direct string booleans to real boolean literals.

For other invalid static values, it reports and provides suggestions to set the flag to `true` or `false`.

## When not to use it

Do not use this rule if your project intentionally injects non-boolean flag values for later transformation.

> **Rule catalog ID:** R079

## Further reading

- [Docusaurus color mode configuration](https://docusaurus.io/docs/api/themes/configuration#color-mode)
