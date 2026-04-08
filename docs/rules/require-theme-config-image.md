# require-theme-config-image

Require `themeConfig.image` so Docusaurus has a default social-card image.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files.

It checks whether the default-exported Docusaurus config provides:

- `themeConfig.image`

The rule accepts direct string literals and local identifier bindings that resolve to a non-empty static string.

## What this rule reports

This rule reports Docusaurus config files that omit `themeConfig.image` or configure it with an empty static value.

## Why this rule exists

Docusaurus uses `themeConfig.image` as the default social-card image for pages that do not provide a page-specific override.

When that default is missing, social previews become inconsistent and maintainers have to rely on per-page metadata everywhere.

Keeping a site-level default image in the config makes Open Graph and Twitter metadata behavior more predictable across the whole site.

## ❌ Incorrect

```ts
export default {
    title: "Docs",
    url: "https://example.com",
    baseUrl: "/docs/",
    themeConfig: {},
};
```

## ✅ Correct

```ts
const socialCardImagePath = "img/social-card.png";

export default {
    title: "Docs",
    url: "https://example.com",
    baseUrl: "/docs/",
    themeConfig: {
        image: socialCardImagePath,
    },
};
```

## Behavior and migration notes

This rule reports only. It does not autofix.

Choosing the right social-card image is a content decision, not a safe text rewrite.

## Additional examples

### ✅ Correct — environment-backed image path

```ts
export default {
    themeConfig: {
        image: process.env["DOCUSAURUS_SOCIAL_IMAGE"],
    },
};
```

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.strict];
```

## When not to use it

Do not use this rule if your project intentionally avoids a site-wide default social image and instead requires every page to manage social-card metadata independently.

> **Rule catalog ID:** R024

## Further reading

- [Docusaurus SEO guide](https://docusaurus.io/docs/seo)
- [Docusaurus theme configuration](https://docusaurus.io/docs/api/themes/configuration)
