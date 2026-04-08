# require-plugin-pwa-setup

Require `@docusaurus/plugin-pwa` to be configured in `plugins` with an explicit setup entry.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files and specifically on the top-level `plugins` array.

It targets the `@docusaurus/plugin-pwa` entry and expects it to be authored as an explicit setup tuple instead of a bare string.

## What this rule reports

This rule reports Docusaurus config files that omit `@docusaurus/plugin-pwa` entirely, configure it as a bare string entry, or configure it with an empty inline options object.

## Why this rule exists

PWA support is not just a dependency choice. It is a site capability that usually carries deployment, manifest, and head-tag consequences.

Requiring an explicit setup entry makes the plugin configuration intentional and reviewable instead of silently relying on a bare plugin declaration.

## ❌ Incorrect

```ts
export default {
    plugins: ["@docusaurus/plugin-pwa"],
};
```

## ✅ Correct

```ts
export default {
    plugins: [["@docusaurus/plugin-pwa", { debug: true }]],
};
```

## Behavior and migration notes

This rule reports only. It does not autofix.

The right PWA setup depends on the site’s manifest, head tags, and offline-mode strategy, so an automatic rewrite would be too speculative.

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.strict];
```

## When not to use it

Do not use this rule if your project does not want to enforce PWA support or if a bare string plugin declaration is acceptable in your configuration style.

> **Rule catalog ID:** R037

## Further reading

- [Docusaurus plugin-pwa configuration](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-pwa)
