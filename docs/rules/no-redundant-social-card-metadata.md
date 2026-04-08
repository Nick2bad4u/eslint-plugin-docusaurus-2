# no-redundant-social-card-metadata

Disallow manual `og:image` and `twitter:image` metadata entries when `themeConfig.image` is already configured.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files and specifically on:

- `themeConfig.image`
- `themeConfig.metadata`

It reports metadata entries for:

- `property: "og:image"`
- `name: "twitter:image"`

when `themeConfig.image` is already present.

## What this rule reports

This rule reports redundant manual social-card image metadata entries that duplicate the responsibility of `themeConfig.image`.

## Why this rule exists

The Docusaurus theme configuration docs say that `themeConfig.image` is the default image used for social metadata such as `og:image` and `twitter:image`.

Keeping manual entries for the same purpose:

- duplicates config responsibility
- makes image metadata harder to review
- increases the chance of the two sources drifting apart later

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        image: "img/social-card.png",
        metadata: [
            {
                property: "og:image",
                content: "https://example.com/img/social-card.png",
            },
        ],
    },
};
```

## ✅ Correct

```ts
export default {
    themeConfig: {
        image: "img/social-card.png",
        metadata: [],
    },
};
```

## Behavior and migration notes

This rule provides an autofix that removes the redundant metadata object entries from the `themeConfig.metadata` array.

It leaves unrelated metadata entries alone.

## Additional examples

### ✅ Correct — unrelated metadata can remain

```ts
export default {
    themeConfig: {
        image: "img/social-card.png",
        metadata: [
            {
                property: "og:site_name",
                content: "eslint-plugin-docusaurus-2",
            },
        ],
    },
};
```

### ✅ Correct — manual social-card metadata is allowed when `themeConfig.image` is absent

```ts
export default {
    themeConfig: {
        metadata: [
            {
                property: "og:image",
                content: "https://example.com/img/social-card.png",
            },
        ],
    },
};
```

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.strict];
```

## When not to use it

Do not use this rule if your project intentionally keeps manual social-card image metadata alongside `themeConfig.image` and you do not want linting to collapse that duplication.

> **Rule catalog ID:** R021

## Further reading

- [Docusaurus theme configuration: meta image](https://docusaurus.io/docs/api/themes/configuration)
- [Docusaurus theme configuration: metadata](https://docusaurus.io/docs/api/themes/configuration)
