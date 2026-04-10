# require-theme-mermaid-when-markdown-mermaid-enabled

Require `@docusaurus/theme-mermaid` when `markdown.mermaid` is enabled.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files.

It reports config that enables:

- `markdown.mermaid: true`

without also enabling:

- `@docusaurus/theme-mermaid`

## What this rule reports

This rule reports Mermaid markdown support that is enabled in config without the corresponding Mermaid theme being configured.

## Why this rule exists

The Docusaurus Mermaid docs require both pieces together:

- add `@docusaurus/theme-mermaid`
- set `markdown.mermaid` to `true`

Enabling only the markdown flag leaves the site config in a misleading half-configured state.

## ❌ Incorrect

```ts
export default {
    markdown: {
        mermaid: true,
    },
};
```

## ✅ Correct

```ts
export default {
    themes: ["@docusaurus/theme-mermaid"],
    markdown: {
        mermaid: true,
    },
};
```

## Behavior and migration notes

This rule provides a suggestion when it can safely add `@docusaurus/theme-mermaid` to an existing literal `themes` array or create a new top-level `themes` property.

## Additional examples

### ❌ Incorrect — markdown enabled with unrelated themes only

```ts
export default {
    themes: ["@easyops-cn/docusaurus-search-local"],
    markdown: {
        mermaid: true,
    },
};
```

### ✅ Correct — Mermaid theme appended

```ts
export default {
    themes: [
        "@easyops-cn/docusaurus-search-local",
        "@docusaurus/theme-mermaid",
    ],
    markdown: {
        mermaid: true,
    },
};
```

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## When not to use it

Do not use this rule only if you intentionally stage Mermaid setup across multiple commits and do not want linting to require both sides of the config yet.

> **Rule catalog ID:** R092

## Further reading

- [Docusaurus theme docs: `@docusaurus/theme-mermaid`](https://docusaurus.io/docs/3.8.1/api/themes/@docusaurus/theme-mermaid)
