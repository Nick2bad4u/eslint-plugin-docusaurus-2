# no-deprecated-future-experimental-storage

Disallow the deprecated `future.experimental_storage` config and prefer top-level `storage`.

## Targeted pattern scope

This rule focuses on `docusaurus.config.*` files.

It reports the deprecated 3.10-era migration source:

- `future.experimental_storage`

and expects the stable replacement:

- top-level `storage`

## What this rule reports

This rule reports deprecated experimental storage config so sites can migrate to the stable `storage` field introduced in Docusaurus 3.10.

## Why this rule exists

Docusaurus 3.10 promoted browser storage config out of the `future` object into the stable top-level `storage` field.

Keeping the deprecated experimental field around makes the config look newer than it really is and increases future upgrade noise.

## ❌ Incorrect

```ts
export default {
    future: {
        experimental_storage: {
            type: "localStorage",
            namespace: true,
        },
    },
};
```

## ✅ Correct

```ts
export default {
    storage: {
        type: "localStorage",
        namespace: true,
    },
};
```

## Behavior and migration notes

This rule autofixes the simple cases it can prove safely:

- replace a `future` object that only contains `experimental_storage`
- remove `experimental_storage` from a larger `future` object and insert a top-level `storage` field when no top-level `storage` already exists

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## When not to use it

Do not use this rule only if you intentionally preserve the deprecated field during a short-lived migration and do not want linting to rewrite it yet.

> **Rule catalog ID:** R107

## Further reading

- [Docusaurus 3.10 release notes](https://docusaurus.io/blog/releases/3.10)
- [Docusaurus config: `storage`](https://docusaurus.io/docs/api/docusaurus-config#storage)
