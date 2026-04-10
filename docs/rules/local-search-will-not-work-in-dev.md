# local-search-will-not-work-in-dev

Disallow assuming configured local-search providers will produce a reliable search experience during `docusaurus start`.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files.

It reports known local-search provider entries such as:

- `@cmfcmf/docusaurus-search-local`
- `@easyops-cn/docusaurus-search-local`
- `docusaurus-plugin-search-local`

## What this rule reports

This rule reports local-search provider configuration so maintainers remember that these plugins build a static search index and are not meant to be tested through the normal dev-server search experience.

## Why this rule exists

Local-search plugins are attractive because they avoid external search services, but they usually index content during a production-style build.

That means maintainers can easily assume search is broken when testing with `docusaurus start`, even though the real issue is the runtime expectation.

## ❌ Incorrect

```ts
export default {
    themes: ["@easyops-cn/docusaurus-search-local"],
};
```

## ✅ Correct

```ts
export default {
    themes: ["@easyops-cn/docusaurus-search-local"],
};
```

with the expectation that search should be validated after `docusaurus build` and `docusaurus serve`, not through `docusaurus start`.

## Behavior and migration notes

This rule is intentionally report-only and informational.

It does not remove the plugin or rewrite the config.

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.config];
```

## When not to use it

Do not use this rule if your team already understands the build-only runtime expectation of local-search providers and you do not want linting to repeat that reminder.

> **Rule catalog ID:** R104

## Further reading

- [cmfcmf local search README](https://github.com/cmfcmf/docusaurus-search-local/blob/main/README.md)
