# no-deprecated-admonition-title-syntax

Disallow deprecated `:::type Title` admonition titles in `.mdx` files and prefer bracket syntax for Docusaurus 3.10 strict MDX migration.

## Targeted pattern scope

This rule focuses on `.mdx` content files.

It reports admonition openings that still use the legacy title form:

- `:::warning Pay Attention`
- `:::note Read this first`

## What this rule reports

This rule reports deprecated admonition title syntax in `.mdx` files and expects the bracket form:

- `:::warning[Pay Attention]`

## Why this rule exists

Docusaurus 3.10 recommends migrating admonition titles to bracket syntax so content aligns better with the broader Markdown directive ecosystem.

That syntax is more portable and less tied to the older proprietary Docusaurus shorthand.

## ❌ Incorrect

```mdx
:::warning Pay Attention
Read this first.
:::
```

## ✅ Correct

```mdx
:::warning[Pay Attention]
Read this first.
:::
```

## Behavior and migration notes

This rule autofixes legacy admonition titles to bracket syntax in `.mdx` files.

It intentionally ignores fenced code blocks so code samples and migration examples remain untouched.

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs["strict-mdx-upgrade"]];
```

## When not to use it

Do not use this rule if your project is deliberately keeping the old admonition-title form during a staged migration.

> **Rule catalog ID:** R116

## Further reading

- [Docusaurus 3.10 release notes: Strict Admonitions](https://docusaurus.io/blog/releases/3.10)
- [Docusaurus Markdown features: admonitions](https://docusaurus.io/docs/markdown-features/admonitions)
