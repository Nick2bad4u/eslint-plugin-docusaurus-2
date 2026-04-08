# validate-theme-config-metadata

Require valid minimal object shape for `themeConfig.metadata` entries.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files and specifically on `themeConfig.metadata` arrays.

It validates metadata entries that should provide:

- either `name` or `property`
- `content`

## What this rule reports

This rule reports three invalid metadata-entry shapes:

- array entries that are not objects
- object entries that omit both `name` and `property`
- object entries that omit `content`

## Why this rule exists

`themeConfig.metadata` is easy to mistype because it is usually authored as loose JavaScript objects inside a config file.

When entries are missing their key fields or content payload, the metadata block becomes misleading and may not produce the tags a maintainer expects.

This rule keeps the minimal Docusaurus metadata entry shape explicit and reviewable.

## ❌ Incorrect

```ts
export default {
    themeConfig: {
        metadata: [
            {
                property: "og:site_name",
            },
            {
                content: "eslint-plugin-docusaurus-2",
            },
        ],
    },
};
```

## ✅ Correct

```ts
export default {
    themeConfig: {
        metadata: [
            {
                property: "og:site_name",
                content: "eslint-plugin-docusaurus-2",
            },
            {
                name: "twitter:card",
                content: "summary_large_image",
            },
        ],
    },
};
```

## Behavior and migration notes

This rule reports only. It does not autofix.

Metadata entries often need maintainer judgment about which exact tag name and content value are correct, so an automatic rewrite would be too speculative.

## Additional examples

### ❌ Incorrect — non-object metadata entry

```ts
export default {
    themeConfig: {
        metadata: ["og:site_name"],
    },
};
```

### ✅ Correct — dynamic but structurally present values

```ts
const metadataName = "og:site_name";
const metadataContent = "eslint-plugin-docusaurus-2";

export default {
    themeConfig: {
        metadata: [
            {
                property: metadataName,
                content: metadataContent,
            },
            ...extraMetadata,
        ],
    },
};
```

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## When not to use it

Do not use this rule if your project intentionally treats `themeConfig.metadata` as a loose escape hatch and you do not want linting to enforce a minimal Docusaurus metadata schema.

> **Rule catalog ID:** R025

## Further reading

- [Docusaurus SEO guide](https://docusaurus.io/docs/seo)
- [Docusaurus theme configuration](https://docusaurus.io/docs/api/themes/configuration)
