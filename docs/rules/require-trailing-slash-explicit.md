# require-trailing-slash-explicit

Require top-level `trailingSlash` to be explicitly configured as a boolean in Docusaurus config.

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects the top-level `trailingSlash` field.

## What this rule reports

This rule reports when `trailingSlash` is:

- missing, or
- present but statically non-boolean (for example string/number forms).

## Why this rule exists

`trailingSlash` affects generated route shapes and canonical URL behavior. Making it explicit avoids accidental default drift and clarifies intended URL policy.

## ❌ Incorrect

```ts
export default {
    baseUrl: "/docs/",
};
```

```ts
export default {
    trailingSlash: "false",
};
```

## ✅ Correct

```ts
export default {
    trailingSlash: false,
};
```

```ts
export default {
    trailingSlash: process.env["DOCUSAURUS_TRAILING_SLASH"] === "true",
};
```

## Behavior and migration notes

This rule autofixes static string forms (`"true"`, `"false"`) to boolean literals.

When `trailingSlash` is missing or otherwise statically invalid, the rule offers suggestions to set it to `true` or `false`.

## When not to use it

Do not use this rule if your project intentionally relies on implicit Docusaurus `trailingSlash` defaults.

> **Rule catalog ID:** R054

## Further reading

- [Docusaurus site config reference](https://docusaurus.io/docs/api/docusaurus-config)
