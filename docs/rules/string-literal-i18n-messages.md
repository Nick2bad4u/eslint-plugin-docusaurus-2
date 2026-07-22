# string-literal-i18n-messages

Require Docusaurus translation APIs to receive hardcoded message strings.

## Targeted pattern scope

This rule checks the imported default `Translate` component, the named `translate` function, their aliases, and equivalent namespace-member usages from `@docusaurus/Translate`.

## What this rule reports

This rule checks actual imports from `@docusaurus/Translate` and reports:

- dynamic children inside the imported `Translate` component
- calls to the imported `translate` function whose first argument is not an object
- explicit `message` properties that are not string literals or substitution-free template literals

It recognizes aliases and namespace imports and ignores shadowed identifiers. Object arguments without a `message` property remain valid because other translation API fields can be composed separately.

## Why this rule exists

Docusaurus extracts hardcoded messages and treats runtime values as placeholders. Dynamic message definitions cannot be extracted reliably and make translation catalogs unstable.

## ❌ Incorrect

```tsx
import Translate, { translate } from "@docusaurus/Translate";

const title = translate({ message: pageTitle });
const greeting = <Translate>Hello {name}</Translate>;
```

## ✅ Correct

```tsx
import Translate, { translate } from "@docusaurus/Translate";

const title = translate(
 { message: "Documentation for {product}" },
 { product: productName }
);
const greeting = <Translate values={{ name }}>{"Hello {name}"}</Translate>;
```

## Behavior and migration notes

This rule is diagnostic-only. Moving dynamic values into `values` changes the translation contract and requires a deliberate message-placeholder choice.

The rule is enabled by `recommended`, `strict`, `all`, and `experimental`, and is also available through `docusaurus2.configs.i18n`.

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.i18n];
```

## When not to use it

Do not use this rule when a custom wrapper intentionally accepts runtime-computed messages instead of Docusaurus message extraction.

> **Rule catalog ID:** R126

## Further reading

- [Docusaurus i18n tutorial](https://docusaurus.io/docs/i18n/tutorial)
- [Docusaurus translation APIs](https://docusaurus.io/docs/docusaurus-core#translate)
