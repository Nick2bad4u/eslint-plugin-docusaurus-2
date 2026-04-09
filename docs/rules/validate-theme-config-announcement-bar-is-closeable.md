# validate-theme-config-announcement-bar-is-closeable

Require static `themeConfig.announcementBar.isCloseable` values to use booleans.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects `themeConfig.announcementBar.isCloseable`.

## What this rule reports

This rule reports static non-boolean values for `isCloseable`, including string forms like `"true"` and `"false"`.

## Why this rule exists

Boolean flags are clearer and less error-prone than stringly-typed values in plain JavaScript config.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        announcementBar: { isCloseable: "true" },
    },
};
```

## ✅ Correct

```ts
export default {
    themeConfig: {
        announcementBar: { isCloseable: true },
    },
};
```

## Behavior and migration notes

This rule autofixes direct string booleans to real boolean literals.

For other invalid static values, it reports and provides suggestions to set the flag to `true` or `false`.

## When not to use it

Do not use this rule if your project intentionally injects non-boolean flag values for later transformation.

> **Rule catalog ID:** R087

## Further reading

- [Docusaurus announcement bar configuration](https://docusaurus.io/docs/api/themes/configuration#announcement-bar)
