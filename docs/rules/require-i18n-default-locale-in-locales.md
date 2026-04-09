# require-i18n-default-locale-in-locales

Require `i18n.locales` to include `i18n.defaultLocale` when `i18n` config is declared.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects the top-level `i18n` object.

## What this rule reports

This rule reports when:

- `i18n.defaultLocale` is missing or statically empty, or
- `i18n.locales` does not include `i18n.defaultLocale`.

## Why this rule exists

Locale routing and fallback behavior assume the default locale is part of the supported locale set. Keeping `defaultLocale` and `locales` aligned avoids hard-to-debug locale routing mismatches.

## ❌ Incorrect

```ts
export default {
    i18n: {
        defaultLocale: "en",
        locales: ["fr"],
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

This rule autofixes static-array cases by appending `defaultLocale` to `locales`.

When `locales` is identifier-backed but statically resolvable, it reports and provides a suggestion to replace the property value with an explicit array literal that includes `defaultLocale`.

## When not to use it

Do not use this rule if your locale configuration is intentionally dynamic and enforced outside ESLint checks.

> **Rule catalog ID:** R051

## Further reading

- [Docusaurus i18n guide](https://docusaurus.io/docs/i18n/introduction)
- [Docusaurus site config reference](https://docusaurus.io/docs/api/docusaurus-config)
