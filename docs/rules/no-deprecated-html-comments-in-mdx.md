# no-deprecated-html-comments-in-mdx

Disallow deprecated HTML comments in `.mdx` files and prefer JSX comments for Docusaurus 3.10 strict MDX migration.

## Targeted pattern scope

This rule focuses on `.mdx` content files.

It reports HTML comments such as:

- `<!-- truncate -->`
- `<!-- note -->`
- multiline HTML comments inside MDX documents

## What this rule reports

This rule reports HTML comments in `.mdx` files because Docusaurus 3.10 strict MDX guidance prefers JSX comments instead.

## Why this rule exists

MDX v3 does not support HTML comments, while JSX comment expressions are part of native MDX syntax.

Migrating comments from `<!-- ... -->` to `{/* ... */}` makes MDX files more portable across Docusaurus, editors, formatters, and the wider MDX ecosystem.

## ❌ Incorrect

```mdx
# My Blog Post

<!-- truncate -->

Content.
```

## ✅ Correct

```mdx
# My Blog Post

{/* truncate */}

Content.
```

## Behavior and migration notes

This rule autofixes HTML comments to JSX comments in `.mdx` files.

It intentionally ignores fenced code blocks so migration examples can stay in documentation.

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs["strict-mdx-upgrade"]];
```

## When not to use it

Do not use this rule if you are intentionally postponing strict MDX migration or still have tooling that depends on the older HTML comment form.

> **Rule catalog ID:** R114

## Further reading

- [Docusaurus 3.10 release notes: Strict Comments](https://docusaurus.io/blog/releases/3.10)
- [MDX syntax guide](https://mdxjs.com/docs/what-is-mdx/)
