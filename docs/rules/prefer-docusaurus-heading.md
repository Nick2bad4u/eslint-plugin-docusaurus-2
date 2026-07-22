# prefer-docusaurus-heading

Prefer the Docusaurus theme `Heading` component over intrinsic heading elements.

## Targeted pattern scope

This rule targets intrinsic JSX heading names from `<h1>` through `<h6>`. Components and member-expression tag names are ignored.

## What this rule reports

This rule reports `<h1>` through `<h6>`. The theme component keeps heading rendering aligned with Docusaurus theme behavior while retaining the intended semantic level through its `as` prop.

## Why this rule exists

Using the theme component keeps headings inside Docusaurus's swizzled theme contract while retaining their semantic HTML level.

## ❌ Incorrect

```tsx
export function SectionTitle() {
 return <h2>Configuration</h2>;
}
```

## ✅ Correct

```tsx
import Heading from "@theme/Heading";

export function SectionTitle() {
 return <Heading as="h2">Configuration</Heading>;
}
```

## Behavior and migration notes

When an unshadowed default or namespace import from `@theme/Heading` is already available, the rule suggests a complete conversion. It preserves the original heading level in an `as` attribute and renames both tags.

The rule does not insert imports and withholds suggestions when an existing `as` or spread attribute would make the rewrite ambiguous.

## ESLint flat config example

```ts
import docusaurus2 from "eslint-plugin-docusaurus-2";

export default [docusaurus2.configs.recommended];
```

## When not to use it

Do not use this rule when components intentionally render plain HTML headings outside the Docusaurus theme system.

> **Rule catalog ID:** R125

## Further reading

- [Docusaurus swizzling and theme components](https://docusaurus.io/docs/swizzling)
- [MDN heading elements](https://developer.mozilla.org/docs/Web/HTML/Reference/Elements/Heading_Elements)
