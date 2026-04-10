# require-v4-remove-legacy-post-build-head-attribute-for-ssg-worker-threads

Require `future.v4.removeLegacyPostBuildHeadAttribute` when faster `ssgWorkerThreads` are enabled.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files.

It validates the documented dependency between:

- `ssgWorkerThreads: true`
- `future.v4.removeLegacyPostBuildHeadAttribute: true`

inside:

- `future.faster`
- `future.experimental_faster`

## What this rule reports

This rule reports faster config that enables `ssgWorkerThreads` without also enabling the required v4 future flag.

## Why this rule exists

Docusaurus documents `ssgWorkerThreads` as depending on `future.v4.removeLegacyPostBuildHeadAttribute`.

Leaving that v4 flag disabled makes the faster config internally inconsistent and blocks the optimization from being configured correctly.

## ❌ Incorrect

```ts
export default {
    future: {
        faster: {
            ssgWorkerThreads: true,
        },
    },
};
```

## ✅ Correct

```ts
export default {
    future: {
        v4: {
            removeLegacyPostBuildHeadAttribute: true,
        },
        faster: {
            ssgWorkerThreads: true,
        },
    },
};
```

## Behavior and migration notes

This rule autofixes the simple static cases it can prove safely by inserting or replacing the required v4 flag.

## When not to use it

Do not use this rule if your project intentionally keeps partially migrated faster config and you do not want linting to normalize the documented dependency yet.

> **Rule catalog ID:** R111

## Further reading

- [Docusaurus 3.8 release notes](https://docusaurus.io/blog/releases/3.8)
- [Docusaurus config: `future.v4.removeLegacyPostBuildHeadAttribute`](https://docusaurus.io/docs/api/docusaurus-config#future)
