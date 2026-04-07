# no-deprecated-on-broken-markdown-links

Disallow the deprecated top-level `onBrokenMarkdownLinks` Docusaurus config property.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files.

It reports the deprecated top-level property:

- `onBrokenMarkdownLinks`

The modern replacement is:

- `markdown.hooks.onBrokenMarkdownLinks`

## What this rule reports

This rule reports Docusaurus config objects that still use the deprecated top-level `onBrokenMarkdownLinks` property.

## Why this rule exists

Docusaurus deprecated the top-level `onBrokenMarkdownLinks` setting in v3.9.

Keeping the deprecated property around has clear downsides:

- new contributors learn an outdated config shape
- the project drifts away from the documented Docusaurus API
- future upgrades become noisier because deprecated config remains in place

Using `markdown.hooks.onBrokenMarkdownLinks` keeps the config aligned with current Docusaurus behavior.

## ❌ Incorrect

```ts
const config = {
    title: "Docs",
    url: "https://example.com",
    baseUrl: "/docs/",
    onBrokenMarkdownLinks: "warn",
};

export default config;
```

## ✅ Correct

```ts
const config = {
    title: "Docs",
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

## Behavior and migration notes

This rule can autofix the simplest migration case:

- when the config does not already have a `markdown` property, it rewrites the deprecated top-level property into `markdown.hooks.onBrokenMarkdownLinks`

If the config already has a `markdown` object, the rule still reports the deprecated property, but it leaves the final merge/migration decision to you.

## Additional examples

### ❌ Incorrect — deprecated setting next to current markdown config

```ts
export default {
    title: "Docs",
    url: "https://example.com",
    baseUrl: "/docs/",
    onBrokenMarkdownLinks: "warn",
    markdown: {
        hooks: {
            onBrokenMarkdownImages: "throw",
        },
    },
};
```

### ✅ Correct — modern markdown hooks config

```ts
export default {
    title: "Docs",
    url: "https://example.com",
    baseUrl: "/docs/",
    markdown: {
        hooks: {
            onBrokenMarkdownLinks: "warn",
            onBrokenMarkdownImages: "throw",
        },
    },
};
```

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## When not to use it

Do not use this rule if you are deliberately preserving the deprecated property during a staged Docusaurus migration and you do not want linting to push that cleanup yet.

> **Rule catalog ID:** R007

## Further reading

- [Docusaurus configuration docs](https://docusaurus.io/docs/configuration)
- [Docusaurus config API: `onBrokenMarkdownLinks`](https://docusaurus.io/docs/api/docusaurus-config)
