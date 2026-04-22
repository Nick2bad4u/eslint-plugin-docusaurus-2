# require-markdown-format-detect

Require `markdown.format` to be `"detect"` when a Docusaurus `markdown` config object is used.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files.

It reports Docusaurus config objects that already configure `markdown`, but:

- omit `markdown.format`
- set `markdown.format` to a static value other than `"detect"`

## What this rule reports

This rule reports `markdown` config objects that do not set `format: "detect"`.

## Why this rule exists

Docusaurus v3 uses the MDX format for all files by default, including plain `.md` files.

If you opt into the `markdown` config object, Docusaurus recommends `markdown.format: "detect"` so file extensions drive the parser mode automatically:

- `.md` files use CommonMark
- `.mdx` files use MDX

That keeps regular Markdown files out of the stricter MDX parser unless you intentionally want MDX everywhere.

## ❌ Incorrect

```ts
export default {
    markdown: {
        emoji: true,
        hooks: {
            onBrokenMarkdownLinks: "warn",
        },
    },
};
```

## ✅ Correct

```ts
export default {
    markdown: {
        emoji: true,
        format: "detect",
        hooks: {
            onBrokenMarkdownLinks: "warn",
        },
    },
};
```

## Behavior and migration notes

This rule autofixes the common literal-object cases it can rewrite safely:

- add `format: "detect"` to an existing literal `markdown` object
- replace an inline literal/static template format value with `"detect"`

If the `markdown` config or `format` value is dynamic and cannot be resolved statically, the rule avoids guessing.

## Additional examples

### ❌ Incorrect — static non-detect format

```ts
export default {
    markdown: {
        format: "mdx",
    },
};
```

### ✅ Correct — named constant still works

```ts
const markdownFormat = "detect";
const markdown = {
    format: markdownFormat,
    mermaid: true,
};

export default {
    markdown,
};
```

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## When not to use it

Do not use this rule if you intentionally want the MDX parser format for every Markdown file and do not want linting to normalize that choice.

> **Rule catalog ID:** R118

## Further reading

- [Docusaurus Markdown features](https://docusaurus.io/docs/markdown-features)
- [Docusaurus config API: `markdown`](https://docusaurus.io/docs/api/docusaurus-config#markdown)
