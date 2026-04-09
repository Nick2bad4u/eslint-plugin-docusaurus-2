# require-base-url-issue-banner-enabled

Require `baseUrlIssueBanner` to be explicitly enabled (`true`) in Docusaurus site config.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects the top-level `baseUrlIssueBanner` field.

## What this rule reports

This rule reports when `baseUrlIssueBanner` is:

- missing,
- explicitly `false`, or
- a static non-boolean value.

## Why this rule exists

`baseUrlIssueBanner` surfaces base URL mismatch warnings in non-production environments. Keeping it explicitly enabled makes deployment/path mismatches easier to catch before release.

## ❌ Incorrect

```ts
export default {
    baseUrl: "/docs/",
};
```

```ts
export default {
    baseUrlIssueBanner: false,
};
```

## ✅ Correct

```ts
export default {
    baseUrlIssueBanner: true,
};
```

## Behavior and migration notes

This rule autofixes direct `false` boolean literals to `true`.

For missing properties or non-literal/dynamic expressions, it reports without autofixing.

## When not to use it

Do not use this rule if your project intentionally disables the local base URL mismatch banner.

> **Rule catalog ID:** R048

## Further reading

- [Docusaurus site config reference](https://docusaurus.io/docs/api/docusaurus-config)
