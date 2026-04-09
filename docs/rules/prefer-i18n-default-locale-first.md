# prefer-i18n-default-locale-first

Prefer placing `i18n.defaultLocale` first in `i18n.locales`.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects the `i18n` object when locale arrays are statically resolvable.

## What this rule reports

This rule reports when `i18n.locales` includes `defaultLocale` but does not place it at index `0`.

## Why this rule exists

Putting `defaultLocale` first makes locale-priority intent immediately visible and keeps locale arrays easier to audit during reviews.

## ❌ Incorrect

```ts
export default {
    i18n: {
        defaultLocale: "en",
        locales: ["fr", "en"],
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

This rule autofixes inline locale arrays by moving the first `defaultLocale` occurrence to the front.

For identifier-backed locale arrays, it reports and provides a suggestion that replaces the property value with an explicit reordered array literal.

## When not to use it

Do not use this rule if your team intentionally uses a different locale ordering convention.

> **Rule catalog ID:** R055

## Further reading

- [Docusaurus i18n guide](https://docusaurus.io/docs/i18n/introduction)
