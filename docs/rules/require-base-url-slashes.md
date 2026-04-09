# require-base-url-slashes

Require Docusaurus `baseUrl` to use a rooted slash-wrapped path (for example `"/docs/"`).

## Targeted pattern scope

This rule targets `docusaurus.config.*` files and inspects the top-level `baseUrl` field.

## What this rule reports

This rule reports `baseUrl` values that are not a normalized rooted path with both:

- a leading slash, and
- a trailing slash.

Examples of reported values include:

- `"docs"`
- `"docs/"`
- `"/docs"`
- whitespace-only strings

## Why this rule exists

Docusaurus routing and static-asset resolution rely on a consistent `baseUrl` convention. Requiring a rooted slash-wrapped value avoids path edge cases and keeps URL joins predictable.

## ❌ Incorrect

```ts
export default {
    baseUrl: "docs",
};
```

```ts
export default {
    baseUrl: "/docs",
};
```

## ✅ Correct

```ts
export default {
    baseUrl: "/docs/",
};
```

```ts
export default {
    baseUrl: "/",
};
```

## Behavior and migration notes

This rule can autofix direct string and no-expression template-literal values.

For identifier-based values, it reports without autofixing to avoid rewriting other declarations implicitly.

## When not to use it

Do not use this rule if your repository intentionally uses dynamic `baseUrl` construction that cannot be statically represented as a slash-wrapped path.

> **Rule catalog ID:** R049

## Further reading

- [Docusaurus site config reference](https://docusaurus.io/docs/api/docusaurus-config)
