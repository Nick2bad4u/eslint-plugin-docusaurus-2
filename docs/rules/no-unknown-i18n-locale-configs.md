# no-unknown-i18n-locale-configs

Disallow `i18n.localeConfigs` entries whose locale keys are not present in `i18n.locales`.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files.

It compares the keys declared under `i18n.localeConfigs` with the locales listed in `i18n.locales`.

## What this rule reports

This rule reports locale config entries whose key is not part of the configured locale list.

## Why this rule exists

Docusaurus 3.9 expanded `i18n.localeConfigs` with new deployment and translation options.

Those keys only make sense for locales that actually exist in `i18n.locales`. Keeping unknown locale config entries around makes i18n deployment intent harder to review and can hide configuration drift.

## ❌ Incorrect

```ts
export default {
    i18n: {
        defaultLocale: "en",
        locales: ["en", "fr"],
        localeConfigs: {
            en: { url: "https://en.example.com" },
            de: { url: "https://de.example.com" },
        },
    },
};
```

## ✅ Correct

```ts
export default {
    i18n: {
        defaultLocale: "en",
        locales: ["en", "fr"],
        localeConfigs: {
            en: { url: "https://en.example.com" },
            fr: { url: "https://fr.example.com" },
        },
    },
};
```

## Behavior and migration notes

This rule reports only. It does not autofix, because removing a locale config or adding a locale to the deployment list both change site behavior.

## When not to use it

Do not use this rule if your i18n locale list is intentionally dynamic and you do not want linting to validate static `localeConfigs` keys.

> **Rule catalog ID:** R113

## Further reading

- [Docusaurus 3.9 release notes](https://docusaurus.io/blog/releases/3.9)
- [Docusaurus config: `i18n`](https://docusaurus.io/docs/api/docusaurus-config#i18n)
