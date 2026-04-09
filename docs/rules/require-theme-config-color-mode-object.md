# require-theme-config-color-mode-object

Require `themeConfig.colorMode` to be explicitly configured when theme color mode behavior is part of the authored site contract.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects `themeConfig.colorMode`.

## What this rule reports

This rule reports when `themeConfig` is present but does not define a `colorMode` object.

## Why this rule exists

Color mode behavior affects first-load UX, switching behavior, and user preference handling. Requiring explicit configuration makes that behavior visible in review.

## ❌ Incorrect

```ts
export default {
    themeConfig: {},
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

This rule reports and provides suggestions to insert a minimal `colorMode` object with either `defaultMode: "light"` or `defaultMode: "dark"`.

## When not to use it

Do not use this rule if your project intentionally leaves color-mode behavior implicit.

> **Rule catalog ID:** R082

## Further reading

- [Docusaurus color mode configuration](https://docusaurus.io/docs/api/themes/configuration#color-mode)
