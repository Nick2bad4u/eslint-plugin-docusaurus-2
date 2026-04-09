# require-theme-config-announcement-bar-id

Require `themeConfig.announcementBar.id` to be present and non-empty when an announcement bar is configured.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects `themeConfig.announcementBar`.

## What this rule reports

This rule reports announcement bar configs that omit `id` or provide a statically empty `id`.

## Why this rule exists

Docusaurus uses the announcement bar id to persist dismissal state reliably. Leaving it empty or missing creates unstable user experience.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        announcementBar: { content: "Hello" },
    },
};
```

## ✅ Correct

```ts
export default {
    themeConfig: {
        announcementBar: {
            id: "site-wide-banner",
            content: "Hello",
        },
    },
};
```

## Behavior and migration notes

This rule reports only. It does not autofix because the correct id value is project-specific.

## When not to use it

Do not use this rule if your announcement bar is intentionally transformed later to inject ids.

> **Rule catalog ID:** R086

## Further reading

- [Docusaurus announcement bar configuration](https://docusaurus.io/docs/api/themes/configuration#announcement-bar)
