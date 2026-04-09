# validate-theme-config-navbar-style

Require static `themeConfig.navbar.style` values to use supported Docusaurus navbar styles.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects `themeConfig.navbar.style`.

## What this rule reports

This rule reports static navbar `style` values that are invalid or use non-canonical casing/whitespace.

## Why this rule exists

Navbar style values affect the public appearance of the site header and should stay within Docusaurus' supported set.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        navbar: { style: "Dark" },
    },
};
```

```ts
export default {
    themeConfig: {
        navbar: { style: "secondary" },
    },
};
```

## ✅ Correct

```ts
export default {
    themeConfig: {
        navbar: { style: "dark" },
    },
};
```

```ts
export default {
    themeConfig: {
        navbar: { style: "primary" },
    },
};
```

## Behavior and migration notes

This rule autofixes valid-but-noncanonical static strings such as `"Dark"`.

For invalid static values, it reports and provides suggestions to set the style to `"dark"` or `"primary"`.

## When not to use it

Do not use this rule if your project intentionally injects nonstandard navbar style values through a later transform step.

> **Rule catalog ID:** R080

## Further reading

- [Docusaurus theme config navbar](https://docusaurus.io/docs/api/themes/configuration#navbar)
