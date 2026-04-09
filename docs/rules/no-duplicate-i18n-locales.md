# no-duplicate-i18n-locales

Disallow duplicate entries in `i18n.locales`.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects `i18n.locales` when the locale array can be resolved statically.

## What this rule reports

This rule reports duplicate locale values in `i18n.locales`, including duplicates introduced through identifier-backed arrays.

## Why this rule exists

Duplicate locale entries add noise and can hide real i18n configuration mistakes during reviews. A deduplicated locale list is easier to maintain and reason about.

## ❌ Incorrect

```ts
export default {
    i18n: {
        defaultLocale: "en",
        locales: ["en", "fr", "en"],
    },
};
```

## ✅ Correct

```ts
export default {
    i18n: {
        defaultLocale: "en",
        locales: ["en", "fr"],
    },
};
```

## Behavior and migration notes

This rule autofixes direct array literals by removing duplicate entries after the first occurrence.

When `locales` is identifier-backed, the rule reports and provides a suggestion that replaces the property value with an explicit deduplicated array literal.

## When not to use it

Do not use this rule if your locale array is intentionally generated dynamically and duplicates are handled by external build-time tooling.

> **Rule catalog ID:** R052

## Further reading

- [Docusaurus i18n guide](https://docusaurus.io/docs/i18n/introduction)
