# require-search-provider-package-installed

Require explicitly configured search-provider modules to be declared in the nearest package manifest.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files.

It checks explicitly configured search-provider modules such as:

- `@docsearch/docusaurus-adapter`
- `@cmfcmf/docusaurus-search-local`
- `@easyops-cn/docusaurus-search-local`
- `docusaurus-plugin-search-local`

## What this rule reports

This rule reports search-provider module entries configured in Docusaurus site config when the nearest `package.json` does not declare the matching package.

## Why this rule exists

Explicit search-provider config should come with explicit package ownership.

Otherwise the site config can appear valid while depending on transitive installs, unrelated workspaces, or accidental hoisting.

## ❌ Incorrect

```ts
export default {
    plugins: ["@docsearch/docusaurus-adapter"],
};
```

## ✅ Correct

```ts
export default {
    themes: ["@easyops-cn/docusaurus-search-local"],
};
```

With the corresponding search-provider package declared in the nearest `package.json` dependency fields.

## Behavior and migration notes

This rule is report-only.

It does not add package-manager entries automatically.

## Additional examples

### ❌ Incorrect — local-search package not declared

```ts
export default {
    themes: ["docusaurus-plugin-search-local"],
};
```

### ✅ Correct — local-search package declared locally

```ts
export default {
    themes: ["@easyops-cn/docusaurus-search-local"],
};
```

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## When not to use it

Do not use this rule if your repository intentionally relies on a higher-level workspace package manifest and you do not want each Docusaurus site workspace to declare its own search-provider packages.

> **Rule catalog ID:** R101

## Further reading

- [Docusaurus search docs](https://docusaurus.io/docs/3.8.1/search)
- [Algolia DocSearch adapter docs](https://docsearch.algolia.com/docs/docusaurus-adapter/)
