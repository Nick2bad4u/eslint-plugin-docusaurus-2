# validate-theme-config-footer-style

Require static `themeConfig.footer.style` values to use supported Docusaurus footer styles.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects `themeConfig.footer.style`.

## What this rule reports

This rule reports static footer `style` values that are invalid or use non-canonical casing/whitespace.

## Why this rule exists

Footer style values affect the public appearance of the site footer and should stay within Docusaurus' supported set.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        footer: { style: "Light" },
    },
};
```

```ts
export default {
    themeConfig: {
        footer: { style: "primary" },
    },
};
```

## ✅ Correct

```ts
export default {
    themeConfig: {
        footer: { style: "light" },
    },
};
```

```ts
export default {
    themeConfig: {
        footer: { style: "dark" },
    },
};
```

## Behavior and migration notes

This rule autofixes valid-but-noncanonical static strings such as `"Light"`.

For invalid static values, it reports and provides suggestions to set the style to `"light"` or `"dark"`.

## When not to use it

Do not use this rule if your project intentionally injects nonstandard footer style values through a later transform step.

> **Rule catalog ID:** R081

## Further reading

- [Docusaurus theme config footer](https://docusaurus.io/docs/api/themes/configuration#footer)
