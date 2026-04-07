# prefer-sidebars-config-satisfies

Prefer `satisfies SidebarsConfig` over direct `SidebarsConfig` annotations in TypeScript Docusaurus sidebar files.

## Targeted pattern scope

This rule focuses on TypeScript Docusaurus sidebar modules such as:

- `sidebars.ts`
- `sidebars.mts`
- `sidebars.cts`

It targets common patterns such as:

- `const sidebars: SidebarsConfig = { ... }`
- `export default { ... } as SidebarsConfig`

## What this rule reports

This rule reports direct `SidebarsConfig` annotations and `as SidebarsConfig` assertions when `satisfies SidebarsConfig` is the clearer alternative.

## Why this rule exists

Docusaurus sidebar files are configuration-heavy data structures.

Using `satisfies SidebarsConfig` instead of a direct annotation is useful because it:

- keeps Docusaurus sidebar shape validation
- preserves narrower literal types inside the sidebar object
- avoids widening values that may still be useful in local code and tooling
- matches the modern TypeScript style that works well for authored config objects

## ❌ Incorrect

```ts
import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
    docs: ["introduction"],
};

export default sidebars;
```

## ✅ Correct

```ts
import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars = {
    docs: ["introduction"],
} satisfies SidebarsConfig;

export default sidebars;
```

## Behavior and migration notes

This rule provides an autofix for the common direct-annotation and `as SidebarsConfig` patterns it recognizes.

The autofix rewrites those cases to `satisfies SidebarsConfig` while preserving the existing sidebar object text.

## Additional examples

### ❌ Incorrect — export-default assertion

```ts
import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

export default {
    docs: ["introduction"],
} as SidebarsConfig;
```

### ✅ Correct — export-default satisfies

```ts
import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

export default {
    docs: ["introduction"],
} satisfies SidebarsConfig;
```

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## When not to use it

Do not use this rule if your project intentionally standardizes on direct sidebar type annotations or assertions and you do not want `satisfies` rewrites.

> **Rule catalog ID:** R010

## Further reading

- [Docusaurus sidebar items](https://docusaurus.io/docs/sidebar/items)
- [TypeScript 4.9 `satisfies` operator](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html)
