# require-docusaurus-faster-package-installed

Require `@docusaurus/faster` to be declared when stable or deprecated faster flags are configured.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files.

It reports configs that enable either:

- `future.faster`
- `future.experimental_faster`

without declaring:

- `@docusaurus/faster`

in the nearest package manifest.

## What this rule reports

This rule reports faster config that is enabled without the package dependency needed to support it.

## Why this rule exists

Both the old experimental faster flags and the stable `future.faster` flags depend on the `@docusaurus/faster` package being installed.

Without that package declaration, the config can look valid in review while the workspace does not actually own the dependency it is enabling.

## ❌ Incorrect

```ts
export default {
    future: {
        faster: true,
    },
};
```

## ✅ Correct

```ts
export default {
    future: {
        faster: true,
    },
};
```

with `@docusaurus/faster` declared in the nearest `package.json`.

## Behavior and migration notes

This rule is report-only.

It does not edit `package.json` automatically.

## When not to use it

Do not use this rule if your repository intentionally relies on a higher-level workspace package manifest and you do not want each site workspace to declare `@docusaurus/faster` locally.

> **Rule catalog ID:** R109

## Further reading

- [Docusaurus 3.8 release notes](https://docusaurus.io/blog/releases/3.8)
- [Docusaurus 3.10 release notes](https://docusaurus.io/blog/releases/3.10)
