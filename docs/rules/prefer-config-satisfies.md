# prefer-config-satisfies

Prefer `satisfies Config` over direct `Config` annotations in TypeScript Docusaurus config files.

## Targeted pattern scope

This rule focuses on TypeScript Docusaurus config files such as:

- `docusaurus.config.ts`
- `docusaurus.config.mts`
- `docusaurus.config.cts`

It targets common patterns such as:

- `const config: Config = { ... }`
- `export default { ... } as Config`

## What this rule reports

This rule reports direct `Config` annotations and `as Config` assertions in TypeScript Docusaurus config files when `satisfies Config` is the clearer alternative.

## Why this rule exists

The Docusaurus docs recommend `satisfies Config` for TypeScript config files.

Using `satisfies` instead of a direct annotation is useful because it:

- keeps Docusaurus config shape validation
- preserves narrower literal types inside the config object
- avoids unnecessary widening of values that may be useful later in local code
- matches the modern TypeScript style used in Docusaurus examples

## ❌ Incorrect

```ts
import type { Config } from "@docusaurus/types";

const config: Config = {
    title: "My Docs",
    url: "https://example.com",
    baseUrl: "/docs/",
};

export default config;
```

## ✅ Correct

```ts
import type { Config } from "@docusaurus/types";

const config = {
    title: "My Docs",
    url: "https://example.com",
    baseUrl: "/docs/",
} satisfies Config;

export default config;
```

## Behavior and migration notes

This rule provides an autofix for the common direct-annotation and `as Config` patterns it recognizes.

The autofix rewrites those cases to `satisfies Config` while preserving the existing object expression text.

## Additional examples

### ❌ Incorrect — export-default assertion

```ts
import type { Config } from "@docusaurus/types";

export default {
    title: "My Docs",
    url: "https://example.com",
    baseUrl: "/docs/",
} as Config;
```

### ✅ Correct — export-default satisfies

```ts
import type { Config } from "@docusaurus/types";

export default {
    title: "My Docs",
    url: "https://example.com",
    baseUrl: "/docs/",
} satisfies Config;
```

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## When not to use it

Do not use this rule if your project intentionally standardizes on direct annotations or assertions in config files and you do not want `satisfies` rewrites.

> **Rule catalog ID:** R005

## Further reading

- [Docusaurus config docs: TypeScript example](https://docusaurus.io/docs/configuration)
- [Docusaurus config API reference](https://docusaurus.io/docs/api/docusaurus-config)
- [TypeScript 4.9 `satisfies` operator](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html)
