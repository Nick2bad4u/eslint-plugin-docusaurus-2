# no-ignored-site-validations

Disallow `"ignore"` severities for Docusaurus site validation settings.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files and the site validation settings that control whether Docusaurus reports or stops on broken content and route problems.

It currently checks:

- `onBrokenLinks`
- `onBrokenAnchors`
- `onDuplicateRoutes`
- `markdown.hooks.onBrokenMarkdownLinks`
- `markdown.hooks.onBrokenMarkdownImages`

## What this rule reports

This rule reports validation settings that are explicitly set to `"ignore"`.

It does not require every setting to be present. It only reports the cases where a project has explicitly chosen to silence one of the built-in Docusaurus validation channels.

## Why this rule exists

Docusaurus ships these validation settings to stop documentation teams from silently publishing broken sites.

When a validation is set to `"ignore"`:

- broken links can ship without any signal in CI
- broken anchors can linger until users click them
- duplicate routes can hide content behind ambiguous routing
- broken Markdown links and images can accumulate in large docs trees

A Docusaurus site usually benefits more from an explicit `"warn"` or `"throw"` policy than from complete silence.

## ❌ Incorrect

```ts
const config = {
    title: "My Docs",
    url: "https://example.com",
    baseUrl: "/docs/",
    onBrokenLinks: "ignore",
};

export default config;
```

## ✅ Correct

```ts
const config = {
    title: "My Docs",
    url: "https://example.com",
    baseUrl: "/docs/",
    onBrokenLinks: "throw",
};

export default config;
```

## Behavior and migration notes

This rule provides an autofix.

When it sees `"ignore"`, it replaces that value with the documented Docusaurus default severity for that setting:

- `onBrokenLinks` → `"throw"`
- `onBrokenAnchors` → `"warn"`
- `onDuplicateRoutes` → `"warn"`
- `markdown.hooks.onBrokenMarkdownLinks` → `"warn"`
- `markdown.hooks.onBrokenMarkdownImages` → `"throw"`

That makes the site validation policy explicit again without inventing a custom severity choice.

## Additional examples

### ❌ Incorrect — silencing broken Markdown links

```ts
const config = {
    title: "My Docs",
    url: "https://example.com",
    baseUrl: "/docs/",
    markdown: {
        hooks: {
            onBrokenMarkdownLinks: "ignore",
        },
    },
};

export default config;
```

### ✅ Correct — keep the check visible during builds

```ts
const config = {
    title: "My Docs",
    url: "https://example.com",
    baseUrl: "/docs/",
    markdown: {
        hooks: {
            onBrokenMarkdownLinks: "warn",
        },
    },
};

export default config;
```

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## When not to use it

Do not use this rule if your project intentionally suppresses Docusaurus validation noise during a temporary migration and you do not want the linter to push those settings back toward visible severities.

> **Rule catalog ID:** R003

## Further reading

- [Docusaurus config API: `onBrokenLinks`](https://docusaurus.io/docs/api/docusaurus-config)
- [Docusaurus config API: `onBrokenAnchors`](https://docusaurus.io/docs/api/docusaurus-config)
- [Docusaurus config API: Markdown hooks](https://docusaurus.io/docs/api/docusaurus-config)
