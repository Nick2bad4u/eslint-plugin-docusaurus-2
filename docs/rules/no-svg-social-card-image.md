# no-svg-social-card-image

Disallow SVG values for Docusaurus social-card image config fields.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files and the social-card image fields used by Docusaurus metadata.

It currently checks:

- top-level `image`
- `themeConfig.image`

It supports both direct string literals and local identifier bindings such as `const socialCardImagePath = "..."`.

## What this rule reports

This rule reports social-card image config values that resolve to `.svg` paths.

## Why this rule exists

The Docusaurus theme configuration docs explicitly note that the social-card image cannot be an SVG.

If a project uses an SVG there:

- social sharing metadata may not behave as expected
- the config drifts away from documented Docusaurus requirements
- reviewers may assume the image field is more flexible than it really is

## ❌ Incorrect

```ts
const socialCardImagePath = "img/logo.svg";

export default {
    image: socialCardImagePath,
    themeConfig: {
        image: "img/social-card.svg",
    },
};
```

## ✅ Correct

```ts
const socialCardImagePath = "img/logo.png";

export default {
    image: socialCardImagePath,
    themeConfig: {
        image: "img/social-card.png",
    },
};
```

## Behavior and migration notes

This rule reports only. It does not autofix.

Changing a social-card image from SVG to PNG/JPG/WebP is a content decision, not just a text rewrite. The rule intentionally leaves that final asset choice to the maintainer.

## Additional examples

### ✅ Correct — variable-backed raster path

```ts
const socialCardImagePath = "img/og-card.webp";

export default {
    image: socialCardImagePath,
};
```

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.strict];
```

## When not to use it

Do not use this rule if your project deliberately keeps SVG image values here and you do not want linting to enforce the Docusaurus documentation constraint.

> **Rule catalog ID:** R016

## Further reading

- [Docusaurus theme configuration: meta image](https://docusaurus.io/docs/api/themes/configuration)
- [Docusaurus config API](https://docusaurus.io/docs/api/docusaurus-config)
