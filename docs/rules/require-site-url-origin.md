# require-site-url-origin

Require top-level Docusaurus `url` to be an absolute site origin (for example `https://example.com`).

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects the top-level `url` field.

## What this rule reports

This rule reports when `url` is:

- missing,
- not a valid absolute URL string,
- configured with path/query/hash fragments, or
- configured as `http` for non-localhost origins.

## Why this rule exists

Docusaurus treats `url` as the canonical site origin for generated metadata and absolute URLs. Keeping `url` at origin scope avoids accidental path duplication and canonical URL drift.

## ❌ Incorrect

```ts
export default {
    url: "http://example.com/docs/",
};
```

```ts
export default {
    baseUrl: "/docs/",
};
```

## ✅ Correct

```ts
export default {
    url: "https://example.com",
};
```

```ts
export default {
    url: "http://localhost:3000",
};
```

## Behavior and migration notes

This rule autofixes direct string and no-expression template-literal values to a normalized origin string.

For identifier-backed values, it reports and provides a suggestion to replace the property value with a normalized literal.

## When not to use it

Do not use this rule if your project intentionally stores non-origin values in `url` and handles canonical URL generation through custom tooling.

> **Rule catalog ID:** R050

## Further reading

- [Docusaurus site config reference](https://docusaurus.io/docs/api/docusaurus-config)
