# no-untranslated-text

Require static JSX text labels to use Docusaurus translation APIs.

## Targeted pattern scope

This rule checks static `JSXText` children and static string expression children in JSX elements and fragments.

## What this rule reports

This rule reports non-empty static JSX text and static string expression children outside an imported `Translate` component. It recognizes default-import aliases and namespace imports from `@docusaurus/Translate`, and it does not mistake shadowed local bindings for the Docusaurus component.

Dynamic expressions are not reported because this rule cannot determine whether their values were translated before rendering.

## Why this rule exists

Hardcoded user-facing labels bypass Docusaurus message extraction and prevent localized sites from translating that content.

## ❌ Incorrect

```tsx
export function Welcome() {
 return <p>Welcome to the documentation</p>;
}
```

## ✅ Correct

```tsx
import Translate from "@docusaurus/Translate";

export function Welcome() {
 return (
  <p>
   <Translate>Welcome to the documentation</Translate>
  </p>
 );
}
```

## Behavior and migration notes

The rule is diagnostic-only. Wrapping text can affect markup and translation IDs, so automatic changes would be unsafe. It belongs to `strict`, `all`, and `experimental`, and is also available through the opt-in `i18n` config.

### Options

```ts
interface Options {
 ignoredStrings?: readonly string[];
}
```

`ignoredStrings` defaults to an empty array. Each listed token is ignored when it appears as a whitespace-delimited label token.

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [
 docusaurus2.configs.i18n,
 {
  rules: {
   "docusaurus-2/no-untranslated-text": [
    "error",
    { ignoredStrings: ["·", "—", "×"] },
   ],
  },
 },
];
```

## When not to use it

Do not use this rule for JSX that is not user-facing, or when translation is handled entirely before values reach JSX.

> **Rule catalog ID:** R124

## Further reading

- [Docusaurus i18n tutorial](https://docusaurus.io/docs/i18n/tutorial)
- [Docusaurus `Translate` API](https://docusaurus.io/docs/docusaurus-core#translate)
