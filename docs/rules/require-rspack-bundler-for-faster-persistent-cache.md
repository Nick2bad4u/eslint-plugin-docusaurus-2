# require-rspack-bundler-for-faster-persistent-cache

Require `future.faster.rspackBundler` when `rspackPersistentCache` is enabled in faster config.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files.

It validates the documented dependency between:

- `rspackPersistentCache: true`
- `rspackBundler: true`

inside either:

- `future.faster`
- `future.experimental_faster`

## What this rule reports

This rule reports faster config that enables `rspackPersistentCache` without also enabling `rspackBundler`.

## Why this rule exists

Docusaurus documents Rspack persistent cache as depending on the Rspack bundler.

Enabling persistent cache without the bundler makes the config internally inconsistent.

## ❌ Incorrect

```ts
export default {
    future: {
        faster: {
            rspackPersistentCache: true,
        },
    },
};
```

## ✅ Correct

```ts
export default {
    future: {
        faster: {
            rspackBundler: true,
            rspackPersistentCache: true,
        },
    },
};
```

## Behavior and migration notes

This rule autofixes the simple static cases it can prove safely by inserting or replacing `rspackBundler: true`.

## When not to use it

Do not use this rule if your project intentionally keeps partially migrated faster config and you do not want linting to normalize the documented dependency yet.

> **Rule catalog ID:** R110

## Further reading

- [Docusaurus 3.8 release notes](https://docusaurus.io/blog/releases/3.8)
- [Docusaurus config: `future.faster`](https://docusaurus.io/docs/api/docusaurus-config#future)
