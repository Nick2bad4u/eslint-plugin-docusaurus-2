# no-conflicting-theme-config-color-mode-flags

Disallow `themeConfig.colorMode` from combining `disableSwitch: true` with `respectPrefersColorScheme: true` in static config.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects `themeConfig.colorMode`.

## What this rule reports

This rule reports static `colorMode` objects that set both:

- `disableSwitch: true`, and
- `respectPrefersColorScheme: true`

## Why this rule exists

If the color mode switch is disabled, respecting the user's preferred color scheme usually creates a confusing contract: the user cannot change the mode even though the site still reacts to external preference state.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        colorMode: {
            disableSwitch: true,
            respectPrefersColorScheme: true,
        },
    },
};
```

## ✅ Correct

```ts
export default {
    themeConfig: {
        colorMode: {
            disableSwitch: true,
            respectPrefersColorScheme: false,
        },
    },
};
```

## Behavior and migration notes

This rule autofixes by forcing `respectPrefersColorScheme` to `false` when the conflicting static combination is present.

## When not to use it

Do not use this rule if your site intentionally treats the system preference as immutable while keeping the manual switch disabled.

> **Rule catalog ID:** R083

## Further reading

- [Docusaurus color mode configuration](https://docusaurus.io/docs/api/themes/configuration#color-mode)
