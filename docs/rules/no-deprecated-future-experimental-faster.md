# no-deprecated-future-experimental-faster

Disallow the deprecated `future.experimental_faster` config and prefer stable `future.faster`.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files.

It reports the deprecated faster flag name:

- `future.experimental_faster`

and expects the stable replacement:

- `future.faster`

## What this rule reports

This rule reports deprecated faster config so sites can migrate to the stable `future.faster` field introduced in Docusaurus 3.10.

## Why this rule exists

Docusaurus 3.10 stabilized Docusaurus Faster and renamed the old `future.experimental_faster` config surface to `future.faster`.

Keeping the deprecated name around makes your config harder to upgrade and hides whether you are actually following the current stable docs.

## ❌ Incorrect

```ts
export default {
    future: {
        experimental_faster: true,
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

## Behavior and migration notes

This rule autofixes the direct key rename when a conflicting `future.faster` property is not already present.

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## When not to use it

Do not use this rule only if you intentionally keep the deprecated key during a short migration window and do not want linting to normalize it yet.

> **Rule catalog ID:** R108

## Further reading

- [Docusaurus 3.10 release notes](https://docusaurus.io/blog/releases/3.10)
- [Docusaurus config: `future.faster`](https://docusaurus.io/docs/api/docusaurus-config#future)
