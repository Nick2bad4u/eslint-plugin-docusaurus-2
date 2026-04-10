# no-deprecated-heading-id-syntax

Disallow deprecated `{#my-id}` heading syntax in `.mdx` files and prefer the Docusaurus 3.10 MDX comment form.

## Targeted pattern scope

This rule focuses on `.mdx` content files.

It reports headings that still use the legacy Docusaurus suffix form:

- `## My Heading {#my-id}`

## What this rule reports

This rule reports deprecated heading ID syntax in `.mdx` files and expects the newer MDX comment form:

- `## My Heading {/* #my-id */}`

## Why this rule exists

Docusaurus 3.10 recommends replacing the old proprietary heading ID syntax with a native MDX comment form.

That newer syntax is more compatible with external tools and aligns with the `write-heading-ids --syntax mdx-comment --migrate` guidance from the release notes.

## ❌ Incorrect

```mdx
## API Surface {#api-surface}
```

## ✅ Correct

```mdx
## API Surface {/* #api-surface */}
```

## Behavior and migration notes

This rule autofixes the deprecated heading suffix to the MDX comment form in `.mdx` files.

It intentionally ignores fenced code blocks so examples and snippets are not touched.

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs["strict-mdx-upgrade"]];
```

## When not to use it

Do not use this rule if your migration plan still depends on the legacy syntax, keep the rule off until you are ready to standardize on strict MDX.

> **Rule catalog ID:** R115

## Further reading

- [Docusaurus 3.10 release notes: Strict Heading IDs](https://docusaurus.io/blog/releases/3.10)
- [Docusaurus `write-heading-ids` CLI](https://docusaurus.io/docs/3.10.0/cli#docusaurus-write-heading-ids-sitedir)
